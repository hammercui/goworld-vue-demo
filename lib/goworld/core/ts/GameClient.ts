import Proto from './Proto'
import * as EntityManager from './EntityManager'
import GhostEntity from './GhostEntity'
import {RecvEnum,SIZE_FIELD_SIZE,CLIENTID_LENGTH,ENTITYID_LENGTH} from './Consts'
var msgpack = require("msgpack");

/**
 * 连接客户端，维护与服务端的连接池
 * 收发消息
 */
export default class GameClient{
    public serverAddr: string ="127.0.0.1"
    public serverPort: string ="14001"
    private recvBuf: ArrayBuffer
    private recvStatus: RecvEnum
    private recvPayloadLen: number
    private player: GhostEntity
    private sendBuf: ArrayBuffer
    private _sendPacket: DataView
    private _sendPacketWritePos: number
    private websocket: WebSocket

    GameClient(){
        this.recvBuf = new ArrayBuffer(1024*1024)
        this.recvStatus = RecvEnum._RECV_PAYLOAD_LENGTH
        this.recvPayloadLen = 0
        this.player = null

        this.sendBuf = new ArrayBuffer(1024*1024)
        this._sendPacket = new DataView(this.sendBuf)
        this._sendPacketWritePos = SIZE_FIELD_SIZE
    }

    /**
     * 连接
     */
    connect = () =>{
        var serverAddr = 'ws://'+this.serverAddr+':'+this.serverPort+'/ws'
        console.log("正在连接 " + serverAddr + ' ...')
        var websocket = new WebSocket(serverAddr)
        this.websocket = websocket

        websocket.binaryType = 'arraybuffer'
        console.log(websocket)
        var gameclient = this

         //连接发生错误的回调方法
         websocket.onerror = function () {
            console.log("WebSocket连接发生错误");
            //todo 
       };

        //连接成功建立的回调方法
        websocket.onopen = function () {
            console.log("WebSocket连接成功");
            //todo
        }

       //接收到消息的回调方法
        websocket.onmessage = function (event) {
            var data = event.data
            console.log("收到数据：", typeof(data), data.length);
            gameclient.onRecvData(data)
       }

        //连接关闭的回调方法
        websocket.onclose = function () {
           console.log("WebSocket连接关闭");
           //todo 
        }

        //监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
        window.onbeforeunload = function () {
            console.log("onbeforeunload");
            //todo 
        }
    }

    onRecvData = (data) =>{
        if (this.recvBuf.byteLength == 0) {
            this.recvBuf = data
        } else {
            var tmp = new Uint8Array( this.recvBuf.byteLength + data.byteLength );
            tmp.set( new Uint8Array( this.recvBuf ), 0 );
            tmp.set( new Uint8Array( data ), this.recvBuf.byteLength );
            this.recvBuf = tmp.buffer
        }

        console.log("未处理数据：", this.recvBuf.byteLength)
        while (true) {
            let payload = this.tryReceivePacket()
            if (payload !== null) {
                this.onReceivePacket(payload)
            } else {
                break 
            }
        }
    }

    /**
     * 从已经收到的数据（recvBuf）里解析出数据包（Packet）
     */
    tryReceivePacket = (): ArrayBuffer =>{
        let recvBufView = new DataView(this.recvBuf)
        if (this.recvStatus == RecvEnum._RECV_PAYLOAD_LENGTH) {
            if (this.recvBuf.byteLength < SIZE_FIELD_SIZE) {
                return null
            }
            this.recvPayloadLen = recvBufView.getUint32(0, true)
            console.log("数据包大小: ", this.recvPayloadLen)
            this.recvStatus = RecvEnum._RECV_PAYLOAD
        }

        // recv status == _RECV_PAYLOAD
        console.log("包大小：", this.recvPayloadLen, "现有数据：", this.recvBuf.byteLength - SIZE_FIELD_SIZE)
        if (this.recvBuf.byteLength - SIZE_FIELD_SIZE < this.recvPayloadLen) {
            // payload not enough
            return null
        }

        // 足够了，返回包数据
        var payload = this.recvBuf.slice(SIZE_FIELD_SIZE, SIZE_FIELD_SIZE+this.recvPayloadLen)
        this.recvBuf = this.recvBuf.slice(SIZE_FIELD_SIZE+this.recvPayloadLen)
        // 恢复到接收长度状态
        this.recvStatus = RecvEnum._RECV_PAYLOAD_LENGTH
        this.recvPayloadLen = 0
        return payload
    }

    /**
     * 解析包
     * @param {*} payload 
     */
    onReceivePacket(payload){
        // payload is ArrayBuffer
        payload = new DataView(payload) // 转换为DataView便于操作
        var [msgtype, payload] = this.readUint16(payload)
        console.log("收到包：", payload, payload.byteLength, "，消息类型：", msgtype)
        if (msgtype != Proto.MT_CALL_FILTERED_CLIENTS && msgtype != Proto.MT_SYNC_POSITION_YAW_ON_CLIENTS) {
            var [dummy, payload] = this.readUint16(payload)
            console.log("gateid", dummy)
            var [dummy, payload] = this.readBytes(payload, CLIENTID_LENGTH) // read ClientID
            console.log("clientid", dummy.length)
        }

        switch(msgtype) {
            
            case Proto.MT_CREATE_ENTITY_ON_CLIENT:
                this.handleCreateEntityOnClient(payload)
                break
            case Proto.MT_CALL_ENTITY_METHOD_ON_CLIENT:
                this.handleCallEntityMethodOnClient(payload)
                break
            case Proto.MT_DESTROY_ENTITY_ON_CLIENT:
                this.handleDestroyEntityOnClient(payload)
                break
             case Proto.MT_CALL_FILTERED_CLIENTS:
                 this.handleCallFilteredClients(payload)
                 break;
             case Proto.MT_NOTIFY_MAP_ATTR_CHANGE_ON_CLIENT:
                this.handleNotifyMapAttrChangeOnClient(payload)
                 break;          
            case Proto.MT_NOTIFY_MAP_ATTR_DEL_ON_CLIENT:
                break;
            case Proto.MT_NOTIFY_LIST_ATTR_APPEND_ON_CLIENT:
                break;
            case Proto.MT_NOTIFY_LIST_ATTR_CHANGE_ON_CLIENT:
                break;
            case Proto.MT_NOTIFY_LIST_ATTR_POP_ON_CLIENT:
                break;            
            default:
                console.log("无法识别的消息类型："+msgtype)
        }
    }

    /**
     * 处理新建实体
     * @param {*} payload 
     */
    handleCreateEntityOnClient = (payload)=>{
        var [isPlayer, payload] = this.readBool(payload)
        var [eid, payload] = this.readEntityID(payload)
        var [typeName, payload] = this.readVarStr(payload)
        var [x, payload] = this.readFloat32(payload)
        var [y, payload] = this.readFloat32(payload)
        var [z, payload] = this.readFloat32(payload)
        var [yaw, payload] = this.readFloat32(payload)
        var [clientData,payload] = this.readVarBytes(payload)
        clientData = msgpack.decode(clientData)

        EntityManager.createEntity(typeName,eid,isPlayer,x,y,z,yaw,clientData)   
    }

    /**
     * 处理调用客户端实体方法
     * @param {*} payload 
     * @returns 
     */
    handleCallEntityMethodOnClient = (payload)=>{
        var [entityID, payload] = this.readEntityID(payload)
        var [method, payload] = this.readVarStr(payload)
        var [args, payload] = this.readArgs(payload)
        console.log("MT_CALL_ENTITY_METHOD_ON_CLIENT", "entityID", entityID, "method", method, "args", args.length, args)
        let e = EntityManager.getEntity(entityID)
        if (e == undefined) {
            console.log("找不到entity：", entityID)
            return 
        }
        e.onCall( method, args )
    }

    handleCallFilteredClients = (payload)=>{
        var [fkey, payload] = this.readVarStr(payload)
		var [fval, payload] = this.readVarStr(payload)
		var [method, payload] = this.readVarStr(payload)
        var [args, payload] = this.readArgs(payload)
        console.log("MT_CALL_FILTERED_CLIENTS", fkey, "=", fval, "method=", method, "args=", args)
        EntityManager.getPlayer().onCall(method, args)
    }

    
    /**
     * 销毁客户端实体
     * @param {*} payload 
     */
    handleDestroyEntityOnClient = (payload)=>{
        var [typeName, payload] = this.readVarStr(payload)
        var [entityID, payload] = this.readEntityID(payload)
        let e = EntityManager.getEntity(entityID)

        EntityManager.destoryEntity(entityID)
    }

    /**
     * 通知客户端属性变更
     * @param {*} payload 
     * @returns 
     */
    handleNotifyMapAttrChangeOnClient = (payload) => {
        var [entityID, payload] = this.readEntityID(payload)
        var [path, payload] = this.readData(payload)
        var [key, payload] = this.readVarStr(payload)
        var [val, payload] = this.readData(payload)
        console.log("MT_NOTIFY_MAP_ATTR_CHANGE_ON_CLIENT", entityID, "path", typeof(path), JSON.stringify(path), path.length, "key", key, "val", val)

        let e = EntityManager.getEntity(entityID)
        if (!e) {
            console.log("找不到对象："+entityID)
            return  
        }

        e.applyMapAttrChange( path, key, val )
    }

    /**
     * 发包
     */
    sendPacket = () => {
        let payloadLen = this._sendPacketWritePos - SIZE_FIELD_SIZE
        this._sendPacket.setUint32(0, payloadLen, true)
        let packetLen = this._sendPacketWritePos
        this._sendPacketWritePos = SIZE_FIELD_SIZE
        this.websocket.send(this.sendBuf.slice(0, packetLen))
    }
    

    readUint8 =(buf)=> {
        let v = buf.getUint8(0)
        return [v, new DataView(buf.buffer, buf.byteOffset+1)]
    }
    readUint16 = (buf)=> {
        let v = buf.getUint16(0, true)
        return [v, new DataView(buf.buffer, buf.byteOffset+2)]
    }
    readUint32 = (buf) => {
        let v = buf.getUint32(0, true)
        return [v, new DataView(buf.buffer, buf.byteOffset+4)]
    }
    readFloat32 = (buf) => {
        let v = buf.getFloat32(0, true)
        return [v, new DataView(buf.buffer, buf.byteOffset+4)]
    }
    readBytes = (buf, length):any=> {
        let v = new Uint8Array(buf.buffer, buf.byteOffset, length)
        return [v, new DataView(buf.buffer, buf.byteOffset+length)]
    }
    readVarBytes = (buf) => {
        var [n, buf] = this.readUint32(buf)
        var [b, buf] = this.readBytes(buf, n)
        console.log('VarBytes len', n, 'b', b.length)
        return [b, buf]
    }
    readEntityID = (buf) => {
        var [eid, buf] = this.readBytes(buf, ENTITYID_LENGTH)
        eid = this.uint8Array2String(eid)
        return [eid, buf]
    }
    readVarStr = (buf): any => {
        var [b, buf] = this.readVarBytes(buf)
        let s = this.uint8Array2String(b)
        return [s, buf]
    }
    readBool = (buf) => {
        var b
        [b, buf] = this.readUint8(buf)
        b = b == 0 ? false : true
        return [b, buf]
    }
    readData = (buf) => {
        var [b, buf] = this.readVarBytes(buf)
        let data = msgpack.decode(b)
        return [data, buf]
    }
    readArgs = (buf) => {
        var [argcount, buf] = this.readUint16(buf)
        console.log("readArgs: argcount", argcount)
        var args = new Array(argcount)
        for (var i = 0; i<argcount; i++) {
            var [data, buf] = this.readData(buf)
            args[i] = data
        }
        return [args, buf]
    }

    appendUint8 = (v) => {
        this._sendPacket.setUint8(this._sendPacketWritePos, v)
        this._sendPacketWritePos += 1
    }
    appendUint16 = (v) => {
        this._sendPacket.setUint16(this._sendPacketWritePos, v, true)
        this._sendPacketWritePos += 2
    }
    appendUint32 = (v) => {
        this._sendPacket.setUint32(this._sendPacketWritePos, v, true)
        this._sendPacketWritePos += 4
    }
    appendBytes = (b) => {
        new Uint8Array(this._sendPacket.buffer, this._sendPacketWritePos, b.length).set(b, 0);  
        this._sendPacketWritePos += b.length
    }
    appendEntityID = (eid) => {
        let b = this.string2Uint8Array(eid)
        console.log("convert", eid, "to", b, b.length)
        this.appendBytes(b)
    }
    appendVarBytes = (b) => {
        this.appendUint32(b.length)
        this.appendBytes(b)
    }
    appendVarStr = (s) => {
        let b = this.string2Uint8Array(s)
        this.appendVarBytes(b)
    }
    appendData = (data) => {
        data = msgpack.encode(data)
        console.log("msgpack encode:", typeof(data), data.length)
        this.appendVarBytes(data)
    }
    appendArgs = (args) => {
        console.log("appendArgs", args.length, args)
        this.appendUint16(args.length)
        for (var i=0; i<args.length;i++) {
            this.appendData(args[i])
        }
    }

    string2Uint8Array = (str): Uint8Array => {
      let bufView = new Uint8Array(str.length);
      for (var i=0, strLen=str.length; i<strLen; i++) {
        bufView[i] = str.charCodeAt(i);
      }
      return bufView;
    }
    uint8Array2String = (b): string => {
        return String.fromCharCode.apply(null, b)
    }


    callServerMethod = (entity, method, args) => {
        console.log(">>> "+entity.toString()+"."+method+"("+args+")")
        // 	packet.AppendUint16(MT_CALL_ENTITY_METHOD_FROM_CLIENT)
        // 	packet.AppendEntityID(id)
        // 	packet.AppendVarStr(method)
        // 	packet.AppendArgs(args)

        this.appendUint16(Proto.MT_CALL_ENTITY_METHOD_FROM_CLIENT)
        this.appendEntityID(entity.ID)
        this.appendVarStr(method)
        this.appendArgs(args)
        this.sendPacket()
    }
}
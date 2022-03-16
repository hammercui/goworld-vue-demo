"use strict";
exports.__esModule = true;
var Proto_1 = require("./Proto");
var EntityManager = require("./EntityManager");
var Consts_1 = require("./Consts");
var msgpack = require("msgpack");
/**
 * 连接客户端，维护与服务端的连接池
 * 收发消息
 */
var GameClient = /** @class */ (function () {
    function GameClient() {
        var _this = this;
        this.serverAddr = "127.0.0.1";
        this.serverPort = "14001";
        /**
         * 连接
         */
        this.connect = function () {
            var serverAddr = 'ws://' + _this.serverAddr + ':' + _this.serverPort + '/ws';
            console.log("正在连接 " + serverAddr + ' ...');
            var websocket = new WebSocket(serverAddr);
            _this.websocket = websocket;
            websocket.binaryType = 'arraybuffer';
            console.log(websocket);
            var gameclient = _this;
            //连接发生错误的回调方法
            websocket.onerror = function () {
                console.log("WebSocket连接发生错误");
                //todo 
            };
            //连接成功建立的回调方法
            websocket.onopen = function () {
                console.log("WebSocket连接成功");
                //todo
            };
            //接收到消息的回调方法
            websocket.onmessage = function (event) {
                var data = event.data;
                console.log("收到数据：", typeof (data), data.length);
                gameclient.onRecvData(data);
            };
            //连接关闭的回调方法
            websocket.onclose = function () {
                console.log("WebSocket连接关闭");
                //todo 
            };
            //监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
            window.onbeforeunload = function () {
                console.log("onbeforeunload");
                //todo 
            };
        };
        this.onRecvData = function (data) {
            if (_this.recvBuf.byteLength == 0) {
                _this.recvBuf = data;
            }
            else {
                var tmp = new Uint8Array(_this.recvBuf.byteLength + data.byteLength);
                tmp.set(new Uint8Array(_this.recvBuf), 0);
                tmp.set(new Uint8Array(data), _this.recvBuf.byteLength);
                _this.recvBuf = tmp.buffer;
            }
            console.log("未处理数据：", _this.recvBuf.byteLength);
            while (true) {
                var payload = _this.tryReceivePacket();
                if (payload !== null) {
                    _this.onReceivePacket(payload);
                }
                else {
                    break;
                }
            }
        };
        /**
         * 从已经收到的数据（recvBuf）里解析出数据包（Packet）
         */
        this.tryReceivePacket = function () {
            var recvBufView = new DataView(_this.recvBuf);
            if (_this.recvStatus == Consts_1.RecvEnum._RECV_PAYLOAD_LENGTH) {
                if (_this.recvBuf.byteLength < Consts_1.SIZE_FIELD_SIZE) {
                    return null;
                }
                _this.recvPayloadLen = recvBufView.getUint32(0, true);
                console.log("数据包大小: ", _this.recvPayloadLen);
                _this.recvStatus = Consts_1.RecvEnum._RECV_PAYLOAD;
            }
            // recv status == _RECV_PAYLOAD
            console.log("包大小：", _this.recvPayloadLen, "现有数据：", _this.recvBuf.byteLength - Consts_1.SIZE_FIELD_SIZE);
            if (_this.recvBuf.byteLength - Consts_1.SIZE_FIELD_SIZE < _this.recvPayloadLen) {
                // payload not enough
                return null;
            }
            // 足够了，返回包数据
            var payload = _this.recvBuf.slice(Consts_1.SIZE_FIELD_SIZE, Consts_1.SIZE_FIELD_SIZE + _this.recvPayloadLen);
            _this.recvBuf = _this.recvBuf.slice(Consts_1.SIZE_FIELD_SIZE + _this.recvPayloadLen);
            // 恢复到接收长度状态
            _this.recvStatus = Consts_1.RecvEnum._RECV_PAYLOAD_LENGTH;
            _this.recvPayloadLen = 0;
            return payload;
        };
        /**
         * 处理新建实体
         * @param {*} payload
         */
        this.handleCreateEntityOnClient = function (payload) {
            var _a = _this.readBool(payload), isPlayer = _a[0], payload = _a[1];
            var _b = _this.readEntityID(payload), eid = _b[0], payload = _b[1];
            var _c = _this.readVarStr(payload), typeName = _c[0], payload = _c[1];
            var _d = _this.readFloat32(payload), x = _d[0], payload = _d[1];
            var _e = _this.readFloat32(payload), y = _e[0], payload = _e[1];
            var _f = _this.readFloat32(payload), z = _f[0], payload = _f[1];
            var _g = _this.readFloat32(payload), yaw = _g[0], payload = _g[1];
            var _h = _this.readVarBytes(payload), clientData = _h[0], payload = _h[1];
            clientData = msgpack.decode(clientData);
            EntityManager.createEntity(typeName, eid, isPlayer, x, y, z, yaw, clientData);
        };
        /**
         * 处理调用客户端实体方法
         * @param {*} payload
         * @returns
         */
        this.handleCallEntityMethodOnClient = function (payload) {
            var _a = _this.readEntityID(payload), entityID = _a[0], payload = _a[1];
            var _b = _this.readVarStr(payload), method = _b[0], payload = _b[1];
            var _c = _this.readArgs(payload), args = _c[0], payload = _c[1];
            console.log("MT_CALL_ENTITY_METHOD_ON_CLIENT", "entityID", entityID, "method", method, "args", args.length, args);
            var e = EntityManager.getEntity(entityID);
            if (e == undefined) {
                console.log("找不到entity：", entityID);
                return;
            }
            e.onCall(method, args);
        };
        this.handleCallFilteredClients = function (payload) {
            var _a = _this.readVarStr(payload), fkey = _a[0], payload = _a[1];
            var _b = _this.readVarStr(payload), fval = _b[0], payload = _b[1];
            var _c = _this.readVarStr(payload), method = _c[0], payload = _c[1];
            var _d = _this.readArgs(payload), args = _d[0], payload = _d[1];
            console.log("MT_CALL_FILTERED_CLIENTS", fkey, "=", fval, "method=", method, "args=", args);
            EntityManager.getPlayer().onCall(method, args);
        };
        /**
         * 销毁客户端实体
         * @param {*} payload
         */
        this.handleDestroyEntityOnClient = function (payload) {
            var _a = _this.readVarStr(payload), typeName = _a[0], payload = _a[1];
            var _b = _this.readEntityID(payload), entityID = _b[0], payload = _b[1];
            var e = EntityManager.getEntity(entityID);
            EntityManager.destoryEntity(entityID);
        };
        /**
         * 通知客户端属性变更
         * @param {*} payload
         * @returns
         */
        this.handleNotifyMapAttrChangeOnClient = function (payload) {
            var _a = _this.readEntityID(payload), entityID = _a[0], payload = _a[1];
            var _b = _this.readData(payload), path = _b[0], payload = _b[1];
            var _c = _this.readVarStr(payload), key = _c[0], payload = _c[1];
            var _d = _this.readData(payload), val = _d[0], payload = _d[1];
            console.log("MT_NOTIFY_MAP_ATTR_CHANGE_ON_CLIENT", entityID, "path", typeof (path), JSON.stringify(path), path.length, "key", key, "val", val);
            var e = EntityManager.getEntity(entityID);
            if (!e) {
                console.log("找不到对象：" + entityID);
                return;
            }
            e.applyMapAttrChange(path, key, val);
        };
        /**
         * 发包
         */
        this.sendPacket = function () {
            var payloadLen = _this._sendPacketWritePos - Consts_1.SIZE_FIELD_SIZE;
            _this._sendPacket.setUint32(0, payloadLen, true);
            var packetLen = _this._sendPacketWritePos;
            _this._sendPacketWritePos = Consts_1.SIZE_FIELD_SIZE;
            _this.websocket.send(_this.sendBuf.slice(0, packetLen));
        };
        this.readUint8 = function (buf) {
            var v = buf.getUint8(0);
            return [v, new DataView(buf.buffer, buf.byteOffset + 1)];
        };
        this.readUint16 = function (buf) {
            var v = buf.getUint16(0, true);
            return [v, new DataView(buf.buffer, buf.byteOffset + 2)];
        };
        this.readUint32 = function (buf) {
            var v = buf.getUint32(0, true);
            return [v, new DataView(buf.buffer, buf.byteOffset + 4)];
        };
        this.readFloat32 = function (buf) {
            var v = buf.getFloat32(0, true);
            return [v, new DataView(buf.buffer, buf.byteOffset + 4)];
        };
        this.readBytes = function (buf, length) {
            var v = new Uint8Array(buf.buffer, buf.byteOffset, length);
            return [v, new DataView(buf.buffer, buf.byteOffset + length)];
        };
        this.readVarBytes = function (buf) {
            var _a = _this.readUint32(buf), n = _a[0], buf = _a[1];
            var _b = _this.readBytes(buf, n), b = _b[0], buf = _b[1];
            console.log('VarBytes len', n, 'b', b.length);
            return [b, buf];
        };
        this.readEntityID = function (buf) {
            var _a = _this.readBytes(buf, Consts_1.ENTITYID_LENGTH), eid = _a[0], buf = _a[1];
            eid = _this.uint8Array2String(eid);
            return [eid, buf];
        };
        this.readVarStr = function (buf) {
            var _a = _this.readVarBytes(buf), b = _a[0], buf = _a[1];
            var s = _this.uint8Array2String(b);
            return [s, buf];
        };
        this.readBool = function (buf) {
            var _a;
            var b;
            _a = _this.readUint8(buf), b = _a[0], buf = _a[1];
            b = b == 0 ? false : true;
            return [b, buf];
        };
        this.readData = function (buf) {
            var _a = _this.readVarBytes(buf), b = _a[0], buf = _a[1];
            var data = msgpack.decode(b);
            return [data, buf];
        };
        this.readArgs = function (buf) {
            var _a = _this.readUint16(buf), argcount = _a[0], buf = _a[1];
            console.log("readArgs: argcount", argcount);
            var args = new Array(argcount);
            for (var i = 0; i < argcount; i++) {
                var _b = _this.readData(buf), data = _b[0], buf = _b[1];
                args[i] = data;
            }
            return [args, buf];
        };
        this.appendUint8 = function (v) {
            _this._sendPacket.setUint8(_this._sendPacketWritePos, v);
            _this._sendPacketWritePos += 1;
        };
        this.appendUint16 = function (v) {
            _this._sendPacket.setUint16(_this._sendPacketWritePos, v, true);
            _this._sendPacketWritePos += 2;
        };
        this.appendUint32 = function (v) {
            _this._sendPacket.setUint32(_this._sendPacketWritePos, v, true);
            _this._sendPacketWritePos += 4;
        };
        this.appendBytes = function (b) {
            new Uint8Array(_this._sendPacket.buffer, _this._sendPacketWritePos, b.length).set(b, 0);
            _this._sendPacketWritePos += b.length;
        };
        this.appendEntityID = function (eid) {
            var b = _this.string2Uint8Array(eid);
            console.log("convert", eid, "to", b, b.length);
            _this.appendBytes(b);
        };
        this.appendVarBytes = function (b) {
            _this.appendUint32(b.length);
            _this.appendBytes(b);
        };
        this.appendVarStr = function (s) {
            var b = _this.string2Uint8Array(s);
            _this.appendVarBytes(b);
        };
        this.appendData = function (data) {
            data = msgpack.encode(data);
            console.log("msgpack encode:", typeof (data), data.length);
            _this.appendVarBytes(data);
        };
        this.appendArgs = function (args) {
            console.log("appendArgs", args.length, args);
            _this.appendUint16(args.length);
            for (var i = 0; i < args.length; i++) {
                _this.appendData(args[i]);
            }
        };
        this.string2Uint8Array = function (str) {
            var bufView = new Uint8Array(str.length);
            for (var i = 0, strLen = str.length; i < strLen; i++) {
                bufView[i] = str.charCodeAt(i);
            }
            return bufView;
        };
        this.uint8Array2String = function (b) {
            return String.fromCharCode.apply(null, b);
        };
        this.callServerMethod = function (entity, method, args) {
            console.log(">>> " + entity.toString() + "." + method + "(" + args + ")");
            // 	packet.AppendUint16(MT_CALL_ENTITY_METHOD_FROM_CLIENT)
            // 	packet.AppendEntityID(id)
            // 	packet.AppendVarStr(method)
            // 	packet.AppendArgs(args)
            _this.appendUint16(Proto_1["default"].MT_CALL_ENTITY_METHOD_FROM_CLIENT);
            _this.appendEntityID(entity.ID);
            _this.appendVarStr(method);
            _this.appendArgs(args);
            _this.sendPacket();
        };
    }
    GameClient.prototype.GameClient = function () {
        this.recvBuf = new ArrayBuffer(1024 * 1024);
        this.recvStatus = Consts_1.RecvEnum._RECV_PAYLOAD_LENGTH;
        this.recvPayloadLen = 0;
        this.player = null;
        this.sendBuf = new ArrayBuffer(1024 * 1024);
        this._sendPacket = new DataView(this.sendBuf);
        this._sendPacketWritePos = Consts_1.SIZE_FIELD_SIZE;
    };
    /**
     * 解析包
     * @param {*} payload
     */
    GameClient.prototype.onReceivePacket = function (payload) {
        // payload is ArrayBuffer
        payload = new DataView(payload); // 转换为DataView便于操作
        var _a = this.readUint16(payload), msgtype = _a[0], payload = _a[1];
        console.log("收到包：", payload, payload.byteLength, "，消息类型：", msgtype);
        if (msgtype != Proto_1["default"].MT_CALL_FILTERED_CLIENTS && msgtype != Proto_1["default"].MT_SYNC_POSITION_YAW_ON_CLIENTS) {
            var _b = this.readUint16(payload), dummy = _b[0], payload = _b[1];
            console.log("gateid", dummy);
            var _c = this.readBytes(payload, Consts_1.CLIENTID_LENGTH), dummy = _c[0], payload = _c[1]; // read ClientID
            console.log("clientid", dummy.length);
        }
        switch (msgtype) {
            case Proto_1["default"].MT_CREATE_ENTITY_ON_CLIENT:
                this.handleCreateEntityOnClient(payload);
                break;
            case Proto_1["default"].MT_CALL_ENTITY_METHOD_ON_CLIENT:
                this.handleCallEntityMethodOnClient(payload);
                break;
            case Proto_1["default"].MT_DESTROY_ENTITY_ON_CLIENT:
                this.handleDestroyEntityOnClient(payload);
                break;
            case Proto_1["default"].MT_CALL_FILTERED_CLIENTS:
                this.handleCallFilteredClients(payload);
                break;
            case Proto_1["default"].MT_NOTIFY_MAP_ATTR_CHANGE_ON_CLIENT:
                this.handleNotifyMapAttrChangeOnClient(payload);
                break;
            case Proto_1["default"].MT_NOTIFY_MAP_ATTR_DEL_ON_CLIENT:
                break;
            case Proto_1["default"].MT_NOTIFY_LIST_ATTR_APPEND_ON_CLIENT:
                break;
            case Proto_1["default"].MT_NOTIFY_LIST_ATTR_CHANGE_ON_CLIENT:
                break;
            case Proto_1["default"].MT_NOTIFY_LIST_ATTR_POP_ON_CLIENT:
                break;
            default:
                console.log("无法识别的消息类型：" + msgtype);
        }
    };
    return GameClient;
}());
exports["default"] = GameClient;

/**
 * 连接客户端，维护与服务端的连接池
 * 收发消息
 */
import Proto from './Proto'
var msgpack = require("msgpack");

export default class GameClient{
    host="127.0.0.1"
    port="14001"

    GameClient(){
        this.recvBuf = new ArrayBuffer()
        this.recvStatus = _RECV_PAYLOAD_LENGTH
        this.recvPayloadLen = 0
        this.entities = {}
        this.player = null

        this.sendBuf = new ArrayBuffer(1024*1024)
        this._sendPacket = new DataView(this.sendBuf)
        this._sendPacketWritePos = SIZE_FIELD_SIZE
    }

    /**
     * 连接
     */
    connect(){

    }

}
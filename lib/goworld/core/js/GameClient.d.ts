/**
 * 连接客户端，维护与服务端的连接池
 * 收发消息
 */
export default class GameClient {
    serverAddr: string;
    serverPort: string;
    private recvBuf;
    private recvStatus;
    private recvPayloadLen;
    private player;
    private sendBuf;
    private _sendPacket;
    private _sendPacketWritePos;
    private websocket;
    GameClient(): void;
    /**
     * 连接
     */
    connect: () => void;
    onRecvData: (data: any) => void;
    /**
     * 从已经收到的数据（recvBuf）里解析出数据包（Packet）
     */
    tryReceivePacket: () => ArrayBuffer;
    /**
     * 解析包
     * @param {*} payload
     */
    onReceivePacket(payload: any): void;
    /**
     * 处理新建实体
     * @param {*} payload
     */
    handleCreateEntityOnClient: (payload: any) => void;
    /**
     * 处理调用客户端实体方法
     * @param {*} payload
     * @returns
     */
    handleCallEntityMethodOnClient: (payload: any) => void;
    handleCallFilteredClients: (payload: any) => void;
    /**
     * 销毁客户端实体
     * @param {*} payload
     */
    handleDestroyEntityOnClient: (payload: any) => void;
    /**
     * 通知客户端属性变更
     * @param {*} payload
     * @returns
     */
    handleNotifyMapAttrChangeOnClient: (payload: any) => void;
    /**
     * 发包
     */
    sendPacket: () => void;
    readUint8: (buf: any) => any[];
    readUint16: (buf: any) => any[];
    readUint32: (buf: any) => any[];
    readFloat32: (buf: any) => any[];
    readBytes: (buf: any, length: any) => any;
    readVarBytes: (buf: any) => any[];
    readEntityID: (buf: any) => any[];
    readVarStr: (buf: any) => any;
    readBool: (buf: any) => any[];
    readData: (buf: any) => any[];
    readArgs: (buf: any) => any[];
    appendUint8: (v: any) => void;
    appendUint16: (v: any) => void;
    appendUint32: (v: any) => void;
    appendBytes: (b: any) => void;
    appendEntityID: (eid: any) => void;
    appendVarBytes: (b: any) => void;
    appendVarStr: (s: any) => void;
    appendData: (data: any) => void;
    appendArgs: (args: any) => void;
    string2Uint8Array: (str: any) => Uint8Array;
    uint8Array2String: (b: any) => string;
    callServerMethod: (entity: any, method: any, args: any) => void;
}

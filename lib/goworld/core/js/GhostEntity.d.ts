/**
 * 客户单端影子实体
 */
export default class GhostEntity {
    tickEnable: boolean;
    typeName: string;
    ID: string;
    x: number;
    y: number;
    z: number;
    yaw: number;
    attrs: any;
    isPlayer: boolean;
    ownerSyncPos: boolean;
    onBecomeClientOwnerAction: any;
    onEnterSpaceAction: any;
    onLeaveSpaceAction: any;
    onDestroyGhostAction: any;
    onTick: any;
    onUpdatePos: any;
    onUpdateQua: any;
    /**
     * 构造函数
     * @param {*} typeName
     * @param {*} entityID
     * @param {*} attrs
     */
    constructor(typeName: string, entityID: string, x: any, y: any, z: any, yaw: number, attrs: any);
    toString: () => string;
    onCreated: () => void;
    /**
     * 调用服务器方法
     * @param {*} method
     */
    callServer: (method: string, ...args: any[]) => void;
    /**
     * 接受远程调用
     * @param {*} method
     * @param {*} args
     */
    onCall: (method: string, args: any) => void;
    /**
     * 属性attrs变更
     * @param {*} path
     * @param {*} key
     * @param {*} val
     */
    applyMapAttrChange: (path: any, key: string, val: any) => void;
    /**
     * 属性删除
     * @param {*} path
     * @param {*} key
     */
    applyMapAttrDel: (path: any, key: any) => void;
    getAttrByPath: (path: any) => any;
    onBecomePlayer: () => void;
    destroy: () => void;
}

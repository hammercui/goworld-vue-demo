import GoWorld from './GoWorld'

/**
 * 客户单端影子实体
 */
export default class GhostEntity {
    public tickEnable: boolean = false;
    public typeName: string;
    public ID: string;
    public x: number;
    public y: number;
    public z: number;
    public yaw: number;
    public attrs: any;
    public isPlayer: boolean = false;
    public ownerSyncPos: boolean = false;

    public onBecomeClientOwnerAction = null
    public onEnterSpaceAction = null;
    public onLeaveSpaceAction = null;
    public onDestroyGhostAction = null;
    public onTick = null;
    public onUpdatePos = null;
    public onUpdateQua = null;

    /**
     * 构造函数
     * @param {*} typeName 
     * @param {*} entityID 
     * @param {*} attrs 
     */
    constructor(typeName: string, entityID: string, x, y, z, yaw: number, attrs: any) {
        this.typeName = typeName
        this.ID = entityID
        this.x = x
        this.y = y
        this.z = z
        this, yaw = yaw
        this.attrs = attrs
        this.isPlayer = false
        this.ownerSyncPos = false
    }

    public toString = (): string => {
        return this.typeName + "<" + this.ID + ">"
    }

    public onCreated = () => {
        console.log("Account created, start logining...")
    }

    /**
     * 调用服务器方法
     * @param {*} method 
     */
    public callServer = (method: string, ...args) => {
        // var args = Array.prototype.slice.call(arguments);
        // args = args.slice(1)
        GoWorld.gameClient.callServerMethod(this, method, args)
    }

    /**
     * 接受远程调用
     * @param {*} method 
     * @param {*} args 
     */
    public onCall = (method: string, args) => {
        console.log(this.toString() + "." + method + "(" + args + ")")
        this[method](...args)
    }

    /**
     * 属性attrs变更
     * @param {*} path 
     * @param {*} key 
     * @param {*} val 
     */
    public applyMapAttrChange = (path, key: string, val) => {
        let attr = this.getAttrByPath(path)
        var rootkey = path.length > 0 ? path[0] : key
        attr[key] = val

        this['onAttrChange_' + rootkey]()
    }

    /**
     * 属性删除
     * @param {*} path 
     * @param {*} key 
     */
    public applyMapAttrDel = (path, key) => {
        var rootkey = path.length > 0 ? path[0] : key
        let attr = this.getAttrByPath(path)
        delete attr[key]

        this['onAttrChange_' + rootkey]()
    }

    public getAttrByPath = (path) => {
        var attr = this.attrs
        for (var i = 0; i < path.length; i++) {
            let key = path[i]
            attr = attr[key]
        }
        return attr
    }

    public onBecomePlayer = () => {
        console.log("eid:" + this.ID + ",typeName:" + this.typeName + "获得玩家对象：")

    }

    public destroy = () => {
        console.log("eid:" + this.ID + "destroy")
    }
}
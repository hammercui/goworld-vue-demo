/**
 * 客户单端影子实体
 */

export default class GhostEntity{
    
     /**
      * 构造函数
      * @param {*} owner 
      * @param {*} typeName 
      * @param {*} entityID 
      * @param {*} attrs 
      */
     constructor(owner, typeName, entityID, attrs){
        this.owner = owner 
        this.typeName = typeName
        this.ID = entityID
        this.attrs = attrs 
        this.isPlayer = false
     }

    toString =()=>{
        return this.typeName + "<" + this.ID + ">"
    }

    onCreated = ()=>{
        console.log("Account created, start logining...")
    }

    /**
     * 调用服务器方法
     * @param {*} method 
     */
    callServer( method ){
        var args = Array.prototype.slice.call(arguments);
        args = args.slice(1)
        this.owner.callServerMethod( this, method, args )
    }

    /**
     * 接受远程调用
     * @param {*} method 
     * @param {*} args 
     */
    onCall(method, args){
        console.log(this.toString()+"."+method+"("+args+")")
        this[method](...args)
    }

    /**
     * 属性attrs变更
     * @param {*} path 
     * @param {*} key 
     * @param {*} val 
     */
    applyMapAttrChange(path, key, val){
        let attr = this.getAttrByPath(path)
        var rootkey = path.length > 0 ? path[0] : key
        attr[key] = val 

        this['onAttrChange_'+rootkey]()
    }
    
    /**
     * 属性删除
     * @param {*} path 
     * @param {*} key 
     */
    applyMapAttrDel(path,key) {
        var rootkey = path.length > 0 ? path[0] : key
        let attr = this.getAttrByPath(path)
        delete attr[key]

        this['onAttrChange_'+rootkey]()
    }

    getAttrByPath(path) {
        var attr = this.attrs
        for (var i=0; i< path.length;i++) {
            let key = path[i]
            attr = attr[key]
        }
        return attr 
    }

}
/**
 * entity实例管理类，缓存所有entity实例
 */
import GhostEntity from './GhostEntity'

var player;

/**
 * 获得player
 * @returns 
 */
export function getPlayer(){
    return splayer
}
/**
 * 实体map
 */
export const entities = new Map();

/**
 * 新建实体
 * @param {*} typeName 
 * @param {*} eid 
 * @param {*} isPlayer 
 * @param {*} x 
 * @param {*} y 
 * @param {*} z 
 * @param {*} yaw 
 * @param {*} clientData 
 */
export function createEntity(typeName,eid,isPlayer,x,y,z,yaw,clientData){
    console.log("MT_CREATE_ENTITY_ON_CLIENT", "isPlayer", isPlayer, 'eid', eid,"typeName", typeName, 'position', x, y, z, 'yaw', yaw, 'clientData', JSON.stringify(clientData))
    let e = new GhostEntity(typeName,eid,x,y,z,yaw,clientData)
    entities[eid] = e
    if(isPlayer){
        e.isPlayer = true
        if(player){
            console.error("玩家对象重复：老玩家"+this.player.toString() + "，新玩家：", e.toString())
        }
        player = e
    }
    e.onCreated()
    if (player == e) {
        e.onBecomePlayer()
    }
}

/**
 * 
 * @param {*} eid 
 * @returns GhostEntity
 */
export function getEntity(eid){
    if (entities.has(eid)) {
        return entities[eid]
    }
    return undefined
}

/**
 * destoryEntity
 * @param {*} eid 
 */
export function  destoryEntity(eid){
    if (entities.has(eid)) {
        let e = entities[eid]
        if (e == player) {
            player = null
            console.log("失去玩家对象：", e.toString()) 
        }
        e.destroy()
        delete entities[eid]
    }

}
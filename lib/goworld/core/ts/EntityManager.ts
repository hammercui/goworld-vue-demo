/**
 * entity实例管理类，缓存所有entity实例
 */
import { forEach } from 'core-js/library/js/array'
import GhostEntity from './GhostEntity'
import GhostSpace from './GhostSpace'


var player: GhostEntity
var space: GhostSpace

/**
 * 获得player
 * @returns 
 */
export function getPlayer(): GhostEntity{
    return player
}

export function setPlayer(e: GhostEntity){
    if (e) {
        player = e    
    }
}


/**
 * 实体map
 */
export const entities = new Map<string,GhostEntity>();

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
export function createEntity(typeName,eid: string,isPlayer: boolean,x,y,z,yaw: number,clientData){
    console.log("MT_CREATE_ENTITY_ON_CLIENT", "isPlayer", isPlayer, 'eid', eid,"typeName", typeName, 'position', x, y, z, 'yaw', yaw, 'clientData', JSON.stringify(clientData))
    let e = new GhostEntity(typeName,eid,x,y,z,yaw,clientData)
    entities[eid] = e
    e.onCreated()
    if(clientData.hasOwnProperty('ownerSyncPos') && clientData['ownerSyncPos']){
        e.ownerSyncPos = clientData['ownerSyncPos']
    }

    if (e.isSpace()) {
        if (space) {
            space.destroy()
        }
        space = e as GhostSpace
        onEnterSpace()
    }else{
        if(isPlayer){
            e.isPlayer = true
            if(player){
                console.error("玩家对象重复：老玩家"+player.toString() + "，新玩家：", e.toString())
            }
            player = e
            player.onBecomePlayer()
        }

        if (space) {
            e.onEnterSpace()
        }
    }
    
    //todo 通知消息中心创建成功

}

/**
 * 
 * @param {*} eid 
 * @returns GhostEntity
 */
export function getEntity(eid: string): GhostEntity{
    if (entities.has(eid)) {
        return entities[eid]
    }
    return undefined
}

/**
 * destoryEntity
 * @param {*} eid 
 */
export function  destoryEntity(eid: string){
    let e = getEntity(eid)
    if (e == undefined) {
        return 
    }

    
    if (e == player) {
            player = null
            console.log("失去玩家对象：", e.toString()) 
    }
    e.destroy()
    
    delete entities[eid]
}

/**
 * 从对象池删除
 * @param e 
 */
export function delEntity(e: GhostEntity){
    delete entities[e.ID]
    if (space && space.ID == e.ID) {
        space = null
        onLeaveSpace();
    }else{
        if (player && player.ID == e.ID) {
            player = null
        }
        if (space) {
            e.onLeaveSpace()
        }
    }
}


/**
 * 所有entity离开space
 */
function onLeaveSpace(){
    entities.forEach((e,key)=>{
        if (!e.isSpace()) {
            e.onLeaveSpace()
        }
    })
}

/**
 * space创建成功，所有玩家进入space
 */
function onEnterSpace(){
    console.log("EntityManager","space init,所有entity执行enterSpace")
    entities.forEach((e,key)=>{
        if (!e.isSpace()) {
            e.onEnterSpace()
        }
    })
}
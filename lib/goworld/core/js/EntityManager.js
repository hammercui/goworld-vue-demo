"use strict";
exports.__esModule = true;
exports.destoryEntity = exports.getEntity = exports.createEntity = exports.entities = exports.setPlayer = exports.getPlayer = void 0;
/**
 * entity实例管理类，缓存所有entity实例
 */
var GhostEntity_1 = require("./GhostEntity");
var player;
/**
 * 获得player
 * @returns
 */
function getPlayer() {
    return player;
}
exports.getPlayer = getPlayer;
function setPlayer(e) {
    if (e) {
        player = e;
    }
}
exports.setPlayer = setPlayer;
/**
 * 实体map
 */
exports.entities = new Map();
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
function createEntity(typeName, eid, isPlayer, x, y, z, yaw, clientData) {
    console.log("MT_CREATE_ENTITY_ON_CLIENT", "isPlayer", isPlayer, 'eid', eid, "typeName", typeName, 'position', x, y, z, 'yaw', yaw, 'clientData', JSON.stringify(clientData));
    var e = new GhostEntity_1["default"](typeName, eid, x, y, z, yaw, clientData);
    exports.entities[eid] = e;
    if (clientData.hasOwnProperty('ownerSyncPos') && clientData['ownerSyncPos']) {
        e.ownerSyncPos = clientData['ownerSyncPos'];
    }
    if (isPlayer) {
        e.isPlayer = true;
        if (player) {
            console.error("玩家对象重复：老玩家" + player.toString() + "，新玩家：", e.toString());
        }
        player = e;
    }
    e.onCreated();
    if (player == e) {
        e.onBecomePlayer();
    }
}
exports.createEntity = createEntity;
/**
 *
 * @param {*} eid
 * @returns GhostEntity
 */
function getEntity(eid) {
    if (exports.entities.has(eid)) {
        return exports.entities[eid];
    }
    return undefined;
}
exports.getEntity = getEntity;
/**
 * destoryEntity
 * @param {*} eid
 */
function destoryEntity(eid) {
    var e = getEntity(eid);
    if (e == undefined) {
        return;
    }
    if (e == player) {
        player = null;
        console.log("失去玩家对象：", e.toString());
    }
    e.destroy();
    delete exports.entities[eid];
}
exports.destoryEntity = destoryEntity;

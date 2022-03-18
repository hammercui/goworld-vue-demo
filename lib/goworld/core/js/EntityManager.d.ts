/**
 * entity实例管理类，缓存所有entity实例
 */
import GhostEntity from './GhostEntity';
/**
 * 获得player
 * @returns
 */
export declare function getPlayer(): GhostEntity;
export declare function setPlayer(e: GhostEntity): void;
/**
 * 实体map
 */
export declare const entities: Map<string, GhostEntity>;
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
export declare function createEntity(typeName: any, eid: string, isPlayer: boolean, x: any, y: any, z: any, yaw: number, clientData: any): void;
/**
 *
 * @param {*} eid
 * @returns GhostEntity
 */
export declare function getEntity(eid: string): GhostEntity;
/**
 * destoryEntity
 * @param {*} eid
 */
export declare function destoryEntity(eid: string): void;
/**
 * 从对象池删除
 * @param e
 */
export declare function delEntity(e: GhostEntity): void;

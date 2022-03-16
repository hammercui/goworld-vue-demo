"use strict";
exports.__esModule = true;
var GoWorld_1 = require("./GoWorld");
/**
 * 客户单端影子实体
 */
var GhostEntity = /** @class */ (function () {
    /**
     * 构造函数
     * @param {*} typeName
     * @param {*} entityID
     * @param {*} attrs
     */
    function GhostEntity(typeName, entityID, x, y, z, yaw, attrs) {
        var _this = this;
        this.tickEnable = false;
        this.isPlayer = false;
        this.ownerSyncPos = false;
        this.onBecomeClientOwnerAction = null;
        this.onEnterSpaceAction = null;
        this.onLeaveSpaceAction = null;
        this.onDestroyGhostAction = null;
        this.onTick = null;
        this.onUpdatePos = null;
        this.onUpdateQua = null;
        this.toString = function () {
            return _this.typeName + "<" + _this.ID + ">";
        };
        this.onCreated = function () {
            console.log("Account created, start logining...");
        };
        /**
         * 调用服务器方法
         * @param {*} method
         */
        this.callServer = function (method) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            // var args = Array.prototype.slice.call(arguments);
            // args = args.slice(1)
            GoWorld_1["default"].gameClient.callServerMethod(_this, method, args);
        };
        /**
         * 接受远程调用
         * @param {*} method
         * @param {*} args
         */
        this.onCall = function (method, args) {
            console.log(_this.toString() + "." + method + "(" + args + ")");
            _this[method].apply(_this, args);
        };
        /**
         * 属性attrs变更
         * @param {*} path
         * @param {*} key
         * @param {*} val
         */
        this.applyMapAttrChange = function (path, key, val) {
            var attr = _this.getAttrByPath(path);
            var rootkey = path.length > 0 ? path[0] : key;
            attr[key] = val;
            _this['onAttrChange_' + rootkey]();
        };
        /**
         * 属性删除
         * @param {*} path
         * @param {*} key
         */
        this.applyMapAttrDel = function (path, key) {
            var rootkey = path.length > 0 ? path[0] : key;
            var attr = _this.getAttrByPath(path);
            delete attr[key];
            _this['onAttrChange_' + rootkey]();
        };
        this.getAttrByPath = function (path) {
            var attr = _this.attrs;
            for (var i = 0; i < path.length; i++) {
                var key = path[i];
                attr = attr[key];
            }
            return attr;
        };
        this.onBecomePlayer = function () {
            console.log("eid:" + _this.ID + ",typeName:" + _this.typeName + "获得玩家对象：");
        };
        this.destroy = function () {
            console.log("eid:" + _this.ID + "destroy");
        };
        this.typeName = typeName;
        this.ID = entityID;
        this.x = x;
        this.y = y;
        this.z = z;
        this, yaw = yaw;
        this.attrs = attrs;
        this.isPlayer = false;
        this.ownerSyncPos = false;
    }
    return GhostEntity;
}());
exports["default"] = GhostEntity;

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
        var _this_1 = this;
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
        this.isDestroyed = false;
        this.toString = function () {
            return _this_1.typeName + "<" + _this_1.ID + ">";
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
            GoWorld_1["default"].gameClient.callServerMethod(_this_1, method, args);
        };
        /**
         * 接受远程调用
         * @param {*} method
         * @param {*} args
         */
        this.onCall = function (method, args) {
            console.log(_this_1.toString() + "." + method + "(" + args + ")");
            _this_1[method].apply(_this_1, args);
        };
        /**
         * 属性attrs变更
         * @param {*} path
         * @param {*} key
         * @param {*} val
         */
        this.applyMapAttrChange = function (path, key, val) {
            var attr = _this_1.getAttrByPath(path);
            var rootkey = path.length > 0 ? path[0] : key;
            attr[key] = val;
            _this_1['onAttrChange_' + rootkey]();
        };
        /**
         * 属性删除
         * @param {*} path
         * @param {*} key
         */
        this.applyMapAttrDel = function (path, key) {
            var rootkey = path.length > 0 ? path[0] : key;
            var attr = _this_1.getAttrByPath(path);
            delete attr[key];
            _this_1['onAttrChange_' + rootkey]();
        };
        this.getAttrByPath = function (path) {
            var attr = _this_1.attrs;
            for (var i = 0; i < path.length; i++) {
                var key = path[i];
                attr = attr[key];
            }
            return attr;
        };
        this.onBecomePlayer = function () {
            console.log("eid:" + _this_1.ID + ",typeName:" + _this_1.typeName + "获得玩家对象：");
        };
        this.destroy = function () {
            console.log("eid:" + _this_1.ID + "destroy");
            if (_this_1.isDestroyed) {
                return;
            }
        };
        this._this = this;
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
    GhostEntity.prototype.onCreated = function () {
        console.log("Account created, start logining...", this._this.ID);
    };
    return GhostEntity;
}());
exports["default"] = GhostEntity;

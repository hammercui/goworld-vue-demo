"use strict";
exports.__esModule = true;
/**
 * GoGorld生命周期的各种事件监听
 */
var GameClient_1 = require("./GameClient");
var GoGorld = /** @class */ (function () {
    function GoGorld() {
    }
    GoGorld.gameClient = new GameClient_1["default"]();
    //网络状态变化
    GoGorld.onNetChange = function () { };
    return GoGorld;
}());
exports["default"] = GoGorld;

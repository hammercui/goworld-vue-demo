"use strict";
/**
 * 常量与枚举
 */
exports.__esModule = true;
exports.SIZE_FIELD_SIZE = exports.ENTITYID_LENGTH = exports.CLIENTID_LENGTH = exports.RecvEnum = void 0;
var RecvEnum;
(function (RecvEnum) {
    RecvEnum[RecvEnum["_RECV_PAYLOAD_LENGTH"] = 1] = "_RECV_PAYLOAD_LENGTH";
    RecvEnum[RecvEnum["_RECV_PAYLOAD"] = 2] = "_RECV_PAYLOAD";
})(RecvEnum = exports.RecvEnum || (exports.RecvEnum = {}));
exports.CLIENTID_LENGTH = 16;
exports.ENTITYID_LENGTH = 16;
exports.SIZE_FIELD_SIZE = 4;

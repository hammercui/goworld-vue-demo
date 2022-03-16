"use strict";
/**
 * 协议
 */
exports.__esModule = true;
var Proto = /** @class */ (function () {
    function Proto() {
    }
    Proto.SIZE_FIELD_SIZE = 4;
    Proto.MAX_PAYLOAD_LEN = 1 * 1024 * 1024;
    Proto.CLIENTID_LENGTH = 16;
    Proto.ENTITYID_LENGTH = 16;
    Proto.MT_INVALID = 0;
    // Server Messages
    Proto.MT_SET_GAME_ID = 1;
    Proto.MT_SET_GATE_ID = 2;
    Proto.MT_NOTIFY_CREATE_ENTITY = 3;
    Proto.MT_NOTIFY_DESTROY_ENTITY = 4;
    // static MT_DECLARE_SERVICE = 5;
    // static MT_UNDECLARE_SERVICE = 6;
    Proto.MT_CALL_ENTITY_METHOD = 6;
    Proto.MT_CREATE_ENTITY_SOMEWHERE = 7;
    Proto.MT_LOAD_ENTITY_SOMEWHERE = 8;
    Proto.MT_NOTIFY_CLIENT_CONNECTED = 9;
    Proto.MT_NOTIFY_CLIENT_DISCONNECTED = 10;
    Proto.MT_CALL_ENTITY_METHOD_FROM_CLIENT = 11;
    Proto.MT_SYNC_POSITION_YAW_FROM_CLIENT = 12;
    // static MT_NOTIFY_ALL_GAMES_CONNECTED = 14;
    Proto.MT_NOTIFY_GATE_DISCONNECTED = 13;
    Proto.MT_START_FREEZE_GAME = 14;
    Proto.MT_START_FREEZE_GAME_ACK = 15;
    // Message types for migrating
    Proto.MT_MIGRATE_REQUEST = 16;
    Proto.MT_REAL_MIGRATE = 17;
    // MT_QUERY_SPACE_GAMEID_FOR_MIGRATE is a message type for entity migrations
    Proto.MT_QUERY_SPACE_GAMEID_FOR_MIGRATE = 18;
    Proto.MT_CANCEL_MIGRATE = 19;
    // MT_CALL_NIL_SPACES message is used to call nil spaces on all games
    Proto.MT_CALL_NIL_SPACES = 20;
    // MT_SET_GAME_ID_ACK is sent by dispatcher to game to ACK MT_SET_GAME_ID message
    Proto.MT_SET_GAME_ID_ACK = 21;
    // MT_NOTIFY_GAME_CONNECTED is sent by dispatcher to game to notify new game connected
    Proto.MT_NOTIFY_GAME_CONNECTED = 22;
    Proto.MT_NOTIFY_GAME_DISCONNECTED = 23;
    Proto.MT_NOTIFY_DEPLOYMENT_READY = 24;
    // MT_GAME_LBC_INFO contains game load balacing info
    Proto.MT_GAME_LBC_INFO = 25;
    /******handle client reconnect gate******************/
    //26 gate notify client connect is ok,wait session connect
    Proto.MT_SEND_CLIENT_CONNECTED = 26;
    //27 client send gate session for re connect
    Proto.MT_RECONN_SESSION = 27;
    //28 gate notify  client re connect success
    Proto.MT_RECONN_SUCC = 28;
    //29 query game entity and space detail, refresh clientID, and turn to gate
    Proto.MT_RECONN_ASK_GAME_INFO = 29;
    //30
    Proto.MT_RECONN_ASK_GAME_INFO_ACK = 30;
    //30 client notify gate re connect complete,wait more packet
    Proto.MT_RECONN_COMPLETE = 30;
    Proto.MT_GATE_SERVICE_MSG_TYPE_START = 1000;
    Proto.MT_REDIRECT_TO_GATEPROXY_MSG_TYPE_START = 1001; // messages that should be redirected to client proxy
    Proto.MT_CREATE_ENTITY_ON_CLIENT = 1002;
    Proto.MT_DESTROY_ENTITY_ON_CLIENT = 1003;
    Proto.MT_NOTIFY_MAP_ATTR_CHANGE_ON_CLIENT = 1004;
    Proto.MT_NOTIFY_MAP_ATTR_DEL_ON_CLIENT = 1005;
    Proto.MT_NOTIFY_LIST_ATTR_CHANGE_ON_CLIENT = 1006;
    Proto.MT_NOTIFY_LIST_ATTR_POP_ON_CLIENT = 1007;
    Proto.MT_NOTIFY_LIST_ATTR_APPEND_ON_CLIENT = 1008;
    Proto.MT_CALL_ENTITY_METHOD_ON_CLIENT = 1009;
    Proto.MT_UPDATE_POSITION_ON_CLIENT = 1010;
    Proto.MT_UPDATE_YAW_ON_CLIENT = 1011;
    Proto.MT_SET_CLIENTPROXY_FILTER_PROP = 1012;
    Proto.MT_CLEAR_CLIENTPROXY_FILTER_PROPS = 1013;
    Proto.MT_NOTIFY_MAP_ATTR_CLEAR_ON_CLIENT = 1014;
    // add more ...
    Proto.MT_REDIRECT_TO_GATEPROXY_MSG_TYPE_STOP = 1500;
    Proto.MT_CALL_FILTERED_CLIENTS = 1501;
    Proto.MT_SYNC_POSITION_YAW_ON_CLIENTS = 1502;
    // add more ...
    Proto.MT_GATE_SERVICE_MSG_TYPE_STOP = 2000;
    return Proto;
}());
exports["default"] = Proto;

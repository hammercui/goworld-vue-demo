/**
 * 协议
 */
export default class Proto {
    static SIZE_FIELD_SIZE: number;
    static MAX_PAYLOAD_LEN: number;
    static CLIENTID_LENGTH: number;
    static ENTITYID_LENGTH: number;
    static MT_INVALID: number;
    static MT_SET_GAME_ID: number;
    static MT_SET_GATE_ID: number;
    static MT_NOTIFY_CREATE_ENTITY: number;
    static MT_NOTIFY_DESTROY_ENTITY: number;
    static MT_CALL_ENTITY_METHOD: number;
    static MT_CREATE_ENTITY_SOMEWHERE: number;
    static MT_LOAD_ENTITY_SOMEWHERE: number;
    static MT_NOTIFY_CLIENT_CONNECTED: number;
    static MT_NOTIFY_CLIENT_DISCONNECTED: number;
    static MT_CALL_ENTITY_METHOD_FROM_CLIENT: number;
    static MT_SYNC_POSITION_YAW_FROM_CLIENT: number;
    static MT_NOTIFY_GATE_DISCONNECTED: number;
    static MT_START_FREEZE_GAME: number;
    static MT_START_FREEZE_GAME_ACK: number;
    static MT_MIGRATE_REQUEST: number;
    static MT_REAL_MIGRATE: number;
    static MT_QUERY_SPACE_GAMEID_FOR_MIGRATE: number;
    static MT_CANCEL_MIGRATE: number;
    static MT_CALL_NIL_SPACES: number;
    static MT_SET_GAME_ID_ACK: number;
    static MT_NOTIFY_GAME_CONNECTED: number;
    static MT_NOTIFY_GAME_DISCONNECTED: number;
    static MT_NOTIFY_DEPLOYMENT_READY: number;
    static MT_GAME_LBC_INFO: number;
    /******handle client reconnect gate******************/
    static MT_SEND_CLIENT_CONNECTED: number;
    static MT_RECONN_SESSION: number;
    static MT_RECONN_SUCC: number;
    static MT_RECONN_ASK_GAME_INFO: number;
    static MT_RECONN_ASK_GAME_INFO_ACK: number;
    static MT_RECONN_COMPLETE: number;
    static MT_GATE_SERVICE_MSG_TYPE_START: number;
    static MT_REDIRECT_TO_GATEPROXY_MSG_TYPE_START: number;
    static MT_CREATE_ENTITY_ON_CLIENT: number;
    static MT_DESTROY_ENTITY_ON_CLIENT: number;
    static MT_NOTIFY_MAP_ATTR_CHANGE_ON_CLIENT: number;
    static MT_NOTIFY_MAP_ATTR_DEL_ON_CLIENT: number;
    static MT_NOTIFY_LIST_ATTR_CHANGE_ON_CLIENT: number;
    static MT_NOTIFY_LIST_ATTR_POP_ON_CLIENT: number;
    static MT_NOTIFY_LIST_ATTR_APPEND_ON_CLIENT: number;
    static MT_CALL_ENTITY_METHOD_ON_CLIENT: number;
    static MT_UPDATE_POSITION_ON_CLIENT: number;
    static MT_UPDATE_YAW_ON_CLIENT: number;
    static MT_SET_CLIENTPROXY_FILTER_PROP: number;
    static MT_CLEAR_CLIENTPROXY_FILTER_PROPS: number;
    static MT_NOTIFY_MAP_ATTR_CLEAR_ON_CLIENT: number;
    static MT_REDIRECT_TO_GATEPROXY_MSG_TYPE_STOP: number;
    static MT_CALL_FILTERED_CLIENTS: number;
    static MT_SYNC_POSITION_YAW_ON_CLIENTS: number;
    static MT_GATE_SERVICE_MSG_TYPE_STOP: number;
}

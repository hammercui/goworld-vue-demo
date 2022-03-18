/**
 * 协议
 */

export default class Proto{ 
        public static SIZE_FIELD_SIZE = 4;
        public static MAX_PAYLOAD_LEN = 1 * 1024 * 1024;

        static CLIENTID_LENGTH = 16;
        static ENTITYID_LENGTH = 16;

        static MT_INVALID = 0;
        // Server Messages
        static MT_SET_GAME_ID = 1;
        static MT_SET_GATE_ID = 2;
        static MT_NOTIFY_CREATE_ENTITY = 3;
        static MT_NOTIFY_DESTROY_ENTITY = 4;
        // static MT_DECLARE_SERVICE = 5;
        // static MT_UNDECLARE_SERVICE = 6;
        static MT_CALL_ENTITY_METHOD = 6;
        static MT_CREATE_ENTITY_SOMEWHERE = 7;
        static MT_LOAD_ENTITY_SOMEWHERE = 8;
        static MT_NOTIFY_CLIENT_CONNECTED = 9;
        static MT_NOTIFY_CLIENT_DISCONNECTED = 10;
        static MT_CALL_ENTITY_METHOD_FROM_CLIENT = 11;
        static MT_SYNC_POSITION_YAW_FROM_CLIENT = 12;
        // static MT_NOTIFY_ALL_GAMES_CONNECTED = 14;
        static MT_NOTIFY_GATE_DISCONNECTED = 13;
        static MT_START_FREEZE_GAME = 14;
        static MT_START_FREEZE_GAME_ACK = 15;
        // Message types for migrating
        static MT_MIGRATE_REQUEST = 16;
        static MT_REAL_MIGRATE = 17;

            // MT_QUERY_SPACE_GAMEID_FOR_MIGRATE is a message type for entity migrations
        static MT_QUERY_SPACE_GAMEID_FOR_MIGRATE = 18;
        static MT_CANCEL_MIGRATE = 19;

        // MT_CALL_NIL_SPACES message is used to call nil spaces on all games
        static MT_CALL_NIL_SPACES = 20;
        // MT_SET_GAME_ID_ACK is sent by dispatcher to game to ACK MT_SET_GAME_ID message
        static MT_SET_GAME_ID_ACK = 21;
        // MT_NOTIFY_GAME_CONNECTED is sent by dispatcher to game to notify new game connected
        static MT_NOTIFY_GAME_CONNECTED = 22;
        static MT_NOTIFY_GAME_DISCONNECTED = 23;
        static MT_NOTIFY_DEPLOYMENT_READY = 24;
         // MT_GAME_LBC_INFO contains game load balacing info
        static MT_GAME_LBC_INFO = 25;
        
        /******handle client reconnect gate******************/
        //26 gate notify client connect is ok,wait session connect
        static MT_SEND_CLIENT_CONNECTED = 26;
        //27 client send gate session for re connect
        static MT_RECONN_SESSION = 27;
        //28 gate notify  client re connect success
        static MT_RECONN_SUCC = 28;
        //29 query game entity and space detail, refresh clientID, and turn to gate
        static MT_RECONN_ASK_GAME_INFO = 29;
        //30
        static MT_RECONN_ASK_GAME_INFO_ACK = 30;
        //30 client notify gate re connect complete,wait more packet
        static MT_RECONN_COMPLETE = 30;
        
        

        static MT_GATE_SERVICE_MSG_TYPE_START = 1000;
        static MT_REDIRECT_TO_GATEPROXY_MSG_TYPE_START = 1001; // messages that should be redirected to client proxy
        static MT_CREATE_ENTITY_ON_CLIENT = 1002;
        static MT_DESTROY_ENTITY_ON_CLIENT = 1003;
        static MT_NOTIFY_MAP_ATTR_CHANGE_ON_CLIENT = 1004;
        static MT_NOTIFY_MAP_ATTR_DEL_ON_CLIENT = 1005;
        static MT_NOTIFY_LIST_ATTR_CHANGE_ON_CLIENT = 1006;
        static MT_NOTIFY_LIST_ATTR_POP_ON_CLIENT = 1007;
        static MT_NOTIFY_LIST_ATTR_APPEND_ON_CLIENT = 1008;
        static MT_CALL_ENTITY_METHOD_ON_CLIENT = 1009;
        static MT_UPDATE_POSITION_ON_CLIENT = 1010;
        static MT_UPDATE_YAW_ON_CLIENT = 1011;
        static MT_SET_CLIENTPROXY_FILTER_PROP = 1012;
        static MT_CLEAR_CLIENTPROXY_FILTER_PROPS = 1013;
        static MT_NOTIFY_MAP_ATTR_CLEAR_ON_CLIENT = 1014;

        // add more ...

        static MT_REDIRECT_TO_GATEPROXY_MSG_TYPE_STOP = 1500;

        static MT_CALL_FILTERED_CLIENTS = 1501;
        static MT_SYNC_POSITION_YAW_ON_CLIENTS = 1502;

        // add more ...

        static MT_GATE_SERVICE_MSG_TYPE_STOP = 2000;
}
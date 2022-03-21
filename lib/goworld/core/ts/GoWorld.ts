/**
 * GoGorld生命周期的各种事件监听
 */
import GameClient from './GameClient'
import GoWorldArgs from './GoWorldArgs';
import * as EntityManager from './EntityManager';

export default class GoGorld{

    public static readonly gameClient = new GameClient();

    //网络状态变化
    public static onNetChange = () => {}
    //entity新建
      
    //entity销毁

    /**
     * 滴答实体,由外部定时器调度
     */
    public static tick(){
        EntityManager.tick();
    }

    
    /**
     * 启动连接
     * @param opts 
     */
    public static connect(opts: GoWorldArgs){
        GoGorld.gameClient.connect(opts);
    }
}



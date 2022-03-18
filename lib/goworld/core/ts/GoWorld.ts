/**
 * GoGorld生命周期的各种事件监听
 */
import GameClient from './GameClient'
import GoWorldArgs from './GoWorldArgs';


export default class GoGorld{

    public static readonly gameClient = new GameClient();

    //网络状态变化
    public static onNetChange = () => {}
    //entity新建
      
    //entity销毁

    /**
     * 滴答
     */
    public static tick: Function = () => {}
    
    /**
     * 启动连接
     * @param opts 
     */
    public static connect(opts: GoWorldArgs){
        GoGorld.gameClient.connect(opts);
    }
}



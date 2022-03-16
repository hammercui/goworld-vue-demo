/**
 * GoGorld生命周期的各种事件监听
 */
import GameClient from './GameClient'

export default class GoGorld{

    public static readonly gameClient = new GameClient();

    //网络状态变化
    public static onNetChange = () => {}
    //entity新建
    
    //entity销毁
}



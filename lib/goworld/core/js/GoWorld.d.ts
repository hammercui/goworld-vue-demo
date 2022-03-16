/**
 * GoGorld生命周期的各种事件监听
 */
import GameClient from './GameClient';
export default class GoGorld {
    static readonly gameClient: GameClient;
    static onNetChange: () => void;
}

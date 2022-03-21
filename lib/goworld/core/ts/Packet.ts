/**
 * 发送包
 */

export default class Packet{


    public constructor(mt: number){

    }

    public static New(mt: number): Packet{
        let packet = new Packet(mt);
        return packet;
    }
}
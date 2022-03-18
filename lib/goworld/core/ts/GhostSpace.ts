import GhostEntity from './GhostEntity'


export default class GhostService extends GhostEntity{

    public onCreated = ()=>{
        super.onCreated();
        this.tickEnable = false;
    }
}
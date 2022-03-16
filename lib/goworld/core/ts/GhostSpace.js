import GhostEntity from './GhostEntity'


export default class GhostService extends GhostEntity{

    onCreated(){
        super.onCreated();
        this.tickEnable = false;
    }
}
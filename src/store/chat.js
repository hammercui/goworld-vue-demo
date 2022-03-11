/**
 * 聊天状态
 */

 import * as _ from 'lodash';

 const chat = {
    namespaced: true,
    state: {
    
    }, 
    
    actions: {
        // 
        async fetchInfo({ dispatch, commit }, payload) {
            try {
                // const res = await info(payload);
                // if(res.code == 1) {
                //     commit('setInfo', res.data);
                // }
            }catch(err) {
                console.log(err);
            }
        },
    },
    mutations: {
        // setInfo(state, payload) {
        //     console.log(1111,payload);
        //     state.galleryList = payload.galleryList;
        //     state.normalList = payload.normalList;
        // }
    }
}
export default chat;
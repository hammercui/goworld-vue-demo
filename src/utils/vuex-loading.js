/* eslint-disable no-console */
/*
 * @Description: 仿dva-loading全局异步状态插件
 * @version: 1.0.0
 * @Company: sdbean
 * @Author: hammercui
 * @Date: 2019-12-17 13:41:32
 * @LastEditors: hammercui
 * @LastEditTime: 2019-12-17 15:42:38
 */
const NAMESPACE = 'loading'; // 定义模块名
const SHOW = 'LOADINGSHOW'; // 显示mutation 同步type
const HIDE = 'LOADINGHIDE';

const createLoadingPlugin = ({ namespace = NAMESPACE, includes = [], excludes = [] } = {}) => {
	return store => {
		if (store.state[namespace]) {
			throw new Error(`createLoadingPlugin: ${namespace} exited in current store`);
		}

		// new vuex的时候注册一个模块进去
		store.registerModule(namespace, {
			namespaced: true,
			state: {
				global: false, // 定义全局loading
				models: {}, // 定义模块
				effects: {} //定义effect 异步操作
			},
			// 同步方法
			mutations: {
				[SHOW] (state, { actionType,modelName }) {
                    state.global = true;
                    state.models = {
                        ...state.models,
                        [modelName]: true
                    }
					state.effects = {
						...state.effects,
						[actionType]: true // 将当前的action 置为true
					};
				},
				[HIDE] (state, { actionType,modelName }) {
                    state.global = false;
                    state.models = {
                        ...state.models,
                        [modelName]: false
                    }
                    
					state.effects = {
						...state.effects,
						[actionType]: false // 将当前的action 置为false
					};
				}
			}
		});

		store.subscribeAction({
			// 发起一个action 之前会走这里
			before: (action, state) => {
                console.group(`ACTION: ${action.type} before`);
                console.log("action:",action);
                console.log("state:",state);
                let modelName = action.type.split("/")[0];
                console.groupEnd();
				if (onEffect(action, includes, excludes)) {
					store.commit({ type: `loading/${SHOW}`, actionType: action.type, modelName: modelName });
				}
			},
			// 发起一个action 之后会走这里
			after: (action, state) => {
                console.group(`ACTION: ${action.type} after`);
                console.log("action:",action);
                console.log("state:",state);
                let modelName = action.type.split("/")[0];
                console.groupEnd();
				if (onEffect(action, includes, excludes)) {
					store.commit({ type: `loading/${HIDE}`, actionType: action.type, modelName: modelName });
				}
			}
		});
	};
};

// 判断是否要执行
function onEffect({ type }, includes, excludes) {
	if (includes.length === 0 && excludes.length === 0) {
		return true;
	}

	if (includes.length > 0) {
		return includes.indexOf(type) > -1;
	}

	return excludes.length > 0 && excludes.indexOf(type) === -1;
}

export default createLoadingPlugin;

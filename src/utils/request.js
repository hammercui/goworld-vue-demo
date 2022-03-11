

/* eslint-disable no-undef */
/* eslint-disable no-console */

import axios from 'axios';
import qs from 'qs';
// import { showToast } from './../utils/utils';

//全局缓存map
const GlobalCacheMap = {};

export function setGlobalMapValue(key, value) {
	if (value) {
		//cookie 空格替换为+
		if (key == 'cookie' && value.indexOf(" ") != -1) {
			console.info('cookie存在空格', key, value);
			value = value.replace(/\s/g, "+");
		}
		console.info('set', key, value);
		GlobalCacheMap[key] = value;
	}
}

export function getGlobalMapValue(key) {
	return GlobalCacheMap[key];
}

//缺省base url
// export function baseUrl() {
// 	// return `/Werewolf/DailyMission/PHPCode/api/`;
// 	return process.env.VUE_APP_BASE_PHP_API_URL;
// }

export function request(url, option) {
	let realUrl = '';
	// if (option.isHaveBase) {
	// 	realUrl = url;
	// } else {
	// 	realUrl = baseUrl() + url;
	// }
	realUrl = url;

	const method = option.method;
	const body = option.body;
	if (getGlobalMapValue('userNo')) {
		body['userNo'] = getGlobalMapValue('userNo');
	}
	if (getGlobalMapValue('cookie')) {
		body['cookie'] = getGlobalMapValue('cookie');
	}
	if (getGlobalMapValue('verifycode')) {
		body['verifycode'] = getGlobalMapValue('verifycode');
	}
	if (getGlobalMapValue('ispop')) {
		body['ispop'] = getGlobalMapValue('ispop');
	}

	console.group(method, realUrl);
	console.log('request body-->:', body);
	if (method === 'GET') {
		return axios
			.get(realUrl, { params: body })
			.then((response) => {
				console.log('response body<--:', response.data);
				console.groupEnd();
				return response.data;
			})
			.catch((err) => {
				console.error('response err<--:', err);
				console.groupEnd();
				if (err.response && err.response.data) {
					return err.response.data;
				}
				throw err;
			});
	} else {
		return axios
			.post(realUrl, qs.stringify(body))
			.then((response) => {
				console.log('response body<--:', response.data);
				console.groupEnd();
			
				return response.data;
			})
			.catch((err) => {
				console.error('response err<--:', err);
				if (err.response) {
					console.error('response body<--:', err.response.data);
				}
				console.groupEnd();
				if (err.response && err.response.data) {
					return err.response.data;
				}
				throw err;
			});
	}
}

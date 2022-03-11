/* eslint-disable no-undef */
/* eslint-disable no-console */
/*
 * @Description: 无
 * @version: 1.0.0
 * @Company: sdbean
 * @Author: hammercui
 * @Date: 2019-11-18 10:32:03
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-09-18 14:49:53
 */



export function getParam(param) {
	let query = window.location.search;
	let iLen = param.length;
	let iStart = query.indexOf(param);
	if (iStart == -1) return '';
	iStart += iLen + 1;
	let iEnd = query.indexOf('&', iStart);
	if (iEnd == -1) {
		return query.substring(iStart);
	}
	return query.substring(iStart, iEnd);
}


export function isUrl(url) {
	const reg = /^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/).+$/;
	if (!reg.test(url)) {
		return false;
	} else {
		return true;
	}
}

//跳转页面
export function TurnToPage(pageType, url) {
	//pageType = 10;url = '';充值界面
	let message = `{"type":${pageType},"url":"${url}"}`;
	if (/(iPhone|iPad|iPod|iOS|Mac OS X)/i.test(navigator.userAgent)) {
		//判断iPhone|iPad|iPod|iOS
		window.webkit.messageHandlers.TurnToPage.postMessage(message);
	} else if (/(Android)/i.test(navigator.userAgent)) {
		//判断Android
		wx.TurnToPage(message);
	} else {
		console.log(message);
	}
}

// 跳转cp主页
export function TurnToCpPage(cpId, cpUserId, userNo) {
	// type:9,cpId:cp的id,userNo:用户id,cpUserId:用户的cpid
	let message = `{"type":9,"cpId":"${cpId}","cpUserId":"${cpUserId}","userNo":"${userNo}"}`;
	if (/(iPhone|iPad|iPod|iOS|Mac OS X)/i.test(navigator.userAgent)) {
		//判断iPhone|iPad|iPod|iOS
		window.webkit.messageHandlers.TurnToPage.postMessage(message);
	} else if (/(Android)/i.test(navigator.userAgent)) {
		//判断Android
		wx.TurnToPage(message);
	} else {
		console.log(message);
	}
}

//获取屏幕可视区域宽，高
export function getVisualHeightOfTheScreen() {
	return [ document.documentElement.clientWidth, document.documentElement.clientHeight ];
}

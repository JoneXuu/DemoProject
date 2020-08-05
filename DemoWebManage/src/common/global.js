
var domain = 'https://www.mxnzp.com/',
	fileDomain = domain+'Images/';

var defaultImg='this.src="' + require('@/assets/logo.jpg') + '"';
var uploadUrl=domain+"UploadPhoto.ashx";

var hasAction = false; //有操作正在进行
function noAction() { //
	if (hasAction) {
		return false;
	} else {
		hasAction = true;
		setTimeout(() => {
			hasAction = false;
		}, 666)
		return true;
	}
}


import { notification } from 'ant-design-vue'//引入
notification.config({//写配置//一些参你也可以配置到动态的，看个人需要
    placement: 'topRight',
    top: '50px',
    duration: 3,
});

function toast(tit, type='info', cont='') {
  //默认info类型通知，可传success/error/warning/warn/open/close/destroy
    notification[type]({
        message: tit,
        description: cont,
    });
}

import moment from 'moment'
var weekStr = ["日", "一", "二", "三", "四", "五", "六"];

function formatTime(time, noSuitable = true, isUTC = false) { //获取最佳显示时间
	if (time != undefined && moment(time, moment.ISO_8601).isValid()) { //moment.ISO_8601
		let utcTime = '';
		if (isUTC) {
			utcTime = moment.utc(time).local();
		} else {
			utcTime = moment.utc(time).subtract(8, "hours").local();
		}
		//console.log("标准",utcTime.format("YYYY-MM-DD HH:mm"))
		let sTime = moment(utcTime),
			sYear = moment(utcTime).get('year'),
			sMonth = moment(utcTime).get('month'),
			sDay = moment(utcTime).get('date'),
			returnStr = sTime.format("YYYY-MM-DD");

		if (noSuitable) {
			// if (sTime.format("HH:mm") != "00:00") { //有详细时间
			// 	returnStr = sTime.format("YYYY-MM-DD HH:mm");
			// }
			// if (sYear == moment().get('year')) { //今年
			// 	returnStr = sTime.format("MM-DD HH:mm");
			// 	if (sTime.format("HH:mm") == "00:00") { //没有详细时间
			// 		returnStr = sTime.format("MM-DD");
			// 	}
			// }
		} else {
			if (sYear == moment().get('year')) { //今年
				returnStr = sTime.format("MM-DD")
				if (sMonth == moment().get('month')) { //今月
					if (sDay == moment().get('date')) { //今天
						returnStr = sTime.format("HH:mm")
						if (returnStr == "00:00") { //没有详细时间
							returnStr = sTime.format("MM-DD");
						} else { //有详细时间
							if (moment().diff(sTime, 'hours') > 0) {
								returnStr = moment().diff(sTime, 'hours') + "小时前";
							} else {
								if (moment().diff(sTime, 'minutes') > 0) {
									returnStr = moment().diff(sTime, 'minutes') + "分钟前";
								} else {
									returnStr = "刚刚"
								}
							}
						}
					} else if (sDay == moment().subtract(1, "days").get('date')) { //昨天
						returnStr = "昨天";
					} else if (sTime.week() == moment().week()) { //同周
						returnStr = "周" + weekStr[sTime.weekday()];
					} else if (sTime.week() == (moment().week() - 1)) { //同周
						returnStr = "上周" + weekStr[sTime.weekday()];
					}
				}
			}

		}
		return returnStr;
	} else {
		return "";
	}
}

//格式化数字
function formatNumber(value) {
	let strValue = '0';
	value = parseFloat(value);
	if (isNaN(value)) {
		strValue = '0';
	}
	if (value >= 10000 * 10000) {
		strValue = (value / 10000.0 / 10000.0).toFixed(1) + '亿';
	} else if (value >= 10000) {
		strValue = (value / 10000.0).toFixed(1) + '万';
	} else {
		strValue = value;
	}
	return strValue;
}

//格式化图片
function formatImage(url) {
	let result = '';
	if (url == null || url == '') {
		result = '/static/image/defaultHead.png';
	} else {
		if (url.match(/https?:\/\//g)==null) {
			result = fileDomain + url;
		} else {
			result = url;
		}
	}
	return result;
}

//格式化图片
function hideMobile(phone) {
	let result = '未知号码';
	if (phone) {
		let start = phone.substr(0, 3),
			end = phone.slice(-4);
		result = start + "****" + end;
	}
	return result;
}


function isEmpty(keyArr,obj) {
	let reKey=false;
	for(let key of keyArr){
		let val=obj[key];
		if(val==''||val==undefined||val==null){
			reKey=key;
			break;
		}
		if(key.indexOf('Telephone')>-1){
			if(!(/^1[3456789]\d{9}$/.test(val))){
				reKey=key;
				break;
			}
		}
	}
	return reKey;
}

function formatMinutes(minutes) {
	var day = parseInt(Math.floor(minutes / 1440));
	var hour = day > 0?
		Math.floor((minutes - day * 1440) / 60):
		Math.floor(minutes / 60);
	var minute = hour > 0?
		Math.floor(minutes - day * 1440 - hour * 60):
		minutes;
	var time = "";
	if (day > 0) time += day + "天";
	if (hour > 0) time += hour + "小时";
	if (minute > 0) time += minute + "分钟";
	return time;
}

export default {
	domain,
	fileDomain,
  defaultImg,
  uploadUrl,
	toast,
	hideMobile,
	isEmpty,
	formatNumber,
	formatImage,
	formatTime,
	formatMinutes
}


// //#ifdef APP-PLUS
// plus.runtime.getProperty(plus.runtime.appid, (inf) => {
// 	let wgtVersion = inf.version;
// 	common.version = wgtVersion;
// });
// //#endif


// function versionChecked(currentV, currentV2) {
// 	let oldV = currentV2.split(".");
// 	let newV = currentV.split(".");
// 	for (let i = 0; i < oldV.length; i++) {
// 		let item = +oldV[i];
// 		let item2 = +newV[i];
// 		if (item != item2) {
// 			if (item > item2) {
// 				//旧版大于新版 直接返回false
// 				return false; //不需要升级
// 			} else {
// 				return true;
// 			}
// 		} else {
// 			continue;
// 		}
// 	}
// 	return false; //不需要升级
// }

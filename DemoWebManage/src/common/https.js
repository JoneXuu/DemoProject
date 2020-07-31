import Global from './global'
import Store from './vuex'
import axios from 'axios'
import qs from 'qs';
var isLoading=0;
function showLoading(){
	if(isLoading<=0){
		// Store.state.gLoad=true;
		Store.commit('showLoad')
	}
	isLoading++;
}

function hideLoading(){
	// Store.state.gLoad=false;
	Store.commit('hideLoad')
	isLoading--;
}

function uploadFile(fileOrg, callback) {
	showLoading();
	uni.uploadFile({
		url: Global.domain+"UploadPhoto.ashx?folder=Image&fileName="+fileOrg,
		filePath: fileOrg,
		name: "file",
		success: (res) => {
			if (res.statusCode == 200) {
				let obj =JSON.parse(res.data)
				// let obj =res.data.replace(/D:\\File\\log_IIS\\/g,'');
				callback(obj.data);
			}else{
				Global.toast("文件上传失败")
				console.log(res);
				callback(false);
			}
		},
		fail: (res) => {
			// console.log("FileUploadFail");
			callback(false);
		},
		complete:(res)=>{
			hideLoading();
		}
	});
}

function requestHttpCommon(api,sendData,met,code, callback) {

	if (typeof(sendData) == "string") {
		// sendData = "'" + sendData + "'";
	} else {
		sendData = JSON.stringify(sendData)
	}
	// console.log(sendData,Global.domain+"AppService.ashx");
	axios({
		url: Global.domain+"AppService.ashx",
		method:met,
		data: qs.stringify({
		  SystemCode: code,
		  MethodName: api,
		  RequestContent: sendData
		}),
		header:  {
        'Content-Type':'application/x-www-form-urlencoded'
		},
		timeout:20000,
	}).then((res) =>{
     // console.log(res,'httpSuccess');
     if (res.status >= 200&&res.status<300) {
     	let endResult=res.data;
     	try{
     		// endResult.IsSuccess=false;
     		if(endResult.ErrorID=="0"){//真成功
     			// endResult.IsSuccess=true;
     			if(endResult.data){
     				callback(endResult.data);
     			}else{
     				callback(true);
     			}
     		}else{
     			if(endResult.ErrorString){
     				let noShowStr=["未注册","无导航"];
     				if(noShowStr.indexOf(endResult.ErrorString)==-1){
     					Global.toast(endResult.ErrorString);
     				}
     			}else{
     				Global.toast('操作失败');
     			}
     			if(endResult.data){
     				callback(endResult.data)
     			}else{
     				callback(false)
     			}
     		}
     	}catch(e){
     		console.error('catchHttpError',e);
     		callback(false);
     	}
     }
     else{
     	Global.toast("ErrorCode:" + res.statusCode);
     	callback(res.data);
     }
  }).catch((error) =>{
     Global.toast("网络连接失败,请稍后再试");
     callback(false);
  })
}

function postHttp(api, sentData, callback) {
	let arrApi=api.split(";");
	let isNeedNotice=true;
	if(arrApi.length>1){//api分号后面拼接就表示不要通知
		isNeedNotice=false;
		api=arrApi[0];
	}else{
		// console.log(api);
		showLoading();
	}
	requestHttpCommon(api, sentData,'POST','TCSC', function(reDa) {
		callback(reDa);
		hideLoading();
	});
}

function getHttp(api, sentData, callback) {
	if(typeof(sentData)!="string"){
		let i=0;
		for(let key in sentData){
			if(i==0){
				api+="?";
			}else{
				api+="&";
			}
			api+=key+"="+sentData[key];
			i++;
		}
	}
	requestHttpCommon(api, sentData,'Get','TCSC', function(reDa) {
		callback(reDa);
	});
}


function freeHttp(api, sendData, callback) {

	var head = {
        'Content-Type':'application/x-www-form-urlencoded'
		// 'content-type': 'application/json',
		// 'Access-Control-Allow-Origin':'*'
    };
	// if (typeof(sendData) == "string") {
	// 	sendData = "'" + sendData + "'";
	// } else {
	// 	sendData = JSON.stringify(sendData)
	// }
	uni.request({
		url: api,
		method:"POST",
		data:sendData,
		header: head,
		timeout:60000,
		fail: (res) => {
			Global.toast("网络连接失败,请稍后再试");
			callback(false);
		},
		complete: (res) => {
			hideLoading();
		},
		success: (res) => {
			// console.log(res,'httpSuccess');
			callback(res.data);
		}
	});
}

export default {
	// hideLoading,
	// showLoading,
	postHttp,
	getHttp,
	freeHttp,
	uploadFile,
}

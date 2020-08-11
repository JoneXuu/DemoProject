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
		url: Global.uploadUrl+"?folder=Image&fileName="+fileOrg,
		filePath: fileOrg,
		name: "file",
		success: (res) => {
			if (res.statusCode == 200) {
				let obj =JSON.parse(res.data)
				// let obj =res.data.replace(/D:\\File\\log_IIS\\/g,'');
				callback(obj.data);
			}else{
				Global.toast("文件上传失败")
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

function requestHttpCommon(api,sendData,met, callback) {

	if (typeof(sendData) == "object") {
		 sendData = JSON.stringify(sendData)
	}
	axios({
		url: Global.domain+"api/"+api,
		method:met,
    //发送json数据用这个
		data: sendData,
    header:  {
        'Content-Type':'application/json',
        // "app_id":"wgnjhlfwlnirjhqg",
        // "app_secret":"KzlhN1VWVmFiSFIvK2ZPQ0xGS3hoUT09"
    },
  //   发送form-data请求用这个
		// data: qs.stringify(RequestContent: sendData),
		// header:  {
  //       'Content-Type':'application/x-www-form-urlencoded'
		// },
		timeout:20000,
	}).then((res) =>{
     // console.log(res,'httpSuccess');
     if (res.status >= 200&&res.status<300) {
     	let endResult=res.data;
     	callback(endResult)
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
	if(arrApi.length>1){//api分号后面拼接false就表示不要通知
		isNeedNotice=false;
		api=arrApi[0];
	}else{
		showLoading();
	}
	requestHttpCommon(api, sentData,'POST', function(reDa) {
		callback(reDa);
    if(isNeedNotice){
      hideLoading();
    }
	});
}

function getHttp(api, sentData, callback) {
	if(typeof(sentData)=="object"){
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
	requestHttpCommon(api, sentData,'Get', function(reDa) {
		callback(reDa);
	});
}


function freeHttp(api, sendData, callback) {

	uni.request({
		url: api,
		method:"POST",
		data:sendData,
		header: {
       'Content-Type':'application/x-www-form-urlencoded'
		// 'content-type': 'application/json',
		// 'Access-Control-Allow-Origin':'*'
    },
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

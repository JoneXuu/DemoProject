import Vue from 'vue';
import Vuex from 'vuex';
// import Http from './https.js';
// import Global from './global.js';
Vue.use(Vuex);


const store = new Vuex.Store({
	state: {
		gLoad: false,
		uInfo: {},
		pageTabList:[
			// {
			// 	title:"首页",
			// 	name:"HomeDefault",
			// 	path:"/Home",
			// 	canClose:false
			// }
		],
		actPage:0,
		isOpenRemember:true,
	},
	getters: {},
	mutations: {
		InitData(state) {

		},
		changeOpenRemember(state,val){
			state.isOpenRemember=val
		},
		changeActPage(state,val){
			state.actPage=val;
		},
		delPage(state,val){
			state.pageTabList.splice(val,1)
			if(state.actPage>=val){
				state.actPage-=1;
			}
		},
		pageJump(state,obj){
			let arr=state.pageTabList,needPush=true;
			for (var i = 0; i < arr.length; i++) {
				if(arr[i].path== obj.path){
					needPush=false;
					state.actPage=i;
				}
			}
			if(needPush){
				state.actPage=arr.length;
        state.pageTabList.push({
          title: obj.meta.title||'无标题',
          name: obj.name,
          path: obj.path,
          // canClose:obj.path!='/Home'
        })
			}

		},
    hideLoad(state){
			state.gLoad=false;
		},
		showLoad(state){
			state.gLoad=true;
		},
	},
	actions: {
		initApp(context) {
			context.commit('InitData')
		}
	}
})

export default store

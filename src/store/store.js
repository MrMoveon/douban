import Vue from 'vue';
import Vuex from 'vuex';
import {SHOW_LOADING,HIDE_LOADING} from './type';
Vue.use(Vuex);

const state={
	loading:false
}

const mutations={
	[SHOW_LOADING](state){
		state.loading=true;
	},
	[HIDE_LOADING](state){
		state.loading=false;
	}
}

const getters={
	
}

const actions={
	hideLoading:({commit})=>{
        commit(HIDE_LOADING)
    },
    showLoading:({commit})=>{
        commit(SHOW_LOADING)
    }
}


export default new Vuex.Store({
	state,
	mutations,
	getters,
	actions
	
})

import { getCache, setCache, removeCache } from '@/utils/session';
import { login, logout, getInfo } from '@/api/modules/user';
import router, { resetRouter } from '@/router';

const state = {
	userInfo: null,
	token: getCache('TOKEN') || ''
};

const mutations = {
	SET_TOKEN(state, token) {
		state.token = token;
	},
	SET_USERINFO(state, userInfo) {
		state.userInfo = userInfo;
	}
};

const actions = {
	login({ commit, dispatch }, userInfo) {
		// 本地修改
		return new Promise((resolve, reject) => {
			login(userInfo).then(res => {
				let { data } = res;
				if (data) {
					commit('SET_TOKEN', data.token);
					setCache('TOKEN', data.token);
					commit('SET_USERINFO', data);
					setCache('USERINFO', data);
					
					// 写入路由信息
					dispatch('permission/getRoute', data.role, { root: true}).then(accountRoutes => {
						console.log('获取路由：',accountRoutes);
						accountRoutes.forEach(item => router.addRoute(item) );
						resolve(res);
					});
				}
			}).catch(err => {
				reject(err);
			});
		});
	},
	getInfo({ commit, state }) {
		return new Promise((resolve, reject) => {
			getInfo({ token: state.token }).then(res => {
				let { data } = res;
				if (data) {
					commit('SET_USERINFO', data);
					setCache('USERINFO', data);
				}
				resolve(data);
			}).catch(err => {
				reject(err);
			});
		});
	},
	logout({ commit, state }) {
		return new Promise((resolve, reject) => {
			logout().then(res => {
				commit('SET_TOKEN', '');
				commit('SET_USERINFO', '');
				removeCache('TOKEN');
				removeCache('USERINFO');
				resetRouter();
				resolve(res);
			}).catch(err => {
				reject(err);
			});
		});
	},
};

export default {
	namespaced: true,
	state,
	mutations,
	actions
};

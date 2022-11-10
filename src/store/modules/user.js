import { getCache, setCache, removeCache } from '@/utils/session';
import { login, getInfo, loginOut } from '@/api/modules/user';
import { resetRouter } from '@/router';

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
	login({ commit }, userInfo) {
		// 本地修改
		return new Promise((resolve, reject) => {
			login(userInfo).then(res => {
				let { data } = res;
				if (data) {
					commit('SET_TOKEN', data.token);
					setCache('TOKEN', data.token);
				}
				resolve();
			}).catch(err => {
				reject(err);
			});
		});
	},
	logout({ commit, state }) {
		return new Promise((resolve, reject) => {
			loginOut().then(() => {
				commit('SET_TOKEN', '');
				commit('SET_USERINFO', '');
				removeCache('TOKEN');
				resetRouter();
				resolve();
			}).catch(err => {
				reject(err);
			});
		});
	},
	getInfo({ commit, state }) {
		return new Promise((resolve, reject) => {
			// getInfo({ token: state.token }).then(res => {
			// 	let { data } = res;
			// 	if (data) {
			// 		commit('SET_USERINFO', data);
			// 		setCache('USERINFO', data);
			// 	}
			// 	resolve(data);
			// }).catch(err => {
			// 	reject(err);
			// });
			let userInfo = {
				role: state.token,
				username: '王彬',
				password: '123456'
			};
			commit('SET_USERINFO', userInfo);
			setCache('USERINFO', userInfo);
			resolve(userInfo);
		});
	},
	updateInfo({ commit }, userInfo) {
		return new Promise((resolve, reject) => {
			commit('SET_USERINFO', userInfo);
			setCache('USERINFO', userInfo);
			resolve();
		});
	}
};

export default {
	namespaced: true,
	state,
	mutations,
	actions
};

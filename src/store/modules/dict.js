import HTTP from "@/utils/request";

// 字典项过期时间 - 10分钟
const EXPIRATION_TIME = 10 * 60 * 1000;

export default {
	namespaced: true,

	state: () => ({
		dict: {}
	}),

	getters: {
		isExistDict(state) {
			return type => !!state.dict[type];
		},
		getDict(state) {
			return type => state.dict[type];
		}
	},

	mutations: {
		setDict(state, { key, value }) {
			// 设置字典项
			state.dict[key] = value;
			// 设置字典项过期时间
			setTimeout(() => {
				state.dict[key] = null;
			}, EXPIRATION_TIME);
		}
	},

	actions: {
		getDictByType({ commit, getters }, type) {
			// 如果存在没有过期的字典项则直接返回
			if (getters.isExistDict(type)) return getters.getDict(type);

			// 否则则请求接口获取
			return HTTP({
				url: "/dict/list",
				params: { type },
				headers: {
					"Access-Control-Allow-Origin": "*"
				},
			}).then(dict => {
				commit("setDict", {
					key: type,
					value: dict
				});
				return dict;
			});
		}
	}
};

import { setCache } from '@/utils/session';
import { baseRoutes, asyncRoutes } from '@/router';
import router, { resetRouter } from '@/router';

const state = {
	routes: []
};

const mutations = {
	SET_ROUTE(state, route) {
		state.routes = baseRoutes.concat(route);
	}
};

const actions = {
	getRoute({ commit }, role) {
		return new Promise((resolve, reject) => {
			let accessedRoutes = [];
			if (role == 'super_admin') {
				accessedRoutes = asyncRoutes;
			} else {
				accessedRoutes = filterAsyncRoute(asyncRoutes, role);
			}
			commit('SET_ROUTE', accessedRoutes);
			resolve(accessedRoutes);
		});
	},
};

export function filterAsyncRoute(routes, role) {
	let arr = [];
	routes.forEach(item => {
		const temp = { ...item };
		if(hasChildren(temp, role)) {
			if (temp.children) {
				temp.children = filterAsyncRoute(temp.children, role);
			}
			arr.push(temp);
		}
	});
	return arr;
}

export function hasChildren(route, role) {
	if (route.meta && route.meta.role) {
		return route.meta.role.some(item => item == role);
	} else {
		return true;
	}
}

export default {
	namespaced: true,
	state,
	mutations,
	actions
};

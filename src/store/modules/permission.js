import { BASE_ROUTES, ASYNC_ROUTES } from '@/router';
import router, { resetRouter } from '@/router';

const state = {
	routes: []
};

const mutations = {
	SET_ROUTE(state, route) {
		state.routes = BASE_ROUTES.concat(route);
	}
};

const actions = {
	getRoute({ commit }, role) {
		return new Promise((resolve, reject) => {
			let accessedRoutes = [];
			if (role == 'superAdmin') {
				accessedRoutes = ASYNC_ROUTES;
			} else {
				accessedRoutes = filterAsyncRoute(ASYNC_ROUTES, role);
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
		return route.meta.role.some(item => item === role);
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

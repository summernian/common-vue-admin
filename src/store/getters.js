const getters = {
	token: state => state.user.token,
	roles: state => state.user.userInfo.role || '',
	baseRoute: state => state.permission.routes
};
export default getters;
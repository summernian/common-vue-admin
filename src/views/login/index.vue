<template>
	<div class="login-container bgImg content">
		<a-button type="primary" @click="login(1)">
			登录superAdmin
		</a-button>
		
		<a-button type="primary" @click="login(2)">
			登录admin
		</a-button>
	</div>
</template>

<script>
	import { message } from 'ant-design-vue';
	import { getCache, setCache, removeCache } from '@/assets/utils/session';
	export default {
		name: 'login',
		data() {
			return {

			};
		},
		created() {
			const isLogin = getCache('TOKEN');
			if(isLogin) {
				console.log('已经登录过了哦~');
				// this.$router.replace({ path: '/' }); // 直接刚首页
				this.$router.go(-1); // 跳转前一个页面
			}
		},
		mounted() {

		},
		methods: {
			login(type) {
				console.log('登录模式：',type);
				let mobile = type==1?'超级管理员':'管理员',
					dx_yzm = 123;
				this.$store.dispatch('user/login', { mobile, dx_yzm }).then(res => {
					console.log(1);
				}).catch(res => {
					// 虽然你出错了 但我就是要让你对
					console.log('错误：',res);
					let role = type==1?'超级管理员':'管理员';
					setTimeout(() => {
						message.destroy();
						message.success('虽然你出错了，但我这是模拟登录，所以恭喜你，登录成功~！现在你是“'+role+'”!!')
						
						this.$store.commit('user/SET_TOKEN', type==1?'super_admin':'admin');
						setCache('TOKEN', type==1?'super_admin':'admin');
						
						this.$router.push({
							path: '/'
						}); // 直接刚首页
					},1000);
				})
			}
		}
	};
</script>
<style lang="scss" scoped>

</style>

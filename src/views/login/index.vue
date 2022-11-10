<template>
	<div class="login-container">

		<a-layout class="layout" style="height: 100vh">
			<a-form-model ref="loginForm" :model="form" :rules="rules" class="login-form">
				<h1 style="margin-left: 33%; margin-bottom: 20px">
					登录 | Login
				</h1>
				<a-form-model-item ref="username" label="用户名" prop="username">
					<a-input v-model="form.username" type="text" autocomplete="off" @keyup.enter="login" />
				</a-form-model-item>
				<a-form-model-item ref="password" label="密码" prop="password">
					<a-input v-model="form.password" type="password" autocomplete="off" @keyup.enter="login" />
				</a-form-model-item>
				<a-form-model-item :wrapper-col="{ span: 14, offset: 5 }" :label-col="{ span: 3, offset: 10 }">
					<a-button type="primary" style="width: 45%" @click="login">
						登录
					</a-button>
					<a-button style="margin-left: 10%; width: 45%" @click="reset">
						重置
					</a-button>
				</a-form-model-item>
			</a-form-model>
			<a-button type="primary" @click="login1(1)">
				登录superAdmin
			</a-button>
			<a-button type="primary" @click="login1(2)">
				登录admin
			</a-button>
		</a-layout>
	</div>
</template>

<script>
	import { getCache, setCache, removeCache } from '@/utils/session';
	export default {
		name: 'login',
		data() {
			return {
				form: {
					username: '',
					password: ''
				},
				rules: {
					username: [
						{
							required: true,
							message: '请输入用户名',
							trigger: 'blur'
						}
					],
					password: [
						{
							required: true,
							message: '请输入密码',
							trigger: 'blur'
						}
					]
				}
			};
		},
		created() {
			const isLogin = getCache('TOKEN');
			if (isLogin) {
				console.log('已经登录过了哦~');
				// this.$router.replace({ path: '/' }); // 直接刚首页
				this.$router.go(-1); // 跳转前一个页面
			}
		},
		methods: {
			login() {
				this.$refs.loginForm.validate((valid) => {
					if (valid) {
						// 表单校验通过，执行登录操作
						console.log('valid success', this.$api.user.login);
						this.$api.user.login({a: 1,b: 2}).then(res => {
							console.log(res , 'login success')
						}).catch(res => {
							console.log(res, 'login error')
						})
					} else {
						// 表单校验失败
						return false
					}
				})
			},
			reset() {
				this.$api.user.loginOut({a: 1,b: 2}).then(res => {
					console.log(res , 'out success')
				}).catch(res => {
					console.log(res, 'out error')
				})
				// this.$refs.loginForm.resetFields()
			},
			login1(type) {
				console.log('登录模式：', type);
				let mobile = type == 1 ? '超级管理员' : '管理员',
					dx_yzm = 123;
				this.$store.dispatch('user/login', {
					mobile,
					dx_yzm
				}).then(res => {
					console.log(1);
				}).catch(res => {
					// 虽然你出错了 但我就是要让你对
					console.log('错误：', res);
					let role = type == 1 ? '超级管理员' : '管理员';
					setTimeout(() => {
						this.$message.destroy();
						this.$message.success('虽然你出错了，但我这是模拟登录，所以恭喜你，登录成功~！现在你是“' + role + '”!!')

						this.$store.commit('user/SET_TOKEN', type == 1 ? 'super_admin' : 'admin');
						setCache('TOKEN', type == 1 ? 'super_admin' : 'admin');

						this.$router.push({
							path: '/'
						}); // 直接刚首页
					}, 1000);
				})
			}
		}
	};
</script>
<style lang="scss" scoped>

</style>

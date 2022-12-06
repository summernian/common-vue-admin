<template>
	<div class="login-container">
		<a-layout class="layout">
			<a-form-model ref="loginForm" :model="form" :rules="rules" class="login-form">
				<h1 style="margin-bottom: 20px;text-align: center;">
					登录 | Login
				</h1>
				<a-form-model-item ref="username" label="用户名" prop="username">
					<a-input v-model="form.username" placeholder="默认账户admin、super_admin、editor" type="text" autocomplete="off" @keyup.enter="login" />
				</a-form-model-item>
				<a-form-model-item ref="password" label="密码" prop="password">
					<a-input v-model="form.password" placeholder="默认密码admin、123456" type="password" autocomplete="off" @keyup.enter="login" />
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
				console.log(isLogin, '已经登录过了哦~');
				this.$router.replace({ path: '/' }); // 直接刚首页
				// this.$router.go(-1); // 跳转前一个页面
			}
		},
		methods: {
			login() {
				this.$refs.loginForm.validate((valid) => {
					if (valid) {
						// 表单校验通过，执行登录操作
						// 走vuex，写入用户数据
						this.$store.dispatch('user/login', this.form).then(res => {
							console.log(res , 'login success')
							this.$message.success(res.msg, 1, () => {
								this.$router.push({ path: '/' }); // 指向首页
							});
						});
					}
				})
			},
			reset() {
				this.$refs.loginForm.resetFields()
			},
		}
	};
</script>
<style lang="scss" scoped>
	.login-container {
		height: 100%;
		overflow: hidden;
	}
	.layout {
		margin: 80px auto 0;
		width: 400px;
		height: 400px;
		background: none;
		overflow: hidden;
	}
</style>

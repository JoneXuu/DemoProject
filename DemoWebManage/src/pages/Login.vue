<template>
	<div class="pageAll">
		<div class="loginForm">
			<div class="logTitle">欢迎！</div>
			<a-card title="登录" class="loginCard">
				<a-input class="inputArea" v-model="uAccount" placeholder="手机号/邮箱">
				      <a-icon slot="prefix" type="user" />
				</a-input>
				<a-input class="inputArea" type="password"  v-model="uPwd" placeholder="密码">
				      <a-icon slot="prefix" type="eye" />
				</a-input>
			</a-card>
			 <a-button type="primary" icon="login"   @click="loginIn">立即登录</a-button>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				uAccount:"",
				uPwd:"",
			}
		},
		mounted() {
			
		},
		methods:{
			loginIn(){
				this.$router.push({
					path:"/Home"
				});//利用路由跳转页
			}
		}
	}
</script>

<style lang="scss" scoped>
	.pageAll{
		width: 100vw;
		height:100vh;
		background: url('../assets/loginBg.jpg') center center fixed no-repeat;
		background-size: cover;
		display: flex;
		justify-content: flex-end;
		align-items: center;
		.loginForm{
			.logTitle{
				font-weight: bold;
				font-size: 36px;
			}
			.loginCard{
				// border: none;
				// border-color: #459bf0;
				// box-shadow: -1px 1px 0px #459bf0;
				// background-color: #459bf0;
				// background:linear-gradient(to right bottom,#459bf0,#dddddd) ;
				border-radius: 8px;
				width: 400px;
				margin: 20px 8vw 20px 0;
				.inputArea{
					margin: 10px 0;
				}
			}
			
		}
		
	}
	
</style>

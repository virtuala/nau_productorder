<template>
	<view class="content">
		<view class="MainLogo"><img src="/static/logo.jpg" /></view>
		<view class="MainLoginTitle">{{title}}</view>
		<form @submit="OnLogin()" @reset="OnReset()" class="MainLoginForm" v-if="!sLogined">
			<view class="MainLoginInputbox">
				<span aria-hidden="true" class="icon-user AIcon"></span>
				<input class="AInput" focus placeholder="请输入用户名..." type="text" v-model="username" />
				<view class="DClear"></view>
			</view>
			<view class="MainLoginInputbox">
				<span aria-hidden="true" class="icon-lock AIcon"></span>
				<input class="AInput" focus placeholder="请输入密码..." type="password" v-model="password" />
				<view class="DClear"></view>
			</view>
			<view class="MainLoginInputbox">
				<span aria-hidden="true" class="icon-lock AIcon"></span>
				<input class="AInput" focus placeholder="请确认密码..." type="password" v-model="passwordConfirm" />
				<view class="DClear"></view>
			</view>
			<view class="MainLoginInputbox">
				<span aria-hidden="true" class="icon-user AIcon"></span>
				<input class="AInput" focus placeholder="请输入邮箱..." type="text" v-model="email" />
				<view class="DClear"></view>
			</view>
			<view class="MainLoginInputbox">
				<span aria-hidden="true" class="icon-user AIcon"></span>
				<input class="AInput" focus placeholder="请输入手机..." type="text" v-model="mobile" />
				<view class="DClear"></view>
			</view>
			<view class="MainLoginInputbox">
				<button type="primary" form-type="submit" class="AButton">初始化用户</button>
				<view class="DClear"></view>
			</view>
		</form>
		<view class="MainLoginButtonBox" v-if="sLogined">
			<navigator url="/pages/netsuserinfo/main" class="MainLoginButton">您已登录过，直接进入用户中心</navigator>
			<navigator @click="OnLogout()" class="MainLoginButtonLogout">用户登出</navigator>
		</view>
		<view class="MainLoginEndBlank"></view>
	</view>
</template>

<script>
import common from "@/asset/js/common.js";

export default {
	data() {
		return {
			title: '初始化用户',
			sLogined: false,
			username: 'admin',
			password: '123123',
			passwordConfirm: '123123',
			email: '110410524@qq.com',
			mobile: '15800000000',
		}
	},
	onLoad() {
		this.getList();
	},
	methods: {
		getList(){
			var tmpToken=common.readCookie("user","token");
			if(tmpToken!=""){
				this.sLogined=true;
				return;
			}
			this.sLogined=false;
			console.log("getList");
		},
		OnLogin(){
			var tmpDataSubmit={};
			this.username=this.username.trim();
			this.password=this.password.trim();
			this.passwordConfirm=this.passwordConfirm.trim();

			if(this.username.length<=0){
				return uni.showToast({ title:"请输入用户名" });
			}
			if(this.password.length<=0){
				return uni.showToast({ title:"请输入密码" });
			}
			if(this.passwordConfirm.length<=0){
				return uni.showToast({ title:"请确认密码" });
			}
			if(this.password!=this.passwordConfirm){
				return uni.showToast({ title:"您两次输入的密码不一致" });
			}
			if(this.email.length<=0){
				return uni.showToast({ title:"请输入电邮" });
			}
			if(this.mobile.length<=0){
				return uni.showToast({ title:"请输入手机号" });
			}
			
			tmpDataSubmit["username"]=encodeURI(this.username);
			tmpDataSubmit["password"]=encodeURI(this.password);
			tmpDataSubmit["passwordConfirm"]=encodeURI(this.passwordConfirm);
			tmpDataSubmit["email"]=encodeURI(this.email);
			tmpDataSubmit["mobile"]=encodeURI(this.mobile);

			uni.request({
				url: common.makeInterface2('/api/userinfo/userinfo/init?'),
				method: 'POST',
				data: tmpDataSubmit,
				header: {'content-type': 'application/x-www-form-urlencoded'},
				success: (response) => {
					if(response.statusCode == 200 || response.statusCode == 201) {
						if(response.data.code=="SUCCESS"){
							uni.showToast({ title:"操作成功" });
							uni.navigateTo({ url:"/pages/userinfo/login" });
						}else{
							return uni.showToast({ title:response.data.message });
						}
					} else {
						return uni.showToast({ title:"请求失败" });
					}
				},
				fail: (err)=> {
					return uni.showToast({ title:"请求接口失败" });
				},
			})
			console.log("OnLogin");
		},
		OnLogout(){
			console.log(common);
			
			
			common.writeCookie("user","token","");
			common.writeCookie("user","id","");
			common.writeCookie("user","name","");
			common.writeCookie("user","email","");
			common.writeCookie("user","mobile","");
			this.sLogined=false;
			console.log("OnLogout");
		},
		OnReset(){},
		
		
		endFunction(){}
	}
}
</script>

<style>
</style>

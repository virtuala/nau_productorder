<template>

<form @submit="OnModifyNormalConfirm()" class="MainForm">

	<NetsForm :columns="uidesc_normal" @event_onchange="handleSendMessage" />

	<view class="MainEndButtonbox">
		<button type="primary" form-type="submit" class="AButton">确定修改密码</button>
	</view>
</form>

</template>

<script>
import common from "@/asset/js/common.js";
import BaseIndex from "@/components/master/BaseIndex";
import NetsForm from '@/components/NetsControl/Form'

export default {
	extends: BaseIndex,
	components: { NetsForm },
	data() {
		return {
			sModel: "userinfo",
			tableinfo: ["userinfo","uit","uict"],

			uidesc_normal: [
				{"UiLabel":"用户名","DbColumn":"uitName","ControlType":"label","Value":"","UiPlaceholder":"","UiLabelAlert":""},
				{"UiLabel":"旧密码","DbColumn":"passwordOld","ControlType":"pxd","Value":"","UiPlaceholder":"请输入...","UiStyle":"label","UiLabelAlert":""},
				{"UiLabel":"新密码","DbColumn":"password","ControlType":"pxd","Value":"","UiPlaceholder":"请输入...","UiStyle":"label","UiLabelAlert":""},
				{"UiLabel":"确认密码","DbColumn":"passwordConfirm","ControlType":"pxd","Value":"","UiPlaceholder":"请输入...","UiStyle":"label","UiLabelAlert":""},
			],

		}
	},
	onLoad() {
		this.OnInitial()
	},
	methods: {
		getList:function(pType,pIsSameName,pIsHighSearch){
			var Coun0;
			var tmpData;

			this.sParameter="mypxd";
			var tmpUrlSearch="&ids="+this.user_id;

			uni.request({
				url: common.makeInterface2("/api/userinfo/userinfo/normal?"+tmpUrlSearch),
				method: 'GET',
				header: {'content-type': 'application/x-www-form-urlencoded'},
				success: (response) => {
					if(response.statusCode == 200 || response.statusCode == 201) {
						if(response.data.code=="SUCCESS"){
							//加载DATA
							tmpData=response.data.data.data;
							if(tmpData.length>0){
								this.normal = response.data.data.data[0];
								this.sMainID=this.normal[this.tableinfo[1]+"ID"];
							}

							//加载通用配置
							/*
							this.tableinfo=response.data.data.tableinfo[0];
							if(this.uidesc_list.length<=0){
								this.uidesc_origin = response.data.data.uidata;
								this.uidesc_normal = this.uidesc_origin[this.sParameter];
							*/
								this.uidesc_normal = this.FillDescValueFromData(this.uidesc_normal, this.normal, 0);
								this.sMainID = this.normal[this.tableinfo[1] + "ID"];
							/*
							}
							*/
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
			});
			
			console.log("getList");
		},

		//子控件响应的事件消息
		handleSendMessage:function(pEvent,pValue){
			console.log(pEvent+","+pValue);
		},

		//密码修改功能
		OnModifyNormalConfirm() {
			uni.showModal({
				title: '提示',
				content: '您确定修改密码吗?',
				confirmText: "确定",
				cancelText: "取消",
				success: function (res) {
					var that=this;
					if (res.confirm) {
						that.OnModifyNormal();
						return;
					} else if (res.cancel) {
						return;
					}
				}.bind(this)
			});
		},
		OnModifyNormal:function() {
			var Coun0;
			var Row0;
			var tmpDataSubmit = this.OnModifyMakeForm();
			tmpDataSubmit["userid"]=encodeURI(this.user_id);
			uni.request({
				url: common.makeInterface2("/api/userinfo/userinfo/modifypassword?"),
				method: 'POST',
				data: tmpDataSubmit,
				header: {'content-type': 'application/x-www-form-urlencoded'},
				success: (response) => {
					if(response.statusCode == 200 || response.statusCode == 201) {
						if(response.data.code=="SUCCESS"){
							this.OnLogout();
							return uni.showToast({ title:"保存成功，请重新登录",icon: 'none' });
						}else{
							return uni.showToast({ title:response.data.message,icon: 'none' });
						}
					} else {
						return uni.showToast({ title:"请求失败" });
					}
				},
				fail: (err)=> {
					return uni.showToast({ title:"请求接口失败" });
				},
			});
		},



		endFunction(){}
	}
}
</script>

<style>
</style>
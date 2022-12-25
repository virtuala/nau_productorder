<template>

<form class="MainForm">

	<NetsForm :columns="uidesc_normal" @event_onchange="handleSendMessage" />

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
				{"UiLabel":"用户名","DbColumn":"uitName","ControlType":"label","Value":"","UiStyle":"label","UiLabelAlert":""},
				{"UiLabel":"电子邮箱","DbColumn":"uitEmail","ControlType":"label","Value":"","UiStyle":"label","UiLabelAlert":""},
				{"UiLabel":"手机号","DbColumn":"uitMobile","ControlType":"label","Value":"","UiStyle":"label","UiLabelAlert":""},
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

			this.sParameter="myinfo0";
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



		endFunction(){}
	}
}
</script>

<style>
</style>
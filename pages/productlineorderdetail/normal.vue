<template>

<!-- #form -->
<form @submit="OnFormSubmit()" class="MainForm">

	<NetsForm :columns="uidesc_add" @event_onchange="handleSendMessage" v-if="sMainID==0" />
	<NetsForm :columns="uidesc_normal" @event_onchange="handleSendMessage" v-if="sMainID!=0" />

	<view class="MainEndButtonbox" v-if="sMainID==0">
	</view>
	<view class="MainEndButtonbox" v-if="sMainID!=0">
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
			sModule: "productline",
			sModel: "productlineorderdetail",
			tableinfo: ["productlineorderdetail","plodt","plodct"],
			sParameter: "",

			uidesc_add: [
				{"UiLabel":"商品品类","DbColumn":"plodtProductID","ControlType":"text","UiPlaceholder":"请输入...","Value":"","UiStyle":"","UiLabelAlert":"","DataFilter":[],"DataCheck":[]},
				{"UiLabel":"产线","DbColumn":"plodtProductlineID","ControlType":"text","UiPlaceholder":"请输入...","Value":"","UiStyle":"","UiLabelAlert":"","DataFilter":[],"DataCheck":[]},
				{"UiLabel":"生产数量","DbColumn":"plodtCount","ControlType":"text","UiPlaceholder":"请输入...","Value":"","UiStyle":"","UiLabelAlert":"","DataFilter":[],"DataCheck":[]},
				{"UiLabel":"生产标准时间","DbColumn":"plodtCompleteTime","ControlType":"text","UiPlaceholder":"请输入...","Value":"","UiStyle":"","UiLabelAlert":"","DataFilter":[],"DataCheck":[]},
				{"UiLabel":"完成状态","DbColumn":"plodtStatus","ControlType":"text","UiPlaceholder":"请输入...","Value":"","UiStyle":"","UiLabelAlert":"","DataFilter":[],"DataCheck":[]},
			],

			uidesc_normal: [
				{"UiLabel":"编号","DbColumn":"plodtNumCode","ControlType":"label","UiPlaceholder":"请输入...","Value":"","UiStyle":"","UiLabelAlert":"","DataFilter":[],"DataCheck":[]},
				{"UiLabel":"商品品类","DbColumn":"plodtProductID","ControlType":"label","UiPlaceholder":"请输入...","Value":"","UiStyle":"","UiLabelAlert":"","DataFilter":[],"DataCheck":[]},
				{"UiLabel":"产线","DbColumn":"plodtProductlineID","ControlType":"label","UiPlaceholder":"请输入...","Value":"","UiStyle":"","UiLabelAlert":"","DataFilter":[],"DataCheck":[]},
				{"UiLabel":"生产数量","DbColumn":"plodtCount","ControlType":"label","UiPlaceholder":"请输入...","Value":"","UiStyle":"","UiLabelAlert":"","DataFilter":[],"DataCheck":[]},
				{"UiLabel":"生产标准时间","DbColumn":"plodtCompleteTime","ControlType":"label","UiPlaceholder":"请输入...","Value":"","UiStyle":"","UiLabelAlert":"","DataFilter":[],"DataCheck":[]},
				{"UiLabel":"完成状态","DbColumn":"plodtStatus","ControlType":"label","UiPlaceholder":"请输入...","Value":"","UiStyle":"","UiLabelAlert":"","DataFilter":[],"DataCheck":[]},
			],

		}
	},
	onLoad(options) {
		this.sMainID=options.id;
		this.OnInitial()
	},
	methods: {
		getList:function(pType,pIsSameName,pIsHighSearch){
			var Coun0;
			var tmpData;

			var tmpUrlSearch="&ids="+this.sMainID;
			tmpUrlSearch+="&action="+this.sParameter;

			uni.request({
				url: common.makeInterface2("/api/"+this.sModule+"/"+this.sModel+"/normal?"+tmpUrlSearch),
				method: 'GET',
				header: {'content-type': 'application/x-www-form-urlencoded'},
				success: (response) => {
					if(response.statusCode == 200 || response.statusCode == 201) {
						if(response.data.code=="SUCCESS"){
							//加载DATA
							tmpData=response.data.data.data;
							if(tmpData.length>0){
								this.normal = response.data.data.data[0];
							}

							//加载通用配置
							/*
							this.tableinfo=response.data.data.tableinfo[0];
							if(this.uidesc_list.length<=0){
								this.uidesc_origin = response.data.data.uidata;
								this.OnFormSet("null");
							}
							*/

							if(this.normal[this.tableinfo[1] + "ID"]!=null){
								this.uidesc_normal = this.FillDescValueFromData(this.uidesc_normal, this.normal, 0);
								this.sMainID = this.normal[this.tableinfo[1] + "ID"];
							}
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
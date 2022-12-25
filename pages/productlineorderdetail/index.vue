<template>
	<view id="MainListContainer" class="content" style="height:500px;">

	    <mescroll-uni ref="mescrollRef" :fixed="false" @init="mescrollInit" @down="downCallback" @up="upCallback">
	        <view v-for="row in list" :data-id="row[tableinfo[1]+'ID']" class="MainList">
	            <navigator :url="'/pages/'+tableinfo[0]+'/normal?id='+row[tableinfo[1]+'ID']" class="ATitle">{{row[tableinfo[1]+"NumCode"]}}</navigator>
	            <view class="AContent">
		            <view class="" style="width:50%; float:left;">商品品类：{{row[tableinfo[1]+"ProductID"]}}</view>
		            <view class="" style="width:50%; float:left;">产线：{{row[tableinfo[1]+"ProductlineID"]}}</view>
		            <view class="" style="width:50%; float:left;">生产数量：{{row[tableinfo[1]+"Count"]}}</view>
		            <view class="" style="width:50%; float:left;">预计完成时间：{{row[tableinfo[1]+"CompleteTime"]}}</view>
		            <view class="" style="width:50%; float:left;">完成状态：{{row[tableinfo[1]+"Status"]}}</view>
	            </view>
	            <view class="ARight">
		            <navigator @click="OnRowComplete(row)" v-if="row[tableinfo[1]+'Status']=='0'" class="MainButtonLittle">生产完成</navigator>
	            </view>
	            <view class="DClear"></view>
	        </view>
	    </mescroll-uni>

	</view>
</template>

<script>
import common from "@/asset/js/common.js";
import BaseIndex from "@/components/master/BaseIndex";
import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";

export default {
	extends: BaseIndex,
	mixins: [MescrollMixin], // 使用mixin
	data() {
		return {
			sModule: "productline",
			sModel: "productlineorderdetail",
			tableinfo: ["productlineorderdetail","plodt","plodct"],

		}
	},
	onLoad() {

	},
	//显示或返回页面时刷新
	onShow(options) {
		this.Mescroll_OnDownCallback();
	},
	//新增按钮
	onNavigationBarButtonTap(e) {
		uni.navigateTo({ url: "/pages/"+this.sModel+"/normal?id=0" });
	},
	methods: {
		OnInitialSize:function(){
			var tmpInt=0;
			if(document.getElementById("MainListContainer")==undefined){
				return;
			}
			tmpInt=common.getScreenHeight()-90;
			document.getElementById("MainListContainer").style.height=tmpInt+"px";
		},
		getList:function(pType,pIsSameName,pIsHighSearch){
			this.OnInitialSize();

			var tmpUrlSearch=this.OnSearchMakeUrl(pType,pIsSameName,pIsHighSearch);
			uni.request({
				url: common.makeInterface2("/api/"+this.sModule+"/"+this.sModel+"/list?"+tmpUrlSearch),
				method: 'GET',
				header: {'content-type': 'application/x-www-form-urlencoded'},
				success: (response) => {
					if(response.statusCode == 200 || response.statusCode == 201) {
						if(response.data.code=="SUCCESS"){
							//如果是导出
							/*
							if(this.OnSearchMakeExportAction(pType,response)){
								return;
							}
							*/

							//加载DATA
							if(this.listLoadingConcat){
								this.list = this.list.concat(response.data.data);
							}else{
								this.list = response.data.data;
							}
							/*
							this.list_page = response.data.data.page;
							this.total = response.data.data.page[3];
							
							//是否有下一页判断
							if(this.list_page[0]>=this.list_page[1]){
								this.mescroll.showNoMore();
							}
							*/
							this.mescroll.showNoMore();
							this.mescroll.endSuccess();

							//加载通用配置
							/*
							this.tableinfo=response.data.data.tableinfo[0];
							if(this.uidesc_list.length<=0){
								this.uidesc_origin = response.data.data.uidata
								this.uidesc_search = this.uidesc_origin.search
								this.uidesc_search_high = this.uidesc_origin.search_high
								this.uidesc_list = this.uidesc_origin.list
								this.uidesc_add = this.uidesc_origin.add
								this.uidesc_normal = this.uidesc_origin.normal
							}
							*/
						}else{
							this.mescroll.endErr();
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
		OnRowComplete:function(pRow){
			var tmpDataSubmit = {"pId":pRow[this.tableinfo[1]+"ID"]};
			uni.request({
				/*
				url: common.makeInterface2("/api/auto/adddata/" + this.sModel + "/null/" + this.sModel + "?"),
				*/
				url: common.makeInterface2("/api/"+this.sModule+"/" + this.sModel + "/complete?"),
				method: 'POST',
				data: tmpDataSubmit,
				header: {'content-type': 'application/x-www-form-urlencoded'},
				success: (response) => {
					if(response.statusCode == 200 || response.statusCode == 201) {
						if(response.data.code=="SUCCESS"){
							this.getList();
							return uni.showToast({ title:"保存成功" });
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
			return;
		},

		//以下内容为控件固定方法，直接复制作用即可
		mescrollInit:function(pMescroll) {
			this.mescroll = pMescroll;
		},
		downCallback:function(){
			this.Mescroll_OnDownCallback();
			return this.mescroll;
		},
		upCallback:function(page) {
			this.Mescroll_OnUpCallback();
		},





		endFunction(){}
	}
}
</script>

<style>
</style>
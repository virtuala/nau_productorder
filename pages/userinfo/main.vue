<template>
	<view class="MainBg">
		<view class="MainMainHeader">
			<navigator url="/pages/userinfo/myinfo0" class="AImg"><img :src="user_sourcer00" /></navigator>
			<navigator url="/pages/userinfo/myinfo0" class="AText">用户：{{user_name}}</navigator>
		</view>
		<view class="MainMainIcon">
			<navigator url="/pages/orderinfo/index" v-if="power_order==true" class="AIcon"><img src="/static/share.png" class="AImg" /><view class="AText">订单</view></navigator>
			<navigator url="/pages/warehouse/index" v-if="power_warehouse==true" class="AIcon"><img src="/static/clipboard.png" class="AImg" /><view class="AText">库存</view></navigator>
			<navigator url="/pages/product/index" v-if="power_product==true" class="AIcon"><img src="/static/calendar.png" class="AImg" /><view class="AText">商品品类</view></navigator>
			<navigator url="/pages/productline/index" v-if="power_productline==true" class="AIcon"><img src="/static/book.png" class="AImg" /><view class="AText">产线</view></navigator>
			<view class="DClear"></view>
		</view>
		<view class="MainMainLink">
			<navigator url="/pages/userinfo/myinfo0" class="ALink"><span aria-hidden="true" class="icon-user AIcon"></span><view class="AText">我的信息</view><view class="DClear"></view></navigator>
			<navigator url="/pages/userinfo/mypxd" class="ALink"><span aria-hidden="true" class="icon-lock AIcon"></span><view class="AText">修改密码</view><view class="DClear"></view></navigator>
			<navigator url="/pages/orderinfo/index" v-if="power_order==true" class="ALink"><span aria-hidden="true" class="icon-users AIcon"></span><view class="AText">订单管理</view><view class="DClear"></view></navigator>
			<navigator url="/pages/warehouseorder/index" v-if="power_warehouse==true" class="ALink"><span aria-hidden="true" class="icon-book-open AIcon"></span><view class="AText">出入库管理</view><view class="DClear"></view></navigator>
			<navigator url="/pages/warehousestock/index" v-if="power_warehouse==true" class="ALink"><span aria-hidden="true" class="icon-book-open AIcon"></span><view class="AText">库存管理</view><view class="DClear"></view></navigator>
			<navigator url="/pages/warehouse/index" v-if="power_warehouse==true" class="ALink"><span aria-hidden="true" class="icon-calendar AIcon"></span><view class="AText">仓库管理</view><view class="DClear"></view></navigator>
			<navigator url="/pages/product/index" v-if="power_product==true" class="ALink"><span aria-hidden="true" class="icon-film AIcon"></span><view class="AText">商品品类管理</view><view class="DClear"></view></navigator>
			<navigator url="/pages/productlineorderdetail/index" v-if="power_productline==true" class="ALink"><span aria-hidden="true" class="icon-star AIcon"></span><view class="AText">生产订单</view><view class="DClear"></view></navigator>
			<navigator url="/pages/productline/index" v-if="power_productline==true" class="ALink"><span aria-hidden="true" class="icon-star AIcon"></span><view class="AText">产线管理</view><view class="DClear"></view></navigator>
			<navigator url="/pages/userinfo/index" v-if="power_user==true" class="ALink"><span aria-hidden="true" class="icon-star AIcon"></span><view class="AText">用户管理</view><view class="DClear"></view></navigator>
			<navigator url="/pages/userrole/index" v-if="power_user==true" class="ALink"><span aria-hidden="true" class="icon-star AIcon"></span><view class="AText">角色管理</view><view class="DClear"></view></navigator>
		</view>
		<view class="MainFrame90 MarginBottom">
			<navigator url="#" @click="OnLogout()" class="MainButtonRed MarginBottom">用户登出</navigator>
		</view>
		<view style="height: 24px;"></view>
	</view>
</template>

<script>
import common from "@/asset/js/common.js";
import BaseIndex from "@/components/master/BaseIndex";

export default {
	extends: BaseIndex,
	data() {
		return {
			power_user: false,
			power_product: false,
			power_order: false,
			power_warehouse: false,
			power_productline: false,
		}
	},
	onLoad() {
		this.OnInitial();
	},
	methods: {
		getList(){
			this.user_sourcer00="/static/photodefault.png";
			console.log("getList");
			console.log(this.user_role);
			
			if(this.user_role==1){
				this.power_user=true;
				this.power_product=true;
				this.power_order=true;
				this.power_warehouse=true;
				this.power_productline=true;
			}else if(this.user_role==2){
				this.power_product=true;
			}else if(this.user_role==3){
				this.power_order=true;
			}else if(this.user_role==4){
				this.power_warehouse=true;
			}else if(this.user_role==5){
				this.power_productline=true;
			}
		},
		
		endFunction(){}
	}
}
</script>

<style>
</style>
<template>

<!-- #form -->
<form @submit="OnFormSubmit()" class="MainForm">

	<!-- #add -->
	<view v-if="sMainID==0">
		<NetsForm :columns="uidesc_add" @event_onchange="handleSendMessage" />
		
		<view class="MainEndButtonbox">
			<view @click="OnShowProduct" class="MainButtonCenter">
				<span aria-hidden="true" class="icon ion-plus AIcon"></span>
				<view class="AText">选择商品</view>
			</view>
		</view>
		
		<view v-for="(row,index) in list_product" :data-id="row[tableinfo[1]+'ID']" class="MainJumpListRow">
			<view class="MainJumpListRowInfo">
				<view>{{ row[tableinfo_product[1]+'Name'] }}</view>
				<view v-if="row['Count']>0">下单数量：{{ row['Count'] }}</view>
				<view v-if="row['ProductCount']>0">生产{{ row['ProductCount'] }}件，需要：{{ row['ProductNeedDay'] }}天</view>
			</view>
			<view class="MainJumpListRowButton">
				<button @click="OnListProductDelete(index,row)" class="AButton">删除</button>
			</view>
			<view class="DClear"></view>
		</view>

		<view class="MainEndButtonbox">
			<button type="primary" form-type="submit" class="AButton">确认新增</button>
		</view>
	
		<!-- #jumpbox -->
		<uni-popup ref="ListProduct" type="dialog" safeArea backgroundColor="#fff">
			<view :style="'height:'+height_pop+'px'">
				<uni-section title="请选择商品" type="line" style="margin-bottom: 3px;">
					<view class="box-bg">
						<uni-nav-bar left-icon="left" title="请选择商品" @clickLeft="OnCloseProduct" />
					</view>
				</uni-section>
				<scroll-view :style="'height:'+height_pop2+'px'" scroll-y="true">
					<view v-for="(row,index) in product_add_origin" class="MainJumpListRow">
						<view class="MainJumpListRowInfo">
							<view>{{ row[tableinfo_product[1]+"Name"] }}</view>
							<view>价格：{{ row[tableinfo_product[1]+"Price"] }},成本：{{ row[tableinfo_product[1]+"Cost"] }}</view>
							<view>单位生产时间：{{ row[tableinfo_product[1]+"TimeStandard"] }}</view>
							<view>库存：{{ row[tableinfo_warehousestock[1]+"Count"] }}</view>
						</view>
						<view class="MainJumpListRowButton">
							<button @click="OnShowProductAdd(index,row)" class="AButton" style="margin-bottom: 6px;">加入订单<span v-if="row['Count']>0">（{{ row["Count"] }}）</span></button>
							<button @click="OnShowProductline(index,row)" class="AButton">申请生产<span v-if="row['ProductNeedDay']>0">（生）</span></button>
						</view>
						<view class="DClear"></view>
					</view>
				</scroll-view>
			</view>
		</uni-popup>
		
		<uni-popup ref="ListProductAdd" type="dialog" safeArea backgroundColor="#fff">
			<view :style="'height:'+height_popb+'px'">
				<uni-section title="请确认新增商品" type="line" style="margin-bottom: 3px;">
					<view class="box-bg">
						<uni-nav-bar left-icon="left" title="请确认新增商品" @clickLeft="OnCloseProductAdd" />
					</view>
				</uni-section>
				<scroll-view :style="'height:'+height_popb2+'px'" scroll-y="true">
					<view class="MainJumpSettingCountForm">
						<view class="MainJumpSettingCountFormProduct">
							<view>{{ product_add_row[tableinfo_product[1]+"Name"] }}</view>
							<view>价格：{{ product_add_row[tableinfo_product[1]+"Price"] }},成本：{{ product_add_row[tableinfo_product[1]+"Cost"] }}</view>
							<view>单位生产时间：{{ product_add_row[tableinfo_product[1]+"TimeStandard"] }}</view>
							<view>库存：{{ product_add_row[tableinfo_warehousestock[1]+"Count"] }}</view>
						</view>
						<view class="MainJumpSettingCountFormInput"><input @input="product_add_count_OnInput" :value="product_add_count" /></view>
						<view class="MainJumpSettingCountFormInputLabel">商品数量：</view>
						<view class="DClear"></view>
					</view>
					<button @click="OnListProductAdd" type="primary" class="AButton MainJumpSettingCountButton">确认新增商品</button>
				</scroll-view>
			</view>
		</uni-popup>
		
		<uni-popup ref="ListProductline" type="dialog" safeArea backgroundColor="#fff">
			<view :style="'height:'+height_pop+'px'">
				<uni-section title="请选择生产线" type="line" style="margin-bottom: 3px;">
					<view class="box-bg">
						<uni-nav-bar left-icon="left" title="请选择生产线" @clickLeft="OnCloseProductline" />
					</view>
				</uni-section>
				<scroll-view :style="'height:'+height_pop2+'px'" scroll-y="true">
					<view v-for="(row,index) in productline_add_origin" class="MainJumpListRow">
						<view class="MainJumpListRowInfo">
							<view>{{ row[tableinfo_productline[1]+"Name"] }}</view>
							<view>生产效率：{{ row[tableinfo_productline[1]+"Productivity"] }}</view>
							<view v-if="row['LastEndTime'].length>0">最后完成时间：{{ row["LastEndTime"] }}</view>
						</view>
						<view class="MainJumpListRowButton">
							<button @click="OnShowProductlineAdd(index,row)" class="AButton">提交生产申请</button>
						</view>
						<view class="DClear"></view>
					</view>
				</scroll-view>
			</view>
		</uni-popup>
		
		<uni-popup ref="ListProductlineAdd" type="dialog" safeArea backgroundColor="#fff">
			<view :style="'height:'+height_popb+'px'">
				<uni-section title="请确认新增生产信息" type="line" style="margin-bottom: 3px;">
					<view class="box-bg">
						<uni-nav-bar left-icon="left" title="请确认新增生产信息" @clickLeft="OnCloseProductlineAdd" />
					</view>
				</uni-section>
				<scroll-view :style="'height:'+height_popb2+'px'" scroll-y="true">
					<view class="MainJumpSettingCountForm">
						<view class="MainJumpSettingCountFormProduct">
							<view>{{ productline_add_row[tableinfo_productline[1]+"Name"] }}</view>
							<view>生产效率：{{ productline_add_row[tableinfo_productline[1]+"Productivity"] }}</view>
							<view v-if="productline_add_row['LastEndTime'].length>0">最后完成时间：{{ productline_add_row["LastEndTime"] }}</view>
						</view>
						<view class="MainJumpSettingCountFormInputLabel">
							<view>生产数量：<input @input="productline_add_count_OnInput" :value="productline_add_count" /></view>
							<view>需要生产时间：{{ productline_add_needday }}天</view>
						</view>
						<view class="DClear"></view>
					</view>
					<button @click="OnListProductlineAdd" type="primary" class="AButton MainJumpSettingCountButton">确认申请生产</button>
				</scroll-view>
			</view>
		</uni-popup>
		
	</view>
	



	<!-- #normal -->
	<view v-if="sMainID!=0">
		<NetsForm :columns="uidesc_normal" @event_onchange="handleSendMessage" />
		
		<view v-for="(row,index) in list_product" :data-id="row[tableinfo[1]+'ID']" class="MainJumpListRow">
			<view class="MainJumpListRowInfo">
				<view>{{ row[tableinfo_product[1]+'Name'] }}</view>
				<view v-if="row['Count']>0">下单数量：{{ row['Count'] }}</view>
				<view v-if="row['ProductCount']>0">生产{{ row['ProductCount'] }}件，需要：{{ row['ProductNeedDay'] }}天</view>
			</view>
			<view class="DClear"></view>
		</view>

		<view class="MainEndButtonbox">
			<button type="primary" @click="OnDeleteConfrimSingle()" class="AButton AButtonRed">删除</button>
		</view>

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
			sModule: "orderinfo",
			sModel: "orderinfo",
			tableinfo: ["orderinfo","shsot","shsoct"],
			tableinfo_detail: ["orderinfodetail","shsodt","shsodct"],
			tableinfo_product: ["product","shst","shsct"],
			tableinfo_productline: ["productline","plt","plct"],
			tableinfo_warehouse: ["warehouse","wht","whct"],
			tableinfo_warehousestock: ["warehousestock","whst","whsct"],
			sParameter: "",
			
			height_pop: 300,
			height_pop2: 258,
			height_popb: 300,
			height_popb2: 258,
			
			list_product: [],
			
			product_add_index: -1,
			product_add_count: 1,
			product_add_loaded: false,
			product_add_row: {"shstID":"1","shstName":"商品信息","shstPrice":"2.00","shstCost":"2.00","shstTimeStandard":"2.00","whstCount":"10","Count":"0","pltID":"0","ProductCount":"0","ProductNeedDay":""},
			product_add_origin: [
				{"shstID":"1","shstName":"商品信息1","shstPrice":"2.10","shstCost":"5.01","shstTimeStandard":"1.00","whstCount":"10","Count":"0","pltID":"0","ProductCount":"0","ProductNeedDay":""},
				{"shstID":"2","shstName":"商品信息2","shstPrice":"2.20","shstCost":"5.02","shstTimeStandard":"1.20","whstCount":"0","Count":"0","pltID":"0","ProductCount":"0","ProductNeedDay":""},
				{"shstID":"3","shstName":"商品信息3","shstPrice":"2.30","shstCost":"5.03","shstTimeStandard":"1.30","whstCount":"4","Count":"0","pltID":"0","ProductCount":"0","ProductNeedDay":""},
				{"shstID":"4","shstName":"商品信息4","shstPrice":"2.40","shstCost":"5.04","shstTimeStandard":"1.40","whstCount":"6","Count":"0","pltID":"0","ProductCount":"0","ProductNeedDay":""},
				{"shstID":"5","shstName":"商品信息5","shstPrice":"2.50","shstCost":"5.05","shstTimeStandard":"1.50","whstCount":"8","Count":"0","pltID":"0","ProductCount":"0","ProductNeedDay":""},
				{"shstID":"6","shstName":"商品信息6","shstPrice":"2.60","shstCost":"5.06","shstTimeStandard":"1.60","whstCount":"9","Count":"0","pltID":"0","ProductCount":"0","ProductNeedDay":""},
			],
			
			productline_add_index: -1,
			productline_add_count: 1,
			productline_add_endtime: "",
			productline_add_loaded: false,
			productline_add_row: {"shstID":"1","pltName":"生产线信息","pltProductivity":"1.00","LastEndTime":"2000-1-1"},
			productline_add_origin: [
				{"pltID":"1","pltName":"生产线信息1","pltProductivity":"1.00","LastEndTime":"2000-1-1"},
				{"pltID":"2","pltName":"生产线信息2","pltProductivity":"1.10","LastEndTime":"2000-1-2"},
				{"pltID":"3","pltName":"生产线信息3","pltProductivity":"0.90","LastEndTime":"2000-1-3"},
				{"pltID":"4","pltName":"生产线信息4","pltProductivity":"1.30","LastEndTime":"2000-1-4"},
				{"pltID":"5","pltName":"生产线信息5","pltProductivity":"0.80","LastEndTime":"2000-1-5"},
			],

			uidesc_add: [

			],

			uidesc_normal: [
				{"UiLabel":"编号","DbColumn":"shsotNumCode","ControlType":"label","UiPlaceholder":"请输入...","Value":"","UiStyle":"","UiLabelAlert":"","DataFilter":[],"DataCheck":[]},
				{"UiLabel":"创建时间","DbColumn":"shsotCreateTime","ControlType":"label","UiPlaceholder":"请输入...","Value":"","UiStyle":"","UiLabelAlert":"","DataFilter":[],"DataCheck":[]},
			],

		}
	},
	onLoad(options) {
		this.sMainID=options.id;
		this.OnInitial();
	
		var that = this;
		uni.getSystemInfo({
			success: function(res) {
				that.height_pop = res.windowHeight-84;
				that.height_pop2 = res.windowHeight-84-42;
				that.height_popb = 400;
				that.height_popb2 = 400-42;
			}
		});
		
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
		OnFormSubmit:function(){
			if(this.list_product.length<=0){
				return uni.showToast({ icon:"none", title:"请选择下单数据" });
			}
			var tmpDataSubmit = {"json":JSON.stringify(this.list_product)};
			uni.request({
				/*
				url: common.makeInterface2("/api/auto/adddata/" + this.sModel + "/null/" + this.sModel + "?"),
				*/
				url: common.makeInterface2("/api/"+this.sModule+"/" + this.sModel + "/addJson?"),
				method: 'POST',
				data: tmpDataSubmit,
				header: {'content-type': 'application/x-www-form-urlencoded'},
				success: (response) => {
					if(response.statusCode == 200 || response.statusCode == 201) {
						if(response.data.code=="SUCCESS"){
							uni.navigateBack();
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
		product_add_count_OnInput:function(pEvent){
			if(parseInt(this.product_add_origin[this.product_add_index][this.tableinfo_warehousestock[1]+"Count"],0)<parseInt(pEvent.detail.value,0)){
				pEvent.detail.value=this.product_add_origin[this.product_add_index][this.tableinfo_warehousestock[1]+"Count"];
			}
			this.product_add_count=pEvent.detail.value;
		},
		productline_add_count_OnInput:function(pEvent){
			this.productline_add_count=pEvent.detail.value;
			this.CalculateProductlineTime();
		},
		OnListProductAdd:function(){
			var Coun0=0;
			var tmpIsSetting=false;
			
			this.product_add_origin[this.product_add_index]["Count"]=this.product_add_count;
			
			Coun0=0;
			while(this.list_product.length>Coun0){
				if(this.list_product[Coun0][this.tableinfo_product[1]+"ID"]==this.product_add_origin[this.product_add_index][this.tableinfo_product[1]+"ID"]){
					this.list_product[Coun0]["Count"]=this.product_add_origin[this.product_add_index]["Count"];
					tmpIsSetting=true;
				}
				Coun0++;
			}
			if(!tmpIsSetting){
				this.list_product.push(this.product_add_origin[this.product_add_index]);
			}
			this.$refs["ListProduct"].close();
			this.$refs["ListProductAdd"].close();
			return;
		},
		OnListProductDelete:function(pIndex,pRow){
			var Coun0;
			Coun0=0;
			while(this.product_add_origin.length>Coun0){
				if(this.product_add_origin[Coun0][this.tableinfo_product[1]+"ID"]==this.list_product[pIndex][this.tableinfo_product[1]+"ID"]){
					this.product_add_origin[Coun0]["Count"]=0;
					this.product_add_origin[Coun0]["pltID"]=0;
					this.product_add_origin[Coun0]["ProductCount"]=0;
					this.product_add_origin[Coun0]["ProductNeedDay"]=0;
				}
				Coun0++;
			}
			this.list_product.splice(pIndex,1);
			return;
		},
		
		/**/
		OnListProductlineAdd:function(){
			var Coun0=0;
			var tmpIsSetting=false;
			
			this.product_add_origin[this.product_add_index]["pltID"]=this.productline_add_row[this.tableinfo_productline[1]+"ID"];
			this.product_add_origin[this.product_add_index]["ProductCount"]=this.productline_add_count;
			this.product_add_origin[this.product_add_index]["ProductNeedDay"]=this.productline_add_needday;

			Coun0=0;
			while(this.list_product.length>Coun0){
				if(this.list_product[Coun0][this.tableinfo_product[1]+"ID"]==this.product_add_origin[this.product_add_index][this.tableinfo_product[1]+"ID"]){
					this.list_product[Coun0]["pltID"]=this.product_add_origin[this.product_add_index]["pltID"];
					this.list_product[Coun0]["ProductCount"]=this.product_add_origin[this.product_add_index]["ProductCount"];
					this.list_product[Coun0]["ProductNeedDay"]=this.product_add_origin[this.product_add_index]["ProductNeedDay"];
					tmpIsSetting=true;
				}
				Coun0++;
			}
			if(!tmpIsSetting){
				this.list_product.push(this.product_add_origin[this.product_add_index]);
			}
			this.$refs["ListProduct"].close();
			this.$refs["ListProductAdd"].close();
			this.$refs["ListProductline"].close();
			this.$refs["ListProductlineAdd"].close();
			return;
		},
		
		/* 界面操作方法 */
		OnShowProduct:function() {
			console.log(this.$refs);
			this.$refs["ListProduct"].open("bottom");
			
			if(this.product_add_loaded){
				return;
			}

			var tmpUrlSearch="&";

			uni.request({
				url: common.makeInterface2("/api/product/product/searchWithWarehouse?"+tmpUrlSearch),
				method: 'GET',
				header: {'content-type': 'application/x-www-form-urlencoded'},
				success: (response) => {
					if(response.statusCode == 200 || response.statusCode == 201) {
						if(response.data.code=="SUCCESS"){
							//加载DATA
							this.product_add_origin=response.data.data;
							this.product_add_loaded=true;
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
			
		},
		OnCloseProduct:function() {
			this.product_add_index=-1;
			this.productline_add_index=-1;
			this.$refs["ListProduct"].close();
		},
		OnShowProductAdd:function(pIndex,pRow) {
			this.product_add_index=pIndex;
			this.product_add_row=pRow;
			this.product_add_count=this.product_add_row["Count"];
			if(this.product_add_count==0){
				this.product_add_count=1;
			}
			if(pRow[this.tableinfo_warehousestock[1]+"Count"]<=0){
				return uni.showToast({ icon:"none", title:"库存不足，无法下单，请提交生产申请" });
			}
			this.$refs["ListProductAdd"].open("bottom");
		},
		OnCloseProductAdd:function() {
			this.product_add_index=-1;
			this.product_add_count=0;
			this.productline_add_index=-1;
			this.productline_add_count=0;
			this.$refs["ListProductAdd"].close();
		},
		OnShowProductline:function(pIndex,pRow) {
			console.log(this.$refs);
			this.product_add_index=pIndex;
			this.product_add_row=pRow;
			this.$refs["ListProductline"].open("bottom");
			
			if(this.productline_add_loaded){
				return;
			}
			
			var tmpUrlSearch="&";
			
			uni.request({
				url: common.makeInterface2("/api/productline/productline/searchWithProductlineorderdetail?"+tmpUrlSearch),
				method: 'GET',
				header: {'content-type': 'application/x-www-form-urlencoded'},
				success: (response) => {
					if(response.statusCode == 200 || response.statusCode == 201) {
						if(response.data.code=="SUCCESS"){
							//加载DATA
							this.productline_add_origin=response.data.data;
							this.productline_add_loaded=true;
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
			
		},
		OnCloseProductline:function() {
			this.product_add_index=-1;
			this.productline_add_index=-1;
			this.$refs["ListProductline"].close();
		},
		OnShowProductlineAdd:function(pIndex,pRow) {
			this.productline_add_index=pIndex;
			this.productline_add_row=pRow;
			this.productline_add_count=this.productline_add_row["ProductCount"];
			if(this.productline_add_count==0){
				this.productline_add_count=1;
			}
			this.CalculateProductlineTime();
			this.$refs["ListProductlineAdd"].open("bottom");
		},
		OnCloseProductlineAdd:function() {
			this.product_add_index=-1;
			this.productline_add_index=-1;
			this.productline_add_count=0;
			this.$refs["ListProductlineAdd"].close();
		},

		//计算生产时间
		CalculateProductlineTime :function() {
			var tmpIntTime=Math.ceil(
				this.productline_add_count
					*this.product_add_row[this.tableinfo_product[1]+"TimeStandard"]
					*this.productline_add_row[this.tableinfo_productline[1]+"Productivity"]
					);
			this.productline_add_needday=tmpIntTime;
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
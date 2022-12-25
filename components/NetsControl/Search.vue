<template>
	<div class="filter-container NetsSearch">

		<!-- # -->
		<div class="ACell" v-for="row0 in columns">
			<NetsInput :column="row0" event_name="search" @event_onchange="handleSendMessage" />
		</div>

		<!-- # -->
		<div class="ACell" v-if="show_search">
			<el-dropdown split-button type="primary" @click="handle_OnSearch" v-if="show_search_1 || show_search_2 || show_search_3">查询
				<el-dropdown-menu slot="dropdown">
					<el-dropdown-item v-if="show_search_1" @click.native="handle_OnSearch_1">查找编码相同</el-dropdown-item>
					<el-dropdown-item v-if="show_search_2" @click.native="handle_OnSearch_2">查找名称相同</el-dropdown-item>
					<el-dropdown-item v-if="show_search_3" @click.native="handle_OnSearch_3">高级查询</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
			<el-button class="filter-item" type="primary" icon="el-icon-search" @click="handle_OnSearch" v-if="!show_search_1 && !show_search_2 && !show_search_3">查询</el-button>
		</div>

		<!-- # -->
		<div class="ACell" v-if="show_add">
			<el-button class="filter-item" type="primary" icon="el-icon-search" @click="handle_OnAdd">增加</el-button>
		</div>

		<!-- # -->
		<div class="ACell" v-if="show_delete">
			<el-button class="filter-item" type="primary" icon="el-icon-remove" @click="handle_OnDelete">删除</el-button>
		</div>

		<!-- # -->
		<div class="ACell" v-if="show_import">
			<el-button class="filter-item" type="primary" icon="el-icon-download" @click="handle_OnImport">导入</el-button>
		</div>

		<!-- # -->
		<div class="ACell" v-if="show_export">
			<el-dropdown split-button type="primary" icon="el-icon-download" @click="handle_OnExport" v-if="show_export_1 || show_export_2 || show_export_4 || show_export_5 || show_export_6">导出
				<el-dropdown-menu slot="dropdown">
					<el-dropdown-item v-if="show_export_1" @click.native="handle_OnExport_1">导出所有XLS</el-dropdown-item>
					<el-dropdown-item v-if="show_export_2" @click.native="handle_OnExport_2">导出所有XLSX</el-dropdown-item>
					<!--
					<el-dropdown-item v-if="show_export_3" @click.native="handle_OnExport_3">按模板导出</el-dropdown-item>
					-->
					<el-dropdown-item v-if="show_export_4" @click.native="handle_OnExport_4">导出PDF</el-dropdown-item>
					<el-dropdown-item v-if="show_export_5" @click.native="handle_OnExport_5">导出XML</el-dropdown-item>
					<el-dropdown-item v-if="show_export_6" @click.native="handle_OnExport_6">导出CSV</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
			<el-button class="filter-item" type="primary" icon="el-icon-search" @click="handle_OnExport" v-if="!show_export_1 && !show_export_2 && !show_export_4 && !show_export_5 && !show_export_6">导出</el-button>
		</div>

		<!-- # -->
		<div class="ACell" v-if="show_print">
			<el-dropdown split-button type="primary" @click="handle_OnPrint" v-if="show_print_1 || show_print_2 || show_print_3">打印选中
				<el-dropdown-menu slot="dropdown">
					<el-dropdown-item v-if="show_print_1" @click.native="handle_OnPrint_1">从模板打印选中</el-dropdown-item>
					<el-dropdown-item v-if="show_print_2" @click.native="handle_OnPrint_2">设计打印模板</el-dropdown-item>
					<el-dropdown-item v-if="show_print_3" @click.native="handle_OnPrint_3">高级打印</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
			<el-button class="filter-item" type="primary" icon="el-icon-search" @click="handle_OnPrint" v-if="!show_print_1 && !show_print_2 && !show_print_3">打印选中</el-button>
		</div>

		<!-- # -->
		<div class="ACell" v-if="show_design">
			<el-dropdown split-button type="primary" @click="handle_OnDesign" v-if="show_design_1 || show_design_2 || show_design_3 || show_design_4 || show_design_5 || show_design_6 || show_design_7">设计
				<el-dropdown-menu slot="dropdown">
					<el-dropdown-item v-if="show_design_1" @click.native="handle_OnDesign_1">设计查询</el-dropdown-item>
					<el-dropdown-item v-if="show_design_2" @click.native="handle_OnDesign_2">设计列表</el-dropdown-item>
					<el-dropdown-item v-if="show_design_3" @click.native="handle_OnDesign_3">设计新增</el-dropdown-item>
					<el-dropdown-item v-if="show_design_4" @click.native="handle_OnDesign_4">设计修改</el-dropdown-item>
					<el-dropdown-item v-if="show_design_4" @click.native="handle_OnDesign_5">设计打印</el-dropdown-item>
					<el-dropdown-item v-if="show_design_5" @click.native="handle_OnDesign_6">重新编码</el-dropdown-item>

					<!--
					<el-dropdown-item v-if="show_design_6" @click.native="handle_OnDesign_7">排序设置</el-dropdown-item>
					<el-dropdown-item v-if="show_design_7" @click.native="handle_OnDesign_8">列设置</el-dropdown-item>
					
					<el-dropdown-item v-if="show_design_8" @click.native="handle_OnDesign_9">导出设计样式</el-dropdown-item>
					<el-dropdown-item v-if="show_design_9" @click.native="handle_OnDesign_10">导入设计样式</el-dropdown-item>
					<el-dropdown-item v-if="show_design_10" @click.native="handle_OnDesign_11">设置校验字段</el-dropdown-item>
					<el-dropdown-item v-if="show_design_11" @click.native="handle_OnDesign_12">设置监控字段</el-dropdown-item>
					<el-dropdown-item v-if="show_design_12" @click.native="handle_OnDesign_13">设置批量字段</el-dropdown-item>
					<el-dropdown-item v-if="show_design_13" @click.native="handle_OnDesign_14">批量修改</el-dropdown-item>
					<el-dropdown-item v-if="show_design_14" @click.native="handle_OnDesign_15">属性设置</el-dropdown-item>
					-->

				</el-dropdown-menu>
			</el-dropdown>
			<el-button class="filter-item" type="primary" icon="el-icon-search" @click="handle_OnDesign" v-if="!show_design_1 && !show_design_2 && !show_design_3 && !show_design_4 && !show_design_5 && !show_design_6 && !show_design_7">设计</el-button>
		</div>



	</div>
</template>

<script>
import NetsInput from '@/components/NetsControl/Input'

export default {
	components: { NetsInput },
	props: {
		columns: { type: Array, required: true,
			default() {
				return []
			}
		},

		show_search: { type: Boolean, default: true },
		show_search_1: { type: Boolean, default: true },
		show_search_2: { type: Boolean, default: true },
		show_search_3: { type: Boolean, default: true },
		show_add: { type: Boolean, default: true },
		show_delete: { type: Boolean, default: true },
		show_import: { type: Boolean, default: true },

		show_export: { type: Boolean, default: true },
		show_export_1: { type: Boolean, default: true },
		show_export_2: { type: Boolean, default: true },
		show_export_3: { type: Boolean, default: true },
		show_export_4: { type: Boolean, default: true },
		show_export_5: { type: Boolean, default: true },
		show_export_6: { type: Boolean, default: true },
		show_print: { type: Boolean, default: true },
		show_print_1: { type: Boolean, default: true },
		show_print_2: { type: Boolean, default: true },
		show_print_3: { type: Boolean, default: true },
		show_design: { type: Boolean, default: true },
		show_design_1: { type: Boolean, default: false },
		show_design_2: { type: Boolean, default: true },
		show_design_3: { type: Boolean, default: true },
		show_design_4: { type: Boolean, default: true },
		show_design_5: { type: Boolean, default: true },
		show_design_6: { type: Boolean, default: true },
		show_design_7: { type: Boolean, default: true },
		show_design_8: { type: Boolean, default: true },
		show_design_9: { type: Boolean, default: true },
		show_design_10: { type: Boolean, default: true },
		show_design_11: { type: Boolean, default: true },
		show_design_12: { type: Boolean, default: true },
		show_design_13: { type: Boolean, default: true },
		show_design_14: { type: Boolean, default: true },

		title: { type: String, default: 'vue' }
	},
	data() {
		return {
			isActive: false
		}
	},
	methods: {
		clickTitle() {
			this.isActive = !this.isActive
		},
		handle_OnSearch() {
			this.$emit("event_search_onsearch", "event_search_onsearch", "ccccccc");
			/*
			this.event_search();
			*/
		},
		handle_OnSearch_1(){ this.$emit("event_search_onsearch_1", "event_search_onsearch_1", "ccccccc"); },
		handle_OnSearch_2(){ this.$emit("event_search_onsearch_2", "event_search_onsearch_2", "ccccccc"); },
		handle_OnSearch_3(){ this.$emit("event_search_onsearch_3", "event_search_onsearch_3", "ccccccc"); },
		handle_OnAdd(){ this.$emit("event_search_onadd", "event_search_onadd", "ccccccc"); },
		handle_OnDelete(){ this.$emit("event_search_ondelete", "event_search_ondelete", "ccccccc"); },
		handle_OnImport(){ this.$emit("event_search_onimport", "event_search_onimport", "ccccccc"); },
		handle_OnExport(){ console.log("event_search_onexport"); this.$emit("event_search_onexport", "event_search_onexport", "ccccccc"); },
		handle_OnExport_1(){ this.$emit("event_search_onexport_1", "event_search_onexport_1", "ccccccc"); },
		handle_OnExport_2(){ this.$emit("event_search_onexport_2", "event_search_onexport_2", "ccccccc"); },
		handle_OnExport_3(){ this.$emit("event_search_onexport_3", "event_search_onexport_3", "ccccccc"); },
		handle_OnExport_4(){ this.$emit("event_search_onexport_4", "event_search_onexport_4", "ccccccc"); },
		handle_OnExport_5(){ this.$emit("event_search_onexport_5", "event_search_onexport_5", "ccccccc"); },
		handle_OnExport_6(){ console.log("event_search_onexport_6"); this.$emit("event_search_onexport_6", "event_search_onexport_6", "ccccccc"); },
		handle_OnPrint(){ this.$emit("event_search_onprint", "event_search_onprint", "ccccccc"); },
		handle_OnPrint_1(){ this.$emit("event_search_onprint_1", "event_search_onprint_1", "ccccccc"); },
		handle_OnPrint_2(){ this.$emit("event_search_onprint_2", "event_search_onprint_2", "ccccccc"); },
		handle_OnPrint_3(){ this.$emit("event_search_onprint_3", "event_search_onprint_3", "ccccccc"); },
		handle_OnDesign(){ this.$emit("event_search_ondesign", "event_search_ondesign", "ccccccc"); },
		handle_OnDesign_1(){ this.$emit("event_search_ondesign_1", "event_search_ondesign_1", "ccccccc"); },
		handle_OnDesign_2(){ this.$emit("event_search_ondesign_2", "event_search_ondesign_2", "ccccccc"); },
		handle_OnDesign_3(){ this.$emit("event_search_ondesign_3", "event_search_ondesign_3", "ccccccc"); },
		handle_OnDesign_4(){ this.$emit("event_search_ondesign_4", "event_search_ondesign_4", "ccccccc"); },
		handle_OnDesign_5(){ this.$emit("event_search_ondesign_5", "event_search_ondesign_5", "ccccccc"); },
		handle_OnDesign_6(){ this.$emit("event_search_ondesign_6", "event_search_ondesign_6", "ccccccc"); },
		handle_OnDesign_7(){ this.$emit("event_search_ondesign_7", "event_search_ondesign_7", "ccccccc"); },
		handle_OnDesign_8(){ this.$emit("event_search_ondesign_8", "event_search_ondesign_8", "ccccccc"); },
		handle_OnDesign_9(){ this.$emit("event_search_ondesign_9", "event_search_ondesign_9", "ccccccc"); },
		handle_OnDesign_10(){ this.$emit("event_search_ondesign_10", "event_search_ondesign_10", "ccccccc"); },
		handle_OnDesign_11(){ this.$emit("event_search_ondesign_11", "event_search_ondesign_11", "ccccccc"); },
		handle_OnDesign_12(){ this.$emit("event_search_ondesign_12", "event_search_ondesign_12", "ccccccc"); },
		handle_OnDesign_13(){ this.$emit("event_search_ondesign_13", "event_search_ondesign_13", "ccccccc"); },
		handle_OnDesign_14(){ this.$emit("event_search_ondesign_14", "event_search_ondesign_14", "ccccccc"); },
		//子控件响应的事件消息
		handleSendMessage:function(pEvent,pValue){
			this.$emit(pEvent, pEvent, pValue);
		}
	}
}
</script>

<style lang="scss" >

.NetsSearch{}
.NetsSearch .ACell{ height:50px; float:left; margin:0px 6px 0px 0px; }

</style>

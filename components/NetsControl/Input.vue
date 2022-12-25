<template>

		<!-- # -->
		<view :style="column.UiStyle" :title="column.DbColumn" v-if="column.ControlType=='label'" class="MainFormControlLabel">{{column.Value}}</view>

		<!-- # -->
		<view :style="column.UiStyle" :title="column.DbColumn" v-if="column.ControlType=='label_textarea'" class="MainFormControlLabel">{{column.Value}}</view>

		<!-- # -->
		<view :style="column.UiStyle" :title="column.DbColumn" v-if="column.ControlType=='label_int'" class="MainFormControlLabel">{{column.Value}}</view>



		<!-- # -->
		<input v-model="column.Value" :style="column.UiStyle" :placeholder="column.UiPlaceholder" :title="column.DbColumn" clearable @change="handle_OnChange" v-if="column.ControlType=='text'" class="MainFormControlInput" />

		<!-- # -->
		<el-autocomplete v-model="column.Value" :style="column.UiStyle" :placeholder="column.UiPlaceholder" :title="column.DbColumn" clearable @change="handle_OnChange" :fetch-suggestions="OnTextDropdown" v-if="column.ControlType=='text_dropdown'" class="MainFormControlInput" />

		<!-- # -->
		<textarea v-model="column.Value" :style="column.UiStyle" :placeholder="column.UiPlaceholder" :title="column.DbColumn" clearable :rows="5" type="textarea" @change="handle_OnChange" v-if="column.ControlType=='textarea'" class="MainFormControlTextarea" ></textarea>

		<!-- # -->
		<input v-model="column.Value" :style="column.UiStyle" :placeholder="column.UiPlaceholder" :title="column.DbColumn" clearable @change="handle_OnChange" v-if="column.ControlType=='text_int'" class="MainFormControlInput" />



		<!-- # -->
		<input v-model="column.Value" :style="column.UiStyle" :placeholder="column.UiPlaceholder" :title="column.DbColumn" clearable @change="handle_OnChange" show-password type="password" v-if="column.ControlType=='pxd'" class="MainFormControlInput" />



		<!-- # -->
		<el-select v-model="column.Value" :placeholder="column.UiPlaceholder" :style="column.UiStyle" :title="column.DbColumn" clearable @change="handle_OnChange" disabled="true" v-if="column.ControlType=='select_label'" class="filter-item">
			<el-option v-for="option in column.Options" :key="option.Value" :label="option.Text" :value="option.Value" />
		</el-select>

		<!-- # -->
		<el-select v-model="column.Value" :placeholder="column.UiPlaceholder" :style="column.UiStyle" :title="column.DbColumn" clearable @change="handle_OnChange" v-if="column.ControlType=='select'" class="filter-item">
			<el-option v-for="option in column.Options" :key="option.Value" :label="option.Text" :value="option.Value" />
		</el-select>

		<!-- # -->
		<el-select v-model="column.ValueShowAr" :placeholder="column.UiPlaceholder" :style="column.UiStyle" :title="column.DbColumn" clearable @change="handle_OnChange" multiple v-if="column.ControlType=='select_multi'" class="filter-item">
			<el-option v-for="option in column.Options" :key="option.Value" :label="option.Text" :value="option.Value" />
		</el-select>

		<!-- # -->
		<el-time-select v-model="column.Value" :picker-options="{start: column.value_start,step: column.value_step,end: column.value_end}" :placeholder="column.UiPlaceholder" :title="column.DbColumn" @change="handle_OnChange(column.name)" v-if="column.controltype=='select_time'"></el-time-select>

		<!-- # -->
		<el-time-select v-model="column.Value" :picker-options="{start: column.value_start,step: column.value_step,end: column.value_end}" :placeholder="column.UiPlaceholder" :title="column.DbColumn" @change="handle_OnChange(column.name)" v-if="column.ControlType=='select_time_fromto'"></el-time-select>
		<el-time-select v-model="column.Value2" :picker-options="{start: column.value_start,step: column.value_step,end: column.value_end,minTime: startTime}" :placeholder="column.UiPlaceholder2" @change="handle_OnChange" v-if="column.ControlType=='select_time_fromto'"></el-time-select>

		<!-- # -->
		<div class="block" @change="handle_OnChange" :title="column.DbColumn" v-if="column.ControlType=='select_date'">
			<el-date-picker v-model="column.Value" type="date" :placeholder="column.UiPlaceholder" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
		</div>

		<!-- # -->
		<div class="block" @change="handle_OnChange" v-if="column.ControlType=='select_date_fromto'" :title="column.DbColumn">
			<el-date-picker v-model="column.Value" type="daterange" :range-separator="column.UiPlaceholder3" :start-placeholder="column.UiPlaceholder" :end-placeholder="column.UiPlaceholder2" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
		</div>

		<!-- # -->
		<div class="block" @change="handle_OnChange" v-if="column.ControlType=='switch'" :title="column.DbColumn">
			<el-switch v-model="column.ValueShow" active-color="#13ce66" inactive-color="#dddddd"></el-switch>
		</div>

		<!-- # -->
		<radio-group v-model="column.Value" v-if="column.ControlType=='radio'" :title="column.DbColumn" @change="handle_OnChange">
			<label class="uni-list-cell uni-list-cell-pd" v-for="option in column.Options">
				<view style="float: left; margin: 0px 0px 0px 0px;"><radio :value="option.Value" :checked="column.Value==option.Value" /></view><view style="float: left; margin: 2px 12px 0px 0px;">{{option.Text}}</view>
			</label>
		</radio-group>

		<!-- # -->
	  <el-checkbox-group v-model="column.ValueShowAr" v-if="column.ControlType=='checkbox'" :title="column.DbColumn" @change="handle_OnChange">
	    <el-checkbox :label="option.Value" v-for="option in column.Options">{{option.Text}}</el-checkbox>
	  </el-checkbox-group>

		<div class="" v-if="column.UiLabelAlert.length>0" :style="'line-height:20px; margin:12px 0px 0px 0px; '+column.UiLabelAlertStyle">{{ column.UiLabelAlert }}</div>

</template>

<script>
export default {
	props: {
		column: {
			type: Object,
			required: true,
			default() {
				return {
				}
			}
		},
		event_name: { type: String, default: 'normal' },
		title: { type: String, default: 'vue' }
	},
	data() {
		return {
		}
	},
	methods: {
		handle_OnChange(pEvent) {
			if(this.column.ControlType=="radio"){
				this.column.Value=pEvent.detail.value;
			}
			this.$emit("event_onchange", "event_onchange", this.event_name+","+this.column.DbColumn);
		},
		clickTitle() {
			this.isActive = !this.isActive
		},
		/* text_dropdown控件下拉 */
		OnTextDropdown(queryString, pCallback) {
			var tmpData = [];
			var Coun0=0;
			while(this.column.Options.length>Coun0){
				tmpData[tmpData.length]={"value":this.column.Options[Coun0]["Value"]};
				Coun0++;
			}
			var tmpResults = queryString ? tmpData.filter(this.createFilter(queryString)) : tmpData;
			pCallback(tmpResults);
		},
		createFilter(queryString) {
			return (tmpDataRow) => {
				return (tmpDataRow.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
			};
		},
		//-- #验证 pValue 是否在数组 pAR 里 --
		In_array:function(pValue,pAR){
			var Coun0=0;
			while(pAR.length>Coun0){
				if(pValue==pAR[Coun0]){
					return 1;
				}
				Coun0++;
			}

			return 0;
		}
	}
}
</script>

<style lang="scss" >

</style>

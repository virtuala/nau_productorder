<template>
	<view v-for="row0 in columns" class="MainFormRow">
		<view class="MainFormLabel">{{row0.UiLabel}}</view>
		<view class="MainFormControl"><NetsInput :column="row0" @event_onchange="handleSendMessage" /></view>
		<view class="DClear"></view>
	</view>
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

		event_name: { type: String, default: 'normal' },
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
		//子控件响应的事件消息
		handleSendMessage:function(pEvent,pValue){
			this.$emit(pEvent, pEvent, pValue);
		}
	}
}
</script>

<style lang="scss" >

</style>

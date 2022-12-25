<template>
	<div>
	
		<!-- # -->
		<div class="NetsSearch_ACell" v-for="row0 in columns">
			<NetsInput :column="row0" event_name="search" @event_onchange="handleSendMessage" />
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

.NetsSearch{}
.NetsSearch_ACell{ height:50px; float:left; margin:0px 6px 0px 0px; }

</style>

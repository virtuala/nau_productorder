<template>
	<view class="content">
		<view class="text-area" style="margin: 24px auto 24px auto;">
			<text class="title">{{title}}</text>
		</view>
		<view class="text-area">
			<navigator url="/pages/userinfo/login" style="margin: 0px 0px 0px 0px;">用户登录</navigator>
		</view>
		<view class="text-area">
			<navigator url="/pages/userinfo/init" style="margin: 24px 0px 0px 0px;">初始化系统用户</navigator>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '订单生产管理系统'
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>

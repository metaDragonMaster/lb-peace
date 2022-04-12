<template>
	<div class="head">
		<div class="head-nav limit-max-width-media">
			<div class="ph">
				<OpenIcon :active="active" @click="openDrawer"></OpenIcon>
			</div>
			<div class="pc">
				<selectModuleTypeVue></selectModuleTypeVue>
				<UserAssets></UserAssets>
				<LinkWallet></LinkWallet>
			</div>
		</div>
		<el-drawer v-model="active" direction="ltr" size="80%" :with-header="false">
			<div class="drawer-flex">
				<UserAssets></UserAssets>
				<LinkWallet></LinkWallet>
				<selectModuleTypeVue></selectModuleTypeVue>
			</div>
		</el-drawer>
	</div>
</template>

<script setup>
import { ref } from "vue";
import selectModuleTypeVue from "./selectModuleType.vue";
import OpenIcon from "./openIcon";
import UserAssets from "./userAssets"
import LinkWallet from './linkWallet.vue';
// import Withdraw from "./withdraw"
const active = ref(false);
function openDrawer() {
	console.log("openDrawer");
	active.value = !active.value;
}
</script>
<style lang='scss' scoped>
@import "./../layout.scss";
.head {
	height: $head-height__pc;
	@media screen and (max-width: 1280px) {
		height: $head-height__ph;
	}
	.head-nav {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: inherit;
		z-index: 500;
		display: flex;
		align-items: center;
		background-color: rgba($color: $layout-background__color, $alpha: 0.1);
		display: flex;
		justify-content: space-between;
	}
}

.pc {
	width: 100%;
	.button:first-of-type {
		margin-left: auto;
	}
	@media screen and (min-width: 769px) {
		display: flex;
		align-items: center;
	}
	@media screen and (max-width: 768px) {
		display: none;
	}
}
.ph {
	@media screen and (min-width: 769px) {
		display: none;
	}
	@media screen and (max-width: 768px) {
		display: inline-block;
	}
}

.button {
	min-width: 130px;
	padding: 12px 25px;
	font-size: 14px;
	&:not(:last-of-type) {
		margin-right: 10px;
	}
}

.drawer-flex {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	& > * {
		margin-bottom: 10px;
	}
}
:deep() .el-drawer .el-drawer__body {
	background-color: $layout-background__color;
	box-shadow: 0 0 4px 0 rgba($color: #48b0fe, $alpha: 1);
}
</style>

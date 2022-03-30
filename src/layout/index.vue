<template>
	<div id="layout">
		<HeadNav></HeadNav>
		<router-view></router-view>
	</div>
</template>
<script setup>
import HeadNav from "./HeadNav";
import { watch} from "vue";
import { PlusElMessage, lockLoadHandler } from "@/utils/PlusElement"
import {
	useWindowResize,
	// useWindowScroll
} from "@/hooks/useWindow";
import Decimal from "decimal.js";
import { UseStoreResize } from "@/stores/window";
import {
	storeToRefs
} from "pinia"
import {
	UseStoreWeb3js,
	UseStoreContracts
} from "@/stores/web3js"
import {
	AbiAddressLBPOOL,
	addedValue,
} from "@/abis/index"
const { setClientWidth } = UseStoreResize();
useWindowResize(() => {
	setClientWidth();
});
const storeContracts = UseStoreContracts();
const storeWeb3js = UseStoreWeb3js();
const { startWeb3 } = storeWeb3js;
const { haveAuth, userAddress } = storeToRefs(storeWeb3js)
const { Contracts } = storeToRefs(storeContracts);

init()
async function init() {
	console.log(AbiAddressLBPOOL)
	if (!haveAuth.value) {
		await startWeb3();
	}
	// allowance()
}
watch(()=>userAddress.value,()=>{
	allowance()
},{
  immediate: true
})

async function allowance() {
	try {
		const { LBContract } = Contracts.value;
		const res_allowance = await LBContract.methods.allowance(userAddress.value, AbiAddressLBPOOL).call();
		const v = new Decimal(res_allowance)
		console.log('是否有授权',v);
		if (v <= 0) {
			// setUserAddress('')
			increaseAllowance()
		}
	} catch (e) {
		// setUserAddress('')
		console.error(e);
	}
}

async function increaseAllowance() {
	const load = lockLoadHandler('Sign in loading...')
	try {
		const { LBContract } = Contracts.value;
		const res = await LBContract.methods.increaseAllowance(AbiAddressLBPOOL, addedValue).send({
			from: userAddress.value
		});
		console.log(res)
		load.close()
	} catch (e) {
		console.error(e);
		PlusElMessage({
			type: 'error',
			message: e.message
		})
		load.close()
	}
}
</script>
<style lang="scss" scoped>
@import "./layout.scss";
#layout {
	min-height: 100vh;
	color: $layout-color;
	background-color: $layout-background__color;
	#main {
		min-height: calc(100vh - $head-height__pc);
		@media screen and (max-width: 1280px) {
			min-height: calc(100vh - $head-height__ph);
		}
	}
}
</style>

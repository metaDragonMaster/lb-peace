<template>
    <button class="button user-assets" @click="init">
        LB: {{balanceOfValue}}
    </button>
</template>

<script setup>
import { ref } from 'vue'
import { storeToRefs } from "pinia";
import {
	UseStoreWeb3js,
	UseStoreContracts,
} from "@/stores/web3js";
const storeWeb3js = UseStoreWeb3js();
const { userAddress,web3 } = storeToRefs(storeWeb3js);
const storeContracts = UseStoreContracts();
const { Contracts } = storeToRefs(storeContracts);
function textFromWei(str) {
  return web3.value.utils.fromWei(str) || str;
}
init()
async function init() {
	await balanceOf()
}
const balanceOfValue = ref(0);
async function balanceOf() {
try {
	const { LBContract } = Contracts.value;
	const res = await LBContract.methods.balanceOf(userAddress.value).call();
	console.log(res)
	balanceOfValue.value = textFromWei(res)
	} catch (e) {
		console.error(e);
	}
}


</script>
<style lang='scss' scoped>
.user-assets {
    border: 1px solid #666666;
}
</style>

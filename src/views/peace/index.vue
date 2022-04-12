<template>
	<div>
		<el-button type="success" @click="approve">授权</el-button>
	</div>
</template>

<script setup>
import { UseStoreContracts, UseStoreWeb3js } from "@/stores/web3js"
import { storeToRefs } from "pinia";
import { AbiAddressLN, addedValue } from "@/abis/index"
const storeContracts = UseStoreContracts()
const { Contracts } = storeToRefs(storeContracts)
const storeWeb3js = UseStoreWeb3js();
const { userAddress } = storeToRefs(storeWeb3js);

async function approve() {

	try {
		const { LBContract } = Contracts.value;
		const res = await LBContract.methods.approve(AbiAddressLN, addedValue).send({
			from: userAddress.value,
		});
		console.log(res);
	} catch (e) {
		console.error(e);
	}
}

</script>
<style lang='scss' scoped>
</style>

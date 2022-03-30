<template>
    <div>
        <el-button @click="increaseAllowance">获取授权</el-button>
        <el-button @click="getReFee">获取Fee</el-button>
        
    </div>
</template>

<script setup>
import {
    UseStoreWeb3js,
    UseStoreContracts
} from "@/stores/web3js";
import baseAddress from "@/abis/contracts"
import {
    storeToRefs
} from "pinia"

const {
    AbiAddressQK,
    addedValue,
} = baseAddress;
const storeContracts = UseStoreContracts();
const storeWeb3js = UseStoreWeb3js();
const { userAddress } = storeToRefs(storeWeb3js)
const { Contracts } = storeToRefs(storeContracts);
async function increaseAllowance() {
    try {
        const { USDTContract } = Contracts.value;
        const res = await USDTContract.methods.increaseAllowance(AbiAddressQK, addedValue).send({
            from: userAddress.value
        });
        console.log(res)
    } catch (e) {
        console.error(e);
    }
}

async function getReFee() {
    try {
        const { QKContract } = Contracts.value;
        const res = await QKContract.methods.get_Re_fee().call();
        console.log(res)
    } catch (e) {
        console.error(e);
    }
}


</script>
<style lang='scss' scoped>
</style>
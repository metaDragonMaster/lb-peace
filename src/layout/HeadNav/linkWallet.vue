<template>
    <button
        class="link-wallet button"
        @click="elClick"
    >
        {{ text }}
    </button>
</template>

<script setup>
import { PlusElMessage } from "@/utils/PlusElement"
import {
    computed,
    unref
} from 'vue'
import {
    copy,
    truncationAddress
} from "@/utils/tools"
import { useLanguage } from "@/hooks/useLanguage"

import {
    UseStoreWeb3js,
} from "@/stores/web3js"
import { storeToRefs } from "pinia";
const { t } = useLanguage();
const useStoreWeb3js = UseStoreWeb3js();
const { startWeb3 } = useStoreWeb3js;
const { userAddress, haveAuth } = storeToRefs(useStoreWeb3js)
const text = computed(() => haveAuth.value&&!!userAddress.value ? truncationAddress(unref(userAddress)) : t('首栏.链接钱包'))
function elClick() {
    if (!haveAuth.value||!userAddress.value) {
        console.log('获取web3')
        startWeb3();
    } else {
        const res = copy(unref(userAddress))
        if (res) {
            PlusElMessage({
                type: 'success',
                message: 'copy success'
            })
        }
    }
}

</script>
<style lang='scss' scoped>
.link-wallet {
    background-color: #000000;
}
</style>
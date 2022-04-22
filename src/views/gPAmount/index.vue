<template>
	<div>amountOut:{{ amountOut }}</div>
</template>

<script setup>
import getAmountOut from "./index_data";
import { onMounted, ref } from "vue";
const amountOut = ref("");
onMounted(async () => {
	amountOut.value = '正在获取数据（0%）...'
	amountOut.value = await getAmountOut(progress=> {
		amountOut.value = `正在获取数据（${progress}%）...`
	});
});
</script>
<style lang="scss" scoped></style>

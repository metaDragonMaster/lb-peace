<template>
	<div>amountOut:{{ amountOut }}</div>
</template>

<script setup>
import getAmountOut from "./index_data";
import { onMounted, ref } from "vue";
const amountOut = ref("");
onMounted(async () => {
	amountOut.value = await getAmountOut();
});
</script>
<style lang="scss" scoped></style>

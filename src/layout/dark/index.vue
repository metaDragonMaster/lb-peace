<template>
    <el-button @click="toggleDark">toggleDark</el-button>
</template>

<script setup>
import { useDark, useToggle } from "@vueuse/core";
const isDark = useDark({
  selector: "#layout",
  attribute: "color-scheme",
  valueDark: "dark",
  valueLight: "light",
});
const toggleDark = useToggle(isDark);
</script>
<style lang='scss' scoped>

</style>
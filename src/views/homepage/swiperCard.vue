<template>
  <div class="pc-swapier">
    <Swiper
      :slides-per-view="slidesPerViewNum"
      :scrollbar="{ draggable: true }"
    >
      <SwiperSlide v-for="item in tList" :key="item.id">
        <TCard
          :conditional="item.conditional"
          :interest="item.interest"
        ></TCard>
      </SwiperSlide>
    </Swiper>
  </div>
  <ul class="ph-swapier">
    <li class="" v-for="item in tList" :key="item.id">
      <TCard :conditional="item.conditional" :interest="item.interest"></TCard>
    </li>
  </ul>
</template>
<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { PlusElMessage, lockLoadHandler } from "@/utils/PlusElement";
import { UseStoreResize } from "@/stores/window";
import TCard from "./tCard.vue";
import "swiper/swiper.min.css";
import "swiper/modules/navigation/navigation.min.css";
import { Swiper, SwiperSlide } from "swiper/vue/swiper-vue.js";
import { storeToRefs } from "pinia";
import { UseStoreContracts } from "@/stores/web3js";
const storeCountracts = UseStoreContracts();
const { Contracts } = storeToRefs(storeCountracts);

const storeResize = UseStoreResize();
const { clientWidth } = storeToRefs(storeResize);
const slidesPerViewNum = computed(() => {
  let num = 0;
  if (clientWidth.value >= 1280) {
    num = 4.5;
  } else if (clientWidth.value >= 980) {
    num = 3.5;
  } else if (clientWidth.value >= 768) {
    num = 2.5;
  } else if (clientWidth.value >= 500) {
    num = 1.5;
  }
  return num;
});

const tList = ref([]);

onMounted(() => {
  // init()
});
watch(
  () => Contracts.value,
  (n) => {
    const { QKContract } = n;
    if (QKContract) {
      init();
    }
  }
);
async function init() {
  const load = lockLoadHandler("loading...");
  try {
    const Conditionals = await getConditionalValue();
    const Interests = await getInterest();
    load.close();
    if (Conditionals.length == Interests.length) {
      let list = [];
      for (let i = 0; i < Conditionals.length; i++) {
        list.push({
          id: i,
          conditional: Conditionals[i],
          interest: (Interests[i] / 10).toString(),
        });
      }
      tList.value = list;
    }
  } catch (e) {
    console.error(e);
    load.close();
    PlusElMessage({
      type: "error",
      message: "invalid",
    });
  }
}

async function getConditionalValue() {
  try {
    const { QKContract } = Contracts.value;
    const res = await QKContract.methods.get_conditional_value().call();
    console.log(res);
    return res;
  } catch (e) {
    console.error(e);
    return [];
  }
}
async function getInterest() {
  try {
    const { QKContract } = Contracts.value;
    const res = await QKContract.methods.get_interest().call();
    console.log(res);
    return res;
  } catch (e) {
    console.error(e);
    return [];
  }
}
</script>
<style lang="scss" scoped>
.swiper-slide {
  padding-right: 10px;
}
.pc-swapier {
  display: none;
  @media screen and (min-width: 769px) {
    display: block;
  }
}
.ph-swapier {
  display: none;
  @media screen and (max-width: 768px) {
    display: block;
  }
  li {
    margin-bottom: 10px;
  }
}
</style>

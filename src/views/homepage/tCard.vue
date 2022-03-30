<template>
    <div class="t-card theme-box-shadow">
        <div class="coin-type">
            <img src="@/assets/icons/b-t.png" alt />
            <span class="theme-bg-shadow">BSC</span>
            <!-- <span class="theme-bg-shadow-green">TRC 20</span> -->
        </div>
        <div class="font-o">
            <p>Partner wallet balance ></p>
            <p class="align-right"> {{ props.conditional }}
                <span class="grey">USDT</span>
            </p>
        </div>
        <p class="font-o">Every 8 hour + {{ props.interest }}%</p>
    </div>
</template>

<script setup>
import {
    defineProps
} from "vue"
const props = defineProps({
    conditional: {
        type: String,
    },
    interest: {
        type: String,
    },
})
</script>
<style lang='scss' scoped>
.t-card {
    font-size: 12px;
    border-radius: 4px;
    padding: 23px 27px;
}
.coin-type {
    display: flex;
    align-items: center;
    img {
        margin-right: auto;
    }
    span {
        padding: 0 4px;
        margin-left: 10px;
        border-radius: 2px;
    }
}
.coin-type,
.coin-type + p {
    margin-bottom: 10px;
}
.grey {
    color: #949494;
}
.align-right {
    text-align: right;
}
</style>
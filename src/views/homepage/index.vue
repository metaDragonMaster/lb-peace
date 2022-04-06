<template>
	<div class="homepage">
		<h3 class="title text-align-center">
			{{ $t("标题.LB-PEACE", 1) }}
			<span class="theme-color">- {{ $t("标题.LB-PEACE", 2) }}</span>
		</h3>
		<div class="limit-max-width-media">
			<ul class="content-grid" v-if="tList.length > 0">
				<li
					class="card theme-border"
					v-for="(item, index) in tList"
					:key="item.id"
					:ref="el => { if (el) cardRefs[index] = el }"
				>
					<h3
						class="title theme-color text-align-center"
					>{{ cardTitle(item.conditional, item.interest) }}</h3>
					<p class="label theme-color">已存入</p>
					<div class="cell">
						<p>
							<img class="icon" src="@/assets/icons/icon-LB.png" alt="errorImage" />
							<span>LB</span>
						</p>
						<span class="theme-color">{{ DepositedValue(item.value, item.conditional) }}</span>
					</div>
					<p class="label theme-color">可领取</p>
					<div class="cell only-pc">
						<p>
							<img class="icon" src="@/assets/icons/icon-PEACE.png" alt="errorImage" />
							<span>PEACE</span>
						</p>
						<span class="theme-color">{{ textFromWei(item._calculate) }}</span>
					</div>
					<p class="label theme-color">已领取</p>
					<div class="cell only-pc">
						<p>
							<img class="icon" src="@/assets/icons/icon-PEACE.png" alt="errorImage" />
							<span>PEACE</span>
						</p>
						<span class="theme-color">{{ textFromWei(item._received) }}</span>
					</div>
					<!-- <el-input-number class="input" type="text" placeholder="请输入LB数量" v-model.number="item.amount" /> -->
					<p class="label theme-color">转入LB数量：</p>
					<el-input-number
						class="input"
						v-model="item.amount"
						controls-position="right"
						size="large"
						:min="0"
						:controls="false"
					/>
					<button class="theme-bg-color submit" @click="join(item.amount, item.id)">{{ $t('转入') }}</button>
					<!-- <button class="theme-bg-color-black submit receive" @click="withdraw(index)">{{ $t('领取') }}</button> -->
					<button class="theme-bg-color-black submit receive" @click="ps">{{ $t('领取') }}</button>
					<!-- <p class="text-align-center">{{ $t('领取倒计时') }}23:54:54</p> -->
					<!-- <p class="text-align-center">{{ $t('领取倒计时') }}:{{ tListCountDown(item._countDown) }}</p> -->
					<p class="text-align-center">{{ $t('领取倒计时') }}:{{ item._countDown || '可领取' }}</p>
				</li>
			</ul>
			<el-empty v-else></el-empty>
		</div>
		<!-- <div class="limit-max-width-media position-relative">
			<div class="absolute received">{{ $t('已领取') }} ： 999999</div>
		</div>-->
	</div>
</template>

<script setup>

import {
	PlusElMessage,
	lockLoadHandler,
	targetLoadHandler,
} from "@/utils/PlusElement";
import { storeToRefs } from "pinia";
import {
	UseStoreWeb3js,
	UseStoreContracts,
} from "@/stores/web3js";
import {
	ref,
	watch,
	computed,
	onMounted,
	onBeforeUpdate,
} from "vue";
import { useLanguage } from "@/hooks/useLanguage"
import { AbiAddressLB } from "@/abis/index"
import { conditionalValueInterface } from '@/abis/interface'
import { ArrayKeysToObject } from "@/utils/tools"
import { formatTimeDown } from "@/utils/deta"
import { useSafeInterval } from "@/hooks/useSafeListener"
import moment from "moment"


const { t } = useLanguage()
const tList = ref([]);
const cardRefs = ref([])
const storeWeb3js = UseStoreWeb3js();
const { userAddress, web3 } = storeToRefs(storeWeb3js);
const storeContracts = UseStoreContracts();
const { Contracts } = storeToRefs(storeContracts);
const rTime = ref('0')
const _time = ref(0)
// const formatTime = ref('')
useSafeInterval(() => {
	_time.value += 1
	// formatTime.value =
})

// function formatTimeDown(time) {
// 	const day = Math.floor(time / (60 * 60 * 24)); //计算天数
// 	const hour = Math.floor((time / (60 * 60)) % 24); //计算小时数
// 	const minute = Math.floor((time / 60) % 60); //计算分钟数
// 	const second = Math.floor(time % 60); //计算秒数
// 	return {
// 		day,hour,minute,second
// 	}
// }

// const endT = moment(new Date()).unix() + 10
watch(() => _time.value, () => {
	tList.value.map(item => {
		// atime(item)
		// 这里多了一分钟左右，但是我这里传值是没问题的，问题在于e_time里肯定多了那么点点时间
		item._countDown = setCountDown(item.e_time)
	})
	// setCountDown(endT)
})
function myFormat(num) {
	if (num == '0' || num == 0) {
		return '00'
	} else if (num < 10) {
		return '0' + num
	} else {
		return '' + num
	}
}
function setCountDown(e_time) {
	// console.log("setCountDown",Number(rTime.value) , Number(e_time))
	const eTime = Number(rTime.value) + Number(e_time)
	const Now = moment(new Date()).unix()
	const down = eTime - Now;
	// console.log("eTime", e_time,rTime.value,eTime)
	if (down <= 0) {
		// console.log("not can", down);
		return ''
	} else {
		const format = formatTimeDown(down)
		const _day = myFormat(format.day)
		const _hour = myFormat(format.hour)
		const _minute = myFormat(format.minute)
		const _second = myFormat(format.second)
		// console.log(eTime, Now, down, _day, _hour, _minute, _second, format)
		return `${_day}:${_hour}:${_minute}:${_second}`
	}
}

onBeforeUpdate(() => {
	cardRefs.value = []
})
onMounted(async () => {
	rTime.value = await getRTime()
	console.log("rTime----",rTime.value)
	_time.value = moment(new Date()).unix()
	await init()
})
function textFromWei(str) {
	return web3.value.utils.fromWei(str) || str;
}

function textToWei(str) {
	return web3.value.utils.toWei(str.toString()) || str;
}
function timeTampToDay(timeTamp) {
	return Math.floor(timeTamp / (60 * 60 * 24)).toString();
}

const cardTitle = computed(() => (u, day) => {
	return u && day ? `${u}U-${day}${t('天')}` : "";
})
const defaultCitem = {
	'value': '0',
	'_day': '0',
	'b_time': '0',
	'e_time': '0',
	'_index_no': '',
	'f': false,
}
async function init() {
	console.log('init');
	const _tList = await getTList()
	const _cList = await getConditionalValue()
	// const _received1 = await getReceived(0);
	// const _received2 = await getReceived(1);
	// console.log(_received1,_received2);
	// console.log("_tList", _tList)

	tList.value = _tList.map((item) => {
		const cItem = _cList.map(c => {
			// console.log('cItem', c._index_no, '' + item.id, c._index_no == '' + item.id)
			return c._index_no == '' + item.id ? c : defaultCitem
		}).filter(c => c._index_no != '')[0] || defaultCitem
		// console.log(cItem)
		item = {
			...item,
			...cItem,
		}

		// atime(item)
		return item
	})
	console.log("tList --->>", tList.value)
}

function DepositedValue(value = '0', conditional) {
	// console.log("DepositedValue", value, conditional)
	return textFromWei(value) / conditional || '0'
	// return '0'
}

async function getTList() {
	const load = lockLoadHandler("init loading...");
	const list = []
	try {
		const { LBPOOLContract } = Contracts.value;
		const Conditionals = await LBPOOLContract.methods.get_conditional_value().call();
		const Interests = await LBPOOLContract.methods.get_interest().call();
		if (Conditionals.length == Interests.length) {
			for (let i = 0; i < Conditionals.length; i++) {
				const _calculate = await calculate(i);
				const _received = await getReceived(i);
				// console.log("_calculate", _calculate);
				list.push({
					id: i,
					conditional: Conditionals[i],
					interest: timeTampToDay(Interests[i]), // ( / 10).toString()
					amount: 0,
					_calculate: _calculate,
					_received: _received,
					_countDown: 0
					// _calculate: '0'
				});
			}
		}
		load.close();
		return list
	} catch (e) {
		console.error(e);
		load.close();
		PlusElMessage({
			type: "error",
			message: e.message,
		});
		return list
	}
}

// const _7day = '604800'

async function getRTime() {
	try {
		const { LBPOOLContract } = Contracts.value;
		const _rTime = await LBPOOLContract.methods.get_r_time().call();
		// console.log('_rTime', _rTime)
		return _rTime
	} catch (e) {
		console.error(e);
		return '0'
	}
}
async function getConditionalValue() {
	const load = lockLoadHandler("getConditionalValue loading...");
	try {
		const { LBPOOLContract } = Contracts.value;
		// const _rTime = await LBPOOLContract.methods.get_r_time().call();
		// console.log('_rTime --->', _rTime)
		const res = await LBPOOLContract.methods.get_conditional_value(userAddress.value, AbiAddressLB).call();
		const _Res = res.map(item => ArrayKeysToObject(item, conditionalValueInterface))
		// console.log("getConditionalValue", _Res);
		// _Res.map(item => {
		// 	console.log(_7day + Number(item.e_time));
		// 	console.log(moment(new Date()).unix())
		// })
		load.close();
		return _Res
	} catch (e) {
		console.error(e);
		load.close();
		PlusElMessage({
			type: "error",
			message: e.message,
		});
		return []
	}
}

async function calculate(index) {
	try {
		const { LBPOOLContract } = Contracts.value;
		const res = await LBPOOLContract.methods.calculate(AbiAddressLB, userAddress.value, index).call({
			from: userAddress.value
		});
		// console.log("_calculate", res);
		if (res == '0') {
			return res
		} else {
			const p = await getPAmountOut(res)
			return p
		}
	} catch (e) {
		console.error(e);
		return '0'
	}
}

async function getReceived(index) {
	try {
		const { LBPOOLContract } = Contracts.value;
		const res = await LBPOOLContract.methods.get_received(AbiAddressLB, userAddress.value, index).call({
			from: userAddress.value
		});
		// console.log("getReceived", res);
		return res
	} catch (e) {
		console.error(e);
		return '0'
	}
}

async function join(value, id) {
	if (value == 0 || value == '0') {
		return PlusElMessage({
			type: "error",
			message: "No value entered!",
		});
	}
	const load = lockLoadHandler("join loading...");
	try {
		// console.log(AbiAddressLB, value, id);
		const { LBPOOLContract, LBContract } = Contracts.value;
		const balanceOf = await LBContract.methods.balanceOf(userAddress.value).call();
		const fWeiBalanceOf = textFromWei(balanceOf);
		// console.log("balanceOf", fWeiBalanceOf);
		// console.log("join  value", value)

		if (Number(fWeiBalanceOf) <= 0) {
			PlusElMessage({
				type: "error",
				message: "Your wallet balance is insufficient!",
			});
		} else if (value > Number(fWeiBalanceOf)) {
			PlusElMessage({
				type: "error",
				message: "The amount you entered is greater than the wallet balance!",
			});
		} else {
			const weiValue = textToWei(value)
			// console.log("join  weiValue", weiValue)
			const res = await LBPOOLContract.methods
				.join(AbiAddressLB, id, weiValue)
				.send({
					from: userAddress.value,
				});
			if (res.status) {
				PlusElMessage({
					type: "success",
					message: "join success",
				});
				// tList.value[id].amount = 0
				init()
			}
			// console.log("join-->", res);
		}
		load.close();
	} catch (e) {
		console.error(e);
		load.close();
		PlusElMessage({
			type: "error",
			message: e.message,
		});
	}
}

async function getPAmountOut(_usd_price) {
	try {
		const { LBPOOLContract } = Contracts.value;
		const res = await LBPOOLContract.methods.get_p_AmountOut(_usd_price).call();
		// console.log("getPAmountOut", res)
		// load.close();
		return res
	} catch (e) {
		console.error(e);
		return '0'
	}
}

async function withdraw(index) {
	//提现
	const currentItemRef = cardRefs.value[index]
	const load = targetLoadHandler(currentItemRef, 'wait Receiving...')
	try {
		const { LBPOOLContract } = Contracts.value;
		const res = await LBPOOLContract.methods
			.withdraw(
				AbiAddressLB,//0x85973C97919c999E5D3d8832290152a3ACdf8a6E
				index
			)
			.send({
				from: userAddress.value,
			});
		// console.log("withdraw", res)
		if (res.status) {
			init();
		}
		load.close();
	} catch (e) {
		console.error(e);
		PlusElMessage({
			type: "error",
			message: e.message,
		});
		load.close();
	}
}

function ps() {
	PlusElMessage({
		type: 'warning',
		message: '暂时无法使用。'
	})
}

</script>
<style lang="scss" scoped>
.homepage {
	padding: 50px 0;
	& > .title {
		margin-bottom: 50px;
	}
}

.content-grid {
	display: grid;
	@media screen and (min-width: 1080px) {
		grid-template-columns: repeat(2, 1fr);
	}
	@media screen and (min-width: 1280px) {
		grid-gap: 120px;
	}
	@media screen and (min-width: 769px) and (max-width: 1279px) {
		grid-gap: 40px;
	}
	@media screen and (max-width: 768px) {
		grid-gap: 20px;
	}
}
:deep(.input).el-input-number {
	width: 100%;

	.el-input__inner {
		--el-input-text-color: #ffffff;
		--el-input-focus-border: #333333;
		--el-input-focus-border-color: #e7e7e7;
		--el-input-border-color: #777777;
		--el-input-bg-color: transparent;
		--el-input-placeholder-color: #777777;
		--el-input-border-radius: 0;
		height: 60px;
		text-align: center;
	}
}
.card {
	// height: 640px;
	// margin: 0 60px;
	border-radius: 4px;
	@media screen and (min-width: 769px) {
		padding: 25px 50px;
	}
	@media screen and (max-width: 768px) {
		padding: 10px 20px;
	}
	.title {
		font-size: 32px;
		margin: 0 0 30px;
	}
	.label {
		font-weight: bold;
		margin-bottom: 15px;
	}
	.cell {
		border: 1px solid #777777;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 15px 10px;
		margin-bottom: 30px;
		.icon {
			margin-right: 10px;
		}
		.icon + span {
			font-weight: bold;
		}
		&.only-pc {
			@media screen and (max-width: 768px) {
				align-items: flex-start;
				flex-direction: column;
			}
		}
	}
	.received {
		background-color: #333333;
		padding: 4px 12px;
		border-radius: 4px;
		width: fit-content;
		margin: 20px auto 0;
	}
}
.submit {
	margin: auto;
	width: fit-content;
	display: block;
	// padding: ;
	width: 200px;
	height: 54px;
	margin-top: 35px;
	border-radius: 4px;
}
.receive {
	margin-bottom: 10px;
}

.el-input {
	--el-input-text-color: #ffffff;
	--el-input-focus-border: #333333;
	--el-input-focus-border-color: #e7e7e7;
	--el-input-border-color: #777777;
	--el-input-bg-color: transparent;
	--el-input-placeholder-color: #777777;
	--el-input-border-radius: 0;
}
</style>

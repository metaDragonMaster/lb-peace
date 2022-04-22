<template>
	<div class="homepage">
		<h3 class="title text-align-center">
			NFT
			<span class="theme-color">-PEACE</span>
		</h3>
		<div class="limit-max-width-media">
				<div class="card theme-border">
					<h3 class="title theme-color text-align-center">
						{{
							cardTitle(NFTData.conditionals, NFTData.interest)
						}}
					</h3>
					<p class="label theme-color">已存入</p>
					<div class="cell">
						<p>
							<img class="icon" src="@/assets/icons/icon-NFT.png" alt="errorImage" />
							<span>MD</span>
						</p>
						<span class="theme-color">
							<!-- {{ DepositedValue(NFTData.value, NFTData.conditional) }} -->
							{{ NFTData._token_id_no }}
						</span>
					</div>
					<p class="label theme-color">可领取</p>
					<div class="cell only-pc">
						<p>
							<img class="icon" src="@/assets/icons/icon-PEACE.png" alt="errorImage" />
							<span>PEACE</span>
						</p>
						<span class="theme-color">{{ textFromWei(NFTData._calculate) }}</span>
					</div>
					<p class="label theme-color">已领取</p>
					<div class="cell only-pc">
						<p>
							<img class="icon" src="@/assets/icons/icon-PEACE.png" alt="errorImage" />
							<span>PEACE</span>
						</p>
						<span class="theme-color">
							{{
								textFromWei(NFTData._received)
							}}
						</span>
					</div>
					<p class="label theme-color">钱包余额:{{ NFTTokensLength }}个</p>
					<p class="label theme-color">转入NFT数量:</p>
					<el-input-number
						class="input"
						v-model="amount"
						controls-position="right"
						size="large"
						:min="0"
						:controls="false"
					/>
					<button class="theme-bg-color submit" @click="join">{{ $t("转入") }}</button>
					<!-- @click="join(NFTData.amount, NFTData.id)" -->
					<!-- <button class="theme-bg-color-black submit receive" @click="withdraw">
						{{
							$t("领取")
						}}
					</button> -->
					<!-- 	@click="
							withdraw(index, NFTData._countDown, NFTData.calculate)
					"-->
					<!-- <p class="text-align-center">
						{{ $t("领取倒计时") }}:
						{{ countDownText }}
					</p> -->
				</div>
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import {
	PlusElMessage,
	lockLoadHandler,
	// targetLoadHandler,
} from "@/utils/PlusElement";
import Decimal from "decimal.js";
import { useLanguage } from "@/hooks/useLanguage";
import { storeToRefs } from "pinia";
import { UseStoreContracts, UseStoreWeb3js } from "@/stores/web3js";
import { getUserValueInterface } from "@/abis/interface"
import { ArrayKeysToObject } from "@/utils/tools";
import { AbiAddressNFT } from "@/abis";
import moment from "moment";
import { formatTimeDown } from "@/utils/deta";
// import { useSafeInterval } from "@/hooks/useSafeListener";

const { t } = useLanguage();
const storeContracts = UseStoreContracts();
const { Contracts } = storeToRefs(storeContracts);
const storeWeb3js = UseStoreWeb3js();
const { web3, userAddress } = storeToRefs(storeWeb3js);
function textFromWei(str) {
	return web3.value.utils.fromWei(str) || str;
}
// function textToWei(str) {
// 	return web3.value.utils.toWei(str.toString()) || str;
// }

function timeTampToDay(timeTamp) {
	return Math.floor(timeTamp / (60 * 60 * 24)).toString();
}

// useSafeInterval(() => {
// 	countDown.value = setCountDown();
// });
const countDown = ref('')
// const countDownText = computed(() => {
// 	if (new Decimal(NFTData.value._calculate) > 0) {
// 		return !countDown.value ? "可领取" : countDown.value;
// 	} else {
// 		return "不可领取";
// 	}
// });

function myFormat(num) {
	if (num == "0" || num == 0) {
		return "00";
	} else if (num < 10) {
		return "0" + num;
	} else {
		return "" + num;
	}
}
function setCountDown() {
	// console.log("setCountDown",Number(rTime.value) , Number(e_time))
	const eTime = Number(rTime.value) + Number(NFTData.value.e_time);
	const Now = moment(new Date()).unix();
	const down = eTime - Now;
	// console.log("eTime", e_time,rTime.value,eTime)
	if (down <= 0) {
		// console.log("not can", down);
		return "";
	} else {
		const format = formatTimeDown(down);
		const _day = myFormat(format.day);
		const _hour = myFormat(format.hour);
		const _minute = myFormat(format.minute);
		const _second = myFormat(format.second);
		// console.log(eTime, Now, down, _day, _hour, _minute, _second, format)
		return `${_day}:${_hour}:${_minute}:${_second}`;
	}
}

onMounted(() => {
	getRTime()
	init();
});
// const defaultCitem = {
// 	_day: "0",
// 	b_time: "0",
// 	e_time: "0",
// 	_token_id_no: "",
// 	f: false,
// };
const rTime = ref('0');
const amount = ref(0)
const NFTTokens = ref([])
const NFTTokensLength = computed(() => NFTTokens.value.length)
const NFTData = ref({
	calculate: '0',
	conditionals: '0',
	interest: '0',
	_calculate: '0',
	_received: '0',
	_day: "0",
	b_time: "0",
	e_time: "0",
	_token_id_no: "0",
	f: false,
});
async function init() {
	const load = lockLoadHandler("init loading...");
	try {

		const { LNContract } = Contracts.value;
		const Conditionals = await LNContract.methods
			.get_conditional_value()
			.call();
		console.log('Conditionals',Conditionals);
		const Interests = await LNContract.methods.get_interest_value().call();
		console.log('Interests',Interests);

		const _calculate = await calculate()
		console.log('_calculate',_calculate);

		const _userValue = await getUserValue()
		console.log('_userValue',_userValue);

		const _received = await getReceived()
		console.log('_received',_received);

		const _NFTTokens = await getNFTTokens()
		console.log('_received',_received);

		console.log('_NFTTokens', _NFTTokens)
		NFTTokens.value = _NFTTokens
		NFTData.value = {
			_calculate,
			_received,
			conditionals: textFromWei(Conditionals),
			interest: timeTampToDay(Interests),
			..._userValue,
		}
		load.close();
	} catch (e) {
		load.close();
		PlusElMessage({
			type: "error",
			message: e.message,
		});
	}
}

const cardTitle = computed(() => (u, day) => {
	return u && day ? `${u}U-${day}${t("天")}` : "";
});
// function DepositedValue(value = "0", conditional) {
// 	// console.log("DepositedValue", value, conditional)
// 	return textFromWei(value) / conditional || "0";
// 	// return '0'
// }

async function join() {
	const load = lockLoadHandler("join loading...");
	if (amount.value <= 0) {
		load.close();
		PlusElMessage({
			type: "error",
			message: '请输入正确的数量！',
		});
	} else if (amount.value > NFTTokensLength.value) {
		load.close();
		PlusElMessage({
			type: "error",
			message: '不可超出余额！',
		});
	} else {
		try {
			const { LNContract } = Contracts.value;
			const joinArr = NFTTokens.value.filter((item, index) => index < amount.value)
			console.log('join arr', joinArr);
			const res = await LNContract.methods.join(joinArr).send({
				from: userAddress.value
			})
			console.log('join', res)
			if (res.status) {
				amount.value = 0
				init()
			}
			load.close();
			return res
		} catch (e) {
			load.close();
			PlusElMessage({
				type: "error",
				message: e.message,
			});
			return []
		}
	}

}

async function getNFTTokens() {
	try {
		const { LNContract } = Contracts.value;
		const res = await LNContract.methods.get_NFT_tokens(userAddress.value, AbiAddressNFT).call()
		console.log('getReceived', res)
		return res
	} catch (e) {
		return []
	}
}

async function getReceived() {
	try {
		const { LNContract } = Contracts.value;
		const res = await LNContract.methods.get_received(userAddress.value).call()
		console.log('getReceived', res)
		return res
	} catch (e) {
		return '0'
	}
}

async function calculate() {
	try {
		const { LNContract } = Contracts.value;
		const res = await LNContract.methods.calculate(userAddress.value, false).call({
			from: userAddress.value,
		});
		if(res == '0') return res;
		const _res = await getPAmountOut(res)
		console.log("calculate", res, _res)
		return _res
	} catch (e) {
		return '0'
	}
}

async function getUserValue() {
	try {
		const { LNContract } = Contracts.value;
		const res = await LNContract.methods.get_user_value(userAddress.value).call().then(res => ArrayKeysToObject(res, getUserValueInterface))
		return res
	} catch (e) {
		return {
			_day: "0",
			b_time: "0",
			e_time: "0",
			_token_id_no: "",
			f: false,
		}
	}
}

async function getRTime() {
	try {
		const { LNContract } = Contracts.value;
		const res = await LNContract.methods.get_r_time().call()
		console.log('getRTime', res)
		rTime.value = res
	} catch (e) {
		console.error(e);
	}
}

async function withdraw() {
	if (countDown.value) {
		PlusElMessage({
			type: "error",
			message: '领取时间未到！',
		});
	} else {
		const load = lockLoadHandler("join loading...");

		try {
			const { LNContract } = Contracts.value;
			const res = await LNContract.methods.withdraw().send({
				from: userAddress.value
			})
			console.log('withdraw', res)
			if (res.status) {
				PlusElMessage({
					type: "success",
					message: '领取成功',
				});
				init()
			} else {
				PlusElMessage({
					type: "error",
					message: '领取失败',
				});
			}
			load.close()
		} catch (e) {
			console.error(e);
			PlusElMessage({
				type: "error",
				message: e.message,
			});
			load.close()

		}
	}
}

async function getPAmountOut(value) {
	try {
		const { LNContract } = Contracts.value;
		console.log('get_p_AmountOut value', value)
		const res = await LNContract.methods.get_p_AmountOut(value).call()
		console.log('get_p_AmountOut', res)
		return res
	} catch (e) {
		console.error(e);
		return '0'
	}
}

</script>
<style lang="scss" scoped>
.homepage {
	padding: 50px 0;
	& > .title {
		margin-bottom: 50px;
	}
}

:deep(.input).el-input-number {
	width: 100%;

	// .el-input__inner {
	// 	--el-input-text-color: #ffffff;
	// 	--el-input-focus-border: #333333;
	// 	--el-input-focus-border-color: #e7e7e7;
	// 	--el-input-border-color: #777777;
	// 	--el-input-bg-color: transparent;
	// 	--el-input-placeholder-color: #777777;
	// 	--el-input-border-radius: 0;
	// 	height: 60px;
	// 	text-align: center;
	// }
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

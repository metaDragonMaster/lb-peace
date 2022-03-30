import { defineStore } from "pinia";
// import Decimal from "decimal.js";
// import { useRouter } from "vue-router"
// import { PlusElMessage, lockLoadHandler } from "@/utils/PlusElement";
// import baseAddress from "@/abis/contracts";
import { useWeb3, getContract } from "@/hooks/useWeb3";
import { AbiAddressLB,
  AbiAddressLBPOOL,
  AbiLB,
  AbiLBPOOL, } from "@/abis/index.js";

export const UseStoreWeb3js = defineStore("Web3js", {
  state: () => ({
    _web3: null,
    _address: "",
    _re: "",
  }),
  getters: {
    web3: ({ _web3 }) => _web3,
    haveAuth: ({ _web3 }) => !!_web3, //是否被授权
    haveRe:  ({ _re }) => !!_re, //是否有推荐人
    userAddress: ({ _address }) => _address,
    fromWei: ({ _web3 }) => {
      let fromWei;
      if (_web3.utils) {
        fromWei = _web3.utils.fromWei;
      }
      return fromWei;
    },
  },
  actions: {
    // callback
    async startWeb3() {
      // const Router = useRouter()
      const web3InCode = await useWeb3(async (web3Eth, userAddress) => {
        console.log("用户切换了钱包后的操作");
        this.setUserAddress(userAddress);
        this.setWeb3(web3Eth);
        const { setContracts } = UseStoreContracts();
        const contracts = await startContracts(web3Eth);
        setContracts(contracts);
      });
      return !!web3InCode;
    },
    setWeb3(web3) {
      this._web3 = web3;
    },
    setUserAddress(address) {
      this._address = address;
    },
    setRe(re) {
      this._re = re
    }
  },
});

async function startContracts(web3) {
  const LBContract = await getContract(web3, AbiLB, AbiAddressLB);
  const LBPOOLContract = await getContract(web3, AbiLBPOOL, AbiAddressLBPOOL);
  return {
    LBContract,
    LBPOOLContract,
  };
}

export const UseStoreContracts = defineStore("contracts", {
  state: () => ({
    _Contracts: null,
  }),
  getters: {
    Contracts: ({ _Contracts }) => _Contracts,
  },
  actions: {
    setContracts(Contracts) {
      this._Contracts = Contracts;
    },
  },
});

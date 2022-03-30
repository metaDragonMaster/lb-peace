const addressPro = {//正式
    AbiAddressLBPOOL: '0xE46E410772bc2850E36c496330BC205d8bd38749',
    AbiAddressLB: '0x7948d6bc05da31b4a0e0ac1060d4c3bd26ced322',
    addedValue:"115792089237316195423570985008687907853269984665640564039457584007913129639935",
    type: 'pro'
}
const addressTest = {//测试
    AbiAddressLBPOOL: '0xE46E410772bc2850E36c496330BC205d8bd38749',
    AbiAddressLB: '0x7948d6bc05da31b4a0e0ac1060d4c3bd26ced322',
    addedValue:'115792089237316195423570985008687907853269984665640564039457584007913129639935',
    type: 'test'
}
const baseAddress = process.env.NODE_ENV == 'development' ? addressTest : addressPro;
export default baseAddress;

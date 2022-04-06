const addressPro = {//正式
    AbiAddressLBPOOL: '0x0Dc50C2C6228Fc3289f32869690Ef4224FbfF75c',
    AbiAddressLB: '0x7948d6bc05da31b4a0e0ac1060d4c3bd26ced322',
    addedValue:"115792089237316195423570985008687907853269984665640564039457584007913129639935",
    type: 'pro'
}
const addressTest = {//测试
	//0x85973C97919c999E5D3d8832290152a3ACdf8a6E
    AbiAddressLBPOOL: '0x0Dc50C2C6228Fc3289f32869690Ef4224FbfF75c',
    AbiAddressLB: '0x7948d6bc05da31b4a0e0ac1060d4c3bd26ced322',
    addedValue:'115792089237316195423570985008687907853269984665640564039457584007913129639935',
    type: 'test'
}
const baseAddress = process.env.NODE_ENV == 'development' ? addressTest : addressPro;
export default baseAddress;

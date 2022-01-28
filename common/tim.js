import TIM from '@/static/js/tim-wx.js';
// import COS from "cos-js-sdk-v5";


const options = {
	SDKAppID: 1400365402 // 接入时需要将0替换为您的即时通信应用的 SDKAppID
};
// 创建 SDK 实例，TIM.create() 方法对于同一个 SDKAppID 只会返回同一份实例
const tim = TIM.create(options); // SDK 实例通常用 tim 表示
// tim.setLogLevel(5);


export default tim

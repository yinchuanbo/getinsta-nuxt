const path = 'v2';
export default {
  getWebConfig: `${path}/main/getwebconfig`, // 4-9 其他-获取web配置
  getCheckoutMethodV2: `${path}/payment/getcheckoutmethod`, // 2-3-2 获取当前可用支付方式
  getRegionList: `${path}/config/regionlist`, // 获取国别任务区域
  getProduct: `${path}/main/getproduct`, //  获取国别任务区域对应的产品
};

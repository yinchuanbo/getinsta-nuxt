const path = 'v1/payment';
export default {
  getCoinProduct: `${path}/getcoinproduct`, // 2-13 花钱-现金支付购买金币-获取订单信息(网页端)
  paymentCreate: `${path}/paymentcreate`, // 2-14 花钱-现金支付购买金币-发起支付(网页端)
  stripeRetrieve: `${path}/striperetrieve`, // 2-15 花钱-现金支付购买金币-stripe支付校验(网页端)
  getWhiteList: `${path}/getwhitelist`, // 白名单
  getCheckoutMethod: `${path}/getcheckoutmethod` // 获取当前可用支付方式(V2版接口见 api.v2.js)
};

const path = 'v1/task';
export default {
  publishTask: `${path}/submit`, // 2-1 花金币-发布任务
  pay: `${path}/submitbycash`, // 2-5 花现金-发布任务
  guestPay: `${path}/submitfromguest`, // 2-10 花钱-金钱支付不登录状态发布任务(网页端)
  getUrlCart: `${path}/gettask`, // 2-7 花钱-金钱支付内嵌网页支付任务信息获取(网页端)
  askNetPay: `${path}/submitthroughasknet`, // 2-9 花钱-askNet支付发布任务(网页端)
  shopifyPay: `${path}/submitthroughshopify`, // 2-x 花钱-Shopify支付发布任务(网页端)
  stripeRetrieve: `${path}/striperetrieve`, // 2-2 花现金-stripe任务校验
  checkoutAndroid: `${path}/checkout`, // 2-6 花钱-金钱支付内嵌网页支付(Android)
};

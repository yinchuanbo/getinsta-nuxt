const path = 'frontend';
export default {
  sendContactMSG: `${path}/site/contact`, // 4-1 其他-首页邮件发送
  videoDownload: `${path}/site/videodownload`, // 视频下载
  getMostFollowed: `${path}/site/getmostfollowed`, // MostFollowed 获取
  webCashEnable: `${path}/site/webcashenable`, // 6-5 其他-网页支付状态获取
  getRewards: `${path}/luckdraw/getrewards`, // 4-3 其他-抽奖-奖品获取
  luckDrawInit: `${path}/luckdraw/init`, // 4-4 其他-抽奖-初始化
  luckDrawConfirm: `${path}/luckdraw/confirm`, // 4-5 其他-抽奖-确认中奖
  getRewardUser: `${path}/luckdraw/getrewarduser`, // 4-6 其他-抽奖-获取中奖用户信息
  clearRecord: `${path}/luckdraw/clearrecord`, // 4-7 其他-抽奖-清楚账号中奖记录
  eventChristSubmit: `${path}/contest/submit`, // 6-1 活动-双旦活动-地址提交
  eventChristGetItems: `${path}/contest/getitems` // 6-2 活动-双旦活动-地址获取
};

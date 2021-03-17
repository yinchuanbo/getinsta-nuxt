const path = '/frontend/luckdraw';
export default {
    getrewards: `${path}/getrewards`, // 4-3 其他-抽奖-奖品获取
    init: `${path}/init`, // 4-4 其他-抽奖-初始化
    confirm: `${path}/confirm`, // 4-5 其他-抽奖-确认中奖
    getrewarduser: `${path}/getrewarduser`, // 4-6 其他-抽奖-获取中奖用户信息
    clearrecord: `${path}/clearrecord?user_id=`, // 4-6 其他-抽奖-获取中奖用户信息
    findbyid: `/v2/product/findbyid`, // 4-6 其他-获取指定商品信息
};

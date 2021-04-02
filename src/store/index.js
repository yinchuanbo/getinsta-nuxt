export const state = () => ({
  loginStatus: false, // Mutation: loginChange
  userName: '',
  userCoins: '',
  userAvatar: null,
  blogID: '',
  googleTransLoad: false,
  isMobile: false,
  isiOS: false,
  isAndroid: false,
  isWindows: false,
  cartLength: '',
  productName: '',
  productLogo: '',
  hideIosMinorLang: false, // 多语言隐藏与显示
  showIosDe: false, // 多语言隐藏与显示
  minorLangIosLink: '',
  minorLangAdrLink: '',
  enIosLink: '',
  enIosLinkPt: '',
  enIosLinkCt: '',
  enAdrLink: '',
  enAdrLinkWithoutGpReferrer: '',
  enAdrLinkGpReferrer: '',
  enAdrType: 1, // 1 = GooglePlay; 0 = APK
  adQueryCampaignHome: '',
  accessCountry: '', // 对应后端字段：CountryCode,
  downloadCtaText: '',
  platform: '',
  btnTestGate: false, // Btn 测试是否开启
  gaColor: '', // Btn测试
  downloadBtnTestA: false, // Btn测试
  downloadBtnTestB: false, // Btn测试
  downloadBtnTestC: false, // Btn测试,
  // V2
  v2: true, // V2开关
  v2Ad: false, // V2广告开关
  v2AdHeightPc: 0, // V2广告PC高度
  v2AdHeightMobile: 0, // V2广告Mobile高度

  footerSelect: false,
  showAlert: false
});

export const mutations = {
  loginChange: (state, login) => {
    state.loginStatus = login;
    // Vue.$storage.set('loginStatus', login);
    if (process.client)
      localStorage.setItem('GetInsta_loginStatus', JSON.stringify({ ttl: 0, value: login }));
  },
  userName: (state, name) => {
    state.userName = name;
  },
  userCoins: (state, coins) => {
    state.userCoins = coins;
  },
  userAvatar: (state, avatar) => {
    state.userAvatar = avatar;
  },
  blogID: (state, id) => {
    state.blogID = id;
  },
  googleTransLoad: (state, status) => {
    state.googleTransLoad = status;
  },
  isMobile: (state, status) => {
    state.isMobile = status;
  },
  isiOS: (state, status) => {
    state.isiOS = status;
  },
  isAndroid: (state, status) => {
    state.isAndroid = status;
  },
  isWindows: (state, status) => {
    state.isWindows = status;
  },
  cartLength: (state, status) => {
    state.cartLength = status;
  },
  productName: (state, status) => {
    state.productName = status;
  },
  productLogo: (state, status) => {
    state.productLogo = status;
  },
  hideIosMinorLang: (state, status) => {
    state.hideIosMinorLang = status;
  },
  showIosDe: (state, status) => {
    state.showIosDe = status;
  },
  minorLang: (state, status) => {
    state.showIosDe = status;
  },
  minorLangIosLink: (state, status) => {
    state.minorLangIosLink = status;
  },
  minorLangAdrLink: (state, status) => {
    state.minorLangAdrLink = status;
  },
  adQueryCampaignHome: (state, status) => {
    state.adQueryCampaignHome = status;
  },
  enAdrType: (state, status) => {
    state.enAdrType = status;
    if (process.client)
      localStorage.setItem('GetInsta_enAdrType', JSON.stringify({ ttl: 0, value: status }));
  },
  enAdrLink: (state, status) => {
    state.enAdrLink = status;
  },
  enAdrLinkWithoutGpReferrer: (state, status) => {
    state.enAdrLinkWithoutGpReferrer = status;
  },
  enAdrLinkGpReferrer: (state, status) => {
    state.enAdrLinkGpReferrer = status;
  },
  enIosLink: (state, status) => {
    state.enIosLink = status;
  },
  enIosLinkPt: (state, status) => {
    state.enIosLinkPt = status;
  },
  enIosLinkCt: (state, status) => {
    state.enIosLinkCt = status;
  },
  accessCountry: (state, status) => {
    state.accessCountry = status;
  },
  downloadCtaText: (state, status) => {
    state.downloadCtaText = status;
  },
  platform: (state, status) => {
    state.platform = status;
  },
  gaColor: (state, status) => {
    state.gaColor = status;
  },
  downloadBtnTestA: (state, status) => {
    state.downloadBtnTestA = status;
  },
  downloadBtnTestB: (state, status) => {
    state.downloadBtnTestB = status;
  },
  downloadBtnTestC: (state, status) => {
    state.downloadBtnTestC = status;
  },
  btnTestGate: (state, status) => {
    state.btnTestGate = status;
  },
  v2: (state, status) => {
    state.v2 = status;
  },
  v2Ad: (state, status) => {
    state.v2Ad = status;
  },
  v2AdHeightPc: (state, status) => {
    state.v2AdHeightPc = status;
  },
  v2AdHeightMobile: (state, status) => {
    state.v2AdHeightMobile = status;
  },
  showAlert: (state, value) => {
    state.showAlert = value;
  },
  footerSelect: (state, status) => {
    state.footerSelect = status;
  }
};

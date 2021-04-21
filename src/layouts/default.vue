<template>
  <div id="app" :class="{ 'v2-font': $store.state.v2 }">
    <!--header-->
    <header-container v-if="!headerHide && !$store.state.v2" />
    <header-container-v2 v-if="$store.state.v2" />

    <!--general-blank-->
    <general-blank v-if="$store.state.isMobile && isGeneralBlank" :ad-height="$store.state.v2AdHeightMobile" />
    <general-blank v-if="!$store.state.isMobile" :ad-height="$store.state.v2AdHeightPc" />

    <!--router-view-->
    <transition name="fade" mode="out-in">
      <Nuxt />
    </transition>

    <!--footer-->
    <footer-container v-if="!footerHide && !$store.state.v2" />
    <footer-container-v2 v-if="!footerHide && $store.state.v2" />

    <!--bottom download cta-->
    <download-cta v-if="!bottomCTAHide && $store.state.isMobile && ifShowCta && !$store.state.v2" />
    <download-cta-v2 v-if="$store.state.v2 && $store.state.isMobile && isEasterSale" />
    <!--top download cta-->
    <!--    <cta-download v-if="ctaDownloadShow && ifShowCta && $store.state.accessCountry !== 'BR'" />-->
    <!--    <cta-download v-if="false" />-->
    <!--    <download-cta-black-friday v-if="ctaDownloadBlackFridayShow && $store.state.isMobile" />-->
    <!--    <download-cta-christmas v-if="ctaDownloadBlackFridayShow && $store.state.isMobile" />-->
    <!--    <download-cta-valentine v-if="downloadCtaSeasonShow" />-->
    <download-cta-spring v-if="downloadCtaSeasonShow && !$store.state.v2" />

    <!--giveaway gate-->
    <floating-layer-right v-if="isRightWindows && $store.state.isMobile" :type="windowType" />
    <floating-layer-bottom v-if="false" :type="windowType" />
    <floating-layer-alert v-if="isAlertWindow && false" :type="windowType" />

    <!--addThis-->
    <add-this v-if="addThisLoad" public-id="ra-5def5b1abb78a6a2" />

    <!--back-to-top-->
    <back-to-top />
  </div>
</template>

<script>
// Images
import logoGetInsta from '@/assets/images/global/logo.svg';
import logoGetinshot from '@/assets/images/global/logo_getinshot.svg';
import logoFollowersGallery from '@/assets/images/global/logo_follower-gallery.svg';

// API
import apiAdr from '@/api/api.app.android.js';
import apiV2 from '@/api/api.v2.js';

// Components
import HeaderContainer from '@/components/header/header-container';
import HeaderContainerV2 from '@/components/header/header-container-v2';

import GeneralBlank from '@/components/general-blank';

import FooterContainerV2 from '@/components/footer/footer-container-v2';
import FooterContainer from '@/components/footer/footer-container';

import DownloadCta from '@/components/download-cta/download-cta';
import DownloadCtaV2 from '@/components/download-cta/download-cta-v2/download-cta-v2';
import DownloadCtaSpring from '@/components/download-cta/download-cta-spring/download-cta-spring';

import floatingLayerRight from '@/components/floating-layer/floating-layer-right/floating-layer-right';
import floatingLayerBottom from '@/components/floating-layer/floating-layer-bottom/floating-layer-bottom';
// import CtaDownload from '@/components/download-cta/download-cta-top';
// import DownloadCtaBlackFriday from '@/components/download-cta/download-cta-black-friday/download-cta-black-friday';
// import DownloadCtaChristmas from '@/components/download-cta/download-cta-christmas/download-cta-christmas';
// import DownloadCtaValentine from '@/components/download-cta/download-cta-valentine/download-cta-valentine';

import AddThis from 'vue-simple-addthis-share';

import BackToTop from '@/components/go-top/gp-top';

export default {
  components: {
    HeaderContainer,
    HeaderContainerV2,

    GeneralBlank,

    FooterContainer,
    FooterContainerV2,

    DownloadCta,
    DownloadCtaV2,
    DownloadCtaSpring,
    // CtaDownload,
    // DownloadCtaValentine,
    // DownloadCtaChristmas,
    // DownloadCtaBlackFriday,
    floatingLayerRight,
    floatingLayerBottom,

    AddThis,

    BackToTop
  },
  data() {
    return {
      ifShowCta: false,
      addThisHide: true,
      bottomCTAHide: false,
      headerHide: false,
      footerHide: false,
      addThisLoad: false,
      isBottomWindows: false,
      isRightWindows: false,
      isAlertWindow: false,
      favIconURL: '',
      envTest: this.COMMON.envTest() || false,
      envIsEasy: true,
      windowType: 'giveaway',
      ctaDownloadShow: false,
      ctaDownloadBlackFridayShow: false,
      downloadCtaSeasonShow: false,
      showMinorLang: false,
      isEasterSale: true,
      isGeneralBlank: true,
    };
  },
  watch: {
    $route(to, from) {
      this.watchedMethods(to, from);
    },
    '$i18n.locale'(val) {
      document.documentElement.setAttribute('lang', val);

      // if (val === 'en') {
      //   this.$store.commit('productName', 'GetInsta');
      // } else {
      //   this.$store.commit('productName', 'Getinshot');
      // }

      this.productNameLogoInit();
    }
  },
  created() {
    this.multiLangEnvInit(this.$nuxt.$route);
  },
  mounted() {
    console.log(
      '%cGetInsta%cWeb APP',
      'padding: 4px 18px;' +
      'background: linear-gradient(45deg, #FFCF61, #AD34D8, #111EC5);' +
      'border-radius: 10px;' +
      'font-size: 28px; font-weight: 800; color: #fff;' +
      '',
      'margin-left: 16px;' +
      'font-size: 14px; font-weight: 600;'
    );

    // 【重要】机制初始化【重要】
    this.watchedMethods(this.$nuxt.$route);

    // iOS触摸事件
    this.COMMON.iosTouchHack();

    // 平台识别
    this.platformDetective();

    // Google翻译
    if (process.client && !this.COMMON.envTest())
      this.loadGoogleTranslate();

    // addThis Load handle
    setTimeout(() => {
      if (process.client && !this.COMMON.envTest())
        this.addThisLoad = true;
    }, 5000);

    // 全局Tip弹窗允许
    this.tipDisplayAllowed();

    // 产品名称计算及马甲更换
    this.productNameLogoChange();

    // Test Only
    // if (this.$storage.has('minorLangLocaleTest') && this.COMMON.envTest()) {
    //   const userAgentLocale = this.COMMON.userAgentLocale();
    //   this.$i18n.locale = userAgentLocale === 'fr' || userAgentLocale === 'de' ? userAgentLocale : 'en';
    // }

    // 首页广告参数
    this.adQueryInit();

    // 全局配置
    this.securityLevel10Config();

    // 窗口尺寸更改触发点
    window.onresize = () => {
      this.userAgentInit();
      this.productNameLogoChange();
      // V2
      if (location.hostname === 'localhost')
        this.v2SwitchGate(this.$nuxt.$route.path);
    };

    // 下载按钮分流（测试）
    this.homeDownloadBtnTest();

    this.setDefaultLocalStorageVueX();
  },
  methods: {
    watchedMethods(to = { path: '/', name: 'home' }, from = { path: '/', name: 'home' }) {
      // V2开关
      this.v2SwitchGate(to.path);

      this.recorderBlogLoginRegister(to, from);

      this.userAgentInit();
      this.envEasyDecide();

      this.addThisHide
        = to.path === '/user'
        || to.path === '/user-get-followers'
        || to.path === '/user-get-likes'
        || to.path === '/welcome'
        || to.path === '/checkout'
        || to.path === '/checkout-2'
        || to.path === '/order-detail'
        || to.path === '/order-detail-2'
        || to.path === '/order-fail'
        || to.path === '/order-fail-2'
        || to.path === '/buy-instagram-followers'
        || to.path === '/buy-instagram-likes'
        || to.path === '/terms'
        || to.path === '/privacy'
        || to.path === '/refund'
        || (!this.envIsEasy && to.path === '/user-reset')
        || (!this.envIsEasy && to.path === '/s')
        || (to.path === '/event-followers')
        || (to.path === '/event-likes')
        || (to.path === '/event-ios');
      if (this.$store.state.isMobile) this.addThisHide = true;
      this.addThisHideEvent(this.addThisHide);

      this.bottomCTAHide
        = to.path === '/welcome'
        || to.path === '/user'
        || to.path === '/user-get-followers'
        || to.path === '/user-get-likes'
        || to.path === '/user-asknet'
        || to.path === '/user-get-followers-asknet'
        || to.path === '/user-get-likes-asknet'
        || to.path === '/checkout'
        || to.path === '/checkout-2'
        || to.path === '/order-detail'
        || to.path === '/order-detail-2'
        || to.path === '/order-detail-third'
        || to.path === '/order-fail'
        || to.path === '/order-fail-2'
        || to.path === '/buy-instagram-followers'
        || to.path === '/buy-instagram-daily-followers'
        || to.path === '/buy-instagram-likes'
        || to.path === '/buy-instagram-daily-likes'
        || to.path === '/event-lucky-draw-1'
        // || to.path === '/lucky-draw-test'
        || to.path === '/event-special-ios-1'
        || to.path === '/event-special-ios-2'
        || to.path === '/event-followers'
        || to.path === '/event-likes'
        || to.path === '/event-get'
        || to.path === '/affiliate-solutions'
        || to.name === 'registerAff';


      this.headerHide
        = to.path === '/event-special-ios-1'
        || to.path === '/event-special-ios-2'
        || (!this.envIsEasy && to.path === '/user-reset')
        || (!this.envIsEasy && to.path === '/s')
        || (!this.envIsEasy && to.path === '/register')
        || to.path === '/event-followers'
        || to.path === '/event-likes'
        || to.path === '/event-ios'
        || to.name === 'registerAff'
        || to.path === '/event-get';

      this.footerHide
        = to.path === '/lucky-draw'
        || to.path === '/event-lucky-draw-1'
        || to.path === '/event-special-ios-1'
        || to.path === '/event-special-ios-2'
        || window.location.hostname === this.$constant.url.iot
        || (!this.envIsEasy && to.path === '/user-reset')
        || (!this.envIsEasy && to.path === '/s')
        || (!this.envIsEasy && to.path === '/register')
        || to.name === 'registerAff';

      this.ctaDownloadShow
        = !(to.path === '/'
        || to.path === '/buy-instagram-followers'
        || to.path === '/buy-instagram-likes'
        || to.path === '/checkout'
        || to.path === '/checkout-2'
        || to.path === '/order-detail'
        || to.path === '/order-detail-2'
        || to.path === '/event-lucky-draw-1'
        || to.path === '/order-detail-third'
        || to.path === '/order-fail'
        || to.path === '/order-fail-2'
        || to.name === 'registerAff'
        || to.path === '/login'
        || to.name === '/register'
        || to.name === '/event-lucky-draw-1'
      );

      this.ctaDownloadBlackFridayShow
        = to.path === '/';

      // Multi-lang 跳转
      this.multiLangEnvInit(to);
      // // Multi-lang 下载链接初始化
      this.multiLangAppDwnInit(to);


      // iOS 下载地址
      // this.enIosDownloadLinkInit();

      this.downloadCtaTextChange(to);

      // path 定义
      let homePath = to.path === '/';
      let blogPath = to.path === '/blog' || to.name === 'blog-id___en' || to.path === '/blog/';
      let easterSalePath = to.path === '/eastersale';
      let checkout = to.path === '/checkout' || to.path === '/checkout-2';
      let storePath = to.path === '/buy-instagram-followers' || to.path === '/buy-auto-instagram-followers' || to.path === '/buy-instagram-daily-likes' || to.path === '/buy-instagram-likes' || to.path === '/buy-instagram-daily-followers' || to.path === '/buy-auto-instagram-followers-1' || to.path === '/buy-instagram-auto-likes';
      let Path169 = to.path === '/blog/download-private-instagram-videos-169';
      let getFlPath = to.path === '/get-instagram-followers-likes';
      let freeToolsPath = to.path === '/instagram-name-generator' || to.path === '/the-most-followed-instagram' || to.path === '/instagram-video-downloader';
      let loginUserPath = to.path === '/login' || to.path === '/user' || to.path === '/user-get-followers' || to.path === '/user-get-likes';
      let usePath = to.path === '/user' || to.path === '/user-get-followers' || to.path === '/user-get-likes';

      this.showPcAd = !(storePath || checkout || usePath);

      // DownloadCTA 显示规则
      // giveaway
      if (Path169 && this.COMMON.getURLQuery('source') === 'google') {
        this.isRightWindows = false;
      } else {
        this.isRightWindows = blogPath;
      }
      this.isBottomWindows = homePath && !this.COMMON.isMobile();
      this.isAlertWindow = !(blogPath || easterSalePath || checkout || storePath);

      // auto buy
      const storeAutoUrlStr = 'buy-auto-instagram-followers';
      this.ifShowCta = location.href.indexOf(storeAutoUrlStr) === -1;
      // 情人节
      // 需要显示的 url
      const downloadCtaSeasonShowPathArrayPC = ['/blog'];
      const downloadCtaSeasonShowPathArray = [
        '/',
        '/get-instagram-followers-likes',
        '/instagram-video-downloader',
        '/the-most-followed-instagram',
        '/instagram-name-generator',
        '/lucky-draw',
        '/user',
        '/blog'
      ];

      if (!this.COMMON.isMobile()) {
        this.downloadCtaSeasonShow = downloadCtaSeasonShowPathArrayPC.indexOf(to.path) > -1 || to.name === 'blog-id___en';
        let bool = storePath || checkout || usePath ? 0 : 74;
        this.$store.commit('v2AdHeightPc', bool)
      } else {
        this.downloadCtaSeasonShow = downloadCtaSeasonShowPathArray.indexOf(to.path) > -1 || to.name === 'blog-id___en';
        let bool = homePath || getFlPath ? 44 : 0;
        this.$store.commit('v2AdHeightMobile', bool)
      }

      if (easterSalePath) {
        this.$store.commit('footerSelect', true);
        this.isEasterSale = false;
      } else {
        this.$store.commit('footerSelect', false);
        this.isEasterSale = !(checkout || storePath || usePath);
      }

      this.isGeneralBlank = !(storePath || freeToolsPath || loginUserPath || easterSalePath || checkout);
    },

    addThisHideEvent(addThisHide) {
      if (addThisHide) {
        document.getElementsByTagName('body')[0].classList.add('addthis-hide');
      } else {
        document.getElementsByTagName('body')[0].classList.remove('addthis-hide');
      }
    },
    userAgentInit() {
      this.$store.commit('isMobile', this.COMMON.isMobile());
      this.$store.commit('isiOS', this.COMMON.isiOS());
      this.$store.commit('isAndroid', this.COMMON.isAndroid());
      this.$store.commit('isWindows', this.COMMON.isWindows());
    },
    tipDisplayAllowed() {
      setTimeout(() => {
        window.getInstaTipAllowed = true;
      }, 2000);
    },

    // envEasyDecide
    envEasyDecide() {
      let isEasy;
      // isEasy = this.COMMON.getDomain() === this.$constant.url.easyDomain;
      isEasy = true;

      this.envIsEasy = isEasy || this.COMMON.envTest();
    },

    //【重要】【危险】Multi-lang 跳转
    multiLangEnvInit(to) {
      // 语种判定
      // const paramSource = this.COMMON.getURLQuery('source');
      // const paramCamp = this.COMMON.getURLQuery('camp');

      // if (!(paramSource !== null && paramCamp !== null)) {
      const userAgentLocale = this.COMMON.userAgentLocale();
      const subDomain = this.COMMON.getSubDomain();
      const domain = this.COMMON.getDomain();

      // Test Only 标识
      // if (this.$storage.has('minorLangLocaleTest') && this.COMMON.envTest()) return;
      // this.$storage.set('minorLangLocaleTest', this.$i18n.locale);

      // *************** i18n Locale 初始化 ******************
      // if (subDomain !== 'en' && subDomain !== 'www' && !this.COMMON.envTest())
      //   this.$i18n.locale = subDomain;
      // else
      //   this.$i18n.locale = userAgentLocale;

      if (this.COMMON.isSupportedMinorLocale(subDomain) && !this.COMMON.envTest()) {
        this.$i18n.locale = subDomain;
      } else {
        this.$i18n.locale = userAgentLocale;
      }

      let isBlogList = true;

      if(to.path === '/blog' || to.path === '/blog/') {
        isBlogList = true;
      } else if(to.path !== '/blog' && to.path !== '/blog/' && to.name === 'blog-id___en') {
         isBlogList = false;
      }

      // console.log(to.name)
      if (this.$i18n.locale !== 'en') {
        if (
          // 语种跳转主判断
          subDomain !== userAgentLocale
          && to.name !== 'download'
          // && to.name !== 'blog-id___en'
          && isBlogList
          && to.path !== '/checkout'
          && to.path !== '/checkout-2'
          && to.path !== '/order-detail'
          && to.path !== '/order-fail'
          && to.path !== '/event-user-generated-contest'
          && to.path !== '/lucky-draw'
          && to.path !== '/event-lucky-draw-1'
        ) {

          console.log('list')

          // 此处 this.$route 因为异步加载路由原因无法第一时间更新(已解决)
          if (!this.COMMON.envTest()) {
            // Multi-lang Jump
            let pathName = location.pathname;

            if (
              to.path === '/error404'
              || to.path === '/user-reset'
              || to.path === '/forgot'
              || to.path === '/login'
              || to.path === '/register'
              || to.path === '/blog'
              || to.path === '/faqs'
              || to.path === '/get-instagram-followers-likes'
              || to.path === '/buy-instagram-followers'
              || to.path === '/buy-instagram-likes'
              || to.path === '/terms'
              || to.path === '/privacy'
              || to.path === '/refund'
              || to.path === '/instagram-video-downloader'
              || to.path === '/the-most-followed-instagram'
              || to.path === '/affiliate-solutions'
              || to.path === '/followers-giveaway'
            ) {
              // Multi-lang CurrentPage Jump
              if (this.$i18n.locale === 'fr') {
                // if (to.path === '/get-instagram-followers-likes') pathName = null;
                if (to.path === '/register') pathName = null;
                if (to.path === '/followers-giveaway') pathName = null;
                if (to.path === '/user') pathName = null;
                if (to.path === '/login') pathName = null;
                if (to.path === '/forgot') pathName = null;
                if (to.path === '/instagram-video-downloader') pathName = null;
                if (to.path === '/the-most-followed-instagram') pathName = null;
                if (to.path === '/affiliate-solutions') pathName = null;
                if (to.path === '/followers-giveaway') pathName = null;
              }
              if (this.$i18n.locale === 'de') {
                if (to.path === '/forgot') pathName = null;
                if (to.path === '/login') pathName = null;
                if (to.path === '/register') pathName = null;
                // if (to.path === '/get-instagram-followers-likes') pathName = null;
                if (to.path === '/instagram-video-downloader') pathName = null;
                if (to.path === '/the-most-followed-instagram') pathName = null;
                if (to.path === '/affiliate-solutions') pathName = null;
                if (to.path === '/followers-giveaway') pathName = null;
              }
              if (this.$i18n.locale === 'es') {
                if (to.path === '/get-instagram-followers-likes') pathName = '/conseguir-seguidores-likes-instagram';
                if (to.path === '/buy-instagram-followers') pathName = '/comprar-seguidores-instagram';
                if (to.path === '/buy-instagram-likes') pathName = '/comprar-likes-instagram';
                if (to.path === '/instagram-video-downloader') pathName = null;
                if (to.path === '/the-most-followed-instagram') pathName = null;
                if (to.path === '/affiliate-solutions') pathName = null;
                if (to.path === '/followers-giveaway') pathName = null;
              }
              if (this.$i18n.locale === 'ar') {
                if (to.path === '/register') pathName = null;
                if (to.path === '/user') pathName = null;
                if (to.path === '/login') pathName = null;
                if (to.path === '/instagram-video-downloader') pathName = null;
                if (to.path === '/the-most-followed-instagram') pathName = null;
                if (to.path === '/affiliate-solutions') pathName = null;
                if (to.path === '/followers-giveaway') pathName = null;
              }
              if (this.$i18n.locale === 'it') {
                if (to.path === '/get-instagram-followers-likes') pathName = '/aumentare-instagram-follower-like';
                if (to.path === '/buy-instagram-followers') pathName = '/comprare-instagram-follower';
                if (to.path === '/buy-instagram-likes') pathName = '/comprare-instagram-like';
                if (to.path === '/register') pathName = null;
                if (to.path === '/followers-giveaway') pathName = null;
                if (to.path === '/user') pathName = null;
                if (to.path === '/login') pathName = null;
                if (to.path === '/forgot') pathName = null;
                if (to.path === '/instagram-video-downloader') pathName = null;
                if (to.path === '/the-most-followed-instagram') pathName = null;
                if (to.path === '/affiliate-solutions') pathName = null;
              }
              if (this.$i18n.locale === 'pt') {
                if (to.path === '/get-instagram-followers-likes') pathName = '/ganhar-seguidores-curtidas-instagram';
                if (to.path === '/buy-instagram-followers') pathName = '/comprar-seguidores-instagram';
                if (to.path === '/buy-instagram-likes') pathName = '/comprar-curtidas-instagram';
                if (to.path === '/followers-giveaway') pathName = null;
                if (to.path === '/instagram-video-downloader') pathName = null;
                if (to.path === '/the-most-followed-instagram') pathName = null;
                if (to.path === '/affiliate-solutions') pathName = null;
              }
            }

            if (pathName !== null)
              location.replace(`https://${userAgentLocale}.${domain}${pathName}${location.search}`);
            else
              // Multi-lang HomePage Jump
              location.replace(`https://${userAgentLocale}.${domain}`);
          }
        }
      }

      // console.log('APP.js_$i18n_locale:', this.$i18n.locale);
      // this.minorLangDeHide();
      // }


      // DE 地区化统计
      // if (subDomain === 'de') {
      //   this.COMMON.hotjarInit();
      // }
    },
    // Multi-lang Hide (弃用)
    minorLangDeHide() {
      // this.$store.commit('hideIosMinorLang', this.$i18n.locale !== 'en');
      this.$store.commit('showIosDe', this.$i18n.locale === 'de' && this.COMMON.isiOS());
    },
    // Multi-lang app Link (本页弃用)（Download页面在使用）
    multiLangAppDwnInit(to) {
      if (this.COMMON.userAgentLocale() === 'en') return;

      let ct = '';
      if (this.$i18n.locale === 'fr') ct = 'francais';
      if (this.$i18n.locale === 'de') ct = 'deutsch';
      if (this.$i18n.locale === 'es') ct = 'espanol';

      //广告参数
      if (this.$i18n.locale === 'de') {
        if (to.query.s && to.query.c && to.query.k) ct = to.query.c;
        if (to.query.source && to.query['camp'] && to.query.k) ct = to.query['camp'];
      } else {
        if (to.query.s && to.query.c) ct = to.query.c;
      }

      // 下载地址默认切换
      this.$store.commit(
        'minorLangIosLink',
        this.$constant.app.download.iosFollowersGallery
        + this.$constant.app.campaign.iosFollowersGalleryPtQuery
        + `&ct=${ct}&mt=8`
      );
      // this.$store.commit(
      //   'minorLangAdrLink',
      //   `https://www.aicool.us/download/getins-installer-${this.$i18n.locale}.apk`
      // );
      this.$store.commit(
        'minorLangAdrLink',
        this.$constant.app.download.androidGooglePlay
        + this.$constant.app.campaign.androidReferrerQuery
        + ct
      );
    },

    // 产品名图标切换
    productNameLogoChange() {
      this.productNameLogoInit();
      this.favIconChange();
    },
    productNameLogoInit() {
      if (process.server) return;

      let
        name = 'GetInsta',
        logo = logoGetInsta;
      //小语种判断
      if (this.$i18n.locale === 'de' && !this.COMMON.isAndroid()) {
        name = 'Followers Gallery';
        logo = logoFollowersGallery;
      } else {
        name = 'GetInsta';
      }


      if (window.location.hostname === this.$constant.url.iot) {
        name = 'GetInsta';
        logo = logoGetInsta;
      } else if (window.location.hostname === this.$constant.url.easy) {
        name = 'GetInsta';
        logo = logoGetInsta;
      } else if (window.location.hostname === this.$constant.url.spike) {
        name = 'Getinshot';
        logo = logoGetinshot;
      } else if (window.location.hostname === this.$constant.url.FollowersGallery) {
        name = 'Followers Gallery';
        logo = logoFollowersGallery;
      }

      this.$store.commit('productName', name);
      this.$store.commit('productLogo', logo);
    },
    favIconChange() {
      // favIcon handle
      if (window.location.hostname === this.$constant.url.iot) {
        this.favIconURL = 'https://www.iotransfer.net/payop/images/favicon.ico';
      } else if (window.location.hostname === this.$constant.url.spike) {
        this.favIconURL = 'https://cdn.easygetinsta.com/assets/images/favicon/favicon-getinshot.ico';
      } else if (window.location.hostname === this.$constant.url.FollowersGallery) {
        this.favIconURL = 'https://cdn.easygetinsta.com/assets/images/favicon/favicon-followers-gallery.ico';
      }

      //小语种判断
      if (this.$i18n.locale === 'de' && !this.COMMON.isAndroid()) {
        this.favIconURL = 'Followers Gallery';
        this.favIconURL = 'https://cdn.easygetinsta.com/assets/images/favicon/favicon-followers-gallery.ico';
      }

      if (this.favIconURL === '') return;

      let link = document.querySelector('link[rel*=\'icon\']') || document.createElement('link');
      link.type = 'image/x-icon';
      link.rel = 'shortcut icon';
      link.href = this.favIconURL;

      document.getElementsByTagName('head')[0].appendChild(link);
    },

    // 获取访问来源国家
    accessCountryInit() {
      if (this.$storage.has('accessCountry')) {
        const accessCountry = this.$storage.get('accessCountry');
        this.$store.commit('accessCountry', accessCountry);
        // this.BrazilJump(accessCountry);
        return;
      }

      this.$axios.get(
        apiAdr.getCountry
      ).then((res) => {
        let countryCode = '';
        if (res.data.status === 'ok')
          countryCode = res.data['country_code'];

        this.$store.commit('accessCountry', countryCode);
        this.$storage.set('accessCountry', countryCode);

        // this.BrazilJump(countryCode);
        // this.enAndroidDownloadLinkInit(countryCode);
      }).catch(() => {
        // this.enAndroidDownloadLinkInit('');
        console.error('accessCountryInit Failed.');
      });
    },

    // 首页广告参数
    adQueryInit() {
      let c = this.$constant.app.campaign.iosEnGetInstaCt;

      // param声明
      let param = '';
      if (this.COMMON.getURLQuery('camp') !== null) {
        param = this.COMMON.getURLQuery('camp');
      }

      // campaign声明
      let campaign = '';
      if (
        (this.COMMON.getURLQuery('source') === 'tiktok'
          || this.COMMON.getURLQuery('source') === 'sharechat'
          || this.COMMON.getURLQuery('source') === 'taktak'
          || this.COMMON.getURLQuery('source') === 'youtube')
        && this.COMMON.getURLQuery('campaign')
      ) {
        campaign = this.COMMON.getURLQuery('campaign');
      }

      // 决定c的值来源于param还是campaign
      if (this.COMMON.getURLQuery('source') === 'google') c = param;
      if (
        this.COMMON.getURLQuery('source') === 'tiktok'
        || this.COMMON.getURLQuery('source') === 'sharechat'
        || this.COMMON.getURLQuery('source') === 'taktak'
        || this.COMMON.getURLQuery('source') === 'youtube'
      ) c = campaign;

      this.$store.commit('adQueryCampaignHome', c);


      if (this.COMMON.getURLQuery('s') === 'tiktok'
        && this.COMMON.getURLQuery('c')
        && this.$store.state.isiOS()) {

        c = this.COMMON.getURLQuery('c');
        this.$store.commit('enIosLinkCt', c);
        this.$store.commit('adQueryCampaignHome', c);
      }


      // Btn测试开启判断
      this.$store.commit(
        'btnTestGate',
        c === this.$constant.app.campaign.iosEnGetInstaCt && this.COMMON.isMobile()
      );
    },

    //【重要】【危险】EN APP Link
    enIosDownloadLinkInit(config) {
      // config = download_button.ios
      // let probabilityBoolean;

      // 分流开启
      // if (routerTo.path === '/') probabilityBoolean = this.COMMON.randomProbability(0.2);
      // else probabilityBoolean = false;
      // 分流关闭
      // probabilityBoolean = false;
      // console.log('iOS app Diversion:', probabilityBoolean);

      // if (probabilityBoolean) {
      //   this.$store.commit('enIosLink', this.$constant.app.download.ios1);
      //   this.$store.commit('enIosLinkPt', this.$constant.app.campaign.iosEnGetInsHotPt);
      //   this.$store.commit('enIosLinkCt', this.$constant.app.campaign.iosEnGetInsHotCt);
      // } else {

      // v2/v1 广告切换
      let param;
      if (this.$store.state.v2)
        param = 'en-seo-hpnew';
      else
        param = config['ap_ct'];

      // 广告参数设置
      let source = this.COMMON.getURLQuery('source');
      let campaign = this.COMMON.getURLQuery('campaign');
      let camp = this.COMMON.getURLQuery('camp');
      let s = this.COMMON.getURLQuery('s');
      let c = this.COMMON.getURLQuery('c');

      if (source && campaign) param = campaign;
      if (source && camp) param = camp;
      if (s && c) param = c;

      this.$store.commit(
        'enIosLink',
        this.$constant.app.download.iosUrlPrefix
        + config['ap_id']
      );
      this.$store.commit('enIosLinkPt', config['ap_pt']);
      this.$store.commit('enIosLinkCt', param);

      // Blog search 链接获取
      let iosDownloadLink = `${this.$store.state.enIosLink}`
        + `?pt=${this.$store.state.enIosLinkPt}`
        + `&ct=${this.$store.state.enIosLinkCt}`
        + `&mt=8`;
      this.$storage.set('iosDownloadLink', iosDownloadLink);

      // TODO MT功能
      // this.$store.commit('enIosLink', this.$constant.app.download.iosFollowersGallery);
      // this.$store.commit('enIosLinkPt', this.$constant.app.campaign.iosFollowersGalleryPt);
      // this.$store.commit('enIosLinkCt', this.$constant.app.campaign.iosEnGetInsHotCt);
      // }
    },
    enAndroidDownloadLinkInit(config) {

      // config = download_button.ios

      // 前置分流
      // if (
      //   // countryCode === 'US'
      //   // || countryCode === 'GB'
      //   // || countryCode === 'IN'
      //   // || countryCode === 'FR'
      //   // || countryCode === 'ES'
      //   // || countryCode === 'BR'
      //   // || countryCode === 'EG'
      //   // || countryCode === 'PH'
      //   // || countryCode === 'ID'
      //   countryCode === 'BR'
      //   && !this.COMMON.isiOS()
      //   // && this.COMMON.getURLQuery('source') !== 'tiktok'
      //   // && this.COMMON.randomAbTest()
      // ) {
      //   // GP版 50%分流版
      //   // this.$store.commit(
      //   //   'enAdrLink',
      //   //   this.$constant.app.download.androidGooglePlay
      //   //   + this.$constant.app.campaign.androidReferrerQuery
      //   //   + 'EN-SEO'
      //   // );
      // this.$store.commit('enAdrLink', this.$constant.app.download.android);
      // this.$store.commit('enAdrType', 0);
      // } else {
      // this.enAndroidDownloadLinkSet();
      // }

      // 下载类型 *********************************************************
      let enAdrTypeCode = 1; // 1 = GooglePlay; 0 = APK
      if (config['type'] === 2) enAdrTypeCode = 1;
      if (config['type'] === 1) enAdrTypeCode = 0;
      this.$store.commit('enAdrType', enAdrTypeCode);

      // 无GpReferrer参数 下载链接
      if (enAdrTypeCode === 1) { // GP
        this.$store.commit(
          'enAdrLinkWithoutGpReferrer',
          this.$constant.app.download.androidGooglePlayPrefix
          + `?id=` + config['gp_id']
        );
      }
      if (enAdrTypeCode === 0) { // APK
        this.$store.commit(
          'enAdrLinkWithoutGpReferrer',
          this.$constant.app.download.android);
      }


      // 广告参数设置 *******************************************************
      // v2/v1 广告切换
      let param;
      if (this.$store.state.v2)
        param = 'en-seo-hpnew';
      else
        param = config['gp_referrer'];

      let source = this.COMMON.getURLQuery('source');
      let campaign = this.COMMON.getURLQuery('campaign');
      let camp = this.COMMON.getURLQuery('camp');
      let s = this.COMMON.getURLQuery('s');
      let c = this.COMMON.getURLQuery('c');
      if (source && campaign) param = campaign;
      if (source && camp) param = camp;
      if (s && c) param = c;

      // GpReferrer设置
      this.$store.commit('enAdrLinkGpReferrer', param);


      // 特殊渠道判断 *********************************************************
      // if (this.COMMON.getURLQuery('source') === 'tiktok') {
      //   this.$store.commit('enAdrType', 1);
      //   // this.$store.commit('enAdrType', 0);
      //   this.$store.commit('enAdrLinkGpReferrer', 'tiktok');
      // }
      if (this.COMMON.getURLQuery('source') === 'sharechat') {
        this.$store.commit('enAdrType', 0);
        this.$store.commit('enAdrLink', this.$constant.app.download.androidShareChat);
        this.$store.commit('enAdrLinkWithoutGpReferrer', this.$constant.app.download.androidShareChat);
      }
      if (this.COMMON.getURLQuery('source') === 'taktak') {
        this.$store.commit('enAdrType', 0);
        this.$store.commit('enAdrLink', this.$constant.app.download.androidTakTak);
        this.$store.commit('enAdrLinkWithoutGpReferrer', this.$constant.app.download.androidTakTak);
      }


      // 链接汇总 **********************************************************************
      this.$store.commit(
        'enAdrLink',
        this.$store.state.enAdrLinkWithoutGpReferrer
        + this.$constant.app.campaign.androidReferrerQuery
        + this.$store.state.enAdrLinkGpReferrer
      );
      // this.$store.commit(
      //   'enAdrLink',
      //   this.$constant.app.download.android
      // );

      // blog search 地址存储
      let adrDownloadLink = this.$store.state.enAdrLink;
      this.$storage.set('adrDownloadLink', adrDownloadLink);
    },

    // 全局配置
    securityLevel10Config() {
      // 国家代码配置
      this.accessCountryInit();

      // 下载配置
      this.downloadBtnConfigInit();
    },

    // 下载按钮
    async downloadBtnConfigInit() {
      try {
        const res = await this.getWebConfig();
        // console.log(res);
        if (res.data.status !== 'ok' && typeof res.data === 'object') {
          console.error('downloadBtnConfigInit Getting Failed.');
          return;
        }

        const downloadButton = res.data['download_button'];

        // iOS
        this.enIosDownloadLinkInit(downloadButton.ios);
        // Android
        this.enAndroidDownloadLinkInit(downloadButton.android);
      } catch (err) {
        console.log(err);
      }
    },
    getWebConfig() {
      return new Promise((resolve, reject) => {
        // 国家代码存储检测
        let params = { lan: 'en' };
        if (this.$storage.has('accessCountry'))
          params.country = this.$storage.get('accessCountry');

        this.$axios.get(apiV2.getWebConfig, {
          params: params
        }).then((res) => {
          resolve(res);
        }).catch((err) => {
          reject(err);
        });
      });
    },

    // GA问题排查
    recorderBlogLoginRegister(routeTo, routeFrom) {
      // console.log('routeFrom', routeFrom);
      // console.log('routeTo', routeTo);
      // console.log('routeFrom.name', routeFrom.name);
      // console.log('routeTo.name', routeTo.name);
      if (
        (routeFrom.name === 'blog' || routeFrom.name === 'blog-id___en')
        && (routeTo.name === 'login' || routeFrom.name === 'register' || routeFrom.name === 'seo-1-lottery')
      ) {
        // this.$storage.set('fromBlog', true);
        this.$storage.set('fromBlog', false);
      }

      if (
        (routeFrom.name !== 'blog' && routeFrom.name !== 'blog-id___en' && routeFrom.name !== 'seo-1-lottery')
        && (routeTo.name === 'login' || routeFrom.name === 'register' || routeFrom.name === 'seo-1-lottery')
      ) {
        this.$storage.set('fromBlog', false);
      }
    },

    // Download CTA Text
    downloadCtaTextChange(to) {
      let text = '';
      if (to.path === '/event-user-generated-contest') {
        text = 'Download GetInsta to Join This Contest & Win Prizes';
      } else {
        text
          = this.$t('global.downloadCTA.text0')
          + ' '
          + this.$store.state.productName
          + ' '
          + this.$t('global.downloadCTA.text1');
      }

      this.$store.commit('downloadCtaText', text);
    },

    // 巴西跳转
    BrazilJump(countryCode) {
      if (
        countryCode === 'BR'
        && this.COMMON.getURLQuery('source') === 'tiktok'
        && this.COMMON.getURLQuery('campaign') === 'tk'
      )
        this.$nuxt.$router.push({
          path: '/event-user-generated-contest',
          query: {
            source: 'tiktok',
            campaign: 'tk'
          }
        });
    },

    // 平台识别
    platformDetective() {
      let pl = '';
      if (!this.COMMON.isMobile()) pl = 'pc';
      if (this.COMMON.isiOS()) pl = 'ios';
      if (this.COMMON.isAndroid()) pl = 'app';
      this.$store.commit('platform', pl);
    },

    // ☆首页下载按钮分流测试☆(测试结束)
    homeDownloadBtnTest() {
      // const result = this.COMMON.randomProbabilityMulti(3);
      // this.$store.commit('downloadBtnTestA', result === 0);
      // this.$store.commit('downloadBtnTestB', result === 1);
      // this.$store.commit('downloadBtnTestC', result === 2);
      // const result = this.COMMON.randomProbabilityMulti(2);
      // this.$store.commit('downloadBtnTestB', result === 0);
      // this.$store.commit('downloadBtnTestC', result === 1);
      this.$store.commit('downloadBtnTestA', false);
      this.$store.commit('downloadBtnTestB', false);
      this.$store.commit('downloadBtnTestC', true);

      if (this.$store.state.downloadBtnTestA) this.$store.commit('gaColor', 'original');
      if (this.$store.state.downloadBtnTestB) this.$store.commit('gaColor', 'colorful');
      if (this.$store.state.downloadBtnTestC) this.$store.commit('gaColor', 'green');

      // console.log(
      //   'downloadBtnTestA:', this.$store.state.downloadBtnTestA,
      //   'downloadBtnTestB:', this.$store.state.downloadBtnTestB,
      //   'downloadBtnTestC:', this.$store.state.downloadBtnTestC
      // );
    },

    // 加载Google翻译
    loadGoogleTranslate() {
      if (this.$store.state.googleTransLoad) return;

      this.COMMON.googleTransInit();
      const URL = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      setTimeout(() => {
        this.COMMON.loadJS(URL).then(() => {
          this.$store.commit('googleTransLoad', true);
        }).catch(() => {
          console.log('footerContainer:', 'Load Google Translate Failed.');
        });
      }, 5000);
    },

    // v2开关
    v2SwitchGate(path) {
      if (this.COMMON.envTest())
        this.v2SwitchForDev(path);
      else
        this.v2Switch(path);
    },
    v2Switch(path) {
      // Store页面判断
      // const storePages = [
      //   '/buy-instagram-likes'
      // ];
      const storePages = [];
      const isStorePages = storePages.indexOf(path) > -1;

      let openOrNot = true;
      if (!isStorePages)
        openOrNot = true;
      else
        openOrNot = this.COMMON.randomAbTest();

      // checkout页面判断
      // const checkoutPages = [
      //   '/checkout',
      //   '/checkout-2'
      // ];
      // const isCheckoutPages = checkoutPages.indexOf(path) > -1;
      // if (isCheckoutPages)
      //   openOrNot = this.$storage.has('s2') ? this.$storage.get('s2') : false;


      // 用户中心页面判断
      const userCenterPages = [
        '/user',
        '/user-get-followers',
        '/user-get-likes'
      ];
      const isUserCenterPages = userCenterPages.indexOf(path) > -1;
      // 个人中心判断
      if (isUserCenterPages) openOrNot = true;


      // 状态存储
      this.$store.commit('v2', true);
      this.$store.commit('s2', openOrNot);
      this.$storage.set('s2', openOrNot);
      const currentOrNew = openOrNot ? 'new' : 'current';
      if (path === '/')
        // this.$ga.event('insimp', 'impression', `hp${this.$store.state.platform}${currentOrNew}`);
      this.$store.commit('v2Ad', true);
    },
    v2SwitchForDev(path) {
      // PC Beacon
      const openOrNot = path === '/';
      // V2 Switch Beacon
      this.$store.commit('v2', true);
      this.$store.commit('s2', true);
      const currentOrNew = openOrNot ? 'new' : 'current';
      if (path === '/')
        // this.$ga.event('insimp', 'impression', `hp${this.$store.state.platform}${currentOrNew}`);
      this.$store.commit('v2Ad', true);
    },

    setDefaultLocalStorageVueX() {
      this.$store.commit('userName',
        this.$storage.has('userName')
          ? this.$storage.get('userName') : ''
      );
      this.$store.commit('userCoins',
        this.$storage.has('userCoins')
          ? this.$storage.get('userCoins') : ''
      );
      this.$store.commit('userCoins',
        this.$storage.has('userCoins')
          ? this.$storage.get('userCoins') : ''
      );
      this.$store.commit('cartLength',
        this.$storage.has('cartLength')
          ? this.$storage.get('cartLength') : ''
      );
    }
  }
};
</script>

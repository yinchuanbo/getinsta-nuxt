<template>
  <div class="home-0-banner"
       :class="{
         'on': animateBegin,
         'text-on': textBegin,
         'no-header': pageSeoBuy || pageSeoIOS
       }"
  >
    <div v-if="!pageSeoBuy" class="header-blank"></div>
    <!--main-->
    <div class="wrapper">
      <div class="home-0-banner__phone" :class="{ 'phone-on': !loading }">
        <div class="home-0-banner__phone-container">
          <div class="bg"></div>
          <div class="line"></div>
          <div class="bubble-0"></div>
          <div class="bubble-1"></div>
        </div>
        <div class="banner-animate-loading"></div>
      </div>
      <div class="home-0-banner__text">
        <!--h1 & h2-->
        <div v-if="pageName === '' && !(pageSeoBuy || pageSeoIOS)">
          <h1
            :class="{ 'minor-lang': $i18n.locale !== 'en' }"
            v-html="$t('home.home-0.title')"
          ></h1>
          <h2>
            {{ $t('home.home-0.subtitle0') }}
            <b>{{ $t('home.home-0.subtitle1') }}</b>
            {{ $t('home.home-0.subtitle2-0') }}
            <strong>{{ $t('home.home-0.subtitle2-1') }}</strong>
          </h2>
        </div>
        <!--h1 & h2-->
        <div v-if="pageName === '' && (pageSeoBuy || pageSeoIOS)">
          <h1>Get Real Instagram <br> Followers & Likes</h1>
          <h2>Easily get <b>10,000+ real</b> Instagram followers and likes from active users in minutes. No password. No survey. No risk. 100% real & safe.</h2>
        </div>
        <!--h1 & h2-->
        <div v-if="pageName === 'event-dl'">
          <h1>Get Instagram Followers and Likes with Guarantee</h1>
          <h2>
            Trusted by millions of customers, GetInsta promises you
            <b>100% REAL, ORGANIC and INSTANT</b>
            Instagram followers and likes. Download APP Now to get more followers and likes.
          </h2>
        </div>
        <!--FreeGetItNow PC-->
        <div
          v-if="pageName === '' && !freeGetItNowHide"
          id="home-0-0"
          class="home-0-banner__text_btn pc"
          :class="{ 'minor-lang': $i18n.locale !== 'en' }"
          @click="gaBtnFreeGetItNow"
        >
          <button-icon-ins text="Get Free Followers Now" bubble-float square shadow :icon="'ins'" font-size="size-16" theme="cyan" class="button-hover-1" />
        </div>


        <!--DownloadAPPNow PC-->
        <div v-if="pageName === 'event-dl'"
             class="home-0-banner__text_btn pc"
             @click="gaDownloadAPPNow"
        >
          <button-wave :text="$t('home.home-0.btn.DownloadAPPNow')" />
        </div>
        <!--DownloadAPPNow Mobile-->
        <div class="mobile" @click="downloadApp">
          <div class="home-0-banner__text_btn long">
            <button-icon-ins text="Get Free Followers Now" bubble-float square shadow :icon="'ins'" font-size="size-15" theme="cyan" />
          </div>
        </div>
        <!--DownloadAPPNow Mobile (pageSeoBuy)-->
        <div v-if="pageSeoBuy" class="home-0-banner__text_btn mobile" @click="downloadAppPageSeoBuy">
          <!--          <button-wave :text="$t('home.home-0.btn.DownloadAPPNow')" />-->
          <button-buy-now :text="$t('home.home-0.btn.BuyNow')" :white="true" :font-size="'size-20'" />
        </div>


        <!--BuyNow PC-->
        <div v-if="pageName === '' && !buyNowBtnHide"
             id="home-0-1"
             class="home-0-banner__text_btn pc"
             :class="{ 'second': !freeGetItNowHide, 'minor-lang': $i18n.locale !== 'en' }"
             @click="ga01"
        >
          <button-buy-now :text="$t('home.home-0.btn.BuyNow')" square :white="true" :font-size="'size-16'" :border-width="2" />
        </div>


        <!--BuyNow Mobile-->
        <div v-if="!buyNowBtnHide && !minorLangHide"
             class="home-0-banner__text_btn mobile long"
             :class="{
               'second': !appDwnBtnHide || pageSeoBuy,
             }"
             @click="ga01"
        >
          <button-buy-now square :text="$t('home.home-0.btn.BuyNow')" :white="true" :font-size="'size-20'" />
        </div>
      </div>
    </div>

    <!--loader-->
    <div class="img-preloader">
      <img v-for="(img, index) in imgPreload" :key="index" :src="img" alt="img-preloader" @load="imageLoaded">
    </div>
    <div v-if="pageSeoBuy" class="blank-bottom"></div>
  </div>
</template>

<script>
import ButtonWave from '@/components/button/button-wave';
import img0 from './img/banner-bg.png';
import img1 from './img/banner-line.svg';
import img2 from './img/banner-bubble-0.png';
import img3 from './img/banner-bubble-1.png';
import img4 from './img/icon_banner_inslogo.svg';
import ButtonBuyNow from '@/components/button/button-buy-now';
// import ButtonDownloadAndroid from '@/components/button/button-download-android';
// import ButtonDownloadIos from '@/components/button/button-download-ios';
import ButtonIconIns from '@/components/button/button-icon-ins';
// import ButtonThemeGradient from '@/components/button/button-theme-gradient';

export default {
  name: 'Home0BannerV2',
  components: {
    ButtonIconIns,
    // ButtonThemeGradient,
    // ButtonDownloadIos,
    // ButtonDownloadAndroid,
    ButtonBuyNow,
    ButtonWave
  },
  props: {
    pageName: {
      type: String,
      required: false,
      default: ''
    }
  },
  data() {
    return {
      textBegin: true,
      animateBegin: false,
      loading: true,
      imgPreload: [img0, img1, img2, img3, img4],
      loadedImages: 0,
      buyNowBtnHide: false,
      pageSeoBuy: false,
      pageSeoIOS: false,
      appDwnBtnHide: false,
      freeGetItNowHide: false,
      pageSeoBuyShow: false
    };
  },
  computed: {
    minorLangHide() {
      let hide;
      if (this.$i18n.locale === 'en') {
        hide = false;
      } else {

        if (this.COMMON.isiOS()) {

          if (this.$i18n.locale === 'de') {

            hide
              = !(
              this.COMMON.getURLQuery('c') === 'deppc1'
              || this.COMMON.getURLQuery('c') === 'deppc2'
              || this.COMMON.getURLQuery('c') === 'deppc10'
              || this.COMMON.getURLQuery('camp') === 'deppc1'
              || this.COMMON.getURLQuery('camp') === 'deppc2'
              || this.COMMON.getURLQuery('camp') === 'deppc10'
            );

          } else {

            hide
              = !(
              this.COMMON.getURLQuery('c') === 'frppc1'
              || this.COMMON.getURLQuery('c') === 'frppc2'
              || this.COMMON.getURLQuery('c') === 'frppc10'
            );

          }
        } else {
          hide = false;
        }
      }
      return hide;
    }
  },
  watch: {
    loadedImages(cur) {
      if (cur === this.imgPreload.length) {
        setTimeout(() => {
          this.loading = false;
        }, 30 + 800);
        setTimeout(() => {
          this.animateBegin = true;
        }, 30);
      }
    }
  },
  mounted() {
    this.textBegin = true;

    this.pageSeoBuy = this.$nuxt.$route.path === '/event-followers' || this.$nuxt.$route.path === '/event-likes';
    this.pageSeoIOS = this.$nuxt.$route.path === '/event-ios';

    this.buyNowBtnHide
      = (this.COMMON.getURLQuery('source') === 'google' && this.COMMON.isiOS())
      || this.pageSeoIOS
      || (this.COMMON.getURLQuery('s') === 'tiktok' && this.COMMON.isiOS())
      || (this.COMMON.getURLQuery('source') === 'google' && this.COMMON.isAndroid())
    ;
    this.appDwnBtnHide = this.pageSeoBuy || (this.$i18n.locale === 'de' && this.COMMON.isAndroid());
    this.freeGetItNowHide = this.pageSeoBuy || this.$i18n.locale === 'de';
    this.pageSeoBuyShow = !this.pageSeoBuy;
  },
  methods: {
    imageLoaded: function () {
      this.loadedImages += 1;
    },
    gaBtnFreeGetItNow() {
      if (this.$i18n.locale === 'en') {
        this.ga0();
      } else {
        this.ga00();
      }
    },
    ga0() {
      if (this.$nuxt.$route.path === '/event-ios') {
        this.$ga.event('inslogin', 'login', 'hplogin1-ad');
        window.location.href = this.$constant.app.download.ios1;
      }
      this.$ga.event('inslogin', 'login', 'hploginnew1');

      // UTM参数
      let query = {};
      if (this.COMMON.getURLQuery('utm_source') === 'IOT-PC') {
        query = { utm_source: 'IOT-PC' };
      }
      this.$nuxt.$router.push({ path: '/login', query: query });
    },
    ga00() {
      this.$scrollTo('#home-2-free', { offset: -1 * this.COMMON.headerHeight() });
      this.$ga.event('insdl', 'download', 'hpbanner-fr');
    },
    ga01() {
      if (this.$nuxt.$route.path === '/event-followers' || this.$nuxt.$route.path === '/event-likes') {
        this.$ga.event('insbuy', 'buy', `hpbuy1-ad`);
        this.$scrollTo(`#store-shelf-1-buy`, { offset: 0 });
      } else {
        this.$ga.event('insbuy', 'buy', `hp${this.$store.state.platform}buynew1`);
        this.$nuxt.$router.push({ path: '/buy-instagram-followers' });
      }
    },
    gaDownloadAPPNow() {
      // if (this.$i18n.locale === 'en') {
      this.downloadApp();
      // } else {
      //   this.downloadAppMinorLang();
      // }
    },
    downloadApp() {
      if (this.COMMON.isiOS()) {

        if (this.$nuxt.$route.path === '/event-ios') {
          this.$ga.event('insdl', 'download', 'hpiosdlm1-ad');
          window.location.href = this.$constant.app.download.ios1;
        } else {
          this.$ga.event('insdl', 'download', `hp${this.$store.state.platform}dlnew1`);
          // this.$store.commit('enIosLinkCt', this.$store.state.adQueryCampaignHome);
          window.location.href
            = `${this.$store.state.enIosLink}`
            + `?pt=${this.$store.state.enIosLinkPt}`
            + `&ct=${this.$store.state.enIosLinkCt}`
            + `&mt=8`;
        }
      } else {
        this.$ga.event('insdl', 'download', `hp${this.$store.state.platform}dlnew1`);

        // Beacon:MinorAppDownload
        window.location.href
          = this.$constant.app.download.androidGooglePlay1
          + this.$constant.app.campaign.androidReferrerQuery
          + this.$store.state.enAdrLinkGpReferrer;
      }
    },
    downloadAppMinorLang() {
      if (this.COMMON.isiOS()) {
        this.$ga.event('insdl', 'download', `hpios1-${this.$i18n.locale}`);
        // location.href
        //   = this.$constant.app.download.ios
        //   + `${this.$constant.app.campaign.iosMinorLang}&ct=${this.$i18n.locale}campaign`;

        // Beacon:MinorAppDownload
        location.href = this.$store.state.minorLangIosLink;
      } else {
        this.$ga.event('insdl', 'download', `hpadr1-${this.$i18n.locale}`);
        if (this.$i18n.locale === 'fr' || this.$i18n.locale === 'de') {
          // location.href = `${this.$constant.app.download.android}?lang=${this.$i18n.locale}`;

          // Beacon:MinorAppDownload
          location.href = this.$store.state.minorLangAdrLink;
        } else {
          location.href = this.$constant.app.download.android;
        }
      }
    },
    downloadAppPageSeoBuy() {
      // const paramS = this.COMMON.getURLQuery('s');
      const paramC = this.COMMON.getURLQuery('c');
      // const paramK = this.COMMON.getURLQuery('k');

      if (this.COMMON.isiOS()) {
        let ct = 'inspaid';
        if (paramC !== null) {
          ct = paramC;
        }
        location.href = `${this.$constant.app.download.ios}${this.$constant.app.campaign.iosAds}&ct=${ct}`;
      } else if (this.COMMON.isAndroid()) {
        location.href = this.$constant.app.download.android;
      } else {

      }
    },

    gaDownloadAPPTest() {
      let url = '';

      if (this.COMMON.isiOS()) {
        if (this.$store.state.downloadBtnTestA)
          url = this.$constant.app.download.downloadBtnTestAIos;
        if (this.$store.state.downloadBtnTestB)
          url = this.$constant.app.download.downloadBtnTestBIos;
        if (this.$store.state.downloadBtnTestC)
          url = this.$constant.app.download.downloadBtnTestCIos;
      }

      if (this.COMMON.isAndroid()) {
        if (this.$store.state.downloadBtnTestA)
          url = this.$constant.app.download.downloadBtnTestAAdr;
        if (this.$store.state.downloadBtnTestB)
          url = this.$constant.app.download.downloadBtnTestBAdr;
        if (this.$store.state.downloadBtnTestC)
          url = this.$constant.app.download.downloadBtnTestCAdr;
      }

      this.$ga.event(
        'insdl',
        'download',
        `hp${this.$store.state.platform}dl${this.$store.state.gaColor}1`
      );
      location.href = url;
    },
    gaBuyTest() {
      this.$ga.event(
        'insbuy',
        'buy',
        `hp${this.$store.state.platform}dl${this.$store.state.gaColor}1`
      );
      this.$nuxt.$router.push({ path: '/buy-instagram-followers' });
    },
    // gaBtnGateDownload() {
    //   this.$store.state.btnTestGate ? this.gaDownloadAPPTest() : this.gaDownloadAPPNow();
    // },
    gaBtnGateBuy() {
      this.$store.state.btnTestGate ? this.gaBuyTest() : this.ga01();
    }
  }
};
</script>

<style lang="scss" scoped>
.home-0-banner {
  position: relative;
  height: 810px;
  //background: linear-gradient(45deg, #FFCF61, #AD34D8, #111EC5);
  background-image: linear-gradient(180deg, #5A0ED9 0%, #FF6075 100%);

  .img-preloader {
    display: none;
  }

  &:after {
    position: absolute;
    bottom: -285px;
    left: 0;
    width: 585px;
    height: 585px;
    background: url("img/icon_banner_inslogo.svg") no-repeat;
    content: "";
    opacity: 0;
    transition: all 0.8s;
  }

  .wrapper {
    z-index: 1;
  }

  .home-0-banner__text {
    padding-top: 168px;
    width: 640px;

    h1 {
      font: normal normal 600 64px/73px BalooChettan;
      color: #FFFFFF;
      transition-delay: 0s;

      &.minor-lang {
        font-size: 43px;
      }
    }

    h2 {
      margin-top: 20px;
      font: 500 18px/20px Montserrat;
      color: #FFFFFF;
      transition-delay: 0.2s;

      b {
        font-weight: 700;
        color: #00FFC7;
      }

      strong {
        font-weight: 700;
      }
    }

    .home-0-banner__text_btn {
      margin-top: 60px;
      display: inline-block;
      width: 252px;
      height: 60px;
      transition-delay: 0.4s;
      vertical-align: middle;

      &.second {
        margin-left: 12px;
      }

      &.second.minor-lang {
        display: block;
        margin-left: 0;
        margin-top: 24px;
        width: 320px;
      }
    }

    h1, h2, .home-0-banner__text_btn {
      transition-duration: .8s;
      transition-property: all;
      opacity: 0;
      transform: translateY(20px);
    }
  }

  .home-0-banner__phone {
    position: absolute;
    top: 92px;
    right: 10px;
    width: 542px;
    height: 475px;
    opacity: 1;
    transition: all 1s 0.6s;

    .banner-animate-loading {
      transition: opacity 0.3s;
      transform: translateY(-10px);
    }

    .home-0-banner__phone-container {
      position: relative;
      width: 100%;
      height: 100%;
      opacity: 0;
      transition: all 0.3s;

      // v2
      .bg, .line, .bubble-0, .bubble-1 {
        position: absolute;
        background-repeat: no-repeat;
        transition: all 1s cubic-bezier(0.645, 0.045, 0.355, 1);
      }

      .bg {
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-image: url("img/banner-bg.png");
      }

      .line {
        top: 71px;
        left: -109px;
        width: 0;
        height: 309px;
        background-image: url("img/banner-line.svg");
        transition-delay: 1s;
        transition-duration: 2s;
      }

      .bubble-0 {
        top: 192px;
        left: 5px;
        width: 205px;
        height: 127px;
        background-image: url("img/banner-bubble-0.png");
        transform: translateY(-30px);
        opacity: 0;
        transition-delay: 2s;
      }

      .bubble-1 {
        top: 109px;
        left: 301px;
        width: 213px;
        height: 131px;
        background-image: url("img/banner-bubble-1.png");
        transform: translateY(-30px);
        opacity: 0;
        transition-delay: 2.6s;
      }
    }

    i {
      position: absolute;
      display: block;
      background-size: contain;
      background-position: center;
      background-repeat: no-repeat;
    }
  }

  .home-0-banner__phone.phone-on {
    .home-0-banner__phone-container {
      opacity: 1;
    }

    .banner-animate-loading {
      opacity: 0;
    }
  }

  &.on {
    .home-0-banner__phone {
      .line {
        width: 702px;
      }

      .bubble-0, .bubble-1 {
        transform: translateY(0);
        opacity: 1;
      }
    }

    &:after {
      opacity: 1;
    }
  }

  &.text-on {
    .home-0-banner__text {
      h1, h2, .home-0-banner__text_btn {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .home-0-banner__phone {
      opacity: 1;
    }
  }

  &.no-header {
    height: 950px;
  }

  .blank-bottom {
    display: none;
  }
}

@media (max-width: 768px) {
  .home-0-banner {
    padding-bottom: 0;
    height: auto;
    min-height: 180vw;
    overflow: hidden;

    .home-0-banner__text {
      padding-top: 0;
      width: 100%;
      text-align: center;

      h1 {
        padding: 0 10px;
        line-height: 50px;
        font-size: 40px;

        &.minor-lang {
          font-size: (54px/2);
        }
      }

      h2 {
        padding: 0 30px;
        font-size: 15px;
        line-height: 20px;
      }

      .home-0-banner__text_btn {
        margin: 50px auto 0;
        width: 277px;
        height: 60px;

        &.long {
          width: 277px;
          height: 60px;

          &.second {
            width: 277px;
          }
        }

        &.second {
          margin-left: 0;
          margin-top: 16px;
          width: (422px/2);
        }
      }
    }

    .home-0-banner__phone {
      margin-top: 86px;
      position: relative;
      width: 100%;
      height: 56vw;
      top: 0;
      right: 0;

      //v2
      background: url("img/banner_bg-m.svg") top center no-repeat;
      background-size: cover;

      &:after {
        top: 82%;
        right: 0;
        display: none;
      }

      //v2
      .phone, .followers, .like-num, .like-btn, .views, .phone-shadow {
        //transform: translateY(33px);
        display: none;
      }

      .banner-animate-loading {
        transform: translateY(-30px);
      }
    }

    &.on {
      .home-0-banner__phone {
        .followers, .like-num, .like-btn, .views {
          @keyframes assets-move {
            0% {
              transform: translateY(0);
            }
            100% {
              transform: translateY(-33px);
            }
          }
        }
      }
    }

    &.no-header {
      height: auto;
    }

    .blank-bottom {
      display: block;
      height: 80px;
    }

    // v2
    .wrapper {
      display: flex;
      flex-direction: column-reverse;
    }
  }
}
</style>

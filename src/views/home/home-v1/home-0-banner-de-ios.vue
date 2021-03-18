<template>
  <div
    class="home-0-banner"
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
          <i class="phone-shadow"></i>
          <i class="phone"></i>
          <i class="followers"></i>
          <i class="like-num"></i>
          <i class="like-btn"></i>
          <i class="views"></i>
        </div>
        <div class="banner-animate-loading"></div>
      </div>
      <div class="home-0-banner__text">
        <!--h1 & h2-->
        <div v-if="pageName === '' && !(pageSeoBuy || pageSeoIOS)">
          <h1>Instagram Follower & Likes kostenlos bekommen</h1>

          <h2>
            Sie können <b>100% kostenlose und qualitativ hochwertige</b> Instagram Follower und Likes bekommen,
            indem Sie die App herunterladen. Kein Passwort. Keine Umfrage. Kein Risiko. 100% echt und sicher.
          </h2>
        </div>

        <!--DownloadAPPNow Mobile-->
        <div class="mobile">
          <div v-if="!appDwnBtnHide" class="home-0-banner__text_btn" @click="gaDownloadAPPNow">
            <button-wave :text="$t('home.home-0.btn.DownloadAPPNow')" />
          </div>
        </div>

        <!--BuyNow Mobile-->
        <div
          v-if="!buyNowBtnHide && !minorLangHide"
          class="home-0-banner__text_btn mobile"
          :class="{ 'second': !appDwnBtnHide || pageSeoBuy }"
          @click="ga01"
        >
          <button-buy-now :text="$t('home.home-0.btn.BuyNow')" :white="true" :font-size="'size-20'" />
        </div>
      </div>
    </div>

    <div class="img-preloader">
      <img v-for="(img, index) in imgPreload" :key="index" :src="img" alt="img-preloader" @load="imageLoaded">
    </div>
    <div v-if="pageSeoBuy" class="blank-bottom"></div>
  </div>
</template>

<script>
import ButtonWave from '@/components/button/button-wave';
import img0 from '@/assets/images/home/home-0-banner/home_banner_phone.png';
import img1 from '@/assets/images/home/home-0-banner/home_banner_phone_1000.svg';
import img2 from '@/assets/images/home/home-0-banner/home_banner_phone_5000followers.svg';
import img3 from '@/assets/images/home/home-0-banner/home_banner_phone_10000followers.svg';
import img4 from '@/assets/images/home/home-0-banner/home_banner_phone_fish.svg';
import img5 from '@/assets/images/home/home-0-banner/home_banner_phone_like.svg';
import img6 from '@/assets/images/home/home-0-banner/home_banner_phone_shadow.svg';
import img7 from '@/assets/images/home/home-0-banner/home_banner_bg_wave.svg';
import ButtonBuyNow from '@/components/button/button-buy-now';

export default {
  name: 'Home0BannerDeIos',
  components: {
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
      textBegin: false,
      animateBegin: false,
      loading: true,
      imgPreload: [img0, img1, img2, img3, img4, img5, img6, img7],
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
    setTimeout(() => {
      this.textBegin = true;
    }, 100);

    this.pageSeoBuy = this.$route.path === '/event-followers' || this.$route.path === '/event-likes';
    this.pageSeoIOS = this.$route.path === '/event-ios';

    this.buyNowBtnHide = (this.COMMON.getURLQuery('source') === 'google' && this.COMMON.isiOS()) || this.pageSeoIOS;
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
      if (this.$route.path === '/event-ios') {
        this.$ga.event('inslogin', 'login', 'hplogin1-ad');
        window.location.href = this.$constant.app.download.ios1;
      }
      this.$ga.event('inslogin', 'login', 'hplogin1');

      // UTM参数
      let query = {};
      if (this.COMMON.getURLQuery('utm_source') === 'IOT-PC') {
        query = { utm_source: 'IOT-PC' };
      }
      this.$router.push({ path: '/login', query: query });
    },
    ga00() {
      this.$scrollTo('#home-2-free', { offset: -1 * this.COMMON.headerHeight() });
      this.$ga.event('insdl', 'download', 'hpbanner-fr');
    },
    ga01() {
      if (this.$route.path === '/event-followers' || this.$route.path === '/event-likes') {
        this.$ga.event('insbuy', 'buy', `hpbuy1-ad`);
        this.$scrollTo(`#store-shelf-1-buy`, { offset: 0 });
      } else {
        if (this.$i18n.locale === 'en') {
          this.$ga.event('insbuy', 'buy', `hpbuy1`);
          this.$router.push({ path: '/buy-instagram-followers' });
        } else {
          let client = '';
          let clientLong = 'PC';
          if (this.COMMON.isAndroid()) {
            client = 'adr';
            clientLong = 'android';
          }
          if (this.COMMON.isiOS()) {
            client = 'ios';
            clientLong = 'ios';
          }

          this.$ga.event('insbuy', 'buy', `hpbanner${client}-${this.$i18n.locale}`);
          this.$router.push({
            path: '/buy-instagram-followers',
            query: {
              utm_source: clientLong,
              utm_medium: 'homepage'
            }
          });
        }
      }
    },
    gaDownloadAPPNow() {
      if (this.$i18n.locale === 'en') {
        this.downloadApp();
      } else {
        this.downloadAppMinorLang();
      }
    },
    downloadApp() {
      if (this.COMMON.isiOS()) {
        if (this.$route.path === '/event-ios') {
          this.$ga.event('insdl', 'download', 'hpiosdlm1-ad');
          window.location.href = this.$constant.app.download.ios1;
        } else {
          this.$ga.event('insdl', 'download', 'hpiosdlm1');
          window.location.href
            = this.$constant.app.download.ios
            + `?pt=121014724&ct=${this.$store.state.adQueryCampaignHome}&mt=8`;
        }
      } else {
        this.$ga.event('insdl', 'download', 'hpappdlm1');
        if (this.$i18n.locale === 'fr' || this.$i18n.locale === 'de') {
          // window.location.href = `${this.$constant.app.download.android}?lang=${this.$i18n.locale}`;

          // Beacon:MinorAppDownload
          location.href = this.$store.state.minorLangAdrLink;
        } else {
          window.location.href = this.$constant.app.download.android;
        }
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
          location.href = `${this.$constant.app.download.android}?lang=${this.$i18n.locale}`;

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
    }
  }
};
</script>

<style lang="scss" scoped>
.home-0-banner {
  position: relative;
  height: 810px;
  background: linear-gradient(45deg, #FFCF61, #AD34D8, #111EC5);

  .img-preloader {
    display: none;
  }

  &:after {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 1547px;
    height: 597px;
    background: url("~@/assets/images/home/home-0-banner/home_banner_bg_wave.svg") no-repeat;
    background-size: contain;
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
      font: 700 54px Montserrat;
      color: #FFFFFF;
      transition-delay: 0s;

      &.minor-lang {
        font-size: 43px;
      }
    }

    h2 {
      margin-top: 20px;
      font: 400 20px/24px Montserrat;
      color: #FFFFFF;
      transition-delay: 0.2s;

      b {
        font-weight: 800;
        color: #FFC439;
      }
    }

    .home-0-banner__text_btn {
      margin-top: 60px;
      display: inline-block;
      width: 320px;
      height: 80px;
      transition-delay: 0.4s;

      &.second {
        margin-left: 24px;
        width: 168px;
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
    right: -60px;
    top: 232px;
    width: 750px;
    height: 488px;
    opacity: 0;
    transition: all 1s 0.6s;

    .home-0-banner__phone-container {
      opacity: 0;
      transition: all 1.2s;
    }

    .banner-animate-loading {
      transition: opacity 0.3s;
      transform: translateY(-90px);
    }

    &:after {
      position: absolute;
      right: -202px;
      top: 14px;
      width: 133/750*100%;
      height: 158/488*100%;
      background-image: url("~@/assets/images/home/home-0-banner/home_banner_phone_fish.svg");
      background-repeat: no-repeat;
      background-size: contain;
      content: "";
      opacity: 0;
      transform: translateX(30px) translateY(30px) rotate(-50deg);
      transition: all 0.8s 1.6+1.3s + 0.3*4s;
    }

    i {
      position: absolute;
      display: block;
      background-size: contain;
      background-position: center;
      background-repeat: no-repeat;
    }

    .phone, .followers, .like-num, .like-btn, .views {
      transform: translateY(66px);
      transition: all 0.8s 2s cubic-bezier(0.645, 0.045, 0.355, 1);
    }

    .phone {
      top: 0;
      left: 9%;
      width: 611/750*100%;
      height: 368/488*100%;
      background-image: url("~@/assets/images/home/home-0-banner/home_banner_phone.png");
    }

    .phone-shadow {
      top: 13.8%;
      left: 9%;
      width: 611/750*100%;
      height: 367/488*100%;
      background-image: url("~@/assets/images/home/home-0-banner/home_banner_phone_shadow.svg");
    }

    .followers {
      top: 2%;
      left: 29.8%;
      width: 34%;
      height: 20.6%;
      background-image: url("~@/assets/images/home/home-0-banner/home_banner_phone_5000followers.svg");
    }

    .like-num {
      top: 33%;
      left: 17.8%;
      width: 167/750*100%;
      height: 97/488*100%;
      background-image: url("~@/assets/images/home/home-0-banner/home_banner_phone_1000.svg");
    }

    .like-btn {
      top: 51.6%;
      left: 38.5%;
      width: 90/750*100%;
      height: 52/488*100%;
      background-image: url("~@/assets/images/home/home-0-banner/home_banner_phone_like.svg");
    }

    .views {
      top: 43.2%;
      left: 61.8%;
      width: 190/750*100%;
      height: 110/488*100%;
      background-image: url("~@/assets/images/home/home-0-banner/home_banner_phone_10000followers.svg");
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
    &:after {
      opacity: 1;
    }

    .home-0-banner__phone {

      &:after {
        opacity: 1;
        transform: translateX(0) translateY(0) rotate(0);
      }

      .phone, .followers, .like-num, .like-btn, .views {
        transform: translateY(0);
      }

      .followers, .like-num, .like-btn, .views {
        animation: 1.6s assets-move 1.6+1.3s forwards;
        @keyframes assets-move {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-44px);
          }
        }
      }

      .followers {
        animation-delay: 1.6+1.3s + 0.3*0s;
      }

      .like-num {
        animation-delay: 1.6+1.3s + 0.3*1s;
      }

      .like-btn {
        animation-delay: 1.6+1.3s + 0.3*2s;
      }

      .views {
        animation-delay: 1.6+1.3s + 0.3*3s;
      }
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
    padding-bottom: (136px/2);
    height: auto;
    min-height: 180vw;
    overflow: hidden;

    &:after {
      width: 100%;
      height: 100%;
      background-size: 270%;
      background-position-y: bottom;
      background-position-x: -26vw;
    }

    .home-0-banner__text {
      padding-top: 0;
      width: 100%;
      text-align: center;

      h1 {
        padding: 0 20px;
        line-height: (60px/2);
        font-size: (54px/2);

        &.minor-lang {
          font-size: (54px/2);
        }
      }

      h2 {
        padding: 0 30px;
        font-size: (28px/2);
        line-height: (34px/2);
      }

      .home-0-banner__text_btn {
        margin: 50px auto 0;
        width: (422px/2);
        height: (112px/2);

        &.second {
          margin-left: 0;
          margin-top: 16px;
          width: (422px/2);
        }
      }
    }

    .home-0-banner__phone {
      margin-top: 70px;
      position: relative;
      width: 100%;
      height: (488/750)*100vw;
      top: 0;
      right: 0;

      &:after {
        top: 82%;
        right: 0%;
      }

      .phone, .followers, .like-num, .like-btn, .views {
        transform: translateY(33px);
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
  }
}
</style>

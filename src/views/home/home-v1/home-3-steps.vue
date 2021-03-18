<template>
  <div ref="mark" :class="{ 'on': animateBegin }" class="home-3-steps">
    <div class="wrapper">
      <!--      step-0-->
      <div v-if="$i18n.locale === 'en'" class="unit step-0">
        <img src="../../../assets/images/home/home-3-steps/home-3-steps__icon_user.svg" alt="icon">
        <h3>{{ $t('home.home-3.step-0.title') }}</h3>
        <p>{{ $t('home.home-3.step-0.text0') }}<br>{{ $t('home.home-3.step-0.text1') }}</p>
        <div v-if="!pageIOS" class="btn-container" @click="ga0">
          <router-link to="/login">
            <button-purple :text="$t('home.home-3.step-0.btn')" :font-size="'size-20'" />
          </router-link>
        </div>
      </div>
      <!--      step-1-->
      <div v-if="!minorLangHide" class="unit center step-1">
        <img src="../../../assets/images/home/home-3-steps/home-3-steps__icon_download.svg" alt="icon">
        <h3>{{ $t('home.home-3.step-1.title') }}{{ $store.state.productName }}{{ $t('home.home-3.step-1.title-1') }}</h3>
        <p>{{ $t('home.home-3.step-1.text0') }}{{ $store.state.productName }}<br>{{ $t('home.home-3.step-1.text1') }}</p>
        <div class="btn-container">
          <span v-if="!pageIOS" class="pc" @click="ga1PC">
            <button-purple :text="$t('home.home-3.step-1.btnWindows')" :font-size="'size-20'" :icon="'windows'" />
          </span>

          <span v-if="!$store.state.btnTestGate && !$store.state.isiOS" class="mobile" @click="ga1Android">
            <!--            <button-download-android />-->
            <button-theme-gradient square shadow text="Get Free Followers" />
          </span>
          <span v-if="!$store.state.btnTestGate && $store.state.isiOS" class="mobile" @click="ga2iOS">
            <!--            <button-download-ios />-->
            <button-theme-gradient square shadow text="Get Free Followers" />
          </span>
          <div v-if="$store.state.btnTestGate && $store.state.downloadBtnTestA" class="w-100-h-100" @click="gaDownloadAPPTest">
            <span v-if="!$store.state.isiOS" class="mobile">
              <button-download-android />
            </span>
            <span v-if="$store.state.isiOS" class="mobile">
              <button-download-ios />
            </span>
          </div>
          <div v-if="$store.state.btnTestGate && $store.state.downloadBtnTestB" class="mobile w-100-h-100" @click="gaDownloadAPPTest">
            <button-theme-gradient square shadow text="Download Now" font-size="size-15" />
          </div>
          <div v-if="$store.state.btnTestGate && $store.state.downloadBtnTestC" class="mobile w-100-h-100" @click="gaDownloadAPPTest">
            <button-theme-gradient square shadow text="Download Now" font-size="size-15" />
          </div>
        </div>
        <!--two small btn-->
        <div v-if="!pageIOS" class="download-container pc">
          <a class="android" href="javascript:"
             @click="ga3Android"
             @mouseenter="tipQrCode('android', $event)"
             @mouseleave="tipQrCode(false)"
          >
            <img src="../../../assets/images/home/home-3-steps/home-3-steps__icon-android.svg" alt="icon">
          </a>
          <a v-if="!$store.state.hideIosMinorLang" class="ios" href="javascript:"
             @click="ga3Ios"
             @mouseenter="tipQrCode('ios', $event)"
             @mouseleave="tipQrCode(false)"
          >
            <img src="../../../assets/images/home/home-3-steps/home-3-steps__icon-apple.svg" alt="icon">
          </a>
        </div>
        <!--safe text-->
        <!--<p v-if="$i18n.locale !== 'en' || $store.state.isMobile" class="safe">-->
        <!--  <i></i>-->
        <!--  <span>{{ $t('home.home-3.step-1.safe') }}</span>-->
        <!--</p>-->
      </div>
      <!--      step-2-->
      <div class="unit step-2">
        <img src="../../../assets/images/home/home-3-steps/home-3-steps__icon_add-user.svg" alt="icon">
        <!--        step-2 title-->
        <h3 v-if="!$store.state.showIosDe">{{ $t('home.home-3.step-2.title') }}</h3>
        <h3 v-if="$store.state.showIosDe">{{ $t('home.home-3.step-2.title-ios') }}</h3>
        <!--        step-2 text-->
        <p v-if="!$store.state.showIosDe">{{ $t('home.home-3.step-2.text0') }}<br>{{ $t('home.home-3.step-2.text1') }}</p>
        <p v-if="$store.state.showIosDe" v-html="$t('home.home-3.step-2.text-ios')"></p>
        <!--        step-2 btn-->
        <div v-if="!pageIOS && $i18n.locale === 'en'" class="btn-container" @click="ga2">
          <router-link v-if="$i18n.locale === 'en'" to="/login">
            <button-purple :text="$t('home.home-3.step-2.btn')" :font-size="'size-20'" />
          </router-link>
        </div>
        <div v-if="!pageIOS && $i18n.locale !== 'en'" class="btn-container">
          <a
            v-if="!$store.state.isiOS"
            href="javascript:"
            @click="ga201"
          >
            <button-purple :text="$t('home.home-3.step-2.btn')" :font-size="'size-20'" />
          </a>
          <a v-if="$store.state.isiOS && !$store.state.hideIosMinorLang" class="mobile" href="javascript:" @click="ga202">
            <button-purple :text="$t('home.home-3.step-1.btnApp')" :font-size="'size-20'" />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ButtonPurple from '@/components/button/button-purple';
import ButtonDownloadAndroid from '@/components/button/button-download-android';
import ButtonDownloadIos from '@/components/button/button-download-ios';
import ButtonThemeGradient from '@/components/button/button-theme-gradient';

export default {
  name: 'Home3Steps',
  components: { ButtonThemeGradient, ButtonDownloadIos, ButtonDownloadAndroid, ButtonPurple },
  data() {
    return {
      animateBegin: false,
      pageIOS: false
    };
  },
  computed: {
    minorLangHide() {
      let hide;
      if (this.$i18n.locale === 'en') {
        hide = false;
      } else {
        hide = this.COMMON.isiOS();
      }
      return hide;
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handle);

    this.pageIOS = this.$nuxt.$route.path === '/event-ios';
  },
  destroyed() {
    window.removeEventListener('scroll', this.handle);
  },
  methods: {
    handleScroll: function () {
      this.animateBegin = this.$refs.mark.getBoundingClientRect().top < window.innerHeight * 0.66;
    },
    handle() {
      const fun = this.handleScroll();
      this.COMMON.throttle(fun, 60, 100);
    },
    tipQrCode(param, e) {
      if (this.COMMON.isMobile()) return;
      if (e) {
        this.$tipQrCode(param, e.clientX, e.clientY);
      } else {
        this.$tipQrCode(param);
      }
    },
    ga0() {
      this.$ga.event('inslogin', 'login', 'hplogin3');
    },
    ga2() {
      this.$ga.event('inslogin', 'login', 'hplogin4');
    },
    ga201() {
      let utmParam = '';
      if (this.COMMON.isAndroid()) {
        this.$ga.event('insbuy', 'buy', `hpadr2-${this.$i18n.locale}`);
        utmParam = 'android';
      } else {
        this.$ga.event('insbuy', 'buy', `hp3-${this.$i18n.locale}`);
        utmParam = 'PC';
      }
      this.$nuxt.$router.push({
        path: '/buy-instagram-followers',
        query: {
          utm_source: utmParam,
          utm_medium: 'homepage'
        }
      });
    },
    ga202() {
      this.$ga.event('insdl', 'download', `hpios3-${this.$i18n.locale}`);
      // window.location.href
      //   = this.$constant.app.download.ios
      //   + `${this.$constant.app.campaign.iosMinorLang}&ct=${this.$i18n.locale}campaign`;

      // Beacon:MinorAppDownload
      location.href = this.$store.state.minorLangIosLink;
    },
    ga1PC() {
      this.$ga.event('insdl', 'download', 'hpwindls1');
      window.location.href = this.$constant.app.download.windows;
    },
    ga1Android() {
      this.$ga.event('insdl', 'download', 'hpappdls1');
      if (this.$i18n.locale === 'fr' || this.$i18n.locale === 'de') {
        // window.location.href = `${this.$constant.app.download.android}?lang=${this.$i18n.locale}`;

        // Beacon:MinorAppDownload
        location.href = this.$store.state.minorLangAdrLink;
      } else {
        window.location.href = this.$store.state.enAdrLink;
      }
    },
    ga11Android() {
      this.$ga.event('insdl', 'download', `hpadr4-${this.$i18n.locale}`);
      if (this.$i18n.locale === 'fr' || this.$i18n.locale === 'de') {
        // window.location.href = `${this.$constant.app.download.android}?lang=${this.$i18n.locale}`;

        // Beacon:MinorAppDownload
        location.href = this.$store.state.minorLangAdrLink;
      } else {
        window.location.href = this.$store.state.enAdrLink;
      }
    },
    ga2iOS() {
      if (this.$nuxt.$route.path === '/event-ios') {
        this.$ga.event('insdl', 'download', 'hpiosdls1-ad');
        window.location.href = this.$constant.app.download.ios1;
      } else {
        this.$ga.event('insdl', 'download', 'hpiosdls1');

        this.$store.commit('enIosLinkCt', this.$store.state.adQueryCampaignHome);
        window.location.href
          = `${this.$store.state.enIosLink}`
          + `?pt=${this.$store.state.enIosLinkPt}`
          + `&ct=${this.$store.state.enIosLinkCt}`
          + `&mt=8`;
      }
    },
    ga3Android() {
      if (this.$i18n.locale === 'en') {
        this.$ga.event('insdl', 'download', `hpappdls1`);
      } else {
        this.$ga.event('insdl', 'download', `hp8-${this.$i18n.locale}`);
      }
      if (this.$i18n.locale === 'fr' || this.$i18n.locale === 'de') {
        // window.location.href = `${this.$constant.app.download.android}?lang=${this.$i18n.locale}`;

        // Beacon:MinorAppDownload
        location.href = this.$store.state.minorLangAdrLink;
      } else {
        window.location.href = this.$store.state.enAdrLink;
      }
    },
    ga3Ios() {
      if (this.$i18n.locale === 'en') {
        this.$ga.event('insdl', 'download', `hpiosdls1`);
        window.location.href
          = `${this.$store.state.enIosLink}`
          + `?pt=${this.$store.state.enIosLinkPt}`
          + `&ct=${this.$store.state.enIosLinkCt}`
          + `&mt=8`;
      } else {
        this.$ga.event('insdl', 'download', `hp9-${this.$i18n.locale}`);
        // location.href
        //   = this.$constant.app.download.ios
        //   + `${this.$constant.app.campaign.iosMinorLang}&ct=${this.$i18n.locale}campaign`;

        // Beacon:MinorAppDownload
        location.href = this.$store.state.minorLangIosLink;
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
        `hp${this.$store.state.platform}dl${this.$store.state.gaColor}5`
      );
      location.href = url;
    }
  }
};
</script>

<style lang="scss" scoped>
@include animateSteps(2);

.home-3-steps {
  position: relative;
  padding-top: 130px;
  padding-bottom: 30px;
  width: 100%;
  background: #fff url("~@/assets/images/home/home-3-steps/home-3-steps__bg.svg") no-repeat top center;
  background-size: 100% 591px;

  &:before {
    position: absolute;
    top: 20px;
    left: 0;
    right: 0;
    margin: auto;
    display: block;
    width: 1092px;
    height: 517px;
    background: url("~@/assets/images/home/home-3-steps/home-3-steps__bg_dots.svg") no-repeat center;
    background-size: contain;
    content: "";
  }

  .wrapper {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  .unit {
    padding: 50px 20px 34px;
    width: 320px;
    background: #FFFFFF;
    box-shadow: 0 10px 20px #0000A129;
    border-radius: 12px;
    text-align: center;

    h3 {
      margin-top: 15px;
      font: 600 24px Montserrat;
      color: #2A2A2A;
    }

    p {
      margin-top: 18+15px;
      font: 400 20px/36px Montserrat;
    }

    p.safe {
      font-size: 0;
      margin-top: 18+15px;

      i {
        margin-right: 10px;
        display: inline-block;
        width: 20px;
        height: 24px;
        background: url("~@/assets/images/global/icon_safe.svg") center/contain no-repeat;
        vertical-align: middle;
      }

      span {
        font: 400 20px/36px Montserrat;
        color: #000000;
        vertical-align: middle;
      }
    }

    .btn-container {
      margin-top: 36px;
      width: 100%;
      height: 80px;
    }

    &.center {
      // padding-bottom: 84px;

      .btn-container {
        // margin-top: 86px;
      }
    }

    .download-container {
      margin-top: 42px;

      a {
        position: relative;
        margin: 0 16px;
        display: inline-block;
        width: 60px;
        height: 60px;
        background-color: rgba(0, 0, 0, 0.1);
        border-radius: 50%;
        overflow: hidden;
        transition: all 0.3s;


        img {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          margin: auto;
          content: "";
          display: block;
          width: 25px;
          height: 29px;
          background-repeat: no-repeat;
          background-position: center;
          background-size: contain;
          transition: all 0.3s;
        }

        &.ios {
          img {
            transform: translateY(-2px);
          }
        }

        &:hover {
          background-color: #6666FF;

          img {
            filter: brightness(10);
          }
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .home-3-steps {
    padding-top: (130px/2);
    background-size: 100% (517px/2);

    &:before {
      top: 0;
      width: 100%;
      height: (517px/2);
    }

    .wrapper {
      padding: 0 14vw;
      display: block;
    }

    .unit {
      margin-top: 9.6vw;
      padding: 6.67vw 5.33vw 8vw;
      width: 100%;

      &:first-child {
        margin-top: 0;
      }

      img {
        width: 16.27vw;
      }

      h3 {
        margin-top: (32px/2);
        font-size: (32px/2);
      }

      p {
        margin-top: (18px/2);
        font: 400 12px/18px Montserrat;
      }

      p.safe {
        font-size: 0;
        margin-top: (18px/2);

        i {
          margin-right: 5px;
          width: 10px;
          height: 12px;
        }

        span {
          font: 400 12px/18px Montserrat;
        }
      }

      .btn-container {
        margin-top: (28px/2);
        height: 50px;
      }

      &.center {
        padding-bottom: 8vw;

        .btn-container {
          margin-top: (28px/2);
        }
      }
    }
  }
}
</style>

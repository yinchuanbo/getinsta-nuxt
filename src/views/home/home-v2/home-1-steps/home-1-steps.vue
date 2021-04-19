<template>
  <div ref="mark" :class="{ 'on': animateBegin }" class="home-1-steps home__sec">
    <div class="wrapper">
      <h2 class="home__sec_h2 step-0">
        <i>How to</i><br> Get Free Instagram Followers and Likes
      </h2>

      <!--p EN & minor-lang-->
      <p class="home__sec_p step-1">
        {{ $t('home.home-1.subtitle0') }} {{ $store.state.productName }} {{ $t('home.home-1.subtitle1') }}
      </p>

      <div class="home-1-steps__steps-container pc">
        <div class="home-1-steps__steps-container_unit step-2">
          <i class="step-1" :class="{ download: $i18n.locale !== 'en' }"></i>
          <div class="text">
            <h3>{{ $t('home.home-1.step-1.title') }}</h3>
            <p>{{ $t('home.home-1.step-1.text-register') }}</p>
          </div>
        </div>
        <div class="home-1-steps__steps-container_arrow step-3"></div>
        <div class="home-1-steps__steps-container_unit step-4">
          <i class="step-2"></i>
          <div class="text" :class="{ 'minor-lang': $i18n.locale !== 'en' }">
            <h3>{{ $t('home.home-1.step-2.title') }}</h3>
            <p v-if="pageName === ''">{{ $t('home.home-1.step-2.text') }}</p>
            <p v-if="pageName === 'event-dl'">Get Real Followers & Likes</p>
          </div>
        </div>
      </div>

      <div class="home-1-steps__steps-container mobile">
        <div class="home-1-steps__steps-container_unit step-2">
          <i class="step-1">1</i>
          <div class="text">
            <!--            <h3>{{ $t('home.home-1.step-1.title') }}</h3>-->
            <p><b></b>{{ $t('home.home-1.step-1.text-download') }}</p>
          </div>
        </div>
        <div class="home-1-steps__steps-container_arrow step-3"></div>
        <div class="home-1-steps__steps-container_unit step-4">
          <i class="step-2">2</i>
          <div class="text">
            <!--            <h3>{{ $t('home.home-1.step-2.title') }}</h3>-->
            <p v-if="pageName === ''"><b></b>{{ $t('home.home-1.step-2.text') }}</p>
            <p v-if="pageName === 'event-dl'"><b></b>Get Real Followers & Likes</p>
          </div>
        </div>
      </div>

      <!--btn DownloadFor -->
      <div class="home-1-steps__btn-container step-5" @click="downloadAppGate">
        <button-icon-ins class="button-hover-1" theme="gradiant" text="Get Free Followers" square shadow :icon="'ins'" font-size="size-15" />
      </div>

      <!--btn BuyNow-->
      <div v-if="!buyNowBtnHide" class="home-1-steps__btn-container second step-5" @click="ga01">
        <button-buy-now square :text="$t('home.home-1.btn.BuyNow1')" font-size="size-16" />
      </div>
    </div>
  </div>
</template>

<script>
// import ButtonPurple from '@/components/button/button-purple';
// import ButtonWhite from '@/components/button/button-white';
import ButtonBuyNow from '@/components/button/button-buy-now';
// import ButtonDownloadIos from '@/components/button/button-download-ios';
// import ButtonDownloadAndroid from '@/components/button/button-download-android';
// import ButtonThemeGradient from '@/components/button/button-theme-gradient';
// import ButtonThemeGradientPurple from '@/components/button/button-theme-gradient-purple';
import ButtonIconIns from '@/components/button/button-icon-ins';

export default {
  name: 'Home1StepsV2',
  components: {
    ButtonIconIns,
    // ButtonThemeGradientPurple,
    // ButtonThemeGradient,
    // ButtonDownloadAndroid,
    // ButtonDownloadIos,
    ButtonBuyNow
    // ButtonPurple
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
      animateBegin: false,
      buyNowBtnHide: false,
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
    this.buyNowBtnHide
      = (this.COMMON.getURLQuery('source') === 'google' && this.COMMON.isiOS())
      || this.$nuxt.$route.path === '/event-ios'
      || (this.COMMON.getURLQuery('s') === 'tiktok' && this.COMMON.isiOS())
      || (this.COMMON.getURLQuery('source') === 'google' && this.COMMON.isAndroid());
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
    ga0() {
      this.$ga.event('inslogin', 'login', 'hplogin2');
    },
    ga00() {
      this.$scrollTo('#home-2-free', { offset: -1 * this.COMMON.headerHeight() });
      this.$ga.event('insdl', 'download', `hp1-${this.$i18n.locale}`);
    },
    ga01() {
      this.$ga.event('insbuy', 'buy', `hp${this.$store.state.platform}buynew2`);
      this.$nuxt.$router.push({
        path: '/buy-instagram-followers'
      });
    },
    downloadAppGate() {
      if (this.COMMON.isMobile())
        this.downloadApp();
      else {
        this.$ga.event('inslogin', 'login', `hploginnew2`);
        this.$nuxt.$router.push('/login');
      }
    },
    downloadApp() {
      if (this.COMMON.isiOS()) {
        if (this.$nuxt.$route.path === '/event-ios') {
          this.$ga.event('insdl', 'download', 'hpiosdlm2-ad');
          window.location.href = this.$constant.app.download.ios1;
        } else {
          this.$ga.event('insdl', 'download', `hp${this.$store.state.platform}dlnew2`);

          this.$store.commit('enIosLinkCt', this.$store.state.adQueryCampaignHome);
          window.location.href
            = `${this.$store.state.enIosLink}`
            + `?pt=${this.$store.state.enIosLinkPt}`
            + `&ct=${this.$store.state.enIosLinkCt}`
            + `&mt=8`;
        }
      } else {
        this.$ga.event('insdl', 'download', `hp${this.$store.state.platform}dlnew2`);
        window.location.href
          = this.$constant.app.download.androidGooglePlay1
          + this.$constant.app.campaign.androidReferrerQuery
          + this.$store.state.enAdrLinkGpReferrer;
      }
    },
    downloadAppMinorLang() {
      if (this.COMMON.isiOS()) {
        this.$ga.event('insdl', 'download', `hpios2-${this.$i18n.locale}`);
        // location.href =
        //   this.$constant.app.download.ios
        //   + `${this.$constant.app.campaign.iosMinorLang}&ct=${this.$i18n.locale}campaign`;

        // Beacon:MinorAppDownload
        location.href = this.$store.state.minorLangIosLink;
      } else {
        this.$ga.event('insdl', 'download', `hpadr2-${this.$i18n.locale}`);
        if (this.$i18n.locale === 'fr' || this.$i18n.locale === 'de') {
          // location.href = `${this.$constant.app.download.android}?lang=${this.$i18n.locale}`;

          // Beacon:MinorAppDownload
          location.href = this.$store.state.minorLangAdrLink;
        } else {
          location.href = this.$constant.app.download.android;
        }
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
        `hp${this.$store.state.platform}dl${this.$store.state.gaColor}2`
      );
      location.href = url;
    },
    gaBuyTest() {
      this.$ga.event(
        'insbuy',
        'buy',
        `hp${this.$store.state.platform}dl${this.$store.state.gaColor}2`
      );
      this.$nuxt.$router.push({ path: '/buy-instagram-followers' });
    },
    gaBtnGateBuy() {
      this.$store.state.btnTestGate ? this.gaBuyTest() : this.ga01();
    }
  }
};
</script>

<style lang="scss" scoped>
@include animateSteps(5);

.home-1-steps {
  background-color: #F1F4F6;
  text-align: center;

  .home__sec_h2, .home__sec_p {
    text-align: center;
  }

  .home-1-steps__steps-container {
    margin-top: 80px;
    display: flex;
    justify-content: center;
    align-items: center;

    .home-1-steps__steps-container_unit {
      padding-top: 44px;
      display: inline-block;
      width: 286px;
      height: 140px;
      background: #FFFFFF;
      border-radius: 12px;

      i {
        position: absolute;
        top: -30px;
        left: 112px;
        display: inline-block;
        width: 60px;
        height: 60px;
        box-shadow: 0 10px 20px #462CFF45;
        border-radius: 50%;
        background-color: #6257FF;
        background-repeat: no-repeat;
        background-position: center;

        &.step-1 {
          background-image: url("img/icon_download-pc.svg");
          background-size: 29px 27px;
        }

        &.step-2 {
          background-image: url("img/icon_add-pc.svg");
          background-size: 35px 19px;
        }
      }

      .text {
        display: inline-block;
        width: 100%;
        text-align: center;

        h3 {
          font: normal normal 600 20px/30px BalooChettan;
          color: #000000;
        }

        p {
          font: normal normal 500 16px/23px BalooChettan;
          color: #7F8498;
        }
      }
    }

    .home-1-steps__steps-container_arrow {
      margin: 0 50px;
      display: inline-block;
      width: 108px;
      height: 29px;
      background-image: url("img/icon_arrow.svg");
      background-position: center;
      background-repeat: no-repeat;
      background-size: contain;
    }
  }

  .home-1-steps__btn-container {
    margin: 100px auto 0;
    width: 277px;
    height: 60px;

    &.second {
      margin-top: 12px;
    }
  }
}

@media (max-width: 768px) {
  .home-1-steps {
    .home-1-steps__steps-container {
      margin-top: 25px;
      padding: 0 10.93vw;
      display: block;
      //justify-content: space-around;
      //align-items: flex-start;

      &.pc {
        display: none;
      }

      .home-1-steps__steps-container_unit {
        position: relative;
        margin: 0 auto;
        padding: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: row;
        width: 270px;
        height: 59px;
        background: url("img/step-container.svg") center no-repeat;
        background-size: contain;
        box-shadow: none;
        border-radius: 0;
        text-align: center;

        i {
          position: absolute;
          top: 18px;
          left: -14px;
          width: 24px;
          height: 24px;
          box-shadow: 0 3px 6px rgba(70, 44, 255, 0.16);
          border-radius: 50%;
          background-color: #6257FF;
          background-image: none !important;
          background-size: auto !important;
          font: normal 500 14px/24px BalooChettan;
          color: #FFFFFF;
          text-align: center;
        }

        .text {
          margin: 0;
          padding-top: 0;
          width: 100%;

          h3 {
            font-size: 12px;
          }

          p {
            margin-top: 0;
            font: normal 600 14px/21px BalooChettan;
          }

          b {
            margin-right: 12px;
            display: inline-block;
            background-size: contain;
            background-repeat: no-repeat;
            vertical-align: middle;
          }
        }

        &.step-2 {
          .text {
            b {
              width: 21px;
              height: 19px;
              background-image: url("img/icon_download.svg");
            }
          }
        }

        &.step-4 {
          margin-top: 25px;

          .text {
            b {
              width: 24px;
              height: 13px;
              background-image: url("img/icon_add.svg");
            }
          }
        }
      }

      .home-1-steps__steps-container_arrow {
        margin-top: (58px/2);
        width: (66px/2);
        height: (66px/2);
        display: none;
      }
    }

    .home-1-steps__btn-container {
      margin-top: 50px;
      width: 277px;
      height: 60px;
    }
  }
}
</style>

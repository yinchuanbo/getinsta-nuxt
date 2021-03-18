<template>
  <div ref="mark" :class="{ 'on': animateBegin }" class="home-1-steps home__sec">
    <div class="wrapper">
      <!--h2 EN & minor-lang-->
      <h2
        v-if="pageName === '' && !($i18n.locale === 'de' && $store.state.isiOS)"
        class="home__sec_h2 step-0"
      >
        {{ $t('home.home-1.title') }}
      </h2>
      <!--h2 EN & minor-lang-->
      <h2
        v-if="pageName === '' && $i18n.locale === 'de' && $store.state.isiOS"
        class="home__sec_h2 step-0"
      >
        {{ $t('home.home-1.title-ios') }}
      </h2>
      <!--h2 EN AD-->
      <h2
        v-if="pageName === 'event-dl'"
        class="home__sec_h2 step-0"
      >
        How to Get Real Instagram Followers & Likes
      </h2>

      <!--p EN & minor-lang-->
      <p v-if="pageName === ''" class="home__sec_p step-1">
        {{ $t('home.home-1.subtitle0') }} {{ $store.state.productName }} {{ $t('home.home-1.subtitle1') }}
      </p>
      <!--p EN AD-->
      <p v-if="pageName === 'event-dl'" class="home__sec_p step-1">
        We provide unlimited real Instagram followers and real Instagram likes. It’s <b>TOTALLY SAFE</b> for you. Getting more Instagram followers & likes with {{ $store.state.productName }} is as simple as ABC.
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
          <i class="step-1"></i>
          <div class="text">
            <h3>{{ $t('home.home-1.step-1.title') }}</h3>
            <p>{{ $t('home.home-1.step-1.text-download') }}</p>
          </div>
        </div>
        <div class="home-1-steps__steps-container_arrow step-3"></div>
        <div class="home-1-steps__steps-container_unit step-4">
          <i class="step-2"></i>
          <div class="text">
            <h3>{{ $t('home.home-1.step-2.title') }}</h3>
            <p v-if="pageName === ''">{{ $t('home.home-1.step-2.text') }}</p>
            <p v-if="pageName === 'event-dl'">Get Real Followers & Likes</p>
          </div>
        </div>
      </div>

      <!--btn GetFreeFollowers&LikesNow PC-->
      <div v-if="!pageIOS" class="home-1-steps__btn-container pc step-5" @click="ga0">
        <router-link to="/login">
          <button-purple :text="$t('home.home-1.btn.GetFreeFollowers&LikesNow')" />
        </router-link>
      </div>

      <!--btn DownloadFor Mobile-->
      <div v-if="!$store.state.btnTestGate" class="home-1-steps__btn-container mobile step-5" @click="downloadAppGate">
        <!--        <button-download-ios v-if="$store.state.isiOS" />-->
        <!--        <button-download-android v-if="$store.state.isAndroid" />-->
        <button-theme-gradient-purple square shadow text="Get Free Followers" />
      </div>
      <div v-if="$store.state.btnTestGate && $store.state.downloadBtnTestA"
           class="home-1-steps__btn-container mobile step-5"
           @click="gaDownloadAPPTest"
      >
        <!--<button-purple-->
        <!--  :text="$store.state.isiOS ?-->
        <!--    $t('home.home-1.btn.DownloadForIphone') : $t('home.home-1.btn.DownloadForAndroid')"-->
        <!--  :icon="$store.state.isiOS ? 'ios' : 'android'"-->
        <!--/>-->
        <button-download-ios v-if="$store.state.isiOS" />
        <button-download-android v-if="$store.state.isAndroid" />
      </div>
      <div v-if="$store.state.btnTestGate && $store.state.downloadBtnTestB"
           class="home-1-steps__btn-container mobile step-5"
           @click="gaDownloadAPPTest"
      >
        <button-theme-gradient square shadow text="Get Free Followers" />
      </div>
      <div v-if="$store.state.btnTestGate && $store.state.downloadBtnTestC"
           class="home-1-steps__btn-container mobile step-5"
           @click="gaDownloadAPPTest"
      >
        <button-theme-gradient-purple square shadow text="Get Free Followers" />
      </div>

      <!--btn BuyNow-->
      <!--      <div v-if="!buyNowBtnHide"-->
      <!--           class="home-1-steps__btn-container second step-5"-->
      <!--           @click="ga01"-->
      <!--      >-->
      <!--        <button-buy-now :square="$store.state.isMobile" :text="$t('home.home-1.btn.BuyNow')" />-->
      <!--      </div>-->
      <div v-if="!buyNowBtnHide"
           class="home-1-steps__btn-container second step-5"
           @click="gaBuyTest"
      >
        <button-buy-now :square="$store.state.isMobile" :text="$t('home.home-1.btn.BuyNow')" />
      </div>
    </div>
  </div>
</template>

<script>
import ButtonPurple from '@/components/button/button-purple';
// import ButtonWhite from '@/components/button/button-white';
import ButtonBuyNow from '@/components/button/button-buy-now';
import ButtonDownloadIos from '@/components/button/button-download-ios';
import ButtonDownloadAndroid from '@/components/button/button-download-android';
import ButtonThemeGradient from '@/components/button/button-theme-gradient';
import ButtonThemeGradientPurple from '@/components/button/button-theme-gradient-purple';

export default {
  name: 'Home1Steps',
  components: {
    ButtonThemeGradientPurple,
    ButtonThemeGradient,
    ButtonDownloadAndroid,
    ButtonDownloadIos,
    ButtonBuyNow,
    ButtonPurple
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
      if (this.$i18n.locale === 'en') {
        this.$ga.event('insbuy', 'buy', 'hpbuy2');
        this.$nuxt.$router.push({
          path: '/buy-instagram-followers'
        });
      } else {
        let client = '';
        let clientLong = 'PC';
        if (this.COMMON.isAndroid()) {
          client = 'adr';
          clientLong = 'android';
        }

        this.$ga.event('insbuy', 'buy', `hp${client}1-${this.$i18n.locale}`);
        this.$nuxt.$router.push({
          path: '/buy-instagram-followers',
          query: {
            utm_source: clientLong,
            utm_medium: 'homepage'
          }
        });
      }
    },
    downloadAppGate() {
      // if (this.$i18n.locale === 'en') {
      this.downloadApp();
      // } else {
      //   this.downloadAppMinorLang();
      // }
    },
    downloadApp() {
      if (this.COMMON.isiOS()) {
        if (this.$nuxt.$route.path === '/event-ios') {
          this.$ga.event('insdl', 'download', 'hpiosdlm2-ad');
          window.location.href = this.$constant.app.download.ios1;
        } else {
          this.$ga.event('insdl', 'download', 'hpiosdlm2');

          this.$store.commit('enIosLinkCt', this.$store.state.adQueryCampaignHome);
          window.location.href
            = `${this.$store.state.enIosLink}`
            + `?pt=${this.$store.state.enIosLinkPt}`
            + `&ct=${this.$store.state.enIosLinkCt}`
            + `&mt=8`;
        }
      } else {
        this.$ga.event('insdl', 'download', 'hpappdlm2');
        if (this.$i18n.locale === 'fr' || this.$i18n.locale === 'de') {
          window.location.href = `${this.$constant.app.download.android}?lang=${this.$i18n.locale}`;
        } else {
          window.location.href = this.$store.state.enAdrLink;
        }
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
  background-color: #F8F9FC;
  text-align: center;

  .home-1-steps__steps-container {
    margin-top: 100px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .home-1-steps__steps-container_unit {
      text-align: left;
      padding: 20px 0 20px 34px;
      display: inline-block;
      width: 450px;
      height: 170px;
      background: #FFFFFF;
      box-shadow: 0 5px 20px #00000008;
      border-radius: 12px;

      i {
        display: inline-block;
        width: 80px;
        height: 130px;
        vertical-align: top;
        background-repeat: no-repeat;
        background-position: center;
        background-size: contain;

        &.step-1 {
          background-image: url("~@/assets/images/home/home-1-steps/home-1-steps__step-1.svg");

          &.download {
            background-image: url("~@/assets/images/home/home-1-steps/home-1-steps__step-1_mobile.svg");
          }
        }

        &.step-2 {
          background-image: url("~@/assets/images/home/home-1-steps/home-1-steps__step-2.svg");
        }
      }

      .text {
        margin-left: 10px;
        padding-top: 30px;
        display: inline-block;
        width: 310px;

        &.minor-lang {
          padding-top: 18px;

          p {
            margin-top: 12px;
          }
        }

        h3 {
          font: 600 24px Montserrat;
          color: #000000;
        }

        p {
          margin-top: 24px;
          font: 500 20px Montserrat;
          color: #000000;
        }
      }
    }

    .home-1-steps__steps-container_arrow {
      display: inline-block;
      width: 85px;
      height: 85px;
      background-image: url("~@/assets/images/home/home-1-steps/home-1-steps__arrow.svg");
      background-position: center;
      background-repeat: no-repeat;
      background-size: contain;
    }
  }

  .home-1-steps__btn-container {
    margin-top: 138px;
    display: inline-block;
    vertical-align: top;
    width: 490px;
    height: 100px;

    &.second {
      margin-left: 32px;
    }
  }
}

@media (min-width: 769px) {
  .home-1-steps {
    .home-1-steps__steps-container {
      &.mobile {
        display: none;
      }
    }
  }
}

@media (max-width: 768px) {
  .home-1-steps {
    .home-1-steps__steps-container {
      margin-top: 50px;
      padding: 0 10.93vw;
      display: flex;
      justify-content: space-around;
      align-items: flex-start;

      &.pc {
        display: none;
      }

      .home-1-steps__steps-container_unit {
        padding: 0;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-direction: column;
        width: 36%;
        height: auto;
        background: none;
        box-shadow: none;
        border-radius: 0;
        text-align: center;

        i {
          width: (170px/2);
          height: (170px/2);
          box-shadow: 0 3px 10px #00000008;
          border-radius: 50%;
          background-color: #FFFFFF;
          background-size: contain;
          background-repeat: no-repeat;
          background-position: center;

          &.step-1 {
            background-size: 50%;
            background-image: url("~@/assets/images/home/home-1-steps/home-1-steps__step-1_mobile.svg");
          }

          &.step-2 {
            background-size: 48%;
          }
        }

        .text {
          margin: 0;
          padding-top: 15px;
          width: 100%;

          h3 {
            font-size: 12px;
          }

          p {
            margin-top: 4px;
            font-size: 11px;
          }
        }
      }

      .home-1-steps__steps-container_arrow {
        margin-top: (58px/2);
        width: (66px/2);
        height: (66px/2);
      }
    }

    .home-1-steps__btn-container {
      margin-top: 70px;
      width: (422px/2);
      height: (112px/2);

      &.second {
        margin-left: 0;
        margin-top: 16px;
      }
    }
  }
}
</style>

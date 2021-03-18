<template>
  <div ref="mark" :class="{ 'on': animateBegin }" class="home-2-free home__sec">
    <div class="wrapper">
      <h2 v-if="pageName === ''" class="home__sec_h2 step-0">
        {{ $t('home.home-7.title.text0') }}{{ $store.state.productName }}{{ $t('home.home-7.title.text1') }}
      </h2>
      <h2 v-if="pageName === 'event-dl'" class="home__sec_h2 step-0">
        Download {{ $store.state.productName }} to Get Real Followers & Likes Instantly!
      </h2>

      <p v-if="pageName === ''" class="home__sec_p step-1">
        {{ $t('home.home-7.subtitle.text0') }}{{ $store.state.productName }}{{ $t('home.home-7.subtitle.text1') }}
      </p>

      <p v-if="pageName === 'event-dl'" class="home__sec_p step-1">
        Download {{ $store.state.productName }} and earn more coins to get real Instagram followers and likes now.
      </p>

      <div class="home-2-free__btn-container step-2">
        <!--        downloadWindows PC-->
        <span v-if="!pageIOS && $i18n.locale === 'en'" class="pc" @click="downloadWindows">
          <button-download-windows />
        </span>
        <!--        BuyNow PC-->
        <span v-if="!pageIOS && $i18n.locale !== 'en'" class="btn pc" @click="gaBuyNow">
          <button-buy-now :text="$t('home.home-1.btn.BuyNow')" :font-size="'size-16'" :square="true" />
        </span>
        <div v-if="!pageIOS" class="blank pc"></div>
        <!--        downloadAndroid PC-->
        <span v-if="!pageIOS" class="pc" @click="downloadAndroid">
          <button-download-android />
        </span>
        <div v-if="!pageIOS" class="blank pc"></div>
        <!--        downloadIOS PC-->
        <span class="pc" @click="downloadIOS">
          <button-download-ios />
        </span>

        <!--        download Mobile-->
        <!--        downloadAndroid Mobile-->
        <span v-if="!$store.state.btnTestGate && !$store.state.isiOS" class="w-211-h-56 mobile" @click="downloadAndroid">
          <!--          <button-download-android />-->
          <button-theme-gradient-purple square shadow text="Get Free Followers" />
        </span>
        <div v-if="!$store.state.btnTestGate" class="mobile blank"></div>
        <!--        downloadIOS Mobile-->
        <span v-if="!$store.state.btnTestGate && $store.state.isiOS" class="w-211-h-56 mobile" @click="downloadIOS">
          <!--          <button-download-ios />-->
          <button-theme-gradient-purple square shadow text="Get Free Followers" />
        </span>
        <div v-if="$store.state.btnTestGate && $store.state.downloadBtnTestA"
             @click="gaDownloadAPPTest"
        >
          <!--        downloadAndroid Mobile-->
          <span v-if="!$store.state.isiOS" class="mobile">
            <button-download-android />
          </span>
          <div class="mobile blank"></div>
          <!--        downloadIOS Mobile-->
          <span v-if="$store.state.isiOS" class="mobile">
            <button-download-ios />
          </span>
        </div>
        <div v-if="$store.state.btnTestGate && $store.state.downloadBtnTestB"
             class="mobile w-211-h-56" @click="gaDownloadAPPTest"
        >
          <button-theme-gradient text="Get Free Followers" square shadow :icon="'ins'" font-size="size-15" />
        </div>
        <div v-if="$store.state.btnTestGate && $store.state.downloadBtnTestC"
             class="mobile w-211-h-56" @click="gaDownloadAPPTest"
        >
          <button-theme-gradient-purple text="Get Free Followers" square shadow :icon="'ins'" font-size="size-15" />
        </div>

        <!--safe & clean-->
        <p class="home-2-free__p step-3"><i></i><span>{{ $t('home.home-7.safe') }}</span></p>
      </div>
    </div>
  </div>
</template>

<script>
import ButtonDownloadAndroid from '@/components/button/button-download-android';
// import ButtonDownloadWindowsYellow from '@/components/button/button-download-windows-yellow';
import ButtonDownloadIos from '@/components/button/button-download-ios';
import ButtonBuyNow from '@/components/button/button-buy-now';
import ButtonDownloadWindows from '@/components/button/button-download-windows';
import ButtonThemeGradient from '@/components/button/button-theme-gradient';
import ButtonThemeGradientPurple from '@/components/button/button-theme-gradient-purple';

export default {
  name: 'Home7Download',
  components: {
    ButtonThemeGradientPurple,
    ButtonThemeGradient,
    ButtonDownloadWindows,
    ButtonBuyNow,
    // ButtonDownloadWindowsYellow,
    ButtonDownloadIos,
    ButtonDownloadAndroid
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
      pageIOS: false
    };
  },
  computed: {},
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
    downloadIOS() {
      if (this.$i18n.locale === 'en') {
        if (this.$nuxt.$route.path === '/event-ios') {
          this.$ga.event('insdl', 'download', 'hpiosdl2-ad');
          window.location.href = this.$constant.app.download.ios1;
        } else {
          this.$ga.event('insdl', 'download', 'hpiosdl2');

          this.$store.commit('enIosLinkCt', this.$store.state.adQueryCampaignHome);
          window.location.href
            = `${this.$store.state.enIosLink}`
            + `?pt=${this.$store.state.enIosLinkPt}`
            + `&ct=${this.$store.state.enIosLinkCt}`
            + `&mt=8`;
        }
      } else {

        let client = '';
        let clientLong = 'PC';
        if (this.COMMON.isAndroid()) {
          client = 'adr';
          clientLong = 'android';
        } else if (this.COMMON.isiOS()) {
          client = 'ios';
          clientLong = 'ios';
        }

        this.$ga.event('insdl', 'download', `hp${client}4-${this.$i18n.locale}`);
        // window.location.href
        //   = this.$constant.app.download.ios
        //   + `${this.$constant.app.campaign.iosMinorLang}&ct=${this.$i18n.locale}campaign`;

        // Beacon:MinorAppDownload
        location.href = this.$store.state.minorLangIosLink;
      }
    },
    downloadAndroid() {
      if (this.$i18n.locale === 'en') {
        this.$ga.event('insdl', 'download', 'hpappdl2');
      } else {
        let client = '';
        let clientLong = 'PC';
        if (this.COMMON.isAndroid()) {
          client = 'adr';
          clientLong = 'android';
        } else if (this.COMMON.isiOS()) {
          client = 'ios';
          clientLong = 'ios';
        }

        this.$ga.event('insdl', 'download', `hp${client}5-${this.$i18n.locale}`);
      }
      if (this.$i18n.locale === 'fr' || this.$i18n.locale === 'de') {
        // window.location.href = `${this.$constant.app.download.android}?lang=${this.$i18n.locale}`;

        // Beacon:MinorAppDownload
        location.href = this.$store.state.minorLangAdrLink;
      } else {
        window.location.href = this.$store.state.enAdrLink;
      }
    },
    downloadWindows() {
      this.$ga.event('insdl', 'download', 'hpwindl2');
      window.location.href = this.$constant.app.download.windows;
    },
    gaBuyNow() {
      this.$ga.event('insbuy', 'buy', `hp4-${this.$i18n.locale}`);
      this.$nuxt.$router.push({
        path: '/buy-instagram-followers',
        query: {
          utm_source: 'PC',
          utm_medium: 'homepage'
        }
      });
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
        `hp${this.$store.state.platform}dl${this.$store.state.gaColor}6`
      );
      location.href = url;
    }
  }
};
</script>

<style lang="scss" scoped>
@include animateSteps(5);

.home-2-free {
  text-align: center;

  .home-2-free__btn-container {
    margin-top: 66px;
    margin-bottom: 66px;
    display: inline-block;

    .blank {
      display: inline-block;
      vertical-align: middle;
      width: 32px;
      height: 1px;
    }

    .btn {
      display: inline-block;
      width: 240px;
      height: 80px;
      vertical-align: top;
    }
  }

  .home__sec_h2 {
    font: 600 40px/50px Montserrat;
  }

  .home-2-free__p {
    margin-top: 42px;
    font-size: 0;

    i {
      margin-right: 16px;
      display: inline-block;
      width: 20px;
      height: 24px;
      background: url("~@/assets/images/global/icon_safe.svg") no-repeat center;
      background-size: contain;
      vertical-align: middle;
    }

    span {
      font: 500 20px Montserrat;
      color: #000;
      vertical-align: middle;
    }
  }

  .home-2-free__img {
    margin-top: 42px;
  }
}

@media (max-width: 768px) {
  .home-2-free {
    .home-2-free__btn-container {
      margin-top: 30px;
      margin-bottom: 44px;

      .blank {
        display: none;
      }
    }

    .home__sec_h2 {
      font: 600 20px/25px Montserrat;
    }

    .home-2-free__p {
      margin-top: 12px;

      span {
        font-size: (20px/2);
      }

      i {
        width: 15px;
        height: 20px;
      }
    }

    .home-2-free__img {
      margin-top: 30px;
    }
  }
}
</style>

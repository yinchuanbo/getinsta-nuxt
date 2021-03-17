<template>
  <div
    id="home-2-free"
    ref="mark"
    :class="{ 'on': animateBegin }"
    class="home-2-free home__sec"
  >
    <div class="wrapper">
      <h2 class="home__sec_h2 step-0">{{ $t('home.home-2.title') }}</h2>
      <p class="home__sec_p step-1">
        {{ $t('home.home-2.subtitle0') }}{{ $store.state.productName }}{{ $t('home.home-2.subtitle1') }}
      </p>

      <!--buttons-->
      <div class="home-2-free__btn-container step-2">
        <!--        downloadWindows PC-->
        <span v-if="!pageIOS && $i18n.locale === 'en'" class="pc" @click="downloadWindows">
          <!--          <button-download-windows-yellow  />-->
          <button-download-windows />
        </span>

        <!--        BuyNow PC-->
        <span v-if="!pageIOS && $i18n.locale !== 'en'" class="btn pc" @click="gaBuyNow">
          <button-buy-now :text="$t('home.home-1.btn.BuyNow')" :font-size="'size-16'" :square="true" />
        </span>
        <div v-if="!pageIOS && !$store.state.isMobile" class="blank pc"></div>

        <!--        downloadAndroid PC-->
        <span v-if="!pageIOS" class="pc" @click="downloadAndroid">
          <button-download-android />
        </span>
        <div v-if="!pageIOS" class="blank pc"></div>

        <!--        downloadIOS PC-->
        <span v-if="!$store.state.hideIosMinorLang" class="pc" @click="downloadIOS">
          <button-download-ios />
        </span>

        <!--        download Mobile-->
        <!--        downloadAndroid Mobile-->
        <span v-if="!$store.state.btnTestGate && $store.state.isAndroid" class="btn mobile" @click="downloadAndroid">
          <!--          <button-download-android />-->
          <button-theme-gradient-purple square shadow text="Get Free Followers" />
        </span>
        <!--        downloadIOS Mobile-->
        <span v-if="!$store.state.btnTestGate && $store.state.isiOS" class="btn mobile" @click="downloadIOS">
          <!--          <button-download-ios />-->
          <button-theme-gradient-purple square shadow text="Get Free Followers" />
        </span>
        <span v-if="$store.state.btnTestGate && $store.state.downloadBtnTestA">
          <!--        downloadAndroid Mobile-->
          <span v-if="$store.state.isAndroid" class="mobile" @click="gaDownloadAPPTest">
            <button-download-android />
          </span>
          <!--        downloadIOS Mobile-->
          <span v-if="$store.state.isiOS" class="mobile" @click="gaDownloadAPPTest">
            <button-download-ios />
          </span>
        </span>
        <span v-if="$store.state.btnTestGate && $store.state.downloadBtnTestB" class="btn" @click="gaDownloadAPPTest">
          <button-theme-gradient square shadow text="Get Free Followers" font-size="size-15" />
        </span>
        <span v-if="$store.state.btnTestGate && $store.state.downloadBtnTestC" class="btn" @click="gaDownloadAPPTest">
          <button-theme-gradient-purple square shadow text="Get Free Followers" font-size="size-15" />
        </span>
      </div>

      <p v-if="!$store.state.isiOS" class="home-2-free__p step-3">
        <i></i><span>{{ $t('home.home-2.safe') }}</span>
      </p>
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
  name: 'Home2Free',
  components: {
    ButtonThemeGradientPurple,
    ButtonThemeGradient,
    ButtonDownloadWindows,
    ButtonBuyNow,
    // ButtonDownloadWindowsYellow,
    ButtonDownloadIos,
    ButtonDownloadAndroid
  },
  data() {
    return {
      animateBegin: false,
      pageIOS: false
    };
  },
  mounted() {
    window.addEventListener('scroll', this.handle);
    this.pageIOS = this.$route.path === '/event-ios';
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
        if (this.$route.path === '/event-ios') {
          this.$ga.event('insdl', 'download', 'hpiosdl1-ad');
          window.location.href = this.$constant.app.download.ios1;
        } else {
          this.$ga.event('insdl', 'download', 'hpiosdl1');

          this.$store.commit('enIosLinkCt', this.$store.state.adQueryCampaignHome);
          window.location.href
            = `${this.$store.state.enIosLink}`
            + `?pt=${this.$store.state.enIosLinkPt}`
            + `&ct=${this.$store.state.enIosLinkCt}`
            + `&mt=8`;
        }
      } else {
        this.$ga.event('insdl', 'download', `hp3-${this.$i18n.locale}`);
        // window.location.href
        //   = this.$constant.app.download.ios
        //   + `${this.$constant.app.campaign.iosMinorLang}&ct=${this.$i18n.locale}campaign`;

        // Beacon:MinorAppDownload
        location.href = this.$store.state.minorLangIosLink;
      }
    },
    downloadAndroid() {
      if (this.$i18n.locale === 'en') {
        this.$ga.event('insdl', 'download', 'hpappdl1');
      } else {
        if (this.COMMON.isAndroid()) {
          this.$ga.event('insdl', 'download', `hpadr3-${this.$i18n.locale}`);
        } else {
          this.$ga.event('insdl', 'download', `hp2-${this.$i18n.locale}`);
        }
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
      this.$ga.event('insdl', 'download', 'hpwindl1');
      window.location.href = this.$constant.app.download.windows;
    },
    gaBuyNow() {
      let client = '';
      let clientLong = 'PC';
      if (this.COMMON.isAndroid()) {
        client = 'adr';
        clientLong = 'android';
      }
      this.$ga.event('insbuy', 'buy', `hp2-${this.$i18n.locale}`);
      this.$router.push({
        path: '/buy-instagram-followers',
        query: {
          utm_source: clientLong,
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
        `hp${this.$store.state.platform}dl${this.$store.state.gaColor}4`
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

  .home-2-free__p {
    position: relative;
    margin-top: 42px;
    font-size: 0;
    z-index: -1;

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
      margin-bottom: 0;

      .blank {
        display: none;
      }

      .btn {
        width: 211px;
        height: 56px;
      }
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

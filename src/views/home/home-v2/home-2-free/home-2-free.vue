<template>
  <div id="home-2-free" ref="mark" :class="{ 'on': animateBegin }" class="home-2-free home__sec">
    <div class="wrapper">
      <div class="text">
        <h2 class="home__sec_h2 step-0"><i>How do we</i><br>Make "FREE" Possible</h2>
        <p class="home__sec_p step-1">
          {{ $t('home.home-2.subtitle0') }}{{ $store.state.productName }}{{ $t('home.home-2.subtitle1') }}
        </p>

        <div class="home-2-free__btn-container pc step-2">
          <div class="btn" @click="btnActionGate">
            <button-icon-ins class="button-hover-1" text="Get Free Followers" square shadow :icon="'ins'" font-size="size-15" theme="gradiant" />
          </div>
        </div>
      </div>

      <div class="step-container">
        <div class="unit n-0 step-2">
          <i>1</i>
          <div class="icon-text">
            <div class="icon download"><b></b></div>
            <h3>Create Account</h3>
            <p>Log in & get coins</p>
          </div>
        </div>
        <div class="line step-3"></div>
        <div class="unit n-1 step-4">
          <i>2</i>
          <div class="icon-text">
            <div class="icon add"><b></b></div>
            <h3>Get Followers & Likes</h3>
            <!-- <p>Get followers & likes</p> -->
            <p>Get free followers</p>
            <p>Get free likes</p>
          </div>
        </div>
      </div>

      <!--buttons-->
      <div class="home-2-free__btn-container step-2">
        <!--downloadWindows PC-->
        <!--        <span v-if="!pageIOS" class="pc" @click="downloadWindows">-->
        <!--          &lt;!&ndash;          <button-download-windows-yellow  />&ndash;&gt;-->
        <!--          <button-download-windows />-->
        <!--        </span>-->

        <!--BuyNow PC-->
        <!--        <span v-if="!pageIOS && $i18n.locale !== 'en'" class="btn pc" @click="gaBuyNow">-->
        <!--          <button-buy-now :text="$t('home.home-1.btn.BuyNow')" :font-size="'size-16'" :square="true" />-->
        <!--        </span>-->
        <!--        <div v-if="!pageIOS && !$store.state.isMobile" class="blank pc"></div>-->

        <!--downloadAndroid PC-->
        <!--        <span v-if="!pageIOS" class="pc" @click="downloadAndroid">-->
        <!--          <button-download-android />-->
        <!--        </span>-->
        <!--        <div v-if="!pageIOS" class="blank pc"></div>-->

        <!--downloadIOS PC-->
        <!--        <span v-if="!$store.state.hideIosMinorLang" class="pc" @click="downloadIOS">-->
        <!--          <button-download-ios />-->
        <!--        </span>-->

        <!--download Mobile-->
        <div class="btn mobile" @click="gaDownload">
          <button-icon-ins text="Get Free Followers" square shadow :icon="'ins'" font-size="size-15" theme="gradiant" />
        </div>
      </div>

      <!--      <p v-if="!$store.state.isiOS" class="home-2-free__p step-3">-->
      <!--        <i></i><span>{{ $t('home.home-2.safe') }}</span>-->
      <!--      </p>-->
    </div>
  </div>
</template>

<script>
// import ButtonDownloadAndroid from '@/components/button/button-download-android';
// import ButtonDownloadWindowsYellow from '@/components/button/button-download-windows-yellow';
// import ButtonDownloadIos from '@/components/button/button-download-ios';
// import ButtonBuyNow from '@/components/button/button-buy-now';
// import ButtonDownloadWindows from '@/components/button/button-download-windows';
// import ButtonThemeGradient from '@/components/button/button-theme-gradient';
// import ButtonThemeGradientPurple from '@/components/button/button-theme-gradient-purple';
import ButtonIconIns from '@/components/button/button-icon-ins';

export default {
  name: 'Home2FreeV2',
  components: {
    ButtonIconIns
    // ButtonThemeGradientPurple,
    // ButtonThemeGradient,
    // ButtonDownloadWindows,
    // ButtonBuyNow,
    // ButtonDownloadWindowsYellow,
    // ButtonDownloadIos,
    // ButtonDownloadAndroid
  },
  data() {
    return {
      animateBegin: false,
      pageIOS: false
    };
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
    downloadIOS() {
      if (this.$nuxt.$route.path === '/event-ios') {
        this.$ga.event('insdl', 'download', 'hpiosdl1-ad');
        window.location.href = this.$constant.app.download.ios1;
      } else {
        this.$ga.event('insdl', 'download', 'hpiosdlnew4');

        this.$store.commit('enIosLinkCt', this.$store.state.adQueryCampaignHome);
        window.location.href
          = `${this.$store.state.enIosLink}`
          + `?pt=${this.$store.state.enIosLinkPt}`
          + `&ct=${this.$store.state.enIosLinkCt}`
          + `&mt=8`;
      }
    },
    downloadAndroid() {
      this.$ga.event('insdl', 'download', 'hpappdlnew4');
      window.location.href
        = this.$constant.app.download.androidGooglePlay1
        + this.$constant.app.campaign.androidReferrerQuery
        + this.$store.state.enAdrLinkGpReferrer;
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
      this.$nuxt.$router.push({
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
    },

    // v2
    btnActionGate() {
      if (this.COMMON.isMobile())
        this.gaDownload();
      else
        this.gaLogin();
    },
    gaDownload() {
      if (this.COMMON.isiOS())
        this.downloadIOS();
      else if (this.COMMON.isAndroid())
        this.downloadAndroid();
    },
    gaLogin() {
      this.$ga.event('inslogin', 'login', 'hploginnew4');
      this.$nuxt.$router.push('/login');
    }
  }
};
</script>

<style lang="scss" scoped>
@include animateSteps(5);

.home-2-free {
  background-color: #F1F4F6;
  text-align: center;

  .text {
    display: inline-block;
    width: 552px;
    text-align: left;
  }

  .home-2-free__btn-container {
    margin-top: 50px;
    display: inline-block;

    .blank {
      display: inline-block;
      vertical-align: middle;
      width: 32px;
      height: 1px;
    }

    .btn {
      display: inline-block;
      width: 277px;
      height: 60px;
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

  .step-container {
    position: relative;
    top: 50px;
    margin-left: 140px;
    display: inline-block;
    width: 375px;
    height: 304px;

    .unit {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      margin: auto;
      display: flex;
      justify-content: center;
      align-items: flex-end;
      height: 122px;

      &.n-0 {
        transform: translateX(43px) translateY(-132px);

        i {
          margin-right: -20px;
        }

        .icon-text {
          padding-left: 55px;
          background-image: url("img/bg-0.svg");
          text-align: left;
        }
      }

      &.n-1 {
        transform: translateX(-59px) translateY(48px);
        flex-direction: row-reverse;

        i {
          margin-left: -20px;
        }

        .icon-text {
          padding-right: 55px;
          background-image: url("img/bg-1.svg");
          text-align: right;
          align-items: flex-end;
        }
      }

      i {
        display: block;
        width: 40px;
        height: 40px;
        text-align: center;
        font: normal normal bold 20px/40px BalooChettan;
        color: #FFFFFF;
        background-color: #6257FF;
        border-radius: 50%;
      }

      .icon-text {
        display: flex;
        justify-content: center;
        align-items: flex-start;
        flex-direction: column;
        width: 302px;
        height: 122px;
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;

        .icon {
          position: relative;

          b {
            position: relative;
            z-index: 1;
            display: inline-block;
            width: 100%;
            height: 100%;
            background-position: center;
            background-repeat: no-repeat;
            background-size: contain;
          }

          &:before, &:after {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            display: block;
            border-radius: 50%;
            filter: blur(8px);
            animation: 1.6s assets-move infinite alternate;
            @keyframes assets-move {
              0% {
                transform: translateY(0);
              }
              100% {
                transform: translateX(-5px) translateY(2px);
              }
            }
          }

          &.download {
            width: 38px;
            height: 35px;

            b {
              background-image: url("img/icon-download.svg");
            }

            &:before {
              top: -1px;
              left: 10px;
              width: 30px;
              height: 30px;
              background-color: rgb(87, 255, 221);
            }

            &:after {
              top: 19px;
              left: 13px;
              width: 20px;
              height: 20px;
              background-color: rgb(255, 205, 87);
            }
          }

          &.add {
            width: 50px;
            height: 27px;

            b {
              background-image: url("img/icon-add.svg");
            }

            &:before {
              top: 4px;
              left: -1px;
              width: 30px;
              height: 30px;
              background-color: rgb(201, 155, 255);
            }
          }
        }

        h3 {
          font: normal normal 600 20px/25px BalooChettan;
          color: #000000;
        }

        p {
          font: normal normal 600 14px/20px BalooChettan;
          color: #7F8498;
        }
      }
    }

    .line {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      margin: auto;
      width: 195px;
      height: 138px;
      background: url("img/line.svg");
    }

    .unit {
      margin-top: 134px;
    }

    .line {
      margin-top: 126px;
    }
  }
}

@media (max-width: 768px) {
  .home-2-free {
    .text {
      width: 100%;
    }

    .home-2-free__btn-container {
      margin-top: 66px;
      margin-bottom: 0;

      .blank {
        display: none;
      }

      .btn {
        width: 277px;
        height: 60px;
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

    .step-container {
      top: 0;
      margin-top: 46px;
      margin-left: 0;
      width: 100%;
    }
  }
}
</style>

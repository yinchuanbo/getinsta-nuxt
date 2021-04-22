<template>
  <div
    ref="mark"
    :class="{ on: animateBegin }"
    class="home-7-download home__sec"
  >
    <div class="wrapper">
      <div class="img pc step-0"></div>
      <div class="text">
        <h2 class="home__sec_h2 step-1">
          {{ $t("home.home-7.title.text0") }}{{ $store.state.productName
          }}{{ $t("home.home-7.title.text1") }}
        </h2>

        <!-- <p class="home__sec_p mobile step-2">
          {{ $t('home.home-7.subtitle.text0') }}{{ $store.state.productName }}{{ $t('home.home-7.subtitle.text1') }}
        </p> -->

        <p class="home__sec_p step-2">
          {{ $t("home.home-7.subtitle.text0") }}{{ $store.state.productName
          }}{{ $t("home.home-7.subtitle.text1") }}
        </p>

        <div class="home-7-download__btn-container">
          <!--download-->
          <div class="btn step-3" @click="btnActionGate">
            <button-icon-ins
              class="button-hover-1"
              theme="gradiant"
              text="Get Free Followers"
              square
              shadow
              :icon="'ins'"
              font-size="size-15"
            />
          </div>

          <!--safe & clean-->
          <p class="home-7-download__p step-4">
            <span>Real Followers</span>
            <span>No Bots</span>
            <span>100% Safe & Clean</span>
          </p>

          <!--safe & clean-->
          <p class="available-on pc step-5">
            <span>Available on:</span>
            <i class="ios-icon" @mouseenter="tipQrCode('ios', $event)" @mouseleave="tipQrCode(false)" @click="downloadIOS1"></i>
            <i class="anzhuo-icon" @mouseenter="tipQrCode('android', $event)" @mouseleave="tipQrCode(false)" @click="downloadAndroid1"></i>
          </p>
        </div>
      </div>
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
import ButtonIconIns from "@/components/button/button-icon-ins";

export default {
  name: "Home7DownloadV2",
  components: {
    ButtonIconIns,
    // ButtonThemeGradientPurple,
    // ButtonThemeGradient,
    // ButtonDownloadWindows,
    // ButtonBuyNow,
    // ButtonDownloadWindowsYellow,
    // ButtonDownloadIos,
    // ButtonDownloadAndroid
  },
  props: {
    pageName: {
      type: String,
      required: false,
      default: "",
    },
  },
  data() {
    return {
      animateBegin: false,
      pageIOS: false,
    };
  },
  computed: {},
  mounted() {
    window.addEventListener("scroll", this.handle);

    this.pageIOS = this.$nuxt.$route.path === "/event-ios";
  },
  destroyed() {
    window.removeEventListener("scroll", this.handle);
  },
  methods: {
    handleScroll: function () {
      this.animateBegin =
        this.$refs.mark.getBoundingClientRect().top < window.innerHeight * 0.66;
    },
    handle() {
      const fun = this.handleScroll();
      this.COMMON.throttle(fun, 60, 100);
    },
    downloadIOS() {
      if (this.$nuxt.$route.path === "/event-ios") {
        this.$ga.event("insdl", "download", "hpiosdl2-ad");
        window.location.href = this.$constant.app.download.ios1;
      } else {
        this.$ga.event("insdl", "download", `hpiosdlnew6`);

        this.$store.commit(
          "enIosLinkCt",
          this.$store.state.adQueryCampaignHome
        );
        location.href = this.$storage.get('iosDownloadLink');
        // window.location.href =
        //   `${this.$store.state.enIosLink}` +
        //   `?pt=${this.$store.state.enIosLinkPt}` +
        //   `&ct=${this.$store.state.enIosLinkCt}` +
        //   `&mt=8`;
      }
    },
    downloadIOS1() {
      this.$ga.event("insdl", "download", "hppcdl2-ios");
      // window.location.href = `https://apps.apple.com/app/apple-store/id1498558125?pt=121014724&ct=en-seo-hpnew&mt=8`;
      location.href = this.$storage.get('iosDownloadLink');
    },
    downloadAndroid1() {
      this.$ga.event("insdl", "download", "hppcdl2-app");
      // window.location.href = `https://play.google.com/store/apps/details?id=com.formeup.getinsita&referrer=utm_source%3Den-seo-hpnew`;
      location.href = this.$storage.get('adrDownloadLink');
    },
    downloadAndroid() {
      this.$ga.event("insdl", "download", "hpappdlnew6");
      location.href = this.$storage.get('adrDownloadLink');
      // window.location.href =
      //   this.$constant.app.download.androidGooglePlay1 +
      //   this.$constant.app.campaign.androidReferrerQuery +
      //   this.$store.state.enAdrLinkGpReferrer;
    },
    downloadWindows() {
      this.$ga.event("insdl", "download", "hpwindl2");
      window.location.href = this.$constant.app.download.windows;
    },
    gaBuyNow() {
      this.$ga.event("insbuy", "buy", `hp4-${this.$i18n.locale}`);
      this.$nuxt.$router.push({
        path: "/buy-instagram-followers",
        query: {
          utm_source: "PC",
          utm_medium: "homepage",
        },
      });
    },

    gaDownloadAPPTest() {
      let url = "";

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
        "insdl",
        "download",
        `hp${this.$store.state.platform}dl${this.$store.state.gaColor}6`
      );
      location.href = url;
    },

    // v2
    // btnActionGate() {
    //   if (this.COMMON.isMobile()) this.gaDownload();
    //   else this.gaLogin();
    // },
    btnActionGate() {
      if (this.COMMON.isMobile())
        this.gaDownload();
      else
        this.gaLogin();
    },
    gaDownload() {
      if (this.COMMON.isiOS()) {
        this.downloadIOS();
      } else {
        this.downloadAndroid();
      }
    },
    gaLogin() {
      this.$ga.event("inslogin", "login", "hploginnew6");
      this.$nuxt.$router.push("/login");
    },
    tipQrCode(param, e) {
      if (this.COMMON.isMobile()) return;
      if (e) {
        this.$tipQrCode(param, e.clientX, e.clientY);
      } else {
        this.$tipQrCode(param);
      }
    }
  },
};
</script>

<style lang="scss" scoped>
@include animateSteps(5);

.home-7-download {
  padding-top: 68px;
  padding-bottom: 0;
  text-align: center;
  background: #f1f4f6 url("img/bg.svg") bottom center no-repeat;
  overflow: hidden;

  .img {
    display: inline-block;
    width: 347px;
    height: 400px;
    background: url("img/img.svg") center no-repeat;
    vertical-align: top;
  }

  .text {
    margin-left: 120px;
    padding-top: 34px;
    display: inline-block;
    width: 624px;
    vertical-align: top;
    text-align: left;

    .home__sec_h2 {
      font: normal normal 600 40px/50px BalooChettan;
    }

    .available-on {
      display: flex;
      align-items: center;
      margin-top: 25px;
      span {
        font: normal normal 600 14px/20px BalooChettan;
        letter-spacing: 0px;
        color: #7f8498;
        font-size: 14px;
        font-weight: 600;
      }
      i {
        margin-left: 20px;
        cursor: pointer;
        // background: url("./img/awesome-apple.svg") no-repeat;
        // background-position: center center;
        // background-size: 20px 24px;
        &:hover {
          img {
            -webkit-filter: grayscale(100%); /* Chrome, Safari, Opera */
            filter: grayscale(100%);
          }
        }
      }


      .ios-icon {
        display: inline-block;
        width: 20px;
        height: 24px;
        background: url("img/awesome-apple.svg") no-repeat;
        background-position: center center;
        background-size: 20px 24px;
        &:hover {
          background: url("img/awesome-apple-2.svg") no-repeat;
          background-position: center center;
          background-size: 20px 24px;
        }
      }
      .anzhuo-icon {
        display: inline-block;
        width: 20px;
        height: 24px;
        background: url("img/awesome-android.svg") no-repeat;
        background-position: center center;
        background-size: 20px 24px;
        &:hover {
          background: url("img/awesome-android-1.svg") no-repeat;
          background-position: center center;
          background-size: 20px 24px;
        }
      }
    }

    .home-7-download__p {
      margin-top: 27px;
      display: flex;
      justify-content: center;

      span {
        margin-left: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        font: normal normal 600 14px/20px BalooChettan;
        color: #000;

        &:first-child {
          margin-left: 0;
        }

        &:before {
          content: "";
          margin-right: 4px;
          display: inline-block;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: #6b50ff;
        }
      }
    }

    .home-7-download__img {
      margin-top: 42px;
    }

    .home-7-download__btn-container {
      margin-top: 37px;
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
  }
}

@media (max-width: 768px) {
  .home-7-download {
    padding-bottom: 70px;
    background-image: none;

    .text {
      margin-left: 0;
      width: 100%;
      text-align: center;

      .home__sec_h2 {
        font: normal normal 600 26px/34px BalooChettan;
        text-align: center;
      }

      .home__sec_p {
        text-align: center;
      }

      .home-7-download__p {
        margin-top: 24px;
        padding: 0 10px;
        justify-content: space-evenly;

        span {
          margin-left: 0;
        }
      }

      .home-7-download__img {
        margin-top: 30px;
      }

      .home-7-download__btn-container {
        margin-top: 70px;
        margin-bottom: 0;
        width: 100%;

        .blank {
          display: none;
        }

        .btn {
          width: 277px;
          height: 60px;
        }
      }
    }
  }
}
</style>

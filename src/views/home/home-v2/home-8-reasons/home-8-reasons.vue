<template>
  <div
    ref="mark"
    :class="{ on: animateBegin }"
    class="home-8-reasons"
  >
    <div class="wrapper">
      222
    </div>
  </div>
</template>

<script>
// import ButtonIconIns from "@/components/button/button-icon-ins";
export default {
  name: "Home7DownloadV2",
  components: {
    // ButtonIconIns,
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
        window.location.href =
          `${this.$store.state.enIosLink}` +
          `?pt=${this.$store.state.enIosLinkPt}` +
          `&ct=${this.$store.state.enIosLinkCt}` +
          `&mt=8`;
      }
    },
    downloadIOS1() {
      this.$ga.event("insdl", "download", "hppcdl2-ios");
      window.location.href = `https://apps.apple.com/app/apple-store/id1498558125?pt=121014724&ct=en-seo-hpnew&mt=8`;
    },
    downloadAndroid1() {
      this.$ga.event("insdl", "download", "hppcdl2-app");
      window.location.href = `https://play.google.com/store/apps/details?id=com.formeup.getinsita&referrer=utm_source%3Den-seo-hpnew`;
    },
    downloadAndroid() {
      this.$ga.event("insdl", "download", "hpappdlnew6");
      window.location.href =
        this.$constant.app.download.androidGooglePlay1 +
        this.$constant.app.campaign.androidReferrerQuery +
        this.$store.state.enAdrLinkGpReferrer;
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

</style>

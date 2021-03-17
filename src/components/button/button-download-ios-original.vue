<template>
  <button></button>
</template>

<script>
export default {
  name: 'ButtonDownloadIosOriginal',
  props: {
    size: {
      type: String,
      default: '',
      require: false
    },
    type: {
      type: String,
      default: '',
      require: false
    },
    exclusive: {
      type: String,
      default: '',
      required: false
    },
    appAnalytics: {
      type: Object,
      default() {
        return {
          pt: '',
          ct: '',
          mt: ''
        };
      },
      required: false
    },
    iosType: {
      type: String,
      default: '',
      required: false
    }
  },
  data() {
    return {};
  },
  methods: {
    download() {
      let iosURL
        = `${this.$store.state.enIosLink}`
        + `?pt=${this.$store.state.enIosLinkPt}`
        + `&ct=${this.$store.state.enIosLinkCt}`
        + `&mt=8`;
      if (this.iosType === 'ios1') {
        iosURL = this.$constant.app.download.ios1;
      }

      let appAnalyticsParams = '';
      if (this.appAnalytics.pt !== '')
        appAnalyticsParams = `?pt=${this.appAnalytics.pt}&ct=${this.appAnalytics.ct}&mt=${this.appAnalytics.mt}`;

      if (this.exclusive === 'getinsup' || this.exclusive === 'ios') {
        window.location.href = iosURL + appAnalyticsParams;
        return;
      }

      if (this.$store.state.isAndroid)
        if (this.$i18n.locale === 'fr' || this.$i18n.locale === 'de') {
          // window.location.href = `${this.$constant.app.download.android}?lang=${this.$i18n.locale}`;

          // Beacon:MinorAppDownload
          location.href = this.$store.state.minorLangAdrLink;
        } else {
          window.location.href = this.$store.state.enAdrLink;
        }
      if (this.$store.state.isiOS) {
        if (this.$i18n.locale === 'en') {
          window.location.href = iosURL + appAnalyticsParams;
        } else {
          // Beacon:MinorAppDownload
          location.href = this.$store.state.minorLangIosLink;
        }
      }
      if (this.$store.state.isWindows)
        window.location.href = this.$constant.app.download.windows;
    }
  }
};
</script>

<style lang="scss" scoped>
button {
  width: 100%;
  height: 100%;
  background: url("~@/assets/images/global/button/btn__download_original-appstore.svg") no-repeat center;
  background-size: contain;
}
</style>

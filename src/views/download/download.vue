<template>
  <div class="index-loading">
    <p>{{ $t('download.text') }}</p>
  </div>
</template>

<script>
export default {
  name: 'Download',
  components: {},
  data() {
    return {};
  },
  mounted() {
    this.multiLangAppDwnInit(); // 顺序在前，后续下载地址依赖此处
  },
  methods: {
    // Multi-lang app Link
    multiLangAppDwnInit() {
      const to = this.$route;
      // console.log(to);
      // if (this.COMMON.userAgentLocale() === 'en') return;

      let ct = 'en-seo';
      if (this.$i18n.locale === 'fr') ct = 'francais';
      if (this.$i18n.locale === 'de') ct = 'deutsch';
      if (this.$i18n.locale === 'es') ct = 'espanol';
      if (this.$i18n.locale === 'ar') ct = 'arabic';
      if (this.$i18n.locale === 'it') ct = 'italiano';
      if (this.$i18n.locale === 'pt') ct = 'portugues';

      //广告参数
      if (this.$i18n.locale === 'de') {
        if (to.query.s && to.query.c && to.query.k) ct = to.query.c;
        if (to.query.source && to.query['camp'] && to.query.k) ct = to.query['camp'];
      } else {
        if (to.query.s && to.query.c) ct = to.query.c;
      }

      // 下载地址默认切换
      // iOS
      // this.$store.commit(
      //   'minorLangIosLink',
      //   this.$constant.app.download.iosFollowersGallery
      //   + this.$constant.app.campaign.iosFollowersGalleryPtQuery
      //   + `&ct=${ct}&mt=8`
      // );
      //Android
      // this.$store.commit(
      //   'minorLangAdrLink',
      //   this.$constant.app.download.androidGooglePlay
      //   + this.$constant.app.campaign.androidReferrerQuery
      //   + ct
      // );

      this.downloadThenJumpHome(ct);
    },

    // Download Action!
    downloadThenJumpHome(ct) {
      // console.log(1);
      const localeReal = this.COMMON.userAgentLocale();
      // const subDomain = this.COMMON.getSubDomain();
      const domain = this.COMMON.getDomain();

      if (this.$route.params.type === 'android') {
        this.$ga.event('insdl', 'download', 'qrcode');

        if (localeReal !== 'en') {
          // Beacon:MinorAppDownload
          location.href
            = this.$constant.app.download.androidGooglePlay
            + this.$constant.app.campaign.androidReferrerQuery
            + ct;
        } else {
          this.enAndroidDownload();
        }
      } else if (this.$route.params.type === 'ios') {
        this.$ga.event('insdl', 'download', 'qrcode-ios');

        if (localeReal !== 'en') {
          // Beacon:MinorAppDownload
          location.href
            = this.$constant.app.download.iosFollowersGallery
            + this.$constant.app.campaign.iosFollowersGalleryPtQuery
            + `&ct=${ct}&mt=8`;
        } else {
          this.enIosDownload();
        }
      }

      setTimeout(() => {
        if (this.$i18n.locale !== 'en') {
          location.replace(`https://${localeReal}.${domain}`);
        } else {
          this.$router.push({ path: '/' });
        }
      }, 5000);
    },

    // 英语下载重试机制
    enAndroidDownload() {
      let timer = setInterval(() => {
        if (this.$store.state.enAdrLink !== '') {
          location.href = this.$store.state.enAdrLink;
          clearInterval(timer);
        }
      }, 200);
    },
    enIosDownload() {
      let timer = setInterval(() => {
        if (this.$store.state.enAdrLink !== '') {
          location.href = this.$store.state.enIosLink;
          clearInterval(timer);
        }
      }, 200);
    }
  }
};
</script>

<style lang="scss" scoped>
.index-loading {
  padding: 300px 0;
}
</style>

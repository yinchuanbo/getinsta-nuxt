<template>
  <div v-if="show" class="download-cta-valentine">
    <div class="download-cta-valentine-bottom pc">
      <div class="bg" @click="gaAndRouter"></div>
      <div class="wrapper">
        <div class="close" @click="show = false"></div>
      </div>
    </div>
    <div class="download-cta-valentine-top mobile">
      <div class="bg" @click="topDownload"></div>
      <div class="close" @click="show = false"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DownloadCtaValentine',
  components: {},
  props: {},
  data() {
    return {
      show: true
    };
  },
  computed: {},
  mounted() {
  },
  methods: {
    gaAndRouter() {
      this.$ga.event('bannerclick', 'click', 'valentine-pc');
      this.$nuxt.$router.push('/buy-instagram-followers');
    },
    topDownload() {
      this.$ga.event('bannerclick', 'click', `valentine-${this.$store.state.platform}`);
      if (this.COMMON.isiOS()) {
        location.href = 'https://apps.apple.com/app/apple-store/id1498558125?pt=121014724&ct=en-seo-valentine&mt=8';
      } else {
        location.href = this.$constant.app.download.android;
        // location.href = 'https://play.google.com/store/apps/details?id=com.formeup.getinsita&referrer=utm_source%3Den-seo-valentine';
      }
    }
  }
};
</script>

<style scoped lang="scss">
.download-cta-valentine-bottom {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 9;
  width: 100%;
  height: 85px;
  background: url("img/banner.svg") no-repeat bottom center;
  cursor: pointer;

  .bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .close {
    position: absolute;
    right: 12px;
    top: 18px;
    width: 11px;
    height: 11px;
    background: url("img/btn_close-1.svg") no-repeat center;
    background-size: contain;
    transition: all 0.3s;

    &:hover {
      opacity: 0.7;
    }
  }
}

@media (max-width: 768px) {
  .download-cta-valentine-top {
    position: fixed;
    top: 48px;
    left: 0;
    z-index: 9;
    width: 100%;
    height: 17.6vw;

    .bg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: url("img/mobile-bg.svg") center no-repeat;
      background-size: contain;
    }

    .close {
      position: absolute;
      top: 4vw;
      left: 3vw;
      z-index: 10;
      width: 16px;
      height: 16px;
      background: url("img/mobile-btn_close.svg") center no-repeat;
      background-size: contain;
    }
  }
}
</style>

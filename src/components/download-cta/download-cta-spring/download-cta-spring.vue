<template>
  <div v-if="show" class="download-cta">
    <div class="download-cta-bottom pc">
      <div class="bg" @click="gaAndRouter"></div>
      <div class="wrapper">
        <div class="close" @click="show = false"></div>
      </div>
    </div>
    <div class="download-cta-top mobile">
      <div class="bg" @click="topDownload"></div>
      <div class="close" @click="show = false"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DownloadCtaSpring',
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
      this.$ga.event('bannerclick', 'click', 'spring-pc');
      this.$router.push('/buy-instagram-followers');
    },
    topDownload() {
      this.$ga.event('bannerclick', 'click', `spring-${this.$store.state.platform}`);
      if (this.COMMON.isiOS()) {
        location.href = 'https://apps.apple.com/app/apple-store/id1498558125?pt=121014724&ct=en-seo-spring&mt=8';
      } else {
        // location.href = this.$constant.app.download.android;
        location.href = '../../../store/apps/details?id=com.formeup.getinsita&referrer=utm_source%3Den-seo-spring';
      }
    }
  }
};
</script>

<style scoped lang="scss">
.download-cta-bottom {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 9;
  width: 100%;
  height: 112px;
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
    right: 21px;
    top: 47px;
    width: 12px;
    height: 12px;
    //background: url("./img/btn_close-1.svg") no-repeat center;
    background-size: contain;
    transition: all 0.3s;

    &:hover {
      opacity: 0.7;
    }
  }
}

@media (max-width: 768px) {
  .download-cta-top {
    position: fixed;
    top: 48px;
    left: 0;
    z-index: 9;
    width: 100%;
    height: 14.933vw;

    .bg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: url("img/mobile-bg-1.svg") center no-repeat;
      background-size: contain;
    }

    .close {
      position: absolute;
      top: 4vw;
      left: 3vw;
      z-index: 10;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background: url("img/mobile-btn_close.svg") center no-repeat;
      background-size: contain;
    }
  }
}
</style>

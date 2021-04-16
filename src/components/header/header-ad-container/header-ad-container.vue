<template>
  <div class="header-ad-container" :style="{ height: `${adHeight}px` }">
    <div class="bg pc" :style="{ backgroundImage: `url(${backgroundImagePc})` }" @click="handle"></div>
    <div class="bg mobile" :style="{ backgroundImage: `url(${backgroundImageMobile})` }" @click="handle"></div>
    <div class="close" @click="closeAdBanner"></div>
  </div>
</template>

<script>
// 广告图片 old
// import backgroundImagePc from './img/ad-202103-pc.svg';
// import backgroundImageMobile from './img/new_mobile_az@2x.png';
// new
import backgroundImagePc from './img/pop_banner_PC.svg';
import backgroundImageMobile from './img/pop_banner_mobile.svg';

export default {
  name: 'HeaderAdContainer',
  components: {},
  props: {
    adHeight: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      backgroundImagePc,
      backgroundImageMobile
    };
  },
  mounted() {
  },
  methods: {
    closeAdBanner() {
      // this.$store.commit('v2Ad', false);
      this.$store.commit('v2AdHeightPc', 0);
      this.$store.commit('v2AdHeightMobile', 0);
    },
    handle() {
      // this.$ga.event('bannerclick', 'click', 'springnew-pc');
      // this.$ga.event("bannerclick", "click", "hpspring-pcnew");
      if (this.$route.path === '/') {
        if(!this.COMMON.isMobile()) { // pc
          this.$ga.event('bannerclick', 'click', 'hpspring-pcnew');
          this.$nuxt.$router.push('/buy-instagram-followers');
          return;
        }
        if (this.COMMON.isAndroid()) { // android
          this.$ga.event('insdl', 'download', 'hpspring-app');
          location.href = "https://play.google.com/store/apps/details?id=com.formeup.getinsita&referrer=utm_source%3Den-seo-a-easter";
        } else { // ios
          this.$ga.event('insdl', 'download', 'hpspring-ios');
          // location.href = 'https://apps.apple.com/app/apple-store/id1498558125?pt=121014724&ct=en-seo-a-easter&mt=8';
          location.href = 'https://apps.apple.com/app/apple-store/id1525688965?pt=118374901&ct=en-seo-a-easter&mt=8';
        }
      } else {
        if(!this.COMMON.isMobile()) { // pc
          this.$ga.event('bannerclick', 'click', 'easter-pcnew');
          this.$nuxt.$router.push('/buy-instagram-followers');
          return;
        }
        if (this.COMMON.isAndroid()) {
          this.$ga.event('bannerclick', 'click', 'easter-app');
          // this.$router.push({ path: '/eastersale' });
          location.href = "https://play.google.com/store/apps/details?id=com.formeup.getinsita&referrer=utm_source%3Den-seo-a-easter";
        } else {
          this.$ga.event('bannerclick', 'click', 'easter-ios');
          // location.href = 'https://apps.apple.com/app/apple-store/id1498558125?pt=121014724&ct=en-seo-a-easter&mt=8';
          location.href = 'https://apps.apple.com/app/apple-store/id1525688965?pt=118374901&ct=en-seo-a-easter&mt=8';
        }
      }
      // this.$router.push({ path: "/eastersale" });
    }
  }
};
</script>

<style lang="scss">
.header-ad-container {
  position: relative;
  width: 100%;
  height: 44px;

  .bg {
    width: 100%;
    height: 100%;
    background-color: #ffeacb;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    cursor: pointer;
  }

  .close {
    position: absolute;
    top: 15px;
    left: 14px;
    margin-top: -5px;
    display: block;
    width: 17px;
    height: 17px;
    background: url("./img/btn_close.svg") center no-repeat;
    background-size: contain;
    cursor: pointer;
  }
}
</style>

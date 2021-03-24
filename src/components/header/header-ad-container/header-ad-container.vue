<template>
  <div class="header-ad-container" :style="{ height: `${adHeight}px` }">
    <div class="bg pc" :style="{ backgroundImage: `url(${backgroundImagePc})` }" @click="handle"></div>
    <div class="bg mobile" :style="{ backgroundImage: `url(${backgroundImageMobile})` }" @click="handle"></div>
    <div class="close" @click="closeAdBanner"></div>
  </div>
</template>

<script>
// 广告图片
import backgroundImagePc from './img/ad-202103-pc.svg';
import backgroundImageMobile from './img/new_mobile_az@2x.png';

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
      this.$store.commit('v2Ad', false);
    },
    handle() {
      // this.$ga.event('bannerclick', 'click', 'springnew-pc');
      // this.$ga.event("bannerclick", "click", "hpspring-pcnew");
      if (this.$route.path === '/') {
        if (this.COMMON.isAndroid()) {
          this.$ga.event('insdl', 'download', 'hpspring-app');
          this.$router.push({ path: '/eastersale' });
        } else {
          // this.$router.push("/buy-instagram-followers");
          // console.log('ios');
          this.$ga.event('insdl', 'download', 'hpspring-ios');
          location.href = 'https://apps.apple.com/app/apple-store/id1498558125?pt=121014724&ct=en-seo-easter&mt=8';
        }
      } else {
        if (this.COMMON.isAndroid()) {
          this.$ga.event('bannerclick', 'click', 'easter-app');
          this.$router.push({ path: '/eastersale' });
        } else {
          this.$ga.event('bannerclick', 'click', 'easter-ios');
          location.href = 'https://apps.apple.com/app/apple-store/id1498558125?pt=121014724&ct=en-seo-easter&mt=8';
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
    top: 50%;
    right: 22px;
    margin-top: -5px;
    display: block;
    width: 11px;
    height: 11px;
    background: url("./img/ui__icon_close.svg") center no-repeat;
    background-size: contain;
    cursor: pointer;
  }
}
</style>

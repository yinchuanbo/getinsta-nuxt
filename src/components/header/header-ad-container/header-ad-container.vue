<template>
  <div class="header-ad-container" :style="{ height: `${adHeight}px` }">
    <div class="bg" :style="{ backgroundImage: `url(${backgroundImage})` }" @click="handle"></div>
    <div class="close" @click="closeAdBanner"></div>
  </div>
</template>

<script>
// 广告图片
import backgroundImage from './img/ad-202103-pc.svg';

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
      backgroundImage
    };
  },
  mounted() {
  },
  methods: {
    closeAdBanner() {
      this.$store.commit('v2Ad', false);
    },
    handle() {
      this.$ga.event('bannerclick', 'click', 'springnew-pc');
      this.$nuxt.$router.push('/buy-instagram-followers');
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
    background-color: #FFEACB;
    background-position: center;
    background-repeat: no-repeat;
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
    background: url("img/ui__icon_close.svg") center no-repeat;
    background-size: contain;
    cursor: pointer;
  }
}
</style>

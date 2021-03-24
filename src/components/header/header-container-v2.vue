<template>
  <header class="fixed" :class="{ 'active': headerActive }">
    <header-ad-container
      v-if="$store.state.v2Ad"
      :ad-height="$store.state.isMobile ? $store.state.v2AdHeightMobile: $store.state.v2AdHeightPc"
    />
    <header-nav-v2
      :home-path="headerShape.homePath"
      :home-scroll="headerShape.homeScroll"
    />
  </header>
</template>

<script>
import headerNavV2 from '@/components/header/header-nav-v2';
import HeaderAdContainer from '@/components/header/header-ad-container/header-ad-container';

export default {
  name: 'HeaderContainerV2',
  components: {
    HeaderAdContainer,
    headerNavV2
  },
  props: {},
  data() {
    return {
      headerActive: false,
      headerShape: {
        homePath: true,
        homeScroll: true
      },
      scrollTopOld: 0
    };
  },
  watch: {
    $route(to) {
      this.headerShape.homePath = to.path === '/';
    }
  },
  mounted() {
    this.headerFooterMotion();
    window.addEventListener('scroll', this.COMMON.throttle(this.handleScroll, 60, 100));
  },
  destroyed() {
    clearTimeout(this.timer);
    window.removeEventListener('scroll', this.COMMON.throttle());
  },
  methods: {
    headerFooterMotion() {
      this.headerActive = true;
    },
    handleScroll: function () {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      this.headerShape.homeScroll = scrollTop <= 80;
    }
  }
};
</script>

<style lang="scss">
header {
  position: relative;
  z-index: 100;
  width: 100%;
  opacity: 0;
  transform: translateY(-6px);
  transition: all .5s;

  &.fixed {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 10;
  }

  &.active {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>

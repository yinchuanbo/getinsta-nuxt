<template>
  <header class="fixed" :class="{ 'active': headerActive }">
    <header-nav
      :home-path="headerShape.homePath"
      :home-scroll="headerShape.homeScroll"
    />
  </header>
</template>


<script>
import headerNav from '@/components/header/header-nav';

export default {
  name: 'HeaderContainer',
  components: {
    headerNav
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
    this.headerShape.homePath = this.$nuxt.$route.path === '/';
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

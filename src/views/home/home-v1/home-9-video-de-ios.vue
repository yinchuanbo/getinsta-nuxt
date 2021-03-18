<template>
  <div v-if="show" ref="mark" :class="{ 'on': animateBegin }" class="home-9-video-de-ios">
    <div class="close pc" @click="show = false">
      <geometry-cross />
    </div>
    <iframe id="video-de" src="https://www.youtube.com/embed/xK7I5K2l6Gc?controls=0&autoplay=1&rel=0" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
  </div>
</template>

<script>

import GeometryCross from '@/components/geometry-cross';

export default {
  name: 'Home9VideoDeIos',
  components: { GeometryCross },
  data() {
    return {
      animateBegin: false,
      show: true
    };
  },
  computed: {},
  mounted() {
    window.addEventListener('scroll', this.handle);
  },
  destroyed() {
    window.removeEventListener('scroll', this.handle);
  },
  methods: {
    handleScroll: function () {
      this.animateBegin = this.$refs.mark.getBoundingClientRect().top < window.innerHeight * 0.66;
    },
    handle() {
      const fun = this.handleScroll();
      this.COMMON.throttle(fun, 60, 100);
    }
  }
};
</script>

<style lang="scss" scoped>
@include animateSteps(1);

.home-9-video-de-ios {
  position: fixed;
  right: 20px;
  bottom: 40px;
  z-index: 31;
  width: 400px;
  height: 225px;

  .close {
    position: relative;
    left: -20px;
    margin-left: 100%;
    width: 20px;
    height: 20px;
    cursor: pointer;
  }

  #video-de {
    width: 100%;
    height: 100%;
  }
}

@media (max-width: 768px) {
  .home-9-video-de-ios {
    position: relative;
    right: auto;
    bottom: auto;
    z-index: 0;
    width: 100%;
    height: 56.25vw;
  }
}
</style>

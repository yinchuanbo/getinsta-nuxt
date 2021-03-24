<template>
  <div class="v-d-1-des public-des">
    <div class="wrapper">
      <h2>How to Download Instagram Videos</h2>
      <div class="view-tree">
        <div ref="mark0" :class="{ 'on': animateBegin0 }" class="unit">
          <h4><i>1</i>Copy the Instagram Video URL</h4>
          <img src="@/views/tools/video-downloader/v-d-1-des/img/v-d-1-des-img-0.png" alt="">
        </div>
        <div ref="mark1" :class="{ 'on': animateBegin1 }" class="unit">
          <h4><i>2</i>Paste the URL</h4>
          <img src="@/views/tools/video-downloader/v-d-1-des/img/v-d-1-des-img-1.png" alt="">
        </div>
        <div ref="mark2" :class="{ 'on': animateBegin2 }" class="unit">
          <h4><i>3</i>Preview the Video Online</h4>
          <img src="@/views/tools/video-downloader/v-d-1-des/img/v-d-1-des-img-2.png" alt="">
        </div>
        <div ref="mark3" :class="{ 'on': animateBegin3 }" class="unit">
          <h4><i>4</i>Confirm the Download</h4>
          <img src="@/views/tools/video-downloader/v-d-1-des/img/v-d-1-des-img-3.png" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VD1Des',
  components: {},
  data() {
    return {
      animateBegin0: false,
      animateBegin1: false,
      animateBegin2: false,
      animateBegin3: false
    };
  },
  mounted() {
    window.addEventListener('scroll', this.handle);
  },
  destroyed() {
    window.removeEventListener('scroll', this.handle);
  },
  methods: {
    handleScroll: function () {
      this.animateBegin0 = this.$refs.mark0.getBoundingClientRect().top < window.innerHeight * 0.66;
      this.animateBegin1 = this.$refs.mark1.getBoundingClientRect().top < window.innerHeight * 0.66;
      this.animateBegin2 = this.$refs.mark2.getBoundingClientRect().top < window.innerHeight * 0.66;
      this.animateBegin3 = this.$refs.mark3.getBoundingClientRect().top < window.innerHeight * 0.66;
    },
    handle() {
      const fun = this.handleScroll();
      this.COMMON.throttle(fun, 60, 100);
    }
  }
};
</script>

<style lang="scss" scoped src="../../.."></style>

<template>
  <div class="v-d-2-des public-des">
    <div class="wrapper">
      <h2>Benefits You'll Get with Instagram Video Downloader</h2>
      <div class="des-container">
        <div ref="mark0" :class="{ 'on': animateBegin0 }" class="unit">
          <div class="img">
            <img src="@/views/tools/video-downloader/v-d-2-des/img/v-d-2-des-img-0.svg" alt="">
          </div>
          <div class="text">
            <h3>Free Instagram Video Downloader</h3>
            <p>This is a totally free online Instagram Video Downloader for iPhone, Android, PC and Mac. It helps users easily download massive Instagram videos within only 4 simple steps.</p>
          </div>
        </div>

        <div ref="mark1" :class="{ 'on': animateBegin1 }" class="unit">
          <div class="img">
            <img src="@/views/tools/video-downloader/v-d-2-des/img/v-d-2-des-img-1.svg" alt="">
          </div>
          <div class="text">
            <h3>Bulk Download Instagram Videos</h3>
            <p>You can not only download videos from Instagram for free, but also bulk-download multiple videos from any user at the same time. No time limits. No number limits.</p>
          </div>
        </div>

        <div ref="mark2" :class="{ 'on': animateBegin2 }" class="unit">
          <div class="img">
            <img src="@/views/tools/video-downloader/v-d-2-des/img/v-d-2-des-img-2.svg" alt="">
          </div>
          <div class="text">
            <h3>HD Instagram Video Downloader</h3>
            <p>GetInsta Video Downloader helps save all videos in original quality. Download beloved videos from any user on Instagram without any quality loss. </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VD2Des',
  components: {},
  data() {
    return {
      animateBegin0: false,
      animateBegin1: false,
      animateBegin2: false
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
    },
    handle() {
      const fun = this.handleScroll();
      this.COMMON.throttle(fun, 60, 100);
    }
  }
};
</script>

<style lang="scss" scoped src="../../.."></style>

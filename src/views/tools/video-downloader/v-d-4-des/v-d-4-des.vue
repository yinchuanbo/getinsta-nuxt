<template>
  <div class="v-d-4-des public-des">
    <div class="wrapper">
      <div class="des-container">
        <div ref="mark0" :class="{ 'on': animateBegin0 }" class="unit">
          <div class="img">
            <img src="@/views/tools/video-downloader/v-d-4-des/img/v-d-4-des-img-0.svg" alt="">
          </div>
          <div class="text">
            <h3>Download Instagram Videos to MP4</h3>
            <p>GetInsta Free Video Downloader supports downloading videos in MP4 format automatically, so you can enjoy videos on any devices and players. </p>
          </div>
        </div>

        <div ref="mark1" :class="{ 'on': animateBegin1 }" class="unit">
          <div class="img">
            <img src="@/views/tools/video-downloader/v-d-4-des/img/v-d-4-des-img-1.svg" alt="">
          </div>
          <div class="text">
            <h3>Reliable Instagram Video Manager</h3>
            <p>This free online video downloader does not require any information from you. No app downloading & installing. No registration. 100% safe and clean.</p>
          </div>
        </div>

        <div ref="mark2" :class="{ 'on': animateBegin2 }" class="unit">
          <div class="img">
            <img src="@/views/tools/video-downloader/v-d-4-des/img/v-d-4-des-img-2.svg" alt="">
          </div>
          <div class="text">
            <h3>Download Videos from Any User</h3>
            <p>With GetInsta free Instagram video downloader, you can download any Instagram video from any user. Your favorite idols, celebrities, famous brand accounts, etc.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VD4Des',
  components: {},
  data() {
    return {
      animateBegin0: false,
      animateBegin1: false,
      animateBegin2: false
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

<style lang="scss" scoped src="../..-d-2-des.scss"></style>
<style lang="scss" scoped>
.des-container {
  margin-top: 0;
}
</style>

<template>
  <div v-if="show" class="cta-download">
    <div class="cta-download-container">
      <div class="close" @click="show = false"></div>
      <div class="content" @click="download">
        <div class="tag"></div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'DownloadCtaBlackFriday',
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
    download() {
      if (this.COMMON.isiOS()) {
        this.$ga.event('insbuy', 'buy', `buy-mbfbanner-ios`);
        location.href
          = this.$constant.app.download.iosFollowersGallery
          + `?pt=${this.$constant.app.campaign.iosFollowersGalleryPt}`
          + `&ct=en-seo-bfbanner`
          + `&mt=8`;
      } else {
        this.$router.push('/buy-instagram-followers');
        this.$ga.event('insbuy', 'buy', `buy-mbfbanner-adr`);
      }
    }
  }
};
</script>

<style scoped lang="scss">
@media (max-width: 768px) {
  .cta-download {
    position: fixed;
    top: 44px;
    left: 0;
    z-index: 9;
    padding: 8px 2.13vw;
    width: 100%;
    height: 44px+8*2px;

    .cta-download-container {
      position: relative;
      z-index: 9;
      width: 100%;
      height: 100%;
      //background-color: #FF9C39;
      background: url("img/bg.svg") center no-repeat;
      background-size: cover;
      border-radius: 9px;

      .close {
        position: absolute;
        top: 3px;
        left: 3px;
        z-index: 10;
        width: 16px;
        height: 16px;
        background: url("img/btn_close.svg") center no-repeat;
        background-size: contain;
      }

      .content {
        position: relative;
        width: 100%;
        height: 100%;

        .tag {
          position: absolute;
          right: 20px;
          top: 38px;
          z-index: 9;
          width: (179px/2);
          height: (231px/2);
          background: url("img/tag.svg") center no-repeat;
          background-size: cover;
          transform-origin: top center;
          animation: bf-shake 2s ease-in-out infinite alternate;

          @keyframes bf-shake {
            0% {
              transform: rotate(-20deg);
            }
            100% {
              transform: rotate(20deg);
            }
          }
        }
      }
    }
  }
}
</style>

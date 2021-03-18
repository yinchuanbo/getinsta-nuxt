<template>
  <div v-if="show" class="cta-download mobile">
    <div class="cta-download-container">
      <div class="close" @click="show = false"></div>
      <div class="content">
        <!--<p>Buy followers from {{ $store.state.isiOS ? 'App Store' : 'Google Play' }}</p>-->
        <p>Buy 100% Real Followers Instantly</p>
        <div class="btn" @click="download">
          <a v-if="$store.state.isiOS" class="btn-app-store"></a>
          <a v-if="!$store.state.isiOS" class="btn-google-play"></a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CtaDownload",
  components: {},
  props: {},
  data() {
    return {
      show: false
    };
  },
  computed: {},
  mounted() {},
  methods: {
    download() {
      let gaParam, url;
      let ct = "en-seo-head";
      if (this.$nuxt.$route.path === "/event-user-generated-contest") ct += "-ugc";

      let gp3d = "en-seo-head";
      if (this.$nuxt.$route.path === "/event-user-generated-contest") gp3d += "-ugc";

      if (this.$store.state.isiOS) {
        gaParam = "as";
        url =
          // = `${this.$store.state.enIosLink}`
          // + `?pt=${this.$store.state.enIosLinkPt}`
          // + `&ct=en-seo-head`
          // + `&mt=8`;
          `https://apps.apple.com/app/apple-store/id1525688965?pt=118374901&ct=${ct}&mt=8`;
      }
      if (!this.$store.state.isiOS) {
        gaParam = "gp";
        url =
          this.$store.state.enAdrLinkWithoutGpReferrer +
          this.$constant.app.campaign.androidReferrerQuery +
          gp3d;
      }

      let single = "";
      if (this.$nuxt.$route.path === "/event-user-generated-contest") single = "-ugc";

      this.$ga.event("insbuy", "buy", `buyfrom${gaParam}-mheadbanner${single}`);
      location.href = url;
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
    height: 44px+8 * 2px;

    .cta-download-container {
      position: relative;
      z-index: 9;
      width: 100%;
      height: 100%;
      //background-color: #FF9C39;
      background: url("~@/assets/images/global/button/btn__cta-download_bg.svg")
        center no-repeat;
      background-size: cover;
      border-radius: 9px;

      .close {
        position: absolute;
        top: 3px;
        left: 3px;
        z-index: 10;
        width: 16px;
        height: 16px;
        background: url("~@/assets/images/global/icon_close-1.svg") center
          no-repeat;
        background-size: contain;
      }

      .content {
        padding-left: 48/750 * 100vw;
        padding-right: 8/750 * 100vw;
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 100%;

        p {
          font: 600 12px Montserrat;
          color: #2a2a2a;
          text-shadow: 0 1.5px 12px rgba(0, 0, 0, 0.16);
        }

        .btn {
          width: 205/750 * 100vw;
          height: 44-8px;

          a {
            display: block;
            width: 100%;
            height: 100%;
            background-size: contain;
            background-repeat: no-repeat;
            background-position: center;

            &.btn-app-store {
              background-image: url("~@/assets/images/global/button/btn__cta-download_appstore.svg");
            }

            &.btn-google-play {
              background-image: url("~@/assets/images/global/button/btn__cta-download_googleplay.svg");
            }
          }
        }
      }
    }
  }
}
</style>

<template>
  <div class="download-banner-mk-0">
    <div class="wrapper">
      <h2>{{ h2Text }}</h2>
      <h3>{{ h3Text }}</h3>
      <div class="download">
        <div class="btn-container" @click="gaBigBtn">
          <button-yellow-download text="Download GetInsta" :icon="platform" :theme="'blue'" />
        </div>
        <div class="bottom pc">
          <a class="ios" :href="$nuxt.$constant.app.download.ios" title="Download from App Store" @click="gaIOS"></a>
          <i></i>
          <a class="android" download :href="$nuxt.$constant.app.download.android" title="Download for Android" @click="gaAndroid"></a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ButtonYellowDownload from '@/components/button/button-yellow-download';

export default {
  name: 'DownloadBannerMk0',
  components: { ButtonYellowDownload },
  props: {
    gaParam: {
      type: Object,
      default() {
        return {
          bigBtn: {
            windows: '',
            ios: '',
            android: ''
          },
          smallBtn: {
            ios: '',
            android: ''
          }
        };
      },
      required: true
    },
    h2Text: {
      type: String,
      default: 'H2Text',
      required: true
    },
    h3Text: {
      type: String,
      default: 'H3Text',
      required: true
    }
  },
  data() {
    return {};
  },
  computed: {
    platform() {
      let name = '';
      if (this.$store.state.isAndroid) {
        name = 'android';
      } else if (this.$store.state.isiOS) {
        name = 'ios';
      } else {
        name = 'windows';
      }
      return name;
    }
  },
  mounted() {
  },
  methods: {
    gaBigBtn() {
      let label = '';
      if (this.$store.state.isAndroid) label = this.gaParam.bigBtn.android;
      if (this.$store.state.isiOS) label = this.gaParam.bigBtn.ios;
      if (this.$store.state.isWindows) label = this.gaParam.bigBtn.windows;

      this.$ga.event('insdl', 'download', `rankingtooldl-${label}`);
    },
    gaIOS() {
      this.$ga.event('insdl', 'download', `rankingtooldl-${this.gaParam.smallBtn.ios}`);
    },
    gaAndroid() {
      this.$ga.event('insdl', 'download', `rankingtooldl-${this.gaParam.smallBtn.android}`);
    }
  }
};
</script>

<style lang="scss" scoped>
.download-banner-mk-0 {
  padding-top: 90px;
  min-height: 496px;
  background: url("~@/assets/images/seo-pages/seo-0-the-best-followed/seo-0-module/seo-0-module__bg.svg") top center no-repeat;

  h2 {
    font: 600 40px Montserrat !important;
    color: #fff !important;
    text-align: center;
  }

  h3 {
    margin-top: 30px !important;
    font: 500 20px Montserrat !important;
    color: #fff !important;
    text-align: center;
  }

  a {
    color: #6dc0f1;
    text-decoration: underline;

    &:hover {
      color: #aaddfb;
    }
  }

  .download {
    .btn-container {
      margin: 60px auto 0;
      width: 450px;
      height: 100px;
    }

    .bottom {
      margin-top: 36px;
      text-align: center;
      font-size: 0;

      a {
        margin: 0 20px;
        display: inline-block;
        width: 26px;
        height: 26px;
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
        vertical-align: middle;

        &:hover {
          filter: brightness(120%);
        }

        &.ios {
          background-image: url("~@/views/tools/video-downloader/views/v-d-3-download/img/v-d-3-download__icon-ios.svg");
        }

        &.android {
          background-image: url("~@/views/tools/video-downloader/views/v-d-3-download/img/v-d-3-download__icon-android.svg");
        }
      }

      i {
        display: inline-block;
        width: 1px;
        height: 14px;
        background-color: #FFFFFF;
        vertical-align: middle;
      }
    }
  }
}

@media (max-width: 768px) {
  .download-banner-mk-0 {
    margin-top: 15px;
    padding-top: 30px !important;
    padding-bottom: 40px !important;
    min-height: auto !important;
    background-image: url("~@/assets/images/seo-pages/seo-0-the-best-followed/seo-0-module/seo-0-module__bg-m.svg");
    background-size: cover;

    h2 {
      padding: 0 4vw !important;
      font: 600 22px Montserrat !important;
    }

    h3 {
      margin-top: 12px !important;
      padding: 0 4vw !important;
      font: 500 12px Montserrat !important;
    }

    .download {
      .btn-container {
        margin: 45px auto 0;
        width: 76vw;
        height: 65px;
      }
    }
  }
}
</style>

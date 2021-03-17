<template>
  <div class="download-icon-set" :class="{ 'black': icon === 'black' }">
    <a class="ios" title="Download from App Store" @click="gaIOS"></a>
    <i></i>
    <a class="android" title="Download for Android" @click="gaAndroid"></a>
  </div>
</template>

<script>
export default {
  name: 'DownloadIconSet',
  props: {
    icon: {
      type: String,
      default: '',
      required: false
    },
    ga: {
      type: Object,
      default() {
        return {
          ios: '',
          android: ''
        };
      },
      required: false
    }
  },
  methods: {
    gaIOS() {
      this.$ga.event('insdl', 'download', this.ga.ios);
      location.href
        = `${this.$store.state.enIosLink}`
        + `?pt=${this.$store.state.enIosLinkPt}`
        + `&ct=en-seo-lucky-draw`
        + `&mt=8`;
    },
    gaAndroid() {
      this.$ga.event('insdl', 'download', this.ga.android);
      location.href
        = this.$store.state.enAdrLinkWithoutGpReferrer
        + this.$constant.app.campaign.androidReferrerQuery
        + 'en-seo-lucky-draw';
    }
  }
};
</script>

<style lang="scss" scoped>
.download-icon-set {
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
      background-image: url("~@/assets/images/global/button/icon__btn-download_logo_apple_white.svg");
    }

    &.android {
      background-image: url("~@/assets/images/global/button/icon__btn-download_logo_android_white.svg");
    }
  }

  i {
    display: inline-block;
    width: 1px;
    height: 14px;
    background-color: #FFFFFF;
    vertical-align: middle;
  }

  &.black {
    a {
      &.ios {
        background-image: url("~@/assets/images/global/button/icon__btn-download_logo_apple_black.svg");
      }

      &.android {
        background-image: url("~@/assets/images/global/button/icon__btn-download_logo_android_black.svg");
      }
    }

    i {
      background-color: #545454;
    }
  }
}

@media (max-width: 768px) {
  .download-icon-set {

  }
}
</style>

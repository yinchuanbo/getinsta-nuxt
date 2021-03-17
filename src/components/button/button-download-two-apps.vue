<template>
  <div class="button-download-two-apps">
    <div class="inline-wrapper">
      <div class="unit button android" @click="downloadAndroid">
        <div class="icon">
          <i></i>
          <b></b>
        </div>
      </div>
    </div>
    <div class="inline-wrapper">
      <div class="unit button ios" @click="downloadIOS">
        <div class="icon">
          <i></i>
          <b></b>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ButtonDownloadTwoApps',
  props: {
    ga: {
      type: Object,
      default() {
        return {
          windows: {
            category: 'insdl',
            action: 'download',
            label: 'unknownLabel'
          },
          android: {
            category: 'insdl',
            action: 'download',
            label: 'unknownLabel'
          },
          ios: {
            category: 'insdl',
            action: 'download',
            label: 'unknownLabel'
          }
        };
      },
      require: true
    },
    dlUrlQueryIos: {
      type: Object,
      default() {
        return {
          pt: '',
          ct: '',
          mt: ''
        };
      },
      require: false
    }
  },
  data() {
    return {};
  },
  methods: {
    downloadIOS() {
      this.$ga.event(this.ga.ios.category, this.ga.ios.action, this.ga.ios.label);
      let query = '';
      if (this.dlUrlQueryIos.pt !== '') {
        query = `?pt=${this.dlUrlQueryIos.pt}&ct=${this.dlUrlQueryIos.ct}&mt=${this.dlUrlQueryIos.mt}`;
        location.href = this.$store.state.enIosLink + query;
      } else {
        // Beacon:MinorAppDownload
        location.href = this.$store.state.enIosLink
      }
    },
    downloadAndroid() {
      this.$ga.event(this.ga.android.category, this.ga.android.action, this.ga.android.label);
      if (this.$i18n.locale === 'fr' || this.$i18n.locale === 'de') {
        // window.location.href = `${this.$constant.app.download.android}?lang=${this.$i18n.locale}`;

        // Beacon:MinorAppDownload
        location.href = this.$store.state.minorLangAdrLink;
      } else {
        window.location.href = this.$store.state.enAdrLink;
      }
    }
  }
};
</script>

<style lang="scss" scoped src="@/assets/styles/btn-download.scss"></style>
<style lang="scss" scoped>
.button-download-two-apps {
  position: relative;
  font-size: 0;
  border-radius: 5px;
  overflow: hidden;

  * {
    vertical-align: middle;
  }

  &:after {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 2;
    margin: auto;
    display: block;
    width: 1px;
    height: 24px;
    background-color: rgba(0, 0, 0, 0.25);
  }

  .inline-wrapper {
    display: inline-block;
    width: 50%;

    .unit {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      min-width: auto;
      background-color: #FF9C39;
      border: none;
      border-radius: 0;

      &:hover {
        background-color: #FFA850;
        border-color: #FF9C39;
      }

      .text {
        display: none;
      }

      .icon {
        b {
          background-image: url("~@/assets/images/global/button/icon__btn-download_dl_white.svg");
        }
      }

      &.ios {
        .icon {
          i {
            background-image: url("~@/assets/images/global/button/icon__btn-download_logo_apple_white.svg");
          }
        }
      }

      &.android {
        .icon {
          i {
            background-image: url("~@/assets/images/global/button/icon__btn-download_logo_android_white.svg");
          }
        }
      }
    }
  }
}


@media (max-width: 768px) {

}
</style>

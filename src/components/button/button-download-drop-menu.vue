<template>
  <div class="button-download-drop-menu">
    <div class="relative-dom">
      <button @click="downloadWindows">
        <div class="icon">
          <i></i>
          <b></b>
        </div>
        <div class="text">
          <p>Download for</p>
          <p>Windows</p>
          <p class="single">Download</p>
        </div>
      </button>
      <div
        v-click-outside="menuOff"
        class="arrow"
        :class="{ 'on': dropMenuOn }"
        title="Other Platform"
        @click="menuToggle"
      >
        <i></i>
      </div>
    </div>
    <div class="absolute-dom" :class="{ 'on': dropMenuOn }">
      <div class="unit button android"
           :class="{ 'theme-apk': $store.state.enAdrType === 0 }"
           @click="downloadAndroid"
      >
        <div class="icon">
          <i></i>
          <b></b>
        </div>
        <div v-if="$store.state.enAdrType === 1" class="text">
          <p>{{ $t('global.button.ButtonDownloadAndroid.line-0') }}</p>
          <p>{{ $t('global.button.ButtonDownloadAndroid.line-1') }}</p>
        </div>
        <div v-if="$store.state.enAdrType === 0" class="text">
          <p>{{ $t('global.button.ButtonDownloadAndroid.line-0-apk') }}</p>
          <p>{{ $t('global.button.ButtonDownloadAndroid.line-1-apk') }}</p>
        </div>
      </div>
      <div class="unit button ios" @click="downloadIOS">
        <div class="icon">
          <i></i>
          <b></b>
        </div>
        <div class="text">
          <p>{{ $t('global.button.ButtonDownloadIos.line-0') }}</p>
          <p>{{ $t('global.button.ButtonDownloadIos.line-1') }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ClickOutside from 'vue-click-outside';

export default {
  name: 'ButtonDownloadDropMenu',
  directives: {
    ClickOutside
  },
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
    return {
      dropMenuOn: false
    };
  },
  methods: {
    menuToggle() {
      this.dropMenuOn = !this.dropMenuOn;
    },
    menuOff() {
      this.dropMenuOn = false;
    },
    downloadIOS() {
      this.$ga.event(this.ga.ios.category, this.ga.ios.action, this.ga.ios.label);
      let query = '';
      if (this.dlUrlQueryIos.pt !== '') {
        query = `?pt=${this.dlUrlQueryIos.pt}&ct=${this.dlUrlQueryIos.ct}&mt=${this.dlUrlQueryIos.mt}`;
        window.location.href = this.$constant.app.download.ios + query;
      } else {
        location.href
          = `${this.$store.state.enIosLink}`
          + `?pt=${this.$store.state.enIosLinkPt}`
          + `&ct=${this.$store.state.enIosLinkCt}`
          + `&mt=8`;
      }
    },
    downloadAndroid() {
      this.$ga.event(this.ga.android.category, this.ga.android.action, this.ga.android.label);
      window.location.href = this.$store.state.enAdrLink;
    },
    downloadWindows() {
      this.$ga.event(this.ga.windows.category, this.ga.windows.action, this.ga.windows.label);
      window.location.href = this.$constant.app.download.windows;
    }
  }
};
</script>

<style lang="scss" scoped src="@/assets/styles/btn-download.scss"></style>
<style lang="scss" scoped>
.button-download-drop-menu {
  position: relative;
  font-size: 0;

  * {
    vertical-align: middle;
  }

  .arrow {
    position: relative;
    display: inline-block;
    min-width: 60px;
    height: 80px;
    background-color: #000;
    border-left: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 0 5px 5px 0;
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
      background-color: #2A2A2A;
    }

    i {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      margin: auto;
      width: 20px;
      height: 14px;
      transform: rotate(-180deg);
      @include triangle-solid(10px, 14px, #fff);
      transition: all 0.3s;
    }

    &.on {
      i {
        transform: rotate(0);
      }
    }
  }

  button, .button {
    padding: 10px 24px;
    border: none;
    text-align: left;
  }

  .relative-dom {
    button {
      background-color: #000;
      border-radius: 5px 0 0 5px;

      .icon {
        i {
          background-image: url("~@/assets/images/global/button/icon__btn-download_logo_windows_white.svg");
        }

        b {
          background-image: url("~@/assets/images/global/button/icon__btn-download_dl_white.svg");
        }
      }

      .text {
        color: #FFFFFF;
      }

      &:hover {
        background-color: #2A2A2A;
      }
    }
  }

  .absolute-dom {
    position: absolute;
    top: 80px;
    left: 0;
    z-index: 1;
    padding: 10px 0;
    width: 100%;
    background-color: #FFFFFF;
    border-radius: 5px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
    overflow: hidden;
    opacity: 0;
    transform: scaleY(0);
    transform-origin: top center;
    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);

    .button {
      width: 100%;
      height: 64px;
      border-radius: 0;
      background-color: #fff;

      .text {
        color: #000;

        p {
          &:first-child {
            font-weight: 600 !important;
          }

          &:last-child {
            font-weight: 700;
          }
        }
      }

      &.android {
        .icon {
          i {
            background-image: url("~@/assets/images/global/button/icon__android_google-play_grey.svg");
          }

          b {
            background-image: url("~@/assets/images/global/button/icon__btn-download_dl_black.svg");
          }
        }

        .text {
          margin-left: 10%;
        }
      }

      &.ios {
        .icon {
          i {
            background-image: url("~@/assets/images/global/button/icon__btn-download_logo_apple_black.svg");
          }

          b {
            background-image: url("~@/assets/images/global/button/icon__btn-download_dl_black.svg");
          }
        }
      }

      &:hover {
        background-color: #E6E6E6;
      }

      &.theme-apk {
        &.android {
          .icon {
            i {
              background-image: url("~@/assets/images/global/button/icon__btn-download_logo_android_black.svg");
            }
          }
        }
      }
    }

    &.on {
      opacity: 1;
      transform: scaleY(1);
    }
  }
}

@media (max-width: 768px) {

}
</style>

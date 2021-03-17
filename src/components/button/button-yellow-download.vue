<template>
  <button
    :class="{
      'icon-android': icon === 'android',
      'icon-ios': icon === 'ios',
      'icon-windows': icon === 'windows',
      'header-small': fontSize === 'header-small',
      'size-16': fontSize === 'size-16',
      'size-20': fontSize === 'size-20',
      'square': square === true,
      'bottom-cta': fontSize === 'bottom-cta',
      'theme-blue': theme === 'blue',
      'shadow': shadow === true
    }"
    @click="download"
  >
    <span>{{ text }}</span>
  </button>
</template>

<script>
export default {
  name: 'ButtonYellowDownload',
  props: {
    text: {
      type: String,
      default: 'Button',
      required: false
    },
    fontSize: {
      type: String,
      default: '',
      required: false
    },
    icon: {
      type: String,
      default: '',
      required: false
    },
    square: {
      type: Boolean,
      default: false,
      required: false
    },
    theme: {
      type: String,
      default: '',
      required: false
    },
    shadow: {
      type: Boolean,
      default: false,
      required: false
    },
    exclusive: {
      type: String,
      default: '',
      required: false
    },
    appAnalytics: {
      type: Object,
      default() {
        return {
          pt: '',
          ct: '',
          mt: ''
        };
      },
      required: false
    },
    iosType: {
      type: String,
      default: '',
      required: false
    }
  },
  methods: {
    download() {
      let iosURL
          = `${this.$store.state.enIosLink}`
          + `?pt=${this.$store.state.enIosLinkPt}`
          + `&ct=${this.$store.state.enIosLinkCt}`
          + `&mt=8`;
      if (this.iosType === 'ios1') {
        iosURL = this.$constant.app.download.ios1;
      }

      let appAnalyticsParams = '';
      if (this.appAnalytics.pt !== '')
        appAnalyticsParams = `?pt=${this.appAnalytics.pt}&ct=${this.appAnalytics.ct}&mt=${this.appAnalytics.mt}`;

      if (this.exclusive === 'getinsup' || this.exclusive === 'ios') {
        location.href = iosURL + appAnalyticsParams;
        return;
      }

      if (this.$store.state.isAndroid)
        if (this.$i18n.locale === 'fr' || this.$i18n.locale === 'de') {
          // window.location.href = `${this.$constant.app.download.android}?lang=${this.$i18n.locale}`;

          // Beacon:MinorAppDownload
          location.href = this.$store.state.minorLangAdrLink;
        } else {
          location.href = this.$store.state.enAdrLink;
        }
      if (this.$store.state.isiOS) {
        if (this.$i18n.locale === 'en') {
          location.href = iosURL + appAnalyticsParams;
        } else {
          // Beacon:MinorAppDownload
          location.href = this.$store.state.minorLangIosLink;
        }
      }
      if (this.$store.state.isWindows)
        location.href = this.$constant.app.download.windows;
    }
  }
};
</script>

<style lang="scss" scoped>
button {
  padding: 0 6%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: #FF9C39;
  box-shadow: none;
  border-radius: 64px;
  text-align: center;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.3s;
  user-select: none;

  span {
    color: #ffffff;
    font-weight: 600;
    font-size: 24px;
    word-break: break-word;
  }

  &.icon-android, &.icon-ios, &.icon-windows {
    box-shadow: 0 12px 24px #A528003D;

    &:before {
      display: inline-block;
    }
  }

  &:before {
    margin-right: 4%;
    display: none;
    width: 10.4%;
    height: 36px;
    background: url("~@/assets/images/global/button/icon__android_logo_white.svg") no-repeat center;
    background-size: contain;
    content: "";
  }

  &.icon-android {
    &:before {
      background-image: url("~@/assets/images/global/button/icon__android_logo_white.svg");
    }
  }

  &.icon-ios {
    &:before {
      background-image: url("~@/assets/images/global/button/icon__btn-download_logo_apple_white.svg");
    }
  }

  &.icon-windows {
    &:before {
      background-image: url("~@/assets/images/global/button/icon__btn-download_logo_windows_white.svg");
    }
  }

  &:hover {
    background-color: rgba(255, 156, 57, 0.8);
  }

  &.header-small {
    span {
      font-size: 16px;
    }
  }

  &.size-16 {
    span {
      font-size: 16px;
    }
  }

  &.size-20 {
    span {
      font-size: 20px;
    }
  }

  &.square {
    border-radius: 5px;
  }

  &.theme-blue {
    background-color: #005FFF;

    &:hover {
      background-color: #2070F6;
    }
  }

  &.shadow {
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
  }
}

@media (max-width: 768px) {
  button {
    transition: all 0.1s;

    span {
      font-size: 14px;
    }

    &:before {
      height: 32px;
    }

    &:hover {
      background-color: #FF9C39;

      &.theme-blue {
        background-color: #005FFF;
      }
    }

    &:active {
      background-color: rgba(255, 156, 57, 0.8);

      &.theme-blue {
        background-color: #2070F6;
      }
    }

    &.header-small {
      span {
        font-size: 14px;
      }
    }

    &.size-16 {
      span {
        font-size: 14px
      }
    }

    &.size-20 {
      span {
        font-size: 16px;
      }
    }

    &.bottom-cta {
      span {
        font-size: 12px
      }
    }

    &.icon-android, &.icon-ios, &.icon-windows {
      box-shadow: 0 1.5px 3px rgba(0, 0, 0, 0.16);
    }
  }
}
</style>

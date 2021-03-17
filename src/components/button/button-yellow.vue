<template>
  <button
    :class="{
      'icon icon-android': icon === 'android',
      'icon icon-android-google-play': icon === 'android-google-play',
      'icon icon-ios': icon === 'ios',
      'icon icon-windows': icon === 'windows',
      'header-small': fontSize === 'header-small',
      'size-16': fontSize === 'size-16',
      'size-20': fontSize === 'size-20',
      'square': square === true,
      'bottom-cta': fontSize === 'bottom-cta',
      'theme-blue': theme === 'blue',
      'shadow': shadow === true
    }"
  >
    <span>{{ text }}</span>
  </button>
</template>

<script>
export default {
  name: 'ButtonYellow',
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
    }
  },
  methods: {}
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

  span {
    color: #ffffff;
    font-weight: 600;
    font-size: 24px;
    word-break: break-word;
  }

  &.icon{
    box-shadow: 0 12px 24px #A528003D;

    &:before {
      display: inline-block;
    }
  }

  &:before {
    margin-right: 10px;
    display: none;
    width: 10.4%;
    height: 54%;
    background: url("~@/assets/images/global/button/icon__android_logo_white.svg") no-repeat center;
    background-size: contain;
    content: "";
  }

  &.icon-android {
    &:before {
      background-image: url("~@/assets/images/global/button/icon__android_logo_white.svg");
    }
  }

  &.icon-android-google-play {
    &:before {
      background-image: url("~@/assets/images/global/button/icon__android_google-play.svg");
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
      background-color: #2070F6
    }
  }

  &.shadow {
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
  }
}

@media (max-width: 768px) {
  button {
    span {
      font-size: 14px;
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

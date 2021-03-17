<template>
  <button
    :class="{
      'shadow': shadow,
      'square': square,
      'square-big': squareBig,
      'sharp': sharp,
      'header-small': fontSize === 'header-small',
      'size-20': fontSize === 'size-20',
      'size-14': fontSize === 'size-14',
      'size-16': fontSize === 'size-16',
      'size-15': fontSize === 'size-15',
      'icon-windows': icon === 'windows',
      'icon-android': icon === 'android',
      'icon-ios': icon === 'ios',
      'loading': loading
    }"
    :style="{ borderRadius: `${borderRadius}px` }"
  >
    <span v-html="text"></span>
  </button>
</template>

<script>
export default {
  name: 'ButtonThemeGradientPurple',
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
    shadow: {
      type: Boolean,
      default: false,
      required: false
    },
    sharp: {
      type: Boolean,
      default: false,
      required: false
    },
    square: {
      type: Boolean,
      default: false,
      required: false
    },
    squareBig: {
      type: Boolean,
      default: false,
      required: false
    },
    icon: {
      type: String,
      default: '',
      required: false
    },
    loading: {
      type: Boolean,
      default: false,
      required: false
    },
    borderRadius: {
      type: Number,
      default: 64,
      required: false
    }
  }
};
</script>

<style lang="scss" scoped>
button {
  position: relative;
  padding: 0 4%;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(90deg, #7C56FF 0%, #924AFF 100%);
  //background-size: 125% 100%;
  //background-position: 100% 0;
  border-radius: 64px;
  cursor: pointer;
  font-size: 0;
  color: #ffffff;
  transition: all 0.3s;
  user-select: none;

  span {
    display: inline-block;
    font-weight: 600;
    font-size: 24px;
    word-break: break-word;
    vertical-align: middle;
    transform: translateY(0);
    opacity: 1;
    transition: all 0.3s;
  }

  &:hover {
    background-position: 50% 0;
  }

  &:after {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    width: 100%;
    height: 100%;
    background: url("~@/assets/images/global/loading-puff-white.svg") no-repeat center;
    background-size: contain;
    transform: translateY(-20px);
    opacity: 0;
    transition: all 0.3s;
  }

  &:before {
    margin-right: 24px;
    content: "";
    display: none;
    width: 25px;
    height: 30px;
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    vertical-align: middle;
  }

  &.shadow {
    box-shadow: 0 12px 24px rgba(32, 0, 164, 0.24);
  }

  &.square {
    border-radius: 6px !important;
  }

  &.square-big {
    border-radius: 6px !important;
  }

  &.sharp {
    border-radius: 0 !important;
  }

  &.header-small {
    span {
      font-size: 16px;
    }
  }

  &.size-20 {
    span {
      font-size: 20px;
    }
  }

  &.size-14 {
    span {
      font-size: 14px;
    }
  }

  &.size-16 {
    span {
      font-size: 16px;
    }
  }

  &.icon-android, &.icon-windows, &.icon-ios {
    &:before {
      display: inline-block;
    }
  }

  &.icon-ios {
    &:before {
      background-image: url("~@/assets/images/global/button/icon__btn-download_logo_apple_white.svg");
    }
  }

  &.icon-android {
    &:before {
      background-image: url("~@/assets/images/global/button/icon__btn-download_logo_android_white.svg");
    }
  }

  &.icon-windows {
    &:before {
      background-image: url("~@/assets/images/global/button/icon__btn-download_logo_windows_white.svg");
    }
  }

  &.loading {
    cursor: default;

    &:hover {
      background-color: #7c56ff;
    }

    &:after {
      transform: translateY(0);
      opacity: 1;
    }

    span {
      transform: translateY(20px);
      opacity: 0;
    }
  }
}

@media (max-width: 768px) {
  button {
    transition: all 0.1s;

    span {
      font-size: 16px;
    }

    &:hover {
      background-color: #7c56ff;
    }

    &:active {
      background-color: #005FFF;
    }

    &:before {
      margin-right: 6%;
      width: 24px;
      height: 28px;
    }

    &.square {
      border-radius: 5px;
    }

    &.header-small {
      span {
        font-size: 8px;
      }
    }

    &.size-20 {
      span {
        font-size: 14px;
      }
    }

    &.size-16 {
      span {
        font-size: 14px;
      }
    }

    &.size-15 {
      span {
        font-size: 15px;
      }
    }

    &.shadow {
      box-shadow: 0 6px 12px rgba(148, 19, 194, 0.24);
    }
  }
}
</style>

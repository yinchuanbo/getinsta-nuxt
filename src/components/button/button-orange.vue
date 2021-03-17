<template>
  <button
    :class="{
      'shadow': shadow,
      'square': square,
      'square-big': squareBig,
      'sharp': sharp,
      'theme-light': themeLight,
      'theme-disabled': themeDisabled,
      'size-20': fontSize === 'size-20',
      'size-20-u': fontSize === 'size-20-u',
      'size-14': fontSize === 'size-14',
      'size-16': fontSize === 'size-16',
      'loading': loading
    }"
  >
    <span
      :style="{
        fontFamily: `${fontFamily}, sans-serif`,
        fontWeight: fontWeight
      }"
      v-html="text"
    ></span>
  </button>
</template>

<script>
export default {
  name: 'ButtonOrange',
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
    fontFamily: {
      type: String,
      default: '',
      required: false
    },
    fontWeight: {
      type: Number,
      default: 500,
      required: false
    },
    shadow: {
      type: Boolean,
      default: true,
      required: false
    },
    sharp: {
      type: Boolean,
      default: false,
      required: false
    },
    themeLight: {
      type: Boolean,
      default: false,
      required: false
    },
    themeDisabled: {
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
    loading: {
      type: Boolean,
      default: false,
      required: false
    }
  }
};
</script>

<style lang="scss" scoped>
button {
  position: relative;
  padding: 0 10%;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(to right, #ffbe27, #ffbe27, #FF4717);
  background-size: 200% 100%;
  background-position: 100% 0;
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
    //background-color: #005FFF;
    background-position: 0 0;
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
    box-shadow: 0 10px 20px rgba(255, 87, 0, 0.41);
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

  &.theme-light {
    background-image: linear-gradient(90deg, #FFBE27, #FFBE27, #FF8C19);
    box-shadow: 0 10px 20px rgba(219, 117, 0, 0.41);

    span {
      font-weight: 500;
      font-size: 20px;
    }
  }

  &.theme-disabled {
    background-image: none;
    background-color: rgba(0, 0, 0, 0.2);
    box-shadow: none;

    span {
      color: rgba(255, 255, 255, 0.5);
    }
  }

  &.size-20 {
    span {
      font-size: 20px;
    }
  }

  &.size-20-u {
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

  &.loading {
    cursor: default;

    &:hover {
      //background-color: #7c56ff;
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
      //background-color: #7c56ff;
    }

    &:active {
      background-image: linear-gradient(to right, rgba(255, 190, 39, 0.8), rgba(255, 71, 23, 0.8));
    }

    &:before {
      margin-right: 7%;
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
        font-size: 16px;
      }
    }

    &.size-20-u {
      span {
        font-size: 20px;
      }
    }

    &.size-16 {
      span {
        font-size: 14px;
      }
    }
  }
}
</style>

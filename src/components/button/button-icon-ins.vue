<template>
  <button
    :class="{
      shadow: shadow,
      square: square,
      'square-big': squareBig,
      sharp: sharp,
      'header-small': fontSize === 'header-small',
      'size-20': fontSize === 'size-20',
      'size-14': fontSize === 'size-14',
      'size-16': fontSize === 'size-16',
      'size-15': fontSize === 'size-15',
      'icon-windows': icon === 'windows',
      'icon-android': icon === 'android',
      'icon-ios': icon === 'ios',
      'icon-ins': icon === 'ins',
      'theme-cyan': theme === 'cyan',
      'theme-gradiant': theme === 'gradiant',
      'theme-transparent-black': theme === 'transparent-black',
      loading: loading,
      'bubble-float': bubbleFloat,
    }"
    :style="{ borderRadius: `${borderRadius}px` }"
  >
    <i class="b0"></i>
    <i class="b1"></i>
    <i class="b2"></i>
    <i class="b3"></i>
    <span v-html="text"></span>
  </button>
</template>

<script>
export default {
  name: "ButtonIconIns",
  props: {
    text: {
      type: String,
      default: "Button",
      required: false,
    },
    fontSize: {
      type: String,
      default: "",
      required: false,
    },
    shadow: {
      type: Boolean,
      default: false,
      required: false,
    },
    sharp: {
      type: Boolean,
      default: false,
      required: false,
    },
    square: {
      type: Boolean,
      default: false,
      required: false,
    },
    squareBig: {
      type: Boolean,
      default: false,
      required: false,
    },
    icon: {
      type: String,
      default: "",
      required: false,
    },
    loading: {
      type: Boolean,
      default: false,
      required: false,
    },
    borderRadius: {
      type: Number,
      default: 64,
      required: false,
    },
    theme: {
      type: String,
      default: "",
      required: false,
    },
    bubbleFloat: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
};
</script>

<style lang="scss" scoped>
button {
  position: relative;
  padding: 0 1%;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(90deg, #fcd362 0%, #ff57b6 45%, #ff2ab8 100%);
  //background-size: 125% 100%;
  //background-position: 100% 0;
  border-radius: 64px;
  cursor: pointer;
  font-size: 0;
  color: #ffffff;
  transition: all 0.3s;
  user-select: none;

  i {
    display: none;
  }

  &.theme-transparent-black {
    background-image: none;
    background-color: transparent;
    border: 2px solid #000000;

    span {
      color: #000;
    }

    &.icon-ins {
      &:before {
        display: inline-block;
        background-image: url("~@/assets/images/global/button/icon__btn-download_logo_ins_black.svg");
      }
    }
  }

  &.theme-cyan {
    background-image: linear-gradient(90deg, #20d2a8 0%, #05c3e1 100%);
    border: none;

    span {
      font-weight: 500;
    }

    &.shadow {
      box-shadow: 0 12px 24px #00000030;
    }

    &:hover {
    }

    &:active {
    }
  }

  &.theme-gradiant {
    // background-image: linear-gradient(90deg, #fe5c88 0%, #4761ff 100%);
    background-size: 200% 100%;
    background: linear-gradient(90deg, #4761ff 0%, #fe5c88 50%, #4761ff 100%) 200% 0;
    animation:loading 5s ease-in infinite;
    -webkit-animation:loading 5s ease-in infinite;

    @keyframes loading {
      0% {
        background-position: 200% 0;
      }
      100% {
        background-position: 0 0;
      }
    }
    &.shadow {
      box-shadow: 0 12px 24px rgba(171, 32, 119, 0.24);
    }

    &:hover {
    }

    &:active {
    }
  }

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
    transform: scale(1.03);
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
    box-shadow: 0 6px 12px rgba(148, 19, 194, 0.24);
  }

  &.square {
    border-radius: 8px !important;
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

  &.size-15 {
    span {
      font-size: 15px;
    }
  }

  &.icon-ios {
    &:before {
      display: inline-block;
      background-image: url("~@/assets/images/global/button/icon__btn-download_logo_apple_white.svg");
    }
  }

  &.icon-android {
    &:before {
      display: inline-block;
      background-image: url("~@/assets/images/global/button/icon__btn-download_logo_android_white.svg");
    }
  }

  &.icon-windows {
    &:before {
      display: inline-block;
      background-image: url("~@/assets/images/global/button/icon__btn-download_logo_windows_white.svg");
    }
  }

  &.icon-ins {
    &:before {
      display: inline-block;
      background-image: url("~@/assets/images/global/button/icon__btn-download_logo_ins_white.svg");
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

  &.bubble-float {
    i {
      position: absolute;
      top: 1px;
      left: 12%;
      display: block;
      width: 20px;
      height: 16px;
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
      opacity: 0;
      transform: scale(0.2) translateX(0) translateY(0) rotate(10deg);
      animation: 3s linear bubble-floating infinite;

      &.b0 {
        animation-delay: 3s;
        background-image: url("~@/assets/images/global/icon_person_add_white.svg");
      }

      &.b1,
      &.b2 {
        width: 16px;
        background-image: url("~@/assets/images/global/icon_heart_white.svg");
      }

      &.b3,
      &.b4 {
        background-image: url("~@/assets/images/global/icon_person_add_white.svg");
      }

      &.b1 {
        animation-delay: 3.5s;
      }

      &.b2 {
        animation-delay: 3.8s;
      }

      &.b3 {
        animation-delay: 4.1s;
      }

      &.b4 {
        animation-delay: 4.4s;
      }
    }

    @keyframes bubble-floating {
      0% {
        opacity: 0;
        transform: scale(0.2) translateX(0) translateY(0) rotate(10deg);
      }
      10% {
        opacity: 1;
        transform: scale(1) translateX(0) translateY(-10px) rotate(10deg);
      }
      30% {
        opacity: 0.7;
        transform: scale(0.9) translateX(10px) translateY(-30px) rotate(0deg);
      }
      34% {
        opacity: 0.7;
        transform: scale(0.9) translateX(10px) translateY(-34px) rotate(0deg);
      }
      50% {
        opacity: 0.4;
        transform: scale(0.85) translateX(0) translateY(-50px) rotate(-10deg);
      }
      54% {
        opacity: 0.3;
        transform: scale(0.85) translateX(0) translateY(-54px) rotate(-10deg);
      }
      74% {
        opacity: 0;
        transform: scale(0.7) translateX(10px) translateY(-60px) rotate(0deg);
      }
      80% {
        opacity: 0;
        transform: scale(0.9) translateX(0) translateY(0) rotate(10deg);
      }
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
      background-color: #005fff;
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
      box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
    }
  }
}
</style>

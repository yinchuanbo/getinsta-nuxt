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
      'icon-windows': icon === 'windows',
      'icon-android': icon === 'android',
      'icon-ios': icon === 'ios',
      'loading': loading,
      'blogSearch':themecolor,
      'blogbuy':watermelcolor
    }"
    :style="{ borderRadius: `${borderRadius}px` }"
  >
    <span class="spantext" :class="{'spantext':sizeweight}" v-html="text"></span>
  </button>
</template>

<script>
export default {
  name: 'ButtonPurple',
  props: {
    sizeweight:{
       type: Boolean,
      default: false,
      required: false
    },
    text: {
      type: String,
      default: 'Button',
      required: false
    },
    themecolor: {
      type: Boolean,
      default: false,
      required: false
    },
    watermelcolor: {
       type: Boolean,
      default: false,
      required: false
    },
    fontSize: {
      type: String,
      default: '',
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
  background-color: #7c56ff;
  border-radius: 64px;
  cursor: pointer;
  font-size: 0;
  color: #ffffff;
  transition: all 0.3s;
  user-select: none;
  &:hover{
    background-color:#ae70ff;
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
  span.spantext{
    font-weight: 500;
  }

  &:hover {
    background-color: #005FFF;
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
  &.blogSearch{
    width: 100%;
    height: 100%;
    background: transparent linear-gradient(90deg, #FFD256 0%, #F7EE41 100%) 0% 0% no-repeat padding-box;
    box-shadow: 0px 10px 26px #3F065670;
    border-radius: 11px;
    span{
    color: #2A2A2A;
    font:600 18px Montserrat;
    margin:auto;
    }
  }
  &.blogSearch.sharp{
    border-radius:10px !important;
    }
  &.blogSearch:hover{
     background: transparent linear-gradient(270deg, #F8DC2A 0%, #F7EE41 100%) 0% 0% no-repeat padding-box;
  }
  &.blogbuy{
    background: transparent linear-gradient(90deg, #FFA087 0%, #FF568C 100%) 0% 0% no-repeat padding-box;
    border-radius: 0px 6px 6px 0px;
    span{
      font: 600 20px/60px Montserrat !important;
    }
  }
}

@media (max-width: 768px) {
  button {
    transition: all 0.1s;

    span {
      font-size: 14px;
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

    &.shadow {
      box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
    }
  }
  button.blogSearch{
    box-shadow: 0px 10px 26px #3F065670;
    span{
      font:600 14px Montserrat;
    }
  }
  button.blogSearch.sharp{
    border-radius:5px !important;
    }
    button.blogbuy{
    span{
      font: 600 14px/44px Montserrat !important;
    }
  }
}
</style>

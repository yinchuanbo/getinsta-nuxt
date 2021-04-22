<template>
  <div class="button-green">
    <button
      :class="{
        shadow: shadow,
        square: square,
        'square-big': squareBig,
        sharp: sharp,
        'header-small': fontSize === 'header-small',
        'icon-windows': icon ==='windows',
        'icon-android': icon === 'android',
        'icon-ios': icon === 'ios',
        loading: loading,
        blogSearch: themecolor,
        blogbuy: watermelcolor
      }"
      :style="{ borderRadius: `${borderRadius}px` }"
    >
      <span class="spantext">Download GetInsta</span>
    </button>
    <div class="iosorand">
      <img src="../img/path4.svg" alt="" @click="dowEvent('ios')">
      <span>|</span>
      <img src="../img/icon_android_logo_white.svg" alt="" @click="dowEvent('adr')">
    </div>
  </div>
</template>

<script>
export default {
  name: 'ButtonPurple',
  props: {
    sizeweight: {
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
  },
  data() {
    return {
      icon: ''
    };
  },
  mounted() {
    if (this.COMMON.isWindows()) {
      this.icon = 'windows';
    } else if (this.COMMON.isAndroid()) {
      this.icon = 'android';
    } else {
      this.icon = 'ios';
    }
  },
  methods: {
    dowEvent(res) {
      let ct = this.$store.state.enIosLinkCt;
      if (res === 'ios') {
        // location.href
        //   = `${this.$store.state.enIosLink}`
        //   + `?pt=${this.$store.state.enIosLinkPt}`
        //   + `&ct=${ct}`
        //   + `&mt=8`;
        location.href = this.$storage.get('iosDownloadLink');
      } else {
        location.href = this.$storage.get('adrDownloadLink');
        // location.href
        //   = this.$store.state.enAdrLinkWithoutGpReferrer
        //   + this.$constant.app.campaign.androidReferrerQuery
        //   + 'en-seo-iug';
      }
    }
  }

};
</script>

<style lang="scss" scoped>
.button-green {
  width: 100%;
  height: 100%;

  .iosorand {
    margin-top: 17px;
    display: flex;
    justify-content: center;
    align-items: center;

    span {
      margin: 0 15px;
    }

    img {
      cursor: pointer;
    }
  }
}

button {
  position: relative;
  padding: 0 4%;
  width: 100%;
  height: 100%;
  background: transparent linear-gradient(90deg, #4bffc2 0%, #3dff9c 86%, #3bff96 100%) 0% 0% no-repeat padding-box;
  border-radius: 60px;
  cursor: pointer;
  box-shadow: 0px 8px 10px #00000029;
  color: #ffffff;
  transition: all 3s;
  user-select: none;

  &:hover {
    background: transparent linear-gradient(90deg, #3dffc4 0%, #00ffee 100%) 0% 0% no-repeat padding-box;
    box-shadow: 0px 8px 10px #00000029;
  }

  span {
    font: normal bold 20px/56px Montserrat;
    color: #000;
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

  &.icon-android,
  &.icon-windows,
  &.icon-ios {
    &:before {
      display: inline-block;
    }
  }

  &.icon-ios {
    &:before {
      width: 16px;
      height: 19px;
      margin-right: 4%;
      transform: translateY(-3px);
      background-image: url("~@/assets/images/global/button/icon__btn-download_logo_apple_black.svg");
    }
  }

  &.icon-android {
    &:before {
      width: 16px;
      height: 19px;
      margin-right: 4%;
      transform: translateY(-3px);
      background-image: url("~@/assets/images/global/button/icon__btn-download_logo_android_black.svg");
    }
  }

  &.icon-windows {
    &:before {
      transform: translateY(-3px);
      background-image: url("~@/assets/images/global/button/icon__btn-download_logo_windows_black.svg");
    }
  }

  &.loading {
    cursor: default;

    &:after {
      transform: translateY(0);
      opacity: 1;
    }

    span {
      transform: translateY(20px);
      opacity: 0;
    }
  }

  &.blogSearch {
    width: 100%;
    height: 100%;
    background: transparent linear-gradient(90deg, #ffd256 0%, #f7ee41 100%) 0% 0% no-repeat padding-box;
    box-shadow: 0px 10px 26px #3f065670;
    border-radius: 11px;

    span {
      color: #2a2a2a;
      font: 600 18px Montserrat;
      margin: auto;
    }
  }

  &.blogSearch.sharp {
    border-radius: 10px !important;
  }

  &.blogbuy {
    background: linear-gradient(90deg, #ffa087 0%, #ff568c 100%);
    border-radius: 0 6px 6px 0;
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

    &.shadow {
      box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
    }
  }
  button.blogSearch {
    box-shadow: 0 10px 26px #3f065670;

    span {
      font: 600 14px Montserrat;
    }
  }
  .button-green {
    .iosorand {
      display: none;
    }
  }
}
</style>

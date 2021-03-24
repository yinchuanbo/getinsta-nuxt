<template>
  <div class="equipment-btn" :class="color">
    <div class="equipment_btns" @click="gaDownload">
      <downloadAndroid v-show="!isIos"></downloadAndroid>
      <downloadIos v-show="isIos"></downloadIos>
    </div>
    <div class="equipment-btn_state">
      <div class="state state-android" @mouseover="changeState(false)">
        <img
          :class="{ android_active: isIos }"
          src="~@/views/blog/blog-detail/img/icon__btn-download_logo_android_white.svg"
          alt="android"
        />
      </div>
      <div class="_split"></div>
      <div class="state state-ios" @mouseover="changeState(true)">
        <img
          :class="{ ios_active: !isIos }"
          src="~@/views/blog/blog-detail/img/icon__btn-download_logo_apple_white.svg"
          alt="android"
        />
      </div>
    </div>
  </div>
</template>

<script>
import downloadIos from './button-download-ios';
import downloadAndroid from './button-download-android';

export default {
  name: 'ButtonEquipment',
  components: { downloadIos, downloadAndroid },
  props: {
    color: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      isIos: this.COMMON.isiOS()
    };
  },
  methods: {
    changeState(state) {
      this.isIos = state;
    },
    gaDownload() {
       let list = { zj: '-tc1', wz: '-tc2', cfz: '-tc3', share: '-tc4' };
      this.$ga.event(
        'insdl',
        'download',
        `${this.isIos ? 'iosdl' : 'appdl'}-tgiveaway${
          this.type ? list[this.type] : '2'
        }`
      );
      window.location.href = this.isIos
        ? 'https://apps.apple.com/app/apple-store/id1498558125?pt=121014724&ct=en-seo-thanksgiving&mt=8'
        : (this.$store.state.enAdrType === 1
          ? 'https://play.google.com/store/apps/details?id=com.insfollower.getinsta&referrer=utm_source%3Den-seo-thanksgiving'
          : this.$constant.app.download.android);


    }
  }
};
</script>

<style lang="scss" scoped>
.equipment-btn {
  position: relative;
  margin: 30px auto 0;
  width: 240px;

  &.back {
    .equipment-btn_state {
      .state {
        filter: invert(81%);
      }

      .ios_active,
      .android_active {
        filter: invert(60%);
      }
    }

  }

  .equipment_btns {
    .equipment_btn {
      width: 253px;
      height: 66px;
    }
  }

  .equipment-btn_state {
    position: absolute;
    bottom: -44px;
    margin-left: 50%;
    transform: translate(-50%);
    display: flex;
    justify-content: center;
    align-items: center;

    .state {
      display: inline-block;
      width: 22px;
      height: 28px;
    }

    .state-android {
      img {
        width: 100%;
      }
    }

    .android_active {
      opacity: 0.5;
    }

    .state-ios {
      img {
        width: 100%;
      }
    }

    .ios_active {
      opacity: 0.5;
    }

    ._split {
      margin: 9px;
      display: inline-block;
      width: 1px;
      height: 25px;
      background-color: #c3c4ca;
    }
  }
}

@media (max-width: 768px) {
  .equipment-btn {
    width: 211px;

    .equipment-btn_state {
      display: none;
    }
  }
}
</style>

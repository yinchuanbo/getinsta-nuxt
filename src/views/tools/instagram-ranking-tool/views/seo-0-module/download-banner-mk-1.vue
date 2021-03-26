<template>
  <div class="download-banner-mk-1">
    <div class="wrapper">
      <img v-if="pageandroid" class="coins" src="~@/assets/images/global/seo-1-lottery-btn-coins-icon.svg" alt="">
      <h2>{{ h2Text }}</h2>
      <ul>
        <li v-for="(unit, i) in ul" :key="i"><span>{{ unit }}</span></li>
      </ul>
      <div v-if="!pageandroid" class="download">
        <div class="btn-container" @click="gaBigBtn">
          <button-yellow-download class="pc" text="Download GetInsta" :icon="platform" :theme="'blue'" />
          <!--          <button-download-android v-if="$store.state.isAndroid" />-->
          <!--          <button-download-ios v-if="$store.state.isiOS" />-->
          <button-icon-ins class="mobile" text="Get Free Followers" square shadow :icon="'ins'" font-size="size-15" theme="cyan" />
        </div>
        <div class="bottom pc">
          <a class="ios" title="Download from App Store" @click="gaIOS"></a>
          <i></i>
          <a class="android" title="Download for Android" @click="gaAndroid"></a>
        </div>
      </div>
      <div v-else class="download-s">
        <seo1LotteryBtn :btn-style="btnStyle" />
      </div>
    </div>
  </div>
</template>

<script>
import ButtonYellowDownload from '@/components/button/button-yellow-download';
// import ButtonDownloadAndroid from '@/components/button/button-download-android';
// import ButtonDownloadIos from '@/components/button/button-download-ios';
import seo1LotteryBtn from '@/components/button/seo-1-lottery-btn';
import ButtonIconIns from '@/components/button/button-icon-ins';

export default {
  name: 'DownloadBannerMk1',
  components: {
    ButtonIconIns,
    // ButtonDownloadIos,
    // ButtonDownloadAndroid,
    ButtonYellowDownload,
    seo1LotteryBtn
  },
  props: {
    gaParam: {
      type: Object,
      default() {
        return {
          bigBtn: {
            labelTextGeneral: '',
            windows: '',
            ios: '',
            android: ''
          },
          smallBtn: {
            labelTextGeneral: '',
            ios: '',
            android: ''
          }
        };
      },
      required: true
    },
    h2Text: {
      type: String,
      default: 'H2Text',
      required: false
    },
    pageandroid: {
      type: Boolean,
      default: false
    },
    ul: {
      type: Array,
      default() {
        return [
          'ul text line 1',
          'ul text line 2'
        ];
      },
      required: false
    }
  },
  data() {
    return {};
  },
  computed: {
    btnStyle() {
      return {
        text: 'Watch Videos Now +1000',
        ga: 'adrdl-luckydraw'
      };
    },
    platform() {
      let name = '';
      if (this.$store.state.isAndroid) {
        name = 'android';
      } else if (this.$store.state.isiOS) {
        name = 'ios';
      } else {
        name = 'windows';
      }
      return name;
    }
  },
  mounted() {
  },
  methods: {
    gaBigBtn() {
      let label = '';
      if (this.$store.state.isAndroid) {
        label = this.gaParam.bigBtn.android;
        if (this.$store.state.enAdrType === 1) {
          location.href
            = this.$store.state.enAdrLinkWithoutGpReferrer
            + this.$constant.app.campaign.androidReferrerQuery
            + 'en-seo-lucky-draw';
        } else {
          location.href
            = this.$constant.app.download.android;
        }
      }
      if (this.$store.state.isiOS) {
        label = this.gaParam.bigBtn.ios;
        location.href
          = this.$store.state.enIosLink
          + `?pt=${this.$store.state.enIosLinkPt}`
          + `&ct=en-seo-lucky-draw`
          + `&mt=8`;
      }
      if (this.$store.state.isWindows) label = this.gaParam.bigBtn.windows;

      this.$ga.event(
        'insdl',
        'download',
        `${this.gaParam.bigBtn.labelTextGeneral}${label}`
      );
    },
    gaIOS() {
      this.$ga.event(
        'insdl',
        'download',
        `${this.gaParam.smallBtn.labelTextGeneral}${this.gaParam.smallBtn.ios}`
      );
      location.href
        = `${this.$store.state.enIosLink}`
        + `?pt=${this.$store.state.enIosLinkPt}`
        + `&ct=en-seo-lucky-draw`
        + `&mt=8`;
    },
    gaAndroid() {
      this.$ga.event(
        'insdl',
        'download',
        `${this.gaParam.smallBtn.labelTextGeneral}${this.gaParam.smallBtn.android}`
      );
      if (this.$store.state.enAdrType === 1) {
        location.href
          = this.$store.state.enAdrLinkWithoutGpReferrer
          + this.$constant.app.campaign.androidReferrerQuery
          + 'en-seo-lucky-draw';
      } else {
        location.href
          = this.$constant.app.download.android;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.download-banner-mk-1 {
  padding-top: 70px;
  min-height: 496px;
  background: url("../../img/seo-0-module/seo-0-module__bg.svg") top center no-repeat;

  .coins {
    display: block;
    margin: 0 auto 20px;
  }

  h2 {
    font: 600 28px Montserrat !important;
    color: #fff !important;
    text-align: center;
  }

  h3 {
    margin-top: 30px !important;
    font: 500 20px Montserrat !important;
    color: #fff !important;
    text-align: center;
  }

  a {
    color: #6dc0f1;
    text-decoration: underline;

    &:hover {
      color: #aaddfb;
    }
  }

  .download-s {
    width: 299px;
    height: 57px;
    margin: 40px auto 10px;
  }

  .download {
    .btn-container {
      margin: 60px auto 0;
      width: 450px;
      height: 100px;
    }

    .bottom {
      margin-top: 36px;
      text-align: center;
      font-size: 0;

      a {
        margin: 0 20px;
        display: inline-block;
        width: 26px;
        height: 26px;
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
        vertical-align: middle;

        &:hover {
          filter: brightness(120%);
        }

        &.ios {
          background-image: url("~@/views/tools/instagram-video-downloader/views/v-d-3-download/img/v-d-3-download__icon-ios.svg");
        }

        &.android {
          background-image: url("~@/views/tools/instagram-video-downloader/views/v-d-3-download/img/v-d-3-download__icon-android.svg");
        }
      }

      i {
        display: inline-block;
        width: 1px;
        height: 14px;
        background-color: #FFFFFF;
        vertical-align: middle;
      }
    }
  }

  ul {
    margin: 40px auto 0;
    display: block;
    width: 36%;

    li {
      margin-top: 15px;
      font-size: 0;

      &:first-child {
        margin-top: 0;
      }

      &:before {
        margin-right: 10px;
        content: "";
        display: inline-block;
        width: 18px;
        height: 18px;
        background: url("~@/assets/images/global/icon_check-circle.svg") center/contain no-repeat;
        vertical-align: middle;
      }

      span {
        font: 500 16px Montserrat;
        color: #FFFFFF;
        vertical-align: middle;
      }
    }
  }
}

@media (max-width: 768px) {
  .download-banner-mk-1 {
    padding-top: 54px;
    padding-bottom: 46px;
    min-height: auto;
    background-image: url("@/assets/images/seo-pages/seo-0-the-best-followed/seo-0-module/seo-0-module__bg-m.svg");
    background-size: cover;

    .coins {
      margin: 0 auto 11px;
    }

    h2 {
      padding: 0 4vw !important;
      font: 600 22px Montserrat !important;
    }

    h3 {
      margin-top: 12px !important;
      padding: 0 4vw !important;
      font: 500 12px Montserrat !important;
    }

    .download {
      .btn-container {
        margin: 45px auto 0;
        width: 211px;
        height: 56px;
      }
    }

    ul {
      margin: 44px auto 0;
      padding: 0 6vw;
      width: 100%;

      li {
        margin-top: 20px;

        &:before {
          width: 15px;
          height: 15px;
        }

        span {
          font: 500 12px Montserrat;
        }
      }
    }
  }
}
</style>

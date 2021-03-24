<template>
  <div class="register-welcome">
    <div class="header-blank"></div>
    <div class="wrapper">
      <div class="welcome">
        <h1>
          {{ $t('welcome.title.text0') }}
          <b>{{ $t('welcome.title.text1') }}</b>
          {{ $t('welcome.title.text2') }}
        </h1>
        <div class="btn pc">
          <button-download-drop-menu :ga="dropMenuGA" />
        </div>
        <div class="btn mobile" @click="downloadMobile">
          <!--<button-yellow-download-->
          <!--  text="Download App Now"-->
          <!--  :icon="$store.state.isiOS ? 'ios' : 'android'"-->
          <!--/>-->
          <button-download-ios v-if="$store.state.isiOS" />
          <button-download-android v-if="$store.state.isAndroid" />
        </div>
        <p><i></i><span>{{ $t('global.safe') }}</span></p>
      </div>
      <div class="tips">
        <h2>{{ $t('welcome.tips.list0.title') }}</h2>
        <p>
          <b>{{ $t('welcome.tips.list0.content0.text0') }}</b>
          {{ $t('welcome.tips.list0.content0.text1') }}
          <strong>{{ $t('welcome.tips.list0.content0.text2') }}</strong>
          {{ $t('welcome.tips.list0.content0.text3') }}
        </p>
        <p>
          <b>{{ $t('welcome.tips.list0.content1.text0') }}</b>
          {{ $t('welcome.tips.list0.content1.text1') }}
        </p>
        <p>
          <b>{{ $t('welcome.tips.list0.content2.text0') }}</b>
          {{ $t('welcome.tips.list0.content2.text1') }}
        </p>
        <hr>
        <h2>{{ $t('welcome.tips.list1.title') }}</h2>
        <p>{{ $t('welcome.tips.list1.content0.text0') }}</p>
        <p>
          <b>{{ $t('welcome.tips.list1.content1.text0') }}</b>
          {{ $t('welcome.tips.list1.content1.text1') }}
        </p>
        <p>
          <b>{{ $t('welcome.tips.list1.content2.text0') }}</b>
          {{ $t('welcome.tips.list1.content2.text1') }}
        </p>
        <p>
          <b>{{ $t('welcome.tips.list1.content3.text0') }}</b>
          {{ $t('welcome.tips.list1.content3.text1') }}
        </p>
      </div>
      <div class="download">
        <h2>{{ $t('welcome.download.title') }}</h2>
        <p class="h2">{{ $t('welcome.download.subTitle') }}</p>
        <div class="btn">
          <label class="pc" @click="downloadWindows">
            <!--<button-download-windows-yellow />-->
            <button-download-windows />
          </label>
          <span class="btn-download-blank pc"></span>
          <label class="pc" @click="downloadAndroid">
            <button-download-android />
          </label>
          <span class="btn-download-blank pc"></span>
          <label class="pc" @click="downloadIOS">
            <button-download-ios />
          </label>

          <label v-if="!$store.state.isiOS" class="mobile" @click="downloadAndroid">
            <button-download-android />
          </label>
          <label v-if="$store.state.isiOS" class="mobile" @click="downloadIOS">
            <button-download-ios />
          </label>
        </div>
        <p class="b"><i></i><span>{{ $t('global.safe') }}</span></p>
      </div>
    </div>
  </div>
</template>

<script>
// import ButtonDownloadWindowsYellow from '@/components/button/button-download-windows-yellow';
import ButtonDownloadAndroid from '@/components/button/button-download-android';
// import ButtonYellowDownload from '@/components/button/button-yellow-download';
import ButtonDownloadDropMenu from '@/components/button/button-download-drop-menu';
import ButtonDownloadIos from '@/components/button/button-download-ios';
import ButtonDownloadWindows from '@/components/button/button-download-windows';
// import ButtonBuyNow from '@/components/button/button-buy-now';

export default {
  name: 'RegisterWelcome',
  components: {
    ButtonDownloadWindows,
    // ButtonBuyNow,
    ButtonDownloadIos,
    ButtonDownloadDropMenu,
    // ButtonYellowDownload,
    ButtonDownloadAndroid
    // ButtonDownloadWindowsYellow
  },
  data() {
    return {
      dropMenuGA: {
        windows: {
          category: 'insdl',
          action: 'download',
          label: 'umnwindl1'
        },
        android: {
          category: 'insdl',
          action: 'download',
          label: 'umnappdl1'
        },
        ios: {
          category: 'insdl',
          action: 'download',
          label: 'umniosdl1'
        }
      }
    };
  },
  methods: {
    downloadIOS() {
      this.$ga.event('insdl', 'download', 'umniosdl2');
      location.href
        = `${this.$store.state.enIosLink}`
        + `?pt=${this.$store.state.enIosLinkPt}`
        + `&ct=${this.$store.state.enIosLinkCt}`
        + `&mt=8`;
    },
    downloadAndroid() {
      this.$ga.event('insdl', 'download', 'umnappdl2');
      window.location.href = this.$store.state.enAdrLink;
    },
    downloadWindows() {
      this.$ga.event('insdl', 'download', 'umnwindl2');
      window.location.href = this.$constant.app.download.windows;
    },
    downloadMobile() {
      if (this.COMMON.isiOS()) {
        this.$ga.event(this.dropMenuGA.ios.category, this.dropMenuGA.ios.action, this.dropMenuGA.ios.label);
        location.href
          = `${this.$store.state.enIosLink}`
          + `?pt=${this.$store.state.enIosLinkPt}`
          + `&ct=${this.$store.state.enIosLinkCt}`
          + `&mt=8`;
      } else {
        this.$ga.event(this.dropMenuGA.android.category, this.dropMenuGA.android.action, this.dropMenuGA.android.label);
        window.location.href = this.$store.state.enAdrLink;
      }
    },
    gaBuy() {
      this.$ga.event('insbuy', 'buy', 'umnbuy');
      this.$router.push({ path: '/user-get-followers' });
    }
  }
};
</script>

<style lang="scss" scoped>
.register-welcome {
  position: relative;
  padding-bottom: 100px;

  &:before {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 380px;
    background-color: #F8F8F8;
    content: "";
  }

  .wrapper {
    width: 800px;
  }

  .welcome {
    margin-top: 46px;
    padding: 68px 0;
    width: 100%;
    background: linear-gradient(270deg, #6924F2 0%, #6213FC 100%);
    border-radius: 12px;
    color: #FFFFFF;
    text-align: center;

    h1 {
      padding: 0 30px;
      font: 400 24px/1.5 Montserrat;

      b {
        color: #FFC439;
        font-weight: 600;
      }
    }

    p {
      margin-top: 28px;
      font-size: 0;

      span {
        font: 400 16px Montserrat;
        vertical-align: middle;
      }

      &.h2 {
        margin-top: 10px;
      }

      i {
        margin-right: 16px;
        display: inline-block;
        width: 19px;
        height: 24px;
        background: url("~@/assets/images/global/icon_safe.svg") no-repeat center;
        background-size: contain;
        vertical-align: middle;
      }
    }

    .btn {
      margin-top: 60px;
      display: inline-block;
      width: 300px;
      height: 80px;

      &:last-child {
        margin-top: 28px;
      }
    }

    img.qr {
      margin-top: 22px;
    }
  }

  .tips {
    margin-top: 32px;
    padding: 50px;
    width: 100%;
    box-shadow: 0 0 20px #00136112;
    border-radius: 12px;

    h2 {
      margin-bottom: 20px;
      font: 600 24px/1.5 Montserrat;
      color: #2128BD;
    }

    p {
      font: 500 14px/30px Montserrat;
      color: #2A2A2A;

      b {
        font-weight: 600;
      }

      strong {
        font-weight: 500;
        color: #FF7A06;
      }
    }

    hr {
      margin: 20px 0;
      border-top: 1px solid #E5E5E5;;
    }
  }

  .download {
    margin-top: 96px;
    text-align: center;

    h2 {
      font: 600 24px/30px Montserrat;
      color: #2128BD;
    }

    p {
      margin-top: 24px;
      font-size: 0;

      &.h2 {
        margin-top: 20px;
        font: 500 14px/18px Montserrat;
      }

      span {
        vertical-align: middle;
      }

      &.b {
        margin-top: 72px;

        span {
          font: 500 20px Montserrat;
          color: #000000;
        }
      }

      i {
        margin-right: 16px;
        display: inline-block;
        width: 19px;
        height: 24px;
        background: url("~@/assets/images/global/icon_safe.svg") no-repeat center;
        background-size: contain;
        vertical-align: middle;
      }

      &.bottom {
        margin-top: 45px;
      }
    }

    .btn {
      margin-top: 70px;
      display: inline-block;
    }

    img.qr {
      margin-top: 36px;
    }
  }
}

@media (max-width: 768px) {
  .register-welcome {
    padding-bottom: 50px;

    &:before {
      height: (380px/2);
    }

    .wrapper {
      padding: 0 4vw;
      width: 100%;
    }

    .welcome {
      margin-top: 23px;
      padding: (72px/2) 4vw (42px/2);

      h1 {
        font: 600 16px/20px Montserrat;
      }

      p {
        margin-top: 28px;

        span {
          font: 400 12px Montserrat;
        }

        &.h2 {
          margin-top: 5px;
        }

        i {
          width: 15px;
          height: 20px;
        }
      }

      .btn {
        margin-top: 18px;
        width: 62vw;
        height: 50px;
      }

      img.qr {
        margin-top: 22px;
      }
    }

    .tips {
      margin-top: 16px;
      padding: 4vw;

      h2 {
        font: 600 18px/30px Montserrat;
      }

      p {
        font: 500 13px/22px Montserrat;
      }

      hr {
        margin: 10px 0;
      }
    }

    .download {
      margin-top: 40px;

      h2 {
        font: 600 18px/26px Montserrat;
      }

      p {
        margin-top: 12px;
        font-size: 0;

        span {
          font: 400 13px/18px Montserrat;
        }

        &.h2 {
          margin-top: 10px;
          font: 400 12px/15px Montserrat;
        }

        &.b {
          margin-top: 44px;

          span {
            font: 400 12px Montserrat;
          }
        }

        i {
          width: 15px;
          height: 20px;
        }
      }

      .btn {
        margin-top: 56px;
      }

      img.qr {
        margin-top: 12px;
      }
    }
  }
}
</style>

<template>
  <div class="order-fail" :class="{ 'client': routerClient }">
    <div class="wrapper">
      <img class="h1-icon pc" src="../../assets/images/global/dialog/dialog__icon_alert.svg" alt="icon">
      <img class="h1-icon mobile" src="../../assets/images/global/dialog/dialog__icon_alert_white.svg" alt="icon">
      <h1>{{ $t('orderFail.title') }}</h1>
      <h2>
        {{ $t('orderFail.subtitle') }}
        <span v-if="orderFailData.type !== undefined"><br>Error Type: {{ orderFailData.type }}</span>
        <span v-if="orderFailData.message !== undefined"><br>Error Message: {{ orderFailData.message }}</span>
      </h2>

      <div class="btn-container" @click="tryAgain">
        <button-purple :text="$t('orderFail.TryAgain')" :square="true" />
      </div>

      <div class="bottom-text">
        <div class="unit">
          <h3>{{ $t('orderDetail.note.24/7Support.title') }}</h3>
          <p>
            {{ $t('orderDetail.note.24/7Support.text0') }}
            <a href="mailto:support@easygetinsta.com">{{ $t('orderDetail.note.24/7Support.link') }}</a>
            {{ $t('orderDetail.note.24/7Support.text1') }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ButtonPurple from '@/components/button/button-purple';

export default {
  name: 'OrderFail',
  components: { ButtonPurple },
  data() {
    return {
      meta: {
        title: ''
      },
      routerClient: false,
      orderFailData: {
        type: undefined,
        message: undefined
      }
    };
  },
  watch: {
    $route() {
      this.routerClient
        = this.COMMON.getURLQuery('url_cart') !== null
        && this.COMMON.getURLQuery('url_cart') !== '0';
    }
  },
  mounted() {
    this.routerClient
      = this.COMMON.getURLQuery('url_cart') !== null
      && this.COMMON.getURLQuery('url_cart') !== '0';
    this.collectOrderData();
    this.metaDataInit();

    this.failWindowInit();
  },
  methods: {
    metaDataInit() {
      if (this.$route.path === '/checkout-2') {
        this.meta.title = `${this.$store.state.productName}${this.$t('orderFail.meta.title-1')}`;
      } else {
        this.meta.title = `${this.$store.state.productName}${this.$t('orderFail.meta.title-0')}`;
      }
    },
    collectOrderData() {
      if (this.$storage.has('orderFailData')) {
        this.orderData = this.$storage.get('orderFailData');
      }
    },
    tryAgain() {
      let langDash = this.$i18n.locale !== 'en' ? '-' : '';

      this.$ga.event('buttonclick', 'click', `failtryagain${langDash}${this.$i18n.locale}`);

      let url_cart = this.COMMON.getURLQuery('url_cart');
      if (url_cart === null) url_cart = '0';

      let query = {
        url_cart: url_cart,
        cart_cache: '1'
      };

      let env_test = this.COMMON.getURLQuery('env_test');
      if (env_test !== null) {
        query.env_test = env_test;
      }

      let url_cart_type = this.COMMON.getURLQuery('url_cart_type');
      if (url_cart_type !== null) {
        query.url_cart_type = url_cart_type;
      }

      let pathSuffix = '';
      if (this.$route.path === '/order-fail-2')
        pathSuffix = '-2';

      this.$router.push({
        path: `/checkout${pathSuffix}`,
        query: query
      });
    },
    failWindowInit() {
      let minorLangParam = '';
      let logo = '';
      let titleMinorLang = '';
      logo = 'logo-getinsup';
      titleMinorLang = this.$t('orderFail.actionSheet.getInsUp.title');

      // console.log(1);
      setTimeout(() => {
        if (!this.$store.state.isAndroid) { // iOS+PC
          this.$actionSheet(
            false, '', logo, titleMinorLang,
            this.$t('orderFail.actionSheet.getInsUp.body'),
            'download-getinsup-app-store',
            this.$t('orderFail.actionSheet.getInsUp.btn')
          ).then(() => {
              this.$ga.event('insdl', 'download', `order-fail-iosdl${minorLangParam}`);
              // console.log(downloadURL);
              // location.href
              //   = `${this.$store.state.enIosLink}`
              //   + `?pt=${this.$store.state.enIosLinkPt}`
              //   + `&ct=en-seo-thankyoufail`
              //   + `&mt=8`;
              location.href = 'https://apps.apple.com/app/apple-store/id1525688965?pt=118374901&ct=en-seo-thankyoufail&mt=8'
            }
          ).catch();
        } else { // Android
          this.$actionSheet(
            false, '', logo,
            'GetInsta',
            this.$t('orderFail.actionSheet.getInsUp.body'),
            '',
            'Download Now'
          ).then(() => {
              this.$ga.event('insdl', 'download', `order-fail-gpdl${minorLangParam}`);
              // console.log(downloadURL);
              // location.href
              //   = this.$store.state.enAdrLinkWithoutGpReferrer
              //   + this.$constant.app.campaign.androidReferrerQuery
              //   + 'en-seo-thankyoufail';
              // location.href
              //   = this.$constant.app.download.android;
              location.href
                = location.href = this.$store.state.enAdrLink;
            }
          ).catch();
        }
      }, 400);
    }
  }
};
</script>

<style lang="scss" scoped>
.order-fail {
  position: relative;
  padding-top: 80px;
  padding-bottom: 100px;

  &.client {
    padding-top: 0;

    &:before {
      height: 300px;
    }
  }

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 380px;
    background-color: #F8F8F8;
  }

  .wrapper {
    padding-top: 64px;

    .h1-icon {
      margin: 0 auto;
      display: block;
      width: 62px;
      height: 62px;
    }

    h1 {
      margin-top: 15px;
      font: 600 28px/34px Montserrat;
      color: #FF3E34;
      text-align: center;
    }

    h2 {
      margin-top: 25px;
      font: 500 18px/24px Montserrat;
      color: #2A2A2A;
      text-align: center;
    }

    .btn-container {
      margin: 120px auto 0;
      width: 400px;
      height: 80px;
    }

    .bottom-text {
      .unit {
        margin-top: 36px;

        &:first-child {
          margin-top: 72px;
        }

        h3 {
          font: 600 18px/30px Montserrat;
          color: #2A2A2A;
        }

        p {
          margin-top: 10px;
          font: 400 14px/24px Montserrat;
          color: #A8A8A8;

          a {
            text-decoration: underline;
          }
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .order-fail {
    padding-top: 44px;
    padding-bottom: 80px;

    &.client {
      padding-top: 0;

      &:before {
        height: 176px;
      }
    }

    &:before {
      height: 220px;
      background-color: #FF4444;
    }

    .wrapper {
      padding: 30px 4vw 0;

      .h1-icon {
        width: 50px;
        height: 50px;
      }

      h1 {
        font: 700 22px/28px Montserrat;
        color: #fff;
      }

      h2 {
        margin-top: 25px;
        padding: 30px 4vw;
        display: inline-block;
        width: 100%;
        background: #FFFFFF;
        box-shadow: 0 5px 10px #00136112;
        border-radius: 6px;
        font: 500 16px/24px Montserrat;
        color: #2A2A2A;
      }

      .btn-container {
        margin-top: 16px;
        width: 100%;
        height: 56px;
      }

      .bottom-text {
        .unit {
          margin-top: 30px;

          &:first-child {
            margin-top: 56px;
          }

          h3 {
            font: 600 14px/15px Montserrat;
          }

          p {
            margin-top: 9px;
            font: 400 14px/17px Montserrat;
          }
        }
      }
    }
  }
}
</style>

<template>
  <div class="footer-copyright">
    <div class="wrapper">
      <div class="copyright">
        <img :src="$store.state.productLogo" alt="LOGO" @click="backHome">
        <div class="text">
          <h2 @click="backHome">{{ $store.state.productName }}</h2>
          <p>Copyright © {{ currentYear }} {{ COMMON.getDomain() }}</p>
        </div>
      </div>
      <div class="payment">
        <i class="PayPal"></i>
        <i class="VISA"></i>
        <i class="AmericanExpress"></i>
        <i class="GooglePay"></i>
        <i class="ApplePay"></i>
        <i class="MasterCard"></i>
      </div>
    </div>
  </div>
</template>

<script>
// import getInstaLogo from '@/assets/images/global/logo.svg';
// import spikeLogo from '@/assets/images/global/logo_getinshot.svg';

export default {
  name: 'FooterLite',
  components: {},
  props: {},
  data() {
    return {
      // getInstaLogo, spikeLogo,
      hostNameSpike: false,
      urlCart: false
    };
  },
  computed: {
    currentYear() {
      let date = new Date();
      return date.getFullYear();
    }
  },
  watch: {
    $route() {
      this.envDetective();
    }
  },
  mounted() {
    this.envDetective();
  },
  methods: {
    backHome() {
      if (!this.urlCart && !this.hostNameSpike) this.$nuxt.$router.push({ path: '/' });
    },
    envDetective() {
      this.hostNameSpike = window.location.hostname === this.$constant.url.spike;
      this.urlCart
        = this.COMMON.getURLQuery('url_cart') !== null
        && this.COMMON.getURLQuery('url_cart') !== '0';
    }
  }
};
</script>

<style lang="scss" scoped>
.footer-copyright {
  background-color: transparent;

  .wrapper {
    padding: 32px 0 66px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    //border-top: 1px solid rgba(42, 42, 42, 0.15);

    .copyright {
      img {
        width: 64px;
        height: 64px;
        vertical-align: top;
        cursor: pointer;
      }

      .text {
        margin-left: 26px;
        display: inline-block;
        vertical-align: top;

        h2 {
          font: 800 italic 28px/34px Montserrat;
          color: #2A2A2A;
          cursor: pointer;
        }

        p {
          font: 500 16px/32px Montserrat;
          color: #A8A8A8;
        }
      }
    }

    .payment {
      font-size: 0;

      i {
        margin: 0 3.5px;
        display: inline-block;
        background-color: #F5F6FB;
        width: 67px;
        height: 40px;
        background-position: center;
        background-size: contain;
        background-repeat: no-repeat;
        border-radius: 6px;

        &.PayPal {
          width: 96px;
          background-image: url("~@/assets/images/payment/payment-channel/payment__icon_PayPal.svg");
        }

        &.VISA {
          width: 62px;
          background-image: url("~@/assets/images/payment/payment-channel/payment__icon_VISA.svg");
        }

        &.AmericanExpress {
          width: 68px;
          background-image: url("~@/assets/images/payment/payment-channel/payment__icon_AmericanExpress.svg");
        }

        &.ApplePay {
          background-image: url("~@/assets/images/payment/payment-channel/payment__icon_ApplePay.svg");
        }

        &.GooglePay {
          background-image: url("~@/assets/images/payment/payment-channel/payment__icon_GooglePay.svg");
        }

        &.MasterCard {
          background-image: url("~@/assets/images/payment/payment-channel/payment__icon_MasterCard.svg");
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .footer-copyright {
    background-color: #F5F6FB;

    .wrapper {
      padding: 30px 4vw;
      padding-bottom: max(30px, env(safe-area-inset-bottom));
      border-top: none;
      display: block;

      .copyright {
        img {
          width: 40px;
          height: 40px;
        }

        .text {
          margin-left: 15px;
          padding-top: 2px;

          h2 {
            font: 800 italic 16px/20px Montserrat;
          }

          p {
            font: 500 12px/15px Montserrat;
          }
        }
      }

      .payment {
        margin-top: 22px;
        padding-top: 18px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        border-top: 0.5px solid rgba(0, 0, 0, 0.1);

        i {
          margin: 0;
          width: 13.333vw;
          height: 8vw;
          background-color: #fff;

          &.PayPal {
            width: 19.067vw;
          }

          &.VISA {
            width: 12.444vw;
          }

          &.AmericanExpress {
            width: 13.333vw;
          }

          &.ApplePay {
          }

          &.GooglePay {
          }

          &.MasterCard {
          }
        }
      }
    }
  }
}
</style>


<template>
  <div class="footer-copyright">
    <div class="wrapper">
      <div class="copyright pc">
        <img
          :src="$store.state.productLogo"
          alt="LOGO" @click="routerPush('/')"
        >
        <div class="text">
          <h2 @click="routerPush('/')">{{ $store.state.productName }}</h2>
          <p>Copyright © {{ currentYear }} {{ domain }}</p>
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
export default {
  name: 'FooterCopyright',
  components: {},
  props: {},
  data() {
    return {
      domain: this.COMMON.getDomain()
    };
  },
  computed: {
    currentYear() {
      let date = new Date();
      return date.getFullYear();
    }
  },
  watch: {},
  mounted() {
  },
  methods: {
    routerPush(path) {
      if (path === this.$nuxt.$route.path) {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      } else {
        this.$nuxt.$router.push({ path: path });
      }
      return false;
    }
  }
};
</script>

<style lang="scss" scoped>
.footer-copyright {
  background-color: #F5F6FB;

  .wrapper {
    padding: 26px 0 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid rgba(42, 42, 42, 0.15);

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
        background-color: #fff;
        width: 67px;
        height: 40px;
        background-position: center;
        background-size: contain;
        background-repeat: no-repeat;
        border-radius: 6px;

        &.PayPal {
          width: 96px;
          background-image: url("~@/assets/images/global/payment-icon/payment__icon_PayPal.svg");
        }

        &.VISA {
          width: 62px;
          background-image: url("~@/assets/images/global/payment-icon/payment__icon_VISA.svg");
        }

        &.AmericanExpress {
          width: 68px;
          background-image: url("~@/assets/images/global/payment-icon/payment__icon_AmericanExpress.svg");
        }

        &.ApplePay {
          background-image: url("~@/assets/images/global/payment-icon/payment__icon_ApplePay.svg");
        }

        &.GooglePay {
          background-image: url("~@/assets/images/global/payment-icon/payment__icon_GooglePay.svg");
        }

        &.MasterCard {
          background-image: url("~@/assets/images/global/payment-icon/payment__icon_MasterCard.svg");
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .footer-copyright {
    padding-bottom: 80px;
    .wrapper {
      display: block;
      padding: 0 4vw;
      border-top: none;

      .payment {
        padding-bottom: env(safe-area-inset-bottom);
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;

        i {
          margin: 0;
          width: 13.333vw;
          height: 8vw;

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


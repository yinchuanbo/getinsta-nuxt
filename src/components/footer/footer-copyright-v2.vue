<template>
  <div class="footer-copyright">
    <div class="wrapper">
      <!--      <div class="copyright pc">-->
      <!--        <img-->
      <!--          :src="$store.state.productLogo"-->
      <!--          alt="LOGO" @click="routerPush('/')"-->
      <!--        >-->
      <!--        <div class="text">-->
      <!--          <h2 @click="routerPush('/')">{{ $store.state.productName }}</h2>-->
      <!--          <p>Copyright © {{ currentYear }} {{ domain }}</p>-->
      <!--        </div>-->
      <!--      </div>-->
      <div class="links">
        <router-link to="/privacy">{{ $t('global.footer.about.privacyPolicy') }}</router-link>
        <router-link to="/terms">{{ $t('global.footer.about.termsOfUse') }}</router-link>
        <div v-show="!payPage" id="wrapper-translate">
          <div id="google_translate_element"></div>
        </div>
      </div>
      <div class="payment">
        <i class="PayPal"></i>
        <i class="MasterCard"></i>
        <i class="AmericanExpress"></i>
        <i class="GooglePay"></i>
        <i class="ApplePay"></i>
        <i class="VISA"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FooterCopyrightV2',
  components: {},
  props: {
    payPage: {
      type: Boolean,
      default: false
    }
  },
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
  background-color: #FFFFFF;
  border-top: 1px solid rgb(127, 132, 152, 0.21);

  .wrapper {
    padding-bottom: 30px;

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

    .links {
      padding-top: 22px;
      height: 54px;

      a {
        float: left;
        margin-left: 24px;
        font: normal normal 500 12px/32px BalooChettan;
        color: #7F8498;

        &:first-child {
          margin-left: 0;
        }
      }

      #wrapper-translate {
        float: right;
      }
    }

    .payment {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      width: 100%;
      font-size: 0;

      i {
        margin: 0 3.5px;
        display: inline-block;
        background-color: #fff;
        width: 50px;
        height: 30px;
        background-position: center;
        background-size: contain;
        background-repeat: no-repeat;
        border-radius: 6px;

        &.PayPal {
          width: 71px;
          background-image: url("~@/assets/images/global/payment/payment__icon_PayPal.svg");
        }

        &.VISA {
          width: 47px;
          background-image: url("~@/assets/images/global/payment/payment__icon_VISA.svg");
        }

        &.AmericanExpress {
          width: 50px;
          background-image: url("~@/assets/images/global/payment/payment__icon_AmericanExpress.svg");
        }

        &.ApplePay {
          background-image: url("~@/assets/images/global/payment/payment__icon_ApplePay.svg");
        }

        &.GooglePay {
          background-image: url("~@/assets/images/global/payment/payment__icon_GooglePay.svg");
        }

        &.MasterCard {
          background-image: url("~@/assets/images/global/payment/payment__icon_MasterCard.svg");
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .footer-copyright {
    padding-bottom: 80px;
    border: none;

    .wrapper {
      display: block;
      padding: 0 6.4vw;

      .links {
        clear: both;
        height: 54px;
        border-top: 1px solid rgb(127, 132, 152, 0.21);

        a {
          margin-left: 24px;
        }
      }

      .payment {
        justify-content: space-between;
        margin-top: 23px;
        padding-bottom: env(safe-area-inset-bottom);

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


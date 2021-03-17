<template>
  <div class="footer-module-mk-0 footer-copyright">
    <div class="wrapper">
      <div class="copyright">
        <img :src="$store.state.productLogo" alt="LOGO" @click="backHome">
        <div class="text">
          <h2 @click="backHome">{{ $store.state.productName }}</h2>
          <p>Copyright © {{ currentYear }} {{ COMMON.getDomain() }}</p>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: 'FooterModuleMk0',
  components: {},
  props: {},
  data() {
    return {};
  },
  computed: {
    currentYear() {
      let date = new Date();
      return date.getFullYear();
    }
  },
  mounted() {
  },
  methods: {
    backHome() {
      if (
        this.COMMON.getURLQuery('url_cart') === null
        || this.COMMON.getURLQuery('url_cart') === '0'
      )
        this.$router.push({ path: '/' });
    }
  }
};
</script>


<style lang="scss" scoped>
.footer-copyright {
  background-color: #F2F3F8;

  .wrapper {
    padding: 48px 0;

    .copyright {
      img, .text {
        margin: 0 auto;
        display: block;
      }

      img {
        width: 64px;
        height: 64px;
        vertical-align: top;
        cursor: pointer;
      }

      .text {
        margin-top: 6px;
        text-align: center;

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
  }
}

@media (max-width: 768px) {
  .footer-copyright {
    background-color: #F5F6FB;

    .wrapper {
      padding: 30px 4vw 30+56px;
      padding-bottom: env(safe-area-inset-bottom);
      padding-bottom: calc(86px + env(safe-area-inset-bottom));
      border-top: none;

      .copyright {
        img {
          width: 40px;
          height: 40px;
        }

        .text {
          padding-top: 2px;

          h2 {
            font: 800 italic 16px/20px Montserrat;
          }

          p {
            font: 500 12px/15px Montserrat;
          }
        }
      }
    }
  }
}
</style>

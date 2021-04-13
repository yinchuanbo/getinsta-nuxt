<template>
  <div class="blog-title-v2">
    <div class="header-blank pc"></div>

    <div class="wrapper">
      <div class="banner-img"></div>
      <div class="text-btn">
        <h1>{{ $t('blog.blogTitle.title') }}</h1>
        <ul>
          <li><span>{{ $t('blog.blogTitle.list[0]') }}</span></li>
          <li><span>{{ $t('blog.blogTitle.list[1]') }}</span></li>
          <li><span>{{ $t('blog.blogTitle.list[2]') }}</span></li>
        </ul>

        <div class="btns">
          <div class="btn" @click="gaDownload">
            <button-icon-ins :text="!$store.state.isMobile ? 'Get Free Followers Now' : 'Get Free Followers'"
                             bubble-float square shadow :icon="'ins'"
                             font-size="size-15" theme="cyan"
            />
          </div>
          <div class="btn" @click="gaBuy">
            <button-yellow-gradient square-radius8 :text="`Buy Now`" font-size="size-20" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BlogTitleV2',
  components: {},
  props: {
    blogId: {
      type: Number,
      required: false,
      default: 0
    }
  },
  computed: {
    dropMenuGA() {
      let multiLang = '';
      if (this.$i18n.locale !== 'en') multiLang = `-${this.$i18n.locale}`;
      return {
        windows: {
          category: 'insdl',
          action: 'download',
          label: `bloghpwindl${multiLang}`
        },
        android: {
          category: 'insdl',
          action: 'download',
          label: `bloghpappdl${multiLang}`
        },
        ios: {
          category: 'insdl',
          action: 'download',
          label: `bloghpiosdl${multiLang}`
        }
      };
    },
    dlUrlQueryIos() {
      return {
        pt: 121014724,
        ct: `${this.$i18n.locale}campaign`,
        mt: 8
      };
    }
  },
  mounted() {
  },
  methods: {
    gaDownload() {
      let param = this.blogId === 0 ? `bloghp` : this.blogId;
      this.$ga.event('insrg', 'register', `rg-${param}`);


      if (this.COMMON.isiOS()) {
        // this.$ga.event(this.dropMenuGA.ios.category, this.dropMenuGA.ios.action, this.dropMenuGA.ios.label);
        location.href
          = `${this.$store.state.enIosLink}`
          + `?pt=${this.$store.state.enIosLinkPt}`
          + `&ct=${this.$store.state.enIosLinkCt}`
          + `&mt=8`;
      }
      if (this.COMMON.isAndroid()) {
        // this.$ga.event(this.dropMenuGA.android.category, this.dropMenuGA.android.action, this.dropMenuGA.android.label);
        location.href = this.$store.state.enAdrLink;
      }
      if (!this.COMMON.isMobile()) {
        // this.$ga.event(this.dropMenuGA.android.category, this.dropMenuGA.android.action, this.dropMenuGA.android.label);
        this.$nuxt.$router.push('/register');
      }
    },
    gaBuy() {
      let multiLang = '';
      if (this.$i18n.locale !== 'en') multiLang = `-${this.$i18n.locale}`;

      let platform = '', gaPlatform = '';
      if (this.$i18n.locale !== 'en') {
        if (!this.COMMON.isMobile())
          platform = 'PC';
        if (this.COMMON.isiOS()) {
          platform = 'IOS';
          gaPlatform = 'ios';
        }
        if (this.COMMON.isAndroid()) {
          platform = 'android';
          gaPlatform = 'adr';
        }
      }

      let query = {};
      if (this.$i18n.locale !== 'en')
        query = {
          utm_source: platform,
          utm_medium: 'hpblog'
        };

      // this.$ga.event('insbuy', 'buy', `bloghp${gaPlatform}buy${multiLang}`);
      let param = this.blogId === 0 ? `bloghp` : this.blogId;
      this.$ga.event('insbuy', 'buy', `buy-${param}`);
      this.$nuxt.$router.push({ path: '/buy-instagram-followers', query: query });
    }
  }
};
</script>

<style lang="scss" scoped>
.blog-title-v2 {
  height: 480px;
  background: linear-gradient(213deg, #7C56FF 0%, #FF8192 100%);
  font-size: 0;
  overflow: hidden;

  .wrapper {
    padding: 0;
  }

  .banner-img, .text-btn {
    display: inline-block;
    vertical-align: top;
  }

  .banner-img {
    width: 493px;
    height: 408px;
    background: url("./img/blog-banner-img.svg") center/contain no-repeat;
  }

  .text-btn {
    padding-top: 70px;

    h1 {
      font: normal normal 600 32px/47px BalooChettan;
      color: #FFFFFF;
      letter-spacing: -0.96px;
    }

    ul {
      margin-top: 20px;

      li {
        span {
          font: normal normal 400 18px/34px BalooChettan;
          color: #FFFFFF;
          vertical-align: middle;
        }

        &:before {
          margin-right: 8px;
          content: "";
          display: inline-block;
          width: 16px;
          height: 16px;
          background-image: url("./img/icon-check.svg");
          background-size: contain;
          background-repeat: no-repeat;
          vertical-align: middle;
        }
      }
    }

    .btns {
      margin-top: 44px;

      .btn {
        display: inline-block;
        width: 253px;
        height: 60px;
        vertical-align: middle;

        &:last-child {
          margin-left: 35px;
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .blog-title-v2 {
    padding-bottom: (140px/2);
    height: auto;
    font-size: 0;

    .wrapper {
      width: 100%;
    }

    .banner-img {
      display: none;
    }

    .text-btn {
      padding: 30px 4vw 0;

      h1 {
        font: normal normal 600 17px/37px BalooChettan;
        letter-spacing: -0.34px;
      }

      ul {
        margin-top: 14px;

        li {
          span {
            font: normal normal 400 14px/28px BalooChettan;
          }

          &:before {
            width: 14px;
            height: 14px;
          }
        }
      }

      .btns {
        margin-top: 38px;
        text-align: center;

        .btn {
          width: 277px;
          height: 60px;

          &:last-child {
            margin-left: 0;
            margin-top: 12px;
          }
        }
      }
    }
  }
}
</style>

<template>
  <div class="blog-0-title">
    <!-- <div class="header-blank"></div> -->
    <div class="wrapper">
      <div class="unit left">
        <h1>{{ $t('blog.title') }}</h1>
        <h2>{{ $t('blog.subtitle') }}</h2>
      </div>
      <div class="unit right">
        <div class="btn-container pc">
          <div class="btn-c">
            <button-download-drop-menu :ga="dropMenuGA" />
          </div>
        </div>
        <div class="btn-container mobile" @click="downloadMobile">
          <!--<button-yellow-download-->
          <!--  :text="$t('global.button.downloadAppNow')"-->
          <!--  :icon="$store.state.isiOS ? 'ios' : 'android'"-->
          <!--  :font-size="'header-small'"-->
          <!--/>-->
          <button-download-ios v-if="$store.state.isiOS" />
          <button-download-android v-if="$store.state.isAndroid" />
        </div>
        <div class="btn-container second" @click="gaBuy">
          <button-buy-now
            class="pc"
            :text="$t('global.header.button.buyNow')"
            white square
            :font-size="'size-20'"
          />
          <button-buy-now
            class="mobile"
            :text="$t('global.header.button.buyNow')"
            white square
            :font-size="'size-20'"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import ButtonYellowDownload from '@/components/button/button-yellow-download';
// import ButtonDownloadWindowsYellow from '@/components/button/button-download-windows-yellow';
// import ButtonDownloadAndroid from '@/components/button/button-download-android';
import ButtonDownloadDropMenu from '@/components/button/button-download-drop-menu';
import ButtonBuyNow from '@/components/button/button-buy-now';
// import ButtonDownloadTwoApps from '@/components/button/button-download-two-apps';
import ButtonDownloadIos from '@/components/button/button-download-ios';
import ButtonDownloadAndroid from '@/components/button/button-download-android';

export default {
  name: 'Blog0Title',
  components: {
    ButtonDownloadAndroid,
    ButtonDownloadIos,
    // ButtonDownloadTwoApps,
    ButtonBuyNow,
    ButtonDownloadDropMenu
    // ButtonDownloadAndroid,
    // ButtonDownloadWindowsYellow,
    // ButtonYellowDownload
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
        location.href = this.$store.state.enAdrLink;
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

      this.$ga.event('insbuy', 'buy', `bloghp${gaPlatform}buy${multiLang}`);
      this.$nuxt.$router.push({ path: '/buy-instagram-followers', query: query });
    }
  }
};
</script>

<style lang="scss" scoped>
.blog-0-title {
  height: 420px;
  background: linear-gradient(258deg, #111EC5 0%, #AD34D8 57%, #FF9161 100%);
  font-size: 0;

  .unit {
    display: inline-block;
    vertical-align: top;
    color: #FFFFFF;

    &.left {
      padding-top: 100px;
      width: 910px;
    }

    &.right {
      padding-top: 80px;
      width: 300px;
      text-align: center;
    }

    h1 {
      font: 700 40px/47px Montserrat;
    }

    h2 {
      margin-top: 18px;
      font: 400 16px/19px Montserrat;
    }

    .btn-container {
      width: 300px;
      height: 80px;

      &.second {
        margin-top: 16px;
      }

      .btn-c {
        &:first-child {
          margin-top: 0;
        }
      }
    }

    p {
      margin-top: 22px;
      font: 400 16px Montserrat;
    }
  }
}

@media (max-width: 768px) {
  .blog-0-title {
    padding-bottom: (140px/2);
    height: auto;
    font-size: 0;

    .wrapper {
      padding: 0 4vw;
      width: 100%;
    }

    .unit {
      text-align: center;

      &.left {
        padding-top: 50px;
        width: 100%;
      }

      &.right {
        padding-top: 33px;
        width: 100%;
      }

      h1 {
        font: 700 27px/28px Montserrat;
      }

      h2 {
        margin-top: 16px;
        font: 400 14px/17px Montserrat;
      }

      .btn-container {
        display: inline-block;
        width: 211px;
        height: 56px;
      }

      p {
        margin-top: 22px;
        font: 400 16px Montserrat;
      }
    }
  }
}
</style>

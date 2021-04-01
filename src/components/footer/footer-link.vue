<template>
  <div class="footer-text">
    <div class="footer-text__links">
      <div class="wrapper">
        <div class="footer-text__links_column logo mobile">
          <nuxt-link to="/">
            <img :src="$store.state.productLogo" alt="logo">
            <h2>{{ $store.state.productName }}</h2>
          </nuxt-link>
          <p>Copyright © {{ currentYear }} <br> {{ COMMON.getDomain() }}</p>
          <div id="footer-translate-blank"></div>
        </div>
        <div v-if="!giveaway" class="footer-text__links_column first" :class="{ 'narrow': $i18n.locale === 'en' }">
          <h3><span>{{ $t('global.footer.about.about') }}</span></h3>
          <nuxt-link to="/terms">{{ $t('global.footer.about.termsOfUse') }}</nuxt-link>
          <nuxt-link to="/privacy">{{ $t('global.footer.about.privacyPolicy') }}</nuxt-link>
          <nuxt-link v-if="$i18n.locale === 'en'" to="/affiliate-solutions">Affiliate Program</nuxt-link>
        </div>
        <div v-if="$i18n.locale === 'en' && !giveaway" class="footer-text__links_column narrow">
          <h3><span>{{ $t('global.footer.services.services') }}</span></h3>
          <nuxt-link to="/get-instagram-followers-likes">{{ $t('global.footer.services.getFollowers') }}</nuxt-link>
          <nuxt-link to="/get-instagram-followers-likes">{{ $t('global.footer.services.getLikes') }}</nuxt-link>
        </div>
        <div v-if="!giveaway" class="footer-text__links_column narrow">
          <h3><span>{{ $t('global.footer.resource.resource') }}</span></h3>
          <nuxt-link v-if="$i18n.locale === 'en'" to="/login">{{ $t('global.footer.resource.login') }}</nuxt-link>
          <nuxt-link to="/faqs">{{ $t('global.footer.resource.faq') }}</nuxt-link>
          <nuxt-link to="/blog">{{ $t('global.footer.resource.blog') }}</nuxt-link>
        </div>
        <!--<div v-if="$i18n.locale === 'en'" class="footer-text__links_column">-->
        <!--  <h3><span>Free Tools</span></h3>-->
        <!--  <a to="/instagram-video-downloader" @click="routerPush('/instagram-video-downloader')">Instagram Video Downloader</a>-->
        <!--  <a to="/the-most-followed-instagram" @click="routerPush('/the-most-followed-instagram')">Instagram Ranking Tool</a>-->
        <!--</div>-->
        <div v-if="!giveaway" class="footer-text__links_column pc" :class="{ 'download': $i18n.locale === 'en' }">
          <h3><span>{{ $t('global.footer.GetInstaDownload.GetInstaDownload') }}</span></h3>
          <div v-if="$i18n.locale === 'en'" @click="downloadWindows">
            <button-download-windows :size="'footer'" />
          </div>

          <div @click="downloadAndroid">
            <button-download-android :size="'footer'" />
          </div>
          <div v-if="!$store.state.hideIosMinorLang" @click="downloadIOS">
            <button-download-ios :size="'footer'" />
          </div>
        </div>
      </div>
    </div>
    <div v-if="userCenter" class="mobile user-center-bottom-blank"></div>
  </div>
</template>

<script>
import ButtonDownloadAndroid from '@/components/button/button-download-android';
import ButtonDownloadWindows from '@/components/button/button-download-windows';
import ButtonDownloadIos from '@/components/button/button-download-ios';

export default {
  name: 'FooterLink',
  components: {
    ButtonDownloadIos,
    ButtonDownloadWindows,
    ButtonDownloadAndroid
  },
  props: {},
  data() {
    return {
      userCenter: false,
      giveaway: false
    };
  },
  computed: {
    currentYear() {
      let date = new Date();
      return date.getFullYear();
    }
  },
  watch: {
    $route(to) {
      this.userCenter = to.path === '/user'
        || to.path === '/user-get-followers'
        || to.path === '/user-get-likes'
        || to.path === '/user-asknet'
        || to.path === '/user-get-followers-asknet'
        || to.path === '/user-get-likes-asknet';

      this.giveaway = to.path === '/followers-giveaway';
    }
  },
  mounted() {
  },
  methods: {
    downloadWindows() {
      let gaParam = this.$i18n.locale !== 'en' ? `-${this.$i18n.locale}` : '';
      this.$ga.event('insdl', 'download', `footerwindl${gaParam}`);
      window.location.href = this.$constant.app.download.windows;
    },
    downloadAndroid() {
      let gaParam = this.$i18n.locale !== 'en' ? `-${this.$i18n.locale}` : '';
      this.$ga.event('insdl', 'download', `footerappdl${gaParam}`);
      if (this.$i18n.locale === 'fr' || this.$i18n.locale === 'de') {
        // window.location.href = `${this.$constant.app.download.android}?lang=${this.$i18n.locale}`;

        // Beacon:MinorAppDownload
        location.href = this.$store.state.minorLangAdrLink;
      } else {
        window.location.href = this.$store.state.enAdrLink;
      }
    },
    downloadIOS() {
      let gaParam = this.$i18n.locale !== 'en' ? `-${this.$i18n.locale}` : '';
      this.$ga.event('insdl', 'download', `footeriosdl${gaParam}`);


      if (this.$i18n.locale === 'en') {
        if (this.COMMON.getURLQuery('camp') !== null) {
          const param = this.COMMON.getURLQuery('camp');

          this.$store.commit('enIosLinkCt', param);
          window.location.href
            = `${this.$store.state.enIosLink}`
            + `?pt=${this.$store.state.enIosLinkPt}`
            + `&ct=${this.$store.state.enIosLinkCt}`
            + `&mt=8`;
        } else {
          window.location.href
            = `${this.$store.state.enIosLink}`
            + `?pt=${this.$store.state.enIosLinkPt}`
            + `&ct=${this.$store.state.enIosLinkCt}`
            + `&mt=8`;
        }
      } else {
        // window.location.href
        //   = this.$constant.app.download.ios
        //   + `${this.$constant.app.campaign.iosMinorLang}&ct=${this.$i18n.locale}campaign`;

        // Beacon:MinorAppDownload
        location.href = this.$store.state.minorLangIosLink;
      }
    },
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
.footer-text {
  padding: 125px 0 94px;
  background-color: #F5F6FB;

  .footer-text__links {
    .wrapper {
      display: flex;
      justify-content: space-between;
    }

    .footer-text__links_column {
      padding-left: 40px;
      width: 370px;
      display: inline-block;
      vertical-align: top;

      &.logo {
        margin-right: 115px;
        padding-right: 20px;
        width: 290px;
        height: 330px;
        border-right: 1px solid rgb(255, 255, 255, 0.15);

        i, img {
          display: inline-block;
          width: 100px;
          height: 100px;
          object-fit: contain;
        }
      }

      &.download {
        margin-bottom: 20px;
        width: 240px;
      }

      h2 {
        margin-top: 8px;
        font: 800 italic 28px/34px Montserrat;
        color: #fff;
      }

      p {
        margin-top: 15px;
        line-height: 26px;
      }

      button {
        margin-top: 10px;
      }

      &.first {
        padding-left: 0;
      }

      &.narrow {
        width: 200px;
      }
    }

    p, a {
      font: 500 16px/1.2 Montserrat;
      color: rgba(42, 42, 42, 0.6);
      transition: all 0.1s;
    }

    a {
      display: block;
      margin-top: 20px;
      //line-height: 40px;

      &:hover {
        color: rgba(42, 42, 42, 1);
      }
    }

    h3 {
      margin-bottom: 20px;

      span {
        font: 600 20px Montserrat;
        color: #2A2A2A;
      }
    }
  }
}

@media (max-width: 768px) {
  .footer-text {
    background-color: #F5F6FB;
    padding: (112px/2) 0 60px;

    .footer-text__links {
      .wrapper {
        display: block;
      }

      .footer-text__links_column {
        margin: 50px auto 0;
        padding: 0 8vw;
        width: 100% !important;
        height: auto !important;
        text-align: center;

        &.logo {
          margin-top: 0;
          margin-right: 0;
          padding: 0;
          border-right: none;

          i, img {
            width: (156px/2);
            height: (156px/2);
          }

          p {
            color: rgba(168, 168, 168, 0.6);
          }
        }

        h2 {
          margin-top: (8px/2);
          font-size: (48px/2);
          color: #2A2A2A;
          //line-height: (58px/2);
        }

        h3 {
          position: relative;
          margin-bottom: 0;
          display: inline-block;
          width: 100%;
          font-size: (32px/2);
          //line-height: (40px/2);

          span {
            position: relative;
            z-index: 1;
            display: inline-block;
            background-color: #F5F6FB;
            padding: 0 8vw;
            color: #2A2A2A;
          }

          &:before {
            position: absolute;
            left: 0;
            top: 50%;
            width: 100%;
            height: 1px;
            background-color: rgba(168, 168, 168, 0.17);
            content: "";
          }
        }

        p, a {
          color: rgba(42, 42, 42, 0.8);
        }

        p {
          margin-top: 4px;

          span {
            font-size: (32px/2);
            //line-height: (40px/2);
          }

          br {
            display: none;
          }
        }

        a {
          width: 100%;
          font-size: (32px/2);
          font-weight: 400;
          //line-height: (80px/2);
        }

        &.first {
          padding-left: 8vw;
        }
      }
    }

    .user-center-bottom-blank {
      height: 56px;
    }
  }
}
</style>

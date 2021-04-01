<template>
  <div>
    <div class="footer-text pc">
      <div class="footer-text__links">
        <div class="wrapper">
          <div class="footer-text__links_column">
            <h3>
              <span>{{ $t("global.footer.services.services") }}</span>
            </h3>
            <nuxt-link to="/buy-instagram-followers">
              Get Instagram Followers
            </nuxt-link>
            <nuxt-link to="/buy-auto-instagram-followers">
              Get Auto Instagram Followers
            </nuxt-link>
            <nuxt-link to="/buy-instagram-likes">
              Get Instagram Likes
            </nuxt-link>
            <nuxt-link to="/affiliate-solutions">
              Affiliate Program
            </nuxt-link>
          </div>
          <div class="footer-text__links_column">
            <h3>
              <span>{{ $t("global.footer.resource.resource") }}</span>
            </h3>
            <nuxt-link v-if="$i18n.locale === 'en'" to="/login">
              {{
                $t("global.footer.resource.login")
              }}
            </nuxt-link>

            <nuxt-link to="/faqs">
              {{
                $t("global.footer.resource.faq")
              }}
            </nuxt-link>

            <nuxt-link to="/blog">
              {{
                $t("global.footer.resource.blog")
              }}
            </nuxt-link>
          </div>

          <div v-if="!giveaway" class="footer-text__links_column download pc">
            <h3>
              <span>{{
                $t("global.footer.GetInstaDownload.GetInstaDownload")
              }}</span>
            </h3>
            <!-- <div v-if="$i18n.locale === 'en'" @click="downloadWindows">
            <button-download-windows :size="'footer'" />
          </div> -->
            <div @click="downloadAndroid">
              <button-download-android :size="'footer'" style="width: 150px;" />
            </div>
            <div v-if="!$store.state.hideIosMinorLang" @click="downloadIOS">
              <button-download-ios :size="'footer'" style="width: 150px;" />
            </div>
          </div>
        </div>
      </div>
      <div v-if="userCenter" class="mobile user-center-bottom-blank"></div>
    </div>

    <div class="footer-text mobile">
      <div class="footer-text__links">
        <div class="wrapper">
          <div class="footer-text__links_column logo">
            <img :src="$store.state.productLogo" alt="logo" />
            <div class="right">
              <h2>{{ $store.state.productName }}</h2>
              <p>© {{ currentYear }} {{ COMMON.getDomain() }}</p>
            </div>
            <!--          <div id="footer-translate-blank"></div>-->
          </div>
          <!--        <div class="footer-text__links_column first">-->
          <!--          <h3><span>{{ $t('global.footer.about.about') }}</span></h3>-->
          <!--          <nuxt-link to="/terms">{{ $t('global.footer.about.termsOfUse') }}</nuxt-link>-->
          <!--          <nuxt-link to="/privacy">{{ $t('global.footer.about.privacyPolicy') }}</nuxt-link>-->
          <!--          <nuxt-link to="/affiliate-solutions">Affiliate Program</nuxt-link>-->
          <!--        </div>-->
          <div class="footer-text__links_column">
            <h3>
              <span>{{ $t("global.footer.services.services") }}</span>
            </h3>
            <nuxt-link to="/buy-instagram-followers">
              Get Instagram Followers
            </nuxt-link>
            <nuxt-link to="/buy-auto-instagram-followers">
              Get Auto Instagram Followers
            </nuxt-link>
            <nuxt-link to="/buy-instagram-likes">
              Get Instagram Likes
            </nuxt-link>
            <nuxt-link to="/affiliate-solutions">
              Affiliate Program
            </nuxt-link>
          </div>
          <div class="footer-text__links_column">
            <h3>
              <span>{{ $t("global.footer.resource.resource") }}</span>
            </h3>
            <nuxt-link v-if="$i18n.locale === 'en'" to="/login">
              {{
                $t("global.footer.resource.login")
              }}
            </nuxt-link>
            <nuxt-link to="/faqs">
              {{
                $t("global.footer.resource.faq")
              }}
            </nuxt-link>
            <nuxt-link to="/blog">
              {{
                $t("global.footer.resource.blog")
              }}
            </nuxt-link>
          </div>
          <!--        <div class="footer-text__links_column pc download">-->
          <!--          <h3><span>{{ $t('global.footer.GetInstaDownload.GetInstaDownload') }}</span></h3>-->
          <!--          <div v-if="$i18n.locale === 'en'" @click="downloadWindows">-->
          <!--            <button-download-windows :size="'footer'" />-->
          <!--          </div>-->
          <!--          <div @click="downloadAndroid">-->
          <!--            <button-download-android :size="'footer'" />-->
          <!--          </div>-->
          <!--          <div v-if="!$store.state.hideIosMinorLang" @click="downloadIOS">-->
          <!--            <button-download-ios :size="'footer'" />-->
          <!--          </div>-->
          <!--        </div>-->
        </div>
      </div>
      <div v-if="userCenter" class="mobile user-center-bottom-blank"></div>
    </div>
  </div>
</template>

<script>
import ButtonDownloadAndroid from "@/components/button/button-download-android";
// import ButtonDownloadWindows from '@/components/button/button-download-windows';
import ButtonDownloadIos from "@/components/button/button-download-ios";

export default {
  name: "FooterLinkV2",
  components: {
    ButtonDownloadIos,
    // ButtonDownloadWindows,
    ButtonDownloadAndroid,
  },
  props: {},
  data() {
    return {
      userCenter: false,
      giveaway: false,
    };
  },
  computed: {
    currentYear() {
      let date = new Date();
      return date.getFullYear();
    },
  },
  watch: {
    $route(to) {
      this.userCenter =
        to.path === "/user" ||
        to.path === "/user-get-followers" ||
        to.path === "/user-get-likes" ||
        to.path === "/user-asknet" ||
        to.path === "/user-get-followers-asknet" ||
        to.path === "/user-get-likes-asknet";

      this.giveaway = to.path === "/followers-giveaway";
    },
  },
  mounted() {},
  methods: {
    downloadWindows() {
      let gaParam = this.$i18n.locale !== "en" ? `-${this.$i18n.locale}` : "";
      this.$ga.event("insdl", "download", `footerwindl${gaParam}`);
      window.location.href = this.$constant.app.download.windows;
    },
    downloadAndroid() {
      let gaParam = this.$i18n.locale !== "en" ? `-${this.$i18n.locale}` : "";

      //this.$ga.event("insdl", "download", `footerappdl${gaParam}`);
      this.$ga.event("insdl", "download", "hppcdl1-app");

      if (this.$i18n.locale === "fr" || this.$i18n.locale === "de") {
        // window.location.href = `${this.$constant.app.download.android}?lang=${this.$i18n.locale}`;
        // Beacon:MinorAppDownload
        location.href = this.$store.state.minorLangAdrLink;
      } else {
        window.location.href = this.$store.state.enAdrLink;
      }
    },
    downloadIOS() {
      let gaParam = this.$i18n.locale !== "en" ? `-${this.$i18n.locale}` : "";
      // this.$ga.event("insdl", "download", `footeriosdl${gaParam}`);
      this.$ga.event("insdl", "download", "hppcdl1-ios")




      if (this.$i18n.locale === "en") {
        if (this.COMMON.getURLQuery("camp") !== null) {
          const param = this.COMMON.getURLQuery("camp");

          this.$store.commit("enIosLinkCt", param);
          window.location.href =
            `${this.$store.state.enIosLink}` +
            `?pt=${this.$store.state.enIosLinkPt}` +
            `&ct=${this.$store.state.enIosLinkCt}` +
            `&mt=8`;
        } else {
          const href =
            `${this.$store.state.enIosLink}` +
            `?pt=${this.$store.state.enIosLinkPt}` +
            `&ct=${this.$store.state.enIosLinkCt}` +
            `&mt=8`;
          window.location.href = href;
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
          behavior: "smooth",
        });
      } else {
        this.$nuxt.$router.push({ path: path });
      }
      return false;
    },
  },
};
</script>

<style lang="scss" scoped>
.footer-text {
  padding: 100px 0;
  background-color: #ffffff;

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
        //margin-right: 115px;
        padding-right: 20px;
        width: 360px;
        //height: 330px;
        border-right: 1px solid rgb(255, 255, 255, 0.15);

        i,
        img {
          display: inline-block;
          width: 48px;
          height: 48px;
          object-fit: contain;
          vertical-align: middle;
        }

        .right {
          margin-left: 16px;
          display: inline-block;
          vertical-align: middle;

          p {
            margin-top: 0;
            font: normal normal 500 14px/20px BalooChettan;
          }
        }
      }

      &.download {
        margin-bottom: 20px;
        width: 240px;
      }

      h2 {
        font: normal normal 500 20px/30px BalooChettan;
        color: #000000;
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

    p,
    a {
      font: 500 14px/20px BalooChettan;
      color: #7f8498;
      transition: all 0.1s;
    }

    a {
      display: block;
      margin-top: 13px;
      //line-height: 40px;

      &:hover {
        color: rgba(42, 42, 42, 1);
      }
    }

    h3 {
      margin-bottom: 20px;

      span {
        font: 600 20px BalooChettan;
        color: #000;
        text-transform: uppercase;
      }
    }
  }
}

@media (max-width: 768px) {
  .footer-text {
    background-color: #ffffff;
    padding: 70px 0 60px;

    .footer-text__links {
      .wrapper {
        display: block;
      }

      .footer-text__links_column {
        margin: 50px auto 0;
        padding: 0 6.4vw;
        width: 100% !important;
        height: auto !important;
        text-align: left;

        &.logo {
          margin-top: 0;
          margin-right: 0;
          padding: 0 6.4vw;
          border-right: none;
          text-align: left;

          i,
          img {
            width: 48px;
            height: 48px;
            vertical-align: middle;
          }

          p {
            margin-top: 0;
            font: normal normal 500 14px/20px BalooChettan;
            color: #7f8498;
          }

          //v2
          .right {
            margin-left: 16px;
            display: inline-block;
            text-align: left;
            vertical-align: middle;
          }
        }

        h2 {
          margin-top: 0;
          font: normal normal 500 20px/26px BalooChettan;
          color: #000000;
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
            //background-color: #F5F6FB;
            //padding: 0 8vw;
            color: #000000;
          }

          &:before {
            position: absolute;
            left: 0;
            top: 50%;
            width: 100%;
            height: 1px;
            background-color: rgba(168, 168, 168, 0.17);
            content: "";
            display: none;
          }
        }

        p,
        a {
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

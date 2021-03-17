<template>
  <div
    id="home-2-free"
    ref="mark"
    :class="{ 'on': animateBegin }"
    class="home-2-free home__sec"
  >
    <div class="wrapper">
      <h2 class="home__sec_h2 step-0">Wie machen wir "KOSTENLOS" möglich?</h2>
      <p class="home__sec_p step-1">
        Hier versammeln sich echte Instagrammer, um einander zu folgen und sich zu mögen. Jeder kann Startmünzen erhalten, indem er die App herunterlädt, anderen folgt oder seinen Posts Likes gibt. Mit den Münzen können Sie unbegrenzt kostenlose Follower und Likes auf Instagram für Ihre eigenen Instagram-Konten und - Beiträge erhalten. Klingt das gut? Laden Sie {{ $store.state.productName }} herunter, um kostenlose und unbegrenzte Follower und Likes zu erhalten. Es ist einfach und 100% sicher!
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home2FreeDeIos',
  components: {},
  data() {
    return {
      animateBegin: false,
      pageIOS: false
    };
  },
  mounted() {
    window.addEventListener('scroll', this.handle);
    this.pageIOS = this.$route.path === '/event-ios';
  },
  destroyed() {
    window.removeEventListener('scroll', this.handle);
  },
  methods: {
    handleScroll: function () {
      this.animateBegin = this.$refs.mark.getBoundingClientRect().top < window.innerHeight * 0.66;
    },
    handle() {
      const fun = this.handleScroll();
      this.COMMON.throttle(fun, 60, 100);
    },
    downloadIOS() {
      if (this.$i18n.locale === 'en') {
        if (this.$route.path === '/event-ios') {
          this.$ga.event('insdl', 'download', 'hpiosdl1-ad');
          window.location.href = this.$constant.app.download.ios1;
        } else {
          this.$ga.event('insdl', 'download', 'hpiosdl1');
          window.location.href
            = this.$constant.app.download.ios
            + `?pt=121014724&ct=${this.$store.state.adQueryCampaignHome}&mt=8`;
        }
      } else {
        this.$ga.event('insdl', 'download', `hp3-${this.$i18n.locale}`);
        // window.location.href
        //   = this.$constant.app.download.ios
        //   + `${this.$constant.app.campaign.iosMinorLang}&ct=${this.$i18n.locale}campaign`;

        // Beacon:MinorAppDownload
        location.href = this.$store.state.minorLangIosLink;
      }
    },
    downloadAndroid() {
      if (this.$i18n.locale === 'en') {
        this.$ga.event('insdl', 'download', 'hpappdl1');
      } else {
        if (this.COMMON.isAndroid()) {
          this.$ga.event('insdl', 'download', `hpadr3-${this.$i18n.locale}`);
        } else {
          this.$ga.event('insdl', 'download', `hp2-${this.$i18n.locale}`);
        }
      }

      if (this.$i18n.locale === 'fr' || this.$i18n.locale === 'de') {
        // window.location.href = `${this.$constant.app.download.android}?lang=${this.$i18n.locale}`;

        // Beacon:MinorAppDownload
        location.href = this.$store.state.minorLangAdrLink;
      } else {
        window.location.href = this.$constant.app.download.android;
      }
    },
    downloadWindows() {
      this.$ga.event('insdl', 'download', 'hpwindl1');
      window.location.href = this.$constant.app.download.windows;
    },
    gaBuyNow() {
      let client = '';
      let clientLong = 'PC';
      if (this.COMMON.isAndroid()) {
        client = 'adr';
        clientLong = 'android';
      }
      this.$ga.event('insbuy', 'buy', `hp2-${this.$i18n.locale}`);
      this.$router.push({
        path: '/buy-instagram-followers',
        query: {
          utm_source: clientLong,
          utm_medium: 'homepage'
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@include animateSteps(5);

.home-2-free {
  text-align: center;

  .home-2-free__btn-container {
    margin-top: 66px;
    margin-bottom: 66px;
    display: inline-block;

    .blank {
      display: inline-block;
      vertical-align: middle;
      width: 32px;
      height: 1px;
    }

    .btn {
      display: inline-block;
      width: 240px;
      height: 80px;
      vertical-align: top;
    }
  }

  .home-2-free__p {
    position: relative;
    margin-top: 42px;
    font-size: 0;
    z-index: -1;

    i {
      margin-right: 16px;
      display: inline-block;
      width: 20px;
      height: 24px;
      background: url("~@/assets/images/global/icon_safe.svg") no-repeat center;
      background-size: contain;
      vertical-align: middle;
    }

    span {
      font: 500 20px Montserrat;
      color: #000;
      vertical-align: middle;
    }
  }

  .home-2-free__img {
    margin-top: 42px;
  }
}

@media (max-width: 768px) {
  .home-2-free {
    .home-2-free__btn-container {
      margin-top: 30px;
      margin-bottom: 0;

      .blank {
        display: none;
      }
    }

    .home-2-free__p {
      margin-top: 12px;

      span {
        font-size: (20px/2);
      }

      i {
        width: 15px;
        height: 20px;
      }
    }

    .home-2-free__img {
      margin-top: 30px;
    }
  }
}
</style>

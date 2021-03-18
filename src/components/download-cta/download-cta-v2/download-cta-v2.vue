<template>
  <div class="download-cta">
    <!--toolbar-->
    <div class="toolbar">
      <div class="unit home"
           :class="{ 'on': $route.path === '/' }"
           @click="jumpTo('/')"
      >
        <i></i>
        <span>Home</span>
      </div>
      <div class="unit followers"
           :class="{ 'on': $route.path === '/buy-instagram-followers' }"
           @click="jumpTo('/buy-instagram-followers')"
      >
        <i></i>
        <span>Followers</span>
      </div>
      <div class="unit likes"
           :class="{ 'on': $route.path === '/buy-instagram-likes' }"
           @click="jumpTo('/buy-instagram-likes')"
      >
        <i></i>
        <span>Likes</span>
      </div>
    </div>

    <!--test-->
    <div class="btn" @click="gaDownload">
      <button-theme-gradient text="Get Free Followers" square shadow :icon="'ins'" font-size="size-14" />
    </div>
  </div>
</template>

<script>
import ButtonThemeGradient from '@/components/button/button-theme-gradient';

export default {
  name: 'DownloadCtaV2',
  components: {
    ButtonThemeGradient
  },
  data() {
    return {
      gaBottomBtnDownloadLabel: '',
      gaBottomBtnDownloadLabelV2: '',
      text: '',
      path: this.$nuxt.$route.path
    };
  },
  computed: {
    appAnalyticsMinorLang() {
      return {
        pt: 121014724,
        ct: `${this.$i18n.locale}campaign`,
        mt: 8
      };
    }
  },
  watch: {
    $route(to) {
      this.path = to.path;
    }
  },
  methods: {
    gaDownload() {
      // console.log(this.$nuxt.$route.path);
      this.gaBottomBtnDownloadLabelInit(this.$nuxt.$route.path);
      this.gaBottomBtnDownloadLabelV2Init();


      let single = '';
      if (this.$nuxt.$route.path === '/event-user-generated-contest') single = '-ugc';
      if (this.$nuxt.$route.path === '/instagram-name-generator') single = '-iug';

      this.$ga.event(
        'insdl',
        'download',
        `hp${this.$store.state.platform}dlnew-fc`
      );
      // this.$ga.event(
      //   'insdl',
      //   'download',
      //   `${this.$store.state.platform}dl-bottom${this.gaBottomBtnDownloadLabelV2}${single}`
      // );

      let ct = this.$store.state.enIosLinkCt;
      if (this.$nuxt.$route.path === '/event-user-generated-contest') ct += '-ugc';

      let gp3d = this.$store.state.enAdrLinkGpReferrer;
      if (this.$nuxt.$route.path === '/event-user-generated-contest') gp3d += '-ugc';

      if (this.$store.state.isiOS)
        location.href
          = `${this.$store.state.enIosLink}`
          + `?pt=${this.$store.state.enIosLinkPt}`
          + `&ct=${this.$store.state.enIosLinkCt}`
          + `&mt=8`;
      else {
        // location.href
        //   = this.$store.state.enAdrLinkWithoutGpReferrer
        //   + this.$constant.app.campaign.androidReferrerQuery
        //   + gp3d;
        location.href
          = this.$constant.app.download.androidGooglePlay1
          + this.$constant.app.campaign.androidReferrerQuery
          + this.$store.state.enAdrLinkGpReferrer;
        // location.href
        //   = this.$constant.app.download.android;
      }
    },
    gaBottomBtnDownloadLabelInit(to) {
      if (to.path === '/user' || to.path === '/user-asknet') {
        this.gaBottomBtnDownloadLabel = '';
      } else if (to.path === '/user-get-followers' || to.path === '/user-get-followers-asknet') {
        this.gaBottomBtnDownloadLabel = '-f';
      } else if (to.path === '/user-get-likes' || to.path === '/user-get-likes-asknet') {
        this.gaBottomBtnDownloadLabel = '-l';
      } else if (to.path === '/event-ios') {
        this.gaBottomBtnDownloadLabel = '-ad';
      } else {
        this.gaBottomBtnDownloadLabel = '-other';
      }
    },
    gaBottomBtnDownloadLabelV2Init() {
      if (this.$route.name === 'blog') {
        this.gaBottomBtnDownloadLabelV2 = '-bloghp';
      }

      if (this.$route.name === 'blog-detail') {
        const blogID = this.$route.params.id.split('-').pop();
        this.gaBottomBtnDownloadLabelV2 = `-blog${blogID}`;
      }
    },

    gaDownloadAPPTest() {
      let url = '';

      if (this.COMMON.isiOS()) {
        if (this.$store.state.downloadBtnTestA)
          url = this.$constant.app.download.downloadBtnTestAIos;
        if (this.$store.state.downloadBtnTestB)
          url = this.$constant.app.download.downloadBtnTestBIos;
        if (this.$store.state.downloadBtnTestC)
          url = this.$constant.app.download.downloadBtnTestCIos;
      }

      if (this.COMMON.isAndroid()) {
        if (this.$store.state.downloadBtnTestA)
          url = this.$constant.app.download.downloadBtnTestAAdr;
        if (this.$store.state.downloadBtnTestB)
          url = this.$constant.app.download.downloadBtnTestBAdr;
        if (this.$store.state.downloadBtnTestC)
          url = this.$constant.app.download.downloadBtnTestCAdr;
      }

      this.$ga.event(
        'insdl',
        'download',
        `hp${this.$store.state.platform}dl${this.$store.state.gaColor}-fc`
      );
      location.href = url;
    },
    gaBtnGateDownload() {
      this.$store.state.btnTestGate && this.path === '/' ? this.gaDownloadAPPTest() : this.gaDownload();
    },
    testPages(path) {
      return path
        = '/get-instagram-followers-likes'
        || '/instagram-video-downloader'
        || '/the-most-followed-instagram'
        || '/instagram-name-generator'
        || '/lucky-draw';
    },

    jumpTo(path) {
      if (this.$nuxt.$route.path !== path) this.$nuxt.$router.push(path);

      // GA
      let gaPageLabel = '';

      if (path === '/') gaPageLabel = 'h';
      if (path === '/buy-instagram-followers') gaPageLabel = 'f';
      if (path === '/buy-instagram-likes') gaPageLabel = 'l';
      this.$ga.event('buttonclick', 'click', `hp-navi-${gaPageLabel}`);
    }
  }
};
</script>

<style lang="scss" scoped>
.download-cta {
  position: fixed;
  bottom: 0;
  left: 0;
  /*z-index: 2000000;*/
  z-index: 9;
  padding: 16px 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background: rgba(255, 255, 255, 1);
  //backdrop-filter: saturate(180%) blur(30px);
  box-shadow: 0 3px 24px rgba(0, 0, 0, 0.16);
  font-size: 0;

  .animate {
    animation: headShake 1.2s 2.4s ease-in-out infinite;
  }
}

@media (max-width: 768px) {
  .download-cta {
    padding: 8px 2.13vw;
    padding-bottom: env(safe-area-inset-bottom);
    padding-bottom: calc(8px + env(safe-area-inset-bottom));
    //height: (112px/2);

    .text, .btn, .toolbar {
      display: inline-block;
      vertical-align: middle;
    }

    .text {
      padding-right: 4vw;
      width: 58vw;
      font: 600 12px/15px BalooChettan;
      color: #2A2A2A;
      text-shadow: 0 3px 24px rgba(0, 0, 0, 0.16);
    }

    .btn {
      width: 36.53vw;
      height: 40px;
    }

    .toolbar {
      padding-right: 4vw;
      width: 59.21vw;
      display: flex;
      justify-content: space-around;
      align-items: center;

      .unit {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        i {
          display: block;
          width: 6.4vw;
          height: 5.33vw;
          background-size: contain;
          background-position: center;
          background-repeat: no-repeat;
          pointer-events: none;
        }

        span {
          font: normal normal 600 11px/16px BalooChettan;
          color: rgb(0, 0, 0, 0.8);
          text-shadow: 0 3px 24px rgba(0, 0, 0, 0.16);
          pointer-events: none;
        }

        &.home i, &.home:hover i {
          background-image: url("img/icon_toolbar_home_normal.svg");
        }

        &.home:active i, &.home.on i {
          background-image: url("img/icon_toolbar_home.svg");
        }

        &.followers i, &.followers:hover i {
          background-image: url("img/icon_toolbar_followers_normal.svg");
        }

        &.followers:active i {
          background-image: url("img/icon_toolbar_followers.svg");
        }

        &.likes i, &.likes:hover i {
          background-image: url("img/icon_toolbar_likes_normal.svg");
        }

        &.likes:active i {
          background-image: url("img/icon_toolbar_likes.svg");
        }
      }
    }
  }
}

@keyframes headShake {
  0% {
    transform: translateX(0);
  }

  6.5% {
    transform: translateX(-6px) rotateY(-9deg);
  }

  18.5% {
    transform: translateX(5px) rotateY(7deg);
  }

  31.5% {
    transform: translateX(-3px) rotateY(-5deg);
  }

  43.5% {
    transform: translateX(2px) rotateY(3deg);
  }

  50% {
    transform: translateX(0);
  }
}
</style>

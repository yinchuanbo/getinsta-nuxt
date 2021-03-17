<template>
  <div class="download-cta">
    <div class="text">{{ $store.state.downloadCtaText }}</div>

    <!--    <div class="btn animate" @click="gaDownload">-->
    <!--      <button-yellow-download-->
    <!--        v-if="$store.state.isAndroid && $store.state.enAdrType === 0"-->
    <!--        :text="$t('global.downloadCTA.btn')" :font-size="'bottom-cta'"-->
    <!--      />-->
    <!--      <button-download-android-original v-if="$store.state.isAndroid && $store.state.enAdrType === 1" />-->
    <!--      <button-download-ios-original v-if="$store.state.isiOS" />-->
    <!--    </div>-->

    <!--test-->
    <div v-if="path !== '/'" class="btn animate" @click="gaDownload">
      <div v-if="!testPages(path)" class="w-100-h-100">
        <button-yellow-download
          v-if="$store.state.isAndroid && $store.state.enAdrType === 0"
          :text="$t('global.downloadCTA.btn')" :font-size="'bottom-cta'"
        />
        <button-download-android-original v-if="$store.state.isAndroid && $store.state.enAdrType === 1" />
        <button-download-ios-original v-if="$store.state.isiOS" />
      </div>
      <div v-if="testPages(path)" class="w-100-h-100">
        <button-theme-gradient text="Get Free Followers" square shadow :icon="'ins'" font-size="size-11" />
      </div>
    </div>

    <!--test-->
    <div v-if="path === '/' && !$store.state.btnTestGate"
         class="btn animate" @click="gaBtnGateDownload"
    >
      <!--      <button-yellow-download-->
      <!--        v-if="$store.state.isAndroid && $store.state.enAdrType === 0"-->
      <!--        :text="$t('global.downloadCTA.btn')" :font-size="'bottom-cta'"-->
      <!--      />-->
      <!--      <button-download-android-original v-if="$store.state.isAndroid && $store.state.enAdrType === 1" />-->
      <!--      <button-download-ios-original v-if="$store.state.isiOS" />-->
      <button-theme-gradient text="Get Free Followers" square shadow :icon="'ins'" font-size="size-11" />
    </div>
    <div v-if="path === '/' && $store.state.btnTestGate && !$store.state.downloadBtnTestA"
         class="btn animate" @click="gaDownloadAPPTest"
    >
      <button-theme-gradient text="Get Free Followers" square shadow :icon="'ins'" font-size="size-11" />
    </div>
  </div>
</template>

<script>
import ButtonYellowDownload from '@/components/button/button-yellow-download';
import ButtonDownloadIosOriginal from '@/components/button/button-download-ios-original';
import ButtonDownloadAndroidOriginal from '@/components/button/button-download-android-original';
import ButtonThemeGradient from '@/components/button/button-theme-gradient';

export default {
  name: 'DownloadCta',
  components: {
    ButtonThemeGradient,
    ButtonDownloadAndroidOriginal,
    ButtonDownloadIosOriginal,
    ButtonYellowDownload
  },
  data() {
    return {
      gaBottomBtnDownloadLabel: '',
      gaBottomBtnDownloadLabelV2: '',
      text: '',
      path: this.$route.path
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
      // console.log(this.$route.path);
      this.gaBottomBtnDownloadLabelInit(this.$route.path);
      this.gaBottomBtnDownloadLabelV2Init();

      const platform = this.COMMON.isiOS() ? 'ios' : 'app';

      let single = '';
      if (this.$route.path === '/event-user-generated-contest') single = '-ugc';
      if (this.$route.path === '/instagram-name-generator') single = '-iug';

      // this.$ga.event(
      //   'insdl',
      //   'download',
      //   `musermanage${platform}dl${this.gaBottomBtnDownloadLabel}`
      // );
      this.$ga.event(
        'insdl',
        'download',
        `${platform}dl-bottom${this.gaBottomBtnDownloadLabelV2}${single}`
      );

      let ct = this.$store.state.enIosLinkCt;
      if (this.$route.path === '/event-user-generated-contest') ct += '-ugc';

      let gp3d = this.$store.state.enAdrLinkGpReferrer;
      if (this.$route.path === '/event-user-generated-contest') gp3d += '-ugc';

      if (this.$store.state.isiOS)
        location.href
          = `${this.$store.state.enIosLink}`
          + `?pt=${this.$store.state.enIosLinkPt}`
          + `&ct=${ct}`
          + `&mt=8`;
      else {
        // location.href
        //   = this.$store.state.enAdrLinkWithoutGpReferrer
        //   + this.$constant.app.campaign.androidReferrerQuery
        //   + gp3d;
        location.href
          = this.$constant.app.download.androidGooglePlay1
          + this.$constant.app.campaign.androidReferrerQuery
          + gp3d;
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
  width: 100%;
  background: rgba(255, 255, 255, 1);
  //backdrop-filter: saturate(180%) blur(30px);
  box-shadow: 0 1.5px 12px rgba(0, 0, 0, 0.16);
  font-size: 0;

  .animate {
    animation: headShake 1.2s 2.4s ease-in-out infinite;
  }
}

@media (max-width: 768px) {
  .download-cta {
    padding: 8px 4vw;
    padding-bottom: env(safe-area-inset-bottom);
    padding-bottom: calc(8px + env(safe-area-inset-bottom));
    //height: (112px/2);

    .text, .btn {
      display: inline-block;
      vertical-align: middle;
    }

    .text {
      padding-right: 4vw;
      width: 58vw;
      font: 600 12px/15px Montserrat;
      color: #2A2A2A;
      text-shadow: 0 3px 24px rgba(0, 0, 0, 0.16);
    }

    .btn {
      width: 34vw;
      height: 40px;
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

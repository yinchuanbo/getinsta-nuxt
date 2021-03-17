<template>
  <div id="app">
    <!--header-->
    <!--    <header-container v-if="!headerHide && !$store.state.v2" />-->
    <!--    <header-container-v2 v-if="$store.state.v2" />-->

    <!--general-blank-->
    <!--    <general-blank v-if="$store.state.v2" :ad-height="$store.state.v2AdHeightMobile" />-->

    <!--router-view-->
    <transition name="fade" mode="out-in">
      <Nuxt />
    </transition>

    <!--footer-->
    <!--    <footer-container v-if="!footerHide && !$store.state.v2" />-->

    <!--    <footer-container-v2 v-if="!footerHide && $store.state.v2"/>-->

    <!--bottom download cta-->
    <!--    <download-cta v-if="!bottomCTAHide && $store.state.isMobile && ifShowCta && !$store.state.v2" />-->
    <!--    <download-cta-v2 v-if="$store.state.v2 && $store.state.isMobile" />-->
    <!--top download cta-->
    <!--    <cta-download v-if="ctaDownloadShow && ifShowCta && $store.state.accessCountry !== 'BR'" />-->
    <!--    <cta-download v-if="false" />-->
    <!--    <download-cta-black-friday v-if="ctaDownloadBlackFridayShow && $store.state.isMobile" />-->
    <!--    <download-cta-christmas v-if="ctaDownloadBlackFridayShow && $store.state.isMobile" />-->
    <!--    <download-cta-valentine v-if="downloadCtaSeasonShow" />-->
    <!--    <download-cta-spring v-if="downloadCtaSeasonShow && !$store.state.v2" />-->

    <!--giveaway gate-->
    <!--    <rightWindows v-if="isRightWindows" :type="windowType"></rightWindows>-->
    <!--    <bottomWindows v-if="false" :type="windowType"></bottomWindows>-->


    <!--Multi-lang switch-->
    <!--<div v-if="envTest" class="locale-switch">-->
    <!--  <button @click="$i18n.locale = 'en'">EN</button>-->
    <!--  <button @click="$i18n.locale = 'fr'">FR</button>-->
    <!--  <button @click="$i18n.locale = 'de'">DE</button>-->
    <!--</div>-->

    <!--addThis-->
    <!--    <AddThis v-if="addThisLoad" public-id="ra-5def5b1abb78a6a2" />-->
    <back-to-top />
  </div>
</template>

<script>
// API
import apiAdr from '@/api/api.app.android.js';
import apiV2 from '@/api/api.v2.js';

// Components
// import AddThis from 'vue-simple-addthis-share';
// import rightWindows from '@/views/global/floatingWindows/rightWindows/rightWindows';
// import bottomWindows from '@/views/global/floatingWindows/bottomWindows/bottomWindows';
// import scrollToTopImage from '@/assets/images/global/icon-to-top.svg';
// import DownloadCta from '@/views/global/download-cta/download-cta';
// import HeaderContainer from '@/views/global/header/header-container';
// import FooterContainer from '@/views/global/footer/footer-container';
// import CtaDownload from '@/views/global/download-cta/download-cta-top';

// Images
import logoGetInsta from '@/assets/images/global/logo.svg';
// import logoGetInsta from '@assets/global/logo.svg';
import logoGetinshot from '@/assets/images/global/logo_getinshot.svg';
import logoFollowersGallery from '@/assets/images/global/logo_follower-gallery.svg';
import BackToTop from '@/components/go-top/gp-top';
// import DownloadCtaBlackFriday from '@/views/global/download-cta/download-cta-black-friday/download-cta-black-friday';
// import DownloadCtaChristmas from '@/views/global/download-cta/download-cta-christmas/download-cta-christmas';
// import DownloadCtaValentine from '@/views/global/download-cta/download-cta-valentine/download-cta-valentine';
// import DownloadCtaSpring from '@/views/global/download-cta/download-cta-spring/download-cta-spring';
// import HeaderContainerV2 from '@/views/global/header/header-container-v2';
// import GeneralBlank from '@/views/global/general-blank';
// import FooterContainerV2 from '@/views/global/footer/footer-container-v2';
// import DownloadCtaV2 from '@/views/global/download-cta/download-cta-v2/download-cta-v2';

export default {
  name: 'APP',
  components: {
    BackToTop
    // DownloadCtaV2,
    // FooterContainerV2,
    // GeneralBlank,
    // HeaderContainerV2,
    // DownloadCtaSpring,
    // DownloadCtaValentine,
    // DownloadCtaChristmas,
    // DownloadCtaBlackFriday,
    // bottomWindows,
    // rightWindows,
    // CtaDownload,
    // GoTop,
    // DownloadCta,
    // AddThis,
    // FooterContainer,
    // HeaderContainer
  },
  data() {
    return {
      ifShowCta: false,
      addThisHide: true,
      bottomCTAHide: false,
      headerHide: false,
      footerHide: false,
      addThisLoad: false,
      isRightWindows: false,
      favIconURL: '',
      envTest: this.COMMON.envTest() || false,
      envIsEasy: true,
      isBottomWindows: false,
      windowType: 'giveaway',
      ctaDownloadShow: false,
      ctaDownloadBlackFridayShow: false,
      downloadCtaSeasonShow: false
    };
  },
  watch: {
    $route(to) {
    }
  },
  mounted() {
    this.setDefaultLocalStorageVueX();
  },
  methods: {
    setDefaultLocalStorageVueX() {
      this.$store.commit('userName',
        this.$storage.has('userName')
          ? this.$storage.get('userName') : ''
      );
      this.$store.commit('userCoins',
        this.$storage.has('userCoins')
          ? this.$storage.get('userCoins') : ''
      );
      this.$store.commit('userCoins',
        this.$storage.has('userCoins')
          ? this.$storage.get('userCoins') : ''
      );
      this.$store.commit('cartLength',
        this.$storage.has('cartLength')
          ? this.$storage.get('cartLength') : ''
      );
    }
  }
};
</script>

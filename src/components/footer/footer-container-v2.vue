<template>
  <div>
    <footer v-if="!$store.state.footerSelect" :class="{ active: active }">
      <footer-link-new-v2 v-if="!ptPage && !payPage && !$store.state.isMobile" />
      <footer-link-v2 v-if="!ptPage && !payPage && $store.state.isMobile" />
      <footer-link-pt v-if="ptPage && !payPage" />
      <footer-copyright-new-v2 v-if="!ptPage && !payPage && !$store.state.isMobile" :pay-page="payPage" />
      <footer-copyright-v2 v-if="!ptPage && !payPage && $store.state.isMobile" :pay-page="payPage" />
      <footer-lite v-if="payPage" />
    </footer>
    <footer v-if="$store.state.footerSelect" :class="{ 'active': active }">
      <footer-easter-sale />
    </footer>
  </div>
</template>

<script>
// import FooterLink from '@/components/footer/footer-link';
import FooterLinkPt from '@/components/footer/footer-link-pt';
// import FooterCopyright from '@/components/footer/footer-copyright';
import FooterLite from '@/components/footer/footer-lite';
import FooterCopyrightV2 from '@/components/footer/footer-copyright-v2';
import FooterCopyrightNewV2 from '@/components/footer/footer-copyright-new-v2';
import FooterLinkNewV2 from '@/components/footer/footer-link-new-v2';
import FooterLinkV2 from '@/components/footer/footer-link-v2';

import FooterEasterSale from '@/components/footer/footer-eastersale';

export default {
  name: 'FooterContainerV2',
  components: {
    FooterLinkV2,
    FooterCopyrightV2,
    FooterLite,
    // FooterCopyright,
    FooterLinkPt,
    // FooterLink
    FooterCopyrightNewV2,
    FooterLinkNewV2,
    FooterEasterSale
  },
  props: {},
  data() {
    return {
      active: false,
      ptPage: false,
      payPage: false,
      giveaway: false,
    };
  },
  watch: {
    $route(to) {
      this.ptPage = to.path === '/pt/get-instagram-followers';
      this.payPage =
        to.path === '/checkout' ||
        to.path === '/order-detail' ||
        to.path === '/order-fail' ||
        to.path === '/event-followers' ||
        to.path === '/event-likes' ||
        to.path === '/event-ios' ||
        to.path === '/event-get' ||
        to.path === '/followers-giveaway';

      this.giveaway = to.path === '/followers-giveaway';
    }
  },
  mounted() {
    this.timer = setTimeout(this.headerActive, 500);
    const that = this;
    window.onresize = () => {
      return (() => {
        window.screenWidth = document.body.clientWidth;
        that.screenWidth = window.screenWidth;
      })();
    };
  },
  destroyed() {
    clearTimeout(this.timer);
  },
  methods: {
    headerActive() {
      this.active = true;
    }
  }
};
</script>

<style lang="scss">
footer {
  position: relative;
  width: 100%;
  opacity: 0;
  transform: translateY(6px);
  transition: all 0.5s;

  &.active {
    opacity: 1;
    transform: translateY(0);
  }

  &.ac {
    padding-bottom: 93px;
  }
}

@media (max-width: 768px) {
  footer {
    &.ac {
      padding-bottom: 47px;
    }
  }
}
</style>

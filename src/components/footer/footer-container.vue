<template>
  <footer :class="{ 'active': active }">
    <footer-link v-if="!ptPage&&!payPage" />
    <footer-link-pt v-if="ptPage&&!payPage" />
    <footer-copyright v-if="!ptPage&&!payPage" />
    <footer-lite v-if="payPage" />

    <div v-show="!payPage && $i18n.locale === 'en'" id="wrapper-translate">
      <div id="google_translate_element"></div>
    </div>
  </footer>
</template>

<script>
import FooterLink from '@/components/footer/footer-link';
import FooterLinkPt from '@/components/footer/footer-link-pt';
import FooterCopyright from '@/components/footer/footer-copyright';
import FooterLite from '@/components/footer/footer-lite';

export default {
  name: 'FooterContainer',
  components: {
    FooterLite,
    FooterCopyright,
    FooterLinkPt,
    FooterLink
  },
  props: {},
  data() {
    return {
      active: false,
      ptPage: false,
      payPage: false,
      giveaway: false
    };
  },
  watch: {
    $route(to) {
      this.ptPage = to.path === '/pt/get-instagram-followers';
      this.payPage
        = to.path === '/checkout'
        || to.path === '/order-detail'
        || to.path === '/order-fail'
        || to.path === '/event-followers'
        || to.path === '/event-likes'
        || to.path === '/event-ios'
        || to.path === '/event-get'
        || to.path === '/followers-giveaway';


      this.giveaway = to.path === '/followers-giveaway';
    }
  },
  mounted() {
    this.timer = setTimeout(this.headerActive, 500);
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
  transition: all .5s;

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

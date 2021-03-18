<template>
  <div ref="mark" :class="{ 'on': animateBegin }" class="home-8-how home__sec">
    <div class="wrapper">
      <h2 v-if="!$store.state.isiOS" class="home__sec_h2 step-0">
        {{ $t('home.home-8.title') }}
      </h2>
      <h2 v-if="$store.state.isiOS" class="home__sec_h2 step-0">
        {{ $t('home.home-8.title-ios') }}
      </h2>
      <p class="home__sec_p step-1">
        {{ $t('home.home-8.text') }}
      </p>
      <div v-if="$store.state.isiOS && $i18n.locale === 'de'" class="btn-container" @click="faqJump">
        <button-purple text="Mehr Details - FAQ" />
      </div>
    </div>
  </div>
</template>

<script>
import ButtonPurple from '@/components/button/button-purple';

export default {
  name: 'Home8How',
  components: { ButtonPurple },
  data() {
    return {
      animateBegin: false
    };
  },
  computed: {},
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
    faqJump() {
      this.$ga.event('buttonclick', 'click', 'hpiosfaq-de');
      this.$router.push({
        path: '/faqs',
        query: {
          utm_source: 'IOS',
          utm_medium: 'hpiosfaq'
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@include animateSteps(2);

.home-8-how {
}

@media (max-width: 768px) {
  .home-8-how {
    .btn-container {
      margin: 70px auto 0;
      width: (540px/2);
      height: (112px/2);
    }
  }
}
</style>

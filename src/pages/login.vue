<template>
  <instance />
</template>

<script>
import instance from '@/views/account/login.vue';

export default {
  components: { instance },
  async asyncData({ req }) {
    return {
      hostname: process.server ? req.headers.host : location.hostname
    };
  },
  head() {
    return {
      title: `${this.$store.state.productName}${this.$t('account.login.meta.title')}`,
      meta: [],
      link: [
        {
          hid: 'canonical',
          rel: 'canonical',
          href: `https://${this.hostname}${this.$nuxt.$route.path}`
        }
      ]
    };
  }
};
</script>



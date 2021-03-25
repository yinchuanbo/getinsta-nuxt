<template>
  <instance />
</template>

<script>
import instance from '@/views/payment/order-fail.vue';

export default {
  components: { instance },
  async asyncData({ app, req, route, store }) {
    let data = {
      hostname: process.server ? req.headers.host : location.hostname,
      meta: { title: `` }
    };

    if (route.path === '/order-fail-2') {
      data.meta.title = `${store.state.productName}${app.i18n.t('orderFail.meta.title-1')}`;
    } else {
      data.meta.title = `${store.state.productName}${app.i18n.t('orderFail.meta.title-0')}`;
    }

    return data;
  },
  head() {
    return {
      title: this.meta.title,
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



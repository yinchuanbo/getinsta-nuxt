<template>
  <instance />
</template>

<script>
import instance from '@/views/payment/checkout/checkout-container.vue';

export default {
  components: { instance },
  async asyncData({ app, req, route, store }) {
    let data = {
      hostname: process.server ? req.headers.host : location.hostname,
      meta: { title: `` }
    };

    if (route.path === '/checkout-2') {
      data.meta.title = `${store.state.productName} ${app.i18n.t('checkout.meta.title-1')}`;
    } else {
      data.meta.title = `${store.state.productName} ${app.i18n.t('checkout.meta.title-0')}`;
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



<template>
  <instance />
</template>

<script>
import instance from '@/views/user-center/user-center';

export default {
  components: { instance },
  async asyncData({ app, req, store, route }) {

    let data = {
      hostname: process.server ? req.headers.host : location.hostname,
      meta: {
        title: ``,
        canonical: route.path
      }
    };

    if (route.path === '/user-get-followers') {
      data.meta.title = `${store.state.productName}${app.i18n.t('userCenter.meta.title-1')}`;
    } else if (route.path === '/user-get-likes') {
      data.meta.title = `${store.state.productName}${app.i18n.t('userCenter.meta.title-2')}`;
    } else {
      data.meta.title = `${store.state.productName}${app.i18n.t('userCenter.meta.title-0')}`;
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
          href: `https://${this.hostname}${this.meta.canonical}`
        }
      ]
    };
  }
};
</script>



<template>
  <instance />
</template>

<script>
import instance from '@/views/campaign/easter-sale/eastersale.vue';

export default {
  name: 'EasterSale',
  components: { instance },
  async asyncData({ req }) {
    return {
      hostname: process.server ? req.headers.host : location.hostname
    };
  },
  head() {
    return {
      title: 'Special Easter Sale 2021-GetInsta',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Buy 1000 Instagram Followers and Get 1000 for Free. GetInsta Easter Sale 2021.'
        }
      ],
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



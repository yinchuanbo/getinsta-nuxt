<template>
  <instance />
</template>

<script>
import instance from '@/views/home/home.vue';

export default {
  components: { instance },
  async asyncData({ req }) {
    return {
      hostName: process.server ? req.headers.host : location.hostname
    };
  },
  head() {
    return {
      title: ` YouberUp: Get Real YouTube Subscribers & Quality Views`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'YouberUp helps get more real YouTube subscribers and quality YouTube views from real YouTube users. See subscribes, views up fast and free.'
        }
      ],
      link: [
        {
          hid: 'canonical',
          rel: 'canonical',
          href: `https://${this.hostName}${this.$nuxt.$route.path}`
        }
      ]
    };
  }
};
</script>



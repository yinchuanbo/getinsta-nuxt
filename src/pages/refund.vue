<template>
  <instance />
</template>

<script>
import instance from '@/views/protocol/refund-policy.vue';

export default {
  components: { instance },
  async asyncData({ req }) {
    return {
      hostname: process.server ? req.headers.host : location.hostname
    };
  },
  head() {
    return {
      title: 'GetInsta - Right of Refund',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Want to gain real Instagram followers/likes fast and free? The best Instagram follower app GetInsta helps you get 5000+ Instagram followers & likes instantly.'
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



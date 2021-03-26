<template>
  <instance />
</template>

<script>
import instance from '@/views/campaign/lottery/lottery';

export default {
  components: { instance },
  async asyncData({ req }) {
    return {
      hostname: process.server ? req.headers.host : location.hostname
    };
  },
  head() {
    return {
      title: 'GetInsta - Lucky Draw',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Participate in the Lucky Draw on easygetinsta.com to get real Instagram followers for free instantly. 100% Winning!'
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



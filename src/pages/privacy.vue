<template>
  <instance />
</template>

<script>
import instance from '@/views/protocol/privacy-policy.vue';

export default {
  components: { instance },
  async asyncData({ req }) {
    return {
      hostname: process.server ? req.headers.host : location.hostname
    };
  },
  head() {
    return {
      title: 'GetInsta - Privacy Policy',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Since GetInsta is committed to protecting your privacy, there is no need to worry about the security of your personal information.'
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



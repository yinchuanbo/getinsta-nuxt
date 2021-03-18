<template>
  <instance />
</template>

<script>
import instance from '@/views/faq/feedback.vue';

export default {
  components: { instance },
  async asyncData({ req }) {
    return {
      hostname: process.server ? req.headers.host : location.hostname
    };
  },
  head() {
    return {
      title: 'GetInsta Support Center - Feedback',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'We still love you. (￣∇￣)'
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



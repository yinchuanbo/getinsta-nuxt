<template>
  <instance />
</template>

<script>
import instance from '@/views/protocol/terms-of-service.vue';

export default {
  components: { instance },
  async asyncData({ req }) {
    return {
      hostname: process.server ? req.headers.host : location.hostname
    };
  },
  head() {
    return {
      title: 'GetInsta - Terms of Use',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Learn about the legal and fair use of applications ("app", "software") or "services" of GetInsta.'
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



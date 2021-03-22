<template>
  <error :error-code="error.statusCode" />
</template>
<script>
import error from '@/views/error/404';

export default {
  components: { error },
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  async asyncData({ req }) {
    return {
      hostname: process.server ? req.headers.host : location.hostname
    };
  },
  head() {
    return {
      title: 'Page not found',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Page not found - GetInsta 404 Page'
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

<template>
  <error />
</template>
<script>
import error from '@/views/error-page/404';

export default {
  components: { error },
  props: ['error'],
  async asyncData({ req }) {
    if (process.server) {
      return {
        hostName: req.headers.host
      };
    } else {
      return {
        hostName: location.hostname
      };
    }
  },
  head() {
    return {
      title: 'Page not found',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Page not found - iTop VPN 404 Page'
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

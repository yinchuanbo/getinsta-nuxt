<template>
  <instance />
</template>

<script>
import instance from '@/views/campaign/event-dl/seo-6-event-download.vue';

export default {
  components: { instance },
  async asyncData({ req }) {
    return {
      hostname: process.server ? req.headers.host : location.hostname
    };
  },
  head() {
    return {
      title: 'Buy instagram followers - how to get more followers on Instagram',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'GetInsta promises you an instant and organic way to get real Instagram followers and likes. Download App to buy more followers.'
        },
        {
          name: 'keywords',
          content: 'cheap instagram followers, buy instagram followers, get instagram followers, how to get more instagram followers, how to get followers on instagram, instagram likes'
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



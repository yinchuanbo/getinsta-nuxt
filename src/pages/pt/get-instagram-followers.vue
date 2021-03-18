<template>
  <instance />
</template>

<script>
import instance from '@/views/home-pt/get-instagram-followers';

export default {
  components: { instance },
  async asyncData({ req }) {
    return {
      hostname: process.server ? req.headers.host : location.hostname
    };
  },
  head() {
    return {
      title: 'GetInsta - Ganhe Seguidores Reais no Instagram',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Ganhe seguidores reais e curtidas GRÁTIS no Instagram. Baixe para Android.'
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



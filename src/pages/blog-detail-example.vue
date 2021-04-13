<template>
  <instance />
</template>

<script>
import instance from '@/views/blog/blog-detail/blog-detail-example.vue';

export default {
  components: { instance },
  async asyncData({ req }) {
    return {
      hostname: process.server ? req.headers.host : location.hostname
    };
  },
  head() {
    return {
      title: 'Blog Detail Example',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: ''
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



<template>
  <instance />
</template>

<script>
import instance from '@/views/tools/video-downloader/video-downloader';

export default {
  components: { instance },
  async asyncData({ req }) {
    return {
      hostname: process.server ? req.headers.host : location.hostname
    };
  },
  head() {
    return {
      title: 'Instagram Username Generator - Check Availability Instantly',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'The Instagram username generator could generate various random Instagram usernames. Try it now to create a satisfying username on Instagram.'
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



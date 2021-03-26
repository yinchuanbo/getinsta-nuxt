<template>
  <instance />
</template>

<script>
import instance from '@/views/tools/instagram-ranking-tool/instagram-ranking-tool.vue';

export default {
  components: { instance },
  async asyncData({ req }) {
    return {
      hostname: process.server ? req.headers.host : location.hostname
    };
  },
  head() {
    return {
      title: 'Daily Update: Top 20 Most Followed Instagram Accounts 2021',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Who has the most followers on Instagram? View the real-time top 20 most followed IG accounts and download the GetInsta apk to be the next influencer.'
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



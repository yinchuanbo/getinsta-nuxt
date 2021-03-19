<template>
  <instance />
</template>

<script>
import instance from '@/views/blog/blog-list/blog-list';

export default {
  components: { instance },
  async asyncData({ req }) {
    return {
      hostname: process.server ? req.headers.host : location.hostname
    };
  },
  head() {
    return {
      title: this.$t('blog.meta.title'),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t('blog.meta.description')
        }
      ],
      link: [
        {
          hid: 'canonical',
          rel: 'canonical',
          href: `https://${this.hostname}${this.$nuxt.$route.path}`
        },
        {
          rel: 'alternate',
          hreflang: 'en',
          href: `https://${this.hostname}${this.$nuxt.$route.path}`
        },
        {
          rel: 'alternate',
          hreflang: 'fr',
          href: `https://fr.easygetinsta.com${this.$nuxt.$route.path}`
        },
        {
          rel: 'alternate',
          hreflang: 'de',
          href: `https://de.easygetinsta.com${this.$nuxt.$route.path}`
        },
        {
          rel: 'alternate',
          hreflang: 'es',
          href: `https://es.easygetinsta.com${this.$nuxt.$route.path}`
        },
        {
          rel: 'alternate',
          hreflang: 'ar',
          href: `https://ar.easygetinsta.com${this.$nuxt.$route.path}`
        },
        {
          rel: 'alternate',
          hreflang: 'it',
          href: `https://it.easygetinsta.com${this.$nuxt.$route.path}`
        },
        {
          rel: 'alternate',
          hreflang: 'pt',
          href: `https://pt.easygetinsta.com${this.$nuxt.$route.path}`
        }
      ]
    };
  }
};
</script>



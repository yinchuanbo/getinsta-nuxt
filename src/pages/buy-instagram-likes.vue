<template>
  <instance />
</template>

<script>
import instance from '@/views/store/store-instant-and-daily/store-likes.vue';

export default {
  components: { instance },
  async asyncData({ req }) {
    return {
      hostname: process.server ? req.headers.host : location.hostname
    };
  },
  head() {
    return {
      title: this.$t('store.meta.title-3'),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t('store.meta.description-1')
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
          href: `https://www.easygetinsta.com${this.$nuxt.$route.path}`
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



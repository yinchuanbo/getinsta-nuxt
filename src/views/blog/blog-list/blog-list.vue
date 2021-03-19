<template>
  <div class="blog">
    <blog0-title />
    <blog1-content />
  </div>
</template>

<script>
import Blog0Title from '@/views/blog/blog-list/views/blog-0-title';
import Blog1Content from '@/views/blog/blog-list/views/blog-1-content';

export default {
  name: 'Blog',
  components: {
    Blog1Content,
    Blog0Title
  },
  metaInfo() {
    return {
      title: this.$t('blog.meta.title'),
      meta: [
        {
          name: 'description',
          content: this.$t('blog.meta.description')
        }
      ],
      link: [
        {
          rel: 'canonical',
          href: `${window.location.origin}${this.$route.path}`
        },
        {
          rel: 'alternate',
          hreflang: 'en',
          href: `https://www.easygetinsta.com${this.$route.path}`
        },
        {
          rel: 'alternate',
          hreflang: 'fr',
          href: `https://fr.easygetinsta.com${this.$route.path}`
        },
        {
          rel: 'alternate',
          hreflang: 'de',
          href: `https://de.easygetinsta.com${this.$route.path}`
        },
        {
          rel: 'alternate',
          hreflang: 'es',
          href: `https://es.easygetinsta.com${this.$route.path}`
        },
        {
          rel: 'alternate',
          hreflang: 'ar',
          href: `https://ar.easygetinsta.com${this.$route.path}`
        },
        {
          rel: 'alternate',
          hreflang: 'it',
          href: `https://it.easygetinsta.com${this.$route.path}`
        },
        {
          rel: 'alternate',
          hreflang: 'pt',
          href: `https://pt.easygetinsta.com${this.$route.path}`
        }
      ]
    };
  }
};
</script>

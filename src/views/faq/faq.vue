<template>
  <div class="faq">
    <faq0-list />
    <faq1-form />
  </div>
</template>

<script>
import Faq0List from '@/views/faq/views/faq-0-list';
import Faq1Form from '@/views/faq/views/faq-1-form';

export default {
  name: 'Faq',
  components: {
    Faq1Form,
    Faq0List
  },
  data() {
    return {};
  },
  metaInfo() {
    return {
      title: this.$t('faq.meta.title'),
      meta: [
        {
          name: 'description',
          content: this.$t('faq.meta.description')
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



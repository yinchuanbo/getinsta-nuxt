<template>
  <div class="store-shelf">
    <store-daily-likes-banner />
    <store-daily-likes-tab @emitToParent="parentHandle" />
    <store-daily-likes-why />
  </div>
</template>

<script>
import StoreDailyLikesWhy from '@/views/store/store-instant-and-daily/views/store-daily-likes-why/view';
import StoreDailyLikesTab from '@/views/store/store-instant-and-daily/views/store-daily-likes-tab/view';
import StoreDailyLikesBanner from '@/views/store/store-instant-and-daily/views/store-daily-likes-banner/view';

export default {
  name: 'StoreShelf',
  components: {
    StoreDailyLikesBanner,
    StoreDailyLikesTab,
    StoreDailyLikesWhy
  },
  metaInfo() {
    return {
      title: 'Buy Instagram auto likes [Real, Safe, Instant] - GetInsta',
      meta: [
        {
          name: 'description',
          content: 'Buy Instagram daily likes from GetInsta at a low cost. Instant delivery, real likes, and 24/7 customer support. Boost your Instagram now.'
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
  },
  data() {
    return {
      meta: {
        title: 'GetInsta - Store - Buy Followers',
        description: 'Buy Instagram followers from the best and trusted supplier. Get real followers for your Instagram account, reach more people and grow Your account!'
      }
    };
  },
  methods: {
    parentHandle(data) {
      let query = this.$route.query;
      query.anchor = 'tab';
      if (data.route.path !== this.$route.path && data.route.path !== '') {
        this.$router.push({ path: data.route.path, query: query });
      }
      this.meta.title = data.meta.title;
      this.meta.description = data.meta.description;
    }
  }
};
</script>

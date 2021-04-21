<template>
  <div>
    <div v-if="!$store.state.s2" class="store-shelf">
      <StoreDailyLikesBanner />
      <StoreDailyLikesTab @emitToParent="parentHandle" />
      <StoreDailyLikesWhy />
    </div>
    <div v-if="$store.state.s2" class="store-shelf">
      <StoreDailyLikesBannerS2 />
      <StoreDailyLikesTabS2 @emitToParent="parentHandle" @changetabsIndex="changetabsIndex"/>
      <StoreLikesHave v-if="tabsIndex === 1" />
      <StoreLikesWhy />
      <StoreLikesStep />
      <StoreLikesFaqs />
    </div>
  </div>
</template>

<script>
import StoreDailyLikesWhy from '@/views/store/store-instant-and-daily/views/store-daily-likes-why/view';
import StoreDailyLikesTab from '@/views/store/store-instant-and-daily/views/store-daily-likes-tab/view';
import StoreDailyLikesBanner from '@/views/store/store-instant-and-daily/views/store-daily-likes-banner/view';
// s2
import StoreDailyLikesBannerS2 from '@/views/store/store-instant-and-daily/views/store-daily-likes-banner/s2/view';
import StoreDailyLikesTabS2 from '@/views/store/store-instant-and-daily/views/store-daily-likes-tab/s2/view';
import StoreLikesWhy from '@/views/store/store-instant-and-daily/views/store-s2/buy-instagram-likes/why.vue';
import StoreLikesStep from '@/views/store/store-instant-and-daily/views/store-s2/buy-instagram-likes/step.vue';
import StoreLikesFaqs from '@/views/store/store-instant-and-daily/views/store-s2/buy-instagram-likes/faqs.vue';
import StoreLikesHave from '@/views/store/store-instant-and-daily/views/store-s2/buy-instagram-likes/have.vue';

export default {
  name: 'StoreShelf',
  components: {
    StoreDailyLikesBanner,
    StoreDailyLikesTab,
    StoreDailyLikesWhy,
    // s2
    StoreDailyLikesBannerS2,
    StoreDailyLikesTabS2,
    StoreLikesWhy,
    StoreLikesStep,
    StoreLikesFaqs,
    StoreLikesHave
  },
  data() {
    return {
      meta: {
        title: 'GetInsta - Store - Buy Followers',
        description:
          'Buy Instagram followers from the best and trusted supplier. Get real followers for your Instagram account, reach more people and grow Your account!'
      },
      tabsIndex: 1
    };
  },
  // watch: {
  //   $route(to, from) {
  //     let path = to.path;
  //     this.getGa(path);
  //   }
  // },
  // mounted() {
  //   let path = this.$route.path;
  //   this.getGa(path);
  // },
  methods: {
    parentHandle(data) {
      let query = this.$route.query;
      // query.anchor = 'tab';
      if (data.route.path !== this.$route.path && data.route.path !== '') {
        this.$router.push({ path: data.route.path, query: query });
      }
      this.meta.title = data.meta.title;
      this.meta.description = data.meta.description;
    },
    getGa(path) {
      if (path === '/buy-instagram-likes') {
        if (this.$store.state.s2) {
          this.$ga.event('insimp', 'impression', 'instantl-new');
        } else {
          this.$ga.event('insimp', 'impression', 'instantl-old');
        }
      } else if (path === '/buy-instagram-daily-likes') {
        if (this.$store.state.s2) {
          this.$ga.event('insimp', 'impression', 'dailyl-new');
        } else {
          this.$ga.event('insimp', 'impression', 'dailyl-old');
        }
      }
    },
    changetabsIndex(i) {
      this.tabsIndex = i;
    }
  }
};
</script>

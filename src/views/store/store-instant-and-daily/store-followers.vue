<template>
  <div>
    <div v-if="!$store.state.s2" class="store-shelf">
      <store-shelf0-banner-followers />
      <store-shelf1-buy-followers @emitToParent="parentHandle" />
      <store-shelf2-why />
    </div>
    <div v-if="$store.state.s2" class="store-shelf">
      <store-shelf0-banner-followers-s2 />
      <store-shelf1-buy-followers-s2 @emitToParent="parentHandle" />
      <store-s2-tips />
      <store-s2-guarantee />
      <store-s2-faqs />
    </div>
  </div>
</template>

<script>
import StoreShelf0BannerFollowers from '@/views/store/store-instant-and-daily/views/store-shelf-0-banner-followers/view';
import StoreShelf1BuyFollowers from '@/views/store/store-instant-and-daily/views/store-shelf-1-buy-followers/view';
import StoreShelf2Why from '@/views/store/store-instant-and-daily/views/store-shelf-2-why/view';
// s2
import StoreShelf0BannerFollowersS2 from '@/views/store/store-instant-and-daily/views/store-shelf-0-banner-followers/s2/view';
import StoreShelf1BuyFollowersS2 from '@/views/store/store-instant-and-daily/views/store-shelf-1-buy-followers/s2/view';
import StoreS2Tips from '@/views/store/store-instant-and-daily/views/store-s2/buy-instagram-followers/view.vue';
import StoreS2Guarantee from '@/views/store/store-instant-and-daily/views/store-s2/buy-instagram-followers/guarantee.vue';
import StoreS2Faqs from '@/views/store/store-instant-and-daily/views/store-s2/buy-instagram-followers/faqs.vue';

export default {
  name: 'StoreShelf',
  components: {
    StoreShelf0BannerFollowers,
    StoreShelf1BuyFollowers,
    StoreShelf2Why,
    //s2
    StoreShelf1BuyFollowersS2,
    StoreShelf0BannerFollowersS2,
    StoreS2Tips,
    StoreS2Guarantee,
    StoreS2Faqs
  },
  data() {
    return {
      meta: {
        title: 'GetInsta - Store - Buy Followers',
        description:
          'Buy Instagram followers from the best and trusted supplier. Get real followers for your Instagram account, reach more people and grow Your account!'
      }
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
      if (path === '/buy-instagram-followers') {
        if (this.$store.state.s2) {
          this.$ga.event('insimp', 'impression', 'instantf-new');
        } else {
          this.$ga.event('insimp', 'impression', 'instantf-old');
        }
      } else if (path === '/buy-instagram-daily-followers') {
        if (this.$store.state.s2) {
          this.$ga.event('insimp', 'impression', 'dailyf-new');
        } else {
          this.$ga.event('insimp', 'impression', 'dailyf-old');
        }
      }
    }
  }
};

</script>

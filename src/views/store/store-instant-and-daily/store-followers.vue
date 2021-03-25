<template>
  <div class="store-shelf">
    <store-shelf0-banner-followers />
    <store-shelf1-buy-followers @emitToParent="parentHandle" />
    <store-shelf2-why />
  </div>
</template>

<script>
import StoreShelf1BuyFollowers from '@/views/store/store-instant-and-daily/views/store-shelf-1-buy-followers/view';
import StoreShelf2Why from '@/views/store/store-instant-and-daily/views/store-shelf-2-why/view';
import StoreShelf0BannerFollowers from '@/views/store/store-instant-and-daily/views/store-shelf-0-banner-followers/view';

export default {
  name: 'StoreShelf',
  components: {
    StoreShelf0BannerFollowers,
    StoreShelf1BuyFollowers,
    StoreShelf2Why
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

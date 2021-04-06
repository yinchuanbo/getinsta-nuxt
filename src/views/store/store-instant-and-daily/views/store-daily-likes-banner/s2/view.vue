<template>
  <!--  <div class="store-shelf-0-banner black-friday">-->
  <div class="store-shelf-0-banner spring">
    <div class="header-blank"></div>
    <!--    <div class="black-friday-img"></div>-->
    <!--    <div class="new-year__snow"></div>-->
    <!--    <div class="new-year__top-img"></div>-->
    <div class="spring__top-img"></div>
    <h1>{{ $t('store.banner.titleLikesDaily') }}</h1>
    <h2 v-if="show" @click="$router.push('/buy-instagram-followers')"><span>Go to buy followers</span><i></i></h2>
    <div class="printing"></div>
  </div>
</template>

<script>
export default {
  name: 'StoreDailyLikesBanner',
  data() {
    return {
      show: true
    }
  },
  watch: {
    $route(to, from) {
      // if(to.path === '/buy-instagram-likes') {
      //   this.show = false
      // } else if(to.path === '/buy-instagram-daily-likes') {
      //   this.show = true
      // }
    }
  }
};
</script>

<style scoped lang="scss" src="./view.scss"></style>

<template>
  <!--  <div class="store-shelf-0-banner black-friday">-->
  <div class="store-shelf-0-banner spring">
    <div class="header-blank"></div>
    <!--    <div class="black-friday-img"></div>-->
    <!--    <div class="new-year__snow"></div>-->
    <!--    <div class="new-year__top-img"></div>-->
    <div class="spring__top-img"></div>
    <h1>{{ $t('store.banner.titleLikesDaily') }}</h1>
    <h2 @click="$router.push('/buy-instagram-followers')"><span>Go to buy followers</span><i></i></h2>
    <div class="printing"></div>
  </div>
</template>

<script>
export default {
  name: 'StoreDailyLikesBanner'
};
</script>

<style scoped lang="scss" src="view.scss"></style>

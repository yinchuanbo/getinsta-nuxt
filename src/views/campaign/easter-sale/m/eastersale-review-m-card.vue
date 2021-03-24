<template>
  <div class="eastersale-review-card">
    <div v-for="item in lists" :key="item.id" class="eastersale-review-card_item">
      <div class="eastersale-review-card_avator">
        <img :src="item.avator" alt="">
      </div>
      <h2>{{ item.name }}</h2>
      <div class="eastersale-review_stars">
        <eastersale-star-m v-for="i in 5" :key="i" />
      </div>
      <div class="eastersale-review_text">
        {{ item.text }}
      </div>
    </div>
  </div>
</template>

<script>
import EastersaleStarM from './eastersale-star-m'
export default {
  components: {
    EastersaleStarM
  },
  props: {
    lists: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  data() {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
.eastersale-review-card {
  // margin-bottom: 100px;
  display: flex;
  flex-direction: column;
  .eastersale-review-card_item {
    width: 100%;
    padding: 0 24px;
    box-sizing: border-box;
    height: auto;
    margin-bottom: 50px;
    &:last-child {
      margin-bottom: 70px;
    }
    .eastersale-review-card_avator {
      width: 64px;
      height: 64px;
      border-radius: 100%;
      margin: 0 auto;
      margin-bottom: 16px;
      background-color: skyblue;
      img {
        border-radius: 100%;
        width: 100%;
        height: 100%;
      }
    }
    h2 {
      text-align: center;
      font: normal normal 600 20px/25px BalooChettan;
      letter-spacing: 0px;
      color: #000000;
      opacity: 1;
      margin-bottom: 5px;
    }
    .eastersale-review_stars {
      display: flex;
      justify-content: center;
      margin-bottom: 16px;
    }
    .eastersale-review_text {
      text-align: center;
      font: normal normal 600 14px/20px BalooChettan;
      letter-spacing: 0px;
      color: #7F8498;
      opacity: 1;
    }
  }
}
</style>

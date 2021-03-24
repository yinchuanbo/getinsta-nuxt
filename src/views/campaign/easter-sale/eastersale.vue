<template>
  <div class="eastersale-container">
    <div v-if="screenWidth >= 769">
      <eastersale-banner :end-time="endTime"></eastersale-banner>
      <eastersale-buy :products="products"></eastersale-buy>
      <eastersale-tips></eastersale-tips>
      <eastersale-review></eastersale-review>
      <transition name="fade-skeleton" mode="out-in">
        <eastersale-alert v-if="$store.state.showAlert"></eastersale-alert>
      </transition>
    </div>
    <div v-if="screenWidth <= 768" :style="{ 'padding-top': v2AdHeightMobile + 'px' }">
      <eastersale-banner-m></eastersale-banner-m>
      <eastersale-cards-m :end-time="endTime" :products="products"></eastersale-cards-m>
      <eastersale-tips-m></eastersale-tips-m>
      <eastersale-review-m></eastersale-review-m>
      <transition name="fade-skeleton" mode="out-in">
        <eastersale-alert v-if="$store.state.showAlert"></eastersale-alert>
      </transition>
    </div>
  </div>
</template>

<script>
import EastersaleBanner from './eastersale-banner';
import EastersaleBuy from './eastersale-buy';
import EastersaleTips from './eastersale-tips';
import EastersaleReview from './eastersale-review';
import EastersaleAlert from './eastersale-alert';
//m
import EastersaleBannerM from './m/eastersale-banner-m';
import EastersaleCardsM from './m/eastersale-cards-m';
import EastersaleTipsM from './m/eastersale-tips-m';
import EastersaleReviewM from './m/eastersale-review-m';
export default {
  components: {
    EastersaleBanner,
    EastersaleBuy,
    EastersaleTips,
    EastersaleReview,
    EastersaleAlert,
    //m
    EastersaleBannerM,
    EastersaleCardsM,
    EastersaleTipsM,
    EastersaleReviewM
  },
  data() {
    return {
      screenWidth: document.body.clientWidth,
      endTime: '2021-04-10 00:00:00',
      products: [
        {
          pro_num: 500,
          free_num: 500,
          amount: '22.99',
          // product_id: 1403, //dev
          product_id: 1601, //pro
          original_price_decimal: 30,
        },
        {
          pro_num: 1000,
          free_num: 1000,
          amount: '29.99',
          // product_id: 1404, // dev
          product_id: 1602, // pro
          original_price_decimal: 39.99,
        }
      ]
    }
  },
  computed: {
    v2AdHeightPc() {
      var num;
      if(this.$store.state.v2 && this.$store.state.v2AdHeightPc) {
        num = this.$store.state.v2AdHeightPc + 80 - 64;
      } else if(this.$store.state.v2 && !this.$store.state.v2AdHeightPc) {
        num = 16;
      } else if(!this.$store.state.v2) {
        num = 80;
      }
      return num;
    },
    v2AdHeightMobile() {
      var num;
      if(this.$store.state.v2 && this.$store.state.v2AdHeightMobile) {
        num = this.$store.state.v2AdHeightMobile;
      } else if(this.$store.state.v2 && !this.$store.state.v2AdHeightMobile) {
        num = 0;
      } else if(!this.$store.state.v2) {
        num = 44;
      }
      return num;
    }
  },
  watch: {
      screenWidth(val) {
          this.screenWidth = val;
      }
  },
  mounted() {
      const that = this
      window.onresize= () => {
          return (() => {
              window.screenWidth = document.body.clientWidth;
              that.screenWidth = window.screenWidth;
          })();
      }
  },
  metaInfo() {
    return {
      title: 'Special Easter Sale 2021-GetInsta',
      meta: [
        {
          name: "description",
          content: "Buy 1000 Instagram Followers and Get 1000 for Free. GetInsta Easter Sale 2021."
        }
      ],
    };
  },
  destroyed() {
    this.$store.commit('showAlert', false);
  }
};
</script>

<style lang="scss" scoped>
.eastersale-container {
  overflow: hidden;
  height: 100%;
  position: relative;
  padding-top: 80px;
}
@media (min-width: 769px) {
  .eastersale-container {
    min-width: 1210px;
  }
}
@media (max-width: 768px) {
  .eastersale-container {
    overflow: hidden;
    padding-top: 64px;
  }
}
</style>

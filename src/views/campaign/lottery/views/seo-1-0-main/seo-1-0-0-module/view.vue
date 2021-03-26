<template>
  <div v-if="lotteryObj" class="lottery-unit"
       :class="{
         'launch': lotteryObj.order_id === -1, 'on': on,
         'loading': loading
       }"
  >
    <div v-if="!loading && lotteryObj.order_id !== -1 && lotteryObj.reward_count !==0" class="unit-container">
      <img :src="coinIconDisplay(lotteryObj.reward_count)" alt="icon">
      <h3>{{ lotteryObj.reward_count }} Coins</h3>
      <p v-if="lotteryObj.equivalent_type !== 0">
        <span>
          = {{ lotteryObj.equivalent_quantity }}
          {{ lotteryObj.equivalent_type === 1 ? 'Likes' : 'Followers' }}
        </span>
        <i :class="{ 'like': lotteryObj.equivalent_type === 1, 'follower': lotteryObj.equivalent_type === 2 }"></i>
      </p>
    </div>
    <div v-if="!loading &&lotteryObj.order_id !== -1 && lotteryObj.reward_count === 0" class="unit-container">
      <img :src="coinIconDisplay(lotteryObj.reward_count)" alt="icon">
      <h3>Thanks for</h3>
      <p><span>participation</span></p>
    </div>
    <div v-if="lotteryObj.order_id === -1" class="unit-container">
      <h3>GO</h3>
      <p>100% Winning!</p>
    </div>
    <div v-if="loading && lotteryObj.order_id !== -1" class="unit-container skeleton">
      <div class="img"><span></span></div>
      <h3><span></span></h3>
      <p><span></span></p>
    </div>
  </div>
</template>

<script>
import iconCoinSmile from '@/assets/images/seo-pages/seo-1-lottery/seo-1-0-main__icon-coin-smile.svg';
import iconCoinLevel0 from '@/assets/images/seo-pages/seo-1-lottery/seo-1-0-main__icon-coin-level-0.png';
import iconCoinLevel1 from '@/assets/images/seo-pages/seo-1-lottery/seo-1-0-main__icon-coin-level-1.png';
import iconCoinLevel2 from '@/assets/images/seo-pages/seo-1-lottery/seo-1-0-main__icon-coin-level-2.png';
import iconCoinLevel3 from '@/assets/images/seo-pages/seo-1-lottery/seo-1-0-main__icon-coin-level-3.png';
import iconCoinLevel4 from '@/assets/images/seo-pages/seo-1-lottery/seo-1-0-main__icon-coin-level-4.png';
import iconCoinLevel5 from '@/assets/images/seo-pages/seo-1-lottery/seo-1-0-main__icon-coin-level-5.png';
import iconCoinLevel6 from '@/assets/images/seo-pages/seo-1-lottery/seo-1-0-main__icon-coin-level-6.png';

export default {
  name: 'Seo100Module',
  components: {},
  props: {
    lotteryObj: {
      type: Object,
      default() {
        return {
          'reward_type': 1,
          'reward_count': 1600,
          'reward_id': 1,
          'order_id': 1,
          'equivalent_type': 2,
          'equivalent_quantity': 10
        };
      },
      required: true
    },
    on: {
      type: Boolean,
      default: false,
      required: false
    },
    loading: {
      type: Boolean,
      default: false,
      required: false
    }
  },
  data() {
    return {
      iconCoinLevelNum0: 750,
      iconCoinLevelNum1: 1399,
      iconCoinLevelNum2: 1600,
      iconCoinLevelNum3: 2699,
      iconCoinLevelNum4: 4600,
      iconCoinLevelNum5: 7200,
      iconCoinLevelNum6: 69000,
      iconCoinSmile,
      iconCoinLevel0,
      iconCoinLevel1,
      iconCoinLevel2,
      iconCoinLevel3,
      iconCoinLevel4,
      iconCoinLevel5,
      iconCoinLevel6
    };
  },
  mounted() {
  },
  methods: {
    coinIconDisplay(quantity) {
      let icon;
      if (quantity === 0) {
        icon = this.iconCoinSmile;
      } else if (quantity > 0 && quantity <= this.iconCoinLevelNum0) {
        icon = this.iconCoinLevel0;
      } else if (this.iconCoinLevelNum0 < quantity && quantity <= this.iconCoinLevelNum1) {
        icon = this.iconCoinLevel1;
      } else if (this.iconCoinLevelNum1 < quantity && quantity <= this.iconCoinLevelNum2) {
        icon = this.iconCoinLevel2;
      } else if (this.iconCoinLevelNum2 < quantity && quantity <= this.iconCoinLevelNum3) {
        icon = this.iconCoinLevel3;
      } else if (this.iconCoinLevelNum3 < quantity && quantity <= this.iconCoinLevelNum4) {
        icon = this.iconCoinLevel4;
      } else if (this.iconCoinLevelNum4 < quantity && quantity <= this.iconCoinLevelNum5) {
        icon = this.iconCoinLevel5;
      } else {
        icon = this.iconCoinLevel6;
      }

      return icon;
    }
  }
};
</script>

<style scoped lang="scss" src="./view.scss"></style>

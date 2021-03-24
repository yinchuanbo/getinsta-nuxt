<template>
  <div class="eastersale-buy-card">
    <div class="eastersale-buy-money">
      <div class="eastersale-buy-money_text">
        <div class="eastersale-buy-money_text-num">
          <span>{{ product.pro_num }}</span>
          <span>Followers</span>
        </div>
        <div class="eastersale-buy-money_text-plus">+</div>
        <div class="eastersale-buy-money_text-img">
          <eastersale-free-icon :freenum="product.free_num" />
        </div>
      </div>
      <eastersale-buy-btn :bgcolor="bgcolor" :product="product" />
    </div>
    <div v-if="bgImg" class="eastersale-buy-bg"></div>
  </div>
</template>

<script>
import EastersaleFreeIcon from './eastersale-free-icon.vue'
import EastersaleBuyBtn from './eastersale-buy-btn.vue'
export default {
  components: {
    EastersaleFreeIcon,
    EastersaleBuyBtn
  },
  props: {
    product: {
      type: Object,
      default: function() {
        return {}
      }
    },
    bgcolor: {
      type: String,
      default: ''
    },
    bgImg: {
      type: Boolean,
      default: false
    }
  },
};
</script>

<style lang="scss" scoped>
.eastersale-buy-card {
  position: relative;
  .eastersale-buy-bg {
    position: absolute;
    top: 10px;
    left: 10px;
    width: 437px;
    height: 121px;
    background: url('images/card-bg.svg') no-repeat;
    background-size: cover;
  }
  .eastersale-buy-money {
    width: 460px;
    height: 224px;
    background: #FFFFFF 0% 0% no-repeat padding-box;
    box-shadow: 0px 6px 12px #FF585826;
    border: 1px solid #FFCECE;
    border-radius: 12px;
    opacity: 1;
    margin-right: 47px;
    .eastersale-buy-money_text {
      width: 100%;
      height: 80px;
      margin-top: 33px;
      margin-bottom: 28px;
      display: flex;
      justify-content: center;
      .eastersale-buy-money_text-num {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        span:first-child {
          text-align: center;
          font: normal normal bold 40px/45px BalooChettan;
          letter-spacing: 0px;
          color: #000000;
          opacity: 1;
        }
        span:last-child {
          text-align: center;
          font: normal normal 500 24px/24px BalooChettan;
          letter-spacing: 0px;
          color: #7F8498;
          opacity: 1;
        }
      }
      .eastersale-buy-money_text-plus {
        line-height: 80px;
        font-size: 35px;
        color: #000;
        font-weight: 600;
        margin: 0 52px 0 58px;
      }
      .eastersale-buy-money_text-img {
        width: 83px;
        height: 80px;
      }
    }
  }
}

</style>

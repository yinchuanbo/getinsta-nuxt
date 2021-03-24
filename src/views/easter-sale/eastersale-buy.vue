<template>
  <div class="eastersale-buy">
    <div class="eastersale-buy-money">
      <eastersale-buy-card bgcolor="#F5B560" :bg-img="false" :product="products[0]" />
      <div class="eastersale-buy-1000">
        <p>Recommend</p>
        <eastersale-buy-card bgcolor="#FF6F00" :bg-img="true" :product="products[1]" />
      </div>
    </div>
  </div>
</template>

<script>
import EastersaleBuyCard from './eastersale-buy-card'
export default {
  components: {
    EastersaleBuyCard
  },
  props: {
    products: {
      type: Array,
      default: function() {
        return []
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.eastersale-buy {
  width: 1210px;
  height: auto;
  position: relative;
  margin-top: -170px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 4;
  .eastersale-buy-money {
    display: flex;
    justify-content: center;
    align-items: flex-end;

    .eastersale-buy-1000 {
      width: 460px;
      height: 250px;
      background: #F16485 0% 0% no-repeat padding-box;
      border-radius: 12px;
      opacity: 1;
      > p {
        text-align: center;
        font: normal normal 400 14px/26px BalooChettan;
        letter-spacing: 0px;
        color: #FFFFFF;
        text-transform: uppercase;
        height: 26px;
      }
    }
  }

}
</style>

<template>
  <div class="eastersale-buy-btn">
    <button type="button" name="button" :style="{ background: bgcolor}" @click="clickBtn">
      <div class="btn-align">
        <span>Only</span>
        <span>$</span>
        <b>{{ product.amount.split('.')[0] }}</b>
        <span>.{{ product.amount.split('.')[1] }}</span>
      </div>
    </button>
  </div>
</template>

<script>
export default {
  props: {
    bgcolor: {
      type: String,
      default: ''
    },
    product: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  data() {
    return {
    }
  },
  methods: {
    clickBtn() {
      var pro_num = this.product.pro_num;
      this.$store.commit('showAlert', true);
      localStorage.setItem('product', JSON.stringify(this.product));
      if(pro_num == 500) {
         this.$ga.event('insbuy', 'buy', 'easter-1000-1');
      } else if(pro_num == 1000) {
         this.$ga.event('insbuy', 'buy', 'easter-2000-1');
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.eastersale-buy-btn {
  text-align: center;
  button {
    width: 404px;
    height: 56px;
    box-shadow: 0px 6px 12px #FF7F2A3D;
    border-radius: 8px;
    opacity: 1;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    &:hover {
      transform: scale(1.03);
      transition: all 0.5s;
    }
    .btn-align {
      span {
        font: normal normal 400 16px/16px BalooChettan;
        letter-spacing: 0px;
        color: #FFFFFF;
        opacity: 1;
        &:first-child {
          margin-right: 7px;
        }
        &:nth-child(2) {
          margin-right: 3px;
        }
      }
      b {
        font: normal normal 500 28px/22px BalooChettan;
        letter-spacing: 0px;
        color: #FFFFFF;
      }
      span:nth-child(4) {
        font: normal normal 500 16px/16px BalooChettan;
        letter-spacing: 0px;
        color: #FFFFFF;
      }
    }

  }
}
</style>

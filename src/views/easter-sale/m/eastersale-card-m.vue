<template>
  <div class="eastersale-card-m">
    <div class="eastersale-card-m_content" :class="{'bgImg': bgImg}">
      <div class="eastersale-card-m_content_amount">
        <span>{{ product.pro_num }}</span>
        <span>Follwers</span>
      </div>
      <div class="eastersale-card-m_content_plus">+</div>
      <div class="eastersale-card-m_content_free">
        <span>FREE</span>
        <b>{{ product.free_num }}</b>
        <p>Follwers</p>
      </div>
    </div>
    <div class="eastersale-card-m_btn">
      <eastersale-card-m-btn :product="product" :btn-w="btnW" />
    </div>
  </div>
</template>

<script>
import EastersaleCardMBtn from './eastersale-card-m-btn';
export default {
  components: {
    EastersaleCardMBtn
  },
  props: {
    product: {
      type: Object,
      default: function() {
        return {}
      }
    },
    btnW: {
      type: Number,
      default: 181
    },
    bgImg: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss">
.eastersale-card-m {
  width: 100%;
  height: 224px;
  background-color: red;
  background: #FFFFFF 0% 0% no-repeat padding-box;
  box-shadow: 0px 6px 12px #FF585826;
  border: 1px solid #FFCECE;
  border-radius: 12px;
  opacity: 1;
  padding: 0 8px;
  box-sizing: border-box;
  .bgImg {
    background: url("../images/card-bg.svg") no-repeat;
    background-size: cover;
  }
  .eastersale-card-m_content {
    width: 100%;
    height: 121px;
    margin-top: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    .eastersale-card-m_content_amount {
      display: flex;
      flex-direction: column;
      span:first-child {
        font: normal normal 600 40px/45px BalooChettan;
        letter-spacing: 0px;
        color: #000000;
        opacity: 1;
        text-align: center;
      }
      span:last-child {
        font: normal normal 500 24px/24px BalooChettan;
        letter-spacing: 0px;
        color: #7F8498;
        opacity: 1;
        text-align: center;
      }
    }
    .eastersale-card-m_content_plus {
      color: #7F8498;
      font-size: 25px;
      font-weight: 500;
      margin: 0 35px 0 33px;
    }
    .eastersale-card-m_content_free {
      width: 83px;
      height: 87px;
      background: url("../images/m/free-icon.svg") no-repeat;
      background-size: 100% 100%;
      display: flex;
      flex-direction: column;
      padding-top: 18px;
      span {
        display: block;
        text-align: center;
        font: normal normal 500 12px/12px BalooChettan;
        letter-spacing: 0px;
        color: #FFFFFF;
        text-transform: uppercase;
        opacity: 1;
        margin-bottom: 6px;
      }
      b {
        text-align: center;
        font: normal normal 600 23px/23px BalooChettan;
        letter-spacing: 0px;
        color: #FFFFFF;
        opacity: 1;
        margin-bottom: 1px;
      }
      p {
        text-align: center;
        font: normal normal 400 12px/12px BalooChettan;
        letter-spacing: 0px;
        color: #FFFFFF;
        opacity: 0.51;
      }
    }
  }
  .eastersale-card-m_btn {
    text-align: center;
    margin-top: 10px;
  }
}
</style>

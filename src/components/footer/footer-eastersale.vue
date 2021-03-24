<template>
  <div class="eastersale-footer">
    <div class="eastersale-footer_content">
      <div class="eastersale-footer_content_icon_text">
        <img :src="logoGetinsta" alt="">
        <div class="eastersale-footer_content_text">
          <h3>GetInsta</h3>
          <p>©{{ year }} easygetinsta.com</p>
        </div>
      </div>
      <div class="eastersale-footer_content_cooperation">
        <ul>
          <li>
            <img :src="paypal" alt="">
          </li>
          <li>
            <img :src="master" alt="">
          </li>
          <li>
            <img :src="amex" alt="">
          </li>
          <li>
            <img :src="Googlepay" alt="">
          </li>
          <li>
            <img :src="applepay" alt="">
          </li>
          <li>
            <img :src="visa" alt="">
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import logoGetinsta from '@/views/campaign/easter-sale//images/logo_getinsta.svg';

import paypal from '@/views/campaign/easter-sale//images/paypal.svg';
import master from '@/views/campaign/easter-sale//images/master.svg';
import amex from '@/views/campaign/easter-sale//images/amex.svg';
import Googlepay from '@/views/campaign/easter-sale//images/Googlepay.svg';
import applepay from '@/views/campaign/easter-sale//images/applepay.svg';
import visa from '@/views/campaign/easter-sale//images/visa.svg';

export default {
  data() {
    return {
      logoGetinsta,
      paypal,
      master,
      amex,
      Googlepay,
      applepay,
      visa
    }
  },
  computed: {
    year: function() {
      let date = new Date();
      let y = date.getFullYear();
      return y;
    }
  }
}
</script>

<style lang="scss">
.eastersale-footer {
  border-top: 1px solid #F1F4F6;
  padding-top: 22px;
  box-sizing: border-box;
  height: 146px;
  overflow: hidden;
  .eastersale-footer_content {
    width: 1200px;
    height: 50px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .eastersale-footer_content_icon_text {
      display: flex;
      img {
        width: 48px;
        height: 48px;
        margin-right: 16px;
      }
      .eastersale-footer_content_text {
        h3 {
          text-align: left;
          font: normal normal 500 20px/20px BalooChettan;
          letter-spacing: 0px;
          color: #000000;
          opacity: 1;
          margin-bottom: 10px;
        }
        p {
          text-align: left;
          font: normal normal 400 14px/14px BalooChettan;
          letter-spacing: 0px;
          color: #7F8498;
          opacity: 1;
        }
      }
    }
  }
  .eastersale-footer_content_cooperation {
    ul {
      display: flex;
    }
  }
}
@media (max-width: 768px) {
  .eastersale-footer {
    margin-bottom: 56px;
    .eastersale-footer_content {
      flex-direction: column;
      .eastersale-footer_content_icon_text {
        width: 100%;
        padding: 0 24px;
        box-sizing: border-box;
        margin-bottom: 30px;
      }
      .eastersale-footer_content_cooperation {
        width: 100%;
        padding: 0 24px;
        box-sizing: border-box;
      }
    }
  }
}
</style>

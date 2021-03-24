<template>
  <div class="eastersale-banner">
    <div class="eastersale-banner_content">
      <h2>HAPPY</h2>
      <div class="eastersale-easter">
        <img src="../images/m/easter.svg" alt="">
      </div>
      <eastersale-banner-m-tags />
    </div>
    <div class="eastersale_banner-bottom"></div>
  </div>
</template>

<script>
import EastersaleBannerMTags from '../m/eastersale-banner-m-tags.vue'
export default {
  components: {
    EastersaleBannerMTags
  }
}
</script>

<style lang="scss">
.eastersale-banner {
  width: 100%;
  height: 352px;
  position: relative;
  background: #FFE2E7 url('../images/m/banner-m.svg') no-repeat;
  background-size: 90.4% 100%;
  background-position: center center;
  .eastersale_banner-bottom {
    width: 100%;
    height: 216px;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    background: url('../images/m/grass.png') no-repeat;
    background-size: cover;
  }
  .eastersale-banner_content {
    padding-top: 35px;
    box-sizing: border-box;
    position: relative;
    z-index: 3;
    h2 {
      text-align: center;
      font: normal normal 500 22px/28px BalooChettan;
      letter-spacing: 0px;
      color: #F16485;
      opacity: 1;
      margin-bottom: 20px;
    }
    .eastersale-easter {
      img {
        display: block;
        margin: 0 auto;
      }
      margin-bottom: 10px;
    }
  }
}
</style>

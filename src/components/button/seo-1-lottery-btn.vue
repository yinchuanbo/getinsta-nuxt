<template>
  <div class="btn" @click="d">{{ btnStyle.text }}</div>
</template>
<script>
export default {
  props: {
    btnStyle: {
      type: Object,
      default: null,
      required: true
    }
  },
  data() {
    return {};
  },
  methods: {
    d() {
      this.$ga.event('ad-dl', 'download', `${this.btnStyle.ga}`);
      location.href
        = this.$store.state.enAdrLinkWithoutGpReferrer
        + this.$constant.app.campaign.androidReferrerQuery
        + 'en-seo-apklucky';
    }
  }
};
</script>
<style lang="scss" scoped>
.btn {
  font: normal normal 600 13px/33px Montserrat;
  letter-spacing: 0px;
  color: #ffffff;
  height: inherit;
  cursor: pointer;
  width: inherit;
  background: transparent linear-gradient(90deg, #ffc703 0%, #ffab03 24%, #ff5601 100%) 0% 0% no-repeat padding-box;
  box-shadow: 0px 12px 24px #24242442;
  border-radius: 35px;
  text-align: center;
  display: flex;
  align-items: center;
  padding: 0 30px;
  justify-content: space-between;
  position: relative;

  &::after {
    content: "";
    background: url("~@/assets/images/global/seo-1-lottery-btn-r-icon.svg") no-repeat center;
    width: 24px;
    height: 24px;
    position: relative;
  }

  &::before {
    content: "";
    background: url("~@/assets/images/global/seo-1-lottery-btn-l-icon.svg") no-repeat center;
    width: 24px;
    height: 24px;
    position: relative;
  }
}
</style>

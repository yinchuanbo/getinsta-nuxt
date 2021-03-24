<template>
  <div class="eastersale-free-icon">
    <span>Free</span>
    <b>{{ freenum }}</b>
    <p>Followers</p>
  </div>
</template>

<script>
export default {
  components: {
  },
  props: {
    freenum: {
      type: Number,
      default: 0
    }
  }
};
</script>

<style lang="scss" scoped>
.eastersale-free-icon {
  width: 83px;
  height: 87px;
  background: url('images/m/free-icon.svg') no-repeat;
  background-size: 100% 100%;
  display: flex;
  flex-flow: column;
  padding-top: 18px;
  span {
    text-align: center;
    font: normal normal 400 12px/12px BalooChettan;
    letter-spacing: 0px;
    color: #FFFFFF;
    text-transform: uppercase;
    opacity: 1;
    margin-bottom: 8px;
  }
  b {
    text-align: center;
    font: normal normal bold 23px/23px BalooChettan;
    letter-spacing: 0px;
    color: #FFFFFF;
    opacity: 1;
  }
  p {
    text-align: center;
    font: normal normal 400 12px/12px BalooChettan;
    letter-spacing: 0px;
    color: #FFFFFF;
    opacity: 0.51;
  }
}
</style>

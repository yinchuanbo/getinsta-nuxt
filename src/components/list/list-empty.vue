<template>
  <div class="list-empty">
    <i></i>
    <p>{{ msg }}</p>
  </div>
</template>

<script>
export default {
  name: 'ListEmpty',
  props: {
    msg: {
      type: String,
      default: 'List empty',
      required: false
    }
  }
};
</script>

<style lang="scss" scoped>
.list-empty {
  padding: 80px 0;
  text-align: center;

  i {
    display: inline-block;
    width: 80px;
    height: 80px;
    background: url("~@/assets/images/global/dialog/dialog__icon_alert_grey.svg") no-repeat center;
    background-size: contain;
  }

  p {
    margin-top: 30px;
    font: 400 16px/20px Montserrat;
    color: #a2a2a2;
  }
}
</style>

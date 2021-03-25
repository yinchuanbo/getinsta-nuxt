<template>
  <div class="paymentmobile">
    <img src="../img/pay/payment_choice.svg" alt="">
  </div>
</template>

<script>
export default {
    name: 'PaymentMobile'
}
</script>

<style lang="scss" scoped>
.paymentmobile {
    display: none;
}
@media (max-width: 768px) {
    .paymentmobile {
        display: block;
        width: 100%;
        padding: 66px 0 30px 0;
        text-align: center;
        img {
            width: 90%;
            height: auto;
        }
    }
}
</style>

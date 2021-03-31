<template>
  <div>
    <div v-if="!$store.state.s2" class="store-shelf">
      <checkout />
    </div>
    <div v-if="$store.state.s2" class="store-shelf">
      <checkoutS2 />
    </div>
  </div>
</template>

<script>
import checkout from './checkout.vue';
import checkoutS2 from './checkout-s2.vue';

export default {
  components: {
    checkout,
    checkoutS2
  }
};
</script>

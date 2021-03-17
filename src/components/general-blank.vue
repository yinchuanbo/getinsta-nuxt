<template>
  <div class="general-blank" :style="{ height: `${$store.state.v2Ad ? adHeight+64 : 64}px` }"></div>
</template>

<script>
export default {
  name: 'GeneralBlank',
  props: {
    adHeight: {
      type: Number,
      default: 0,
      require: false
    }
  }
};
</script>

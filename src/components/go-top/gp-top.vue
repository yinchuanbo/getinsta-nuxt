<template>
  <go-top
    v-if="show"
    :src="scrollToTopImage"
    :max-width="0" :boundary="800" :size="60" :z-index="30" :bottom="170"
    :bg-color="'transparent'" :radius="'50%'" :has-outline="false" :box-shadow="'none'"
  ></go-top>
</template>

<script>
import scrollToTopImage from '~/assets/images/global/icon-to-top.svg';

export default {
  name: 'BackToTop',
  data() {
    return {
      scrollToTopImage,
      show: process.client
    };
  }
};
</script>

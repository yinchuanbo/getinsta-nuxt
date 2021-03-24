<template>
  <window-giveaway v-if="type === 'giveaway'"></window-giveaway>
</template>
<script>
import windowGiveaway from './views/followers-give-b';

export default {
  name: 'FloatingLayerBottom',
  components: { windowGiveaway },
  props: {
    type: {
      type: String,
      default: 'giveaway'
    }
  },
  data() {
    return {};
  },
  mounted() {
  }
};
</script>

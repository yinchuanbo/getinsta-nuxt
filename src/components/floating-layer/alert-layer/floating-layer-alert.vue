<template>
  <window-giveaway v-if="type === 'giveaway'"></window-giveaway>
</template>
<script>
import windowGiveaway from './views/followers-give-r';

export default {
  name: 'FloatingLayerAlert',
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

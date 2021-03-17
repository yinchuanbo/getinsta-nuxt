<template>
  <windowGiveaway v-if="type === 'giveaway'"></windowGiveaway>
</template>
<script>
import windowGiveaway from './views/followers-give-b';

export default {
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

<template>
  <div
    class="general-blank"
    :style="{ height: `${$store.state.v2Ad ? height : 64}px` }"
  ></div>
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
  },
  data() {
    return {};
  },
  computed: {
     height() {
       var height;
       if(this.$store.state.isMobile) { // mobile
         height = !this.$store.state.v2Ad ? 0 : 64 + this.adHeight;
       } else if(!this.$store.state.isMobile) { // pc
         if(!this.$store.state.v2Ad) {
           height = 64;
         } else {
           height = this.$store.state.v2AdHeightPc === 0 ?  0 : 64;
         }
       }
       return height;
     }
  }
};
</script>

<template>
  <div class="uni-dialog-box uni-loading-box" :class="{ 'enter-box': enterBox, 'enter-mask': enterMask }">
    <div class="mask"></div>
    <div class="loading-animation">
      <i></i>
      <p>Loading...</p>
    </div>
  </div>
</template>

<script>

export default {
  name: 'LoadingType0',
  components: {},
  props: {
    open: {
      type: Boolean,
      default: true,
      required: true
    }
  },
  data() {
    return {
      enterBox: false,
      enterMask: false
    };
  },
  mounted() {
    if (this.open) {
      this.$nextTick(() => {
        setTimeout(() => {
          this.enterBox = true;
        }, 10);
        setTimeout(() => {
          this.enterMask = true;
        }, 310);
      });
    } else {
      this.ok();
    }
  },
  methods: {
    ok() {
      this.boxFadeOut('ok');
    },
    boxFadeOut(promise) {
      this.enterBox = false;
      setTimeout(() => {
        this.enterMask = false;
      }, 300);
      setTimeout(() => {
        this.$emit(promise);
      }, 600);
    }
  }
};
</script>

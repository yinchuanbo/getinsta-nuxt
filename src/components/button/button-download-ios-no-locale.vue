<template>
  <button
    class="ios"
    :class="{
      'footer':size === 'footer',
      'transparent': type === 'transparent'
    }"
    @mouseenter="tipQrCode('ios', $event)"
    @mouseleave="tipQrCode(false)"
  >
    <div class="icon">
      <i></i>
      <b></b>
    </div>
    <div class="text">
      <p>Download on the</p>
      <p>App Store</p>
    </div>
  </button>
</template>

<script>
export default {
  name: 'ButtonDownloadIosNoLocale',
  props: {
    size: {
      type: String,
      default: '',
      require: false
    },
    type: {
      type: String,
      default: '',
      require: false
    }
  },
  data() {
    return {};
  },
  methods: {
    tipQrCode(param, e) {
      if (this.COMMON.isMobile()) return;
      if (e) {
        this.$tipQrCode(param, e.clientX, e.clientY);
      } else {
        this.$tipQrCode(param);
      }
    }
  }
};
</script>

<style lang="scss" scoped src="@/assets/styles/btn-download.scss"></style>

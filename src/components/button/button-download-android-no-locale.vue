<template>
  <button
    class="android"
    :class="{
      'footer': size === 'footer',
      'transparent': type === 'transparent'
    }"
    @mouseenter="tipQrCode('android', $event)"
    @mouseleave="tipQrCode(false)"
  >
    <div class="icon">
      <i></i>
      <b></b>
    </div>
    <div class="text">
      <p>GET IT ON</p>
      <p>Google Play</p>
    </div>
  </button>
</template>

<script>
export default {
  name: 'ButtonDownloadAndroidNoLocale',
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

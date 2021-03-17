<template>
  <button
    class="android"
    :class="{
      'footer': size === 'footer',
      'transparent': type === 'transparent',
      'theme-apk': $store.state.enAdrType === 0
    }"
    @mouseenter="tipQrCode('android', $event)"
    @mouseleave="tipQrCode(false)"
  >
    <div class="icon">
      <i></i>
      <b></b>
    </div>
    <div v-if="$store.state.enAdrType === 1" class="text">
      <p>{{ $t('global.button.ButtonDownloadAndroid.line-0') }}</p>
      <p>{{ $t('global.button.ButtonDownloadAndroid.line-1') }}</p>
    </div>
    <div v-if="$store.state.enAdrType === 0" class="text">
      <p>{{ $t('global.button.ButtonDownloadAndroid.line-0-apk') }}</p>
      <p>{{ $t('global.button.ButtonDownloadAndroid.line-1-apk') }}</p>
    </div>
  </button>
</template>

<script>
export default {
  name: 'ButtonDownloadAndroid',
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

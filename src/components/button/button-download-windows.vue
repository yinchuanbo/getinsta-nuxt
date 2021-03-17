<template>
  <button
    class="windows"
    :class="{
      'footer': size === 'footer'
    }"
  >
    <div class="icon">
      <i></i>
      <b></b>
    </div>
    <div class="text">
      <p>Download for</p>
      <p>Windows</p>
    </div>
  </button>
</template>

<script>
export default {
  name: 'ButtonDownloadWindows',
  props: {
    size: {
      type: String,
      default: '',
      require: false
    }
  }
};
</script>

<style lang="scss" scoped src="@/assets/styles/btn-download.scss"></style>

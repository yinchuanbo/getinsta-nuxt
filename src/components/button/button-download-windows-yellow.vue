<template>
  <button
    :class="{
      'header': size === 'header'
    }"
  >
    <div class="icon">
      <i></i>
      <b></b>
    </div>
    <div class="text">
      <p>Download For</p>
      <p>Windows</p>
      <p class="single">Download</p>
    </div>
  </button>
</template>

<script>
export default {
  name: 'ButtonDownloadWindowsYellow',
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
<style lang="scss" scoped>
button {
  background-color: #FF9C39;
  border: none;

  .icon {
    i {
      background-image: url("~@/assets/images/global/button/icon__btn-download_logo_windows_white.svg");
    }

    b {
      background-image: url("~@/assets/images/global/button/icon__btn-download_dl_white.svg");
    }
  }

  .text {
    color: #FFFFFF;
  }

  &:hover {
    background-color: #FFA850;
  }
}

@media (max-width: 768px) {

}
</style>

<template>
  <button></button>
</template>

<script>
export default {
  name: 'ButtonDownloadAndroidOriginal',
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
    },
    exclusive: {
      type: String,
      default: '',
      required: false
    }
    // appAnalytics: {
    //   type: Object,
    //   default() {
    //     return {
    //       pt: '',
    //       ct: '',
    //       mt: ''
    //     };
    //   },
    //   required: false
    // },
  },
  data() {
    return {};
  },
  methods: {
  }
};
</script>

<style lang="scss" scoped>
button {
  width: 100%;
  height: 100%;
  background: url("~@/assets/images/global/button/btn__download_original-googleplay.svg") no-repeat center;
  background-size: contain;
}
</style>

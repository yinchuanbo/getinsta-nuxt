<template>
  <button
    class="btn-green"
    :style="{ 'borderRadius': borderRadius + 'px'}"
  >
    <span v-html="text"></span>
  </button>
</template>

<script>
export default {
  name: 'ButtonGreen',
  props: {
    text: {
      type: String,
      default: 'Button',
      required: false
    },
    fontSize: {
      type: String,
      default: '',
      required: false
    },
    borderRadius: {
      type: Number,
      default: 64,
      required: false
    }
  }
};
</script>

<style lang="scss" scoped>
button {
  padding: 0 10%;
  width: 100%;
  height: 100%;
  background-color: #00BE52;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 12px 24px #00000029;

  color: #ffffff;

  span {
    font-weight: 600;
    font-size: 16px;
    word-break: break-word;
  }

  &:hover {
    background-color: #00e257;
  }
}
</style>

<template>
  <div class="geometry">
    <div class="line line-0" :style="{ 'background-color': color }" />
    <div class="line line-1" :style="{ 'background-color': color }" />
  </div>
</template>

<script>
export default {
  name: 'GeometryCross',
  props: {
    color: {
      type: String,
      default: '#a5a5a5'
    }
  }
};
</script>

<style lang="scss" scoped>
.geometry {
  position: relative;
  width: 100%;
  height: 100%;

  .line {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    width: 100%;
    height: 10%;
    background-color: #fff;
    border-radius: 100px;
    overflow: hidden;

    &.line-0 {
      transform: rotate(45deg);
    }

    &.line-1 {
      transform: rotate(-45deg);
    }
  }
}
</style>

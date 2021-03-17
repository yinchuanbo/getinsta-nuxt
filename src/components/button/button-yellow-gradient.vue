<template>
  <button
    :class="{
      'size-16': fontSize === 'size-16',
      'size-20': fontSize === 'size-20',
      'square': square === true,
      'shadow': shadow === true
    }"
  >
    <span>{{ text }}</span>
  </button>
</template>

<script>
export default {
  name: 'ButtonYellowGradient',
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
    square: {
      type: Boolean,
      default: false,
      required: false
    },
    shadow: {
      type: Boolean,
      default: false,
      required: false
    }
  }
};
</script>

<style lang="scss" scoped>
button {
  padding: 0 6%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, #FFB24E 0%, #FF600E 100%);
  box-shadow: 0 12px 24px #0000003D;
  border-radius: 64px;
  text-align: center;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.3s;

  span {
    color: #ffffff;
    font-weight: 600;
    font-size: 24px;
    word-break: break-word;
  }

  &.icon-android, &.icon-ios, &.icon-windows {
    box-shadow: 0 12px 24px #A528003D;

    &:before {
      display: inline-block;
    }
  }

  &:hover {
    background-color: rgba(255, 156, 57, 0.8);
  }

  &.size-16 {
    span {
      font-size: 16px;
    }
  }

  &.size-20 {
    span {
      font-size: 20px;
    }
  }

  &.square {
    border-radius: 5px;
  }

  &.shadow {
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
  }
}

@media (max-width: 768px) {
  button {
    span {
      font-size: 14px;
    }

    &.size-16 {
      span {
        font-size: 14px
      }
    }

    &.size-20 {
      span {
        font-size: 16px;
      }
    }
  }
}
</style>

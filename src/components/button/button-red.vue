<template>
  <button
    :class="{
      'shadow': shadow,
      'square': square,
      'sharp': sharp,
      'header-small': fontSize === 'header-small',
      'size-20': fontSize === 'size-20',
      'size-14': fontSize === 'size-14',
      'size-16': fontSize === 'size-16',
      'loading': loading
    }"
  >
    <span v-html="text"></span>
  </button>
</template>

<script>
export default {
  name: 'ButtonRed',
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
    shadow: {
      type: Boolean,
      default: true,
      required: false
    },
    sharp: {
      type: Boolean,
      default: false,
      required: false
    },
    square: {
      type: Boolean,
      default: false,
      required: false
    },
    loading: {
      type: Boolean,
      default: false,
      required: false
    }
  }
};
</script>

<style lang="scss" scoped>
button {
  position: relative;
  padding: 0 10%;
  width: 100%;
  height: 100%;
  background-color: #FF3731;
  border-radius: 64px;
  cursor: pointer;
  transition: all 0.3s;
  color: #ffffff;

  span {
    display: inline-block;
    font-weight: 600;
    font-size: 24px;
    word-break: break-word;
    transform: translateY(0);
    opacity: 1;
    transition: all 0.3s;
  }

  &:hover {
    background-color: #cb2a24;
  }

  &.shadow {
    box-shadow: 0 12px 24px #00000029;
  }

  &.square {
    border-radius: 10px;
  }

  &.sharp {
    border-radius: 0;
  }

  &.header-small {
    span {
      font-size: 16px;
    }
  }

  &.size-20 {
    span {
      font-size: 20px;
    }
  }

  &.size-14 {
    span {
      font-size: 14px;
    }
  }

  &.size-16 {
    span {
      font-size: 16px;
    }
  }

  &:before {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    width: 100%;
    height: 100%;
    background: url("~@/assets/images/global/loading-puff-white.svg") no-repeat center;
    background-size: contain;
    transform: translateY(-20px);
    opacity: 0;
    transition: all 0.3s;
  }

  &.loading {
    cursor: default;

    &:before {
      transform: translateY(0);
      opacity: 1;
    }

    span {
      transform: translateY(20px);
      opacity: 0;
    }

    &:hover {
      background-color: #FF3731;
    }
  }
}

@media (max-width: 768px) {
  button {
    span {
      font-size: 14px;
    }

    &.square {
      border-radius: 5px;
    }

    &.header-small {
      span {
        font-size: 8px;
      }
    }

    &.size-20 {
      span {
        font-size: 14px;
      }
    }

    &.size-16 {
      span {
        font-size: 14px;
      }
    }
  }
}
</style>

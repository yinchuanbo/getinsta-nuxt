<template>
  <button
    :class="{
      'white': white === true,
      'size-16': fontSize === 'size-16',
      'size-20': fontSize === 'size-20',
      'square': square === true
    }"
  >
    <span :style="{ borderWidth: `${borderWidth}px` }">{{ text }}</span>
  </button>
</template>

<script>
export default {
  name: 'ButtonBuyNow',
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
    white: {
      type: Boolean,
      default: false,
      required: false
    },
    borderWidth: {
      type: Number,
      default: 2,
      required: false
    }
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
button {
  position: relative;
  padding: 0;
  width: 100%;
  height: 100%;
  background-color: transparent;
  border-radius: 60px;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.3s;
  user-select: none;

  span {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 6%;
    width: 100%;
    height: 100%;
    border: 3px solid #2A2A2A;
    border-radius: 60px;
    font-size: 24px;
    font-weight: 600;
    font-style: normal;
    color: #2A2A2A;
    transition: all 0.3s;
  }

  &:hover, &:active {
    background-color: #FF9C39;

    span {
      border-color: #FF9C39;
      color: #fff;
    }

    &.white span {
      border-color: #FF9C39;
    }
  }

  &.white {
    span {
      border-color: #FFFFFF;
      color: #ffffff;
    }
  }

  &.square {
    border-radius: 8px;

    span {
      border-radius: 8px;
    }
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
}

@media (max-width: 768px) {
  button {
    transition: all 0.1s;

    span {
      border-width: (3px/2);
      font-size: (32px/2);
      transition: all 0.1s;
    }

    &:hover {
      background-color: transparent;

      span {
        border-color: #2A2A2A;
        color: #fff;
      }

      &.white {
        span {
          border-color: #FFFFFF;
          color: #ffffff;
        }
      }
    }

    &:active {
      background-color: #FF9C39;

      span {
        border-color: #FF9C39;
        color: #fff;
      }

      &.white span {
        border-color: #FF9C39;
      }
    }

    &.size-16 {
      span {
        font-size: 14px;
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

<template>
  <button
    :class="{
      'white': white,
      'sidebar-small': fontSize === 'sidebar-small',
      'header-small': fontSize === 'header-small'
    }"
  >
    <span><i>{{ text }}</i></span>
  </button>
</template>

<script>
export default {
  // 按钮样式：黑色边框 黑色文字 透明背景
  // 按钮样式：白色边框 白色文字 透明背景
  name: 'ButtonWhite',
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
    white: {
      type: Boolean,
      default: true,
      required: false
    }
  }
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
    border: 2px solid #2A2A2A;
    border-radius: 60px;
    transition: all 0.3s;

    i {
      position: relative;
      z-index: 1;
      font-size: 24px;
      font-weight: 600;
      font-style: normal;
      color: #2A2A2A;
    }
  }

  &:hover {
    background-color: #005FFF;

    span {
      border-color: #005FFF;

      i {
        color: #fff;
      }
    }
  }

  &.white {
    span {
      border-color: #fff;

      i {
        color: #fff;
      }
    }
  }

  &.sidebar-small {
    span {
      i {
        font-size: 16px;
      }
    }
  }

  &.header-small {
    span {
      i {
        font-size: 16px;
      }
    }
  }
}

@media (max-width: 768px) {
  button {
    transition: all 0.1s;

    span {
      border-width: (3px/2);
      transition: all 0.1s;

      i {
        font-size: 16px;
      }
    }

    &:hover {
      background-color: transparent;

      span {
        border-color: #2A2A2A;

        i {
          color: #2A2A2A;
        }
      }

      &.white {
        span {
          border-color: #fff;

          i {
            color: #fff;
          }
        }
      }
    }

    &:active, &.white:active {
      background-color: #005FFF;

      span {
        border-color: #005FFF;

        i {
          color: #fff;
        }
      }
    }

    &.sidebar-small {
      span {
        i {
          font-size: 14px;
        }
      }
    }

    &.header-small {
      span {
        i {
          font-size: 11px;
        }
      }
    }
  }
}
</style>

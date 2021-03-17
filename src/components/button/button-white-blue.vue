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
  // 按钮样式：蓝色边框 蓝色文字 透明背景
  name: 'ButtonWhiteBlue',
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
  border-radius: 43px;
  cursor: pointer;
  overflow: hidden;

  span {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 6%;
    width: 100%;
    height: 100%;
    border: 3px solid #005FFF;
    border-radius: 43px;
    transition: all 0.3s;

    i {
      position: relative;
      z-index: 1;
      font-size: 20px;
      font-weight: 600;
      font-style: normal;
      color: #005FFF;
    }
  }

  &:hover {
    span {
      border-color: #005FFF !important;
      background-color: #005FFF;

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
    span {
      border-width: (3px/2);
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

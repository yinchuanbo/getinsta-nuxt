<template>
  <button :class="fontSize">
    <span><i v-html="text"></i></span>
  </button>
</template>

<script>
export default {
  name: 'ButtonWave',
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
  user-select: none;

  span {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 6%;
    width: 100%;
    height: 100%;
    border: 3px solid #FFFFFF;
    border-radius: 43px;
    overflow: hidden;
    transition: all 0.6s cubic-bezier(0.645, 0.045, 0.355, 1);

    i {
      position: relative;
      z-index: 1;
      font-size: 20px;
      font-weight: 600;
      font-style: normal;
      color: #ffffff;
    }
  }

  &:after {
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: -1;
    display: block;
    width: 100%;
    height: 200%;
    content: "";
    background-image: url("~@/assets/images/global/button/btn_hover_wave.svg");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    transform: translateY(100%);
    transition: all 0.6s cubic-bezier(0.645, 0.045, 0.355, 1);
  }

  &:hover {
    span {
      border-color: transparent;
    }

    &:after {
      transform: translateY(30%);
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

      i {
        font-size: (32px/2);
      }
    }

    &:hover {
      span {
        border-color: #FFFFFF;
      }

      &:after {
        transform: translateY(100%);
      }
    }

    &:active {
      span {
        border-color: transparent;
      }

      &:after {
        transform: translateY(20%);
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

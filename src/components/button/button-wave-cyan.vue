<template>
  <button :class="fontSize">
    <span><i>{{ text }}</i></span>
  </button>
</template>

<script>
export default {
  name: 'ButtonWaveCyan',
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

  span {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 6%;
    width: 100%;
    height: 100%;
    /*border: 3px solid #FFFFFF;*/
    background-color: #00FFE5;
    border-radius: 43px;
    transition: all 0.7s cubic-bezier(0.645, 0.045, 0.355, 1);

    i {
      position: relative;
      z-index: 1;
      font-size: 20px;
      font-weight: 600;
      font-style: normal;
      color: #2A2A2A;
      transition: all 0.7s cubic-bezier(0.645, 0.045, 0.355, 1);
    }
  }

  &:after {
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 0;
    display: block;
    width: 100%;
    height: 200%;
    content: "";
    background-image: url("~@/assets/images/global/button/btn_hover_wave.svg");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    opacity: 0;
    transform: translateY(100%);
    transition: all 0.7s cubic-bezier(0.645, 0.045, 0.355, 1);
  }

  &:hover {
    span {
      border-color: transparent;

      i {
        color: #fff;
      }
    }

    &:after {
      opacity: 1;
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

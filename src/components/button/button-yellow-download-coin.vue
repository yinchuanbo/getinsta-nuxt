<template>
  <button>
    <div class="left"><span>{{ text }}</span></div>
    <div class="right"><span>+500</span> <i></i></div>
  </button>
</template>

<script>
export default {
  name: 'ButtonYellowDownloadCoin',
  props: {
    text: {
      type: String,
      default: 'Button',
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
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: url("~@/assets/images/global/button/btn_dialog-alert-icon__bg.svg") no-repeat center;
  background-size: 100% 100%;
  box-shadow: 0 3px 6px #00000029;
  border-radius: 6px;
  text-align: center;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.3s;

  &:hover {
    opacity: 0.7;
  }

  span {
    color: #ffffff;
    font-weight: 600;
    font-size: 16px;
    word-break: break-word;
    vertical-align: middle;
  }

  .left, .right {
    display: inline-block;
  }

  .left {
    width: 66%;

    span {
      font-size: 16px;
    }
  }

  .right {
    width: 34%;
    font-size: 0;

    span {
      font-size: 20px;
    }

    i {
      margin-left: 8px;
      display: inline-block;
      width: 24px;
      height: 24px;
      background: url("~@/assets/images/global/button/btn_dialog-alert-icon__coin.svg") no-repeat center;
      background-size: contain;
      vertical-align: middle;
    }
  }
}

@media (max-width: 768px) {
  button {
    span {
      font-size: 14px;
    }

    .left {
      span {
        font-size: 14px;
      }
    }

    .right {
      span {
        font-size: 16px;
      }
    }
  }
}
</style>

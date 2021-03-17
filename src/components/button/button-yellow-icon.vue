<template>
  <button :class="{
    'cart': icon === 'cart',
    'header-small': fontSize === 'header-small',
    'size-16': fontSize === 'size-16',
    'size-20': fontSize === 'size-20',
    'loading': loading
  }"
  >
    <span>{{ text }}</span>
  </button>
</template>

<script>
export default {
  name: 'ButtonYellowIcon',
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
    icon: {
      type: String,
      default: '',
      required: false
    },
    loading: {
      type: Boolean,
      default: false,
      required: false
    }
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
button {
  position: relative;
  padding: 0 6%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: #FF9C39;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
  border-radius: 6px;
  text-align: center;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.3s;

  *, &:before, &:after {
    transition: all 0.3s;
  }

  span {
    color: #ffffff;
    font-weight: 600;
    font-size: 24px;
    word-break: break-word;
  }

  &:before {
    margin-right: 24px;
    display: none;
    width: 30px;
    height: 36px;
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    content: "";
  }

  &:hover {
    background-color: rgba(255, 156, 57, 0.8);
  }

  &:after {
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
  }

  &.loading {
    cursor: default;

    &:hover {
      background-color: #FF9C39;
    }

    &:after {
      transform: translateY(0);
      opacity: 1;
    }

    span, &:before {
      transform: translateY(20px);
      opacity: 0;
    }
  }

  &.cart {
    &:before {
      display: inline-block;
      background-image: url("~@/assets/images/global/icon__cart_white.svg");
    }
  }

  &.header-small {
    span {
      font-size: 16px;
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
    span {
      font-size: 14px;
    }

    &:before {
      margin-right: 4.8vw;
      width: 4.8vw;
      height: 4.8vw;
    }

    &.header-small {
      span {
        font-size: 14px;
      }
    }

    &.size-16 {
      span {
        font-size: 14px
      }
    }

    &.size-16 {
      span {
        font-size: 16px
      }
    }

    &.icon {
      box-shadow: 0 1.5px 3px rgba(0, 0, 0, 0.16);
    }
  }
}
</style>

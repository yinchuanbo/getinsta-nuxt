<template>
  <div
    ref="tip"
    class="uni-tip-container-qr-code"
    :class="{ 'enter': enter }"
    :style="{ top: `${y+20}px`, left: `${x+10}px` }"
  >
    <img class="loading" src="../../../assets/images/global/loading-puff-black.svg" alt="Loading icon">
    <img :src="qrCodeDisplay" alt="QR Code">
  </div>
</template>

<script>
import qrCodeIos from '@/assets/images/global/qrcode__download_ios.svg';
import qrCodeAndroid from '@/assets/images/global/qrcode__download_android.svg';

export default {
  name: 'TipQrCode',
  components: {},
  props: {
    qrCode: {
      type: String,
      default: ''
    },
    x: {
      type: Number,
      default: 0
    },
    y: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      qrCodeIos, qrCodeAndroid,
      enter: false
    };
  },
  computed: {
    qrCodeDisplay() {
      let qrImage = '';
      if (this.qrCode === 'ios') qrImage = this.qrCodeIos;
      if (this.qrCode === 'android') qrImage = this.qrCodeAndroid;
      return qrImage;
    }
  },
  mounted() {
    this.$nextTick(() => {
      setTimeout(() => {
        this.enter = true;
      }, 10);
    });
  },
  methods: {}
};
</script>

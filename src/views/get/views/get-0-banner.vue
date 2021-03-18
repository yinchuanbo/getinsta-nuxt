<template>
  <div class="get-0-banner" :class="{ 'on': animateBegin, 'text-on': textBegin }">
    <div class="wrapper">
      <div class="header-blank"></div>
      <div class="get-0-banner__content">
        <h1>{{ $t('get.banner.title') }}</h1>
        <div class="get-0-banner__content_btn-container">
          <div class="unit" @click="ga0">
            <button-wave class="pc" :text="$t('get.banner.btn0')" />
            <!--            <button-download-ios v-if="$store.state.isiOS" />-->
            <!--            <button-download-android v-if="$store.state.isAndroid" />-->
            <button-icon-ins v-if="$store.state.isMobile" text="Get Free Followers" square shadow :icon="'ins'" font-size="size-15" theme="cyan" />
          </div>
          <div class="unit" @click="ga1">
            <button-buy-now
              :square="$store.state.isMobile"
              :text="$t('global.header.button.buyNow')"
              :white="true" :font-size="'size-20'"
            />
          </div>
        </div>
      </div>
      <div class="get-0-banner__bg">
        <div v-if="!loading">
          <i class="bg_circle-2"></i>
          <i class="bg_circle-1"></i>
          <i class="bg_circle-0"></i>
          <i class="phone"></i>
          <i class="phone-tip"></i>
          <i class="person-0"></i>
          <i class="person-1"></i>
          <i class="person-2"></i>
          <i class="person-3"></i>
          <i class="heart-0"></i>
          <i class="heart-1"></i>
          <i class="heart-2"></i>
          <i class="circle-0"></i>
          <i class="circle-1"></i>
        </div>
        <div v-if="loading" class="banner-animate-loading"></div>
      </div>
    </div>
    <div class="img-preloader">
      <img v-for="(img, index) in imgPreload" :key="index" :src="img" alt="img-preloader" @load="imageLoaded">
    </div>
  </div>
</template>

<script>
import ButtonWave from '@/components/button/button-wave';
import img00 from '@/assets/images/get/get-0-banner/get-0-banner__bg_circle-0.svg';
import img01 from '@/assets/images/get/get-0-banner/get-0-banner__bg_circle-1.svg';
import img02 from '@/assets/images/get/get-0-banner/get-0-banner__bg_circle-2.svg';
import img03 from '@/assets/images/get/get-0-banner/get-0-banner__circle.svg';
import img04 from '@/assets/images/get/get-0-banner/get-0-banner__heart-red.svg';
import img05 from '@/assets/images/get/get-0-banner/get-0-banner__heart-white.svg';
import img06 from '@/assets/images/get/get-0-banner/get-0-banner__heart-white-hollow.svg';
import img07 from '@/assets/images/get/get-0-banner/get-0-banner__person-0.png';
import img08 from '@/assets/images/get/get-0-banner/get-0-banner__person-1.png';
import img09 from '@/assets/images/get/get-0-banner/get-0-banner__person-2.png';
import img10 from '@/assets/images/get/get-0-banner/get-0-banner__person-3.png';
import img11 from '@/assets/images/get/get-0-banner/get-0-banner__phone.svg';
import img12 from '@/assets/images/get/get-0-banner/get-0-banner__phone-tip.svg';
import ButtonBuyNow from '@/components/button/button-buy-now';
// import ButtonDownloadIos from '@/components/button/button-download-ios';
// import ButtonDownloadAndroid from '@/components/button/button-download-android';
import ButtonIconIns from '@/components/button/button-icon-ins';

export default {
  name: 'Get0Banner',
  components: {
    ButtonIconIns,
    // ButtonDownloadAndroid,
    // ButtonDownloadIos,
    ButtonBuyNow,
    ButtonWave
  },
  data() {
    return {
      textBegin: false,
      animateBegin: false,
      loading: true,
      imgPreload: [img00, img01, img02, img03, img04, img05, img06, img07, img08, img09, img10, img11, img12],
      loadedImages: 0
    };
  },
  watch: {
    loadedImages(cur) {
      if (cur === this.imgPreload.length) {
        this.loading = false;
        setTimeout(() => {
          this.animateBegin = true;
        }, 30);
      }
    }
  },
  mounted() {
    setTimeout(() => {
      this.textBegin = true;
    }, 100);
  },
  methods: {
    imageLoaded: function () {
      this.loadedImages += 1;
    },
    ga0() {
      if (this.$store.state.isiOS) {
        this.$ga.event('insdl', 'download', 'get-m-iosdl');

        location.href
          = `${this.$store.state.enIosLink}`
          + `?pt=${this.$store.state.enIosLinkPt}`
          + `&ct=${this.$store.state.enIosLinkCt}`
          + `&mt=8`;
      } else if (this.$store.state.isAndroid) {
        this.$ga.event('insdl', 'download', 'get-m-appdl');

        location.href = this.$store.state.enAdrLink;
      } else {
        this.$scrollTo('#get-add', { offset: -80 });
        this.$ga.event('buttonclick', 'click', 'fadd');
      }
    },
    ga1() {
      this.$ga.event('insbuy', 'buy', 'freegetbuy1');
      this.$nuxt.$router.push({ path: '/buy-instagram-followers' });
    }
  }
};
</script>

<style lang="scss" scoped>
.get-0-banner {
  position: relative;
  height: 1050px;
  background: linear-gradient(242deg, #111EC5 0%, #AD34D8 57%, #FF9161 100%);
  overflow: hidden;

  .wrapper {
    height: 100%;
    z-index: 1;
  }

  .get-0-banner__content {
    text-align: center;

    h1 {
      padding-top: 134px;
      font: 700 40px/66px Montserrat;
      color: #FFFFFF;
      transition-delay: 0s;
    }

    .get-0-banner__content_btn-container {
      margin-top: 82px;
      transition-delay: 0.2s;

      .unit {
        width: 320px;
        height: 80px;
        display: inline-block;

        &:last-child {
          margin-left: 50px;
        }
      }
    }

    h1, .get-0-banner__content_btn-container {
      transition-duration: .8s;
      transition-property: all;
      opacity: 0;
      transform: translateY(20px);
    }
  }

  .get-0-banner__bg {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: -1;
    margin: auto;
    width: 100%; //1210px
    height: 500px;
    text-align: center;
    font-size: 0;
    opacity: 0;
    transition: all 0.8s 0.2s;

    i {
      position: absolute;
      display: block;
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
      opacity: 0;
      transition-property: all;
      transition-duration: 1s;
      transition-timing-function: cubic-bezier(0.77, 0, 0.175, 1);

      &.bg_circle-0 {
        bottom: -2%;
        left: 31.92%;
        width: (442/1210)*100%;
        height: (442/500)*100%;
        background-image: url("~@/assets/images/get/get-0-banner/get-0-banner__bg_circle-0.svg");
        transform: scale(0);
      }

      &.bg_circle-1 {
        bottom: -20%;
        left: 12.1%;
        width: 76.2%;
        height: 125.4%;
        background-image: url("~@/assets/images/get/get-0-banner/get-0-banner__bg_circle-1.svg");
        transform: scale(0);
      }

      &.bg_circle-2 {
        bottom: -43%;
        left: 5.1%;
        width: 90%;
        height: 170%;
        background-image: url("~@/assets/images/get/get-0-banner/get-0-banner__bg_circle-2.svg");
        transform: scale(0);
      }

      &.phone {
        bottom: 0;
        left: 35.6%;
        width: (351/1210)*100%;
        height: (441/500)*100%;
        background-image: url("~@/assets/images/get/get-0-banner/get-0-banner__phone.svg");
        transition-delay: 0.5s;
        transform: translateY(100%);
      }

      &.phone-tip {
        bottom: 55%;
        left: 51.6%;
        width: (230/1210)*100%;
        height: (115/500)*100%;
        background-image: url("~@/assets/images/get/get-0-banner/get-0-banner__phone-tip.svg");
        transition-delay: 1.1+0.5s;
        transition-duration: 0.4s;
        transition-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
        transform: translateX(80px);
      }

      &.person-0 {
        bottom: 4%;
        left: 17.4%;
        width: (151/1210)*100%;
        height: (151/500)*100%;
        background-image: url("~@/assets/images/get/get-0-banner/get-0-banner__person-0.png");
        transition-delay: 2.4+0.4s;
        transition-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
        transform: scale(0);
      }

      &.person-1 {
        bottom: 31%;
        left: 71.4%;
        width: (141/1210)*100%;
        height: (141/500)*100%;
        background-image: url("~@/assets/images/get/get-0-banner/get-0-banner__person-1.png");
        transition-delay: 2.4+0.4*2s;
        transition-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
        transform: scale(0);
      }

      &.person-2 {
        bottom: 72%;
        left: 73%;
        width: (121/1210)*100%;
        height: (121/500)*100%;
        background-image: url("~@/assets/images/get/get-0-banner/get-0-banner__person-2.png");
        transition-delay: 2.4+0.4*4s;
        transition-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
        transform: scale(0);
      }

      &.person-3 {
        bottom: 80%;
        left: 26%;
        width: (121/1210)*100%;
        height: (121/500)*100%;
        background-image: url("~@/assets/images/get/get-0-banner/get-0-banner__person-3.png");
        transition-delay: 2.4+0.4*3s;
        transition-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
        transform: scale(0);
      }

      &.heart-0 {
        bottom: 24%;
        left: 31.8%;
        width: (32/1210)*100%;
        height: (28/500)*100%;
        background-image: url("~@/assets/images/get/get-0-banner/get-0-banner__heart-white.svg");
        transition-delay: 2.4s;
        transition-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
        transform: scale(0);
      }

      &.heart-1 {
        bottom: 65%;
        left: 27.8%;
        width: (17.5/1210)*100%;
        height: (15.5/500)*100%;
        background-image: url("~@/assets/images/get/get-0-banner/get-0-banner__heart-white.svg");
        transition-delay: 2.4+0.4*3s;
        transition-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
        transform: scale(0);
      }

      &.heart-2 {
        bottom: 105%;
        left: 64.8%;
        width: (30/1210)*100%;
        height: (27/500)*100%;
        background-image: url("~@/assets/images/get/get-0-banner/get-0-banner__heart-white-hollow.svg");
        transition-delay: 2.4+0.4*3s+0.2s;
        transition-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
        transform: scale(0);
      }

      &.circle-0 {
        bottom: 12.8%;
        left: 75%;
        width: (39/1210)*100%;
        height: (39/500)*100%;
        background-image: url("~@/assets/images/get/get-0-banner/get-0-banner__circle.svg");
        transition-delay: 2.4+0.4*2s+0.3s;
        transition-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
        transform: scale(0);
      }

      &.circle-1 {
        bottom: 110.8%;
        left: 24.2%;
        width: (18/1210)*100%;
        height: (18/500)*100%;
        background-image: url("~@/assets/images/get/get-0-banner/get-0-banner__circle.svg");
        transition-delay: 2.4+0.4*4s;
        transition-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
        transform: scale(0);
      }
    }

    .banner-animate-loading {
      transform: translateY(-50px);
    }
  }

  &.on {
    .get-0-banner__bg {
      i {
        opacity: 1;
        transform: scale(1) rotate(0) translateY(0);

        &.bg_circle-0, &.bg_circle-1, &.bg_circle-2 {
          opacity: 1;
          transform: scale(0) rotate(0) translateY(0);
          animation: 5s bg-circle-move infinite;
        }

        &.bg_circle-0 {
          animation-delay: 1s;
        }

        &.bg_circle-1 {
          animation-delay: 1.8s;
        }

        &.bg_circle-2 {
          animation-delay: 2.6s;
        }
      }
    }
  }

  &.text-on {
    .get-0-banner__content {
      h1, .get-0-banner__content_btn-container {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .get-0-banner__bg {
      opacity: 1;
    }
  }

  @keyframes bg-circle-move {
    0% {
      opacity: 0;
      transform: scale(0);
    }
    30% {
      opacity: 1;
      transform: scale(1);
    }
    50% {
      opacity: 1;
      transform: scale(1);
    }
    90% {
      opacity: 1;
      transform: scale(1);
    }
    100% {
      opacity: 0;
      transform: scale(1);
    }
  }
}

@media (max-width: 768px) {
  .get-0-banner {
    height: 650px;

    .get-0-banner__bg {
      margin-left: -(61.33vw/2);
      width: 161.33vw;
      height: 66.667vw;

      .banner-animate-loading {
        transform: translateY(-20px);
      }
    }

    .get-0-banner__content {
      position: relative;
      z-index: 1;

      h1 {
        padding: (130px/2) 5vw 0;
        line-height: 30px;
        font-size: 27px;
      }

      .get-0-banner__content_btn-container {
        margin-top: 40px;

        .unit {
          margin: 20px auto 0 !important;
          display: block;
          width: 211px;
          height: 56px;
        }
      }
    }
  }

}
</style>

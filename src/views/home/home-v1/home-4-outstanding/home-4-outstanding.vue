<template>
  <div class="home-4-outstanding home__sec">
    <div class="wrapper">
      <h2
        v-if="!($i18n.locale === 'de' && $store.state.isiOS)"
        ref="mark0" :class="{ 'on': animateBegin0 }" class="home__sec_h2"
      >
        {{ $t('home.home-4.title') }}
      </h2>
      <h2
        v-if="$i18n.locale === 'de' && $store.state.isiOS"
        ref="mark0" :class="{ 'on': animateBegin0 }" class="home__sec_h2"
      >
        {{ $t('home.home-4.title-ios') }}
      </h2>
      <div class="unit-container">
        <div ref="mark1" :class="{ 'on': animateBegin1 }" class="unit">
          <div class="img">
            <i class="img-0-00"></i>
            <i class="img-0-01"></i>
            <i class="img-0-02"></i>
            <i class="img-0-03"></i>
            <i class="img-0-04"></i>
            <i class="img-0-05"></i>
            <i class="img-0-06"></i>
            <i class="img-0-07"></i>
            <i class="img-0-08"></i>
            <i
              class="img-0-09"
              :class="{
                'getinshot': $i18n.locale === 'de' && !$store.state.isAndroid
                  && $store.state.productName === 'Getinshot',
                'followers-gallery': $i18n.locale === 'de' && !$store.state.isAndroid
                  && $store.state.productName === 'Followers Gallery'
              }"
            ></i>
            <i class="img-0-10"></i>
          </div>
          <div v-if="pageName === ''" class="text">
            <h3>{{ $t('home.home-4.unit-0.title') }}</h3>
            <p>{{ $t('home.home-4.unit-0.text0') }}{{ $store.state.productName }}{{ $t('home.home-4.unit-0.text1') }}</p>
          </div>
          <div v-if="pageName === 'event-dl'" class="text">
            <h3>{{ $t('home.home-4.unit-0.title') }}</h3>
            <p>
              Safety & Privacy are important.
              {{ $store.state.productName }}
              is developed by our professional and experienced team, 100% safe and clean.
              <b>No virus. No leak. No risk.</b> We value and protect your privacy.
              You can get organically growth of real Instagram followers and likes in our best security system.
            </p>
          </div>
        </div>

        <div ref="mark2" :class="{ 'on': animateBegin2 }" class="unit">
          <div class="img">
            <i class="img-1-01"></i>
            <i
              class="img-1-00"
              :class="{
                'getinshot': $i18n.locale === 'de' && !$store.state.isAndroid
                  && $store.state.productName === 'Getinshot',
                'followers-gallery': $i18n.locale === 'de' && !$store.state.isAndroid
                  && $store.state.productName === 'Followers Gallery'
              }"
            ></i>
            <i class="img-1-02"></i>
            <i class="img-1-03"></i>
            <i class="img-1-04"></i>
            <i class="img-1-05"></i>
            <i class="img-1-06"></i>
            <i class="img-1-07"></i>
            <i class="img-1-08"></i>
          </div>
          <div class="text">
            <h3>{{ $t('home.home-4.unit-1.title') }}</h3>
            <p>
              <b>{{ $t('home.home-4.unit-1.text0') }}</b>{{ $t('home.home-4.unit-1.text1') }}
              <br><br>
              <b>{{ $t('home.home-4.unit-1.text2') }}</b>{{ $t('home.home-4.unit-1.text3') }}
            </p>
          </div>
        </div>

        <div ref="mark3" :class="{ 'on': animateBegin3 }" class="unit">
          <div class="img" :class="{ 'minor-lang': $i18n.locale === 'de' }">
            <i class="img-2-00"></i>
            <i class="img-2-01"></i>
            <i class="img-2-02"></i>
            <i class="img-2-03"></i>
            <i class="img-2-04"></i>
            <i class="img-2-05"></i>
            <i class="img-2-06"></i>
            <i class="img-2-07"></i>
          </div>
          <div v-if="pageName === ''" class="text">
            <h3>{{ $t('home.home-4.unit-2.title') }}</h3>
            <p>
              {{ $t('home.home-4.unit-2.text0') }}
              {{ $store.state.productName }}{{ $t('home.home-4.unit-2.text1') }}
              {{ $store.state.productName }}{{ $t('home.home-4.unit-2.text2') }}
            </p>
          </div>
          <div v-if="pageName === 'event-dl'" class="text">
            <h3>Free Coins</h3>
            <p>
              Log into
              {{ $store.state.productName }}
              you’ll get hundreds of coins instantly that you can use to get followers & likes.
              You can earn more coins by verifying your accounts on
              {{ $store.state.productName }}.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home4Outstanding',
  components: {},
  props: {
    pageName: {
      type: String,
      required: false,
      default: ''
    }
  },
  data() {
    return {
      animateBegin0: false,
      animateBegin1: false,
      animateBegin2: false,
      animateBegin3: false
    };
  },
  mounted() {
    window.addEventListener('scroll', this.handle);
  },
  destroyed() {
    window.removeEventListener('scroll', this.handle);
  },
  methods: {
    handleScroll: function () {
      this.animateBegin0 = this.$refs.mark0.getBoundingClientRect().top < window.innerHeight * 0.66;
      this.animateBegin1 = this.$refs.mark1.getBoundingClientRect().top < window.innerHeight * 0.66;
      this.animateBegin2 = this.$refs.mark2.getBoundingClientRect().top < window.innerHeight * 0.66;
      this.animateBegin3 = this.$refs.mark3.getBoundingClientRect().top < window.innerHeight * 0.66;
    },
    handle() {
      const fun = this.handleScroll();
      this.COMMON.throttle(fun, 60, 100);
    }
  }
};
</script>

<style lang="scss" scoped>
.home-4-outstanding {
  padding-bottom: 0;

  .home__sec_h2 {
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.6s;

    &.on {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .unit-container {
    margin-top: 140px;

    .unit {
      margin-top: 50px;
      display: flex;
      justify-content: center;
      align-items: center;

      &:nth-child(even) {
        flex-direction: row-reverse;

        .text {
          margin-left: 0;
          margin-right: 60px;
        }
      }

      .text {
        margin-left: 60px;

        h3 {
          font: 600 30px/38px Montserrat;
          color: #2A2A2A;
        }

        p {
          margin-top: 16px;
          font: 500 20px/36px Montserrat;
          color: #000000;

          b {
            font-weight: 700;
          }
        }
      }

      .img {
        position: relative;
        width: 560px;
        height: 560px;
        flex-shrink: 0;

        &.minor-lang {
          i {
            &.img-2-02 {
              top: 23%;
              left: 49%;
              width: (248px/560px)*100%;
              height: (132px/560px)*100%;
              background-image: url("~@/views/home/home-v1/home-4-outstanding/img/home-4-outstanding_2-02-de.svg");

              transition-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
              transition-delay: 1.2s;
              opacity: 0;
              transform: scale(1) rotate(-20deg);
            }

            &.img-2-03 {
              top: 50%;
              left: 28%;
              width: (319px/560px)*100%;
              height: (319px/560px)*100%;
              background-image: url("~@/views/home/home-v1/home-4-outstanding/img/home-4-outstanding_2-03-de.svg");

              transition-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
              transition-delay: 1.4s;
              opacity: 0;
              transform: scale(0.5);
            }
          }
        }

        i {
          position: absolute;
          display: block;
          background-position: center;
          background-repeat: no-repeat;
          background-size: contain;
          transition: all 0.6s;

          &.img-0-00 {
            top: (75px/560px)*100%;
            left: (80px/560px)*100%;
            width: 70.893%;
            height: 70.893%;
            background-image: url("~@/views/home/home-v1/home-4-outstanding/img/home-4-outstanding_0-00.svg");

            transition-delay: 0s;
            opacity: 0;
            transform: scale(0);
          }

          &.img-0-01 {
            bottom: (126px/560px)*100%;
            left: (140px/560px)*100%;
            width: (52px/560px)*100%;
            height: (118px/560px)*100%;
            background-image: url("~@/views/home/home-v1/home-4-outstanding/img/home-4-outstanding_0-01.svg");

            transition-delay: 0.2s;
            transform: scaleY(0);
            transform-origin: center bottom;
          }

          &.img-0-02 {
            bottom: (126px/560px)*100%;
            left: (216px/560px)*100%;
            width: (52px/560px)*100%;
            height: (199px/560px)*100%;
            background-image: url("~@/views/home/home-v1/home-4-outstanding/img/home-4-outstanding_0-02.svg");

            transition-delay: 0.4s;
            transform: scaleY(0);
            transform-origin: center bottom;
          }

          &.img-0-03 {
            bottom: (126px/560px)*100%;
            left: (294px/560px)*100%;
            width: (52px/560px)*100%;
            height: (212px/560px)*100%;
            background-image: url("~@/views/home/home-v1/home-4-outstanding/img/home-4-outstanding_0-03.svg");

            transition-delay: 0.6s;
            transform: scaleY(0);
            transform-origin: center bottom;
          }

          &.img-0-04 {
            bottom: (126px/560px)*100%;
            left: (374px/560px)*100%;
            width: (52px/560px)*100%;
            height: (254px/560px)*100%;
            background-image: url("~@/views/home/home-v1/home-4-outstanding/img/home-4-outstanding_0-04.svg");

            transition-delay: 0.8s;
            transform: scaleY(0);
            transform-origin: center bottom;
          }

          &.img-0-05 {
            top: (6px/560px)*100%;
            left: (18px/560px)*100%;
            width: (450px/560px)*100%;
            height: (468px/560px)*100%;
            background-image: url("~@/views/home/home-v1/home-4-outstanding/img/home-4-outstanding_0-05.svg");

            transition-delay: 1s;
            opacity: 0;
            transform: scale(0);
            transform-origin: left bottom;
          }

          &.img-0-06 {
            top: (30px/560px)*100%;
            left: (266px/560px)*100%;
            width: (68px/560px)*100%;
            height: (68px/560px)*100%;
            background-image: url("~@/views/home/home-v1/home-4-outstanding/img/home-4-outstanding_0-06.svg");

            transition-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
            transition-delay: 1.8s;
            opacity: 0;
            transform: scale(0);
          }

          &.img-0-07 {
            top: (162px/560px)*100%;
            left: (28px/560px)*100%;
            width: (113px/560px)*100%;
            height: (113px/560px)*100%;
            background-image: url("~@/views/home/home-v1/home-4-outstanding/img/home-4-outstanding_0-07.svg");

            transition-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
            transition-delay: 2.0s;
            opacity: 0;
            transform: scale(0);
          }

          &.img-0-08 {
            top: (332px/560px)*100%;
            left: (180px/560px)*100%;
            width: (68px/560px)*100%;
            height: (68px/560px)*100%;
            background-image: url("~@/views/home/home-v1/home-4-outstanding/img/home-4-outstanding_0-08.svg");

            transition-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
            transition-delay: 2.2s;
            opacity: 0;
            transform: scale(0);
          }

          &.img-0-09 {
            top: (222px/560px)*100%;
            left: (195px/560px)*100%;
            width: (352px/560px)*100%;
            height: (401px/560px)*100%;
            background-image: url("~@/views/home/home-v1/home-4-outstanding/img/home-4-outstanding_0-09.svg");

            transition-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
            transition-delay: 2.4s;
            opacity: 0;
            transform: scale(0);

            &.getinshot {
              background-image: url("~@/views/home/home-v1/home-4-outstanding/img/home-4-outstanding_0-09-de.svg");
            }

            &.followers-gallery {
              background-image: url("~@/views/home/home-v1/home-4-outstanding/img/home-4-outstanding_0-09-de-followers-gallery.svg");
            }
          }

          &.img-0-10 {
            top: (87px/560px)*100%;
            left: (95px/560px)*100%;
            width: (429px/560px)*100%;
            height: (388px/560px)*100%;
            background-image: url("~@/views/home/home-v1/home-4-outstanding/img/home-4-outstanding_0-10.svg");

            transition-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
            transition-delay: 3s;
            opacity: 0;
            transform: scale(0.6);
          }

          &.img-1-00 {
            top: (242px/560px)*100%;
            left: (242px/560px)*100%;
            width: (75px/560px)*100%;
            height: (75px/560px)*100%;
            background-image: url("~@/views/home/home-v1/home-4-outstanding/img/home-4-outstanding_1-00.svg");

            transition-delay: 0s;
            opacity: 0;
            transform: scale(0);

            &.getinshot {
              background-image: url("~@/assets/images/global/logo_getinshot-outline.svg");
            }

            &.followers-gallery {
              background-image: url("~@/assets/images/global/logo_follower-gallery.svg");
            }
          }

          &.img-1-01 {
            top: (54px/560px)*100%;
            left: (54px/560px)*100%;
            width: (452px/560px)*100%;
            height: (452px/560px)*100%;
            background-image: url("~@/views/home/home-v1/home-4-outstanding/img/home-4-outstanding_1-01.svg");

            transition-delay: 0.2s;
            opacity: 0;
            transform: scale(0);
          }

          &.img-1-02 {
            top: (110px/560px)*100%;
            left: (230px/560px)*100%;
            width: (170px/560px)*100%;
            height: (170px/560px)*100%;
            background-image: url("~@/views/home/home-v1/home-4-outstanding/img/home-4-outstanding_1-02.png");

            transition-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
            transition-delay: 0.8s;
            transform: scale(0);
          }

          &.img-1-03 {
            top: (282px/560px)*100%;
            left: (282px/560px)*100%;
            width: (204px/560px)*100%;
            height: (204px/560px)*100%;
            background-image: url("~@/views/home/home-v1/home-4-outstanding/img/home-4-outstanding_1-03.png");

            transition-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
            transition-delay: 1.0s;
            transform: scale(0);
          }

          &.img-1-04 {
            top: (287px/560px)*100%;
            left: (55px/560px)*100%;
            width: (178px/560px)*100%;
            height: (178px/560px)*100%;
            background-image: url("~@/views/home/home-v1/home-4-outstanding/img/home-4-outstanding_1-04.png");

            transition-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
            transition-delay: 1.2s;
            transform: scale(0);
          }

          &.img-1-05 {
            top: (56px/560px)*100%;
            left: (14px/560px)*100%;
            width: (196px/560px)*100%;
            height: (196px/560px)*100%;
            background-image: url("~@/views/home/home-v1/home-4-outstanding/img/home-4-outstanding_1-05.png");

            transition-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
            transition-delay: 1.4s;
            transform: scale(0);
          }

          &.img-1-06 {
            top: (434px/560px)*100%;
            left: (152px/560px)*100%;
            width: (142px/560px)*100%;
            height: (142px/560px)*100%;
            background-image: url("~@/views/home/home-v1/home-4-outstanding/img/home-4-outstanding_1-06.png");

            transition-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
            transition-delay: 1.6s;
            transform: scale(0);
          }

          &.img-1-07 {
            top: (124px/560px)*100%;
            left: (406px/560px)*100%;
            width: (156px/560px)*100%;
            height: (156px/560px)*100%;
            background-image: url("~@/views/home/home-v1/home-4-outstanding/img/home-4-outstanding_1-07.png");

            transition-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
            transition-delay: 1.8s;
            transform: scale(0);
          }

          &.img-1-08 {
            top: (54px/560px)*100%;
            left: (38px/560px)*100%;
            width: (406px/560px)*100%;
            height: (410px/560px)*100%;
            background-image: url("~@/views/home/home-v1/home-4-outstanding/img/home-4-outstanding_1-08.svg");

            transition-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
            transition-delay: 2.4s;
            opacity: 0;
            transform: scale(0.6);
          }

          &.img-2-00 {
            top: (100px/560px)*100%;
            left: (100px/560px)*100%;
            width: (352px/560px)*100%;
            height: (352px/560px)*100%;
            background-image: url("~@/views/home/home-v1/home-4-outstanding/img/home-4-outstanding_2-00.svg");

            transition-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
            transition-delay: 0s;
            opacity: 0;
            transform: scale(0.6);
          }

          &.img-2-01 {
            top: (112px/560px)*100%;
            left: (26px/560px)*100%;
            width: (378px/560px)*100%;
            height: (337px/560px)*100%;
            background-image: url("~@/views/home/home-v1/home-4-outstanding/img/home-4-outstanding_2-01.svg");

            transition-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
            transition-delay: 0s;
            opacity: 0;
            transform: scale(0.6);
          }

          &.img-2-01 {
            top: (112px/560px)*100%;
            left: (26px/560px)*100%;
            width: (378px/560px)*100%;
            height: (337px/560px)*100%;
            background-image: url("~@/views/home/home-v1/home-4-outstanding/img/home-4-outstanding_2-01.svg");

            transition-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
            transition-delay: 0.6s;
            opacity: 0;
            transform: scale(1) rotate(40deg);
            transform-origin: left bottom;
          }

          &.img-2-02 {
            top: (158px/560px)*100%;
            left: (378px/560px)*100%;
            width: (184px/560px)*100%;
            height: (65px/560px)*100%;
            background-image: url("~@/views/home/home-v1/home-4-outstanding/img/home-4-outstanding_2-02.svg");

            transition-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
            transition-delay: 1.2s;
            opacity: 0;
            transform: scale(1) rotate(-20deg);
          }

          &.img-2-03 {
            top: (426px/560px)*100%;
            left: (114px/560px)*100%;
            width: (331px/560px)*100%;
            height: (98px/560px)*100%;
            background-image: url("~@/views/home/home-v1/home-4-outstanding/img/home-4-outstanding_2-03.svg");

            transition-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
            transition-delay: 1.4s;
            opacity: 0;
            transform: scale(0.5);
          }

          &.img-2-04 {
            top: (334px/560px)*100%;
            left: (64px/560px)*100%;
            width: (45px/560px)*100%;
            height: (45px/560px)*100%;
            background-image: url("~@/views/home/home-v1/home-4-outstanding/img/home-4-outstanding_2-04.svg");

            transition-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
            transition-delay: 1.8s;
            opacity: 0;
            transform: scale(0);
          }

          &.img-2-05 {
            top: (290px/560px)*100%;
            left: (402px/560px)*100%;
            width: (75px/560px)*100%;
            height: (75px/560px)*100%;
            background-image: url("~@/views/home/home-v1/home-4-outstanding/img/home-4-outstanding_2-05.svg");

            transition-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
            transition-delay: 2.0s;
            opacity: 0;
            transform: scale(0);
          }

          &.img-2-06 {
            top: (214px/560px)*100%;
            left: (426px/560px)*100%;
            width: (38px/560px)*100%;
            height: (38px/560px)*100%;
            background-image: url("~@/views/home/home-v1/home-4-outstanding/img/home-4-outstanding_2-05.svg");

            transition-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
            transition-delay: 2.2s;
            opacity: 0;
            transform: scale(0);
          }

          &.img-2-07 {
            top: (68px/560px)*100%;
            left: (102px/560px)*100%;
            width: (322px/560px)*100%;
            height: (314px/560px)*100%;
            background-image: url("~@/views/home/home-v1/home-4-outstanding/img/home-4-outstanding_2-06.svg");

            transition-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
            transition-delay: 2.4s;
            opacity: 0;
            transform: scale(0.6);
          }
        }
      }

      &.on {
        .img {
          i {
            opacity: 1 !important;
            transform: scale(1) !important;
          }
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .home-4-outstanding {
    .unit-container {
      margin-top: 0;
      width: 100%;

      .unit {
        margin-top: (90px/2);
        width: 100%;
        display: block;
        text-align: center;

        .img {
          display: inline-block;
          width: 70vw;
          height: 70vw;

          img {
            width: 100%;
            height: 100%;
          }
        }

        .text {
          margin: 0;
          padding: 0 7vw;

          h3 {
            font-size: (32px/2);
            line-height: (40px/2);
          }

          p {
            margin-top: (16px/2);
            font-size: (24px/2);
            line-height: (36px/2);
            text-align: left;
          }
        }

        &:nth-child(even) {
          .text {
            margin: 0;
          }
        }
      }
    }
  }
}
</style>

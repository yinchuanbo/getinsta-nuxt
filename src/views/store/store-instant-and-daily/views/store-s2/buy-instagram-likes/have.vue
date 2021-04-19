<template>
  <div ref="homeSecrecy" class="auto-two">
      <div class="wrapper">
        <h2>Until Now, We Have:</h2>
        <div class="num-contain">
          <div class="leftimg"></div>
          <div class="rightnum">
            <div class="myroll01">
              <div class="myroll">
                <div id="num-roll1"></div>
                ,
                <div id="num-roll2"></div>
                ,
                <div id="num-roll3"></div>
              </div>
              <p class="marginbtm35">Likes Delivered</p>
            </div>
            <div class="myroll02">
              <div class="myroll">
                <div id="num-roll4"></div>
                ,
                <div id="num-roll5"></div>
                ,
                <div id="num-roll6"></div>
              </div>
              <p class="marginbtm35">Followers Provided</p>
            </div>
            <div class="myroll03">
              <div class="myroll">
                <div id="num-roll7"></div>
                ,
                <div id="num-roll8"></div>
                ,
                <div id="num-roll9"></div>
              </div>
              <p>Repeat Customer</p>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import DigitRoll from '@/assets/scripts/digitRoll.js';
export default {
  data() {
    return {
      isfalse: false,
      buyflag: false,
      roll1: null,
      roll2: null,
      roll3: null,
      roll4: null,
      roll5: null,
      roll6: null,
      roll7: null,
      roll8: null,
      roll9: null,
      // moblie
      btnshow: false,
    };
  },
  mounted() {
    this.roll1 = new DigitRoll({
      container: '#num-roll1',
      width: 1
    });
    this.roll2 = new DigitRoll({
      container: '#num-roll2',
      width: 1
    });
    this.roll3 = new DigitRoll({
      container: '#num-roll3',
      width: 1
    });
    this.roll1 = new DigitRoll({
      container: '#num-roll1',
      width: 1
    });
    this.roll2 = new DigitRoll({
      container: '#num-roll2',
      width: 1
    });
    this.roll3 = new DigitRoll({
      container: '#num-roll3',
      width: 1
    });
    this.roll4 = new DigitRoll({
      container: '#num-roll4',
      width: 1
    });
    this.roll5 = new DigitRoll({
      container: '#num-roll5',
      width: 1
    });
    this.roll6 = new DigitRoll({
      container: '#num-roll6',
      width: 1
    });
    this.roll7 = new DigitRoll({
      container: '#num-roll7',
      width: 1
    });
    this.roll8 = new DigitRoll({
      container: '#num-roll8',
      width: 1
    });
    this.roll9 = new DigitRoll({
      container: '#num-roll9',
      width: 1
    });
    window.addEventListener('scroll', this.handle);
  },
  destroyed() {
    window.removeEventListener('scroll', this.handle);
    this.destroyedRoll();
  },
  methods: {
    getScrollTop() {
      let scroll_top = 0;
      if (document.documentElement && document.documentElement.scrollTop) {
        scroll_top = document.documentElement.scrollTop;
      } else if (document.body) {
        scroll_top = document.body.scrollTop;
      }
      return scroll_top;
    },
    mobileroull() {
      if (this.COMMON.isMobile()) {
        this.$scrollTo('#auto-step2', { offset: -1 * this.COMMON.headerHeight() });
      }
    },
    mobileroull1() {
      if (this.COMMON.isMobile()) {
        this.$scrollTo('#auto-step3', { offset: -1 * this.COMMON.headerHeight() });
      }
    },
    rollrun() {
      this.roll1.roll(505);
      this.roll2.roll(602);
      this.roll3.roll(663);
      this.roll4.roll(65);
      this.roll5.roll(203);
      this.roll6.roll(802);
      this.roll7.roll(25);
      this.roll8.roll(368);
      this.roll9.roll(975);
    },
    handleScroll() {
      if (
        this.$refs.homeSecrecy.getBoundingClientRect().top <
        window.innerHeight * 0.66
      ) {
        setTimeout(this.rollrun(), 400);
      }
    },
    handle() {
      const fun = this.handleScroll();
      this.COMMON.throttle(fun, 60, 100);
    },
    destroyedRoll() {
      this.roll1.roll(505);
      this.roll2.roll(602);
      this.roll3.roll(663);
      this.roll4.roll(65);
      this.roll5.roll(203);
      this.roll6.roll(802);
      this.roll7.roll(25);
      this.roll8.roll(368);
      this.roll9.roll(975);
    },
  }
};
</script>
<style lang="scss" scope>
.auto-two {
    width: 100%;
    padding-top: 76px;
    text-align: center;
    height: 613px;
    background: transparent linear-gradient(180deg, #D091FF 0%, #8A86FE 100%) 0% 0% no-repeat padding-box;
    background-size: cover;

    h2 {
      font: 600 36px/44px BalooChettan;
      color: #fff;
      position: relative;
    }

    h2:after {
      position: absolute;
      content: "";
      width: 116px;
      height: 8px;
      background: #fff;
      border-radius: 7px;
      left: calc(50% - 58px);
      opacity: 1;
      top: 82px;
    }

    .num-contain {
      margin-top: 100px;
      display: flex;
      justify-content: center;

      .leftimg {
        width: 534px;
        height: 327px;
        background: url("./img/auto-two/auto_two_per.svg") no-repeat top center;
        margin-right: 84px;
      }

      .rightnum {
        text-align: left;

        p {
          font: 500 24px/29px BalooChettan;
          letter-spacing: 0px;
          color: #ffffff;
        }

        p.marginbtm35 {
          margin-bottom: 30px;
        }

        .myroll {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          color: #fff239;
          font: 40px BalooChettan;
        }
      }
    }
  }
@media (max-width: 768px) {
  .auto-two {
      overflow: hidden;
      width: 100%;
      height: 512px;
      background: transparent linear-gradient(180deg, #e484f0 0%, #8a86fe 100%) 0% 0% no-repeat padding-box;
      opacity: 1;
      padding-top: 40px;

      h2 {
        font: 600 18px/22px BalooChettan;
      }

      h2:after {
        width: 58px;
        height: 4px;
        left: calc(50% - 29px);
        top: 41px;
      }

      .num-contain {
        width: 361px;
        height: 361px;
        margin: auto;
        margin-top: 50px;
        background: url("./img/auto-two/circle.png") no-repeat;
        background-size: 100% 100%;
        position: relative;

        .leftimg {
          width: 224px;
          height: 137px;
          position: absolute;
          background-size: contain;
          top: calc(50% - 68px);
          left: calc(50% - 112px);
          z-index: 2;
        }

        .rightnum {
          p {
            font: 500 14px/17px BalooChettan !important;

          }

          p.marginbtm35 {
            margin-bottom: 0;
            margin-top: -15px;
          }

          .myroll {
            font: 25px BalooChettan !important;
            margin-top: -8px;

          }

          .myroll01 {
            width: 220px;
            height: 68px;
            line-height: 40px;
            border-radius: 34px 0 0 34px;
            position: absolute;
            background: #e094ff 0% 0% no-repeat padding-box;
            right: -50px;
            top: 16px;
            padding-left: 21px;
          }

          .myroll02 {
            width: 220px;
            height: 68px;
            line-height: 40px;
            border-radius: 0 34px 34px 0;
            position: absolute;
            background: #cb9aff 0% 0% no-repeat padding-box;
            left: -54px;
            top: 65px;
            padding-left: 60px;
            z-index: 1;
          }

          .myroll03 {
            width: 220px;
            height: 68px;
            line-height: 40px;
            position: absolute;
            background: #c2a8ff 0% 0% no-repeat padding-box;
            border-radius: 34px;
            bottom: 32px;
            text-align: center;

            align-items: center;
            left: calc(50% - 105px);

            p {
              margin-top: -15px;
            }

            .myroll {
              display: flex;
              justify-content: center;
            }
          }
        }
      }
    }
}
</style>

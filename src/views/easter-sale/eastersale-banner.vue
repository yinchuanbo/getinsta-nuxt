<template>
  <div class="eastersale-banner">
    <div class="eastersale-banner_top_left">
      <img src="./images/top_left_flowers.svg" alt="">
    </div>
    <div class="eastersale-banner_center">
      <h3>HAPPY</h3>
      <div class="eastersale-easter">
        <img src="./images/easter.svg" />
      </div>
      <div class="eastersale-tags">
        <div class="eastersale-tags-sale">SALE</div>
        <div class="eastersale-tags-free">Buy One and Get FREE One</div>
      </div>
      <div class="eastersale-downtime">
        <div class="eastersale-downtime-num">
          <ul>
            <li>{{ date_d }}</li>
            <li>{{ date_h }}</li>
            <li>{{ date_m }}</li>
            <li>{{ date_s }}</li>
            <li>{{ date_ms }}</li>
          </ul>
        </div>
        <div class="eastersale-downtime-date">
          <ul>
            <li>D</li>
            <li>H</li>
            <li>M</li>
            <li>S</li>
            <li>MS</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="eastersale-banner_bottom">
      <img src="./images/bottom_grass.png" alt="">
    </div>
    <div class="eastersale-banner_top_right">
      <img src="./images/top_right_flowers.svg" alt="">
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      endTime: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        date_d: '',
        date_h: '',
        date_m: '',
        date_s: '',
        date_ms: ''
      }
    },
    created() {
      this.countTime()
    },
    methods: {
      //时间倒计时处理
      countTime() {
        var date = new Date()
        var now = date.getTime()
        var endDate = new Date(this.endTime)
        var end = endDate.getTime()
        var leftTime = end - now
        var d, h, m, s, ms
        if (leftTime >= 0) {
          d = Math.floor(leftTime / 1000 / 60 / 60 / 24)
          h = Math.floor((leftTime / 1000 / 60 / 60) % 24)
          m = Math.floor((leftTime / 1000 / 60) % 60)
          s = Math.floor((leftTime / 1000) % 60)
          ms = Math.floor(leftTime % 1000)
        } else {
          console.log('已截止')
        }
        this.date_d = d
        this.date_h = h
        this.date_m = m
        this.date_s = s
        this.date_ms = ms
        setTimeout(this.countTime, 50)
      }
    }
  };
</script>

<style lang="scss" scoped>
  .eastersale-banner {
    width: 100%;
    height: 614px;
    background: #FFE2E7 0% 0% no-repeat padding-box;
    opacity: 1;
    position: relative;

    .eastersale-banner_top_left {
      position: absolute;
      width: 425px;
      height: 304px;
      left: 0;
      top: 0;
      z-index: 2;

      img {
        display: block;
        width: 100%;
        height: 100%;
      }
    }

    .eastersale-banner_center {
      position: absolute;
      width: 1576px;
      height: 537px;
      top: 60px;
      left: 50%;
      transform: translateX(-50%);
      background: url("./images/top_center.svg") no-repeat;
      background-position: center center;
      z-index: 3;

      h3 {
        text-align: center;
        font: normal normal 500 22px/22px BalooChettan;
        letter-spacing: 0px;
        color: #f16485;
        margin-top: 21px;
        margin-bottom: 21px;
      }

      .eastersale-easter {
        img {
          display: block;
          margin: 0 auto;
        }

        margin-bottom: 22px;
      }

      .eastersale-tags {
        width: 234px;
        height: 22px;
        background: #16c483;
        margin: 0 auto;
        margin-bottom: 22px;
        display: flex;
        border-radius: 8px 0px 8px 0px;

        .eastersale-tags-sale {
          width: 51px;
          height: 100%;
          background: #f16485 0% 0% no-repeat padding-box;
          border-radius: 8px 0px;
          font: normal normal 600 15px/22px BalooChettan;
          letter-spacing: 0px;
          color: #ffffff;
          text-align: center;
        }

        .eastersale-tags-free {
          flex: 1;
          text-align: center;
          font: normal normal 500 14px/22px BalooChettan;
          letter-spacing: 0px;
          color: #ffffff;
        }
      }

      .eastersale-downtime {
        width: 266px;
        height: 56px;
        background: rgba(255, 255, 255, 0.64);
        border-radius: 12px;
        margin: 0 auto;
        padding: 5px 0;

        .eastersale-downtime-num {
          width: 100%;
          height: 50%;

          ul {
            width: 100%;
            height: 100%;
            display: flex;

            li {
              flex: 1;
              text-align: center;
              font: normal normal bold 20px/28px BalooChettan;
              letter-spacing: 0px;
              color: #F16485;
              opacity: 1;
            }
          }
        }

        .eastersale-downtime-date {
          width: 100%;
          height: 50%;

          ul {
            width: 100%;
            height: 100%;
            display: flex;

            li {
              flex: 1;
              text-align: center;
              font: normal normal 500 12px/28px BalooChettan;
              letter-spacing: 0px;
              color: #7F8498;
              opacity: 1;
              position: relative;

              &:not(:last-child):before {
                content: '';
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                right: 0;
                width: 1px;
                height: 6px;
                background: #7F8498;
              }
            }
          }
        }
      }
    }

    .eastersale-banner_top_right {
      position: absolute;
      width: 294px;
      height: 195px;
      top: 0;
      right: 0;
      z-index: 2;

      img {
        display: block;
        width: 100%;
        height: 100%;
      }
    }

    .eastersale-banner_bottom {
      position: absolute;
      width: 1920px;
      height: 424px;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      right: 0;

      img {
        display: block;
        width: 100%;
        height: 100%;
        margin: 0 auto;
      }
    }
  }
</style>

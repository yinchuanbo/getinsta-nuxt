<template>
  <div class="which-one">
    <div class="wrapper">
      <h2>Which One is Suitable for You to Buy?</h2>
      <p class="descripation">Two options offered by GetInsta, one is instant Instagram followers, the other is daily Instagram followers. Just see the differences and choose the one that suits you best.</p>
      <div class="which-one-list">
        <div class="leftlist item">
          <div class="topcon">
            <div class="topicon"><span class="mintext">Instant IG Followers</span></div>
          </div>
          <ul class="ulcon">
            <li v-for="itemx in instantList" :key="itemx.id">{{ itemx.text }}</li>
          </ul>
          <div class="clicklink" @click="gastore"><a href="/buy-instagram-followers" target="_blank">Get Instant Followers>></a></div>
        </div>
        <div class="rightlist item">
          <div class="topcon">
            <div class="topicon"><span class="mintextone">Daily IG Followers</span></div>
          </div>
          <ul class="ulcon">
            <li v-for="itemy in DailyList" :key="itemy.id">{{ itemy.text }}</li>
          </ul>
          <div class="clicklink"><a @click="goDaily">Get Daily Followers>></a></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WhichOne',
  data() {
    return {
      instantList: [{ id: 1, text: 'Get 1K or More Followers One Time' },
        { id: 2, text: 'Spend Only $0.011 Per Follower' },
        { id: 3, text: 'Starts Delivering Once Place Orders' },
        { id: 4, text: 'Additional Free Instagram Followers' },
        { id: 5, text: 'For Instagram Experienced Users' },
        { id: 6, text: 'Fast & Instant' }],
      DailyList: [{ id: 1, text: 'Get 50, 150, or 200 IG Followers Per Day' },
        { id: 2, text: 'Spend Less than $0.009 Per Follower' },
        { id: 3, text: 'Delivers Every 24 Hours Automatically' },
        { id: 4, text: 'Drop-Protection System' },
        { id: 5, text: 'For Instagram New Users' },
        { id: 6, text: 'Organically & Continuously' }]
    };
  },
  methods: {
    goDaily() {
      // const ele = this.fatherid;
      const ele = document.getElementById('maxcontain');
      ele.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
      this.$ga.event('buttonclick',
        'click', 'daily-daily');
    },
    gastore() {
      this.$ga.event('buttonclick',
        'click', 'daily-instant');
    }
  }
};
</script>

<style lang="scss" scoped>
.which-one {
  background: #f3ecff;
  padding-top: 90px;
  padding-bottom: 133px;

  h2 {
    text-align: center;
    font: 600 36px/44px Montserrat;
    position: relative;
  }

  h2:after {
    position: absolute;
    content: "";
    width: 116px;
    height: 8px;
    background: #f1a92e;
    border-radius: 7px;
    left: calc(50% - 58px);
    opacity: 1;
    top: 82px;
  }

  p.descripation {
    font: 500 18px/32px Montserrat;
    letter-spacing: 0px;
    color: #000000;
    margin-top: 112px;
  }

  .which-one-list {
    display: flex;
    justify-content: center;
    padding-top: 47px;

    .item {
      width: 419px;
      border-radius: 15px 15px 20px 20px;
      box-shadow: 0px 12px 26px #8b8b8b54;
      background: #fff;

      .topcon {
        width: 100%;
        height: 75px;
        background: url("../img/whichone/whichone_top.svg") no-repeat;
        position: relative;

        .topicon {
          width: 100%;
          height: 90px;
          position: absolute;
          background: url("../img/whichone/whichone_header_bg.svg") no-repeat;
          top: -18px;
          text-align: center;
          font: 600 20px Montserrat;
          letter-spacing: 0px;
          color: #ffffff;
          padding-top: 40px;
        }
      }

      .clicklink {
        text-align: center;
        margin: 44px 0;

        a {
          text-decoration: underline;
          color: #fc893d;
          font: 500 18px/22px Montserrat;

          &:hover {
            color: #f5c951;
          }
        }
      }

      ul {
        padding-left: 70px;
        padding-top: 20px;
        padding-right: 28px;

        li {
          text-align: left;
          font: 500 16px/50px Montserrat;
          color: #271610;
          border-bottom: 1px solid #f3ecff;
          position: relative;
        }

        li:before {
          position: absolute;
          content: "";
          width: 22px;
          height: 23px;
          background: url("../img/whichone/succ.svg") no-repeat;
          top: 13px;
          left: -36px;
        }
      }
    }

    .item.leftlist {
      margin-right: 86px;
    }
  }
}

@media (max-width: 768px) {
  .which-one {
    background: #fff;
    padding-top: 90px;
    padding-bottom: 133px;

    .wrapper {
      width: 86%;
    }

    h2 {
      text-align: center;
      font: 600 18px/28px Montserrat;
      position: relative;
    }

    h2:after {
      position: absolute;
      content: "";
      width: 58px;
      height: 4px;
      background: #f1a92e;
      border-radius: 7px;
      left: calc(50% - 29px);
      opacity: 1;
      top: 61px;
    }

    p.descripation {
      font: 500 14px/22px Montserrat;
      letter-spacing: 0px;
      color: #000000;
      margin-top: 58px;
    }

    .which-one-list {
      display: flex;
      flex-direction: column;
      padding-top: 35px;

      .item {
        width: 100%;
        border-radius: 36px 36px 10px 10px;
        box-shadow: 0px 12px 26px #8b8b8b54;
        background: #fff;

        .topcon {
          width: 100%;
          height: 75px;
          border-radius: 36px 36px 0px 0px;
          background: url("../img/whichone/whichone_top.svg") no-repeat;
          position: relative;

          .topicon {
            width: 100%;
            height: 90px;
            position: absolute;
            background: url("../img/whichone/mobile_bg_top.svg") no-repeat;
            background-size: contain;
            top: 0px;
            text-align: center;
            font: 600 18px Montserrat;
            letter-spacing: 0px;
            color: #ffffff;
            padding-top: 40px;

            .mintext {
              position: absolute;
              right: 23%;
              top: 26px;
            }

            .mintextone {
              position: absolute;
              right: 26%;
              top: 26px;
            }
          }
        }

        .clicklink {
          text-align: center;
          margin: 44px 0;

          a {
            text-decoration: underline;
            color: #2c48ff;
            font: 500 14px/17px Montserrat;
          }
        }

        ul {
          padding-left: 56px;
          padding-top: 20px;
          padding-right: 28px;

          li {
            text-align: left;
            font: 500 12px/36px Montserrat;
            color: #271610;
            border-bottom: 1px solid #f3ecff;
            position: relative;
          }

          li:before {
            position: absolute;
            content: "";
            width: 22px;
            height: 23px;
            background: url("../img/whichone/succ.svg") no-repeat;
            top: 10px;
            left: -36px;
          }
        }
      }

      .item.leftlist {
        margin-right: 0px;
        margin-bottom: 50px;
      }
    }
  }
}
</style>

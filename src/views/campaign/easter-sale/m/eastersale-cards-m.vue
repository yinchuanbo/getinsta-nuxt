<template>
  <div class="eastersale-cards-m">
    <div class="eastersale-cards-m_top">
      <div class="eastersale-cards-m_top-downtime">
        <span>End in</span>
        <div class="eastersale-cards-m_top-downtime_time">
          <ul>
            <li>
              <b>{{ d }}</b>
              <span>D</span>
              <i>:</i>
            </li>
            <li>
              <b>{{ h }}</b>
              <span>H</span>
              <i>:</i>
            </li>
            <li>
              <b>{{ m }}</b>
              <span>M</span>
              <i>:</i>
            </li>
            <li>
              <b>{{ s }}</b>
              <span>S</span>
            </li>
          </ul>
        </div>
      </div>
      <eastersale-card-m :btn-w="295" :bg-img="true" :product="products[1]" />
    </div>
    <div class="eastersale-cards-m_bottom">
      <eastersale-card-m :product="products[0]" />
    </div>
  </div>
</template>

<script>
import EastersaleCardM from './eastersale-card-m.vue'
export default {
  components: {
    EastersaleCardM
  },
  props: {
    endTime: {
      type: String,
      default: ''
    },
    products: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  data() {
    return {
      d: '',
      h: '',
      m: '',
      s: ''
    }
  },
  created() {
    this.countTime()
  },
  methods: {
    countTime() {
        var date = new Date()
        var now = date.getTime()
        var endDate = new Date(this.endTime)
        var end = endDate.getTime()
        var leftTime = end - now
        if (leftTime >= 0) {
          this.d = Math.floor(leftTime / 1000 / 60 / 60 / 24)
          this.h = Math.floor((leftTime / 1000 / 60 / 60) % 24)
          this.m = Math.floor((leftTime / 1000 / 60) % 60)
          this.s = Math.floor((leftTime / 1000) % 60)
        }
        setTimeout(this.countTime, 1000)
      }
    }
  }
</script>

<style lang="scss">
.eastersale-cards-m {
  padding: 0 16px;
  box-sizing: border-box;
  position: relative;
  margin-top: -83px;
  .eastersale-cards-m_top {
    width: 100%;
    height: 254px;
    margin-bottom: 20px;
    background: #F16485 0% 0% no-repeat padding-box;
    border-radius: 12px;
    .eastersale-cards-m_top-downtime {
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 15px;
      box-sizing: border-box;
      > span {
        text-align: center;
        font: normal normal 400 12px/30px BalooChettan;
        letter-spacing: 0px;
        color: #FFFFFF;
        opacity: 1;
      }
      .eastersale-cards-m_top-downtime_time {
        ul {
          display: flex;
          align-items: center;
          li {
            display: flex;
            align-items: center;
            b {
              font: normal normal 600 20px/30px BalooChettan;
              letter-spacing: 0px;
              color: #FFE282;
              opacity: 1;
              width: 20px;
              text-align: center;
            }
            span, i {
              text-align: center;
              font: normal normal 500 12px/30px BalooChettan;
              letter-spacing: 0px;
              color: #FFFFFF;
              opacity: 1;
            }
            b, span, i {
              margin: 0 3px;
            }
          }
        }
      }
    }
  }
  .eastersale-cards-m_bottom {
    width: 100%;
    height: 224px;
    margin-bottom: 70px;
  }
}
</style>

<template>
  <div
    ref="mark"
    :class="{ on: animateBegin }"
    class="home-12-download-btn home__sec"
  >
    <div class="wrapper">
      <h2 class="step-0">Download Instagram Followers App to Get Free IG Followers</h2>
      <p class="step-1">Download GetInsta now to get unlimited real free Instagram followers without paying. No survey, no password.</p>
      <div class="btns step-2">
         <div class="" @click="downloadAppGate">
          <button-icon-ins class="button-hover-1" theme="gradiant" text="Get Free Followers Now" square shadow :icon="'ins'" font-size="size-15" />
        </div>
        <!--btn BuyNow-->
        <div class="" @click="ga01">
          <button-buy-now square :text="$t('home.home-1.btn.BuyNow')" font-size="size-16" />
        </div>
      </div>
    </div>
    <i></i>
    <i></i>
    <i></i>
    <i></i>
    <i></i>
    <i></i>
  </div>
</template>

<script>
import ButtonIconIns from "@/components/button/button-icon-ins";
import ButtonBuyNow from '@/components/button/button-buy-now';
export default {
  name: "Home7DownloadV2",
  components: {
    ButtonIconIns,
    ButtonBuyNow
  },
  data() {
    return {
      animateBegin: false,
      pageIOS: false,
      isshow: true
    };
  },
  mounted() {
    window.addEventListener("scroll", this.handle);
    this.pageIOS = this.$nuxt.$route.path === "/event-ios";
  },
  destroyed() {
    window.removeEventListener("scroll", this.handle);
  },
  methods: {
    handleScroll: function () {
      this.animateBegin =
        this.$refs.mark.getBoundingClientRect().top < window.innerHeight * 0.66;
    },
    handle() {
      const fun = this.handleScroll();
      this.COMMON.throttle(fun, 60, 100);
    },
    downloadAppGate() {
      if (this.COMMON.isMobile())
        this.downloadApp();
      else {
        this.$ga.event('inslogin', 'login', `hploginnew2`);
        this.$nuxt.$router.push('/login');
      }
    },
    downloadApp() {
      if (this.COMMON.isiOS()) {
        if (this.$nuxt.$route.path === '/event-ios') {
          this.$ga.event('insdl', 'download', 'hpiosdlm2-ad');
          window.location.href = this.$constant.app.download.ios1;
        } else {
          this.$ga.event('insdl', 'download', `hp${this.$store.state.platform}dlnew2`);

          this.$store.commit('enIosLinkCt', this.$store.state.adQueryCampaignHome);
          window.location.href
            = `${this.$store.state.enIosLink}`
            + `?pt=${this.$store.state.enIosLinkPt}`
            + `&ct=${this.$store.state.enIosLinkCt}`
            + `&mt=8`;
        }
      } else {
        this.$ga.event('insdl', 'download', `hp${this.$store.state.platform}dlnew2`);
        window.location.href
          = this.$constant.app.download.androidGooglePlay1
          + this.$constant.app.campaign.androidReferrerQuery
          + this.$store.state.enAdrLinkGpReferrer;
      }
    },
    ga01() {
      this.$ga.event('insbuy', 'buy', `hp${this.$store.state.platform}buynew2`);
      this.$nuxt.$router.push({
        path: '/buy-instagram-followers'
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@include animateSteps(4);
a[href] {
  color: #005FFF;
}
.home-12-download-btn {
  width: 1920px;
  height: 339px;
  background: url('./img/bg.svg') no-repeat;
  background-size: cover;
  padding: 0;
  padding-top: 44px;
  position: relative;
  overflow: hidden;
  .right-img {
    position: absolute;
    width: 1920px;
    height: 100%;
    top: 0;
    left: 0;
    margin: 0 auto;
    img {
      display: block;
      margin-top: 20px;
      margin-right: 150px;
      float: right;
    }
  }
  &.on {
    i {
      opacity: 1 !important;
      transform: scale(1) !important;
    }
  }
  i {
      display: block;
      position: absolute;
      transform: scale(0);
      opacity: 0 !important;
      transition: all 1.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
    i:nth-of-type(1) {
      width: 43px;
      height: 43px;
      background: url('./img/icon1.svg') no-repeat;
      top: 23px;
      left: 86px;
    }
    i:nth-of-type(2) {
      width: 48px;
      height: 48px;
      background: url('./img/icon2.svg') no-repeat;
      top: 20px;
      left: 192px;
    }
    i:nth-of-type(3) {
      width: 63px;
      height: 63px;
      background: url('./img/icon3.svg') no-repeat;
      bottom: 64px;
      left: 155px;
    }
    i:nth-of-type(4) {
      width: 121px;
      height: 109px;
      background: url('./img/icon4.svg') no-repeat;
      bottom: 158px;
      left: 235px;
    }
    i:nth-of-type(5) {
      width: 45px;
      height: 45px;
      background: url('./img/icon5.svg') no-repeat;
      bottom: 38px;
      left: 321px;
    }
    i:nth-of-type(6) {
      width: 60px;
      height: 60px;
      background: url('./img/icon6.svg') no-repeat;
      bottom: 54px;
      left: 514px;
    }
  .wrapper {
    h2 {
      text-align: center;
      font: normal normal 600 40px/59px BalooChettan;
      color: #000000;
      margin-bottom: 10px;
    }
    p {
      text-align: center;
      font: normal normal 600 16px/20px BalooChettan;
      color: #7F8498;
      margin-bottom: 47px;
      a {
        color: #FFF78A;
      }
    }
    .btns {
      display: flex;
      justify-content: center;
      >div:first-child {
        margin-right: 22px;
        button {
          width: 277px;
          height: 60px;
        }
      }
      >div:last-child {
        button {
          width: 277px;
          height: 60px;
        }
      }
    }
  }
}
@media (max-width: 768px) {
  .home-12-download-btn {
    width: 100%;
    height: 523px;
    background: url('./img/bg-m.svg') no-repeat;
    background-size: cover;
    padding: 0 16px;
    padding-top: 69px;
    box-sizing: border-box;
    i {
      display: none;
    }
    .wrapper {
      h2 {
        text-align: center;
        font: normal normal 600 32px/40px BalooChettan;
        color: #000000;
        margin-bottom: 25px;
      }
      > p {
        text-align: center;
        font: normal normal 500 16px/24px BalooChettan;
        margin-bottom: 26px;
      }
      .btns {
        flex-direction: column;
        align-items: center;
        >div:first-child {
          margin-right: 0;
          margin-bottom: 17px;
        }
      }
    }
  }
  }
</style>

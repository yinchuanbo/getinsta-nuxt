<template>
  <div
    ref="mark"
    :class="{ on: animateBegin }"
    class="home-9-download-btn home__sec"
  >
    <div class="wrapper">
      <h2 class="step-0">Download Instagram Followers App to Get Free IG Followers</h2>
      <p class="step-1">Download GetInsta now and you can get more <a>free Instagram followers instantly</a> that are real and will engage with you!</p>
      <div class="btns step-2">
         <div class="" @click="downloadAppGate">
          <button-icon-ins class="button-hover-1" theme="gradiant" text="Get Free Followers" square shadow :icon="'ins'" font-size="size-15" />
        </div>
        <!--btn BuyNow-->
        <div class="" @click="ga01">
          <button-buy-now square :text="$t('home.home-1.btn.BuyNow1')" :white="true" font-size="size-16" />
        </div>
      </div>
    </div>
    <div class="right-img pc step-4">
      <img src="./img/right.svg" alt="">
    </div>
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
  props: {
    downloadurl: {
      type: Object,
      default: function() {
        return {}
      }
    },
    gainfo: {
      type: Object,
      default: function() {
        return {}
      }
    }
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
        this.$ga.event(this.gainfo['pc'][0], this.gainfo['pc'][1], this.gainfo['pc'][2]);
        this.$nuxt.$router.push('/login');
      }
    },
    downloadApp() {
      if (this.COMMON.isiOS()) { // ios
        this.$ga.event(this.gainfo['ios'][0], this.gainfo['ios'][1], this.gainfo['ios'][2]);
        location.href = this.$storage.get('iosDownloadLink');
      } else { // android
        this.$ga.event(this.gainfo['android'][0], this.gainfo['android'][1], this.gainfo['android'][2]);
        location.href = this.$storage.get('adrDownloadLink');
      }
    },
    ga01() {
      if (this.COMMON.isMobile()) { // mobile
        if (this.COMMON.isiOS()) { // ios
          this.$ga.event(this.gainfo['buyga']['ios'][0], this.gainfo['buyga']['ios'][1], this.gainfo['buyga']['ios'][2])
        } else { // android
          this.$ga.event(this.gainfo['buyga']['android'][0], this.gainfo['buyga']['android'][1], this.gainfo['buyga']['android'][2])
        }
      } else { // pc
         this.$ga.event(this.gainfo['buyga']['pc'][0], this.gainfo['buyga']['pc'][1], this.gainfo['buyga']['pc'][2])
      }
      this.$nuxt.$router.push({
        path: '/buy-instagram-followers'
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@include animateSteps(4);
.home-9-download-btn {
  width: 100%;
  height: 319px;
  background: url('./img/bg.png') no-repeat;
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
  .wrapper {
    position: relative;
    z-index: 3;
    h2 {
      text-align: center;
      font: normal normal 600 40px/59px BalooChettan;
      color: #FFFFFF;
      margin-bottom: 10px;
    }
    p {
      text-align: center;
      font: normal normal 600 16px/20px BalooChettan;
      color: #FFFFFF;
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
          background: transparent linear-gradient(90deg, #20D2A8 0%, #05C3E1 100%) 0% 0% no-repeat padding-box;
          box-shadow: 0px 12px 24px #00000030;
          border-radius: 8px;
        }
      }
      >div:last-child {
        button {
          outline: none;
          width: 277px;
          height: 60px;
          box-shadow: 0px 12px 24px #5000323D;
          border-radius: 8px;
          &:hover {
            border-color: #FF9C39;
          }
          span {
             border: 0;
          }
        }
      }
    }
  }
}
@media (max-width: 768px) {
  .home-9-download-btn {
    width: 100%;
    height: 437px;
    background: url('./img/bg-m.png') no-repeat;
    background-size: cover;
    padding: 0 16px;
    padding-top: 58px;
    box-sizing: border-box;
    .wrapper {
      h2 {
        text-align: center;
        font: normal normal 500 24px/30px BalooChettan;
        color: #FFFFFF;
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
  @media screen and (-webkit-min-device-pixel-ratio: 2),screen and (min--moz-device-pixel-ratio: 2) {
    .home-9-download-btn {
       background: url('./img/bg-m@2x.png') no-repeat;
       background-size: cover;
      }
    }
  }
</style>

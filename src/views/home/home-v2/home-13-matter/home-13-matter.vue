<template>
  <div
    ref="mark"
    :class="{ on: animateBegin }"
    class="home-13-matter home__sec"
  >
    <div class="wrapper" :style="{ height: height}">
      <span v-if="isshow" class="load-more mobile" @click="showMore">
        <img src="./img/more.svg" alt="" width="29" height="40">
      </span>
      <h2 class="step-0">Free Instagram Likes Still Matter A Lot</h2>
      <p class="step-1">As one of the two main statistics that Instagram values, the significance of Instagram likes is barely overemphasized. It directly demonstrates the popularity of your posts and promotes your content to be more viewed. The more Instagram likes you have, the more chance you take to be favored by the group. Considering they are also free, are there any safer bet in the world?</p>
      <div class="container">
        <div>
          <h3 class="step-2">Is It Necessary to Get Free Instagram Likes?</h3>
          <p class="step-3">Yes Indeed. Instagram algorithm regularly recommends hot posts to get more views under Instagram hashtag pages. The most decisive factor to satisfy the algorithm is how many likes your post has. Free Instagram likes help you boost the chance of having more viewers without paying money. There is no better solution to attract organic audiences than that.</p>
        </div>
        <div>
          <h3 class="step-4">How to Get More Free Instagram Likes?</h3>
          <p class="step-5">Typically, optimizing your posts - for instance, by creating attractive Instagram captions or using unique Instagram fonts - is never outdated. A good Instagram caption helps to fulfill your post, making it emotional and touching. Also, don't forget to use an Instagram fonts tool to give your audience a sense of freshness. Both methods achieve your Instagram likes' organic growth without paying money yet may take lots of time and effort.</p>
        </div>
        <div>
          <h3 class="step-6">Most Efficient Way to Get Free Instagram Likes</h3>
          <p class="step-7">GetInsta is a 100% free Instagram likes increaser, will help you get 1000+ likes and followers within 5 minutes without one penny. Use GetInsta now to get free Instagram likes effortless.</p>
        </div>
        <div class="btns step-8">
         <div class="" @click="downloadAppGate">
          <button-icon-ins class="button-hover-1" theme="gradiant" text="Get Free Followers" square shadow :icon="'ins'" font-size="size-15" />
        </div>
        <!--btn BuyNow-->
        <div class="" @click="ga01">
          <button-buy-now square :text="$t('home.home-1.btn.BuyNow1')" font-size="size-16" />
        </div>
      </div>
      </div>
    </div>
    <span class="ammo-move-d1s pc"></span>
    <span class="ammo-move-d1s pc"></span>
    <span class="ammo-move pc"></span>
    <span class="ammo-move-d1s pc"></span>
    <span class="ammo-move-d1s pc"></span>
    <span class="ammo-move pc"></span>
    <span class="ammo-move-d1s pc"></span>
    <span class="ammo-move-d1s pc"></span>
    <span class="ammo-move mobile"></span>
    <span class="ammo-move mobile"></span>
  </div>
</template>

<script>
export default {
  name: "Home8Reasons",
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
      isshow: true,
      height: ''
    };
  },
  mounted() {
    window.addEventListener("scroll", this.handle);
    this.getHeight();
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
        this.$nuxt.$router.push(this.downloadurl.pcdownloadurl);
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
    showMore() {
      this.isshow = false;
      this.height = 'auto'
    },
    getHeight() {
      let height = '';
      if(!this.COMMON.isMobile()) { // pc
        height = '';
      } else {
        height = '600px';
      }
      this.height = height;
    }
  },
};
</script>

<style lang="scss" scoped>
@include animateSteps(9);
a[href] {
  color: #005FFF;
}
.home-13-matter {
  padding-bottom: 0;
  position: relative;
  overflow: hidden;
  >span {
    display: inline-block;
    position: absolute;
  }
  >span:nth-of-type(1) {
    width: 68px;
    height: 68px;
    background: url('./img/500.svg') no-repeat;
    background-size: cover;
    left: 270px;
    bottom: 212px;
  }
  >span:nth-of-type(2) {
    width: 14px;
    height: 14px;
    background: url('./img/circle-small.svg') no-repeat;
    background-size: cover;
    left: 152px;
    bottom: 221px;
  }
  >span:nth-of-type(3) {
    width: 79px;
    height: 79px;
    background-color: #FF5DAE;
    left: 180px;
    bottom: 81px;
    border-radius: 100%;
    filter: blur(12px);
  }
  >span:nth-of-type(4) {
    width: 54px;
    height: 54px;
    background: url('./img/circle-user.svg') no-repeat;
    background-size: cover;
    left: 105px;
    bottom: 40px;
  }
  >span:nth-of-type(5) {
    width: 22px;
    height: 22px;
    background: url('./img/circle-red.svg') no-repeat;
    background-size: cover;
    right: 280px;
    bottom: 271px;
  }
  >span:nth-of-type(6) {
    width: 123px;
    height: 123px;
    background-color: #4AF1BE;
    right: 150px;
    bottom: 120px;
    border-radius: 100%;
    filter: blur(12px);
  }
  >span:nth-of-type(7) {
    width: 55px;
    height: 55px;
    background: url('./img/circle-people.svg') no-repeat;
    background-size: cover;
    right: 65px;
    bottom: 180px;
  }
  >span:nth-of-type(8) {
    width: 55px;
    height: 55px;
    background: url('./img/circle-xin.svg') no-repeat;
    background-size: cover;
    right: 280px;
    bottom: 44px;
  }
  .wrapper {
    position: relative;
    overflow: hidden;
    >span {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 118px;
      background: transparent linear-gradient(180deg, #FFFFFFD4 0%, #FFFFFF 100%) 0% 0% no-repeat padding-box;
      z-index: 4;
      img {
        display: block;
        margin: 0 auto;
        margin-top: 19px;
        cursor: pointer;
        animation: move 3s linear infinite;
        animation-direction: alternate;
      }
      @keyframes move {
        0% {             
           transform: translate(0px, 0px);            
        }            
        50% {                
           transform: translate(0px, -20px);            
        }            
        100% {                
           transform: translate(0px, 0px);
        }
      }
    }
    > h2 {
      text-align: center;
      font: normal normal 600 40px/50px BalooChettan;
      color: #000000;
      margin-bottom: 30px;
    }
    >p {
      text-align: left;
      font: normal normal 500 16px/23px BalooChettan;
      color: #7F8498;
      margin-bottom: 30px;
    }
    .container {
      width: 1200px;
      height: 458px;
      background: #F7F9FA;
      border-radius: 11px;
      padding: 34px 40px 0 40px;
      box-sizing: border-box;
      position: relative;
      z-index: 3;
      >div:not(:nth-child(4)) {
        h3 {
          font: normal normal 600 20px/30px BalooChettan;
          color: #000000;
          margin-bottom: 9px;
        }
        p {
          font: normal normal 500 14px/20px BalooChettan;
          color: #7F8498;
        }
        margin-bottom: 20px;
      }
      > div:nth-child(3) {
        margin-bottom: 40px;
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
}

@media (max-width: 768px) {
  .home-13-matter {
    width: 100%;
    padding: 0 24px;
    padding-top: 80px;
    box-sizing: border-box;
    position: relative;
    overflow: hidden;
    padding-bottom: 50px;
    > span {
      display: inline-block;
      position: absolute;
    }
    >span:nth-of-type(9) {
      width: 79px;
      height: 79px;
      background-color: #FF5DAE;
      left: -30px;
      bottom: 50px;
      border-radius: 100%;
      filter: blur(12px);
    }

    >span:nth-of-type(10) {
      width: 123px;
      height: 123px;
      background-color: #4AF1BE;
      right: -60px;
      bottom: 80px;
      border-radius: 100%;
      filter: blur(12px);
    }

    .wrapper {
      >h2 {
        text-align: left;
        font: normal normal 600 32px/40px BalooChettan;
        margin-bottom: 16px;
      }
      >p {
        font: normal normal medium 14px/20px Baloo Chettan 2;
        color: #7F8498;
      }
      .container {
        width: 100%;
        height: auto;
        padding: 16px 24px;
        padding-bottom: 60px;
        box-sizing: border-box;
        >div {
          h3 {
            text-align: left;
            font: normal normal 600 20px/30px BalooChettan;
          }
          p {
            font: normal normal 500 14px/20px BalooChettan 2;
          }
        }
        .btns {
          flex-direction: column;
          >div:first-child {
            margin-bottom: 22px;
          }
        }
      }
    }
  }
}
</style>

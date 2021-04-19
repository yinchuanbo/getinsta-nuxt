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
          <h2 class="step-2">Is It Necessary to Get Free Instagram Likes?</h2>
          <p>Yes Indeed. Instagram algorithm regularly recommends hot posts to get more viewed under Instagram hashtag pages. The most decisive factor to satisfy the algorithm is how many likes your post has. Free Instagram likes help you boost the chance of having more viewers without paying money. There is no better solution to attract organic audiences than that.</p>
        </div>
        <div>
          <h2>How to Get More Free Instagram Likes?</h2>
          <p>Typically, optimizing your posts - for instance, by creating attractive Instagram captions or using unique Instagram fonts - is never outdated. A good Instagram caption helps to fulfill your post, making it emotional and touching. Also, don't forget to use an Instagram fonts tool to give your audience a sense of freshness. Both methods achieve your Instagram likes' organic growth without paying money yet may take lots of time and effort.</p>
        </div>
        <div>
          <h2>Most Efficient Way to Get Free Instagram Likes</h2>
          <p>GetInsta is a 100% free Instagram likes increaser, will help you get 1000+ likes and followers within 5 minutes without one penny. Use GetInsta now to get free Instagram likes effortless.</p>
        </div>
        <div class="btns">
         <div class="" @click="downloadAppGate">
          <button-icon-ins class="button-hover-1" theme="gradiant" text="Get Free Followers Now" square shadow :icon="'ins'" font-size="size-15" />
        </div>
        <!--btn BuyNow-->
        <div class="" @click="ga01">
          <button-buy-now square :text="$t('home.home-1.btn.BuyNow')" font-size="size-16" />
        </div>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home8Reasons",
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
@include animateSteps(12);
a[href] {
  color: #005FFF;
}
.home-13-matter {
  padding-bottom: 0;
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
      >div:not(:nth-child(4)) {
        h2 {
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
          h2 {
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

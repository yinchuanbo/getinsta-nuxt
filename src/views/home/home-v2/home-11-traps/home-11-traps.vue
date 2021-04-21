<template>
  <div
    ref="mark"
    :class="{ on: animateBegin }"
    class="home-11-traps home__sec"
  >
    <div class="wrapper" :style="{ height: height}">
      <span v-if="isshow" class="load-more" @click="showMore">
        <img src="./img/more.svg" alt="" width="29" height="40">
      </span>
      <h2 class="step-0"><span class="pc">5 Traps You Should Avoid </span> <a class="mobile">5 Traps You Should Avoid </a> When Getting Free Instagram Followers</h2>
      <p class="step-1">The reasons of getting free Instagram have been listed in the first part. It does have many benefits after getting free followers on Instagram. But those sites claiming to offer free IG followers may send you fake followers or give you followers with hidden charge. So when getting free Instagram followers, you should avoid the 5 traps to make sure that you get Instagram followers that are free, real and active with simple steps.</p>
      <div class="step-2">
        <h3><span>Trap 1</span> Get Free Followers That Are Bots</h3>
        <p>Instagram has been encouraging and advocating its users to share content creative and authentic, and makes it clear that your account may be blocked if a certain number of your followers are detected as bots or fake followers. Believe that you don’t want to put your Instagram account into risk especially after spending time and energy to keep it. So keep away from free Instagram followers that are bots.</p>
      </div>
      <div class="step-3">
        <h3><span>Trap 2</span> Get Free Instagram Followers at the Cost of Giving Personal Info</h3>
        <p>In the digital age, keeping your personal info secure online is important. Some Instagram followers servers require you to fill in a survey before sending free followers. You know, the survey may include questions about your name, job, interests and other info. If your info is not encrypted with powerful technology, your personal info may be leaked. A terrible thing! So you should keep in mind that getting free Instagram followers from servers that require no survey.</p>
      </div>

      <div class="step-4">
        <h3><span>Trap 3</span> Get Free Instagram Followers Who Never Engage with You</h3>
        <p>When you input “buy free Instagram followers” into Google search, you will see hundreds of ads promoting their service. Unfortunately, some followers they provide will never engage with you. Using bot Instagram followers creator can set up a bunch of bot followers within minutes. Once you order their service, you are stepping into the trap. These bots will pour into your account while leaving no trace, or specifically, the engagement. All you have is a pale followers’ number since bots followers contribute to nothing. That's why you should <a href="/blog/bot-followers-on-instagram-47">avoid bot followers on Instagram.</a></p>
      </div>
      <div class="step-5">
        <h3><span>Trap 4</span> Get Free Instagram Followers That Unfollow in the Future</h3>
        <p>Hear a notification ring, pull your mobile out from your pocket, open Instagram and see a real and active user has followed you. There would be nothing more heart-stirring than that. Also, to find out he or she slips away somehow takes longer than that, so does the confusion and depression that remains to you. Take it easy since it’s not your fault. You just got into an invisible trap and those free Instagram followers break the promise.</p>
      </div>
      <div class="step-6">
        <h3><span>Trap 5</span> Get “Free” Instagram Followers That Charge Somehow</h3>
        <p>Claiming to be free but not free. It’s not a paradox. Many Instagram followers retailers promote “Medusa” ads only for luring your eyes. You follow their leads and steps further until the final step to get “free” Instagram followers asks cash from your pocket, and there is no way back but to continue the order since your credit card has been bound with them. Be careful: sometimes, a blind move wastes you countless time and effort. So you should try your best to get 100% <a href="/blog/best-app-to-get-free-real-instagram-followers-5">real Instagram followers</a>.</p>
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
  // computed: {
  //   height() {
  //      let height = '';
  //      if(!this.$store.state.isMobile) { // pc
  //       height = '600px';
  //      } else {
  //       height = '790px';
  //      }
  //      return height;
  //   }
  // },
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
    showMore() {
      this.isshow = false;
      this.height = 'auto'
    },
    getHeight() {
      let height = '';
      if (!this.COMMON.isMobile()){ // pc
        height = '450px';
      } else {
        height = '720px';
      }
      this.height = height;
    }
  },
};
</script>

<style lang="scss" scoped>
@include animateSteps(7);
a[href] {
  color: #005FFF;
}
.home-11-traps {
  padding-top: 0;
  .wrapper {
    overflow: hidden;
    position: relative;
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
    h2 {
      text-align: center;
      font: normal normal 600 40px/50px BalooChettan;
      padding: 0 224px;
      box-sizing: border-box;
      margin-bottom: 30px;
      span {
        font: normal normal 600 40px/50px BalooChettan;
      }
      a {
        color: #BB5DB3;
      }
    }
    > p {
      font: normal normal 500 16px/23px BalooChettan;
      color: #7F8498;
      margin-bottom: 30px;
    }
    > div {
      margin-bottom: 20px;
      h3 {
         margin-bottom: 10px;
         font: normal normal 600 20px/30px BalooChettan;
         color: #000000;
         span {
           font: normal normal 600 20px/30px BalooChettan;
           color: #BB5DB3;
         }
      }
      p {
         font: normal normal 500 14px/20px BalooChettan;
         color: #7F8498;
      }
    }
  }
}
@media (max-width: 768px) {
  .home-11-traps {
    padding: 70px 24px;
    box-sizing: border-box;
    .wrapper {
      > p {
        text-align: left;
        font: normal normal 600 14px/20px BalooChettan;
        color: #7F8498;
      }
      h2 {
        padding: 0;
        font: normal normal 600 32px/40px BalooChettan;
        color: #000000;
        text-align: left;
        margin-bottom: 20px;
        a {
          font: normal normal 600 20px/40px BalooChettan;
          color: #BB5DB3;
          display: block;
          text-align: left;
        }
      }
      > div {
        h3 {
          font: normal normal 600 20px/30px BalooChettan;
          color: #000000;
          >span {
            display: block;
            font: normal normal 600 20px/30px BalooChettan;
            color: #BB5DB3;
          }
        }
        p {
          font: normal normal 500 14px/20px BalooChettan;
          color: #7F8498;
        }
      }
    }
  }
}
</style>

<template>
  <div
    ref="mark"
    :class="{ on: animateBegin }"
    class="home-10-qualities-have home__sec"
  >
    <div class="wrapper" :style="{ height: height}">
      <span v-if="isshow" class="load-more" @click="showMore">
        <img src="./img/more.svg" alt="" width="29" height="40">
      </span>
      <h2 class="step-0">6 Qualities That Free Instagram Followers Should Have</h2>
      <p class="step-1">When you wisely use free Instagram followers tools to grow your followers, it doesn’t mean you should compromise the quality of the followers you get. It would be best if you increase your followers count and guarantee quality at the same time. Only in this way can you take your account into long-term growth. Here are 6 qualities that you should focus on when you increase free Instagram followers.</p>
      <ul>
        <li class="step-2">
          <img src="./img/icon01.svg" alt="">
          <h3>Real & Engaged</h3>
          <p>The essential quality of free Instagram followers is reality. That means the free followers should have authentic accounts. If you get bot-created followers to add to your account, it will lower your account's quality and expose your account negatively which risks your account being suspended or banned by Instagram. So, it’s good to avoid fake followers at all cost. Thankfully, GetInsta can help you grow actual human followers. No bot users are allowed in the community. When you request free Instagram followers from it, your profile will immediately be shown to authentic users with similar interests. So, the followers you get are real people with real accounts. They are interested and engaged by liking and commenting on your posts which increases the engagement bar and helps you <a href="/blog/go-viral-on-instagram-560">go viral on Instagram</a>.</p>
        </li>
        <li class="step-3">
          <img src="./img/icon02.svg" alt="">
          <h3>Unlimited</h3>
          <p>It’s hard to keep growing followers on Instagram when you already have enough count. So, you can take advantage of the Instagram followers tools to help you out of this difficulty. Although some tools offer free Instagram followers, they are limited per day. Or some services bring free trial and you can get some free Instagram followers with them. But if you want to claim more free followers, you will be asked to update to premium members. That’s bad news when you try to maximize the growing number of your followers. While there is good news, GetInsta offers unlimited Instagram followers. There is no drama on it. Users in the community use coins to get free Instagram followers. You can get countless <a href="/blog/instagram-followers-app-with-coins-532">Instagram followers with unlimited coins</a> easily.</p>
        </li>
        <li class="step-4">
          <img src="./img/icon03.svg" alt="">
          <h3>Targeted</h3>
          <p>If you want to build your personal or business brand on Instagram, growing untargeted and fake followers to your account will add no value to your brand building. That’s because the random or bot followers can’t really like your feed or spend their money on your product. Worse yet, your back-followers will be disappointed in you when they find you are increasing these followers. They will unfollow you and run away. So, <a href="/blog/targeted-instagram-followers-136">growing targeted followers</a> is essential in your brand-building strategy. When you own plenty of targeted followers who are potentially interested in your niche, you can have more chances to get their favors to your profile. Even better, they can help you boost sales when you post new product-related feeds on your page.</p>
        </li>
        <li class="step-5">
          <img src="./img/icon04.svg" alt="">
          <h3>Nutritious</h3>
          <p>Before growing free Instagram followers, you should figure out whether the followers you get are nutritious for your account. Some Instagram followers apps can make your follower count keep rising consistently. It might seem your account is getting boosted, but that’s totally unhealthy. That’s because they add low-quality followers to your account, bring backlash to your account's growth. Then you will be left behind by other competitors with high-quality followers. So, you should add values to your account by <a href="/blog/build-instagram-followers-190">building real and active followers naturally</a> in the long run. When you have a considerable number of these high-quality followers, your account can be popular. You will have higher chances to be featured on Instagram Explore Page to reach organic traffic. Then your Instagram will grow like a snowball.</p>
        </li>
        <li class="step-6">
          <img src="./img/icon05.svg" alt="">
          <h3>No-Drop</h3>
          <p>Whether you are using Instagram followers tools or other smart strategies to get new followers, your followers will disappear inevitably. If you use some tools to grow followers, they may add bots or ghost followers to your account. Instagram is regularly scanning and cleaning up these bot or fake accounts. If you develop real followers, you can’t avoid them unfollowing you either. That’s because they are not unfeeling machines. They may withdraw their followings for some unknown reasons. <br>
          Fortunately, you can choose a service that reduces and limits such situations happening. GetInsta will never disappoint you. It offers real and free Instagram followers who will never be identified as bots and be deleted by Instagram. If they change their ideas and unfollow you, it will refill within a few days. So, you don’t have to worry about your followers getting decreased when choosing it to improve your account.</p>
        </li>
        <li class="step-7">
          <img src="./img/icon06.svg" alt="">
          <h3>Legit</h3>
          <p>If you increase free Instagram followers with unproven external IG apps, the chances are high that they may send bots followers to your account quickly. These followers are definitely illegal and unsafe. Instagram may detect your follower count surging only in a short time which will raise an alarm and suspicion. Then you will have the risk of being banned or punished for a spam maker. So, if you grow your followers legally, then it will be an entirely different story. When you increase authentic and active followers reasonably and organically, you will get real human interaction and engagement in your activities on Instagram. In this way, your account can be grown legally and safely without violating the Instagram Terms of Service.</p>
        </li>
      </ul>
    </div>
    <!-- download -->
    <div class="download-block pc">
      <div class="download-block_left">
        <div class="download-block_left-center step-8">
        </div>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
      </div>
      <div class="download-block_right">
        <h2 class="step-9">Download Instagram Followers App to Get Free IG Followers</h2>
        <p class="step-10">Download the safe app GetInsta now to get high-quality Instagram followers free. No drop is guaranteed.</p>
        <div class="btns step-11">
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
    <div class="download-block mobile">
      <div class="download-block_wrapper step-8">
        <div class="download-block_left"></div>
        <div class="download-block_right">
          <h2>Download App to Get Free IG Followers</h2>
          <p>Download GetInsta to get high-quality Instagram followers.</p>
        </div>
      </div>
      <div class="btns">
         <div class="step-9" @click="downloadAppGate">
          <button-icon-ins class="button-hover-1" theme="gradiant" text="Get Free Followers" square shadow :icon="'ins'" font-size="size-15" />
        </div>
        <!--btn BuyNow-->
        <div class="step-10" @click="ga01">
          <button-buy-now square :text="$t('home.home-1.btn.BuyNow1')" font-size="size-16" />
        </div>
      </div>
    </div>

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
    showMore() {
      this.isshow = false;
      this.height = 'auto'
    },
    getHeight() {
      let height = '';
      if(!this.COMMON.isMobile()) { // pc
        height = '460px';
      } else {
        height = '1070px';
      }
      this.height = height;
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
  },
};
</script>

<style lang="scss" scoped>
@include animateSteps(12);
a[href] {
  color: #005FFF;
}
.home-10-qualities-have {
  .wrapper {
    overflow: hidden;
    position: relative;
    span {
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
      margin-bottom: 30px;
      a {
        color: #BB5DB3;
      }
    }
    > p {
      text-align: center;
      font: normal normal 500 16px/23px BalooChettan;
      color: #7F8498;
      margin-bottom: 60px;
    }
    ul {
      width: 100%;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      padding: 0 40px;
      box-sizing: border-box;
      li {
        width: 510px;
        min-height: 390px;
        border-top: 1px solid #F1F4F6;
        padding-top: 24px;
        box-sizing: border-box;
        img {
          display: block;
          margin-bottom: 16px;
          width: 61px;
          height: 61px;
        }
        h3 {
          text-align: left;
          font: normal normal 600 20px/30px BalooChettan;
          color: #000000;
        }
        p {
          text-align: left;
          font: normal normal 500 14px/20px BalooChettan;
          color: #7F8498;
        }
      }

    }
  }

  &.on {
    .download-block {
      .download-block_left {
        i {
          opacity: 1 !important;
          transform: scale(1) !important;
        }
      }
    }
  }

  .download-block {
    width: 1200px;
    height: 363px;
    background: linear-gradient(90deg, #FEDDE7 0%, #DADEFE 100%) 0% 0% no-repeat;
    // box-shadow: 0px 12px 24px #AB20773D;
    border-radius: 8px;
    // opacity: 0.2;
    margin: 0 auto;
    margin-top: 105px;
    display: flex;
    justify-content: center;
    padding-top: 40px;
    box-sizing: border-box;
    .download-block_left {
      width: 300px;
      height: 280px;
      margin-right: 112px;
      background: url('./img/download-img_bottom.svg') no-repeat;
      background-size: cover;
      background-position: center center;
      position: relative;
      .download-block_left-center {
        width: 160px;
        height: 189px;
        background: url('./img/download-img_center.svg') no-repeat;
        background-size: cover;
        position: relative;
        left: 45px;
        top: 23px;
      }
      i {
        position: absolute;
        display: block;
        transform: scale(0);
        opacity: 0!important;
        transition: all 1.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) 2s;
      }
      i:nth-of-type(1) {
        width: 91px;
        height: 77px;
        background: url('./img/zan.svg') no-repeat;
        background-size: cover;
        left: -20px;
        bottom: 106px;
      }
      i:nth-of-type(2) {
        width: 44px;
        height: 45px;
        background: url('./img/xin.svg') no-repeat;
        background-size: cover;
        left:39px;
        bottom: 214px;
      }
      i:nth-of-type(3) {
        width: 39px;
        height: 39px;
        background: url('./img/biaoqing.svg') no-repeat;
        background-size: cover;
        right: 74px;
        top: -25px;
      }
      i:nth-of-type(4) {
        width: 91px;
        height: 77px;
        background: url('./img/yonghu.svg') no-repeat;
        background-size: cover;
        right: 25px;
        top: 9px;
      }
      i:nth-of-type(5) {
        width: 91px;
        height: 77px;
        background: url('./img/xiao.svg') no-repeat;
        background-size: cover;
        right: 12px;
        bottom: 54px;
      }
    }
    .download-block_right {
      width: 635px;
      height: 280px;
      h2 {
        text-align: left;
        font: normal normal 600 40px/50px BalooChettan;
        color: #000000;
        margin-bottom: 10px;
      }
      >p {
        text-align: left;
        font: normal normal 600 16px/20px BalooChettan;
        color: #7F8498;
        margin-bottom: 37px;
      }
      .btns {
      display: flex;
      justify-content: flex-start;
      >div:first-child {
        margin-right: 22px;
        button {
          width: 277px;
          height: 60px;
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
}
@media (max-width: 768px) {
  .home-10-qualities-have {
    padding: 65px 24px 0 24px;
    box-sizing: border-box;
    .wrapper {
      > p {
        text-align: left;
        font: normal normal 600 14px/20px BalooChettan;
        color: #7F8498;
        margin-bottom: 50px;
      }
      h2 {
        padding: 0;
        font: normal normal 600 32px/40px BalooChettan;
        color: #000000;
        text-align: left;
        margin-bottom: 20px;
        a {
          font: normal normal 600 24px/40px BalooChettan;
          color: #BB5DB3;
          display: block;
          text-align: left;
        }
      }
      ul {
        padding: 0;
        li {
          border: 0;
          padding-top: 29px;
        }
      }

    }
    .download-block {
      width: calc(100% + 48px);
      position: relative;
      top: 0;
      left: -24px;
      display: flex;
      flex-direction: column;
      padding-top: 10px;
      justify-content: flex-start;
      .download-block_wrapper {
        display: flex;
        align-items: flex-start;
        margin-bottom: 25px;
        .download-block_left {
          margin-right: 0;
          width: 148px;
          height: 144px;
          background: url('./img/pic.svg') no-repeat;
          background-size: contain;
          background-position: center center;
          background-clip: content-box;
        }
        .download-block_right {
          flex: 1;
          width: auto;
          height: auto;
          padding-top: 30px;
          h2 {
            text-align: left;
            font: normal normal 600 20px/24px BalooChettan;
            color: #000000;
          }
          p {
            text-align: left;
            font: normal normal 500 14px/20px BalooChettan;
            color: #7F8498;
            margin-bottom: 0;
          }
        }
      }
      .btns {
        flex-direction: column;
        align-items: center;
        >div:first-child {
          margin-bottom: 16px;
          text-align: center;
          button {
            width: 277px;
            height: 60px;
          }
        }
        >div:last-child {
          text-align: center;
          button {
            width: 277px;
            height: 60px;
          }
        }
      }
    }
  }
}
</style>

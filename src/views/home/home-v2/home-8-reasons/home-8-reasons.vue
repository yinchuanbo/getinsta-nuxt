<template>
  <div
    ref="mark"
    :class="{ on: animateBegin }"
    class="home-8-reasons home__sec"
  >
    <div class="wrapper" :style="{ height: height}">
      <span v-if="isshow" class="load-more" @click="showMore">
        <img src="./img/more.svg" alt="" width="29" height="40">
      </span>
      <h2 class="step-0"><a>10 Overwhelming Reasons</a> You Should Get Free Instagram Followers</h2>
      <p class="step-1">‘Free Instagram followers’ is not a plain phrase on this page but means millions of real Instagram users on this planet. Making money, gaining fame, brand promotion, etc. on Instagram all requires you to have a basic followers community. Getting free Instagram followers seems to be a good idea if you need to create a community like that. GetInsta is ready and prepared to provide you free Instagram followers at any time you want. 10 recognized reasons that you cannot turn down about getting free followers are also listed below. You will understand why free Instagram followers are important by checking all the reasons below:</p>
      <div class="step-2">
        <h3>1. Make Money without Costing Money</h3>
        <p>Instagram followers could help you make money if you are running a shop, promoting a brand, etc. on Instagram. More people you can reach means more customers you can get. This is also what Instagram trying to do to help creators or shopkeepers on its platform. And free Instagram followers could help you making money without costing any money. This is also GetInsta’s original intention to help everyone who wants to succeed on IG.</p>
      </div>
      <div class="step-3">
        <h3>2. Promote Brand Awareness</h3>
        <p>Getting Instagram followers is one of the best ways to promote your brand because people would repost or share your great content automatically and reach a large number of people that you cannot imagine. This is the way of the internet and social media. You should make use of them and benefit from them. And Instagram free followers here are real and active users. Your brand, channel, or content could be shared, commented and recognized to a large extent.</p>
      </div>
      <div  class="step-4">
        <h3>3. Become Famous and Win Popularity</h3>
        <p>Dreaming about getting famous and becoming an online celebrity? Free Instagram followers on this page could do you a favor. Of course, you will not gain popularity at the moment you receive these high-quality followers. What you need to do is to make them become your loyal followers and let them repost or spread your content automatically. Once you stick to generate outstanding posts or products and with the help of Instagram free followers, success would be within your reach.</p>
      </div>
      <div  class="step-5">
        <h3>4. Reach People Around the World</h3>
        <p>GetInsta is a global platform that gathers Instagram users all over the world. You are no longer to be limited to get followers around your town or city by using it. Instagram followers of the whole planet are your potential followers and waiting for you to hack. Moreover, GetInsta would release <a href="/blog/how-to-get-local-instagram-followers-923">local Instagram followers</a> services for you to choose followers from specific regions or countries soon. Please look forward to it.</p>
      </div>
      <div  class="step-6">
        <h3>5. Increase Engagement with Multiple Followers</h3>
        <p>Increase engagement with your followers helps you build bonds with them and also increase the chance of they sharing your content or account with friends. This is an excellent way of spreading your account and reaching people in a large amount. Free Instagram followers of GetInsta would give you the chance to interact with them. They are active and would like to comment on your content. You can just simply show your appreciation and let them know you care about their comments. So, these followers would keep following you and check your content more frequently.</p>
      </div>
      <div  class="step-7">
        <h3>6. Free You from Getting Followers</h3>
        <p>If you already have an enormous followers community, followers’ increase would be easy and free for you. But if you are still accumulating followers and try to reach that kind of state. GetInsta could give you a hand and free you from getting followers as well as save your precious time. <a href="/blog/get-1k-instagram-followers-in-5-minutes-232">Getting 1K free Instagram followers in 5 minutes</a> has been verified by many users of it. You can totally focus on your content creation and leave the job of getting followers to GetInsta. Speed, quality, and free services are the 3 reasons why so many users chose this amazing tool and you can become one of them too.</p>
      </div>
      <div  class="step-8">
        <h3>7. Get on Instagram Explore Page</h3>
        <p>Instagram Explore page is where Instagram curates content made up of videos and photos that caters to your specific interests. The content is divided into categories to help you find what they want to see. Many of you check out Explore page every day to find relevant and valuable things. To get on the Instagram Explore page, <a href="/blog/free-instagram-followers-6">getting Instagram followers</a> is the first step. Then you could inspire them to take action to like, comment on, and share your posts, and drive engagement, therefore.</p>
      </div>
      <div  class="step-9">
        <h3>8. Be Competitive on the Market</h3>
        <p>Things keep changing. Offline sales are not the primary channel people choose to buy products. People find commercial opportunities: promoting and selling products on social platforms. Instagram has been one of the popular platforms for individual businesses and companies with continuously updated features like Instagram ads and shoutouts. The more followers you have, the more trustable and reliable you are in the eyes of others. And they’re more likely to follow you and become your followers, and even loyal followers who prefer to pay for the products you promote than other sellers. Then you’ll become more competitive on the market than ever and expand your market share on Instagram.</p>
      </div>
      <div  class="step-10">
        <h3>9. Rank Top on Your Follower’ Feed</h3>
        <p>On Instagram, all posts from accounts you follow will appear on your Feed in reverse chronological order. But now the order of posts on Instagram Feed changes. The order is mainly determined by 3 factors according to the Instagram Help Center that is closely connected to the followers count your account has. If you have more than <a href="/blog/instagram-followers-10k-9">10k Instagram followers</a>, your posts will be liked and shared by about 1 thousand people on a conservative estimate. If so, your posts will rank top on your followers’ Feed with Instagram technology and reach more people.</p>
      </div>
      <div  class="step-11">
        <h3>10. Greater Chance to Cooperate with Other Influencers</h3>
        <p>Cooperation is common for a win-win result on Instagram. Story takeovers and product shoutouts are the most used ways that are easy and effective if you understand your audience and choose a right partner. Before that, you need to show your advantages to convince others to cooperate with you and let them believe that they’ll get benefits as well. Think that if you send collaboration messages from an account with less than 1k followers to an influencer, they will not accept your invitation to a large extent. But if you have 50k followers, things will be different.</p>
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
      if(!this.COMMON.isMobile()) { // pc
        height = '600px';
      } else {
        height = '790px';
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
.home-8-reasons {
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
      padding: 0 224px;
      box-sizing: border-box;
      margin-bottom: 30px;
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
      }
      p {
         font: normal normal 500 14px/20px BalooChettan;
         color: #7F8498;
      }
    }
  }
}
@media (max-width: 768px) {
  .home-8-reasons {
    padding: 65px 24px 0 24px;
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
          font: normal normal 600 24px/40px BalooChettan;
          color: #BB5DB3;
          display: block;
          text-align: left;
        }
      }
      > div {
        h3 {
          font: normal normal 600 18px/30px BalooChettan;
          color: #000000;
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

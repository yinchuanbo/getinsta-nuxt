<template>
  <div class="instagram-follower-counter">
    <div class="header-blank pc"></div>
    <div class="counter-banner">
      <div class="counter-wrapper" id="counter-wrapper">
        <h2>Live Instagram Follower Counter</h2>
        <p>
          Real-time, accurate, exact Instagram follower count. No Instagram
          account log in.
        </p>
        <div
          class="counter-banner_inputs pc"
          :class="{ errorActive: isBoxRed }"
        >
          <label>
            <input
              v-model="searchInsInput"
              @input="bottomBtnDetective"
              type="text"
              placeholder="Type Instagram Username"
              :disabled="searchInsLoading"
              @keyup.enter="searchUsername"
              @blur="inputBlur"
              @focus="inputFocus"
            />
          </label>
          <div class="search_btn" @click="searchUsername">
            <button-yellow-icon
              text="Check Now"
              :font-size="'size-16'"
              :sharp="true"
              :loading="searchInsLoading"
            />
          </div>
        </div>
        <div class="counter-banner_inputs mobile">
          <label :class="{ errorActive: isBoxRed }">
            <input
              v-model="searchInsInput"
              @input="bottomBtnDetective"
              type="text"
              placeholder="Type Instagram Username"
              :disabled="searchInsLoading"
              @keyup.enter="searchUsername"
              @blur="inputBlur"
              @focus="inputFocus"
            />
          </label>
          <div class="search_btn" @click="searchUsername">
            <button-yellow-icon
              text="Check Now"
              :font-size="'size-16'"
              :sharp="true"
              :loading="searchInsLoading"
            />
          </div>
        </div>
        <div class="counter-download">
          <a @click="downloadAll">Download</a> GetInsta to increase your
          Instagram follower count
        </div>
      </div>
      <div class="counter-wave">
        <div class="waveWrapper waveAnimation">
          <!-- <div class="waveWrapperInner bgTop">
                        <div class="wave waveTop"></div>
                    </div> -->
          <div class="waveWrapperInner bgMiddle">
            <div class="wave waveMiddle"></div>
          </div>
          <div class="waveWrapperInner bgBottom">
            <div class="wave waveBottom"></div>
          </div>
        </div>
      </div>
    </div>
    <transition name="fade">
      <div v-if="insUser.ins_id" class="search_result" id="result">
        <h2>Instagram Follower Count</h2>
        <div class="avator">
          <img :src="insUser.profile_pic_url || ''" alt="" />
        </div>
        <p class="name">{{ insUser.ins_account }}</p>
        <p class="title">Real-time Followers</p>
        <p class="num">{{ insUser.followed_by.toString().replace(/\B(?=(\d{3})+$)/g,',') }}</p>
        <span>Updated {{ currentTime }}</span>
        <div class="info">
          <p>
            <span>{{ $t("global.instagramConcept.following") }}</span>
            <span>{{ insUser.follow | numberAbbreviations }}</span>
          </p>
          <p>
            <span>{{ $t("global.instagramConcept.posts") }}</span>
            <span>{{ insUser.post.post_count | numberAbbreviations }}</span>
          </p>
        </div>
        <hr />
        <h3>
          Increase followers now and say goodbye to Instagram follower count
          stuck
        </h3>
        <div class="btn-group">
          <div @click="gaBtnFreeGetItNow">
            <button-icon-ins
              text="Get Followers Now"
              bubble-float
              square
              shadow
              :icon="'ins'"
              font-size="size-16"
              theme="cyan"
              class="button-hover-1"
            />
          </div>
          <div @click="buynow">
            <button>Buy Now</button>
          </div>
        </div>
      </div>
    </transition>
    <div class="counter-container">
      <h2>Introducing You to the Instagram Follower Counter</h2>
      <p>
        Learn how Instagram follower counter could help you upgrage your
        Instagram management and efficiency by checking content below.
      </p>
      <div class="counter-container-item1">
        <div class="counter-container-item1_text">
          <h3>What is Instagram follower counter?</h3>
          <p>
            Instagram Follower Counter is tool to help you check the accurate
            and real-time follower count of any Instagram account wihtout login
            or using Instagram. It is online and free to use. GetInsta Instagram
            Followers Counter could be your first choice when considering
            checking follower count conveniently.
          </p>
        </div>
        <div
          class="counter-container-item1_img"
          ref="item1"
          :class="{ on: item1Val }"
        >
          <img class="pc" src="./img/pic01.svg" alt="" />
          <img class="mobile" src="./img/pic01-m.svg" alt="" />
        </div>
      </div>
      <div class="counter-container-item2">
        <h3>Real-time Instagram follower count</h3>
        <p>
          Instagram Follower Counter provides you real-time, accurate and exact
          follower count. It is real-time because the statistics are acquired
          from Instagram at the monent you tap the 'Check Now' button. Then this
          follower counter would acquire the data from Instagram immediately and
          present it to you.
          <a href="/blog/real-time-instagram-followers-323"
            >Real-time instagram followers</a
          >
          are within your reach.
        </p>
        <div
          class="clock-around"
          ref="clockAround"
          :class="{ on: clockAroundVal }"
        >
          <img src="./img/clock-around.svg" alt="" />
          <div>
            <img src="./img/arrow-around.svg" alt="" />
          </div>
        </div>
        <!-- <span>Updated 3:13:05 PM 12.31.2020</span> -->
      </div>
      <div class="counter-container-item3" ref="item3">
        <h3>Accurate and exact Instagram follower count</h3>
        <p>
          It is accurate and exact because the follower count would be displayed
          in the format of complete numbers rather than abbreviation. For
          instance, 148m followers of National Geographic on Instagram would be
          148,458,486* on this page. It is correct because the number was
          directled obtained from Instagram.
        </p>
        <!-- <span
          >+ <i ref="aroundNum">{{ value }}</i></span
        > -->
        <div class="myroll">
          + 
          <div id="num-roll1"></div>
          ,
          <div id="num-roll2"></div>
          ,
          <div id="num-roll3"></div>
        </div>
      </div>
      <div class="counter-container-item4">
        <h3>Why you need this Instagram follower counter?</h3>
        <p>
          Since Instagram being one of the biggest social platform on this
          planet, this tool provides you updated Instagram follower count with
          detailed numbers, which could help you detect even the most salient
          change of follower count and take actions to avoid losing followers.
          It is online and has a clear user interface to offer you the most
          convenient and direct information.
        </p>
        <div class="counter-container-item4_img">
          <div
            class="counter-people"
            ref="counterPeople"
            :class="{ on: counterPeopleVal }"
          >
            <img src="./img/people.svg" alt="" />
          </div>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div class="counter-container-item5">
        <h3>Tips for Instagram followers growth</h3>
        <p>
          Besides focusing on real-time Instagram follower count, there are some
          other ways to promote your IG account.
        </p>
        <div>
          <p>
            <span></span>
            Use all the features of Instagram
          </p>
          <span
            >Your content should not be limited to photos or videos. Instagram
            Reels, Live, IG TV, etc. are hot among people of today, remember to
            try all of them.</span
          >
        </div>
        <div>
          <p>
            <span></span>
            Try Instagram creator studio
          </p>
          <span
            >This tool could help be more prfessional when talking about running
            Instagram account. Managing your account on desktop is practical by
            using this platform, why not trying it?</span
          >
        </div>
        <div>
          <p>
            <span></span>
            Get Your posts in Explore
          </p>
          <span
            >This will help your content gain more organic reach and impression
            of your profile. Local followers would see your posts more eaisy and
            make them become your followers would increase your account's
            authenticity.</span
          >
        </div>
      </div>
      <div class="counter-container-item6">
        <h3>No more Instagram follower count stuck by using GetInsta</h3>
        <p>
          nstagram Follower Counter enables you to check real-time and accutate
          number of any IG account's followers. Any changes of follower count
          could be detected and help you make adjustments. No more Instagram
          follower count stuck or frozen would happen after using this tool.
          Moreover, this process could be simplified by
          <a href="/">GetInsta</a>. This Instagram followers app help you get
          free IG followers and refresh your follower count.
        </p>

        <div class="item6-img" ref="item6" :class="{ on: item6Val }">
          <img src="./img/nomore-icon2.svg" alt="" />
          <div class="item6-img_top"></div>
          <div class="item6-img_bottom"></div>
        </div>
      </div>
    </div>
    <div class="counter-signup" ref="signup" :class="{ on: isSignup }">
      <div class="counter-signup_leftimg pc">
        <i></i>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
      </div>
      <div class="counter-signup_leftimg mobile">
        <i></i>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
      </div>
      <div class="counter-signup_content">
        <h2>How to Solve Instagram Follower Count Stuck?</h2>
        <div class="counter-signup_content-box">
          <h3>
            GetInsta
            <span> - You Free Instagram Followers Solution</span>
          </h3>
          <ul>
            <li>100% Free Instagram Followers</li>
            <li>Real Instagram Followers</li>
            <li>High-Quality Instagram Likes</li>
            <li>Safe and Private</li>
          </ul>
        </div>
        <div class="btns pc" @click="signup">
          <button>Sign Up Now</button>
        </div>
        <div @click="gaBtnFreeGetItNow1" class="mobile gaBtnFreeGetItNow">
          <button-icon-ins
            text="Get Followers Now"
            bubble-float
            square
            shadow
            :icon="'ins'"
            font-size="size-16"
            theme="cyan"
            class="button-hover-1"
          />
        </div>
      </div>
    </div>
    <div class="counter-why">
      <h2>Why GetInsta is Trustworthy?</h2>
      <div class="counter-why-item_group">
        <div class="counter-why-item">
          <div class="counter-why-item_top">
            <img class="pc" src="./img/why01.svg" alt="" width="107" height="114" />
            <img class="mobile" src="./img/why01-m.svg" alt="" />
          </div>
          <h2>100% Free</h2>
          <p>
            100% Free Instagram followers and likes are available in GetInsta.
            You can earn the virtual coins in the app for unlimited free
            followers and likes. Thousands of free coins would be given to you
            when you open the app.
          </p>
        </div>
        <div class="counter-why-item">
          <div class="counter-why-item_top">
            <img src="./img/why02.svg" alt="" />
          </div>
          <h2>Real Instagram Followers</h2>
          <p>
            GetInsta can solve Instagram followers count stuck. It provides you
            with real and high-quality followers who are real and active
            Instagram users from all over the world. You can make them become
            your followers easily by using GetInsta.
          </p>
        </div>
        <div class="counter-why-item">
          <div class="counter-why-item_top">
            <img src="./img/why03.svg" alt="" />
          </div>
          <h2>High-Quality Instagram Likes</h2>
          <p>
            GetInsta also provides you with high-quality Instargam likes from
            real Instargam users around the world. Getting Instagram likes for
            free is 100% practical in GetInsta. Try this great app and it will
            not let you down.
          </p>
        </div>
        <div class="counter-why-item">
          <div class="counter-why-item_top">
            <img src="./img/why04.svg" alt="" />
          </div>
          <h2>Safe and Private</h2>
          <p>
            User's privacy is always the first priority of GetInsta. No leak and
            virus will not appear during the whole process of using this app,
            and your personal data would be protected strictly . Just add
            Instagram usernames and start to hack Instagram followers and likes.
          </p>
        </div>
      </div>
      <div class="button-group">
        <div @click="gaBtnFreeGetItNow2">
          <button-icon-ins
            text="Get Followers Now"
            bubble-float
            square
            shadow
            :icon="'ins'"
            font-size="size-16"
            theme="cyan"
            class="button-hover-1"
          />
        </div>
        <div @click="buynow1">
          <button>Buy Now</button>
        </div>
      </div>
    </div>
    <div class="counter-tips">
      <h2>More Instagram Tips</h2>
      <div class="counter-tips-item_group">
        <div class="counter-tips-item" @click="skip1">
          <span></span>
          <p>How to Get Free Instagram Followers & Likes</p>
        </div>
        <div class="counter-tips-item"  @click="skip2">
          <span></span>
          <p>How to Hack Instagram Followers</p>
        </div>
        <div class="counter-tips-item"  @click="skip3">
          <span></span>
          <p>Get Free Instagram Followers Instantly</p>
        </div>
        <div class="counter-tips-item"  @click="skip4">
          <span></span>
          <p>6 Best Apps to Get Instagram Likes and Followers</p>
        </div>
        <div class="counter-tips-item"  @click="skip5">
          <span></span>
          <p>Best Instagram Auto Liker App</p>
        </div>
        <div class="counter-tips-item"  @click="skip6">
          <span></span>
          <p>How to Get 1K Followers on Instagram in 5 Minutes 2021</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import apiAccount from "@/api/api.account";
import apiIns from "@/api/api.ins";
import apiInsServer from "@/api/api.ins.server";
import apiPayment from "@/api/api.payment";
import apiTask from "@/api/api.task";

// import ButtonPurple from '@/components/button/button-purple';
import ButtonYellowIcon from "@/components/button/button-yellow-icon";
import ButtonIconIns from "@/components/button/button-icon-ins";
// import ListEmpty from '@/components/list/list-empty';
import DigitRoll from '@/assets/scripts/digitRoll.js';
export default {
  name: "StoreShelf1BuyFollowers",
  components: {
    // ListEmpty,
    ButtonYellowIcon,
    ButtonIconIns,
    // ButtonPurple
  },
  filters: {
    numToFixed(num) {
      if (typeof num === "number") return num.toFixed(2);
      else return parseFloat(num).toFixed(2);
    },
    numberAbbreviations(num) {
      let numFormatted = 0;

      if (Math.pow(10, 12) <= num && num < Math.pow(10, 15)) {
        numFormatted = (num / Math.pow(10, 12)).toFixed(1) + "T";
        return numFormatted;
      }
      if (Math.pow(10, 9) <= num && num < Math.pow(10, 12)) {
        numFormatted = (num / Math.pow(10, 9)).toFixed(1) + "B";
        return numFormatted;
      }
      if (Math.pow(10, 6) <= num && num < Math.pow(10, 9)) {
        numFormatted = (num / Math.pow(10, 6)).toFixed(1) + "M";
        return numFormatted;
      }
      if (Math.pow(10, 3) <= num && num < Math.pow(10, 6)) {
        numFormatted = (num / Math.pow(10, 3)).toFixed(1) + "K";
        return numFormatted;
      }
      if (num < Math.pow(10, 3)) {
        numFormatted = num;
        return numFormatted;
      }
    },
  },
  props: {
    independent: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  data() {
    return {
      // 圣诞
      santaClausHide: false,

      enterFirstTime: true,
      payMethodDisplay: 2,
      isBoxRed: false,
      // 本字段控制页面显示何种支付方式的产品
      // 1 = 金币购买
      // 2 = 现金购买

      emittedData: {
        meta: {
          title: this.$t("store.meta.title-0"),
        },
        route: {
          path: "",
        },
      },

      animateBegin: false,
      value: 148458486,
      time: 5,
      funOnce: true,
      isFocus: false,
      currentTime: "",
      isSignup: false,
      item1Val: false,
      item3Val: false,
      counterPeopleVal: false,

      ajaxRequesting: false,
      bottomBtnOn: false,
      item6Val: false,
      clockAroundVal: false,

      dialogFail: false,
      dialogFailMsg: "",
      dialogAttention: false,
      dialogAttentionMsg: "",

      tabsIndex: false,
      searchStatus: false,

      searchInsLoading: false,
      searchInsInput: "",
      insUser: {},
      postList: [],
      postListIndex: -1,
      postCurrent: {},
      postListTitle: false,
      postListInfo: {
        post_count: 0,
        end_cursor: "",
        has_next_page: false,
        page_size: 12,
      },
      postListLoading: false,

      productPkgListLoading: false,
      productPkgList: [],
      productPkgListFollowIndex: -1,
      productPkgCurrentFollow: {},
      productPkgListFollowTitle: false,
      productPkgListLikeIndex: -1,
      productPkgCurrentLike: {},
      productPkgListLikeTitle: false,
      pkgListWithUnit: [],
      productPkgListDaily: [],
      productPkgListDailyVM: [],
      productPkgListDays: [],
      productPkgListDaysVM: [],
      roll1: null,
      roll2: null,
      roll3: null
    };
  },
  computed: {
    productPkgListDisplay: function () {
      const payMethodDisplay = this.payMethodDisplay;
      return this.productPkgList.filter(function (productPkg) {
        // promote_sale_type 展示种类
        return (
          productPkg["payment_type"] === payMethodDisplay &&
          (productPkg["promote_sale_type"] === undefined ||
            productPkg["promote_sale_type"] === 0 ||
            productPkg["promote_sale_type"] === 1 ||
            productPkg["promote_sale_type"] === 3) &&
          productPkg["cycle_type"] === 1
        );
      });
    },
    productPkgListLike: function () {
      return this.productPkgListDisplay.filter(function (productPkg) {
        return productPkg["product_type"] === 1;
      });
    },
    productPkgListFollow: function () {
      return this.productPkgListDisplay.filter(function (productPkg) {
        return productPkg["product_type"] === 2;
      });
    },
  },
  watch: {
    // productPkgListDailyVM(val) {
    //   let productPkgListDaysDuplicated = [];
    //   this.pkgListWithUnit.map(item => {
    //     if (item.dailyQuantity === val.dailyQuantity)
    //       productPkgListDaysDuplicated.push(item.cycle_type);
    //   });
    //
    //   this.productPkgListDays = [...new Set(productPkgListDaysDuplicated)];
    //   this.productPkgListDaysVM = this.productPkgListDays[0];
    // }
    productPkgListDaysVM(val) {
      this.productPkgListDaily = this.pkgListWithUnit.filter(
        (item) => item.cycle_type === val
      );
      // console.log("followers-daily-----",this.productPkgListDaily)
      this.productPkgListDailyVM = this.productPkgListDaily[0];
    },
    item3Val(newVal, oldVal) {
      console.log(newVal, oldVal)
      if (newVal !== oldVal && newVal == true && oldVal == false) {
        console.log('333');
        // setTimeout(this.rollrun(), 400);
        this.rollrun()
      } else {
        this.rollrun1()
      }
    },
  },
  created() {
    this.initTabIndex();
    this.keyupSubmit();
  },
  mounted() {
    this.getPkgList();
    window.addEventListener("scroll", this.handle);
    this.roll1 = new DigitRoll({
      container: '#num-roll1',
      width: 1
    });
    this.roll2 = new DigitRoll({
      container: '#num-roll2',
      width: 1
    });
    this.roll3 = new DigitRoll({
      container: '#num-roll3',
      width: 1
    });
  },
  destroyed() {
    window.removeEventListener("scroll", this.handle);
    // this.destroyedRoll();
  },
  methods: {
    emitToParent() {
      this.$emit("emitToParent", this.emittedData);
    },
    closeDialog() {
      this.dialogFail = false;
      this.dialogAttention = false;
    },
    inputBlur() {
      this.isBoxRed = false;
      this.isFocus = false;
    },
    rollrun() {
      this.roll1.roll(148);
      this.roll2.roll(458);
      this.roll3.roll(486);
    },
    rollrun1() {
      this.roll1.roll(0);
      this.roll2.roll(0);
      this.roll3.roll(0);
    },
    destroyedRoll() {
      this.roll1.roll(148);
      this.roll2.roll(458);
      this.roll3.roll(486);
    },
    skip1() {
      this.$nuxt.$router.push("/blog/free-followers-on-instagram-no-human-verification-27");
    },
    skip2() {
      this.$nuxt.$router.push("/blog/hack-instagram-followers-131");
    },
    skip3() {
      this.$nuxt.$router.push("/blog/instagram-followers-instantly-free-10");
    },
    skip4() {
      this.$nuxt.$router.push("/blog/best-app-to-get-instagram-likes-18");
    },
    skip5() {
      this.$nuxt.$router.push("/blog/best-instagram-auto-liker-app-200");
    },
    skip6() {
      this.$nuxt.$router.push("/blog/get-1k-instagram-followers-in-5-minutes-232");
    },
    buynow() {
      this.$nuxt.$router.push("/buy-instagram-followers");
      this.$ga.event("insbuy", "buy", "buy-counter1");
    },
    buynow1() {
      this.$nuxt.$router.push("/buy-instagram-followers");
      this.$ga.event("insbuy", "buy", "buy-counter2");
    },
    gaBtnFreeGetItNow() {
      if (this.$store.state.isMobile) {
        // mobile
        if (this.$store.state.isiOS) {
          // ios
          this.downloadIOS("iosdl-counter2");
        } else if (this.$store.state.isAndroid) {
          // android
          this.downloadAndroid("adrdl-counter2");
        }
      } else {
        // pc
        this.$nuxt.$router.push("/register");
      }
    },
    gaBtnFreeGetItNow1() {
      if (this.$store.state.isMobile) {
        // mobile
        if (this.$store.state.isiOS) {
          // ios
          this.downloadIOS("iosdl-counter3");
        } else if (this.$store.state.isAndroid) {
          // android
          this.downloadAndroid("adrdl-counter3");
        }
      } else {
        // pc
        this.$nuxt.$router.push("/register");
      }
    },
    gaBtnFreeGetItNow2() {
      if (this.$store.state.isMobile) {
        // mobile
        if (this.$store.state.isiOS) {
          // ios
          this.downloadIOS("iosdl-counter4");
        } else if (this.$store.state.isAndroid) {
          // android
          this.downloadAndroid("adrdl-counter4");
        }
      } else {
        // pc
        this.$nuxt.$router.push("/register");
      }
    },
    inputFocus() {
      this.isFocus = true;
    },
    downloadAll() {
      if (this.$store.state.isMobile) {
        // mobile
        if (this.$store.state.isiOS) {
          // ios
          this.downloadIOS("iosdl-counter1");
        } else if (this.$store.state.isAndroid) {
          // android
          this.downloadAndroid("adrdl-counter1");
        }
      } else {
        // pc
        this.$ga.event("insrg", "register", "register-counter1");
        this.$nuxt.$router.push("/register");
      }
    },
    signup() {
      this.$ga.event("insrg", "register", "register-counter2");
      this.$nuxt.$router.push("/register");
    },
    downloadIOS(param) {
      this.$ga.event("insdl", "download", param);
      location.href = `https://apps.apple.com/app/apple-store/id1498558125?pt=121014724&ct=en-seo-a-counter&mt=8`;
    },
    downloadAndroid(param) {
      this.$ga.event("insdl", "download", param);
      window.location.href = `https://play.google.com/store/apps/details?id=com.formeup.getinsita&referrer=utm_source%3Den-seo-a-counter`;
    },
    initTabIndex() {
      const path = this.$nuxt.$route.path;
      if (path === "/buy-instagram-followers") {
        this.tabsIndex = false;
        this.emittedData.meta.title = this.$t("store.meta.title-0");
        this.emittedData.meta.description =
          this.$i18n.locale === "en"
            ? this.$t("store.meta.description-0")
            : this.$t("store.meta.description");
      } else if (path === "/buy-instagram-daily-followers") {
        this.tabsIndex = true;
        this.emittedData.meta.title = this.$t("store.meta.title-0");
        this.emittedData.meta.description =
          this.$i18n.locale === "en"
            ? this.$t("store.meta.description-0")
            : this.$t("store.meta.description");
      } else if (path === "/buy-instagram-likes") {
        this.tabsIndex = true;
        this.emittedData.meta.title = this.$t("store.meta.title-1");
        this.emittedData.meta.description =
          this.$i18n.locale === "en"
            ? this.$t("store.meta.description-1")
            : this.$t("store.meta.description");
      } else if (path === "/event-followers") {
        this.tabsIndex = false;
        this.emittedData.meta.title =
          "Get Unlimited Real Instagram Followers & Likes";
        this.emittedData.meta.description = this.$t("store.meta.description-0");
      } else if (path === "/event-likes") {
        this.tabsIndex = true;
        this.emittedData.meta.title =
          "Get Unlimited Real Instagram Followers & Likes";
        this.emittedData.meta.description = this.$t("store.meta.description-1");
      }

      this.$emit("emitToParent", this.emittedData);
    },
    keyupSubmit() {
      if (process.server) return;
      document.onkeydown = (e) => {
        let _key = window.event.keyCode;
        if (_key === 13 && this.isFocus) {
          this.searchUsername();
        }
      };
    },
    tabSwitch(i) {
      this.tabsIndex = i;
      let originalPath = this.$nuxt.$route.path;
      let destPath = "";

      if (i === false) {
        if (originalPath === "/event-likes") {
          destPath = "/event-followers";
          this.emittedData.meta.title =
            "Get Unlimited Real Instagram Followers & Likes";
          this.emittedData.meta.description = this.$t(
            "store.meta.description-0"
          );
        } else if (originalPath === "/event-followers") {
          destPath = "/event-followers";
          this.emittedData.meta.title =
            "Get Unlimited Real Instagram Followers & Likes";
          this.emittedData.meta.description = this.$t(
            "store.meta.description-1"
          );
        } else {
          destPath = "/buy-instagram-followers";
          this.emittedData.meta.title = this.$t("store.meta.title-0");
          this.emittedData.meta.description =
            this.$i18n.locale === "en"
              ? this.$t("store.meta.description-0")
              : this.$t("store.meta.description");
        }
      } else if (i === true) {
        if (originalPath === "/event-followers") {
          destPath = "/event-likes";
          this.emittedData.meta.title =
            "Get Unlimited Real Instagram Followers & Likes";
          this.emittedData.meta.description = this.$t(
            "store.meta.description-0"
          );
        } else if (originalPath === "/event-likes") {
          destPath = "/event-likes";
          this.emittedData.meta.title =
            "Get Unlimited Real Instagram Followers & Likes";
          this.emittedData.meta.description = this.$t(
            "store.meta.description-1"
          );
        } else {
          destPath = "/buy-instagram-daily-followers";
          // this.emittedData.meta.title = this.$t('store.meta.title-1');
          // this.emittedData.meta.description
          //   = this.$i18n.locale === 'en'
          //   ? this.$t('store.meta.description-1')
          //   : this.$t('store.meta.description');
          this.emittedData.meta.title = this.$t("store.meta.title-0");
          this.emittedData.meta.description =
            this.$i18n.locale === "en"
              ? this.$t("store.meta.description-0")
              : this.$t("store.meta.description");
        }
      }

      if (originalPath !== destPath) {
        this.emittedData.route.path = destPath;
        this.emitToParent();
      }

      this.bottomBtnDetective();
      // this.anchorBottomBtn();
    },

    pkgCheck(pkg, i) {
      if (pkg["product_type"] === 1) {
        this.productPkgListLikeIndex = i;
        this.productPkgCurrentLike = pkg;
      } else if (pkg["product_type"] === 2) {
        this.productPkgListFollowIndex = i;
        this.productPkgCurrentFollow = pkg;
      }
      // console.log('pkg', pkg);
      // console.log('i', i);
      this.productPkgListFollowTitle = false;
      this.productPkgListLikeTitle = false;
      this.postListTitle = false;

      if (!this.enterFirstTime && !this.independent) this.anchorBottomBtn();
    },
    pkgSelectedInit(pkgList) {
      let pkgLikeFirstNum = 0,
        pkgFollowFirstNum = 0;
      for (let unit of pkgList) {
        if (unit["product_type"] === 1) {
          // like
          pkgLikeFirstNum = unit["purchase_quantity"];
          this.productPkgCurrentLike = unit;
        }
        if (unit["product_type"] === 2) {
          // follow
          pkgFollowFirstNum = unit["gives"][0]["quantity"];
          this.productPkgCurrentFollow = unit;
        }
        if (pkgLikeFirstNum !== 0 && pkgFollowFirstNum !== 0) {
          break;
        }
      }
    },

    getPkgList() {
      if (this.productPkgListLoading) return;

      // let client = 'en';
      // if (this.$i18n.locale === 'fr') client = 'fr';
      // if (this.$i18n.locale === 'de') client = 'de';

      // client = 'fr';

      this.productPkgListLoading = true;

      // this.$nuxt.$axios.get(
      //   `${apiAccount.appConfig}?origin=web`
      this.$nuxt.$axios
        .post(
          `${apiAccount.appConfig}?origin=web`,
          this.COMMON.paramSign({
            client_lan: this.$i18n.locale,
            cycle_product_enable: true,
          })
        )
        .then((response) => {
          this.productPkgListLoading = false;

          if (response.data.product && response.data.product.list) {
            this.renderProductPkgList(response.data.product.list);

            //console.log(response.data.product.list);
          } else {
            this.$alert(
              "",
              "error",
              "Oops",
              "Requesting Offer List failed, please try later.",
              "",
              "Close"
            );
          }

          setTimeout(() => {
            this.enterFirstTime = false;
          }, 1000);
        })
        .catch((error) => {
          this.productPkgListLoading = false;
          this.dialogFailMsg =
            "<samp>" +
            "<b>Error Status:</b> " +
            error.status +
            "<br>" +
            "<b>Error Message:</b> " +
            error.statusText +
            "</samp>";
          this.dialogFail = true;
          console.error("Catch Error: getPkgList", error);
        });
    },
    renderProductPkgList(pkgList) {
      this.productPkgList = pkgList;
      this.$storage.set("productPkgList", pkgList);

      this.$nextTick(() => {
        setTimeout(() => {
          this.renderPkgListHighlight();
        }, 500);
      });

      this.renderPkgListWithUnit(pkgList);
    },
    renderPkgListHighlight() {
      let indexFollow = 0;
      for (
        indexFollow = 0;
        indexFollow < this.productPkgListFollow.length;
        indexFollow++
      ) {
        if (this.productPkgListFollow[indexFollow]["promote_sale_type"] === 3)
          break;
      }
      let indexLike = 0;
      for (
        indexLike = 0;
        indexLike < this.productPkgListLike.length;
        indexLike++
      ) {
        if (this.productPkgListLike[indexLike]["promote_sale_type"] === 3)
          break;
      }

      if (indexFollow < this.productPkgListFollow.length) {
        this.pkgCheck(this.productPkgListFollow[indexFollow], indexFollow);
      }
      if (indexLike < this.productPkgListLike.length) {
        this.pkgCheck(this.productPkgListLike[indexLike], indexLike);
      }

      // console.log('indexFollow:', indexFollow);
      // console.log('indexLike:', indexLike);
      // console.log('this.productPkgListFollow:', this.productPkgListFollow[indexFollow]);
    },
    // 生成周期循环offer独立数组
    renderPkgListWithUnit(pkgList) {
      pkgList.map((item) => {
        if (item["cycle_type"] > 1 && item.product_type === 2) {
          item.dailyQuantity = item["purchase_quantity"];
          this.pkgListWithUnit.push(item);
        }
      });
      // this.renderPkgListDaily();
      this.renderPkgListDays();
    },
    // 生成Daily Select数组（Offer选择）（未使用）
    renderPkgListDaily() {
      const res = new Map();
      this.productPkgListDaily = this.pkgListWithUnit.filter(
        (a) => !res.has(a.dailyQuantity) && res.set(a.dailyQuantity, 1)
      );
      this.productPkgListDailyVM = this.productPkgListDaily[0];
    },
    // 生成Days Select数组（周期选择）
    renderPkgListDays() {
      this.productPkgListDays = [
        ...new Set(this.pkgListWithUnit.map((item) => item.cycle_type)),
      ];
      this.productPkgListDaysVM = this.productPkgListDays[0];
    },

    searchUsername: function () {
      this.searchInsByServerV2();
    },
    searchInsByServerV2() {
      if (this.searchInsInput === "") {
        this.isBoxRed = true;
        return;
      }
      this.gaSearchBtn();
      this.isBoxRed = false;
      if (this.searchInsLoading) return;

      this.searchInsLoading = true;
      this.$nuxt.$axios
        .post(
          apiInsServer.getAccountByUsername,
          this.COMMON.paramSign({ ins_account: this.searchInsInput })
        )
        .then((response) => {
          this.searchInsLoading = false;
          this.searchStatus = true;

          if (response.data.status !== "ok") {
            this.$alert(
              "",
              "error",
              this.$t("global.modelBox.title.oops"),
              this.$t("store.buy.error.errorInsID.text"),
              "normal",
              this.$t("global.modelBox.btn.close")
            );
            return;
          }

          const _sharedDataUser = response.data.content["graphql"]["user"];
          const _sharedDataUserPosts =
            _sharedDataUser["edge_owner_to_timeline_media"];

          this.insUser.ins_id = _sharedDataUser.id;
          this.insUser.ins_account = _sharedDataUser.username;
          this.insUser.profile_pic_url = _sharedDataUser.profile_pic_url;
          this.insUser.followed_by =
            _sharedDataUser["edge_followed_by"]["count"];
          this.insUser.follow = _sharedDataUser["edge_follow"]["count"];
          this.insUser.post = this.insPostTransform(_sharedDataUserPosts);

          this.postList = this.insUser.post.post_list;
          this.postListInfo.post_count = this.insUser.post.post_count;
          this.postListInfo.end_cursor = this.insUser.post.end_cursor;
          this.postListInfo.has_next_page =
            this.insUser.post.post_count > this.postListInfo.page_size;
          // 设置当前时间
          this.getCurrentTime();

          this.$nextTick(() => {
            this.anchorBottomBtn();
          });
        })
        .catch((error) => {
          this.closeDialog();
          this.searchInsLoading = false;
          // this.$alert(
          //   '', 'error', 'Oops',
          //   'Request Instagram Data failed, please try again later.',
          //   'normal', 'Close'
          // );
          this.$alert(
            "",
            "error",
            this.$t("global.modelBox.title.oops"),
            this.$t("store.buy.error.errorRequest.text"),
            "normal",
            this.$t("global.modelBox.btn.close")
          );
          console.error("Catch Error: searchIns: ", error);
        });
    },
    getCurrentTime() {
      // Updated 3:13 PM 12/31/2020
      // this.currentTime
      let aData = new Date();
      let currentYear = aData.getFullYear();
      let currentMonth = aData.getMonth() + 1;
      let currentDate = aData.getDate();
      let currentHour = aData.getHours();
      let currentMin = aData.getMinutes();
      let str = currentHour > 12 ? "PM" : "AM";
      this.currentTime = ` ${currentHour}:${currentMin} ${str} ${currentDate}/${currentMonth}/${currentYear}`;
    },
    // 搜索ins后直接跳转checkout
    searchInsByServerV2AndAddToCart() {
      if (this.searchInsInput === "") {
        // this.dialogAttentionMsg = 'Please enter username.';
        // this.dialogAttention = true;

        this.$alert(
          "",
          "warn",
          this.$t("store.buy.error.noInsID.title"),
          this.$t("store.buy.error.noInsID.text"),
          "normal",
          this.$t("global.modelBox.btn.close")
        );
        return;
      }
      if (this.ajaxRequesting) return;
      if (this.searchInsLoading) return;

      this.ajaxRequesting = true;
      this.searchInsLoading = true;
      this.$nuxt.$axios
        .post(
          apiInsServer.getAccountByUsername,
          this.COMMON.paramSign({ ins_account: this.searchInsInput })
        )
        .then((response) => {
          this.ajaxRequesting = false;
          this.searchInsLoading = false;
          this.searchStatus = true;

          if (response.data.status !== "ok") {
            this.$alert(
              "",
              "error",
              this.$t("global.modelBox.title.oops"),
              this.$t("store.buy.error.errorInsID.text"),
              "normal",
              this.$t("global.modelBox.btn.close")
            );
            return;
          }

          const _sharedDataUser = response.data.content["graphql"]["user"];
          const _sharedDataUserPosts =
            _sharedDataUser["edge_owner_to_timeline_media"];

          this.insUser.ins_id = _sharedDataUser.id;
          this.insUser.ins_account = _sharedDataUser.username;
          this.insUser.profile_pic_url = _sharedDataUser.profile_pic_url;
          this.insUser.followed_by =
            _sharedDataUser["edge_followed_by"]["count"];
          this.insUser.follow = _sharedDataUser["edge_follow"]["count"];
          this.insUser.post = this.insPostTransform(_sharedDataUserPosts);

          this.postList = this.insUser.post.post_list;
          this.postListInfo.post_count = this.insUser.post.post_count;
          this.postListInfo.end_cursor = this.insUser.post.end_cursor;
          this.postListInfo.has_next_page =
            this.insUser.post.post_count > this.postListInfo.page_size;

          this.$nextTick(() => {
            this.anchorBottomBtn();
            this.addToCart();
          });
        })
        .catch((error) => {
          this.closeDialog();
          this.searchInsLoading = false;
          this.ajaxRequesting = false;
          // this.$alert(
          //   '', 'error', 'Oops',
          //   'Request Instagram Data failed, please try again later.',
          //   'normal', 'Close'
          // );
          this.$alert(
            "",
            "error",
            this.$t("global.modelBox.title.oops"),
            this.$t("store.buy.error.errorRequest.text"),
            "normal",
            this.$t("global.modelBox.btn.close")
          );
          console.error("Catch Error: searchIns: ", error);
        });
    },
    searchIns() {
      if (this.searchInsInput === "") {
        this.$alert(
          "",
          "warn",
          this.$t("store.buy.error.noInsID.title"),
          this.$t("store.buy.error.noInsID.text"),
          "normal",
          this.$t("global.modelBox.btn.close")
        );
        return;
      }
      if (this.searchInsLoading) return;

      this.searchInsLoading = true;
      this.$nuxt.$axios
        .get(`https://www.instagram.com/${this.searchInsInput}/`)
        .then((response) => {
          this.searchInsLoading = false;
          this.searchStatus = true;

          const responsePage = response.data;
          const _sharedDataStr = responsePage.match("window._sharedData = (.*);<\/script")[1];
          const _sharedData = JSON.parse(_sharedDataStr);
          const _sharedDataUser =
            _sharedData["entry_data"]["ProfilePage"][0]["graphql"]["user"];
          const _sharedDataUserPosts =
            _sharedDataUser["edge_owner_to_timeline_media"];
          // console.log(_sharedData);
          // console.log(_sharedDataUser);
          // console.log(this.dataStored.user.ins_account.accounts[this.dataStoredInsListIndex - 1]);
          // console.log(this.dataStored.user.ins_account.accounts);

          this.insUser.ins_id = _sharedDataUser.id;
          this.insUser.ins_account = _sharedDataUser.username;
          this.insUser.profile_pic_url = _sharedDataUser.profile_pic_url;
          this.insUser.followed_by =
            _sharedDataUser["edge_followed_by"]["count"];
          this.insUser.follow = _sharedDataUser["edge_follow"]["count"];
          this.insUser.post = this.insPostTransform(_sharedDataUserPosts);

          this.postList = this.insUser.post.post_list;
          this.postListInfo.post_count = this.insUser.post.post_count;
          this.postListInfo.end_cursor = this.insUser.post.end_cursor;
          this.postListInfo.has_next_page =
            this.insUser.post.post_count > this.postListInfo.page_size;

          this.$nextTick(() => {
            this.anchorBottomBtn();
          });
        })
        .catch((error) => {
          this.closeDialog();
          this.searchInsLoading = false;
          this.dialogFailMsg =
            "Failed to get your Instagram data, or there's no such an Instagram account. Please try again.";
          setTimeout(() => {
            this.dialogFail = true;
          }, 300);
          console.error("Catch Error: searchIns: ", error);
        });
    },
    searchInsByServer() {
      if (this.searchInsInput === "") {
        this.$alert(
          "",
          "warn",
          this.$t("store.buy.error.noInsID.title"),
          this.$t("store.buy.error.noInsID.text"),
          "normal",
          this.$t("global.modelBox.btn.close")
        );
        return;
      }
      if (!this.searchInsLoading) {
        this.searchInsLoading = true;
        this.$nuxt.$axios
          .post(
            apiAccount.getInsInfo,
            this.COMMON.paramSign({
              ins_account: this.searchInsInput,
            })
          )
          .then((response) => {
            this.searchInsLoading = false;
            if (response.data.status === "ok") {
              this.userStatus.search = true;
              this.insUser = response.data["ins_info"];
              this.postList = response.data["ins_info"].post["post_list"];

              this.postListInfo.post_count =
                response.data["ins_info"].post.post_count;
              this.postListInfo.end_cursor =
                response.data["ins_info"].post.end_cursor;
              this.postListInfo.has_next_page =
                response.data["ins_info"].post.post_count >
                this.postListInfo.page_size;
              setTimeout(() => {
                if (!this.independent)
                  this.$scrollTo("#search-result", { offset: -100 });
              }, 500);
            } else {
              this.dialogFailMsg = "Please enter valid username.";
              this.dialogFail = true;
            }
          })
          .catch((error) => {
            this.searchInsLoading = false;
            this.dialogFailMsg =
              "<samp>" +
              "<b>Error Status:</b> " +
              error.status +
              "<br>" +
              "<b>Error Message:</b> " +
              error.statusText +
              "</samp>";
            this.dialogFail = true;
            console.log("Catch Error: searchIns");
            console.log(error);
          });
      }
    },
    insPostTransform(_sharedDataUserPosts) {
      let post = {};
      post.post_count = _sharedDataUserPosts.count;
      post.end_cursor = _sharedDataUserPosts["page_info"]["end_cursor"];

      const insPostList = _sharedDataUserPosts["edges"];
      let postList = [];

      for (let i = 0; i < insPostList.length; i++) {
        let postObj = {};
        let insPostObj = insPostList[i]["node"];

        postObj.like_id = insPostObj.id;
        postObj.short_code = insPostObj["shortcode"];
        postObj.like_pic_url = insPostObj["thumbnail_src"];
        postObj.like_count = insPostObj["edge_liked_by"]["count"];

        postList.push(postObj);
      }

      post.post_list = postList;

      return post;
    },

    postListSwitch(unit, i) {
      this.postListIndex = i;
      this.postCurrent = unit;
      this.postListTitle = false;

      this.anchorBottomBtn();
    },
    postListNext() {
      let param = {
        id: this.insUser.ins_id,
        first: this.postListInfo.page_size,
        after: this.postListInfo.end_cursor,
      };
      this.postListNextRequestV2(param);
    },
    postListNextRequestV2(param) {
      if (!this.postListLoading) {
        this.postListLoading = true;

        const paramTrans = JSON.stringify(param);

        this.$nuxt.$axios
          .get(`${apiIns.insPostList}${paramTrans}`)
          .then((response) => {
            this.postListLoading = false;

            // console.log(response.data.data.user['edge_owner_to_timeline_media']['edges']);
            const insPostObj =
              response.data.data.user["edge_owner_to_timeline_media"];

            for (let i = 0; i < insPostObj["edges"].length; i++) {
              let insPostObjTransUnit = {};
              insPostObjTransUnit.like_id =
                insPostObj["edges"][i]["node"]["id"];
              insPostObjTransUnit.like_pic_url =
                insPostObj["edges"][i]["node"]["thumbnail_src"];
              insPostObjTransUnit.like_count =
                insPostObj["edges"][i]["node"]["edge_media_preview_like"][
                  "count"
                ];
              insPostObjTransUnit.short_code =
                insPostObj["edges"][i]["node"]["shortcode"];

              this.postList.push(insPostObjTransUnit);
            }

            this.renderPostListInfo(
              insPostObj.count,
              insPostObj["page_info"]["end_cursor"],
              insPostObj["page_info"]["has_next_page"]
            );
          })
          .catch((error) => {
            this.postListLoading = false;

            this.$alert(
              "",
              "error",
              this.$t("global.modelBox.title.oops"),
              this.$t("store.buy.error.errorRequest.text"),
              "normal",
              this.$t("global.modelBox.btn.close")
            );
            console.error("Catch Error: postListNextRequestV2: ", error);
          });
      }
    },
    postListUpdateV2(unit, i) {
      this.postList = unit.post["post_list"];
      this.renderPostListInfo(
        unit.post["post_count"],
        unit.post["end_cursor"],
        unit.post["post_count"] > this.postList.length
      );

      this.accountListSwitchCallback(unit, i);
    },
    renderPostListInfo(post_count, end_cursor, has_next_page) {
      let obj = {};
      obj.post_count = post_count;
      obj.end_cursor = end_cursor;
      obj.has_next_page = has_next_page;
      obj.page_size = this.postListInfo.page_size;

      this.postListInfo = obj;
    },

    // Bottom 按钮动作
    tabBottomBtnAction() {
      if (this.productPkgListLoading) return;

      // 关注
      if (!this.tabsIndex) {
        if (this.productPkgListFollowIndex === -1) {
          this.productPkgListFollowTitle = true;

          if (!this.independent)
            this.$scrollTo("#title-pkg-follow", { offset: -200 });
          return;
        }
      }

      // 点赞
      if (this.tabsIndex) {
        // if (this.productPkgListLikeIndex === -1) {
        //   this.productPkgListLikeTitle = true;
        //   if (!this.independent)
        //     this.$scrollTo('#title-pkg-like', { offset: -200 });
        //   return;
        // }
        // if (!this.postCurrent.like_id) {
        //   this.postListTitle = true;
        //   if (!this.independent)
        //     this.$scrollTo('#title-post-like', { offset: -100 });
        //   return;
        // }
      }

      // 流程调整
      if (!this.tabBottomBtnPreCheck()) {
        return;
      }

      // 金币/现金 支付
      // if (this.payMethodDisplay === 1) {
      //   this.publish();
      // } else if (this.payMethodDisplay === 2) {
      //
      // this.addToCart();
      // }

      // 流程调整前（先搜索ins续手动点击跳转checkout）
      this.addToCart();
      // 流程调整后（搜索ins后自动跳转checkout）
      // this.searchInsByServerV2AndAddToCart();
    },
    // 检查是否搜索过ins
    tabBottomBtnPreCheck() {
      if (!this.insUser.ins_account) {
        this.$alert(
          "",
          "warn",
          this.$t("store.buy.error.noInsID.title"),
          this.$t("store.buy.error.noInsID.text"),
          "normal",
          this.$t("global.modelBox.btn.close")
        )
          .then(() => {
            if (this.$i18n.locale !== "en") {
              let gaPage = "",
                gaPlatform = "";
              if (this.$nuxt.$route.path === "/") {
                //home
                gaPage = "hp";
              } else if (
                this.$nuxt.$route.path === "/buy-instagram-followers" ||
                this.$nuxt.$route.path === "/buy-instagram-likes"
              ) {
                //store
                gaPage = "store";
              }

              if (this.COMMON.isiOS()) gaPlatform = "ios";
              if (this.COMMON.isAndroid()) gaPlatform = "adr";

              this.$ga.event(
                "buttonclick",
                "click",
                `${gaPage}${gaPlatform}popclose-${this.$i18n.locale}`
              );
            }
          })
          .catch(() => {});
        if (!this.independent)
          this.$scrollTo("#control-search_ins-container", { offset: -44 });
        return false;
      } else {
        return true;
      }
    },
    bottomBtnDetective() {
      this.insUser = {};
      this.isBuyBtn = false;

      if (this.searchInsInput !== "") {
        this.isBoxRed = false;
      } else {
        this.isBoxRed = true;
      }
    },
    anchorBottomBtn() {
      
      // if (!this.COMMON.isMobile()) return;

      if (!this.COMMON.isMobile()) {
        this.$scrollTo('#result', { offset: -180 });
      } else {
        this.$scrollTo('#result', { offset: -100 });
      }

      // if (!this.tabsIndex) {
      //   if (this.productPkgListFollowIndex !== -1 && this.insUser.ins_id) {
      //   }
      //   if (this.productPkgListFollowIndex !== -1 && !this.insUser.ins_id) {
      //     setTimeout(() => {
      //       if (!this.independent)
      //         this.$scrollTo(`#control-search_ins-container`, { offset: -44 });
      //     }, 500);
      //   }
      // } else if (this.tabsIndex) {
      //   if (this.productPkgListLikeIndex !== -1 && !this.insUser.ins_id) {
      //     if (!this.independent)
      //       this.$scrollTo(`#control-search_ins-container`, { offset: -44 });
      //   }
      //   if (this.productPkgListLikeIndex !== -1 && this.insUser.ins_id) {
      //     if (!this.independent)
      //       this.$scrollTo(`#title-post-like`, { offset: -60 });
      //   }
      // }

      // this.bottomBtnDetective();
    },

    addToCart() {
      let param = {
        ins_id: this.insUser.ins_id,
        ins_account: this.insUser.ins_account,
      };

      // 关注
      if (!this.tabsIndex) {
        param.task_type = 2;
        param.product_id = this.productPkgCurrentFollow.product_id;
        param.purchase_quantity = this.productPkgCurrentFollow.purchase_quantity;
        param.price_decimal = this.productPkgCurrentFollow.price_decimal || 8.8;
        param.cycle_type = this.productPkgCurrentFollow.cycle_type;
        param.product_type = this.productPkgCurrentFollow.product_type;
        param.gives = this.productPkgCurrentFollow["gives"];
        param.follow_pic_url = this.insUser.profile_pic_url;
        param.post_count = this.insUser.post.post_count;
        param.follower_count = this.insUser.followed_by;
        param.following_count = this.insUser.follow;

        if (this.postList.length > 1) {
          param.like_id = this.postList[0].like_id;
          param.like_pic_url = this.postList[0].like_pic_url;
          param.like_count = this.postList[0].like_count;
          param.short_code = this.postList[0].short_code;
        }

        // console.log(param);
        this.gaBottomBtn();
      }

      // 周期关注
      if (this.tabsIndex) {
        // const post = this.postCurrent;

        param.task_type = 2;
        param.product_id = this.productPkgListDailyVM.product_id;
        param.purchase_quantity = this.productPkgListDailyVM.purchase_quantity;
        param.price_decimal = this.productPkgListDailyVM.price_decimal;

        // param.like_id = post.like_id;
        // param.like_pic_url = post.like_pic_url;
        // param.short_code = post.short_code;
        // param.like_count = this.productPkgCurrentLike['purchase_quantity'];
        param.gives = this.productPkgListDailyVM["gives"];
        param.follow_pic_url = this.insUser.profile_pic_url;
        param.post_count = this.insUser.post.post_count;
        param.follower_count = this.insUser.followed_by;
        param.following_count = this.insUser.follow;
        param.cycle_type = this.productPkgListDailyVM.cycle_type;
        param.product_type = this.productPkgListDailyVM.product_type;
        this.gaBottomBtn();
      }

      // 广告参数
      let adStore = { s: "", c: "", k: "" };
      adStore.s = this.$route.query.s || "";
      adStore.c = this.$route.query.c || "";
      adStore.k = this.$route.query.k || "";
      this.$storage.set("adStore", adStore);

      // console.log(this.$nuxt.$route.path);

      // console.log(1, param);
      // this.initGeoIPWhiteList(param);
      this.transportCartUnitData(param);
    },
    transportCartUnitData(param) {
      // console.log(param);
      this.$storage.set("cartUnit", param);
      // this.$store.commit('cartUnit', param);

      const query = this.COMMON.envTest() ? { env_test: "1" } : {};
      this.$nuxt.$router.push({ path: "/checkout", query: query });
    },
    // 获取白名单（功能已变更为获取该地区支持的支付方式）
    initGeoIPWhiteList(param) {
      // console.log(param);
      // response.data['checkout_method']
      // 1 跳转 Stripe
      // 2 跳转 HotAntPay
      this.ajaxRequesting = true;
      this.$nuxt.$axios
        .post(
          apiPayment.getCheckoutMethod,
          this.COMMON.paramSign({
            client_lan: this.$i18n.locale,
          })
        )
        .then((response) => {
          if (response.data.status === "ok") {
            // if (this.$nuxt.$route.path === '/event-followers' || this.$nuxt.$route.path === '/event-likes') {
            //   this.sendCheckoutInfo(param);
            // } else {
            //   if (response.data['checkout_method'] === 1) {
            //     // Stripe
            //     this.sendCheckoutInfo(param);
            //   } else {
            //     // HotAntPay
            //     this.transportCartUnitData(param);
            //   }
            // }

            // askNet
            // if (this.askNet) {
            //   this.askNetPay();
            //   return;
            // }

            // Shopify
            // if (this.shopify) {
            //   this.shopifyPay();
            //   return;
            // }

            if (response.data["checkout_method"] === 1) {
              this.shopifyPay();
            } else {
              this.transportCartUnitData(param);
            }
          } else {
            this.ajaxRequesting = false;
            this.$alert(
              "",
              "error",
              "Sorry",
              "Something wrong with check payment method, please try later.",
              "normal",
              "Close"
            );
          }
        })
        .catch((error) => {
          this.ajaxRequesting = false;
          this.$alert(
            "",
            "error",
            "Sorry",
            "Something wrong with check payment method, please try later.",
            "normal",
            "Close"
          );
          console.log("initGeoIPWhiteList Error:", error);
          console.log(error);
        });
    },

    // Shopify 跳转支付
    // 注意task结构体中的insInfo对象名（与User页面不同）
    shopifyPay() {
      let param = {
        token: this.$storage.get("token"),
        locale: navigator.language,
        tasks: {
          ins_id: this.insUser.ins_id,
          ins_account: this.insUser.ins_account,
        },
        ads: {
          s: this.$route.query.s || "",
          c: this.$route.query.c || "",
          k: this.$route.query.k || "",
        },
      };

      if (!this.tabsIndex) {
        // 关注
        param.tasks.product_id = this.productPkgCurrentFollow.product_id;
        param.tasks.task_type = 2;

        // param.gives = this.productPkgCurrentFollow['gives'];
        param.tasks.follow_pic_url = this.insUser.profile_pic_url;
        param.tasks.post_count = this.insUser.post.post_count;
        param.tasks.follower_count = this.insUser.followed_by;
        param.tasks.following_count = this.insUser.follow;

        if (this.postList.length > 1) {
          param.tasks.like_id = this.postList[0].like_id;
          param.tasks.like_pic_url = this.postList[0].like_pic_url;
          param.tasks.like_count = this.postList[0].like_count;
          param.tasks.short_code = this.postList[0].short_code;
        }
      }

      if (this.tabsIndex) {
        // 点赞
        const post = this.postCurrent;

        param.tasks.product_id = this.productPkgCurrentLike.product_id;
        param.tasks.task_type = 1;
        param.tasks.like_id = post.like_id;
        param.tasks.like_pic_url = post.like_pic_url;
        param.tasks.short_code = post.short_code;
        param.tasks.like_count = this.productPkgCurrentLike[
          "purchase_quantity"
        ];
      }

      this.shopifyPayRequest(param);
    },
    shopifyPayRequest(param) {
      // if (!this.ajaxRequesting) {
      //   this.ajaxRequesting = true;
      //   console.log(param);
      this.$nuxt.$axios
        .post(apiTask.shopifyPay, this.COMMON.paramSign(param))
        .then((response) => {
          this.ajaxRequesting = false;
          // console.log(response);
          if (response.data.status === "ok") {
            console.log(response.data.status);
            window.location.href = response.data["payment_url"];
          } else if (response.data.error !== undefined) {
            if (response.data.error.type === "bad_token") {
              const msg = "Login expired, redirecting to login page.";
              this.redirectToLogin(msg);
            } else if (response.data.error.type === "bad_ins_account") {
              this.dialogFailMsg =
                "This Instagram account does not been added yet.";
              this.dialogFail = true;
            } else if (response.data.error.type === "money_deficit") {
              this.coinsLackNumCal();
            } else if (response.data.error.type === "product_expired") {
              this.dialogFailMsg =
                "This task cannot be published at this time.";
              this.dialogFail = true;
            } else if (response.data.error.type === "product_locale") {
              this.dialogFailMsg =
                "Sorry. This package is not currently available in your country or region.";
              this.dialogFail = true;
            } else {
              this.dialogFailMsg =
                "<samp>" +
                "<b>Error Type:</b> " +
                response.data.error.type +
                "<br>" +
                "<b>Error Message:</b> " +
                response.data.error.message +
                "</samp>";
              this.dialogFail = true;
            }
          } else {
            this.dialogFailMsg = JSON.stringify(response.data);
            this.dialogFail = true;
          }
        })
        .catch((error) => {
          this.ajaxRequesting = false;
          this.dialogFailMsg =
            "<samp>" +
            "<b>Error Status:</b> " +
            error.status +
            "<br>" +
            "<b>Error Message:</b> " +
            error.statusText +
            "</samp>";
          this.dialogFail = true;
          console.log("Catch Error: shopifyPayRequest", error);
        });
      // }
    },

    // 使用安卓版接口（2-6）发起，
    // 可用于发起Stripe支付
    sendCheckoutInfo(param) {
      let paramCheckout = {};
      paramCheckout.tasks = [];
      paramCheckout.tasks.push(param);

      paramCheckout.token = this.$storage.get("token");
      paramCheckout.lan = "";
      paramCheckout.show_header = 1;
      paramCheckout.origin = "web";
      paramCheckout.locale = navigator.language;

      // Google 广告参数
      let s = this.COMMON.getURLQuery("s");
      s = this.COMMON.getURLQuery("source");
      let c = this.COMMON.getURLQuery("c");
      c = this.COMMON.getURLQuery("camp");
      let k = this.COMMON.getURLQuery("k");

      if (s !== null) paramCheckout.ads = { s: s };
      if (c !== null) paramCheckout.ads = { c: c };
      if (k !== null) paramCheckout.ads = { k: k };

      this.$nuxt.$axios
        .post(apiTask.checkoutAndroid, this.COMMON.paramSign(paramCheckout))
        .then((response) => {
          this.ajaxRequesting = false;
          if (response.data.status === "ok") {
            const query = this.COMMON.envTest() ? "&env_test=1" : "";
            window.location.href = `${response.data["checkout_url"]}${query}`;
          } else {
            this.$alert(
              "",
              "error",
              "Sorry",
              "Something wrong with send checkout info, please try later.",
              "normal",
              "Close"
            );
          }
        })
        .catch((error) => {
          this.ajaxRequesting = false;
          this.$alert(
            "",
            "error",
            "Sorry",
            "Something wrong with send checkout info, please try later.",
            "normal",
            "Close"
          );
          console.log("sendCheckoutInfo Error:", error);
        });
    },

    gaSearchBtn() {
      this.$ga.event("buttonclick", "click", "check-now-counter");
    },
    gaBottomBtn() {
      // let param = !this.tabsIndex ? 'f' : 'l';
      let param = "f";
      let paramEvent0 = "";
      if (
        this.$nuxt.$route.path === "/event-followers" ||
        this.$nuxt.$route.path === "/event-likes"
      ) {
        paramEvent0 = "-ad";
      }
      if (this.tabsIndex) paramEvent0 = "-daily";

      let gaPlatform = "";
      if (this.$i18n.locale !== "en") {
        if (this.COMMON.isiOS()) gaPlatform = "ios";
        if (this.COMMON.isAndroid()) gaPlatform = "adr";
      }

      let gaMultiLang =
        this.$i18n.locale !== "en" ? `-${this.$i18n.locale}` : "";

      let pageParam = "";
      if (this.$nuxt.$route.path === "/") {
        pageParam = "hp";
      } else if (
        this.$nuxt.$route.path === "/buy-instagram-followers" ||
        this.$nuxt.$route.path === "/buy-instagram-likes"
      ) {
        pageParam = "store";
      }

      // console.log(this.$nuxt.$route.path);

      if (this.$nuxt.$route.path === "/event-get") {
        this.$ga.event("insbuy", "buy", "paidlp-3");
      } else {
        this.$ga.event(
          "insbuy",
          "buy",
          `${pageParam}${gaPlatform}buy${param}${paramEvent0}${gaMultiLang}`
        );
      }
    },

    handleScroll: function () {
      this.item1Val = this.getBoundingClientRect(this.$refs.item1);
      this.isSignup = this.getBoundingClientRect(this.$refs.signup);
      this.counterPeopleVal = this.getBoundingClientRect(
        this.$refs.counterPeople
      );
      this.item3Val = this.getBoundingClientRect(this.$refs.item3);
      this.item6Val = this.getBoundingClientRect(this.$refs.item6);
      this.clockAroundVal = this.getBoundingClientRect(this.$refs.clockAround);
    },
    getBoundingClientRect(el) {
      let rect = el.getBoundingClientRect();
      return !(
        rect.top >=
          (window.innerHeight || document.documentElement.clientHeight) ||
        rect.bottom <= 0
      );
    },
    handle() {
      const fun = this.handleScroll();
      this.COMMON.throttle(fun, 60, 100);
    },
    numberGrow(ele, bool = true) {
      let t = null;
      let step = parseInt(this.value / (this.time * 100));
      let current = 0;
      let start = 0;

      if (!bool) {
        clearInterval(t);
        return;
      }

      t = setInterval(() => {
        start += step + 10;
        if (start >= this.value) {
          clearInterval(t);
          start = this.value;
          t = null;
        }
        if (current === start) {
          return;
        }
        current = start;
        ele.innerHTML = current
          .toString()
          .replace(/(\d)(?=(?:\d{3}[+]?)+$)/g, "$1,");
      }, 10);
    },
  },
};
</script>

<style scoped lang="scss" src="./instagram-follower-counter.scss"></style>

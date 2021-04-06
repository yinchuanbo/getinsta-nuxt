<template>
  <div id="maxcontain" ref="maxcontainer" class="auto-follower">
    <div class="auto-img"></div>
    <div class="auto-weapper">
      <h1>Get Daily 200 Instagram Followers</h1>
      <div class="auto-top">
        <!-- 第一步骤 -->
        <div class="auto-step1">
          <span>
            Step 1
          </span>
          <b>Select Follower Plan</b>
        </div>
        <div class="auto-step1-content">
          <ul>
            <li
              v-for="(item, v) in FalseData"
              :key="v"
              :class="{ on: v == isflag }"
              @click="selectbox(item, v)"
            >
              <div class="checkimg"></div>
              <p>{{ item.dailyQuantity }} followers/Day</p>
              <h6>${{ (item.price_decimal / selectday) | jisuan }}</h6>

              <span>${{ item.original_price_decimal/ selectday | jisuan }}</span>
              <!-- <h5>
                Save
                {{
                  (item.price_decimal / item.original_price_decimal)
                    | toPercentage
                }}
              </h5> -->
              <h5>Save {{ item.discount }} %</h5>
            </li>
          </ul>
        </div>
        <!-- 第一步骤结束 -->
        <!-- 第二步骤 -->
        <div id="auto-step2" class="auto-step1 step1">
          <span>
            Step 2
          </span>
          <b>Select Subscription Plan</b>
        </div>

        <div class="auto-step2-content">
          <ul>
            <li
              v-for="(item, v) in FalseData2"
              :key="v"
              :class="{ on: v == isindex }"
              @click="selectb(item, v)"
            >
              <div class="checkimg others"></div>
              <div class="auto-other">
                <p>{{ item.days }}-Day</p>
                <h6>{{ item.discount }}% OFF</h6>
              </div>
            </li>
          </ul>
        </div>
        <!-- 第二步骤结束 -->
        <!-- 第三步骤 -->
        <div id="auto-step3" class="auto-step1 step2">
          <span>
            Step 3
          </span>
          <b>Enter Instagram Account</b>
        </div>
        <!-- search -->
        <div class="control-search_ins">
          <label>
            <input
              v-model="searchInsInput"
              type="text"
              :placeholder="'Instagram Username'"
            />
          </label>
          <div class="search_btn" @click="searchUsername">
            <button-purple
              id="orangebtn"
              text="Next >>"
              :sharp="true"
              :loading="searchInsLoading"
              :sizeweight="sizefont"
            />
          </div>
        </div>
        <transition name="fade-tabs" mode="out-in">
          <div v-if="insUser.ins_id" class="ins-info-container">
            <img :src="insUser.profile_pic_url || ''" alt="" />
            <h3>{{ insUser.ins_account }}</h3>
            <p>
              <span>
                <b>{{ insUser.post.post_count | numberAbbreviations }}</b>
                {{ $t("global.instagramConcept.posts") }}
              </span>
              <span>
                <b>{{ insUser.followed_by | numberAbbreviations }}</b>
                {{ $t("global.instagramConcept.followers") }}
              </span>
              <span>
                <b>{{ insUser.follow | numberAbbreviations }}</b>
                {{ $t("global.instagramConcept.following") }}
              </span>
            </p>
          </div>
        </transition>
        <div class="auto-btn">
          <button @click="tabBottomBtnAction">Continue to Payment</button>
        </div>
        <div class="auto-paypal">
          <img src="./img/pqyment.png" alt="" />
        </div>
        <!-- 第三步骤结束 -->
      </div>
    </div>
    <AutoStep />
    <div ref="homeSecrecy" class="auto-two">
      <div class="wrapper">
        <h2>Until Now, We Have:</h2>
        <div class="num-contain">
          <div class="leftimg"></div>
          <div class="rightnum">
            <div class="myroll01">
              <div class="myroll">
                <div id="num-roll1"></div>
                ,
                <div id="num-roll2"></div>
                ,
                <div id="num-roll3"></div>
              </div>
              <p class="marginbtm35">Likes Delivered</p>
            </div>
            <div class="myroll02">
              <div class="myroll">
                <div id="num-roll4"></div>
                ,
                <div id="num-roll5"></div>
                ,
                <div id="num-roll6"></div>
              </div>
              <p class="marginbtm35">Followers Provided</p>
            </div>
            <div class="myroll03">
              <div class="myroll">
                <div id="num-roll7"></div>
                ,
                <div id="num-roll8"></div>
                ,
                <div id="num-roll9"></div>
              </div>
              <p>Repeat Customer</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <PaymentMobile />
    <why-buy />
    <which-one />
    <bot-payment
      v-if="isfalse && pcbannerbuy"
      :selectfoll="selectfollower"
      :selectfollprice="selectfollowerprice"
      :selectday="selectday"
      :class="{ isshow: buyflag }"
      :sendval="searchInsInput"
      @NoticeFather="receviewmsg"
      @NoticeFathertwo="searchUsernameytwo"
      @Addproduct="tabBottomBtnAction"
    />
    <bot-paymentwo
      v-if="!pcbannerbuy && !searchInsLoading"
      :class="{ isshow: buyflag }"
      :sendval="searchInsInput"
      :insfollower="insUser"
      :selectfoll="selectfollower"
      :selectfollprice="selectfollowerprice"
      :selectday="selectday"
      @NoticeFather="receviewmsg"
      @NoticeFathertwo="searchUsernameytwo"
      @Addproduct="tabBottomBtnAction"
    />
    <!--buyNow Btn-->
    <div
      v-if="btnshow || btnshowtwo"
      class="mobile control-btn"
      :class="{
        on: bottomBtnOn
      }"
    >
      <!-- 底部搜索 -mobile -->
      <div
        v-if="mobileinputshow && $store.state.isMobile"
        class="control-search_ins"
      >
        <label>
          <input
            v-model="searchInsInput"
            type="text"
            :placeholder="'Instagram Username'"
          />
        </label>
        <div class="search_btn" @click="searchUsername">
          <button-purple
            id="zsbtn"
            text="Next >>"
            :sharp="true"
            :loading="searchInsLoading"
            :sizeweight="sizefont"
          />
        </div>
      </div>
      <div class="btncontain" @click="tabBottomBtnAction">
        <button-yellow-icon
          :text="'Continue to Payment'"
          :font-size="'size-16'"
        />
      </div>
    </div>
    <transition name="fade">
      <div v-if="dialogFail" class="uni-dialog-box enter-box enter-mask">
        <div class="mask"></div>
        <div class="container">
          <i class="close" @click="closeDialog()"></i>
          <div class="content">
            <div class="model-box alert">
              <div class="title">
                <i class="icon"></i>
                <h3>Oops</h3>
              </div>
              <p class="note" v-html="dialogFailMsg"></p>
              <div class="btn" @click="closeDialog()">
                <button-purple
                  text="Close"
                  :font-size="'size-16'"
                  :square="true"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="dialogAttention" class="uni-dialog-box enter-box enter-mask">
        <div class="mask"></div>
        <div class="container">
          <i class="close" @click="closeDialog()"></i>
          <div class="content">
            <div class="model-box attention">
              <div class="title">
                <i class="icon"></i>
                <h3>Wait</h3>
              </div>
              <p class="note" v-html="dialogAttentionMsg"></p>
              <div class="btn" @click="closeDialog()">
                <button-purple
                  text="Close"
                  :font-size="'size-16'"
                  :square="true"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <!-- 购买弹框 -->
    <BuySelect
      :model-box-buy-show="buyPopshow"
      :enter-mask="entermask"
      :followers="follerList"
      :enter-box="enterbox"
      :my-ins-user="insUser"
      :is-router="true"
      @closebox="closeBuyPop"
    />
  </div>
</template>

<script>
import WhyBuy from "./views/why-buy";
import WhichOne from "./views/which-one";
import ButtonPurple from "@/components/button/button-purple";
import AutoStep from "./views/auto-step";
import PaymentMobile from "./views/payment-mobile";
import BotPayment from "./views/bot-payment";
import BotPaymentwo from "./views/bot-payment-two";
import ButtonYellowIcon from "@/components/button/button-yellow-icon";
import BuySelect from "@/components/popup-layer/buy-select/buy-select.vue";
import DigitRoll from "@/assets/scripts/digitRoll.js";
import apiAccount from "@/api/api.account";
import apiInsServer from '@/api/api.ins.server';
export default {
  filters: {
    toPercentage(num) {
      var str = parseInt(100 - Number(num * 100));
      if (isNaN(str)) {
        return 0;
      }
      str += "%";
      return str;
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
    jisuan(num) {
      return num.toFixed(2);
    }
  },
  components: {
    WhyBuy,
    WhichOne,
    AutoStep,
    ButtonPurple,
    PaymentMobile,
    BotPayment,
    BotPaymentwo,
    ButtonYellowIcon,
    BuySelect
  },
  data() {
    return {
      isfalse:false,
      searchInsInput: "",
      dialogFail: false,
      buyflag: false,
      enterFirstTime: true,
      searchInsLoading: false,
      dialogFailMsg: "",
      dialogAttention: false,
      mobileinputshow: true,
      bottomBtnOn: true,
      pcbannerbuy: true,
      sizefont: true,
      buyPopshow: false,
      entermask: false,
      enterbox: false,
      follerList: null,
      roll1: null,
      roll2: null,
      roll3: null,
      roll4: null,
      roll5: null,
      roll6: null,
      roll7: null,
      roll8: null,
      roll9: null,
      isflag: 1,
      isindex: 1,
      pkgListWithUnit: [],
      FalseData: [],
      FalseData2: [],
      FalseData4: [
        {
          channel: "",
          cycle_type: 30,
          dailyQuantity: 50,
          discount: 10,
          original_price_decimal: 29.7,
          payment_type: 2,
          price_decimal: 29.7,
          product_id: 701,
          product_type: 2,
          promote_sale_type: 0,
          purchase_quantity: 50,
          region_id: 0
        },
        {
          channel: "",
          cycle_type: 30,
          dailyQuantity: 100,
          discount: 40,
          original_price_decimal: 65.4,
          payment_type: 2,
          price_decimal: 41.7,
          product_id: 702,
          product_type: 2,
          promote_sale_type: 0,
          purchase_quantity: 100,
          region_id: 0
        },
        {
          channel: "",
          cycle_type: 30,
          dailyQuantity: 200,
          discount: 50,
          original_price_decimal: 130.8,
          payment_type: 2,
          price_decimal: 68.7,
          product_id: 703,
          product_type: 2,
          promote_sale_type: 0,
          purchase_quantity: 200,
          region_id: 0
        },

        {
          channel: "",
          cycle_type: 60,
          dailyQuantity: 50,
          discount: 20,
          original_price_decimal: 57,
          payment_type: 2,
          price_decimal: 45.6,
          product_id: 589,
          product_type: 2,
          promote_sale_type: 0,
          purchase_quantity: 50,
          region_id: 0
        },
         {
          channel: "",
          cycle_type: 60,
          dailyQuantity: 100,
          discount: 50,
          original_price_decimal: 114,
          payment_type: 2,
          price_decimal: 57,
          product_id: 590,
          product_type: 2,
          promote_sale_type: 0,
          purchase_quantity: 100,
          region_id: 0
        },
        {
          channel: "",
          cycle_type: 60,
          dailyQuantity: 200,
          discount: 70,
          original_price_decimal: 331.8,
          payment_type: 2,
          price_decimal: 99.6,
          product_id: 591,
          product_type: 2,
          promote_sale_type: 0,
          purchase_quantity: 200,
          region_id: 0
        },

        {
          channel: "",
          cycle_type: 90,
          dailyQuantity: 50,
          discount: 25,
          original_price_decimal: 82.80,
          payment_type: 2,
          price_decimal: 62.1,
          product_id: 805,
          product_type: 2,
          promote_sale_type: 0,
          purchase_quantity: 50,
          region_id: 0
        },
        {
          channel: "",
          cycle_type: 90,
          dailyQuantity: 100,
          discount: 50,
          original_price_decimal: 165.6,
          payment_type: 2,
          price_decimal: 74.7,
          product_id: 818,
          product_type: 2,
          promote_sale_type: 0,
          purchase_quantity: 100,
          region_id: 0
        },
        {
          channel: "",
          cycle_type: 90,
          dailyQuantity: 200,
          discount: 75,
          original_price_decimal: 536.4,
          payment_type: 2,
          price_decimal: 134.1,
          product_id: 819,
          product_type: 2,
          promote_sale_type: 0,
          purchase_quantity: 200,
          region_id: 0
        }
      ],
      FalseData3: [
        { title: "100% Real Instagram Followers" },
        { title: " Secure & Private Purchase " },
        { title: "No Password & No Verification " },
        { title: "Deliver Every 24 Hours " },
        { title: "Drop Protection" },
        { title: "24/7 Customer Support" }
      ],
      postList: [],
      postListInfo: {
        post_count: 0,
        end_cursor: "",
        has_next_page: false,
        page_size: 12
      },
      dailyprice: null,
      insUser: {},
      selectfollower: null,
      selectfollowerprice:null,
      selectday: null,
      // 装一个开关
      flag: false,
      // moblie
      btnshow: false,
      btnshowtwo: false,
      price_decimal: null
    };
  },
  watch: {
    dailyprice: {
      handler(newVal, oldVal) {},
      deep: true
    }
  },
  metaInfo() {
    return {
      title: "Buy Instagram Daily Followers for $0.009 - Real & Automatic",
      meta: [
        // vue-meta 版本升级后语法更改
        // { description: this.$t('home.meta.description') },
        {
          name: "description",
          content:
            "Buy Instagram daily followers at the cheapest price. Get Instagram followers automatically every 24 hours, 100% real, active & organic."
        }
      ],
      link: [
        {
          rel: "canonical",
          href: `${window.location.origin}${this.$route.path}`
        },
        {
          rel: "alternate",
          hreflang: "en",
          href: `https://www.easygetinsta.com${this.$route.path}`
        },
        {
          rel: "alternate",
          hreflang: "fr",
          href: `https://fr.easygetinsta.com${this.$route.path}`
        },
        {
          rel: "alternate",
          hreflang: "de",
          href: `https://de.easygetinsta.com${this.$route.path}`
        }
      ]
    };
  },
  mounted() {
    if (this.$route.path === "/buy-auto-instagram-followers-1") {
      this.renderPkgListDaystwo();
    } else {
      this.getAutoList();
    }

    this.roll1 = new DigitRoll({
      container: "#num-roll1",
      width: 1
    });
    this.roll2 = new DigitRoll({
      container: "#num-roll2",
      width: 1
    });
    this.roll3 = new DigitRoll({
      container: "#num-roll3",
      width: 1
    });
    this.roll1 = new DigitRoll({
      container: "#num-roll1",
      width: 1
    });
    this.roll2 = new DigitRoll({
      container: "#num-roll2",
      width: 1
    });
    this.roll3 = new DigitRoll({
      container: "#num-roll3",
      width: 1
    });
    this.roll4 = new DigitRoll({
      container: "#num-roll4",
      width: 1
    });
    this.roll5 = new DigitRoll({
      container: "#num-roll5",
      width: 1
    });
    this.roll6 = new DigitRoll({
      container: "#num-roll6",
      width: 1
    });
    this.roll7 = new DigitRoll({
      container: "#num-roll7",
      width: 1
    });
    this.roll8 = new DigitRoll({
      container: "#num-roll8",
      width: 1
    });
    this.roll9 = new DigitRoll({
      container: "#num-roll9",
      width: 1
    });
    window.addEventListener("scroll", this.handle);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handle);
    this.destroyedRoll();
  },
  methods: {
    getAutoList() {
      this.buyflag = true;
      this.$nuxt.$axios
        .post(
          `${apiAccount.appConfig}?origin=web`,
          this.COMMON.paramSign({
            client_lan: this.$i18n.locale,
            cycle_product_enable: true
          })
        )
        .then(response => {
          if (response.data.product && response.data.product.list) {
            this.renderPkgListWithUnit(response.data.product.list);
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
        .catch(error => {
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
    renderPkgListWithUnit(pkgList) {
      pkgList.map(item => {
        if (item["cycle_type"] > 1  && item.product_type === 2) {
          item.dailyQuantity = item["purchase_quantity"];
          this.pkgListWithUnit.push(item);
        }
      });

      this.renderPkgListDays();
    },
    renderPkgListDays() {
      this.FalseData2 = [
        ...new Set(this.pkgListWithUnit.map(i => i.cycle_type))
      ];

      let aa = [];
      this.FalseData2.map((item, index) => {
        aa.push({ days: item, discount: 1 });
      });
      for (let x = 0; x < aa.length; x++) {
        if (x == 0) {
          aa[x].discount = 50;
        } else if (x == 1) {
          aa[x].discount = 70;
        } else if (x == 2) {
          aa[x].discount = 75;
        }
      }
      this.FalseData2 = aa;
      // 30不能写死，最好是从第一个数组中获取
      this.FalseData = [
        ...new Set(
          this.pkgListWithUnit.filter(
            item => item.cycle_type === this.FalseData2[1].days
          )
        )
      ];
      if (this.COMMON.isMobile()) {
        this.FalseData.reverse();
        this.dailyprice = this.FalseData[2];
        this.isflag = 0;
      } else {
        let newobj;
        for (let i = 0; i < this.FalseData.length; i++) {
          if (this.FalseData[i].dailyQuantity === 200) {
            // this.FalseData[i] =this.FalseData[i-1]
            //  this.FalseData[i-1] =this.FalseData[i]
            newobj = JSON.parse(JSON.stringify(this.FalseData[i]));
            this.FalseData[i] = this.FalseData[i - 1];
            this.FalseData[i - 1] = newobj;
          }
        }
        this.dailyprice = this.FalseData[1];
      }
      this.selectday = this.dailyprice.cycle_type;
      this.selectfollower = this.dailyprice.dailyQuantity;
      this.selectfollowerprice =(this.dailyprice.price_decimal/this.dailyprice.cycle_type).toFixed(2)
    },
    renderPkgListDaystwo() {
      this.renderPkgListWithUnit(this.FalseData4);
    },
    getScrollTop() {
      let scroll_top = 0;
      if (document.documentElement && document.documentElement.scrollTop) {
        scroll_top = document.documentElement.scrollTop;
      } else if (document.body) {
        scroll_top = document.body.scrollTop;
      }
      return scroll_top;
    },
    selectbox(item, v) {
      this.dailyprice = item;
      this.price_decimal = item.price_decimal;
      console.log(this.dailyprice);
      this.isflag = v;
      this.selectb(item.cycle_type, this.isindex);
      this.selectfollower = item.dailyQuantity;
      this.selectfollowerprice =(item.price_decimal/item.cycle_type).toFixed(2)
      if (!this.flag) {
        this.mobileroull();
        this.flag = !this.flag;
      }
    },
    selectb(y, v) {
      let c = y;
      if (y.days) {
        c = y.days;
      } else {
        c = y;
      }
      this.selectday = c;
      this.isindex = v;
      // console.log('this.FalseData',this.FalseData);
      this.FalseData = [
        ...new Set(this.pkgListWithUnit.filter(item => item.cycle_type === c))
      ];

        if(this.COMMON.isMobile()){
          this.FalseData.reverse();
        this.dailyprice = this.FalseData[2];
        // this.isflag = 0;
        }else {
        let newobj;
        for (let i = 0; i < this.FalseData.length; i++) {
          if (this.FalseData[i].dailyQuantity === 200) {
            // this.FalseData[i] =this.FalseData[i-1]
            //  this.FalseData[i-1] =this.FalseData[i]
            newobj = JSON.parse(JSON.stringify(this.FalseData[i]));
            this.FalseData[i] = this.FalseData[i - 1];
            this.FalseData[i - 1] = newobj;
          }
        }
      }
      this.dailyprice = this.FalseData[this.isflag];
      this.selectfollowerprice =(this.dailyprice.price_decimal/this.dailyprice.cycle_type).toFixed(2)
      if (this.flag) {
        this.mobileroull1();
        this.flag = !this.flag;
      }
    },
    mobileroull() {
      if (this.COMMON.isMobile()) {
        this.$scrollTo('#auto-step2', { offset: -1 * this.COMMON.headerHeight() });
      }
    },
    mobileroull1() {
      if (this.COMMON.isMobile()) {
        this.$scrollTo('#auto-step3', { offset: -1 * this.COMMON.headerHeight() });
      }
    },
    rollrun() {
      this.roll1.roll(505);
      this.roll2.roll(602);
      this.roll3.roll(663);
      this.roll4.roll(65);
      this.roll5.roll(203);
      this.roll6.roll(802);
      this.roll7.roll(25);
      this.roll8.roll(368);
      this.roll9.roll(975);
    },
    receviewmsg(v) {
      this.searchInsInput = v;
    },
    getpopBuy() {
      if (this.insUser.ins_id && this.$store.state.isMobile) {
        this.buyPopshow = true;
        setTimeout(() => {
          this.enterbox = true;
        }, 10);
        setTimeout(() => {
          this.entermask = true;
        }, 310);
        this.follerList = this.dailyprice;
      }
    },
    searchUsername(event) {
      if (event.target.id == "orangebtn") {
        this.$ga.event("buttonclick", "click", "daily-addaccount");
      } else {
        this.$ga.event("buttonclick", "click", "daily-addaccount-f");
      }
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
      } else {
        this.pcbannerbuy = false;
      }
      if (this.searchInsLoading) return;
      this.searchInsLoading = true;
      this.$nuxt.$axios
        .post(
          // apiAccount.getInsInfo,
          apiInsServer.getAccountByUsername,
          this.COMMON.paramSign({
            ins_account: this.searchInsInput
          })
        )
        .then(response => {
          this.mobileinputshow = false;
          this.btnshowtwo = true;

          // window.addEventListener("scroll",this.scrollone)
          this.searchInsLoading = false;
          if (response.data.status === "ok") {
            const _sharedDataUser = response.data.content['graphql']['user'];
            const _sharedDataUserPosts = _sharedDataUser['edge_owner_to_timeline_media'];

        this.insUser.ins_id = _sharedDataUser.id;
        this.insUser.ins_account = _sharedDataUser.username;
        this.insUser.profile_pic_url = _sharedDataUser.profile_pic_url;
        this.insUser.followed_by = _sharedDataUser['edge_followed_by']['count'];
        this.insUser.follow = _sharedDataUser['edge_follow']['count'];
        this.insUser.post = this.insPostTransform(_sharedDataUserPosts);

        this.postList = this.insUser.post.post_list;
        this.postListInfo.post_count = this.insUser.post.post_count;
        this.postListInfo.end_cursor = this.insUser.post.end_cursor;
        this.postListInfo.has_next_page = this.insUser.post.post_count > this.postListInfo.page_size;
            // this.insUser = response.data["ins_info"];
            // this.postList = response.data["ins_info"].post["post_list"];

            // this.postListInfo.post_count =
            //   response.data["ins_info"].post.post_count;
            // this.postListInfo.end_cursor =
            //   response.data["ins_info"].post.end_cursor;
            // this.postListInfo.has_next_page =
            //   response.data["ins_info"].post.post_count >
            //   this.postListInfo.page_size;
            this.bottomBtnOn = true;
             this.$scrollTo('#auto-step3', { offset: -1 * this.COMMON.headerHeight() });

            // 移动端调用购买弹窗
            if (event.target.id !== "orangebtn") {
              this.getpopBuy();
            }
          } else {
            this.dialogFailMsg = "Please enter valid username.";
            this.dialogFail = true;
          }
        })
        .catch(error => {
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
    },
     insPostTransform(_sharedDataUserPosts) {
      let post = {};
      post.post_count = _sharedDataUserPosts.count;
      post.end_cursor = _sharedDataUserPosts['page_info']['end_cursor'];

      const insPostList = _sharedDataUserPosts['edges'];
      let postList = [];

      for (let i = 0; i < insPostList.length; i++) {
        let postObj = {};
        let insPostObj = insPostList[i]['node'];

        postObj.like_id = insPostObj.id;
        postObj.short_code = insPostObj['shortcode'];
        postObj.like_pic_url = insPostObj['thumbnail_src'];
        postObj.like_count = insPostObj['edge_liked_by']['count'];

        postList.push(postObj);
      }

      post.post_list = postList;

      return post;
    },
    getuser() {
      //  if (this.searchInsLoading) return;
      this.searchInsLoading = false;
      this.$nuxt.$axios
        .post(
          // apiAccount.getInsInfo,
           apiInsServer.getAccountByUsername,
          this.COMMON.paramSign({
            ins_account: this.searchInsInput
          })
        )
        .then(response => {
          this.searchInsLoading = false;
          if (response.data.status === "ok") {
            const _sharedDataUser = response.data.content['graphql']['user'];
            const _sharedDataUserPosts = _sharedDataUser['edge_owner_to_timeline_media'];

        this.insUser.ins_id = _sharedDataUser.id;
        this.insUser.ins_account = _sharedDataUser.username;
        this.insUser.profile_pic_url = _sharedDataUser.profile_pic_url;
        this.insUser.followed_by = _sharedDataUser['edge_followed_by']['count'];
        this.insUser.follow = _sharedDataUser['edge_follow']['count'];
        this.insUser.post = this.insPostTransform(_sharedDataUserPosts);

        this.postList = this.insUser.post.post_list;
        this.postListInfo.post_count = this.insUser.post.post_count;
        this.postListInfo.end_cursor = this.insUser.post.end_cursor;
        this.postListInfo.has_next_page = this.insUser.post.post_count > this.postListInfo.page_size;
            if (this.insUser != null) {
              this.pcbannerbuy = false;
            }
          } else {
            this.dialogFailMsg = "Please enter valid username.";
            this.dialogFail = true;
          }
        })
        .catch(error => {
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
    },
    searchUsernameytwo() {
      this.$ga.event("buttonclick", "click", `daily-addaccount-f`);
      this.getuser();
    },
    handleScroll() {
      if (
        this.$refs.homeSecrecy.getBoundingClientRect().top <
        window.innerHeight * 0.66
      ) {
        setTimeout(this.rollrun(), 400);
      }
      // console.log(document.documentElement.scrollTop);
      if (
        document.querySelector(".auto-paypal").offsetTop <
        document.documentElement.scrollTop
      ) {
        this.buyflag = false;
        this.isfalse =true
      } else {
        this.buyflag = true;
        this.isfalse =false
      }
      this.scrollone();
    },
    scrollone() {
      if (
        document.querySelector(".auto-step").offsetTop <
        document.documentElement.scrollTop + 200
      ) {
        this.btnshow = true;
      } else {
        this.btnshow = false;
      }
    },
    handle() {
      const fun = this.handleScroll();
      this.COMMON.throttle(fun, 60, 100);
    },
    destroyedRoll() {
      this.roll1.roll(505);
      this.roll2.roll(602);
      this.roll3.roll(663);
      this.roll4.roll(65);
      this.roll5.roll(203);
      this.roll6.roll(802);
      this.roll7.roll(25);
      this.roll8.roll(368);
      this.roll9.roll(975);
    },
    closeDialog() {
      this.dialogFail = false;
      this.dialogAttention = false;
    },
    tabBottomBtnAction() {
      this.gaBottomBtn();
      if (!this.insUser.ins_id) {
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
      this.addToCart();
    },
    addToCart() {
      let param = {
        ins_id: this.insUser.ins_id,
        ins_account: this.insUser.ins_account
      };

      // 周期关注
      param.task_type = 2;
      param.product_id = this.dailyprice.product_id;
      param.purchase_quantity = this.dailyprice.purchase_quantity;
      param.price_decimal = this.dailyprice.price_decimal;
      param.product_type =this.dailyprice.product_type

      param.gives = this.dailyprice["gives"];
      param.follow_pic_url = this.insUser.profile_pic_url;
      param.post_count = this.insUser.post.post_count;
      param.follower_count = this.insUser.followed_by;
      param.following_count = this.insUser.follow;
      param.cycle_type = this.dailyprice.cycle_type;

      // this.gaBottomBtn();

      // 广告参数
      let adStore = { s: "", c: "", k: "" };
      adStore.s = this.$route.query.s || "";
      adStore.c = this.$route.query.c || "";
      adStore.k = this.$route.query.k || "";
      this.$storage.set("adStore", adStore);
      this.transportCartUnitData(param);
    },
    transportCartUnitData(param) {
      this.$storage.set("cartUnit", param);
      const query = this.COMMON.envTest() ? { env_test: "1" } : {};
      this.$router.push({ path: "/checkout", query: query });
    },
    gaBottomBtn() {
      this.$ga.event("insbuy", "buy", `daily-buy`);
      // if (!this.buyflag) {

      // } else {
      //   this.$ga.event("insbuy", "buy", `daily-buy-f`);
      // }
    },
    closeBuyPop() {
      this.enterbox = false;
      setTimeout(() => {
        this.entermask = false;
      }, 300);
      setTimeout(() => {
        this.buyPopshow = false;
      }, 600);
      // this.searchInsInput = '';
      // this.insUser = null;
    }
  }
};
</script>

<style scoped lang="scss" src="./store-auto-follower.scss"></style>

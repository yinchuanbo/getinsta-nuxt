<template>
  <div
    v-if="modelBoxBuyShow"
    class="uni-dialog-box"
    :class="{ 'enter-box': enterBox, 'enter-mask': enterMask }"
  >
    <div class="mask"></div>
    <div
      class="container buy-followers"
      :class="{ next: myinsuser.ins_id, nexttwo: tipsShow }"
    >
      <i class="close" @click="modelBoxClose()"></i>
      <div class="content">
        <div class="content-title">
          <h1>
            <span v-if="!followers.dailyQuantity">{{ followers.purchase_quantity }} Followers</span>
            <span v-if="followers.dailyQuantity">{{ followers.dailyQuantity }} Daily Followers</span>
            &nbsp;<span>${{
                (followers.price_decimal / followers.cycle_type).toFixed(2)
              }}</span>
          </h1>
          <h2 v-if="followers.dailyQuantity">
            {{ followers.cycle_type }}-Day Subscription
          </h2>

          <p
            v-if="
              followers.gives !== undefined && followers.gives[0].type === 1
            "
            class="gifts"
          >
            {{ followers.gives[0].quantity }} likes gratuits
          </p>
          <p
            v-if="
              followers.gives !== undefined && followers.gives[0].type === 2
            "
            class="gifts"
          >
            {{ followers.gives[0].quantity }} followers gratuits
          </p>
        </div>
        <div class="content-detail">
          <!-- <label for="dialog-ins-search">Saisissez un compte Instagram</label>
          <input
            id="dialog-ins-search"
            v-model="searchInsInput"
            type="text"
            placeholder="Votre identifiant Instagram"
            @input="modelBoxPrevStep"
          />
          <div v-if="tipsShow" class="content-detail-tips">{{ tipsmsg }}</div> -->
          <div
            v-if="myinsuser.ins_id"
            class="ins-info-container compact"
            :class="{ on: myinsuser.ins_id }"
          >
            <img :src="myinsuser.profile_pic_url" alt="avatar" />
            <h3>{{ myinsuser.ins_account }}</h3>
            <p style="display:none">
              <span>
                <b>{{ myinsuser.post.post_count | numberAbbreviations }}</b>
                {{ $t("global.instagramConcept.posts") }}
              </span>
              <span>
                <b>{{ myinsuser.followed_by | numberAbbreviations }}</b>
                {{ $t("global.instagramConcept.followers") }}
              </span>
              <span>
                <b>{{ myinsuser.follow | numberAbbreviations }}</b>
                {{ $t("global.instagramConcept.following") }}
              </span>
            </p>
            <p class="compact-p">
              <span>
                <b>{{ myinsuser.post.post_count | numberAbbreviations }}</b>
                <i>{{ $t("global.instagramConcept.posts") }}</i>
              </span>
              <span>
                <b>{{ myinsuser.follow | numberAbbreviations }}</b>
                <i>{{ $t("global.instagramConcept.following") }}</i>
              </span>
              <span>
                <b>{{ myinsuser.followed_by | numberAbbreviations }}</b>
                <i>{{ $t("global.instagramConcept.followers") }}</i>
              </span>
            </p>
          </div>

          <div class="btn" @click="btnActionSearchAndBuy()">
            <button-yellow-icon
              :text="modelBoxBuyBtnText"
              font-size="size-16"
              :loading="searchInsLoading"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import apiInsServer from "@/api/api.ins.server";
import ButtonYellowIcon from "@/components/button/button-yellow-icon";

export default {
  name: "BuySelect",
  components: {
    ButtonYellowIcon
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
    }
  },
  props: {
    followers: {
      type: Object,
      default: null
    },
    myinsuser: {
      type: Object,
      default: null
    },
    tabindex: {
      type: Boolean
    },
    modelBoxBuyShow: {
      type: Boolean,
      default: false
    },
    enterBox: {
      type: Boolean,
      default: false
    },
    enterMask: {
      type: Boolean,
      default: false
    },
    isrouter: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      searchInsLoading: false,
      searchInsInput: "",
      tipsmsg:
        "L’identifiant Instagram n’existe pas ou la demande de données Instagram échouée. Réessayez plus tard.",
      tipsShow: false,
      modelBoxBuyBtnText: "Buy Now",
      productPkgListDailyVM: []
    };
  },
  methods: {
    modelBoxPrevStep() {
      this.modelBoxBuyBtnText = "Buy Now";
      this.insUser = {};
      if (this.searchInsInput === "") {
        this.tipsShow = false;
      }
    },
    modelBoxClose() {
      this.tipsShow = false;
      this.$emit("closebox", false);
    },
    btnActionSearchAndBuy() {
      if (!this.myinsuser.ins_id) {
        return;
      } else {
        this.addToCart();
      }
    },
    addToCart() {
      if (this.isrouter) {
        this.$ga.event("insbuy", "buy", `daily-buy-f`);
      } else {
        this.$ga.event(
          "insbuy",
          "buy",
          `dailyfbuy-${this.followers.newmsg.blogID}`
        );
      }
      // console.log(8888, `dailyfbuy-${this.followers.newmsg.blogID}`)
      let param = {
        ins_id: this.myinsuser.ins_id,
        ins_account: this.myinsuser.ins_account
      };

      param.task_type = 2;
      param.product_id = this.followers.product_id;
      param.purchase_quantity = this.followers.purchase_quantity;
      param.price_decimal = this.followers.price_decimal;

      param.gives = this.followers["gives"];
      param.follow_pic_url = this.myinsuser.profile_pic_url;
      param.post_count = this.myinsuser.post.post_count;
      param.follower_count = this.myinsuser.followed_by;
      param.following_count = this.myinsuser.follow;
      param.cycle_type = this.followers.cycle_type;
      // 广告参数
      // let adStore = {
      //   s: "",
      //   c: "",
      //   k: ""
      // };
      // adStore.s = this.$route.query.s || "";
      // adStore.c = this.$route.query.c || "";
      // adStore.k = this.$route.query.k || "";
      // this.$storage.set("adStore", adStore);

      // console.log(this.$route.path);

      // console.log(1, param);
      // this.initGeoIPWhiteList(param);
      this.transportCartUnitData(param);
    },
    transportCartUnitData(param) {
      // console.log(111, this);
      this.$storage.set("cartUnit", param);

      const query = this.COMMON.envTest()
        ? {
            env_test: "1"
          }
        : {};
      if (this.followers.newmsg) {
        this.followers.newmsg.$router.push({
          path: "/checkout",
          query: query
        });
      } else {
        this.$router.push({
          path: "/checkout",
          query: query
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@include animateSteps(3);
//@include animatefloat(20px,-30px,1);
.buy-followers {
  .content-title {
    .gifts {
      font: normal normal 500 14px/18px Montserrat;
      color: #ffdf74;
      margin-top: 10px;
    }

    .gifts:before {
      margin-right: 15px;
      content: "";
      display: inline-block;
      width: 20px;
      height: 20px;
      background: url("~@/assets/images/user-center/user-center__icon_giftbox.svg")
        no-repeat center;
      background-size: contain;
      vertical-align: middle;
    }
  }
}

.buy-followers.next {
  height: 537px !important;

  .ins-info-container {
    margin-top: 0;
  }

  .content {
    .content-detail {
      padding-top: 24px;
    }
  }
}

.follower-ammo {
  -webkit-animation: follower-ammo-anim 9s cubic-bezier(0.4, 0, 0.2, 1) infinite;
  animation: follower-ammo-anim 9s cubic-bezier(0.4, 0, 0.2, 1) infinite;
}

@-webkit-keyframes follower-ammo-anim {
  40% {
    -webkit-animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transform: translateY(40px) rotate(-1deg);
  }
}

@keyframes follower-ammo-anim {
  40% {
    -webkit-animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transform: translateY(40px) rotate(-1deg);
  }
}

.home-followers {
  position: relative;
  text-align: center;
  background: linear-gradient(180deg, #eeeeff 0%, #ffffff 100%) top center
    no-repeat;
  background-size: 100% 40%;

  &:before {
    position: absolute;
    right: 0;
    top: 0;
    width: 1343px;
    height: 355px;
    content: "";
    background: url("~@/assets/images/home/home-2-follower/follower-bg.svg")
      no-repeat top right;
    background-size: contain;
  }

  h2 {
    position: relative;
    z-index: 1;
    padding-top: 100px;
    font: 700 44px Montserrat;
    color: #40474f;
  }

  .round01 {
    position: absolute;
    display: block;
    width: 102px;
    height: 102px;
    top: 207px;
    left: -125px;
    background-image: url("~@/assets/images/home/home-2-follower/circle1.svg");
  }

  .round02 {
    position: absolute;
    display: block;
    width: 39px;
    height: 39px;
    top: 187px;
    left: 330px;
    background-image: url("~@/assets/images/home/home-2-follower/circle2.svg");
  }

  .round03 {
    position: absolute;
    display: block;
    width: 30px;
    height: 30px;
    top: 38px;
    left: 606px;
    background-image: url("~@/assets/images/home/home-2-follower/circle3.svg");
  }

  .round04 {
    position: absolute;
    display: block;
    width: 172px;
    height: 172px;
    top: 41px;
    right: -184px;
    background-image: url("~@/assets/images/home/home-2-follower/circle4.svg");
  }

  .line {
    position: absolute;
    display: block;
    width: 156px;
    height: 52px;
    top: 127px;
    right: -70px;
    background-image: url("~@/assets/images/home/home-2-follower/line.svg");
  }

  .content {
    display: flex;
    width: 1060px;
    justify-content: space-between;
    margin: 0 auto;

    .follower-box {
      width: 455px;
      height: 715px;
      margin-top: 105px;
      background: #fff;
      box-shadow: 0 10px 20px #00000029;
      border-radius: 12px;

      h3 {
        height: 60px;
        color: #fff;
        font: 500 24px/60px Montserrat;
        border-radius: 12px 12px 0 0;
        background: linear-gradient(90deg, #7c56ff 0%, #6666ff 100%);
      }

      .free-message {
        color: #40474f;

        h4 {
          padding-top: 32px;
          font: 700 28px/30px Montserrat;
          color: #6666ff;

          &.big {
            font: 700 40px/43px Montserrat;
          }
        }

        p {
          margin-top: 8px;
          font: 600 20px Montserrat;
        }
      }

      .home-2-follower__text_btn,
      .home-2-follower-btn {
        display: block;
        width: 340px;
        height: 56px;
        margin: 0 auto;
      }

      .home-2-follower__text_btn {
        margin-top: 32px;
      }

      .home-2-follower-btn {
        margin-top: 24px;
      }

      ul {
        margin-top: 54px;

        li {
          position: relative;
          height: 48px;
          padding-left: 70px;
          text-align: left;
          color: #2a2a2a;
          font: 500 16px/48px Montserrat;

          &:nth-child(odd) {
            background-color: #f9f9f9;
          }

          &:after {
            position: absolute;
            content: "";
            width: 24px;
            height: 24px;
            left: 24px;
            top: 13px;
            background-repeat: no-repeat;
            background-position: center;
            background-size: contain;
            background-image: url("~@/assets/images/home/home-2-follower/icon_feature_ok.svg");
          }
        }
      }

      &.buy-box {
        height: 840px;

        .select-content {
          margin-top: 24px;
          padding: 0 58px;
          width: 100%;
          height: 60px;

          &:last-child {
            margin-top: 12px;
          }
        }
      }
    }
  }
}

.buy-followers {
  .content {
    .content-title h2 {
      margin: 0;
    }

    .compact-p {
      margin-bottom: 0 !important;
    }
  }
}

@media (max-width: 768px) {
  .home-followers {
    height: auto;
    overflow: hidden;

    &:before {
      width: 1343px;
      height: 355px;
    }

    .home__sec_h2 {
      padding-top: 55px;
      margin-bottom: 50px;
      font-size: 22px;
    }

    .home-2-follower__text_btn {
      width: 626/2px;
      height: 112/2px;
    }

    .round01 {
      width: 60px;
      height: 60px;
      background-repeat: no-repeat;
      background-position: center;
      background-size: contain;
      top: 0;
      right: 5px;
      left: inherit;
    }

    .round02 {
      top: 10px;
      left: 8px;
      width: 20px;
      height: 20px;
      background-repeat: no-repeat;
      background-position: center;
      background-size: contain;
    }

    .line {
      display: none;
    }

    .content {
      width: 95%;
      padding-bottom: 40px;
      display: block;

      .list-mob {
        width: 95%;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;

        li {
          height: 50px;
          width: 48%;
          background: #7c56ff;
          border-radius: 12px 12px 0 0;
          font-size: 14px;
          line-height: 50px;
          color: #fff;
          font-weight: 500;
          cursor: pointer;

          &.active {
            background: #ffffff;
            color: #005fff;
            font-weight: 600;
          }
        }
      }

      .follower-box {
        display: none;
        width: 100%;
        padding-bottom: 20px;
        height: auto !important;
        margin-top: 0;
        border-radius: 12px;
        box-shadow: 0 5px 10px #b3cbef;

        .free-message {
          h4 {
            padding-top: 55px;
            font-size: 32px;
            color: #6666ff;
          }

          p {
            font-size: 16px;
          }
        }

        ul {
          margin-top: 25px;

          li {
            height: 35px;
            padding-left: 65px;
            line-height: 35px;
            font-size: 14px;

            &:after {
              width: 18px;
              height: 18px;
              top: 8px;
            }
          }
        }

        .home-2-follower__text_btn,
        .home-2-follower-btn {
          width: 80%;
        }

        .home-2-follower__text_btn {
          margin-top: 55px;
        }

        .home-2-follower-bt {
          margin-top: 24px;
        }

        &.step-2 {
          .free-message {
            h4 {
              font-size: 16px;
            }

            .select-content {
              padding: 0 4vw;
              height: 40px;
            }
          }
        }

        &.active {
          display: block;
        }
      }
    }
  }
  .buy-followers {
    .content-title {
      height: 125px !important;
    }

    i.close {
      width: 30px;
      height: 30px;
      top: 10px;
      right: 10px;
    }

    .ins-info-container {
      margin-top: 0 !important;

      img {
        width: 56px;
        height: 56px;
      }
    }

    .btn {
      width: 90%;
      margin: auto;
    }

    .compact {
      p.compact-p {
        margin-top: 26px;
      }
    }
  }
  .buy-followers.next {
    height: 400px !important;
  }
}
</style>

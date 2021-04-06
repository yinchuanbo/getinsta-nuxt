<template>
  <div
    v-if="modelBoxBuyShow"
    class="uni-dialog-box"
    :class="{ 'enter-box': enterBox, 'enter-mask': enterMask }"
  >
    <div class="mask"></div>
    <div
      class="container buy-followers"
      :class="{ next: myInsUser.ins_id, nexttwo: tipsShow }"
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

          <p v-if="followers.gives !== undefined && followers.gives[0].type === 1" class="gifts">
            {{ followers.gives[0].quantity }} likes gratuits
          </p>
          <p v-if="followers.gives !== undefined && followers.gives[0].type === 2" class="gifts">
            {{ followers.gives[0].quantity }} followers gratuits
          </p>
        </div>
        <div class="content-detail">
          <div
            v-if="myInsUser.ins_id"
            class="ins-info-container compact"
            :class="{ on: myInsUser.ins_id }"
          >
            <img :src="myInsUser.profile_pic_url" alt="avatar" />
            <h3>{{ myInsUser.ins_account }}</h3>
            <p class="compact-p">
              <span>
                <b>{{ myInsUser.post.post_count | numberAbbreviations }}</b>
                <i>{{ thisVue.$t('global.instagramConcept.posts') }}</i>
              </span>
              <span>
                <b>{{ myInsUser.follow | numberAbbreviations }}</b>
                <i>{{ thisVue.$t('global.instagramConcept.following') }}</i>
              </span>
              <span>
                <b>{{ myInsUser.followed_by | numberAbbreviations }}</b>
                <i>{{ thisVue.$t('global.instagramConcept.followers') }}</i>
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
import ButtonYellowIcon from '@/components/button/button-yellow-icon';

export default {
  name: 'BuySelect',
  components: {
    ButtonYellowIcon
  },
  filters: {
    numToFixed(num) {
      if (typeof num === 'number') return num.toFixed(2);
      else return parseFloat(num).toFixed(2);
    },
    numberAbbreviations(num) {
      let numFormatted = 0;

      if (Math.pow(10, 12) <= num && num < Math.pow(10, 15)) {
        numFormatted = (num / Math.pow(10, 12)).toFixed(1) + 'T';
        return numFormatted;
      }
      if (Math.pow(10, 9) <= num && num < Math.pow(10, 12)) {
        numFormatted = (num / Math.pow(10, 9)).toFixed(1) + 'B';
        return numFormatted;
      }
      if (Math.pow(10, 6) <= num && num < Math.pow(10, 9)) {
        numFormatted = (num / Math.pow(10, 6)).toFixed(1) + 'M';
        return numFormatted;
      }
      if (Math.pow(10, 3) <= num && num < Math.pow(10, 6)) {
        numFormatted = (num / Math.pow(10, 3)).toFixed(1) + 'K';
        return numFormatted;
      }
      if (num < Math.pow(10, 3)) {
        numFormatted = num;
        return numFormatted;
      }
    }
  },
  props: {
    thisVue: {
      type: Object,
      default: null,
      require: true
    },
    followers: {
      type: Object,
      default: null
    },
    myInsUser: {
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
    isRouter: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      searchInsLoading: false,
      searchInsInput: '',
      tipsShow: false,
      modelBoxBuyBtnText: 'Buy Now',
      productPkgListDailyVM: []
    };
  },
  methods: {
    modelBoxPrevStep() {
      this.modelBoxBuyBtnText = 'Buy Now';
      this.insUser = {};
      if (this.searchInsInput === '') {
        this.tipsShow = false;
      }
    },
    modelBoxClose() {
      this.tipsShow = false;
      this.$emit('closebox', false);
    },
    btnActionSearchAndBuy() {
      if (this.myInsUser.ins_id) {
        this.addToCart();
      }
    },
    addToCart() {
      let param = {
        ins_id: this.myInsUser.ins_id,
        ins_account: this.myInsUser.ins_account
      };

      param.task_type = 2;
      param.product_id = this.followers.product_id;
      param.purchase_quantity = this.followers.purchase_quantity;
      param.price_decimal = this.followers.price_decimal;

      param.gives = this.followers['gives'];
      param.follow_pic_url = this.myInsUser.profile_pic_url;
      param.post_count = this.myInsUser.post.post_count;
      param.follower_count = this.myInsUser.followed_by;
      param.following_count = this.myInsUser.follow;
      param.cycle_type = this.followers.cycle_type;

      this.transportCartUnitData(param);

      // GA
      if (this.isRouter) {
        this.$ga.event('insbuy', 'buy', `daily-buy-f`);
      } else {
        this.$ga.event(
          'insbuy',
          'buy',
          `dailyfbuy-${this.followers.newmsg.blogID}`
        );
      }
    },
    transportCartUnitData(param) {
      const thisVue = this.thisVue;
      this.$storage.set('cartUnit', param);

      const query = this.COMMON.envTest() ? { env_test: '1' } : {};
      if (this.followers.newmsg) {
        thisVue.$nuxt.$router.push({ path: '/checkout', query: query });
      } else {
        thisVue.$nuxt.$router.push({ path: '/checkout', query: query });
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
      background: url("~@/views/user-center/img/user-center__icon_giftbox.svg") no-repeat center;
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

<template>
  <div class="BlogBuy">
    <div class="title-content">
      <h2>Buy Instagram Daily Likes</h2>
      <p>Get Instagram likes every day</p>
    </div>
    <div class="buy-content">
      <transition name="fade-skeleton" mode="out-in">
        <div v-if="!productPkgListLoading" class="buy-content-container">
          <label class="cycle days">
            <select v-model="productPkgListDaysVM" name="offer-daily" class="package changed blogbuySelect Selectone">
              <option v-for="(item, i) in productPkgListDays" :key="i" :value="item">
                {{ item }}-Day Subscription
              </option>
            </select>
          </label>
          <label class="cycle daily">
            <select v-model="productPkgListDailyVM" name="offer-daily" class="package changed blogbuySelect">
              <option v-for="(item, i) in productPkgListDaily" :key="i" :value="item">
                {{ item.dailyQuantity }} Likes/Day
                (${{ (item.price_decimal / item.cycle_type).toFixed(2) }})
              </option>
            </select>
          </label>
        </div>
        <div v-if="productPkgListLoading" class="skeletonbox">
          <div v-for="i in 2" :key="i" class="package skeleton">
            <span class="num"><span class="s skeleton-bg"></span></span>
            <!-- <span class="coins"><span class="s skeleton-bg"></span></span> -->
          </div>
        </div>
      </transition>

      <div class="control-search_ins">
        <label>
          <input
            v-model="searchInsInput" type="text"
            :placeholder="'Your Instagram Username'"
          >
        </label>
        <div class="search_btn" @click="searchUsername">
          <button-purple text="Continue" sharp font-size="size-16" :loading="searchInsLoading" :watermelcolor="buybtnColor" />
        </div>
      </div>
    </div>

    <!-- 购买弹框 -->
    <BuySelect
      :tabindex="tabsIndex"
      :model-box-buy-show="buyPopshow"
      :enter-mask="entermask"
      :followers="follerList"
      :enter-box="enterbox"
      :my-ins-user="insUser"
      :this-vue="sendThis"
      :is-followers="false"
      @closebox="closeBuyPop"
    />
  </div>
</template>

<script>
import apiAccount from '~/api/api.account';
import apiInsServer from '~/api/api.ins.server';
import ButtonPurple from '~/components/button/button-purple';
import BuySelect from '@/components/popup-layer/buy-select/buy-select.vue';

export default {
  name: 'BlogBuy',
  components: {
    ButtonPurple,
    BuySelect
  },
  props: {
    sendThis: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      searchInsInput: '',
      searchInsLoading: false,
      productPkgListLoading: false,
      buybtnColor: true,
      tabsIndex: false,
      buyPopshow: false,
      entermask: false,
      enterbox: false,
      follerList: null,
      productPkgListDailyVM: [],
      productPkgListDaysVM: [],
      productPkgListDays: [],
      productPkgListDaily: [],
      pkgListWithUnit: [],
      insUser: {},
      postListInfo: {
        post_count: 0,
        end_cursor: '',
        has_next_page: false,
        page_size: 12
      }
    };
  },
  watch: {
    productPkgListDaysVM(val) {
      this.productPkgListDaily = this.pkgListWithUnit.filter(item => item.cycle_type === val);
      this.productPkgListDailyVM = this.productPkgListDaily[0];
    }
  },
  mounted() {
    this.getPkgList();
  },
  methods: {
    getPkgList() {
      if (this.productPkgListLoading) return;
      this.productPkgListLoading = true;
      this.sendThis.$nuxt.$axios.$post(
        `${apiAccount.appConfig}?origin=web`,
        this.COMMON.paramSign({
          client_lan: 'en',
          cycle_product_enable: true
        })
      ).then((response) => {
        this.productPkgListLoading = false;

        if (response.product && response.product.list) {
          this.renderProductPkgList(response.product.list);

        } else {
          this.sendThis.$alert('', 'error', 'Oops',
            'Requesting Offer List failed, please try later.',
            '', 'Close');
        }

        setTimeout(() => {
          this.enterFirstTime = false;
        }, 1000);
      }).catch((error) => {
        this.productPkgListLoading = false;
        this.dialogFailMsg = '<samp>'
          + '<b>Error Status:</b> ' + error.status
          + '<br>' + '<b>Error Message:</b> ' + error.statusText
          + '</samp>';
        this.dialogFail = true;
        console.error('Catch Error: getPkgList', error);
      });
    },
    renderProductPkgList(pkgList) {
      this.productPkgList = pkgList;
      this.$storage.set('productPkgList', pkgList);

      this.$nextTick(() => {
        setTimeout(() => {
          // this.renderPkgListHighlight();
        }, 500);
      });

      this.renderPkgListWithUnit(pkgList);
    },
    // 生成周期循环offer独立数组
    renderPkgListWithUnit(pkgList) {
      pkgList.map(item => {
        if (item['cycle_type'] > 1 && item.product_type === 2) {
          item.dailyQuantity = item['purchase_quantity'];
          this.pkgListWithUnit.push(item);
        }
      });
      // this.renderPkgListDaily();
      this.renderPkgListDays();
    },
    // 生成Daily Select数组（Offer选择）
    renderPkgListDaily() {
      const res = new Map();
      this.productPkgListDaily = this.pkgListWithUnit.filter((a) =>
        !res.has(a.dailyQuantity) && res.set(a.dailyQuantity, 1));
      this.productPkgListDailyVM = this.productPkgListDaily[0];
    },
    // 生成Days Select数组（周期选择）
    renderPkgListDays() {
      this.productPkgListDays = [...new Set(this.pkgListWithUnit.map(item => item.cycle_type))];
      this.productPkgListDaysVM = this.productPkgListDays[0];
    },
    searchUsername: function () {
      this.$ga.event(
        'buttonclick',
        'click',
        `dailyl-continue-${this.sendThis.blogID}`
      );
      this.searchInsByServerV2();
    },
    searchInsByServerV2() {
      if (this.searchInsInput === '') {
        this.sendThis.$alert(
          '', 'warn',
          this.sendThis.$t('store.buy.error.noInsID.title'),
          this.sendThis.$t('store.buy.error.noInsID.text'),
          'normal',
          this.sendThis.$t('global.modelBox.btn.close')
        );
        return;
      }
      if (this.searchInsLoading) return;
      this.searchInsLoading = true;
      this.sendThis.$nuxt.$axios.$post(
        apiInsServer.getAccountByUsername,
        this.COMMON.paramSign({ ins_account: this.searchInsInput })
      ).then((response) => {
        this.searchInsLoading = false;
        this.searchStatus = true;

        if (response.status !== 'ok') {
          this.sendThis.$alert(
            '', 'error',
            this.sendThis.$t('global.modelBox.title.oops'),
            this.sendThis.$t('store.buy.error.errorInsID.text'),
            'normal',
            this.sendThis.$t('global.modelBox.btn.close')
          );
          return;
        }

        const _sharedDataUser = response.content['graphql']['user'];
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

        // 传给子组件
        if (this.insUser.ins_id) {
          this.buyPopshow = true;
          setTimeout(() => {
            this.enterbox = true;
          }, 10);
          setTimeout(() => {
            this.entermask = true;
          }, 310);
          this.productPkgListDailyVM.newmsg = this.sendThis;
          if (this.productPkgListDailyVM) this.follerList = this.productPkgListDailyVM;
          // console.log("blog-buy-this",this)
          // console.log("recivethis",this.follerList)
        }


      }).catch((error) => {
        this.searchInsLoading = false;
        this.sendThis.$alert(
          '', 'error',
          this.sendThis.$t('global.modelBox.title.oops'),
          this.sendThis.$t('store.buy.error.errorRequest.text'),
          'normal',
          this.sendThis.$t('global.modelBox.btn.close')
        );
        console.error('Catch Error: searchIns: ', error);
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
    closeBuyPop() {
      this.enterbox = false;
      setTimeout(() => {
        this.entermask = false;
      }, 300);
      setTimeout(() => {
        this.buyPopshow = false;

      }, 600);
      this.searchInsInput = '';
    }
  }
};
</script>

<style lang="scss" scoped>
.BlogBuy {
  padding-left: 370px;
  padding-right: 26px;
  width: 760px;
  height: 363px;
  color: #fff;
  background: url("./img/bg.svg") center no-repeat;
  background-size: cover;
  text-align: center;
  border-radius: 12px;
  font-size: 0;
  overflow: hidden;

  .title-content {
    padding-top: 40px;
    height: 108px;
    border: none;

    h2 {
      font: 600 28px/34px Montserrat;
    }

    p {
      font: 500 14px/18px Montserrat;
      padding-top: 0;
    }
  }

  .buy-content {
    margin-top: 33px;
    width: 100%;
    height: 52px;
    border-radius: 0 0 12px 12px;
    border-top: none;

    .blogbuySelect {
      width: 100%;
      height: 52px;
      border: none;
      border-radius: 6px;
      background: #FFF;
      margin-bottom: 16px;
    }

    .blogbuySelect.Selectone {
    }

    .skeletonbox {
      .skeleton {
        margin-bottom: 24px;
        width: 35%;
        height: 60px;
        display: inline-block;
        cursor: default;

        span.s {
          display: inline-block;
          width: 100%;
          height: 60px;
        }

        span.num {
          width: 34%;
        }

        span.likes {
          width: 26%;
        }

        span.coins {
          width: 20%;
        }

        &:hover {
          box-shadow: 0 3px 6px rgba(0, 0, 0, 0.06);
        }
      }

      .skeleton:first-child {
        margin-right: 30px;
      }
    }

    .control-search_ins {
      margin-top: 0;
      width: 100%;
      height: 52px;
      background: #FFFFFF;
      border-radius: 6px;

      label {
        width: 67%;
        border: none;
        border-radius: 6px 0 0 6px;

        input {
          width: 100%;
          padding-left: 16px;
          background: #fff;
          outline: none;
          border: none !important;
          padding-right: 0;
          font: 500 14px/60px Montserrat;
        }
      }
    }

    .search_btn {
      width: 33%;
      border-radius: 0 6px 6px 0;
    }
  }
}

@media (max-width: 768px) {
  .BlogBuy {
    padding: 0 16px;
    width: 100%;
    height: 310px;
    background-image: url("./img/bg-m.svg");

    .title-content {
      padding-top: 38px;
      width: 100%;
      height: auto;

      h2 {
        margin-bottom: 0;
        font: 600 26px/38px Montserrat;
      }

      p {
        margin: 0;
        font: 500 14px/20px Montserrat;
      }
    }

    .buy-content {
      margin: 20px 0 0;
      padding: 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: auto;

      .buy-content-container {
        width: 100%;
      }

      .blogbuySelect {
        height: 44px;
      }

      .blogbuySelect.Selectone {
        margin-right: 0;
        margin-bottom: 12px;
      }

      .skeletonbox {
        width: 100%;

        .skeleton {
          margin: auto;
          width: 74%;
          height: 44px;
          cursor: default;
          display: block;
          text-align: center;

          span.s {
            display: inline-block;
            width: 100%;
            height: 44px;
          }

          span.num {
            width: 34%;
          }

          span.likes {
            width: 26%;
          }

          span.coins {
            width: 20%;
          }

          &:hover {
            box-shadow: 0 3px 6px rgba(0, 0, 0, 0.06);
          }
        }

        .skeleton:first-child {
          margin: auto auto 12px;
        }

        .skeleton:last-child {
          margin-bottom: 24px;
        }
      }

      .control-search_ins {
        width: 100%;
        height: 44px;

        label {

          input {
            padding-left: 8px;
            font: 500 12px/44px Montserrat;
          }
        }
      }
    }
  }
}
</style>

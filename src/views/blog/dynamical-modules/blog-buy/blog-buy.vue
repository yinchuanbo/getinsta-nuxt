<template>
  <div class="BlogBuy">
    <div class="title-content">
      <h2>Buy Instagram Daily Followers</h2>
      <p>Get Instagram followers every day</p>
    </div>
    <div class="buy-content">
      <transition name="fade-skeleton" mode="out-in">
        <div v-if="!productPkgListLoading">
          <label class="cycle days">
            <select v-model="productPkgListDaysVM" name="offer-daily" class="package changed blogbuySelect Selectone">
              <option v-for="(item, i) in productPkgListDays" :key="i"
                      :value="item"
              >{{ item }}-Day Subscription
              </option>
            </select>
          </label>
          <label class="cycle daily">
            <select v-model="productPkgListDailyVM" name="offer-daily" class="package changed blogbuySelect">
              <option
                v-for="(item, i) in productPkgListDaily" :key="i"
                :value="item"
              >{{ item.dailyQuantity }} Followers/Day (${{ (item.price_decimal / item.cycle_type).toFixed(2) }})
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
          <button-purple text="Continue" :sharp="true" :loading="searchInsLoading" :watermelcolor="buybtnColor" />
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
          this.$alert('', 'error', 'Oops',
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
        if (item['cycle_type'] > 1 && item.product_type === 1) {
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
        `dailyf-${this.sendThis.blogID}`
      );
      this.searchInsByServerV2();
    },
    searchInsByServerV2() {
      if (this.searchInsInput === '') {
        this.$alert(
          '', 'warn',
          this.$t('store.buy.error.noInsID.title'),
          this.$t('store.buy.error.noInsID.text'),
          'normal',
          this.$t('global.modelBox.btn.close')
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
          this.$alert(
            '', 'error',
            this.$t('global.modelBox.title.oops'),
            this.$t('store.buy.error.errorInsID.text'),
            'normal',
            this.$t('global.modelBox.btn.close')
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
        this.$alert(
          '', 'error',
          this.$t('global.modelBox.title.oops'),
          this.$t('store.buy.error.errorRequest.text'),
          'normal',
          this.$t('global.modelBox.btn.close')
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
  width: 800px;
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  text-align: center;
  color: #fff;

  .title-content {
    flex: 0 0 108px;
    height: 108px;
    background: transparent linear-gradient(90deg, #FFA087 0%, #8E56FF 100%) 0% 0% no-repeat padding-box;
    border-radius: 12px 12px 0px 0px;
    border: none;
    padding-top: 24px;

    h2 {
      font: 600 28px/34px Montserrat;
    }

    p {
      font: 500 14px/18px Montserrat;
      padding-top: 0px;
    }
  }

  .buy-content {
    flex: 1;
    border: 1px solid #DFDFDF;
    border-radius: 0px 0px 12px 12px;
    border-top: none;
    padding: 64px 0px 64px 0px;

    .blogbuySelect {
      width: 280px;
      height: 60px;
      border: 2px solid #E7E7E7;
      border-radius: 6px;
      background: #FFF;
      margin-bottom: 24px;
    }

    .blogbuySelect.Selectone {
      margin-right: 32px;
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
      margin-top: 0px;
      width: 74%;
      height: 64px;
      background: #FFFFFF 0% 0% no-repeat padding-box;
      border-radius: 6px;

      label {
        width: 67%;
        border: 2px solid #E0E1E6;
        border-right: none;
        border-radius: 6px 0px 0px 6px;

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
    width: 100%;

    .title-content {
      flex: 0 0 90px;
      height: 90px;

      h2 {
        font: 600 16px/20px Montserrat;
      }

      p {
        font: 500 12px/15px Montserrat;
      }
    }

    .buy-content {
      padding: 44px 0px 56px 0px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

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
          margin: auto;
          margin-bottom: 12px;
        }

        .skeleton:last-child {
          margin-bottom: 24px;
        }
      }

      .control-search_ins {
        width: 280px;
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

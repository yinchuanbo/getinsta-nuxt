<template>
  <div class="eastersale-alert">
    <div class="eastersale-alert_content">
      <div class="eastersale-alert_content_title">
        <div class="eastersale-alert_content_title_con-close" @click="close"></div>
        <div class="eastersale-alert_content_title_con">
          <span class="num">{{ currentProduct.pro_num + currentProduct.free_num }}</span>Followers<span
            class="amount"
          >${{ currentProduct.amount }}</span>
        </div>
      </div>
      <div class="eastersale-alert_content_content">
        <p>Confirm Instagram Account</p>
        <input v-model="username" :disabled="showLoading" type="text" name="" value="" placeholder="Your Instagram Username"
               @input="bottomBtnDetective"
        >
        <div v-if="usernameShow" class="eastersale-alert_content_username">
          <div class="eastersale-alert_content_username-avator">
            <img :src="insUser.profile_pic_url || ''" alt="">
          </div>
          <div class="eastersale-alert_content_username-info">
            <div class="eastersale-alert_content_username-info_name">{{ insUser.ins_account }}</div>
            <ul>
              <li>
                <h3>{{ insUser.post.post_count | numberAbbreviations }}</h3>
                <p>Post</p>
              </li>
              <li>
                <h3>{{ insUser.followed_by | numberAbbreviations }}</h3>
                <p>followers</p>
              </li>
              <li>
                <h3>{{ insUser.follow | numberAbbreviations }}</h3>
                <p>Following</p>
              </li>
            </ul>
          </div>
        </div>
        <button v-if="!usernameShow" type="button" name="button" class="btn1" :class="{'btnloading': showLoading }" @click="searchUsername">Confirm</button>
        <button v-if="usernameShow" type="button" name="button" class="btn2" :class="{'btnloading': showLoading }" @click="checkout">Process to Checkout</button>
      </div>
    </div>
  </div>
</template>

<script>
  import apiInsServer from '@/api/api.ins.server';
  export default {
    filters: {
      numToFixed(num) {
        if (typeof num === 'number')
          return num.toFixed(2);
        else
          return parseFloat(num).toFixed(2);
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
    data() {
      return {
        currentProduct: JSON.parse(localStorage.getItem('product')),
        username: '',
        usernameShow: false,
        bottomBtnOn: false,
        productPkgListFollowIndex: -1,
        showLoading: false,
        productPkgCurrentFollow: {},
        insUser: {
          ins_id: null,
          ins_account: null,
          profile_pic_url: null,
          followed_by: null,
          follow: null,
          post: null
        },
        postListInfo: {
          post_count: 0,
          end_cursor: '',
          has_next_page: false,
          page_size: 12
        },
      }
    },
    created() {
      const quantity =  parseInt(JSON.parse(localStorage.getItem('product')).pro_num);
      const price_decimal = parseFloat(JSON.parse(localStorage.getItem('product')).amount);
      const gives_num = parseInt(JSON.parse(localStorage.getItem('product')).free_num);
      const product_id = parseInt(JSON.parse(localStorage.getItem('product')).product_id);
      const original_price_decimal = parseInt(JSON.parse(localStorage.getItem('product')).original_price_decimal);
      this.productPkgCurrentFollow = {
        channel: "",
        // 周期类型
        cycle_type: 1,
        discount: 0,
        // 赠送
        gives: [
          {
            quantity: gives_num,
            type: 2
          }
        ],
        // 原价
        original_price_decimal: original_price_decimal,
        // 支付类型
        payment_type: 2,
        // 价格
        price_decimal: price_decimal,
        // 商品 id
        product_id: product_id,
        // 商品类型
        product_type: 2,
        // 促销类型
        promote_sale_type: 0,
        // 购买数量
        purchase_quantity: quantity,
        // 区域 id
        region_id: 0,
      }
    },
    methods: {
      close() {
        this.$store.commit('showAlert', false);
        this.bottomBtnDetective();
      },
      checkout() {
        this.showLoading = true;
        this.addToCart();
        if(this.currentProduct.pro_num == 500) {
           this.$ga.event('insbuy', 'buy', 'easter-1000-2');
        } else if(this.currentProduct.pro_num == 1000) {
           this.$ga.event('insbuy', 'buy', 'easter-2000-2');
        }
      },
      bottomBtnDetective() {
        this.usernameShow = false;
        this.insUser = {
          ins_id: null,
          ins_account: null,
          profile_pic_url: null,
          followed_by: null,
          follow: null,
          post: null
        }
      },
      searchUsername: function() {
        if(this.showLoading) return;
        this.showLoading = true;
        this.searchInsByServerV2();
      },
      searchInsByServerV2() {
        if (this.username === '') {
          this.showLoading = false;
          this.$alert(
            '', 'warn',
            this.$t('store.buy.error.noInsID.title'),
            this.$t('store.buy.error.noInsID.text'),
            'normal',
            this.$t('global.modelBox.btn.close')
          );
          return;
        };

        if(this.currentProduct.pro_num == 500) {
           this.$ga.event('buttonclick', 'click', 'easter-1000');
        } else if(this.currentProduct.pro_num == 1000) {
           this.$ga.event('buttonclick', 'click', 'easter-2000');
        }

        this.showLoading = true;
        this.axios.post(
          apiInsServer.getAccountByUsername,
          this.COMMON.paramSign({
            ins_account: this.username
          })
        ).then((response) => {
          this.showLoading = false;
          if (response.data.status !== 'ok') {
            this.$alert(
              '', 'error',
              this.$t('global.modelBox.title.oops'),
              this.$t('store.buy.error.errorInsID.text'),
              'normal',
              this.$t('global.modelBox.btn.close')
            );
            return;
          }

          const _sharedDataUser = response.data.content['graphql']['user'];
          const _sharedDataUserPosts = _sharedDataUser['edge_owner_to_timeline_media'];

          this.insUser.ins_id = _sharedDataUser.id;
          this.insUser.ins_account = _sharedDataUser.username;
          this.insUser.profile_pic_url = _sharedDataUser.profile_pic_url;
          this.insUser.followed_by = _sharedDataUser['edge_followed_by']['count'];
          this.insUser.follow = _sharedDataUser['edge_follow']['count'];
          this.insUser.post = this.insPostTransform(_sharedDataUserPosts);

          this.usernameShow = true;

          this.postList = this.insUser.post.post_list;
          this.postListInfo.post_count = this.insUser.post.post_count;
          this.postListInfo.end_cursor = this.insUser.post.end_cursor;
          this.postListInfo.has_next_page = this.insUser.post.post_count > this.postListInfo.page_size;

        }).catch((error) => {
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
      addToCart() {
        let param = {
          'ins_id': this.insUser.ins_id,
          'ins_account': this.insUser.ins_account
        };
        // 关注
        param.task_type = 2;
        param.product_id = this.productPkgCurrentFollow.product_id;
        param.purchase_quantity = this.productPkgCurrentFollow.purchase_quantity;
        param.price_decimal = this.productPkgCurrentFollow.price_decimal || 8.8;
        param.cycle_type = this.productPkgCurrentFollow.cycle_type;
        param.product_type = this.productPkgCurrentFollow.product_type;
        param.gives = this.productPkgCurrentFollow['gives'];
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

        // this.gaBottomBtn();

        // 广告参数
        let adStore = { s: '', c: '', k: '' };
        adStore.s = this.$route.query.s || '';
        adStore.c = this.$route.query.c || '';
        adStore.k = this.$route.query.k || '';
        this.$storage.set('adStore', adStore);

        // console.log(this.$route.path);

        // console.log(1, param);
        // this.initGeoIPWhiteList(param);
        this.transportCartUnitData(param);
      },
      transportCartUnitData(param) {
        // console.log(param);
        this.$storage.set('cartUnit', param);
        // this.$store.commit('cartUnit', param);
        const query = this.COMMON.envTest() ? { env_test: '1' } : {};
        this.showLoading = false;
        this.$router.push({ path: '/checkout', query: query });
      },
    }
  }
</script>

<style lang="scss" scoped>
  .eastersale-alert {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background: rgba(0, 0, 0, .5);
    // opacity: 0.38;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;

    .eastersale-alert_content {
      width: 375px;
      height: auto;
      padding-bottom: 20px;
      background: #FFFFFF 0% 0% no-repeat padding-box;
      box-shadow: 0px 12px 24px #00000029;
      border-radius: 12px;
      opacity: 1;
      display: flex;
      flex-direction: column;

      .eastersale-alert_content_title {
        height: 86px;
        background: transparent linear-gradient(90deg, #F16485 0%, #FFA1A1 100%) 0% 0% no-repeat padding-box;
        border-radius: 12px 12px 0px 0px;
        opacity: 1;
        position: relative;

        .eastersale-alert_content_title_con-close {
          position: absolute;
          top: 8px;
          right: 8px;
          width: 32px;
          height: 32px;
          background: url("./images/close.svg") no-repeat;
          background-size: 100% 100%;
          cursor: pointer;
        }

        .eastersale-alert_content_title_con {
          width: 289px;
          height: 52px;
          background: red;
          opacity: 1;
          margin-top: 18px;
          margin-left: 54px;
          background: url("./images/flowers_top.svg") no-repeat;
          background-size: 100% 100%;
          text-align: center;
          font: normal normal 600 18px/52px BalooChettan;
          letter-spacing: 0px;
          color: #FFFFFF;
          opacity: 1;

          .num {
            margin-right: 5px;
          }

          .amount {
            margin-left: 5px;
          }

        }
      }

      .eastersale-alert_content_content {
        flex: 1;
        padding: 0 16px;
        box-sizing: border-box;

        p {
          text-align: center;
          font: normal normal 600 14px/20px BalooChettan;
          letter-spacing: 0px;
          color: #7F8498;
          opacity: 1;
          margin: 20px 0 6px 0;
        }

        input {
          width: 100%;
          height: 56px;
          box-sizing: border-box;
          font: normal normal 400 14px/56px BalooChettan;
          letter-spacing: 0px;
          color: #B4B4B4;
          opacity: 1;
        }

        .eastersale-alert_content_username {
          width: 100%;
          height: 80px;
          margin: 23px 0 13px 0;
          display: flex;
          align-items: center;

          .eastersale-alert_content_username-avator {
            width: 56px;
            height: 56px;
            border-radius: 100%;
            margin-right: 30px;
            img {
              width: 100%;
              height: 100%;
              border-radius: 100%;
            }
          }

          .eastersale-alert_content_username-info {
            flex: 1;
            display: flex;
            flex-direction: column;

            ul {
              display: flex;
              width: 100%;

              li {
                width: 20%;

                h3 {
                  text-align: center;
                  font: normal normal 600 18px/18px BalooChettan;
                  letter-spacing: 0px;
                  color: #7F8498;
                  opacity: 1;
                }

                p {
                  font: normal normal 400 12px/25px BalooChettan;
                  letter-spacing: 0px;
                  color: #7F8498;
                  opacity: 1;
                  margin: 0;
                }

                &:nth-child(1) {

                  h3,
                  p {
                    text-align: left;
                  }
                }

                &:nth-child(2) {
                  margin-right: 10%;
                }
              }
            }

            .eastersale-alert_content_username-info_name {
              font: normal normal 600 20px/25px BalooChettan;
              letter-spacing: 0px;
              color: #000000;
              opacity: 1;
              margin-bottom: 10px;
            }
          }
        }

        .btn1.btnloading::before {
          position: absolute;
          content: '';
          width: 50px;
          height: 50px;
          top: 50%;
          transform: translateY(-50%);
          left: 27%;
          background: url("~@/assets/images/global/loading-puff-white.svg") no-repeat center;
          background-size: contain;
        }

        .btn2.btnloading::before {
          position: absolute;
          content: '';
          width: 50px;
          height: 50px;
          top: 50%;
          transform: translateY(-50%);
          left: 15%;
          background: url("~@/assets/images/global/loading-puff-white.svg") no-repeat center;
          background-size: contain;
        }


        button {
          width: 100%;
          height: 56px;
          background: transparent linear-gradient(90deg, #FEB85C 0%, #FF7347 100%) 0% 0% no-repeat padding-box;
          box-shadow: 0px 6px 12px #FF7F2A3D;
          border-radius: 8px;
          opacity: 1;
          font: normal normal 600 16px/56px BalooChettan;
          letter-spacing: 0px;
          color: #FFFFFF;
          opacity: 1;
          cursor: pointer;
          margin-top: 10px;
          position: relative;
        }
      }
    }
  }

  @media (max-width: 769px) {
    .eastersale-alert {
      .eastersale-alert_content {
        width: 100% !important;
      }
    }
  }
</style>

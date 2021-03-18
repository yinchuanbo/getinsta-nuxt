<template>
  <div ref="mark" :class="{ 'on': animateBegin }" class="home-2-daily-follower">
    <div class="wrapper">
      <h2 class="home__sec_h2 step-0"><i>Get</i><br><span>Instagram Followers</span></h2>
      <i class="arrow step-1"></i>

      <!--Tabs-->
      <div class="content step-2">
        <!--Tab-1-->
        <div class="follower-box">
          <div class="badge free"></div>

          <div class="follower-box-wrapper">
            <h3>Get Free Followers</h3>

            <div class="free-message">
              <h4 class="big">$0</h4>
              <p>Unlimited & Forever Free</p>

              <!--btn-->
              <div class="home-2-follower__text_btn pc" @click="gaLeftBtn">
                <button-icon-ins class="button-hover-2" theme="transparent-black" text="Get Free Followers Now" square :icon="'ins'" font-size="size-15" />
              </div>
            </div>

            <ul>
              <li>Gain Real-time Followers</li>
              <li>Earn Coins on App</li>
              <li>Deliver within 24 Hours</li>
              <li>Real Followers, No Bots!</li>
              <li>No Password, No Verification</li>
              <li>Profile Must Be Public</li>
            </ul>

            <!--btn-->
            <div id="home-2-0" class="home-2-follower__text_btn mobile" @click="gaLeftBtn">
              <button-icon-ins theme="gradiant" text="Get Free Followers Now" square shadow :icon="'ins'" font-size="size-15" />
            </div>
          </div>

          <div class="round01 ammo-move-d1s"></div>
          <div class="round02 ammo-move"></div>
        </div>
        <!--Tab-2-->
        <div class="follower-box buy-box">
          <div class="badge off"></div>

          <div class="follower-box-wrapper">
            <h3>Get Daily Followers</h3>

            <div class="free-message deep-color">
              <h4>
                ${{ productPkgListDailyVM.price_decimal / productPkgListDailyVM.cycle_type | numToFixed }}
                <b> / day</b>
              </h4>
              <div class="select-content">
                <label class="cycle days">
                  <select v-model="productPkgListDaysVM" name="offer-daily" class="package pc changed">
                    <option v-for="(item, i) in productPkgListDays" :key="i" :value="item">{{ item }}-Day</option>
                  </select>
                  <select v-model="productPkgListDaysVM" name="offer-daily" class="package mobile changed">
                    <option v-for="(item, i) in productPkgListDays" :key="i"
                            :value="item"
                    >{{ item }}-Day
                    </option>
                  </select>
                </label>
              </div>
              <div class="select-content second">
                <label class="cycle daily">
                  <select v-model="productPkgListDailyVM" name="offer-daily" class="package pc changed">
                    <option
                      v-for="(item, i) in productPkgListDaily" :key="i"
                      :value="item"
                    >{{ item.dailyQuantity }} Followers / Day
                    </option>
                  </select>
                  <select v-model="productPkgListDailyVM" name="offer-daily" class="package mobile changed">
                    <option
                      v-for="(item, i) in productPkgListDaily" :key="i"
                      :value="item"
                    >{{ item.dailyQuantity }} Followers / Day
                    </option>
                  </select>
                </label>
              </div>

              <!--btn-->
              <div class="home-2-follower-btn" @click="modelBoxOpen">
                <button-yellow-gradient square :text="`Buy Now`" font-size="size-20" class="button-hover-1" />
              </div>
            </div>

            <ul>
              <li>Automatic & Organic</li>
              <li>Gain Real-time Followers</li>
              <li>Follow Back 0 Profiles</li>
              <li>Deliver within 24 Hours</li>
              <li>Plan is 100% Automatic</li>
              <li>Real Followers, No Bots!</li>
              <li>No Password, No Verification</li>
              <li>24/7 Support</li>
            </ul>
          </div>

          <div class="round03 ammo-move"></div>
          <div class="round04 ammo-move-d1s"></div>
        </div>
      </div>
    </div>

    <div v-if="modelBoxBuyShow"
         class="uni-dialog-box"
         :class="{ 'enter-box': enterBox, 'enter-mask': enterMask }"
    >
      <div class="mask"></div>
      <div class="container buy-followers" :class="{ next: insUser.ins_id }">
        <i class="close" @click="modelBoxClose()"></i>
        <div class="content">
          <div class="content-title">
            <h1>
              {{ productPkgListDailyVM.dailyQuantity }} Daily Followers
              ${{ productPkgListDailyVM.price_decimal / productPkgListDailyVM.cycle_type | numToFixed }}
            </h1>
            <h2 style="text-align: center">{{ productPkgListDailyVM.cycle_type }}-Day</h2>
          </div>
          <div class="content-detail">
            <label for="dialog-ins-search">Enter Instagram Account</label>
            <input id="dialog-ins-search"
                   v-model="searchInsInput"
                   type="text" placeholder="Your Instagram Username"
                   @input="modelBoxPrevStep"
            >

            <div v-if="insUser.ins_id" class="ins-info-container compact" :class="{ on: insUser.ins_id }">
              <img :src="insUser.profile_pic_url" alt="avatar">
              <h3>{{ insUser.ins_account }}</h3>
              <p>
                <span>
                  <b>{{ insUser.post.post_count | numberAbbreviations }}</b>
                  {{ $t('global.instagramConcept.posts') }}
                </span>
                <span>
                  <b>{{ insUser.followed_by | numberAbbreviations }}</b>
                  {{ $t('global.instagramConcept.followers') }}
                </span>
                <span>
                  <b>{{ insUser.follow | numberAbbreviations }}</b>
                  {{ $t('global.instagramConcept.following') }}
                </span>
              </p>
              <p class="compact-p">
                <span>
                  <b>{{ insUser.post.post_count | numberAbbreviations }}</b>
                  <i>{{ $t('global.instagramConcept.posts') }}</i>
                </span>
                <span>
                  <b>{{ insUser.followed_by | numberAbbreviations }}</b>
                  <i>{{ $t('global.instagramConcept.followers') }}</i>
                </span>
                <span>
                  <b>{{ insUser.follow | numberAbbreviations }}</b>
                  <i>{{ $t('global.instagramConcept.following') }}</i>
                </span>
              </p>
            </div>

            <div class="btn" @click="btnActionSearchAndBuy()">
              <button-yellow-icon :text="modelBoxBuyBtnText" font-size="size-16" :loading="searchInsLoading" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import apiAccount from '@/api/api.account';
import apiInsServer from '@/api/api.ins.server';
import ButtonYellowIcon from '@/components/button/button-yellow-icon';
import ButtonIconIns from '@/components/button/button-icon-ins';
import ButtonYellowGradient from '@/components/button/button-yellow-gradient';

export default {
  name: 'Home2DailyFollowerV2',
  components: {
    ButtonYellowGradient,
    ButtonIconIns,
    ButtonYellowIcon
  },
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
  props: {
    pageName: {
      type: String,
      required: false,
      default: ''
    }
  },
  data() {
    return {
      animateBegin: false,
      reviewListIndex: 0,
      changeList1: false,
      changeList2: true,

      searchInsLoading: false,
      searchInsInput: '',
      insUser: {},
      productPkgListLoading: false,
      productPkgList: [],
      pkgListWithUnit: [],
      productPkgListDaily: [],
      productPkgListDailyVM: [],
      productPkgListDays: [],
      productPkgListDaysVM: [],

      enterBox: false,
      enterMask: false,
      modelBoxBuyShow: false,
      modelBoxBuyBtnText: 'Continue'
    };
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
      this.productPkgListDaily = this.pkgListWithUnit.filter(item =>
        item.cycle_type === val && item.product_type === 2
      );
      this.productPkgListDailyVM = this.productPkgListDaily[0];
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handle);

    this.getPkgList();
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('scroll', this.handle);
  },
  methods: {
    handleScroll: function () {
      this.animateBegin = this.$refs.mark.getBoundingClientRect().top < window.innerHeight * 0.66;
    },
    handle() {
      const fun = this.handleScroll();
      this.COMMON.throttle(fun, 60, 100);
    },
    change1() {
      this.changeList1 = true;
      this.changeList2 = false;
    },
    change2() {
      this.changeList2 = true;
      this.changeList1 = false;
    },
    getPkgList() {
      if (this.productPkgListLoading) return;

      this.productPkgListLoading = true;

      this.$axios.post(
        `${apiAccount.appConfig}?origin=web`,
        this.COMMON.paramSign({
          client_lan: this.$i18n.locale,
          cycle_product_enable: true
        })
      ).then((response) => {
        this.productPkgListLoading = false;

        if (response.data.product && response.data.product.list) {
          this.renderProductPkgList(response.data.product.list);

          //console.log(response.data.product.list);
        } else {
          this.$alert('', 'error', 'Oops',
            'Requesting Offer List failed, please try later.',
            '', 'Close');
        }
      }).catch((error) => {
        this.productPkgListLoading = false;
        const errorText = '<samp>'
          + '<b>Error Status:</b> ' + error.status
          + '<br>' + '<b>Error Message:</b> ' + error.statusText
          + '</samp>';
        this.$alert('', 'error', 'Oops',
          errorText,
          '', 'Close');
        console.error('Catch Error: getPkgList', error);
      });
    },
    renderProductPkgList(pkgList) {
      this.productPkgList = pkgList;
      this.$storage.set('productPkgList', pkgList);
      this.renderPkgListWithUnit(pkgList);
    },
    // 生成周期循环offer独立数组
    renderPkgListWithUnit(pkgList) {
      pkgList.map(item => {
        if (item['cycle_type'] > 1) {
          item.dailyQuantity = item['purchase_quantity'];
          this.pkgListWithUnit.push(item);
        }
      });
      // this.renderPkgListDaily();
      this.renderPkgListDays();
    },
    // 生成Daily Select数组（Offer选择）（未使用）
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

    gaLeftBtn() {
      if (!this.COMMON.isMobile()) {
        this.$ga.event('inslogin', 'login', `hploginnew3`);
        this.$router.push('/login');
      }
      if (this.COMMON.isiOS()) {
        this.$ga.event('insdl', 'download', `hpiosdlnew3`);
        location.href
          = `${this.$store.state.enIosLink}`
          + `?pt=${this.$store.state.enIosLinkPt}`
          + `&ct=${this.$store.state.enIosLinkCt}`
          + `&mt=8`;
      }
      if (this.COMMON.isAndroid()) {
        this.$ga.event('insdl', 'download', `hpappdlnew3`);
        window.location.href
          = this.$constant.app.download.androidGooglePlay1
          + this.$constant.app.campaign.androidReferrerQuery
          + this.$store.state.enAdrLinkGpReferrer;
      }
    },

    modelBoxOpen() {
      this.modelBoxBuyShow = true;
      setTimeout(() => {
        this.enterBox = true;
      }, 10);
      setTimeout(() => {
        this.enterMask = true;
      }, 310);

      this.$ga.event(
        'insbuy',
        'buy',
        `hp${this.$store.state.platform}buynew3-${this.productPkgListDailyVM.cycle_type}${this.productPkgListDailyVM.dailyQuantity}`
      );
    },
    modelBoxClose() {
      this.enterBox = false;
      setTimeout(() => {
        this.enterMask = false;
      }, 300);
      setTimeout(() => {
        this.modelBoxBuyShow = false;
        this.modelBoxPrevStep();
      }, 600);
    },
    modelBoxPrevStep() {
      this.modelBoxBuyBtnText = 'Continue';
      this.insUser = {};
    },

    btnActionSearchAndBuy() {
      // 调整前
      // if (!this.insUser.ins_id) {
      //   this.searchInsByServerV2();
      //   this.$ga.event('insbuy', 'buy', 'hp-dailybuy-addaccount');
      // } else {
      //   this.addToCart();
      //   // this.$ga.event('insbuy', 'buy', 'hp-dailyfollower-buy');
      //
      //   // btn test
      //   if (this.$store.state.btnTestGate) {
      //     this.$ga.event(
      //       'insbuy',
      //       'buy',
      //       `hp${this.$store.state.platform}dl${this.$store.state.gaColor}3`
      //     );
      //   } else {
      //     this.$ga.event('insbuy', 'buy', 'hp-dailyfollower-buy');
      //   }
      // }

      // 调整后
      this.searchInsByServerV2AndAddToCart();
      // this.$ga.event('insbuy', 'buy', 'hp-dailyfollower-buy');

      // btn test
      // if (this.$store.state.btnTestGate) {
      //   this.$ga.event(
      //     'insbuy',
      //     'buy',
      //     `hp${this.$store.state.platform}dl${this.$store.state.gaColor}3`
      //   );
      // } else {
      //   this.$ga.event('insbuy', 'buy', 'hp-dailyfollower-buy');
      // }
      this.$ga.event('insbuy', 'buy', `hp${this.$store.state.platform}dailyfollowerbuynew`);
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
      this.$axios.post(
        apiInsServer.getAccountByUsername,
        this.COMMON.paramSign({ ins_account: this.searchInsInput })
      ).then((response) => {
        this.searchInsLoading = false;
        this.searchStatus = true;

        this.modelBoxBuyBtnText = 'Buy Now';

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
      }).catch((error) => {
        this.closeDialog();
        this.searchInsLoading = false;
        // this.$alert(
        //   '', 'error', 'Oops',
        //   'Request Instagram Data failed, please try again later.',
        //   'normal', 'Close'
        // );
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
    // 搜索ins后直接跳转checkout
    searchInsByServerV2AndAddToCart() {
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
      if (this.ajaxRequesting) return;
      if (this.searchInsLoading) return;

      this.ajaxRequesting = true;
      this.searchInsLoading = true;
      this.$axios.post(
        apiInsServer.getAccountByUsername,
        this.COMMON.paramSign({ ins_account: this.searchInsInput })
      ).then((response) => {
        this.ajaxRequesting = false;
        this.searchInsLoading = false;
        this.searchStatus = true;

        this.modelBoxBuyBtnText = 'Buy Now';

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

        // 调整后
        this.addToCart();
      }).catch((error) => {
        this.closeDialog();
        this.ajaxRequesting = false;
        this.searchInsLoading = false;
        // this.$alert(
        //   '', 'error', 'Oops',
        //   'Request Instagram Data failed, please try again later.',
        //   'normal', 'Close'
        // );
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

      param.task_type = 2;
      param.product_id = this.productPkgListDailyVM.product_id;
      param.purchase_quantity = this.productPkgListDailyVM.purchase_quantity;
      param.price_decimal = this.productPkgListDailyVM.price_decimal;

      param.gives = this.productPkgListDailyVM['gives'];
      param.follow_pic_url = this.insUser.profile_pic_url;
      param.post_count = this.insUser.post.post_count;
      param.follower_count = this.insUser.followed_by;
      param.following_count = this.insUser.follow;
      param.cycle_type = this.productPkgListDailyVM.cycle_type;
      param.product_type = this.productPkgListDailyVM.product_type;

      // if (this.postList.length > 1) {
      //   param.like_id = this.postList[0].like_id;
      //   param.like_pic_url = this.postList[0].like_pic_url;
      //   param.like_count = this.postList[0].like_count;
      //   param.short_code = this.postList[0].short_code;
      // }

      // console.log(param);
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
      console.log(param);
      this.$storage.set('cartUnit', param);
      // this.$store.commit('cartUnit', param);

      const query = this.COMMON.envTest() ? { env_test: '1' } : {};
      this.$router.push({ path: '/checkout', query: query });
    },

    gaDownloadAPPTest() {
      if (!this.COMMON.isMobile()) {
        this.$ga.event('inslogin', 'login', 'hplogin-freefollowers');
        this.$router.push('/login');
        return;
      }

      let url = '';

      if (this.COMMON.isiOS()) {
        if (this.$store.state.downloadBtnTestA)
          url = this.$constant.app.download.downloadBtnTestAIos;
        if (this.$store.state.downloadBtnTestB)
          url = this.$constant.app.download.downloadBtnTestBIos;
        if (this.$store.state.downloadBtnTestC)
          url = this.$constant.app.download.downloadBtnTestCIos;
      }

      if (this.COMMON.isAndroid()) {
        if (this.$store.state.downloadBtnTestA)
          url = this.$constant.app.download.downloadBtnTestAAdr;
        if (this.$store.state.downloadBtnTestB)
          url = this.$constant.app.download.downloadBtnTestBAdr;
        if (this.$store.state.downloadBtnTestC)
          url = this.$constant.app.download.downloadBtnTestCAdr;
      }

      this.$ga.event(
        'insdl',
        'download',
        `hp${this.$store.state.platform}dl${this.$store.state.gaColor}3`
      );
      location.href = url;
    },
    gaBtnGateDownload() {
      // this.$store.state.btnTestGate ? this.gaDownloadAPPTest() : this.gaLeftBtn();
      this.gaLeftBtn();
    }
  }
};
</script>

<style lang="scss" scoped>
@include animateSteps(3);

.home-2-daily-follower {
  position: relative;
  padding-bottom: 92px;
  text-align: center;
  background: #fff;

  .home__sec_h2 {
    padding-top: 55px;
    font-size: 22px;
    text-align: center;

    i {
      font: normal normal 600 24px/31px BalooChettan;
      color: #7F8498;
      text-transform: uppercase;
    }

    span {
      font: normal normal 700 52px BalooChettan;
      background: linear-gradient(270deg, #FF5C87 0%, #4761FF 100%);
      -webkit-background-clip: text;
      color: transparent;
    }
  }

  h2 {
    position: relative;
    z-index: 1;
    padding-top: 100px;
    font: 700 44px BalooChettan;
    color: #40474F;
    text-align: left;
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
      position: relative;
      width: 455px;
      height: 666px;
      margin-top: 105px;
      border: 1px solid #DFDFDF;
      border-radius: 8px;

      &.buy-box {
        height: 720px;
      }

      .follower-box-wrapper {
        width: 100%;
        height: 100%;
        backdrop-filter: blur(30px);
      }

      h3 {
        height: 60px;
        font: normal normal 600 20px/60px BalooChettan;
        color: #000000;
        border-radius: 12px 12px 0 0;
      }

      .free-message {
        padding-top: 52px;
        padding-bottom: 30px;
        background: transparent linear-gradient(90deg, #DBFFFA 0%, #F7E8FF 100%);

        h4 {
          font: normal normal 500 44px/50px BalooChettan;
          color: #18C981;

          &.big {
            font: 500 56px/82px BalooChettan;
          }
        }

        p {
          font: normal normal 500 16px/31px BalooChettan;
          color: #000000;
        }

        &.deep-color {
          padding-top: 20px;
          padding-bottom: 32px;
          background: linear-gradient(270deg, #A25CFF 0%, #4761FF 100%);

          h4 {
            padding-top: 12px;
            font: normal normal 500 56px/57px BalooChettan;
            color: #FFFFFF;

            b {
              font-size: 20px;
            }
          }

          .select-content {
            margin-top: 12px;
            padding: 0;
            position: relative;
            display: inline-block;
            width: 130px;
            height: 48px;

            &:before {
              content: "";
              position: absolute;
              top: 11px;
              left: 13px;
              z-index: 2;
              display: block;
              width: 23px;
              height: 23px;
              background-size: 23px 18px;
              background-position: center;
              background-repeat: no-repeat;

              background-image: url("./img/icon_clock.svg");
            }

            &.second {
              margin-left: 15px;
              width: 210px;

              &:before {
                background-size: 22px 22px;
                background-image: url("./img/icon_follow.svg");
              }
            }

            select {
              padding: 0 12px 0 42px;
              background: rgb(255, 255, 255, 0.85) url("~@/assets/images/global/icon-arrow-black.svg") no-repeat right 3% center !important;
              box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
            }
          }
        }
      }

      .home-2-follower__text_btn, .home-2-follower-btn {
        display: block;
        width: 292px;
        height: 60px;
        margin: 0 auto;
      }

      .home-2-follower__text_btn {
        margin-top: 32px;
      }

      .home-2-follower-btn {
        margin-top: 32px;
      }

      ul {
        margin-top: 20px;

        li {
          position: relative;
          padding: 0 24px;
          font: normal normal 500 16px/36px BalooChettan;
          color: #7F8498;
          text-align: left;

          &:before {
            margin-right: 16px;
            content: "";
            display: inline-block;
            width: 16px;
            height: 16px;
            background-repeat: no-repeat;
            background-position: center;
            background-size: contain;
            background-image: url("./img/icon_features.svg");
            vertical-align: middle;
          }
        }
      }

      .badge {
        position: absolute;
        top: -54px;
        right: -44px;
        z-index: 1;
        width: 125px;
        height: 125px;
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;

        &.free {
          background-image: url("./img/badge-free.svg");
        }

        &.off {
          background-image: url("./img/badge-off.svg");
        }
      }
    }
  }

  .round01, .round02, .round03, .round04 {
    position: absolute;
    z-index: -1;
    display: block;
    border-radius: 50%;
  }

  .round01 {
    top: 402px;
    left: 250px;
    width: 123px;
    height: 123px;
    background-color: #4AF1BE;
  }

  .round02 {
    top: 508px;
    left: 40px;
    width: 79px;
    height: 79px;
    background-color: #FF5DAE;
  }

  .round03 {
    top: 410px;
    left: 25px;
    width: 93px;
    height: 93px;
    background-color: #8E7EFF;
  }

  .round04 {
    top: 490px;
    left: 278px;
    width: 157px;
    height: 157px;
    background-color: #4AF1BE;
  }
}

@media (max-width: 768px) {
  .home-2-daily-follower {
    padding: 0 6.4vw;
    height: auto;
    overflow: hidden;

    &:before {
      width: 1343px;
      height: 355px;
    }

    .home__sec_h2 {
      padding-top: 55px;
      font-size: 22px;
      text-align: left;

      i {
        font: normal normal 600 32px/41px BalooChettan;
      }

      span {
        font: normal normal 800 43px/50px BalooChettan;
      }
    }

    .arrow {
      margin-top: 20px;
      margin-bottom: 24px;
      display: block;
      width: 31px;
      height: 73px;
      background: url("./img/img_arrow_down.svg");
    }

    .home-2-follower__text_btn {
      width: 626/2px;
      height: 112/2px;
    }

    .line {
      display: none;
    }

    .content {
      width: 100%;
      padding-bottom: 120px;
      display: block;

      .list-mob {
        width: 95%;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;

        li {
          position: relative;
          z-index: 1;
          height: 50px;
          width: 48%;
          background: #7C56FF;
          border-radius: 12px 12px 0 0;
          font-size: 14px;
          line-height: 50px;
          color: #fff;
          font-weight: 500;
          cursor: pointer;

          &.active {
            background: #FFFFFF;
            color: #005FFF;
            font-weight: 600;
          }
        }
      }

      .follower-box {
        display: block;
        width: 100%;
        height: auto !important;
        margin-top: 0;

        &.buy-box {
          margin-top: 58px;

          .free-message {
            h4 {
              font-size: 44px;
              line-height: 57px;

              b {
                font-size: 20px;
              }
            }

            .select-content {
              padding: 0 6.4vw;
              width: 100%;
              height: 40px;

              &:before {
                  left: calc(13px + 6.4vw);
                  top: 8px;
              }

              &.second {
                margin-left: 0;
                width: 100%
              }
            }
          }
        }

        .follower-box-wrapper {
          padding-bottom: 24px;
        }

        .free-message {
          padding-top: 8px;
          padding-bottom: 13px;

          h4 {
            font-size: 44px;
            font-weight: 500;
            color: #18C981;
          }

          p {
            font-size: 16px;
          }
        }

        .home-2-follower__text_btn, .home-2-follower-btn {
          padding: 0 6.4vw;
          width: 100%;
        }

        .home-2-follower-btn {
          margin-top: 32px;
        }

        .home-2-follower__text_btn {
          margin-top: 30px;
        }

        .home-2-follower-bt {
          margin-top: 24px;
        }

        ul {
          margin-top: 20px;

          li {
            height: 35px;
            line-height: 35px;
            font-size: 14px;
            color: #2a2a2a;
          }
        }
      }
    }

    .round01 {
      top: 183px;
      left: 176px;
    }

    .round02 {
      top: 368px;
      left: 65px;
    }

    .round03 {
      top: 410px;
      left: 25px;
    }

    .round04 {
      top: 490px;
      left: 204px;
    }
  }
}
</style>

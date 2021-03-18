<template>
  <div ref="mark" :class="{ 'on': animateBegin }" class="home-followers">
    <div class="wrapper">
      <h2 class="home__sec_h2 step-0">Get Instagram Followers</h2>
      <span class="round01 blue-circle-container-0"></span>
      <span class="round02 follower-ammo"></span>
      <span class="round03 blue-circle-container-1"></span>
      <span class="round04 follower-ammo"></span>
      <!--<span class="line"></span>-->

      <!--content-->
      <div class="content">
        <ul v-if="$store.state.isMobile" class="list-mob">
          <li :class="{ 'active': changeList1 }" @click="change1()">Get Free Followers</li>
          <li :class="{'active': changeList2 }" @click="change2()">Get Daily Followers</li>
        </ul>

        <!--Tab-1-->
        <div class="follower-box step-1" :class="{'active': changeList1 }">
          <h3 v-if="!$store.state.isMobile">Get Free Followers</h3>
          <div class="free-message">
            <h4 class="big">FREE</h4>
            <p>Unlimited & Forever Free</p>
          </div>

          <!--btn beacon-->
          <!--          <div id="home-2-0" class="home-2-follower__text_btn" @click="gaLeftBtn">-->
          <div id="home-2-0" class="home-2-follower__text_btn" @click="gaBtnGateDownload">
            <button-yellow v-if="!$store.state.btnTestGate && !$store.state.isMobile"
                           square :text="`Get It Now`" font-size="size-20"
            />
            <!--            <button-download-ios v-if="$store.state.isiOS" />-->
            <!--            <button-download-android v-if="$store.state.isAndroid" />-->
            <button-theme-gradient-purple v-if="!$store.state.btnTestGate && $store.state.isMobile"
                                          square shadow text="Get Free Followers"
            />
            <div v-if="$store.state.btnTestGate && $store.state.downloadBtnTestA" class="w-100-h-100">
              <button-download-ios v-if="$store.state.isiOS" />
              <button-download-android v-if="$store.state.isAndroid" />
            </div>
            <div v-if="$store.state.btnTestGate && $store.state.downloadBtnTestB" class="w-100-h-100">
              <button-yellow square :text="`Get It Now`" font-size="size-20" />
            </div>
            <div v-if="$store.state.btnTestGate && $store.state.downloadBtnTestC" class="w-100-h-100">
              <button-yellow square :text="`Get It Now`" font-size="size-20" />
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
        </div>
        <!--Tab-2-->
        <div class="follower-box buy-box step-2" :class="{'active': changeList2 }">
          <h3 v-if="!$store.state.isMobile">Get Daily Followers</h3>
          <div class="free-message">
            <h4>Automatic & Organic</h4>
            <div class="select-content">
              <label class="cycle days">
                <select v-model="productPkgListDaysVM" name="offer-daily" class="package changed">
                  <option v-for="(item, i) in productPkgListDays" :key="i"
                          :value="item"
                  >{{ item }}-Day Subscription
                  </option>
                </select>
              </label>
            </div>
            <div class="select-content">
              <label class="cycle daily">
                <select v-model="productPkgListDailyVM" name="offer-daily" class="package changed">
                  <option
                    v-for="(item, i) in productPkgListDaily" :key="i"
                    :value="item"
                  >{{ item.dailyQuantity }} Followers/Day (${{ (item.price_decimal / item.cycle_type).toFixed(2) }})
                  </option>
                </select>
              </label>
            </div>
          </div>

          <!--btn beacon-->
          <div class="home-2-follower-btn" @click="modelBoxOpen">
            <button-yellow square :text="`Buy Now`" font-size="size-20" />
          </div>
          <ul>
            <li>Gain Real-time Followers</li>
            <li>Follow Back 0 Profiles</li>
            <li>Deliver within 24 Hours</li>
            <li>Plan is 100% Automatic</li>
            <li>Real Followers, No Bots!</li>
            <li>No Password, No Verification</li>
            <li>Profile Must Be Public</li>
            <li>24/7 Support</li>
          </ul>
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
            <h2>{{ productPkgListDailyVM.cycle_type }}-Day Subscription</h2>
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
import ButtonYellow from '@/components/button/button-yellow';
import apiAccount from '@/api/api.account';
import apiInsServer from '@/api/api.ins.server';
import ButtonYellowIcon from '@/components/button/button-yellow-icon';
import ButtonDownloadIos from '@/components/button/button-download-ios';
import ButtonDownloadAndroid from '@/components/button/button-download-android';
import ButtonThemeGradientPurple from '@/components/button/button-theme-gradient-purple';

export default {
  name: 'Home2DailyFollower',
  components: {
    ButtonThemeGradientPurple,
    ButtonDownloadAndroid,
    ButtonDownloadIos,
    ButtonYellowIcon,
    ButtonYellow
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
        this.$ga.event('inslogin', 'login', 'hplogin-freefollowers');
        this.$router.push('/login');
      }
      if (this.COMMON.isiOS()) {
        this.$ga.event('insdl', 'download', 'hpiosdl-freefollowers');
        location.href
          = `${this.$store.state.enIosLink}`
          + `?pt=${this.$store.state.enIosLinkPt}`
          + `&ct=${this.$store.state.enIosLinkCt}`
          + `&mt=8`;
      }
      if (this.COMMON.isAndroid()) {
        this.$ga.event('insdl', 'download', 'hpappdl-freefollowers');
        location.href = this.$store.state.enAdrLink;
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

      // btn test
      // if (this.$store.state.btnTestGate) {
      //   this.$ga.event(
      //     'insbuy',
      //     'buy',
      //     `hp${this.$store.state.platform}dl${this.$store.state.gaColor}3`
      //   );
      // } else {
      //   this.$ga.event('insbuy', 'buy', 'hp-dailybuy');
      // }
      this.$ga.event('insbuy', 'buy', 'hp-dailybuy');
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
      if (!this.insUser.ins_id) {
        this.searchInsByServerV2();
        this.$ga.event('insbuy', 'buy', 'hp-dailybuy-addaccount');
      } else {
        this.addToCart();
        this.$ga.event('insbuy', 'buy', 'hp-dailyfollower-buy');

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
      }

      // 调整后
      // this.searchInsByServerV2AndAddToCart();
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

        this.modelBoxBuyBtnText = 'Buy Now';
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
      this.$store.state.btnTestGate ? this.gaDownloadAPPTest() : this.gaLeftBtn();
    }
  }
};
</script>

<style lang="scss" scoped>
@include animateSteps(3);
//@include animatefloat(20px,-30px,1);

.follower-ammo {
  -webkit-animation: follower-ammo-anim 9s cubic-bezier(.4, 0, .2, 1) infinite;
  animation: follower-ammo-anim 9s cubic-bezier(.4, 0, .2, 1) infinite;
}

@-webkit-keyframes follower-ammo-anim {
  40% {
    -webkit-animation-timing-function: cubic-bezier(.4, 0, .2, 1);
    animation-timing-function: cubic-bezier(.4, 0, .2, 1);
    transform: translateY(40px) rotate(-1deg)
  }
}

@keyframes follower-ammo-anim {
  40% {
    -webkit-animation-timing-function: cubic-bezier(.4, 0, .2, 1);
    animation-timing-function: cubic-bezier(.4, 0, .2, 1);
    transform: translateY(40px) rotate(-1deg)
  }
}

.home-followers {
  position: relative;
  text-align: center;
  background: linear-gradient(180deg, #EEEEFF 0%, #FFFFFF 100%) top center no-repeat;
  background-size: 100% 40%;

  &:before {
    position: absolute;
    right: 0;
    top: 0;
    width: 1343px;
    height: 355px;
    content: "";
    background: url("~@/assets/images/home/home-2-follower/follower-bg.svg") no-repeat top right;
    background-size: contain;
  }

  h2 {
    position: relative;
    z-index: 1;
    padding-top: 100px;
    font: 700 44px Montserrat;
    color: #40474F;
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
        background: linear-gradient(90deg, #7C56FF 0%, #6666FF 100%);
      }

      .free-message {
        color: #40474F;

        h4 {
          padding-top: 32px;
          font: 700 28px/30px Montserrat;
          color: #6666FF;

          &.big {
            font: 700 40px/43px Montserrat;
          }
        }

        p {
          margin-top: 8px;
          font: 600 20px Montserrat;
        }
      }

      .home-2-follower__text_btn, .home-2-follower-btn {
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
            background-color: #F9F9F9;
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
            color: #6666FF;
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

        .home-2-follower__text_btn, .home-2-follower-btn {
          padding: 0 4vw;
          width: 100%;
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
}
</style>

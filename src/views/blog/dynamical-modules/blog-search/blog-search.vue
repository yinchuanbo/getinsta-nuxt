<template>
  <div class="search-containrer">
    <h2>Get Free Instagram Followers</h2>
    <p>Add username to get free followers now!</p>
    <div class="control-search_ins">
      <label>
        <input
          v-model="searchInsInput" type="text"
          :placeholder="'Your username'"
        >
      </label>
      <div class="search_btn" @click="searchUsername">
        <button-purple text="Get Now" :sharp="true" :loading="searchInsLoading" :themecolor="blogorange" />
      </div>
    </div>
    <!-- 搜索结果 -->
    <div v-if="insUser.ins_id" class="ins-info-container">
      <img class="searchimg" :src="insUser.profile_pic_url || ''" alt="">
      <h3>{{ insUser.ins_account }}</h3>
      <p>
        <span>
          <b>{{ insUser.post.post_count | numberAbbreviations }}</b>
          posts
        </span>
        <span>
          <b>{{ insUser.followed_by | numberAbbreviations }}</b>
          followers
        </span>
        <span>
          <b>{{ insUser.follow | numberAbbreviations }}</b>
          following
        </span>
      </p>
      <div class="linewhite"></div>
      <!-- 二维码 -->
      <div class="scanContain">
        <h3>Scan the QR code below to download app to get free followers</h3>
        <div class="qrqdbg" :class="{scanbgdow:andicon==='aple'}"></div>
        <div class="detailScan">
          <img class="img01" :class="{onimg01:andicon==='andr'}" src="../../../../assets/images/global/adricon.svg" alt="android" @click="choiceandDow('andr')">
          <span></span>
          <img class="img02" :class="{onimg02:andicon==='aple'}" src="../../../../assets/images/global/button/icon__btn-download_logo_apple_white.svg"
               alt="apple" @click="choiceandDow('aple')"
          >
        </div>
      </div>
      <!-- mobile 下载按钮 -->
      <div class="mobileDown">
        <a v-if="iostrue" class="getfreeDown" @click="clickapple">Get Free Followers</a>
        <a v-if="adrtrue" class="getfreeDown" @click="clickadr">Get Free Followers</a>
        <p>Download the app to get free followers</p>
      </div>
    </div>
  </div>
</template>

<script>
import apiInsServer from '~/api/api.ins.server';
import ButtonPurple from '~/components/button/button-purple';

export default {
  name: 'BlogSearch',
  components: {
    ButtonPurple
  },
  filters: {
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
    ax: {
      type: String,
      default: ''
    },
    sendThis: {
      type: Object,
      default: null
    }
  },
  // asyncData({ i18n }) {
  //   const locale = i18n.locale;
  //   console.log('i18n', i18n);
  //   return { locale };
  // },
  data() {
    return {
      iostrue: this.COMMON.isiOS(),
      adrtrue: this.COMMON.isAndroid(),
      postList: [],
      relatedArticleList: [],
      articleHotList: [],
      blogDetailObj: {},
      blogSortObj: {},
      insUser: {},
      searchInsInput: '',
      andicon: 'andr',
      searchStatus: false,
      blogorange: true,
      searchInsLoading: false,
      ajaxRequesting: true,
      ajaxRequestingHot: false,
      dialogFail: false,
      dialogFailMsg: '',
      jQRenderTimer: false,
      jQRenderTimerCounter: 0,
      postListInfo: {
        post_count: 0,
        end_cursor: '',
        has_next_page: false,
        page_size: 12
      }
    };
  },
  mounted() {
    // console.log(111,this.$storage.get('adrDownloadLink'))
    // console.log(222,this.$storage.get('iosDownloadLink'))

  },
  methods: {
    searchUsername() {
      this.searchInsByServerV2();
      this.$ga.event(
          'buttonclick',
          'click',
          `b4-addname-${this.ax}`
      );
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
      this.sendThis.$nuxt.$axios.post(
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

        this.postList = this.insUser.post.post_list;
        this.postListInfo.post_count = this.insUser.post.post_count;
        this.postListInfo.end_cursor = this.insUser.post.end_cursor;
        this.postListInfo.has_next_page = this.insUser.post.post_count > this.postListInfo.page_size;
      }).catch((error) => {
        this.closeDialog();
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
    choiceandDow(msg) {
      if (msg) {
        this.andicon = msg;
      }
    },
    clickadr() {
      this.$ga.event('insdl', 'download', `blogappdl-b4-${this.ax}`);
      window.location.href = this.$storage.get('adrDownloadLink');
    },
    clickapple() {
      this.$ga.event('insdl', 'download', `blogiosdl-b4-${this.ax}`);
      window.location.href = this.$storage.get('iosDownloadLink');
    }
  }
};
</script>

<style lang="scss" scoped>
.search-containrer {
  width: 800px;
  margin-top: 40px;
  padding: 55px 125px 75px 125px;
  background: transparent linear-gradient(262deg, #D178E3 0%, #4D65FA 100%) 0% 0% no-repeat padding-box;
  border-radius: 12px;
  opacity: 1;
  color: #fff;
  text-align: center;

  h2 {
    font-size: 30px;
    margin-bottom: 14px;
    font-weight: 500;
  }

  p {
    font-size: 18px;
  }

  .control-search_ins {
    width: 549px;
    height: 70px;
    margin: auto;
    margin-top: 38px;
    box-shadow: 0px 8px 20px #000A3D4D;
    border: 1px solid #E0E1E6;
    border-radius: 10px;
    color: #fff;
    background-color: #fff;

    .search_btn {
      box-shadow: 0px 10px 26px #3F065670;

    }

    label {
      input {
        font-size: 16px;
        padding-left: 18%;
        background: url("@/assets/images/global/icon_search_username.svg") no-repeat 31px 21px;
        background-size: 24px 26px;
      }
    }

    input:focus {
      border-color: #E0E1E6 !important;
    }

    input:hover {
      border-color: #FCDC4E !important;
      background: url("@/assets/images/global/blog_hover_user.svg") no-repeat 31px 21px;
      background-size: 24px 26px;
    }
  }

  .ins-info-container {
    margin-top: 50px;

    img.searchimg {
      width: 102px;
      height: 102px;
      border: 4px solid #fff;
    }

    h3 {
      font: 500 16px/19px Montserrat;
      color: #fff;
    }

    p {
      color: #fff;
      font: 500 20px Montserrat;
      margin-top: 20px;
      margin-bottom: 20px;

      b {
        color: #fff;
      }
    }

    .linewhite {
      width: 544px;
      height: 1px;
      background-color: #fff;
      margin: auto;
      opacity: 0.2;
    }

    .scanContain {
      text-align: center;

      h3 {
        font: 14px/18px Montserrat;
        color: #FCE5FF;
        margin: 23px 0;
      }

      .qrqdbg {
        width: 150px;
        height: 150px;
        margin: auto;
        background: url("@/assets/images/global/qrcode__download_android.svg") no-repeat center;
      }

      .scanbgdow.scanbgdow {
        background: url("@/assets/images/global/qrcode__download_ios.svg") no-repeat center;
      }

      .detailScan {
        margin-top: 28px;
        display: flex;
        align-items: center;
        justify-content: center;

        span {
          display: inline-block;
          width: 1px;
          height: 26px;
          background: #fff;
          margin: 0 20px;
        }

        img {
          border: none;
          cursor: pointer;
          margin: 0;
        }

        img.img01 {
          width: 26px;
          height: 31px;
          opacity: .4;
        }

        img.onimg01 {
          opacity: 1;
        }

        img.img02 {
          width: 24px;
          height: 28px;
          opacity: .4;
        }

        img.onimg02 {
          opacity: 1;
        }
      }
    }

    .mobileDown {
      display: none;
    }
  }
}

@media (max-width: 768px) {
  .search-containrer {
    padding: 31px 21px 48px;
    width: 100%;

    h2 {
      font: 600 17px/25px Montserrat;
    }

    p {
      font: 14px Montserrat;
    }

    .control-search_ins {
      border: none;

      label {
        width: 68%;
      }

      margin-top: 10px;
      width: 88%;
      height: 50px;
      border-radius: 5px;

      input {
        padding-left: 20px;
        border-radius: 5px 0 0 5px;
        background-image: none !important;
        font: 14px Montserrat !important;
        border: 1px solid #fff;
        border: none !important;
      }

      .search_btn {
        border-radius: 5px !important;
        width: 32%;
        overflow: visible;
      }
    }

    .ins-info-container {
      margin-top: 20px !important;

      img.searchimg {
        width: 88px;
        height: 88px;
      }

      p {
        span {
          display: inline-block;
          text-align: left;
          font-size: 14px;

          b {
            display: block;
            font-size: 18px;
          }
        }
      }

      .linewhite {
        display: none;
      }

      .scanContain {
        display: none;
      }

      .mobileDown {
        display: block;
        width: 100%;

        .getfreeDown {
          display: flex;
          justify-content: center;
          align-items: center;
          margin: auto;
          width: 263px;
          height: 56px;
          background: transparent linear-gradient(270deg, #FFD256 0%, #F1FF33 100%) 0% 0% no-repeat padding-box;
          box-shadow: 0px 12px 24px #00000029;
          opacity: 1;
          border-radius: 64px;
          font: 600 16px/56px Montserrat;
          letter-spacing: 0px;
          color: #2A2A2A;
          margin-top: 25px;
        }

        .getfreeDown:hover {
          background: transparent linear-gradient(270deg, #F8DC2A 0%, #F7EE41 100%) 0% 0% no-repeat padding-box;
          box-shadow: 0px 10px 26px #3F065670;
        }

        p {
          margin: 0;
          margin-top: 18px;
          font-size: 14px;
        }
      }
    }

  }
}

</style>

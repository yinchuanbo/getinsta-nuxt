<template>
  <div class="search-container">
    <h2>1000+ Free IG Followers Trial [Real & Fast]</h2>
    <p>Get your first 1K organic followers instantly!</p>
    <div class="control-search_ins">
      <label>
        <input
          v-model="searchInsInput" type="text"
          :placeholder="'Enter Instagram username'"
        >
      </label>
      <div class="search_btn" @click="searchUsername">
        <!--<button-purple text="Get Now" :sharp="true" :loading="searchInsLoading" :themecolor="blogorange" />-->
        <button-icon-ins text="Get Now" theme="cyan" font-size="size-16" :border-radius="8" :loading="searchInsLoading" />
      </div>
    </div>
    <!-- 搜索结果 -->
    <div v-if="insUser.ins_id" class="ins-info-container">
      <img class="search-img" :src="insUser.profile_pic_url || ''" alt="">
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
      <!-- mobile 下载按钮 -->
      <div class="mobileDown">
        <button-icon-ins text="Get Free Followers" theme="cyan" font-size="size-16" :border-radius="8" />
      </div>
    </div>
  </div>
</template>

<script>
import apiInsServer from '~/api/api.ins.server';
import ButtonPurple from '~/components/button/button-purple';
import ButtonIconIns from '@/components/button/button-icon-ins';

export default {
  name: 'BlogSearch',
  components: {
    ButtonIconIns
    // ButtonPurple
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
      isIos: this.COMMON.isiOS(),
      isAdr: this.COMMON.isAndroid(),
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
      this.sendThis.$nuxt.$axios.post(
        apiInsServer.getAccountByUsername,
        this.COMMON.paramSign({ ins_account: this.searchInsInput })
      ).then((response) => {
        this.searchInsLoading = false;
        this.searchStatus = true;

        if (response.data.status !== 'ok') {
          this.sendThis.$alert(
            '', 'error',
            this.sendThis.$t('global.modelBox.title.oops'),
            this.sendThis.$t('store.buy.error.errorInsID.text'),
            'normal',
            this.sendThis.$t('global.modelBox.btn.close')
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
.search-container {
  width: 760px;
  padding: 60px 0 45px;
  background: url("./img/bg.svg") top center no-repeat;
  border-radius: 12px;
  opacity: 1;
  color: #fff;
  text-align: center;

  h2 {
    margin-bottom: 14px;
    font-size: 28px;
    font-weight: 700;
  }

  p {
    margin-bottom: 0;
    font-size: 14px;
  }

  .control-search_ins {
    width: 549px;
    height: 60px;
    margin: 38px auto auto;
    border-radius: 10px;
    color: #fff;
    background-color: #fff;
    box-shadow: none;
    overflow: visible;


    .search_btn {
      overflow: visible;
      box-shadow: 0 12px 24px #00000030;
    }

    label {
      input {
        font-size: 16px;
        padding-left: 6%;
        border: none !important;
        background: none;
      }
    }
  }

  .ins-info-container {
    margin-top: 50px;

    img.search-img {
      width: 82px;
      height: 82px;
      border: 4px solid #fff;
    }

    h3 {
      margin: 8px auto 0;
      font: 500 16px/19px Montserrat;
      color: #fff;
    }

    p {
      margin-top: 22px;
      margin-bottom: 22px;
      color: #fff;
      font: 500 14px Montserrat;

      b {
        margin-right: 0;
        font-size: 24px;
        color: #fff;
      }
    }

    .line {
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
        background: url("~@/assets/images/global/qrcode__download_android.svg") no-repeat center;
      }

      .scanbgdow.scanbgdow {
        background: url("~@/assets/images/global/qrcode__download_ios.svg") no-repeat center;
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
      display: block;
      margin: 0 auto;
      width: 253px;
      height: 60px;
    }
  }
}

@media (max-width: 768px) {
  .search-container {
    padding: 31px 21px 48px;
    width: 100%;
    //background-image: url("");

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

      img.search-img {
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

      .line {
        display: none;
      }

      .scanContain {
        display: none;
      }
    }
  }
}

</style>

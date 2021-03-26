<template>
  <div class="blog-detail">
    <div id="header-blank" class="header-blank"></div>
    <div class="wrapper">
      <div class="left" :class="{ 'lang-arabic': langArabic }">
        <transition name="fade-skeleton" mode="out-in">
          <div v-if="!ajaxRequesting" key="Box1">
            <div class="breadcrumb">
              <nuxt-link to="/">{{ $t('global.header.menu.home') }}</nuxt-link>
              <span>&gt;</span>
              <nuxt-link to="/blogs">{{ $t('global.header.menu.blog') }}</nuxt-link>
              <span>&gt;</span>
              <a @click="backToBlogList">{{ blogSortObj.breadcrumb || '' }}</a>
              <span>&gt;</span>
              <b>{{ blogDetailObj['page_title'] || '' }}</b>
            </div>
            <div class="meta-info">
              <h1>{{ blogDetailObj['page_title'] || '' }}</h1>
              <p class="intro">{{ blogDetailObj['remark'] || '' }}</p>
              <hr>
              <p class="info">
                {{ $t('blogDetail.updated') }}
                {{ blogDetailObj['update_time'] || '' }}
                |
                {{ $t('blogDetail.by') }}
                {{ blogDetailObj.author || '' }}
              </p>
            </div>
            <div
              id="blogDetailContent" class="blog-detail__content"
              :class="{
                'ios': $store.state.isiOS,
                'android': $store.state.isAndroid,
                'windows': $store.state.isWindows
              }"
              v-html="blogDetailObj.content || ''"
            ></div>
            <div v-if="relatedArticleList.length !== 0" class="related-list">
              <h2>{{ $t('blogDetail.RelatedReadings') }}</h2>
              <nuxt-link
                v-for="(unit, i) in relatedArticleList" :key="i"
                :to="`/blogs/${unit.alia}`"
              >
                {{ unit.title }}
              </nuxt-link>
            </div>
          </div>
          <div v-if="ajaxRequesting" key="Box2" class="skeleton-blog-detail">
            <div class="breadcrumb">
              <span></span>
            </div>
            <div class="meta-info">
              <h1><span></span></h1>
              <h1><span style="width: 90%"></span></h1>
              <p class="intro"><span></span></p>
              <hr>
              <p class="info"><span></span></p>
            </div>
            <div class="blog-detail__content">
              <p><span></span></p>
              <p><span></span></p>
              <p><span></span></p>
              <p><span></span></p>
              <p><span style="width: 80%"></span></p>
              <h2><span></span></h2>
              <p><span></span></p>
              <p><span></span></p>
              <p><span></span></p>
              <p><span></span></p>
              <p><span></span></p>
              <h2><span></span></h2>
              <p><span></span></p>
              <p><span></span></p>
              <p><span></span></p>
              <p><span></span></p>
              <h2><span></span></h2>
              <p><span></span></p>
              <p><span style="width: 80%"></span></p>
            </div>
          </div>
        </transition>
        <transition>
          <div id="testbox"></div>
        </transition>
      </div>
      <div class="right">
        <div class="mix-container">
          <img src="@/assets/images/global/logo.svg" alt="LOGO">
          <h2>GetInsta</h2>
          <p><span>{{ $t('blogDetail.subtitle') }}</span></p>
          <div class="btn pc">
            <div class="btn-c" @click="downloadWindows">
              <!--<button-download-windows-yellow />-->
              <button-download-windows />
            </div>
            <div class="btn-c" @click="downloadAndroid">
              <!--<button-download-android :type="'transparent'" />-->
              <button-download-android />
            </div>
            <div class="btn-c" @click="downloadIOS">
              <!--<button-download-ios :type="'transparent'" />-->
              <button-download-ios />
            </div>
          </div>
          <div class="btn mobile" @click="downloadMobile">
            <!--<button-yellow-download-->
            <!--  v-if="$i18n.locale === 'en'"-->
            <!--  :text="$t('global.button.downloadAppNow')"-->
            <!--  :icon="$store.state.isiOS ? 'ios' : 'android'"-->
            <!--/>-->
            <button-download-ios v-if="$store.state.isiOS" />
            <button-download-android v-if="$store.state.isAndroid" />
          </div>
          <p class="b"><i></i><span>{{ $t('global.safe') }}</span></p>
        </div>

        <transition name="fade-skeleton" mode="out-in">
          <div v-if="articleHotList.length !== 0" key="Box1" class="hot-list">
            <h2>{{ $t('blog.hotArticles') }}</h2>
            <div class="links">
              <nuxt-link
                v-for="(unit, i) in articleHotList" :key="i"
                :to="`/blog/${unit['urlalias']}`"
                :title="unit.title || 'Unknown Link'"
              >
                <span>{{ unit.title || 'Unknown Link' }}</span>
              </nuxt-link>
            </div>
          </div>

          <div v-if="ajaxRequestingHot" key="Box2" class="hot-list skeleton-hot-list">
            <h2><span></span></h2>
            <div class="links">
              <div v-for="i in 5" :key="i" class="skeleton">
                <a><span></span><span></span></a>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>

    <transition name="fade">
      <div v-if="dialogFail" key="diag1" class="uni-dialog-box enter-box enter-mask">
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
                <button-purple text="Close" :font-size="'size-16'" :square="true" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import Vue from 'vue';
import $ from 'jquery';
// import ButtonGreen from '@/components/button/button-green';
// import ButtonYellowDownload from '@/components/button/button-yellow-download';
import api from '@/api/api.blog';
import apiInsServer from '@/api/api.ins.server';
// import ButtonDownloadWindowsYellow from '@/components/button/button-download-windows-yellow';
import ButtonDownloadAndroid from '@/components/button/button-download-android';
import ButtonPurple from '@/components/button/button-purple';
import ButtonDownloadIos from '@/components/button/button-download-ios';
import ButtonDownloadWindows from '@/components/button/button-download-windows';
import blogSearch from '@/views/blog/dynamical-modules/blog-search/blog-search.vue';
import blogBuy from '@/views/blog/dynamical-modules/blog-buy/blog-buy.vue';

const MyBlog = Vue.extend(blogSearch);
const MyBlogBuy = Vue.extend(blogBuy);
export default {
  name: 'BlogDetail',
  components: {
    ButtonDownloadWindows,
    ButtonDownloadIos,
    ButtonDownloadAndroid,
    // ButtonDownloadWindowsYellow,
    // ButtonYellowDownload,
    // ButtonGreen
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
    reqObj: {
      type: Object,
      require: true,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      postList: [],
      relatedArticleList: [],
      articleHotList: [],
      blogDetailObj: {},
      blogSortObj: {},
      searchInsLoading: false,
      ajaxRequesting: true,
      ajaxRequestingHot: true,
      dialogFail: false,
      dialogFailMsg: '',
      jQRenderTimer: false,
      jQRenderTimerCounter: 0,
      postListInfo: {
        post_count: 0,
        end_cursor: '',
        has_next_page: false,
        page_size: 12
      },
      appAnalytics: {
        pt: 121014724,
        ct: `${this.$i18n.locale}campaign`,
        mt: 8
      },
      langArabic: false
    };
  },
  computed: {
    blogID() {
      return this.$route.params.id.split('-').pop();
    }
  },
  watch: {
    $route() {
      this.$scrollTo('#header-blank');
      // this.getBlogDetail(this.$route.params.id.split('-').pop(), false);
      this.$store.commit('blogID', this.blogID);
    }
  },
  destroyed() {
    clearInterval(this.jQRenderTimer);
  },
  created() {
    // nuxt
    this.getBlogDetailByProps(this.reqObj);
  },
  mounted() {
    // this.getBlogDetail(this.blogID, true);
    // this.getBlogDetailByProps(this.reqObj);
    this.$store.commit('blogID', this.blogID);
  },
  methods: {
    closeDialog() {
      this.dialogFail = false;
      this.searchInsLoading = false;
      // this.dialogSuccess = false;
      // this.dialogAttention = false;
      // this.dialogSearchIns = false;
      // this.dialogAddIns = false;
      // this.searchInsLoading = false;
      // this.dialogFailDownload = false;
      // this.dialogFailCoins = false;
      // this.dialogFailCoinsLogged = false;

      // if (this.needGoToTask) this.goToTask();
    },

    // nuxt props
    getBlogDetailByProps(data) {
      this.blogDetailObj = data['article'];
      this.langArabic = this.COMMON.langCheckIsArabic(data['article']['seo_title']);

      if (process.client) {
        this.$nextTick(() => {
          setTimeout(() => {
            this.renderByJQ();
            this.renderDetector();

            let checkStr = [...document.querySelectorAll('.blogBanner')];
            if (checkStr.length) {
              for (let i = 0; i < checkStr.length; i++) {
                let searchcomponent = new MyBlog({ propsData: { ax: this.blogID } }).$mount();
                checkStr[i].parentNode.replaceChild(searchcomponent.$el, checkStr[i]);
              }
            }

            let checBuy = [...document.querySelectorAll('.blogBuy')];
            if (checBuy.length) {
              for (let j = 0; j < checBuy.length; j++) {
                let buymodal = new MyBlogBuy({ propsData: { sendThis: this } }).$mount();
                checBuy[j].parentNode.replaceChild(buymodal.$el, checBuy[j]);
              }
            }
          }, 500);
        });
        this.getHotArticleList();
        this.blogSortObj = data['sort'] || {};
        this.blogSortObj.breadcrumb = data['sort'].title || '';
        this.$storage.set('blogPrevSort', this.blogSortObj);
      }

      this.ajaxRequesting = false;
    },
    // old CSR
    getBlogDetail(ID, firstQuest) {
      if (firstQuest) this.ajaxRequesting = false;

      let param = {
        article_id: ID,
        client_lan: this.$i18n.locale,
        page_url: this.$route.params.id
      };

      if (this.COMMON.getURLQuery('source'))
        param.source = this.COMMON.getURLQuery('source');


      if (!this.ajaxRequesting) {
        this.ajaxRequesting = true;
        this.$nuxt.$axios(
          api.getBlogDetail,
          this.COMMON.paramSign(param)
        ).then((response) => {
          if (response.data.status === 'ok') {
            this.blogDetailObj = response.data['article'];
            this.langArabic = this.COMMON.langCheckIsArabic(response.data['article']['seo_title']);

            this.$nextTick(() => {
              setTimeout(() => {
                this.renderByJQ();
                this.renderDetector();

                let checkStr = [...document.querySelectorAll('.blogBanner')];
                if (checkStr.length) {
                  for (let i = 0; i < checkStr.length; i++) {
                    let searchcomponent = new MyBlog({ propsData: { ax: this.blogID } }).$mount();
                    checkStr[i].parentNode.replaceChild(searchcomponent.$el, checkStr[i]);
                  }
                }

                let checBuy = [...document.querySelectorAll('.blogBuy')];
                if (checBuy.length) {
                  for (let j = 0; j < checBuy.length; j++) {
                    let buymodal = new MyBlogBuy({ propsData: { sendThis: this } }).$mount();
                    checBuy[j].parentNode.replaceChild(buymodal.$el, checBuy[j]);
                  }
                }
              }, 500);
            });

            this.getHotArticleList();
            this.blogSortObj = response.data['sort'] || {};
            this.blogSortObj.breadcrumb = response.data['sort'].title || '';
            this.$storage.set('blogPrevSort', this.blogSortObj);
            this.ajaxRequesting = false;
          } else {
            if (response.data['redirect_url']) {
              location.href = response.data['redirect_url'];
            } else {
              if (response.data.error && response.data.error.type === 'bad_url') {
                // status fail
                console.log('error404 Jump: bad_url');
                location.href = `${window.location.origin}/error404`;
              } else if (response.data.error && response.data.error.type === 'bad_lan') {
                console.log('error404 Jump: bad_url');
                location.href = `${window.location.origin}/error404`;
              } else {
                console.log('error404 Jump: Others');
                location.href = `${window.location.origin}/error404`;
              }
            }
          }
        }).catch((error) => {
          this.ajaxRequesting = false;
          let body = 'Loading article error, please try again later.';
          if (error)
            body = `<samp><b>Error Type:</b> ${error.status}<br><b>Error Message:</b> ${error.statusText}</samp>`;
          this.$alert('', 'error', 'Oops', body, 'normal', 'Close');
          console.log('getBlogDetail Error', error);
        });
      }
    },
    getHotArticleList() {
      this.ajaxRequestingHot = true;
      this.$nuxt.$axios(
        api.getHotBlogList,
        this.COMMON.paramSign({
          client_lan: 'en'
        })
      ).then((response) => {
        if (response.data.status === 'ok') {
          this.articleHotList = response.data['articles'];
        }
        this.ajaxRequestingHot = false;
      }).catch(() => {
        console.log('Catch error: getHotArticleList()');
        this.ajaxRequestingHot = false;
      });
    },

    renderByJQ() {
      this.renderRelatedListByJQ();
      this.renderArticleIndexByJQ();
    },
    renderArticleIndexByJQ() {
      let titleList = $('#blogDetailContent').find('.title-list');

      let indexClassName = titleList.length > 9 ? 'double' : '';

      let articleIndexA = `<div class="index ${indexClassName}"><ul>`;
      let articleIndexB = `</ul></div>`;
      let articleIndexContent = ``;
      titleList.each(function () {
        articleIndexContent += `<li>${$(this).text()}</li>`;
      });

      let articleIndex = articleIndexA + articleIndexContent + articleIndexB;
      $('.title-list-pos').replaceWith(articleIndex);
      $('.index').find('li').off().on('click', function () {
        const top = $('.title-list').eq($(this).index()).offset().top;
        window.scrollTo({
          top: top - 100,
          behavior: 'smooth'
        });
      });
    },
    renderRelatedListByJQ() {
      let rList = [];
      let container = $('#blogDetailContent').find('.redirect');
      container.off().find('a').each(function () {
        rList.push({
          title: $(this).text(),
          alia: $(this).attr('href').split('/').pop()
        });
      });
      container.remove();
      this.relatedArticleList = rList;
    },
    renderDetector() {
      this.jQRenderTimer = setInterval(() => {
        if (document.getElementsByClassName('related-list').length === 0
          && this.jQRenderTimerCounter < 20) {
          this.renderByJQ();
          this.jQRenderTimerCounter++;
          console.log('jQRenderTimer Tick');
        } else {
          clearInterval(this.jQRenderTimer);
        }
      }, 1000);
    },
    backToBlogList() {
      if (process.client) {
        this.$storage.set('blogDetailVisited', true);
      }
      this.$router.push({ path: '/blogs' });
    },

    downloadWindows() {
      this.$ga.event('insdl', 'download', `blogwindl1${this.multiLang()}-${this.$store.state.blogID}`);
      window.location.href = this.$constant.app.download.windows;
    },
    downloadAndroid() {
      this.$ga.event(
        'insdl',
        'download',
        `blogappdl1${this.multiLang()}-${this.$store.state.blogID}`
      );
      window.location.href = this.$store.state.enAdrLink;
    },
    downloadIOS() {
      this.$ga.event(
        'insdl',
        'download',
        `blogiosdl1${this.multiLang()}-${this.$store.state.blogID}`
      );

      window.location.href
        = `${this.$store.state.enIosLink}`
        + `?pt=${this.$store.state.enIosLinkPt}`
        + `&ct=${this.$store.state.enIosLinkCt}`
        + `&mt=8`;
    },
    downloadMobile() {
      let gaPlatform = '';
      if (this.COMMON.isiOS()) gaPlatform = 'ios';
      if (this.COMMON.isAndroid()) gaPlatform = 'app';

      this.$ga.event(
        'insdl',
        'download',
        `blog${gaPlatform}dl1${this.multiLang()}-${this.$store.state.blogID}`
      );

      if (this.COMMON.isiOS())
        window.location.href
          = `${this.$store.state.enIosLink}`
          + `?pt=${this.$store.state.enIosLinkPt}`
          + `&ct=${this.$store.state.enIosLinkCt}`
          + `&mt=8`;
      else
        window.location.href = this.$store.state.enAdrLink;

    },
    multiLang() {
      let multiLang = '';
      if (this.$i18n.locale !== 'en') multiLang = `-${this.$i18n.locale}`;
      return multiLang;
    }
  }
};
</script>

<style lang="scss" src="./blog-detail.scss"></style>
<style lang="scss" scoped>
.blog-detail {
  padding-bottom: 100px;

  .wrapper {
    padding-top: 32px;
  }

  .left {
    display: inline-block;
    vertical-align: top;
    width: 800px;

    .breadcrumb {
      padding: 18px 0;
      border-bottom: 1px solid #E8E8E8;
      line-height: 24px;

      a, span {
        margin: 0 2px;
        display: inline-block;
        font: 500 16px Montserrat;
        color: #7E7E7E;

        b {
          color: #000000;
          font-weight: 600;
        }
      }
    }

    .meta-info {
      padding-top: 28px;

      h1 {
        font: 600 40px/50px Montserrat;
        color: #2128BD;
      }

      p.intro {
        margin-top: 40px;
        font: 400 16px/20px Montserrat;
        color: #2A2A2A;
      }

      hr {
        margin-top: 30px;
        border-top: 1px solid #E8E8E8;
      }

      p.info {
        margin-top: 20px;
        font: Regular 16px/20px Montserrat;
        letter-spacing: 0;
        color: #A8A8A8;
      }
    }

    .related-list {
      margin-top: 60px;

      h2 {
        font: 600 20px/46px Montserrat;
        color: #2A2A2A;
      }

      a {
        display: inline-block;
        width: 100%;
        border-bottom: 1px solid #E8E8E8;
        font: 500 16px/64px Montserrat;
        color: #005fff;
        transition: all 0.1s;

        &:hover {
          color: #2128BD;
        }
      }
    }

    &.lang-arabic {
      h1, p.intro {
        direction: rtl;
      }
    }
  }

  .right {
    position: sticky;
    top: 32px+80px;
    margin-left: 56px;
    display: inline-block;
    vertical-align: top;
    width: 342px;

    .mix-container {
      padding: 32px 20px 32px;
      width: 100%;
      background: #7C56FF;
      box-shadow: 0 3px 6px #00000029;
      border-radius: 12px;

      text-align: center;

      h2 {
        margin-top: 20px;
        font: 800 italic 28px Montserrat;
        color: #fff;
      }

      p {
        margin-top: 16px;
        font-size: 0;

        &.b {
          margin-top: 32px;
        }

        * {
          vertical-align: middle;
        }

        span {
          font: 400 16px/20px Montserrat;
          color: #FFFFFF;
        }

        i {
          margin-right: 16px;
          display: inline-block;
          width: 19px;
          height: 24px;
          background: url("~@/assets/images/global/icon_safe.svg") no-repeat center;
          background-size: contain;
          vertical-align: middle;
        }
      }

      .btn {
        margin-top: 22px;
        display: inline-block;

        .btn-c {
          margin-top: 16px;

          &:first-child {
            margin-top: 0;
          }
        }
      }

      img.qr {
        margin-top: 22px;
        width: 100px;
      }
    }

    .hot-list {
      margin-top: 62px;

      h2 {
        font: 600 20px/47px Montserrat;
        color: #2A2A2A;
      }

      .links {
        a {
          margin-top: 20px;
          padding-bottom: 14px;
          display: block;
          border-bottom: 1px solid #E8E8E8;

          &:hover {
            span {
              color: #2128BD;
            }
          }

          span {
            font: 500 16px/19px Montserrat;
            color: #7E7E7E;
            @include text-ellipsis-multi(2);
            transition: all 0.1s;
          }
        }
      }
    }
  }

  .skeleton-blog-detail {
    .breadcrumb {
      span {
        width: 80%;
        height: 20px;
      }
    }

    .meta-info {
      h1 {
        span {
          width: 100%;
          height: 40px;
        }
      }

      p.intro {
        span {
          width: 86%;
          height: 16px;
        }
      }

      p.info {
        span {
          width: 30%;
          height: 16px;
        }
      }
    }

    .blog-detail__content {
      p {
        span {
          width: 100%;
          height: 16px;
        }
      }

      h2 {
        span {
          width: 60%;
          height: 24px;
        }
      }
    }

    span {
      display: inline-block;
      background: linear-gradient(to right, #eff1f3 4%, #e2e2e2 25%, #eff1f3 36%);
      background-size: 200% 100%;
      animation: shimmer 4s infinite linear;
      @keyframes shimmer {
        0% {
          background-position: 200% 100%;
        }
        100% {
          background-position: -200% 100%;
        }
      }
    }
  }

  .skeleton-hot-list {
    h2 {
      span {
        width: 40%;
        height: 20px;
      }
    }

    a {
      span {
        margin-bottom: 5px;
        width: 100%;
        height: 16px;

        &:last-child {
          width: 80%;
        }
      }
    }

    span {
      display: inline-block;
      background: linear-gradient(to right, #eff1f3 4%, #e2e2e2 25%, #eff1f3 36%);
      background-size: 200% 100%;
      animation: shimmer 4s infinite linear;
      @keyframes shimmer {
        0% {
          background-position: 200% 100%;
        }
        100% {
          background-position: -200% 100%;
        }
      }
    }
  }

  .search-containrer {
    width: 800px;
    margin-top: 40px;
    padding: 55px 125px 75px 125px;
    background: transparent linear-gradient(262deg, #D178E3 0%, #4D65FA 100%) 0% 0% no-repeat padding-box;
    border-radius: 12px;
    opacity: 1;
    color: #fff;
    text-align: center;
  }

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
        background: url("~@/assets/images/global/icon_search_username.svg") no-repeat 31px 21px;
        background-size: 24px 26px;
      }
    }

    input:focus {
      border-color: #E0E1E6 !important;
    }

    input:hover {
      border-color: #FCDC4E !important;
      background: url("~@/assets/images/global/blog_hover_user.svg") no-repeat 31px 21px;
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
      margin-top: 30px;
      margin-bottom: 23px;

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
  .blog-detail {
    padding-bottom: 60px;

    .wrapper {
      padding: 0 4vw;
    }

    .left {
      width: 100%;

      .breadcrumb {
        padding-top: 20px;
        line-height: normal;
        border-bottom: none;

        a, span {
          display: inline-block;
          font: 500 14px Montserrat;
        }
      }

      .meta-info {
        padding-top: 22px;

        h1 {
          font: 600 22px/27px Montserrat;
        }

        p.intro {
          margin-top: 16px;
          font: 400 14px/17px Montserrat;
        }

        hr {
          margin-top: 16px;
        }

        p.info {
          margin-top: 12px;
          font: 400 12px/14px Montserrat;
        }
      }

      .related-list {
        margin-top: 40px;

        h2 {
          margin-bottom: 18px;
          font: 600 16px/24px Montserrat;
        }

        a {
          margin-top: 10px;
          padding-bottom: 10px;
          font: 500 14px/20px Montserrat;
          @include text-ellipsis-multi(2);
        }
      }
    }

    .right {
      margin-left: 0;
      margin-top: 60px;
      width: 100%;

      .mix-container {
        padding: 4vw;

        .btn {
          margin-top: 22px;
          width: 72vw;
          height: 50px;
        }
      }

      .hot-list {
        margin-top: 62px;

        h2 {
          font: 600 16px/24px Montserrat;
        }

        .links {
          a {
            margin-top: 20px;
            padding-bottom: 14px;

            span {
              font: 500 16px Montserrat;
            }
          }
        }
      }
    }

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
          font: 14px Montserrat;
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

            b {
              display: block;
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
          }
        }
      }

    }
  }
}
</style>

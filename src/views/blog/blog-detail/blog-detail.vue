<template>
  <div class="blog-detail">
    <!--    <div id="header-blank" class="header-blank pc"></div>-->
    <blog-title-v2 :blog-id="blogSortObj.id" />

    <div class="wrapper">
      <div class="left" :class="{ 'lang-arabic': langArabic }">
        <transition name="fade-skeleton" mode="out-in">
          <div v-if="!ajaxRequesting" key="Box1">
            <div class="breadcrumb">
              <nuxt-link to="/">{{ $t('global.header.menu.home') }}</nuxt-link>
              <span>&gt;</span>
              <nuxt-link to="/blog">{{ $t('global.header.menu.blog') }}</nuxt-link>
              <span>&gt;</span>
              <a @click="backToBlogList">{{ blogSortObj.breadcrumb || '' }}</a>
              <!--<span>&gt;</span>-->
              <!--<b>{{ blogDetailObj['page_title'] || '' }}</b>-->
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
                :to="`/blog/${unit.alia}`"
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
          <p class="sub"><span>{{ $t('blogDetail.subtitle') }}</span></p>
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
          <p class="sub b"><i></i><span>{{ $t('global.safe') }}</span></p>
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
import $ from 'jquery';
import api from '@/api/api.blog';
import ButtonDownloadAndroid from '@/components/button/button-download-android';
import ButtonPurple from '@/components/button/button-purple';
import ButtonDownloadIos from '@/components/button/button-download-ios';
import ButtonDownloadWindows from '@/components/button/button-download-windows';
import BlogTitleV2 from '@/views/blog/static-modules/blog-title-v2/blog-title-v2';

// 模块动态挂载 *************************************************************************
import Vue from 'vue';
import blogSearch from '@/views/blog/dynamical-modules/blog-search/blog-search.vue';
import blogBuy from '@/views/blog/dynamical-modules/blog-buy-auto-followers/blog-buy-auto-followers.vue';
import imgGalleryCom from '@/views/blog/dynamical-modules/blog-img-gallery/blog-img-gallery';
import blogBuyAutoLikes from '@/views/blog/dynamical-modules/blog-buy-auto-likes/blog-buy-auto-likes.vue';

const MyBlogBuy = Vue.extend(blogBuy);
const ImgGallery = Vue.extend(imgGalleryCom);
const BlogBuyAutoLikes = Vue.extend(blogBuyAutoLikes);
const BlogSearch = Vue.extend(blogSearch);
// **************************************************************************************

export default {
  name: 'BlogDetail',
  components: {
    BlogTitleV2,
    ButtonDownloadWindows,
    ButtonDownloadIos,
    ButtonDownloadAndroid,
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
      renderTimer: false,
      renderTimerCounter: 0,
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
    clearInterval(this.renderTimer);
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

    // New nuxt asyncData方式请求
    getBlogDetailByProps(data) {
      this.blogDetailObj = data['article'];
      this.langArabic = this.COMMON.langCheckIsArabic(data['article']['seo_title']);

      if (process.client) {
        this.$nextTick(() => {
          this.renderOfDynamicalModules();
        });
        this.getHotArticleList();
        this.blogSortObj = data['sort'] || {};
        this.blogSortObj.breadcrumb = data['sort'].title || '';
        this.$storage.set('blogPrevSort', this.blogSortObj);
      }

      this.ajaxRequesting = false;
    },
    // Old CSR方式请求
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
        this.$nuxt.$axios.post(
          api.getBlogDetail,
          this.COMMON.paramSign(param)
        ).then((response) => {
          if (response.data.status === 'ok') {
            this.blogDetailObj = response.data['article'];
            this.langArabic = this.COMMON.langCheckIsArabic(response.data['article']['seo_title']);

            this.$nextTick(() => {
              this.renderOfDynamicalModules();
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
      this.$nuxt.$axios.post(
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

    // 动态挂载
    renderOfDynamicalModules() {
      this.renderRelatedListByJQ();
      this.renderArticleIndexByJQ();
      this.blogSearchDisplay();
      this.blogBuyAutoFollowersDisplay();
      this.blogBuyAutoLikesDisplay();
      this.imgGalleryDisplay();

      setTimeout(() => {
        this.renderDetector();
      }, 500);
    },
    renderDetector() {
      this.renderTimer = setInterval(() => {
        if (this.renderTimerCounter === 0 && this.renderTimerCounter < 2) {
          this.renderOfDynamicalModules();
          this.renderTimerCounter++;
          console.log('DynamicalModulesRenderDetector Ticks');
        } else {
          clearInterval(this.renderTimer);
        }
      }, 1000);
    },
    renderArticleIndexByJQ() {
      let _this = this;
      let titleList = $('#blogDetailContent').find('.title-list');

      let indexClassName = titleList.length > 9 ? 'double' : '';

      let articleIndexA = `<div class="index ${indexClassName}"><ul>`;
      let articleIndexB = `</ul></div>`;
      let articleIndexContent = ``;
      titleList.each(function () {
        articleIndexContent += `<li>${$(this).text()}</li>`;
        _this.renderTimerCounter++;
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
      let _this = this;
      let rList = [];
      let container = $('#blogDetailContent').find('.redirect');
      container.off().find('a').each(function () {
        rList.push({
          title: $(this).text(),
          alia: $(this).attr('href').split('/').pop()
        });
        _this.renderTimerCounter++;
      });
      container.remove();
      this.relatedArticleList = rList;
    },
    blogSearchDisplay() {
      let _this = this;
      const checkNode = [...document.querySelectorAll('.blogBanner')];
      if (checkNode.length) {
        for (let j = 0; j < checkNode.length; j++) {
          let component = new BlogSearch({ propsData: { ax: '10', sendThis: this } }).$mount();
          checkNode[j].parentNode.replaceChild(component.$el, checkNode[j]);
          _this.renderTimerCounter++;
        }
      }
    },
    blogBuyAutoFollowersDisplay() {
      let _this = this;
      let checkBuy = [...document.querySelectorAll('.blogBuy')];
      if (checkBuy.length) {
        for (let j = 0; j < checkBuy.length; j++) {
          let component = new MyBlogBuy({ propsData: { sendThis: this } }).$mount();
          checkBuy[j].parentNode.replaceChild(component.$el, checkBuy[j]);
          _this.renderTimerCounter++;
        }
      }
    },
    blogBuyAutoLikesDisplay() {
      let _this = this;
      const checkNode = [...document.querySelectorAll('.blogBuyDailyLikes')];
      if (checkNode.length) {
        for (let j = 0; j < checkNode.length; j++) {
          let component = new BlogBuyAutoLikes({ propsData: { sendThis: this } }).$mount();
          checkNode[j].parentNode.replaceChild(component.$el, checkNode[j]);
          _this.renderTimerCounter++;
        }
      }
    },
    imgGalleryDisplay() {
      let _this = this;
      const checkNode = [...document.querySelectorAll('.img-gallery')];
      if (checkNode.length) {
        for (let i = 0; i < checkNode.length; i++) {
          let imgListArray = [];
          const container = checkNode[i];
          const imgNodes = container.querySelectorAll('img');
          for (let j = 0; j < imgNodes.length; j++) {
            imgListArray.push(imgNodes[j].src);
          }
          let component = new ImgGallery({
            propsData: {
              imgDirectionHorizontal: container.classList.contains('horizontal'),
              imgList: imgListArray
            }
          }).$mount();
          container.parentNode.replaceChild(component.$el, container);
          _this.renderTimerCounter++;
        }
      }
    },

    backToBlogList() {
      if (process.client) {
        this.$storage.set('blogDetailVisited', true);
      }
      this.$router.push({ path: '/blog' });
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

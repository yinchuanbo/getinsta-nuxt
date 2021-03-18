<template>
  <div id="blog-1-content" class="blog-1-content">
    <div class="wrapper">
      <div class="left">
        <div class="search-category">
          <div class="search">
            <label class="search-container">
              <input
                v-model="keywords" type="search"
                :placeholder="$t('blog.search.placeHolder')"
                @keypress.enter="searchList"
              >
            </label>
          </div>
          <div class="category pc">
            <transition name="fade-skeleton" mode="out-in">
              <div v-if="!ajaxRequestingTab">
                <a v-for="(unit, i) in tabList" :key="i" @click="tabToList(unit, i)">
                  <span>{{ unit.title }}</span>
                </a>
              </div>
              <div v-if="ajaxRequestingTab" key="s1" class="skeleton-list">
                <div v-for="i in 6" :key="i" class="skeleton">
                  <a><span></span></a>
                </div>
              </div>
            </transition>
          </div>
          <div class="category mobile" :class="{ 'on': tabExpend }"
               :style="{ height: tabHeightLength * tabHeightBase + 'px' }"
          >
            <transition name="fade-skeleton" mode="out-in">
              <div v-if="!ajaxRequestingTab">
                <a
                  v-for="(unit, i) in tabList"
                  :key="i"
                  :class="{ 'active': tabListIndex === i }"
                  @click="tabSwitch(unit, i)"
                >
                  <span>{{ unit.title }}</span>
                </a>
              </div>
              <div v-if="ajaxRequestingTab" key="s1" class="skeleton-list">
                <div v-for="i in 6" :key="i" class="skeleton">
                  <a><span></span></a>
                </div>
              </div>
            </transition>
          </div>
        </div>
        <div v-if="articleHotList.length !== 0" class="hot-list pc">
          <h2>{{ $t('blog.hotArticles') }}</h2>
          <div class="links">
            <router-link
              v-for="(unit, i) in articleHotList" :key="i"
              :to="`/blog/${unit['urlalias']}`"
              :title="unit.title || 'Unknown Link'"
            >
              <span>{{ unit.title || 'Unknown Link' }}</span>
            </router-link>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="breadcrumb">
          <router-link to="/">{{ $t('global.header.menu.home') }}</router-link>
          <span>&gt;</span>
          <a href="javascript:" @click="returnAllList">{{ $t('global.header.menu.blog') }}</a>
          <span>&gt;</span>
          <a><b>{{ breadcrumb }}</b></a>
        </div>
        <div class="article-list">
          <transition name="fade-skeleton" mode="out-in">
            <div v-if="!ajaxRequesting" key="s0">
              <div v-for="(unit,i) in articleList" :key="i" class="unit">
                <router-link :to="`/blog/${unit['urlalias']}`">
                  <h3>{{ unit.title }}</h3>
                  <p>{{ unit['remark'] }}</p>
                </router-link>
              </div>

              <pagination
                :records="articleListTotal" :page="articleListCurrent"
                :per-page="articleListPageSize"
                :options="paginationOptions"
                @paginate="paginateCallback"
              ></pagination>

              <list-empty v-if="articleList.length === 0" :msg="$t('blog.error.listEmpty')" />
            </div>
            <div v-if="ajaxRequesting" key="s1" class="skeleton-list">
              <div v-for="i in 6" :key="i" class="skeleton">
                <div class="h3"></div>
                <div class="p"></div>
                <div class="p"></div>
              </div>
            </div>
          </transition>
        </div>
        <div v-if="articleHotList.length !== 0" class="hot-list mobile">
          <h2>{{ $t('blog.hotArticles') }}</h2>
          <div class="links">
            <router-link
              v-for="(unit, i) in articleHotList" :key="i"
              :to="`/blog/${unit['urlalias']}`"
              :title="unit.title || 'Unknown Link'"
            >
              <span>{{ unit.title || 'Unknown Link' }}</span>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../../api/api.blog';
import ListEmpty from '@/components/list/list-empty';

export default {
  name: 'Blog1Content',
  components: { ListEmpty },
  data() {
    return {
      tabList: [
        {
          id: '',
          addtime: '',
          title: this.$t('blog.breadCrumbs.latestArticles')
        }
      ],
      tabListIndex: 0,

      breadcrumb: this.$t('blog.breadCrumbs.latestArticles'),
      keywords: '',
      tabExpend: false,
      tabHeightBase: 71,
      tabHeightLength: 1,
      articleList: [],
      articleListTotal: 0,
      articleListCurrent: 1,
      articleListPageSize: 10,
      paginationOptions: {
        chunk: 7
      },
      articleHotList: [],
      ajaxRequesting: false,
      ajaxRequestingTab: false,
      ajaxRequestingHot: false
    };
  },
  mounted() {
    this.checkTabStorage();
    this.getHotArticleList();
  },
  methods: {
    tabSwitch(unit, i) {
      if (this.tabExpend === false) {
        this.tabExpend = true;
        this.tabHeightLength = this.tabList.length;
      } else {
        // this.tabListIndex = i;
        this.tabExpend = false;
        this.tabHeightLength = 1;
        this.tabToList(unit, i);
      }
    },
    getTabList() {
      if (!this.ajaxRequesting) {
        this.ajaxRequestingTab = true;
        this.ajaxRequesting = true;
        this.$axios.post(
          api.getBlogCategory,
          this.COMMON.paramSign({
            client_lan: this.$i18n.locale
          })
        ).then((response) => {
          this.ajaxRequesting = false;
          this.ajaxRequestingTab = false;
          // console.log(response.data);
          if (response.data.status === 'ok') {
            this.tabList = [...this.tabList, ...response.data['sorts']];

            if (this.tabList.length > 0) {
              if (this.tabListIndex > this.tabList.length - 1) {
                this.getArticleList(this.tabList[this.tabList.length - 1].id, this.tabList[this.tabList.length - 1].title);
              } else if (this.tabListIndex === -1 || this.tabListIndex === 0) {
                this.getArticleList('', this.breadcrumb);
              } else {
                this.getArticleList(this.tabList[this.tabListIndex].id, this.tabList[this.tabListIndex].title);
              }
            }

            this.$storage.set('blogPrevSort', {
              index: -1,
              id: '',
              breadcrumb: this.breadcrumb
            });
          } else {
            if (response.data.type === 'updating') {
              this.$alert(
                '', 'info', '',
                'For a better experience, our server is being upgraded, please visit us later.',
                '', ''
              );
            }
          }
        }).catch(() => {
          console.log('......................catch error');
          this.ajaxRequesting = false;
          this.ajaxRequesting = false;
        });
      }
    },
    getArticleList(CategoryID, breadcrumb) {
      if (!this.ajaxRequesting) {
        this.ajaxRequesting = true;
        this.breadcrumb = breadcrumb;
        this.$axios.post(
          api.getBlogList,
          this.COMMON.paramSign({
            page: this.articleListCurrent,
            page_size: this.articleListPageSize,
            sort: CategoryID,
            keywords: this.keywords,
            client_lan: this.$i18n.locale
          })
        ).then((response) => {
          // console.log(response.data);
          if (response.data.status === 'ok') {
            this.articleList = response.data['articles'];
            this.articleListTotal = response.data['page_info']['total_count'];
          }
          this.ajaxRequesting = false;
        }).catch((error) => {
          console.log('getArticleList error:', error);
          this.ajaxRequesting = false;
        });
      }
    },
    getHotArticleList() {
      if (!this.ajaxRequestingHot) {
        this.ajaxRequestingHot = true;
        this.$axios.post(
          api.getHotBlogList,
          this.COMMON.paramSign({
            client_lan: this.$i18n.locale
          })
        ).then((response) => {
          if (response.data.status === 'ok') {
            this.articleHotList = response.data['articles'];
          }
          this.ajaxRequestingHot = false;
        }).catch(() => {
          console.log('......................catch error');
          this.ajaxRequestingHot = false;
        });
      }
    },
    tabToList(tabUnit, i) {
      if (this.tabListIndex !== i) {
        this.tabListIndex = i;

        this.keywords = '';
        this.getArticleList(tabUnit.id, tabUnit.title);

        this.$storage.set('blogPrevSort', {
          index: i,
          id: tabUnit.id,
          breadcrumb: this.breadcrumb
        });
      }

      this.articleListCurrent = 1;
      this.$scrollTo('#blog-1-content', { offset: -80 });
    },
    checkTabStorage() {
      if (
        this.$storage.has('blogDetailVisited')
        && this.$storage.get('blogDetailVisited') === true
        && this.$storage.has('blogPrevSort')
        // 判断条件：localStorage 存在 blogDetailVisited 且值为 true
        // 同时 blogPrevSort 值存在
      ) {
        const blogPrevSort = this.$storage.get('blogPrevSort');
        this.breadcrumb = blogPrevSort.breadcrumb;
        this.tabListIndex = blogPrevSort.index;
      }
      this.getTabList();
      this.$storage.set('blogDetailVisited', false);
    },
    paginateCallback(pageNo) {
      if (this.articleListCurrent !== pageNo) {
        this.articleListCurrent = pageNo;

        let sortID = '';
        if (this.tabListIndex !== -1) {
          sortID = this.tabList[this.tabListIndex].id;
        }
        this.getArticleList(sortID, this.breadcrumb);
        this.$scrollTo('#blog-1-content', { offset: -80 });
      }
    },

    returnAllList() {
      this.keywords = '';
      this.tabListIndex = -1;
      this.getArticleList('', this.$t('blog.breadCrumbs.latestArticles'));
    },
    searchList() {
      this.getArticleList('', 'Search results');
    }
  }
};
</script>

<style lang="scss" scoped>
.blog-1-content {
  padding-bottom: 80px;
  font-size: 0;

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
        transition: all 0.1s;

        span {
          font: 500 16px/20px Montserrat;
          color: #7E7E7E;
          @include text-ellipsis-multi(2);
        }

        &:hover {
          span {
            color: #005fff;
          }
        }
      }
    }
  }

  .left {
    margin-top: -40px;
    display: inline-block;
    vertical-align: top;
    width: 342px;

    .search-category {
      background: #FFFFFF;
      box-shadow: 0 5px 10px #00136112;
      border-radius: 6px;

      .search {
        padding: 40px 30px;

        label.search-container {
          display: inline-block;
          width: 280px;
          height: 56px;

          input {
          }
        }
      }

      .category {
        padding-bottom: 40px;

        a {
          position: relative;
          padding: 0 30px;
          display: inline-block;
          width: 100%;
          height: 60px;
          background-color: transparent;
          transition: all 0.3s;

          span {
            display: inline-block;
            width: 100%;
            height: 100%;
            font: 700 16px/60px Montserrat;
            color: #2A2A2A;
            border-bottom: 1px solid #E8E8E8;
          }

          &:after {
            position: absolute;
            top: 26px;
            right: 20px;
            display: inline-block;
            width: 34px;
            height: 8px;
            background-image: url("~@/assets/images/global/icon_navgation_right.svg");
            content: "";
            opacity: 0;
            transform: translateX(-10px);
            transition: all 0.3s;
          }

          &:hover {
            background-color: #7C56FF;

            span {
              color: #FFFFFF;
              border-color: transparent;
            }

            &:after {
              opacity: 1;
              transform: translateX(0);
            }
          }
        }

        .skeleton-list {
          .skeleton {
            a {
              display: block;
              width: 100%;

              &:hover {
                &:after {
                  display: none;
                }
              }

              span {
                margin-top: 22px;
                display: inline-block;
                width: 100%;
                height: 16px;
              }
            }

            span {
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
        }
      }
    }
  }

  .right {
    margin-left: 60px;
    display: inline-block;
    vertical-align: top;
    width: 808px;

    .breadcrumb {
      line-height: 80px;
      border-bottom: 1px solid #E8E8E8;

      a, span {
        margin: 0 2px;
        display: inline-block;
        font: 500 16px/82px Montserrat;
        color: #7E7E7E;

        b {
          color: #000000;
          font-weight: 600;
        }
      }
    }

    .article-list {
      // margin-top: 40px;

      .unit {
        margin-top: 20px;
        padding-bottom: 20px;
        border-bottom: 1px solid #E8E8E8;
        cursor: pointer;
        font-size: 0;

        * {
          transition: all 0.1s;
        }

        h3 {
          font: 600 20px/24px Montserrat;
          color: #2A2A2A;
          @include text-ellipsis-multi(2);
        }

        p {
          margin-top: 12px;
          font: 400 16px/19px Montserrat;
          color: #2A2A2A;
          @include text-ellipsis-multi(2);
        }

        &:hover {
          * {
            color: #005fff;
          }
        }
      }

      .skeleton-list {
        .skeleton {
          margin-top: 20px;
          padding-bottom: 34px;
          border-bottom: 1px solid #E8E8E8;

          .h3 {
            margin-top: 12px;
            width: 78%;
            height: 20px;
          }

          .p {
            margin-top: 32px;
            width: 96.5%;
            height: 20px;

            &:last-child {
              margin-top: 6px;
              width: 88.8%;
            }
          }

          * {
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
      }
    }
  }
}

@media (max-width: 768px) {
  .blog-1-content {
    padding-bottom: 60px;
    font-size: 0;

    .wrapper {
      padding: 4vw;
      width: 100%;
    }

    .hot-list {
      margin-top: 56px;

      h2 {
        margin-bottom: 36px;
        font: 600 16px/24px Montserrat;
      }

      .links {
        a {
          margin-top: 16px;
          padding-bottom: 16px;
          font: 500 16px/20px Montserrat;
          color: #005fff;
          @include text-ellipsis-multi(2);
        }
      }
    }

    .left {
      margin-top: -40px;
      width: 100%;

      .search-category {
        .search {
          padding: 4vw;

          label.search-container {
            display: inline-block;
            width: 100%;
            height: 44px;
          }
        }

        .category {
          position: relative;
          padding-bottom: 0;
          height: 71px;
          border-radius: 0 0 12px 12px;
          overflow: hidden;
          transition: all 0.3s;

          &:before {
            position: absolute;
            top: 30px;
            right: 28px;
            z-index: 2;
            content: "";
            display: block;
            width: (29px/2);
            height: (15px/2);
            background: url("~@/assets/images/blog/blog__icon_triangle.svg") no-repeat center;
            background-size: contain;
            transition: all 0.3s;
          }

          &.on {
            padding-top: 71px;

            &:before {
              transform: rotate(180deg);
            }
          }

          a {
            padding: 0;
            height: 71px;
            background-color: #fff;

            span {
              padding: 0 4vw;
              font: 700 16px/70px Montserrat;
              color: #2A2A2A;
              border-top: 1px solid #E8E8E8;
              border-bottom: none;
            }

            &:after {
              display: none;
            }

            &:hover {
              background-color: #fff;

              span {
                color: #2A2A2A;
                border-color: #E8E8E8;
              }
            }

            &.active {
              position: absolute;
              top: 0;
              left: 0;
              z-index: 1;
            }
          }

          .skeleton-list {
            .skeleton {
              a {
                padding: 0 20vw 0 4vw;

                &:hover {
                  &:after {
                    display: none;
                  }
                }

                span {
                  margin-top: 26px;
                  height: 16px;
                }
              }

              span {
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
          }
        }
      }
    }

    .right {
      margin-left: 0;
      vertical-align: top;
      width: 100%;

      .breadcrumb {
        display: none;
      }

      .article-list {
        margin-top: 40px;

        .unit {
          * {
            transition: all 0.1s;
          }

          h3 {
            font: 600 16px/20px Montserrat;
            @include text-ellipsis-multi(2);
          }

          p {
            margin-top: 11px;
            font: 400 16px/20px Montserrat;
            @include text-ellipsis-multi(2);
          }

          &:hover {
            * {
              color: #005fff;
            }
          }
        }

        .skeleton-list {
          .skeleton {
            margin-top: 20px;
            padding-bottom: 34px;

            .h3 {
              margin-top: 12px;
              width: 78%;
              height: 20px;
            }

            .p {
              margin-top: 16px;
              width: 96.5%;
              height: 20px;

              &:last-child {
                margin-top: 6px;
                width: 88.8%;
              }
            }

            * {
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
        }
      }
    }
  }
}
</style>

<template>
  <div class="get-1-add home__sec">
    <div class="wrapper">
      <h1 class="home__sec_h2">{{ $t('get.add.title') }}</h1>
      <p class="home__sec_p">{{ $t('get.add.subTitle') }}</p>
      <div class="get-1-add__container">
        <div class="control-search_ins">
          <label>
            <input
              v-model="searchInsInput" type="text"
              :placeholder="$t('get.add.search.placeholder')"
            >
          </label>
          <div class="search_btn" @click="searchUsername">
            <button-purple
              :text="$t('get.add.search.searchBtn')"
              :sharp="true" :loading="searchInsLoading"
            />
          </div>
        </div>

        <div id="search-result">
          <transition name="fade-skeleton">
            <div v-if="userStatus.search"
                 :class="{ 'follow': userStatus.follow }"
                 class="get-1-add__container_user"
            >
              <div class="tab">
                <div class="unit"
                     :class="{ 'on': userStatus.follow }"
                     @click="switchStatus(true)"
                >
                  <span>{{ $t('get.add.search.tabs.tab-0') }}</span>
                </div>
                <div class="unit"
                     :class="{ 'on': !userStatus.follow }"
                     @click="switchStatus(false)"
                >
                  <span>{{ $t('get.add.search.tabs.tab-1') }}</span>
                </div>
              </div>
              <div class="content">
                <div class="user-info">
                  <div class="avatar">
                    <img :src="insUser.profile_pic_url || ''" alt="">
                  </div>
                  <h3>{{ insUser.ins_account || 'Unknown username' }}</h3>
                  <p>
                    <span><b>{{ insUser.post.post_count || 0 }}</b>{{ $t('global.instagramConcept.posts') }}</span>
                    <span><b>{{ insUser.followed_by || 0 }}</b>{{ $t('global.instagramConcept.followers') }}</span>
                    <span><b>{{ insUser.follow || 0 }}</b>{{ $t('global.instagramConcept.following') }}</span>
                  </p>
                </div>
                <transition name="fade-tabs">
                  <div v-if="!userStatus.follow" class="post-container">
                    <h4>{{ $t('store.buy.search.post.title.text') }}</h4>
                    <div class="post-list">
                      <div class="post-list-wrapper">
                        <div
                          v-for="(unit, i) in postList" :key="i"
                          :class="{ 'selected': postListIndex === i }"
                          class="img-container"
                          @click="selectedPost(i)"
                        >
                          <img :src="unit.like_pic_url" alt="">
                          <div class="mark">
                            <i></i>
                            <p>+50</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <a v-if="postListInfo.has_next_page && !postListLoading"
                       class="load-more" @click="postListNext"
                    >{{ $t('store.buy.search.post.loadMore.text') }}</a>
                    <p v-if="postListLoading"
                       class="load-more loading"
                    >
                      {{ $t('store.buy.search.post.loadMore.loading') }}
                    </p>
                    <div v-if="!postListInfo.has_next_page" class="post-blank"></div>
                  </div>
                </transition>
              </div>
              <div class="btn-container__bottom" @click="ga1">
                <router-link to="/login">
                  <button-purple
                    :text="$t('get.add.bottomBtn')"
                    :font-size="'size-20'" :square="true"
                  />
                </router-link>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>

    <transition name="fade">
      <div v-if="dialogFail" class="uni-dialog-box enter-box enter-mask">
        <div class="mask"></div>
        <div class="container">
          <i class="close" @click="closeDialog()"></i>
          <div class="content">
            <div class="model-box alert">
              <div class="title">
                <i class="icon"></i>
                <h3>{{ $t('global.modelBox.title.oops') }}</h3>
              </div>
              <p class="note" v-html="dialogFailMsg"></p>
              <div class="btn" @click="closeDialog()">
                <button-purple
                  :text="$t('global.modelBox.btn.close')"
                  :font-size="'size-16'" :square="true"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="dialogAttention" class="uni-dialog-box enter-box enter-mask">
        <div class="mask"></div>
        <div class="container">
          <i class="close" @click="closeDialog()"></i>
          <div class="content">
            <div class="model-box attention">
              <div class="title">
                <i class="icon"></i>
                <h3>{{ $t('global.modelBox.title.wait') }}</h3>
              </div>
              <p class="note" v-html="dialogAttentionMsg"></p>
              <div class="btn" @click="closeDialog()">
                <button-purple
                  :text="$t('global.modelBox.btn.close')"
                  :font-size="'size-16'" :square="true"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import api from '~/src/api/api.account.js';
import apiIns from '~/src/api/api.ins';
import apiInsServer from '~/src/api/api.ins.server';

import ButtonPurple from '@/components/button/button-purple';

export default {
  name: 'Get1Add',
  components: { ButtonPurple },
  data() {
    return {
      dialogFail: false,
      dialogFailMsg: '',
      dialogAttention: false,
      dialogAttentionMsg: '',

      searchInsLoading: false,
      searchInsInput: '',

      userStatus: {
        search: false,
        follow: true
      },
      insUser: {},
      postList: [],
      postListIndex: -1,
      postListInfo: {
        post_count: 0,
        end_cursor: '',
        has_next_page: false,
        page_size: 12
      },
      postListLoading: false
    };
  },
  mounted() {
  },
  methods: {
    closeDialog() {
      this.dialogFail = false;
      this.dialogAttention = false;
    },
    switchStatus(boolean) {
      this.userStatus.follow = boolean;
    },

    searchUsername: function () {
      this.searchInsByServerV2();
      this.ga0();
    },
    searchInsByServerV2() {
      if (this.searchInsInput === '') {
        // this.dialogAttentionMsg = this.$t('get.add.search.error.noUsername');
        // this.dialogAttention = true;

        this.$alert(
          '', 'warn',
          this.$t('global.modelBox.title.wait'),
          this.$t('store.buy.error.noInsID.text'),
          'normal',
          this.$t('global.modelBox.btn.close')
        );
        return;
      }
      if (this.searchInsLoading) return;

      this.searchInsLoading = true;
      this.axios.post(
        apiInsServer.getAccountByUsername,
        this.COMMON.paramSign({ ins_account: this.searchInsInput })
      ).then((response) => {
        this.searchInsLoading = false;
        this.userStatus.search = true;

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

        setTimeout(() => {
          this.$scrollTo('#search-result', { offset: -100 });
        }, 500);
      }).catch((error) => {
        this.closeDialog();
        this.searchInsLoading = false;
        // this.dialogFailMsg = 'Failed to get your Instagram data, or there\'s no such an Instagram account. Please try again.';
        this.$alert(
          '', 'error',
          this.$t('global.modelBox.title.oops'),
          this.$t('store.buy.error.errorInsID.text'),
          'normal',
          this.$t('global.modelBox.btn.close')
        );
        setTimeout(() => {
          this.dialogFail = true;
        }, 300);
        console.error('Catch Error: searchIns: ', error);
      });
    },
    searchIns() {
      if (this.searchInsInput === '') {
        // this.dialogAttentionMsg = 'Please enter username.';
        // this.dialogAttention = true;
        this.$alert(
          '', 'warn',
          this.$t('global.modelBox.title.wait'),
          this.$t('store.buy.error.noInsID.text'),
          'normal',
          this.$t('global.modelBox.btn.close')
        );
        return;
      }
      if (this.searchInsLoading) return;

      this.searchInsLoading = true;
      this.axios.get(
        `https://www.instagram.com/${this.searchInsInput}/`
      ).then((response) => {
        this.searchInsLoading = false;
        this.userStatus.search = true;

        const responsePage = response.data;
        const _sharedDataStr = responsePage.match('window._sharedData = (.*);<\/script')[1];
        const _sharedData = JSON.parse(_sharedDataStr);
        const _sharedDataUser = _sharedData['entry_data']['ProfilePage'][0]['graphql']['user'];
        const _sharedDataUserPosts = _sharedDataUser['edge_owner_to_timeline_media'];
        // console.log(_sharedData);
        // console.log(_sharedDataUser);
        // console.log(this.dataStored.user.ins_account.accounts[this.dataStoredInsListIndex - 1]);
        // console.log(this.dataStored.user.ins_account.accounts);

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

        setTimeout(() => {
          this.$scrollTo('#search-result', { offset: -100 });
        }, 500);
      }).catch((error) => {
        this.closeDialog();
        this.searchInsLoading = false;
        // this.dialogFailMsg = 'Failed to get your Instagram data, or there\'s no such an Instagram account. Please try again.';
        this.$alert(
          '', 'error',
          this.$t('global.modelBox.title.oops'),
          this.$t('store.buy.error.errorInsID.text'),
          'normal',
          this.$t('global.modelBox.btn.close')
        );
        setTimeout(() => {
          this.dialogFail = true;
        }, 300);
        console.error('Catch Error: searchIns: ', error);
      });
    },
    searchInsByServer() {
      if (this.searchInsInput === '') {
        // this.dialogAttentionMsg = 'Please enter username.';
        // this.dialogAttention = true;
        this.$alert(
          '', 'warn',
          this.$t('global.modelBox.title.wait'),
          this.$t('store.buy.error.noInsID.text'),
          'normal',
          this.$t('global.modelBox.btn.close')
        );
        return;
      }
      if (!this.searchInsLoading) {
        this.searchInsLoading = true;
        this.axios.post(
          api.getInsInfo,
          this.COMMON.paramSign(
            {
              'ins_account': this.searchInsInput
            }
          )
        ).then((response) => {
          this.searchInsLoading = false;
          if (response.data.status === 'ok') {
            this.userStatus.search = true;
            this.insUser = response.data['ins_info'];
            this.postList = response.data['ins_info'].post['post_list'];

            this.postListInfo.post_count = response.data['ins_info'].post.post_count;
            this.postListInfo.end_cursor = response.data['ins_info'].post.end_cursor;
            this.postListInfo.has_next_page = response.data['ins_info'].post.post_count > this.postListInfo.page_size;
            setTimeout(() => {
              this.$scrollTo('#search-result', { offset: -100 });
            }, 500);
          } else {
            // this.dialogFailMsg = 'Please enter valid username.';
            // this.dialogFail = true;
            this.$alert(
              '', 'error',
              this.$t('global.modelBox.title.oops'),
              this.$t('store.buy.error.errorInsID.text'),
              'normal',
              this.$t('global.modelBox.btn.close')
            );
          }
        }).catch((error) => {
          this.searchInsLoading = false;
          this.dialogFailMsg = '<samp>'
            + '<b>Error Status:</b> ' + error.status
            + '<br>' + '<b>Error Message:</b> ' + error.statusText
            + '</samp>';
          this.dialogFail = true;
          console.log('Catch Error: searchIns', error);
        });
      }
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

    selectedPost(i) {
      this.postListIndex = i;
    },
    postListNext() {
      // v2
      // let param = {
      //   id: this.insUser.ins_id,
      //   first: this.postListInfo.page_size,
      //   after: this.postListInfo.end_cursor
      // };
      // v1
      let param = {
        ins_id: this.insUser.ins_id,
        page_size: this.postListInfo.page_size,
        end_cursor: this.postListInfo.end_cursor
      };
      // this.postListNextRequestV2(param);
      this.postListNextRequest(param)
    },
    postListNextRequest(param) {
      if (!this.postListLoading) {
        this.postListLoading = true;
        this.axios.post(
          api.getInsPost,
          this.COMMON.paramSign(param)
        ).then((response) => {
          this.postListLoading = false;
          if (response.data.status === 'ok') {
            this.postList = [...this.postList, ...response.data.data.post['post_list']];
            this.renderPostListInfo(
              response.data.data.post['post_count'],
              response.data.data.post['page_info']['end_cursor'],
              response.data.data.post['page_info']['has_next_page']
            );
          } else {
            this.dialogFailMsg = '<samp>'
              + '<b>Error Type:</b> ' + response.data.error.type
              + '<br>' + '<b>Error Message:</b> ' + response.data.error.message
              + '</samp>';
            this.dialogFail = true;
          }
        }).catch((error) => {
          this.ajaxRequesting = false;
          this.dialogFailMsg = '<samp>'
            + '<b>Error Status:</b> ' + error.status
            + '<br>' + '<b>Error Message:</b> ' + error.statusText
            + '</samp>';
          this.dialogFail = true;
          console.log('Catch Error: postListNextRequest');
          console.log(error);
        });
      }
    },
    postListNextRequestV2(param) {
      if (!this.postListLoading) {
        this.postListLoading = true;

        const paramTrans = JSON.stringify(param);

        this.axios.get(
          `${apiIns.insPostList}${paramTrans}`
        ).then((response) => {
          this.postListLoading = false;

          // console.log(response.data.data.user['edge_owner_to_timeline_media']['edges']);
          const insPostObj = response.data.data.user['edge_owner_to_timeline_media'];

          for (let i = 0; i < insPostObj['edges'].length; i++) {
            let insPostObjTransUnit = {};
            insPostObjTransUnit.like_id = insPostObj['edges'][i]['node']['id'];
            insPostObjTransUnit.like_pic_url = insPostObj['edges'][i]['node']['thumbnail_src'];
            insPostObjTransUnit.like_count = insPostObj['edges'][i]['node']['edge_media_preview_like']['count'];
            insPostObjTransUnit.short_code = insPostObj['edges'][i]['node']['shortcode'];

            this.postList.push(insPostObjTransUnit);
          }

          this.renderPostListInfo(
            insPostObj.count,
            insPostObj['page_info']['end_cursor'],
            insPostObj['page_info']['has_next_page']
          );

        }).catch((error) => {
          this.postListLoading = false;

          // this.dialogFailMsg = 'Request Instagram Data failed, please try again later.';
          // this.dialogFail = true;
          this.$alert(
            '', 'error',
            this.$t('global.modelBox.title.oops'),
            this.$t('store.buy.error.errorRequest.text'),
            'normal',
            this.$t('global.modelBox.btn.close')
          );

          console.error('Catch Error: postListNextRequestV2: ', error);
        });
      }
    },
    renderPostListInfo(post_count, end_cursor, has_next_page) {
      let obj = {};
      obj.post_count = post_count;
      obj.end_cursor = end_cursor;
      obj.has_next_page = has_next_page;
      obj.page_size = this.postListInfo.page_size;

      this.postListInfo = obj;
    },
    ga0() {
      this.$ga.event('buttonclick', 'click', 'addnext');
    },
    ga1() {
      if (!this.userStatus.follow) {
        this.$ga.event('buttonclick', 'click', 'fget');
      } else {
        this.$ga.event('buttonclick', 'click', 'lget');
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.get-1-add {
  padding-bottom: 156px;

  .get-1-add__container {
    padding-top: 40px;
    text-align: center;

    .get-1-add__container_user {
      margin-top: 150px;

      &.follow {
        .content {
          padding-bottom: 100px;
        }
      }

      .tab {
        margin: 0 auto;
        display: flex;
        justify-content: center;
        align-items: flex-end;
        width: 800px;
        height: 76px;

        .unit {
          position: relative;
          width: 46%;
          height: 100%;
          cursor: pointer;
          transition: all 0.3s;

          &:last-child {
            margin-left: 16px;
          }

          span {
            position: relative;
            top: 8px;
            font: 600 20px/76px Montserrat;
            color: #2A2A2A;
            transition: all 0.3s;
          }

          &:before {
            position: absolute;
            bottom: 0;
            left: 0;
            z-index: -1;
            width: 100%;
            height: 79%;
            background-color: #F3F3F3;
            border-radius: 12px 12px 0 0;
            transition: all 0.3s;
            content: "";
          }

          &:hover {
            &:before {
              height: 87%;
            }
          }

          &.on {
            cursor: default;

            span {
              top: 0;
              color: #FFFFFF;
            }

            &:before {
              height: 100%;
              background-color: #A896DB;
            }
          }
        }
      }

      .content {
        margin: 0 auto;
        padding: 80px 50px 0;
        width: 800px;
        background: #FFFFFF;
        box-shadow: 0 10px 20px #00136112;
        border-radius: 12px;
        transition: all 0.3s;

        .user-info {
          .avatar {
            margin: 0 auto;
            width: 136px;
            height: 136px;
            text-align: center;

            img {
              width: 100%;
              height: 100%;
              border-radius: 50%;
              object-fit: cover;
            }
          }

          h3 {
            margin-top: 40px;
            font: 500 30px/60px Montserrat;
            color: #2A2A2A;
          }

          p {
            display: flex;
            justify-content: space-evenly;
            font: 500 16px/60px Montserrat;
            color: #A8A8A8;

            b {
              margin-right: 8px;
              font-size: 24px;
              color: #2A2A2A;
            }
          }
        }

        .post-container {
          h4 {
            font: 600 20px/60px Montserrat;
            color: #2A2A2A;
            text-align: left;
          }
        }
      }

      .btn-container__bottom {
        margin: 42px auto 0;
        width: 800px;
        height: 80px;
      }
    }
  }
}

@media (max-width: 768px) {
  .get-1-add {
    padding-bottom: (156px/2);

    .wrapper {
      padding: 0 4vw;
    }

    .get-1-add__container {
      padding-top: 20px;

      .get-1-add__container_user {
        margin-top: (80px/2);

        &.follow {
          .content {
            padding-bottom: 50px;
          }
        }

        .tab {
          width: 100%;
          height: 52px;

          .unit {
            &:last-child {
              margin-left: 8px;
            }

            span {
              top: 4px;
              font: 600 14px/58px Montserrat;
            }

            &:before {
              border-radius: 6px 6px 0 0;
            }
          }
        }

        .content {
          padding: 10vw 4vw 0;
          width: 100%;
          box-shadow: 0 5px 10px #00136112;
          border-radius: 6px;

          .user-info {
            .avatar {
              width: 80px;
              height: 80px;
            }

            h3 {
              margin-top: 20px;
              font: 500 16px/30px Montserrat;
            }

            p {
              font: 500 12px/30px Montserrat;

              b {
                margin-right: 4px;
                font-size: 18px;
              }
            }
          }

          .post-container {
            margin-top: 20px;

            h4 {
              font: 600 16px/30px Montserrat;
            }
          }
        }

        .btn-container__bottom {
          margin: 21px auto 0;
          width: 100%;
          height: 56px;
        }
      }
    }
  }
}
</style>

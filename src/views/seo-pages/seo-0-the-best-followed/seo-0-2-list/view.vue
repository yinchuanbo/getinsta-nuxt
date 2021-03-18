<template>
  <div id="seo-0-anchor-01" class="seo-0-2-list">
    <div class="wrapper">
      <h2>Top 20 Most Followed Instagram Accounts Ranking - Update Daily</h2>
      <h3>Profiles Ranked by Followers on {{ dateStr }}</h3>
      <div id="seo-0-anchor-01-01" class="table-container">
        <div v-if="!loading">
          <div v-for="pageNo of listPageNoMax" :key="pageNo" class="page">
            <table v-if="listIndex === pageNo - 1">
              <tbody>
                <tr>
                  <th>Rank</th>
                  <th>Profile</th>
                  <th>Followers</th>
                  <th>Posts</th>
                  <th>Influence</th>
                </tr>
                <tr v-for="(unit, i) in listComputed.slice(listPageSize * (pageNo - 1), listPageSize * pageNo)" :key="i">
                  <td>{{ unit.rank }}</td>
                  <td>
                    <img :src="unit.profile_pic_url || defaultAvatar" alt="avatar">
                    <div class="text">
                      <p class="name">{{ unit.user_name }}</p>
                      <!--                    <p class="id">@{{ unit.id }}</p>-->
                    </div>
                  </td>
                  <td>{{ unit.followed_by }}</td>
                  <td>{{ unit.post_count }}</td>
                  <td>{{ unit.influence }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div v-if="loading">
          <div class="page">
            <table class="skeleton">
              <tbody>
                <tr>
                  <th>Rank</th>
                  <th>Profile</th>
                  <th>Followers</th>
                  <th>Posts</th>
                  <th>Influence</th>
                </tr>
                <tr v-for="i of 10" :key="i">
                  <td><i></i></td>
                  <td>
                    <i class="img"></i>
                    <div class="text">
                      <i class="name"></i>
                      <i class="id"></i>
                    </div>
                  </td>
                  <td><i></i></td>
                  <td><i></i></td>
                  <td><i></i></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="pagination">
        <a v-for="i of listPageNoMax" :key="i"
           :class="{ 'on': listIndex === i - 1 }"
           :title="`Go to table page No. ${i}`"
           @click="listSwitch(i)"
        >
          {{ i }}
        </a>
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
import defaultAvatar from '@/assets/images/global/icon_avatar_default.svg';
import api from '@/api/api.other';

export default {
  name: 'Seo02List',
  components: {},
  data() {
    return {
      defaultAvatar,
      list: [],
      listIndex: 0,
      listPageSize: 10,
      loading: false,
      dialogFailMsg: '',
      dialogFail: false,
      dateStr: ''
    };
  },
  computed: {
    listPageNoMax() {
      return Math.floor(this.list.length / this.listPageSize);
    },
    listComputed() {
      return this.list.slice(0, 20);
    }
  },
  mounted() {
    this.requestInsData();
    this.updateDate();
  },
  methods: {
    closeDialog() {
      this.dialogFail = false;
    },
    listSwitch(i) {
      this.listIndex = i - 1;
      this.$scrollTo(`#seo-0-anchor-01-01`, { offset: -1 * document.getElementById('header').offsetHeight });
      return false;
    },
    requestInsData() {
      if (!this.loading) {
        this.loading = true;

        const param = {
          page: 1
        };

        this.$axios.post(
          api.getMostFollowed,
          this.COMMON.paramSign(param)
        ).then((response) => {
          this.loading = false;
          if (response.data.status === 'ok') {
            this.list = response.data['users'];
          }
        }).catch((error) => {
          this.loading = false;
          this.dialogFailMsg = '<samp>'
            + '<b>Error Status:</b> ' + error.status
            + '<br>' + '<b>Error Message:</b> ' + error.statusText
            + '</samp>';
          this.dialogFail = true;
          console.error(`requestInsData: `, error);
        });
      }
    },
    updateDate() {
      this.dateStr = new Date().toDateString();
    }
  }
};
</script>

<style scoped lang="scss" src="view.scss"></style>

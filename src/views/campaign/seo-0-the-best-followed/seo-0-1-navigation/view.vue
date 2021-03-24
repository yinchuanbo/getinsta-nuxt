<template>
  <div ref="mark" class="seo-0-1-navigation">
    <div class="wrapper">
      <p>
        Nowadays, Instagram is not only a social photo platform but a lifestyle.
        Like all the other social media platforms, Instagram has its own leaders in the number of followers.
        Have you ever wondered <b>who has the most followers on Instagram</b>?
        Whether you are looking for Instagrammer with the most followers to follow or hoping to get some inspiration for
        <nuxt-link to="/">getting more followers</nuxt-link>
        , this daily updated list is all you need for the <b>most followed persons on Instagram</b>.
      </p>
      <div class="navigation">
        <h3>Table of Contents</h3>
        <ul>
          <li v-for="(unit, i) in navigationList" :key="i"
              :class="{ 'highlight': unit.highlight }"
              @click="naviHandle(unit.naviID)"
          >
            {{ unit.text }}
          </li>
        </ul>
      </div>
    </div>

    <div class="float-navigation pc" :class="{ 'active': navigationListActive, 'show': floatNaviShow }">
      <div class="title" title="Click to toggle me" @click="listExpand(!navigationListActive)">
        <i></i>
        <span>Table of Contents</span>
        <em></em>
      </div>
      <div ref="listContainer" class="list">
        <ul ref="list">
          <li v-for="(unit, i) in navigationList" :key="i"
              :class="{ 'highlight': unit.highlight }"
              @click="naviHandle(unit.naviID)"
          >
            {{ unit.text }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import ClickOutside from 'vue-click-outside';

export default {
  name: 'Seo01Navigation',
  components: {},
  directives: {
    ClickOutside
  },
  data() {
    return {
      navigationListActive: false,
      floatNaviShow: false,
      navigationList: [
        {
          highlight: false,
          naviID: 'seo-0-anchor-01',
          text: '1. Top 20 Most Followed Instagram Accounts Ranking - Update Daily'
        },
        {
          highlight: false,
          naviID: 'seo-0-anchor-02',
          text: '2. Top 20 Most Followed Persons on Instagram in 2021'
        },
        {
          highlight: true,
          naviID: 'seo-0-anchor-04',
          text: '3. The Best Way to Get Free IG Followers & Likes - Works Well'
        },
        {
          highlight: false,
          naviID: 'seo-0-anchor-03',
          text: '4. 5 Ways to Be Most Followed Instagram Account'
        }
      ]
    };
  },
  mounted() {
    window.addEventListener('scroll', this.handle);
  },
  destroyed() {
    window.removeEventListener('scroll', this.handle);
  },
  methods: {
    handle() {
      const fun = this.handleScroll();
      this.COMMON.throttle(fun, 60, 100);
    },
    handleScroll() {
      this.floatNaviShow =
        document.documentElement.scrollTop
        >= document.getElementById('seo-0-anchor-01').offsetTop;
    },
    naviHandle(naviID) {
      this.$scrollTo(`#${naviID}`, { offset: -1 * document.getElementById('header').offsetHeight });
    },
    listExpand(direction) {
      if (direction) {
        const height = this.$refs.list.offsetHeight;
        this.$refs.listContainer.style.height = `${height}px`;
        this.navigationListActive = true;
      } else {
        this.$refs.listContainer.style.height = 0;
        this.navigationListActive = false;
      }
    }
  }
};
</script>

<style scoped lang="scss" src="view.scss"></style>

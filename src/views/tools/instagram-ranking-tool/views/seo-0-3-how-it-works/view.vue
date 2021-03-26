<template>
  <div class="seo-0-3-how-it-works pc">
    <div class="wrapper">
      <div class="title">How It Works</div>
      <div class="content">
        <div v-for="(unit, i) in list" :key="i" class="unit">
          <img :src="unit.icon" alt="icon">
          <h3>{{ unit.title }}</h3>
          <p>{{ unit.content }}</p>
        </div>
      </div>
      <p class="note">
        <a @click="naviHandle('seo-0-anchor-04')">See the Best Way to Free Get Real Followers and Likes</a>
      </p>
    </div>
  </div>
</template>

<script>
import icon0 from '@/assets/images/seo-pages/seo-0-the-best-followed/seo-0-3-how-it-works/seo-0-3-how-it-works__icon-00.svg';
import icon1 from '@/assets/images/seo-pages/seo-0-the-best-followed/seo-0-3-how-it-works/seo-0-3-how-it-works__icon-01.svg';
import icon2 from '@/assets/images/seo-pages/seo-0-the-best-followed/seo-0-3-how-it-works/seo-0-3-how-it-works__icon-02.svg';

export default {
  name: 'Seo03HowItWorks',
  components: {},
  data() {
    return {
      icon0,
      icon1,
      icon2,
      list: [
        {
          icon: icon0,
          title: 'Collect raw data',
          content: 'Collect raw data from different sources, depersonalize and group it.'
        },
        {
          icon: icon1,
          title: 'Check account quality',
          content: 'Check the account quality and rank them by real followers and authentic engagement.'
        },
        {
          icon: icon2,
          title: 'Rank & update',
          content: 'Rank global influencers and update ranking daily.'
        }
      ]
    };
  },
  computed: {},
  mounted() {
  },
  methods: {
    naviHandle(naviID) {
      this.$scrollTo(`#${naviID}`, { offset: -1 * document.getElementById('header').offsetHeight });
    }
  }
};
</script>

<style scoped lang="scss" src="./view.scss"></style>

<template>
  <div class="v-d-6-tips public-des">
    <div class="wrapper">
      <h2>More Instagram Tips and Tutorials</h2>
      <div class="tips">
        <ul>
          <li v-for="(unit, i) in tipList" :key="i">
            <nuxt-link :to="unit.link">{{ unit.text }}</nuxt-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VD6Tips',
  components: {},
  data() {
    return {
      tipList: [
        {
          text: 'How to Download Instagram Live Video',
          link: '/blog/download-instagram-live-video-30'
        },
        {
          text: 'How to Add White Border for Instagram Photos',
          link: '/blog/white-border-for-instagram-24'
        },
        {
          text: 'How to Use Instagram to Make Money',
          link: '/blog/use-instagram-to-make-money-17'
        },
        {
          text: '5 Steps to Get Instagram Followers from 0 to 10K',
          link: '/blog/instagram-followers-10k-9'
        },
        {
          text: 'How to Get Instagram Followers Instantly Free',
          link: '/blog/instagram-followers-instantly-free-10'
        },
        {
          text: '5 Best App to Get Instagram Likes for Free',
          link: '/blog/best-app-to-get-instagram-likes-18'
        }
      ]
    };
  },
  mounted() {
  },
  methods: {}
};
</script>

<style lang="scss" scoped src="./v-d-6-tips.scss"></style>

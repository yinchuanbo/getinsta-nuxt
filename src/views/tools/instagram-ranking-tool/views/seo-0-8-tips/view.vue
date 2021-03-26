<template>
  <div class="seo-0-8-tips">
    <div class="wrapper">
      <h2>More Instagram Tips and Tutorials</h2>
      <div class="tips">
        <ul>
          <li v-for="(unit, i) in tipList" :key="i">
            <router-link :to="unit.link">{{ unit.text }}</router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Seo08Tips',
  components: {  },
  data() {
    return {
      tipList: [
        {
          text: '5 Best App to Get Instagram Likes for Free in 2020',
          link: '/blog/best-app-to-get-instagram-likes-18'
        },
        {
          text: 'Get Instagram Followers Instantly Free',
          link: '/blog/instagram-followers-instantly-free-10'
        },
        {
          text: 'How to Get Instagram Followers from 0 to 10k, 50K',
          link: '/blog/instagram-followers-10k-9'
        },
        {
          text: '3 Best Tools to Get Instagram Likes without Password',
          link: '/blog/get-instagram-likes-without-password-26'
        },
        {
          text: 'How to Buy Real Instagram Followers',
          link: '/blog/buy-instagram-followers-real-32'
        },
        {
          text: '4 Best Apps for Tracking Instagram Followers',
          link: '/blog/best-apps-for-tracking-instagram-followers-22'
        }
      ]
    };
  },

  mounted() {
  },
  methods: {
  }
};
</script>

<style scoped lang="scss" src="./view.scss"></style>

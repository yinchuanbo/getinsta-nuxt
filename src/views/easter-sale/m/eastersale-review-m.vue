<template>
  <div class="eastersale-review">
    <h3>Customer Review</h3>
    <div class="eastersale-review_cards">
      <eastersale-review-m-card :lists="lists" />
    </div>
  </div>
</template>

<script>
import EastersaleReviewMCard from './eastersale-review-m-card'
export default {
  components: {
    EastersaleReviewMCard
  },
  data() {
    return {
      lists: [
        {
          id: 0,
          name: 'Happy Yadav',
          avator: require('../images/reviewer-avatar-3.7dce082a.png'),
          text: 'Hello, I am Happy Yadav, Blogger and YouTuber. As you know that having BIG numbers on Social Media is a subject of luck sometime and the key to treasure. Thanks with their system that helps in increasing our social presence. Mine most beloved feature is Active & Real Followers with coins system. Hats off to you.'
        },
        {
          id: 1,
          name: 'Carrie-Ann Edmonds',
          avator: require('../images/reviewer-avatar-1.2e33b780.png'),
          text: 'I’m a college student. Instagram and Twitter are the most often-used apps for me. My story is a bit wired. I was popular on twitter, but not the same as on Ins. Thanks for finding easygetinsta.com while surfing on the internet. I got the insta followers apk on my Samsung and gained lots of followers and likes easily.'
        },
        {
          id: 2,
          name: 'Melvin Warner',
          avator: require('../images/reviewer-avatar-2.60fa38d4.png'),
          text: 'It worked. Awesome! I don\'t need to spend money to get Instagram followers or likes that I want. But, it needs coins. Fortunately, when I first sign up and log in on the app, it gives me hundreds of coins instantly. I have used the coins to get likes successfully.'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.eastersale-review {
  width: 100%;
  display: flex;
  flex-direction: column;
  h3 {
    font: normal normal 600 32px/40px BalooChettan;
    letter-spacing: 0px;
    color: #000000;
    opacity: 1;
    text-align: center;
    margin-bottom: 50px;
  }
}
</style>

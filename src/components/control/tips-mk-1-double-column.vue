<template>
  <div class="tips-mk-1-double-column">
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
  name: 'TipsMk1DoubleColumn',
  components: {},
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
  methods: {}
};
</script>

<style scoped lang="scss">
.tips-mk-1-double-column {
  padding-top: 124px;
  padding-bottom: 130px;

  h2 {
    font: 600 44px Montserrat;
    color: #2A2A2A;
    text-align: center;
  }

  .tips {
    ul {
      width: 100%;
      margin-top: 32px;
      font-size: 0;

      li {
        margin-top: 40px;
        display: inline-block;
        width: 50%;
        vertical-align: top;

        &:nth-child(odd) {
          padding-right: 20px;
        }

        a {
          position: relative;
          padding-left: 28px;
          font: 500 18px Montserrat;
          color: #2A2A2A;
          transition: all 0.3s;

          &:before {
            position: absolute;
            top: 3px;
            left: 0;
            content: "";
            display: inline-block;
            width: 15px;
            height: 15px;
            background: url("~@/assets/images/global/icon-point-blue.svg") center/contain no-repeat;
          }

          &:hover {
            color: #005FFF;
          }
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .tips-mk-1-double-column {
    padding: 60px 0;

    h2 {
      padding: 0 4vw;
      font: 600 22px Montserrat;
      color: #2A2A2A;
      text-align: center;
    }

    .tips {
      ul {
        margin-top: 16px;

        li {
          margin-top: 17px;
          padding: 0 8vw;
          width: 100%;

          &:nth-child(odd) {
            padding-right: 8vw;
          }

          a {
            padding-left: 28px;
            font: 500 12px Montserrat;

            &:before {
              width: 10px;
              height: 10px;
            }
          }
        }
      }
    }
  }
}
</style>

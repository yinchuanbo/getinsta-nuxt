<template>
  <div class="seo-1-lottery">
    <seo10-main />

    <download-banner-mk1
      :h2-text="pageAndroid?'GetinsAdd Helps You Gain More Free Coins':'GetInsta - Get Free Instagram Followers and Likes'"
      :ul="pageAndroid?bannerUl_s:bannerUl"
      :ga-param="gaParam0"
      :pageandroid="pageAndroid"
    />

    <tips-mk0
      :wrapper-width-pc="560"
      :title="pageAndroid?'More Tips for Getting Free IG Followers':'More Tips for Get IG Followers for Free'"
      :tip-list="pageAndroid ? tipListAndroid : tipList"
    />

    <p class="copyright">GetInsta reserves the right of final explanation for this campaign.</p>

    <footer-module-mk0 />
  </div>
</template>

<script>
import Seo10Main from './views/seo-1-0-main/view';
import DownloadBannerMk1 from './views/download-banner-mk-1/download-banner-mk-1';
import TipsMk0 from '@/components/control/tips-mk-0-single-column';
import FooterModuleMk0 from '@/components/footer/footer-module-mk-0';

export default {
  name: 'Seo1Lottery',
  components: {
    Seo10Main,
    DownloadBannerMk1,
    TipsMk0,
    FooterModuleMk0
  },
  data() {
    return {
      pageAndroid: false,
      tipList: [
        {
          text: 'How to Get Free Instagram Followers Instantly',
          link: '/blog/instagram-followers-instantly-free-10'
        },
        {
          text: 'How to Grow Instagram Followers from 0 to 10k',
          link: '/blog/instagram-followers-10k-9'
        },
        {
          text: '5 Best App to Get Instagram Likes for Free',
          link: '/blog/best-app-to-get-instagram-likes-18'
        },
        {
          text: 'IG Followers APK to Get Free Followers & Likes',
          link: '/blog/instagram-followers-apk-37'
        },
        {
          text: 'How to Get Instagram Likes without Password',
          link: '/blog/get-instagram-likes-without-password-26'
        },
        {
          text: 'Get Real IG Followers on iPhone & Android',
          link: '/blog/instagram-followers-app-28'
        }
      ],
      tipListAndroid: [
        {
          text: 'How to Get Free IG Followers Instantly',
          link: '/blog/instagram-followers-instantly-free-10'
        },
        {
          text: 'How to Get 1K Followers on IG in 5 Minutes',
          link: '/blog/get-1k-instagram-followers-in-5-minutes-232'
        },
        {
          text: 'Top 7 Best App to Get Free Real IG Followers',
          link: '/blog/best-app-to-get-free-real-instagram-followers-5'
        },
        {
          text: '7 Best Apps to Get Free Instagram Likes',
          link: '/blog/best-app-to-get-instagram-likes-18'
        },
        {
          text: 'IG Followers APK - Get Free Followers & Likes',
          link: '/blog/instagram-followers-apk-37'
        },
        {
          text: '4 Best Free App to Increase Real IG Followers & Likes',
          link: '/blog/app-to-increase-instagram-followers-11'
        }
      ],
      gaParam0: {
        bigBtn: {
          labelTextGeneral: 'luckydrawdl-',
          windows: 'win2',
          ios: 'ios2',
          android: 'app2'
        },
        smallBtn: {
          labelTextGeneral: 'luckydrawdl-',
          ios: 'ios2',
          android: 'app2'
        }
      },
      bannerUl: [
        'Get 1000 Instagram followers for free in one day.',
        '100% active followers from real people.',
        'No password. No survey. 24/7 Customer support.'
      ],
      bannerUl_s: [
        'Watch short videos to gain unlimited coins.',
        'Each video takes between 5 and 15 seconds.',
        'No password, no login, and no following.'
      ]
    };
  },
  mounted() {
    this.pageAndroid = this.$route.path === '/event-lucky-draw-1';
    this.title = this.pageAndroid
      ? 'Take the Chance to Win COINS <br> Once per Day'
      : 'GetInsta - Lucky Draw';

    if (this.$route.path === '/lucky-draw-test') {
      this.gaParam0 = {
        bigBtn: {
          labelTextGeneral: 'luckydrawdl-',
          windows: 'win2-test',
          ios: 'ios2-test',
          android: 'app2-test'
        },
        smallBtn: {
          labelTextGeneral: 'luckydrawdl-',
          ios: 'ios2-test',
          android: 'app2-test'
        }
      };
    }
  },
  methods: {}
};
</script>

<style scoped lang="scss" src="./lottery.scss"></style>

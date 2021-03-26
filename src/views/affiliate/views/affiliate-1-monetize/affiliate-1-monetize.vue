<template>
  <div ref="mark" class="affiliate-1-monetize" :class="{ on: animateBegin }">
    <div class="wrapper">
      <div class="title">
        <h2>Monetize Your Traffic with GetInsta Affiliate Program</h2>
        <p>
          If you are a website owner, YouTuber, blogger, online marketer, or if you work on the Internet, GetInsta affiliate program is an easy way to monetize your traffic.
          GetInsta helps people increase Instagram followers easily in a nature and safe way. Join our affiliate program, introduce GetInsta in your channel and let's start making
          money today!
        </p>
      </div>

      <div class="feature">
        <div v-for="(unit, i) in dataList" :key="i" class="unit" :class="`type-${i} step-${i}`">
          <img :src="unit.icon" alt="icon">
          <h2>{{ unit.title }}</h2>
          <p>{{ unit.text }}</p>
          <a v-if="unit.link" href="javascript:" @click="scrollTo">Learn more ></a>
        </div>
      </div>

      <div class="btn step-5" @click="jumpOut">
        <button-theme-gradient text="Join us Now" />
      </div>
    </div>
  </div>
</template>

<script>
// components
import ButtonThemeGradient from '@/components/button/button-theme-gradient';
// img
import icon0 from '../../img/affiliate-1-monetize__icon1.svg';
import icon1 from '../../img/affiliate-1-monetize__icon2.svg';
import icon2 from '../../img/affiliate-1-monetize__icon3.svg';
import icon3 from '../../img/affiliate-1-monetize__icon4.svg';
import icon4 from '../../img/affiliate-1-monetize__icon5.svg';

export default {
  name: 'Affiliate1Monetize',
  components: {
    ButtonThemeGradient
  },
  data: () => ({
    icon0, icon1, icon2, icon3, icon4,
    dataList: [
      {
        icon: icon0,
        title: 'Commission Rate',
        text: 'We offer significant commission rate, starting at 10% per sale. As your sales increase, your commission rate can get up to 30%.',
        link: true
      },
      {
        icon: icon1,
        title: 'Payment',
        text: 'Your payment will be made on a monthly basis.',
        link: false
      },
      {
        icon: icon2,
        title: 'Cookie',
        text: 'Fully track your sales and support cookie lifetime of 90 days.',
        link: false
      },
      {
        icon: icon3,
        title: 'Product',
        text: 'We offer instant solutions to help users get followers and likes on Instagram. Most importantly, GetInsta is trusted by users all over the world, as it ensures users\' privacy & safety.',
        link: false
      },
      {
        icon: icon4,
        title: 'Advertising Materials',
        text: 'We have prepared high-converting advertising banners and landing pages for you to place on your website.',
        link: false
      }
    ],
    animateBegin: false
  }),
  mounted() {
    window.addEventListener('scroll', this.handle);
  },
  destroyed() {
    window.removeEventListener('scroll', this.handle);
  },
  methods: {
    handleScroll() {
      this.animateBegin = this.$refs.mark.getBoundingClientRect().top < window.innerHeight * 0.66;
    },
    handle() {
      const fun = this.handleScroll();
      this.COMMON.throttle(fun, 60, 100);
    },
    scrollTo() {
      this.$scrollTo('#affiliate-3-commission', { offset: -1 * this.COMMON.headerHeight() });
    },
    jumpOut() {
      window.location.href = 'https://easygetinsta.idevaffiliate.com/signup.php';
    }
  }
};
</script>


<style scoped lang="scss">
@include animateSteps(6);
</style>
<style scoped lang="scss" src="../../views/affiliate-1-monetize/affiliate-1-monetize.scss"></style>

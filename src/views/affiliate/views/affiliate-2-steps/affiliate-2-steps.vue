<template>
  <div ref="mark" class="affiliate-2-steps" :class="{ on: animateBegin }">
    <div class="wrapper">
      <div class="title">
        <h2>How to Start Making Money with GetInsta?</h2>
      </div>

      <div class="unit-list">
        <div v-for="(unit, i) in dataList" :key="i" class="unit" :class="`step-${i}`">
          <div class="sequence">{{ i + 1 }}</div>
          <div class="line"></div>
          <h2>{{ unit.title }}</h2>
          <p>{{ unit.text }}</p>
        </div>
      </div>

      <div class="btn step-3" @click="jumpOut">
        <button-theme-gradient text="Start Earning Now" />
      </div>
    </div>
  </div>
</template>

<script>
// components
import ButtonThemeGradient from '@/components/button/button-theme-gradient';

export default {
  name: 'Affiliate2Steps',
  components: {
    ButtonThemeGradient
  },
  data: () => ({
    dataList: [
      {
        title: 'Step 1 - Sign Up',
        text: 'Click "Start Earning Now" to apply GetInsta affiliate program, we will review your application in 1 business day.',
        link: true
      },
      {
        title: 'Step 2 - Insert Ads',
        text: 'Copy your ads & banner with your affiliate id included and place it on your website.',
        link: false
      },
      {
        title: 'Step 3 - Get Paid',
        text: 'Receive commissions when your customers purchase through your affiliate link.',
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
    jumpOut() {
      window.location.href = 'https://easygetinsta.idevaffiliate.com/signup.php';
    }
  }
};
</script>

<style scoped lang="scss">
@include animateSteps(4);
</style>
<style scoped lang="scss" src="../../views/affiliate-2-steps/affiliate-2-steps.scss"></style>

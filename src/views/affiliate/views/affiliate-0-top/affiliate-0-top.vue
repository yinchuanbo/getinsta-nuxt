<template>
  <div class="affiliate-0-top" :class="{ on: animateBegin }">
    <div class="header-blank"></div>
    <div class="wrapper">
      <div class="img">
        <img src="../../img/affiliate-0-top__social-media-animate.svg" alt="turn">
      </div>

      <div class="text">
        <h1 class="step-0">Turn Your Traffic into Revenue!</h1>
        <p class="step-1">Join GetInsta affiliate program now to earn up to 30% commission on the sales you referred.</p>
        <div class="btn step-2" @click="jumpOut">
          <button-theme-gradient text="Become GetInsta Affiliate" />
        </div>
      </div>

      <div class="mouse pc"></div>
    </div>
  </div>
</template>

<script>
import ButtonThemeGradient from '@/components/button/button-theme-gradient';

export default {
  name: 'Affiliate0Top',
  components: {
    ButtonThemeGradient
  },
  data: () => ({
    animateBegin: false
  }),
  mounted() {
    setTimeout(() => {
      this.animateBegin = true;
    });
  },
  methods: {
    jumpOut() {
      window.location.href = 'https://easygetinsta.idevaffiliate.com/signup.php';
    }
  }
};
</script>

<style scoped lang="scss">
@include animateSteps(3);
</style>
<style scoped lang="scss" src="../../views/affiliate-0-top/affiliate-0-top.scss"></style>

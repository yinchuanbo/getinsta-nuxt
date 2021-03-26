<template>
  <div ref="mark" class="affiliate-4-contact" :class="{ on: animateBegin }">
    <div class="wrapper">
      <h2>Have Questions about the Program?</h2>
      <img v-if="animateBegin" src="../../img/affiliate-4-contact__new-message-animate.svg" alt="">
      <h4>Please Contact</h4>
      <h3><a href="mailto:affiliate@easygetinsta.com">affiliate@easygetinsta.com</a></h3>
      <div class="btn" @click="jumpOut">
        <button-yellow-download text="Become GetInsta Affiliate" :theme="'blue'" />
      </div>
      <p>Start Selling Today and Making More Money</p>
    </div>
  </div>
</template>

<script>
import ButtonYellowDownload from '@/components/button/button-yellow-download';

export default {
  name: 'Affiliate4Contact',
  components: { ButtonYellowDownload },
  data: () => ({
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

<style scoped lang="scss" src="../../views/affiliate-4-contact/affiliate-4-contact.scss"></style>

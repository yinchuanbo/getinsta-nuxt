<template>
  <div class="get-3-now home__sec">
    <div class="wrapper">
      <h2 class="home__sec_h2">{{ $t('get.how.title') }}</h2>
      <p class="home__sec_p">{{ $t('get.how.subTitle') }}</p>
      <div v-scroll-to="{el: '#get-add', offset: -80}" class="btn-container" @click="ga0">
        <button-purple :text="$t('get.how.btn')" />
      </div>
    </div>
  </div>
</template>

<script>
import ButtonPurple from '@/components/button/button-purple';

export default {
  name: 'Get3Now',
  components: { ButtonPurple },
  data() {
    return {
      animateOn: false
    };
  },
  mounted() {
    setTimeout(() => {
      this.animateOn = true;
    }, 100);
  },
  methods: {
    ga0() {
      this.$ga.event('buttonclick', 'click', 'fladd');
    }
  }
};
</script>

<style lang="scss" scoped>
.get-3-now {
  /*padding-top: 100px;*/
  background-color: #F8F9FC;
  text-align: center;

  .btn-container {
    margin-top: 90px;
    display: inline-block;
    width: 490px;
    height: 100px;
  }
}

@media (max-width: 768px) {
  .get-3-now {
    .btn-container {
      margin-top: 45px;
      width: 290px;
      height: 50px;
    }
  }
}
</style>

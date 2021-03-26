<template>
  <div ref="mark" class="affiliate-3-commission" :class="{ on: animateBegin }">
    <div id="affiliate-3-commission" class="wrapper">
      <figure>
        <figcaption>
          <img
            v-if="animateBegin"
            class="mobile"
            src="../../img/affiliate-3-commission__finance-animate.svg"
            alt="More Sales, More Revenue!"
          >
          <h2>More Sales, More Revenue!</h2>
          <p>GetInsta provide increasing commission rate and the commission incensement is based on your monthly sales performance.</p>
          <img
            v-if="animateBegin"
            class="pc"
            src="../../img/affiliate-3-commission__finance-animate.svg"
            alt="More Sales, More Revenue!"
          >
        </figcaption>

        <div class="figure-container">
          <h2>Commission Rate</h2>

          <div class="lines">
            <i v-for="i in 6" :key="i"></i>
          </div>

          <div class="columns">
            <div v-for="(unit, i) in dataList" :key="i" class="unit">
              <b>{{ unit.percent }}</b>
              <i></i>
              <p v-html="unit.text"></p>
            </div>
          </div>
        </div>
      </figure>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Affiliate3Commission',
  components: {},
  data: () => ({
    animateBegin: false,
    dataList: [
      {
        percent: '10%',
        text: 'Less than $500 USD'
      },
      {
        percent: '15%',
        text: 'From $500 <br> to $1000 USD'
      },
      {
        percent: '20%',
        text: 'From $1001 <br> to $2000 USD'
      },
      {
        percent: '25%',
        text: 'From $2001 <br> to $3000 USD'
      },
      {
        percent: '30%',
        text: 'Over <br> $3000 USD'
      }
    ]
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
    }
  }
};
</script>

<style scoped lang="scss" src="../../views/affiliate-3-commission/affiliate-3-commission.scss"></style>

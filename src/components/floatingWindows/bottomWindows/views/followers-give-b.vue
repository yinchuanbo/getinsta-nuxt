<template>
  <div v-show="is" class="fixed_bottom" @click="jump">
    <!--<router-link v-show="is" to="/followers-giveaway" class="fixed_bottom">-->
    <div class="box">
      <span class="pc">Time-limited Followers Giveaway is Available!</span>
      <span class="mb">Followers Giveaway! </span>
      <img
        class="pc"
        src="~@/assets/images/seo-pages/seo-7/bottom_i.svg"
        alt=""
      />
      <img
        class="mb"
        src="~@/assets/images/seo-pages/seo-7/bottom_i_m.svg"
        alt=""
      />
      <i class="hide pc" @click.stop="is = false"></i>
      <i class="mb min_i" @click.stop="is = false"></i>
    </div>
    <!--</router-link>-->
  </div>
</template>
<script>
export default {
  data() {
    return {
      is: true
    };
  },
  methods: {
    jump() {
      this.$ga.event('bannerclick', 'click', 'fgiveawaypchp');
      // this.COMMON.randomAbTest()
      //   ? this.$router.push({ path: '/thanksgiving-giveaway' })
      //   : this.$router.push({ path: '/followers-giveaway' });
      this.$router.push({ path: '/lucky-draw' });
    }
  }
};
</script>

<style scoped lang="scss" src="../../floatingWindows_pub.scss"></style>
<style lang="scss" scoped>
.fixed_bottom {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: url("~@/assets/images/seo-pages/seo-8/bg-1.svg") no-repeat center;
  background-size: cover;
  height: 93px;
  z-index: 99;
  cursor: pointer;

  .box {
    width: 1210px;
    height: 100%;
    margin: auto;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    span {
      font-size: 20px;
      font-weight: 600;
      color: #1e1e1e;
    }

    img {
      margin-left: 35px;
    }

    i.hide {
      right: 0;
      top: 10px;
    }
  }
}

@media (max-width: 768px) {
  .fixed_bottom {
    width: 100%;
    bottom: env(safe-area-inset-bottom);
    bottom: calc(56px + env(safe-area-inset-bottom));
    height: 47px;
    background: url("~@/assets/images/seo-pages/seo-8/bg-1_m.svg");
    background-size: contain;

    .box {
      width: 100%;

      span {
        font-size: 14px;
      }

      img {
        width: 125px;
        margin-left: 25px;
      }

      .min_i {
        right: 20px;
        top: -20px;
      }
    }
  }
}

</style>

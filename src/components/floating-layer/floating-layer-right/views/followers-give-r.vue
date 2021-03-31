<template>
  <div v-show="is" class="right_i" :class="{'ac':ac}" @click="jump">
    <!--<nuxt-link v-show="is" to="/followers-giveaway" class="right_i" :class="{'ac':ac}">-->
    <i class="hide pc" @click.stop="is = false"></i>
    <i class="mb min_i" @click.stop="is = false"></i>
    <img class="pc" src="../../img/right_pc.svg" alt="" />
    <img class="mb" src="../../img/right_m.svg" alt="" />
    <!--</nuxt-link>-->
  </div>
</template>
<script>
export default {
  data() {
    return {
      is: true,
      ac: false
    };
  },
  mounted() {
    setTimeout(() => {
      this.ac = true;
    }, 1000);
  },
  methods: {
    jump() {
      this.$ga.event('bannerclick', 'click', 'fgiveawayblog');
      // this.COMMON.randomAbTest()
      //   ? this.$nuxt.$router.push({ path: '/thanksgiving-giveaway' })
      //   : this.$nuxt.$router.push({ path: '/followers-giveaway' });
      this.$nuxt.$router.push({ path: '/lucky-draw' });
    }
  }
};
</script>
<style scoped lang="scss" src="../../floating-layer.scss"></style>
<style lang="scss" scoped>
.right_i {
  position: fixed;
  right: 0;
  z-index: 99;
  transition: all .3s;
  top: 50%;
  transform: translateX(100%);
  cursor: pointer;

  i.hide {
    right: 60px;
    top: -5px;
  }

  &.ac {
    transform: translateX(0);
  }
}

@media (max-width: 768px) {
  .right_i {
    right: -100px;

    i {
      right: 0;
      top: -20px;
    }

    img {
      width: 94px;
    }

    &.ac {
      right: 20px;
    }
  }
}
</style>

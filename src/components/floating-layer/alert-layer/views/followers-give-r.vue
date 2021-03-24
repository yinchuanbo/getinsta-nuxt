<template>
  <div v-show="is" class="right_i" :class="{'ac':ac}" @click="jump">
    <i class="hide pc" @click.stop="is = false"></i>
    <img class="pc" src="../img/alert-pc.svg" alt="" />
  </div>
</template>
<script>
export default {
  name: 'FollowersGiveR',
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
      // this.$ga.event('bannerclick', 'click', 'fgiveawayblog');
      // this.COMMON.randomAbTest()
      //   ? this.$router.push({ path: '/thanksgiving-giveaway' })
      //   : this.$router.push({ path: '/followers-giveaway' });

      let path = this.$route.path;
      if (path === '/') {
        if (this.$store.state.v2) { // 新
          this.$ga.event('bannerclick', 'click', 'hpspring-pcnew');
        } else { // 老
          this.$ga.event('bannerclick', 'click', 'hpspring-pcold');
        }
      } else {
        this.$ga.event('bannerclick', 'click', 'easter-pc');
      }
      this.$router.push({ path: '/eastersale' });
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
  top: 75%;
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
      // width: 94px;
      width: 120px;
    }

    &.ac {
      right: 20px;
    }
  }
}
</style>

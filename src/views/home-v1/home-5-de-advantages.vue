<template>
  <div ref="mark" :class="{ 'on': animateBegin }" class="home-5-de-advantages home__sec">
    <div class="wrapper">
      <div class="unit-container step-1">
        <div
          v-for="(unit, i) in dataList" :key="i"
          v-touch:swipe="swipeHandler"
          :class="{
            'center': i === dataListIndex,
            'left': i === leftIndex,
            'right': i === rightIndex,
          }"
          class="unit"
        >
          <img :src="unit.icon" alt="icon">
          <h3>{{ unit.title }}</h3>
          <p>{{ unit.text }}</p>
        </div>

        <div class="dots">
          <i v-for="(unit, i) in dataList" :key="i"
             :class="{ 'on': i === dataListIndex }"
             @click="dataListIndexSwitchDirect(i)"
          ></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import img0 from '../../assets/images/home/home-5-de-advantages/home-5-de-advantages__icon_real_human.svg';
import img1 from '../../assets/images/home/home-5-de-advantages/home-5-de-advantages__icon_rocket.svg';
import img2 from '../../assets/images/home/home-5-de-advantages/home-5-de-advantages__icon_support.svg';
import img3 from '../../assets/images/home/home-5-de-advantages/home-5-de-advantages__icon_app-download.svg';

export default {
  name: 'Home5DeAdvantages',
  components: {},
  data() {
    return {
      animateBegin: false,
      dataListIndex: 0
    };
  },
  computed: {
    dataList() {
      return [
        {
          icon: img0,
          title: this.$t('home.home-5-de.unit-0.title'),
          text: this.$t('home.home-5-de.unit-0.text')
        },
        {
          icon: img1,
          title: this.$t('home.home-5-de.unit-1.title'),
          text: this.$t('home.home-5-de.unit-1.text')
        },
        {
          icon: img2,
          title: this.$t('home.home-5-de.unit-2.title'),
          text: this.$t('home.home-5-de.unit-2.text')
        }
      ];
    },
    leftIndex() {
      return (this.dataListIndex - 1 < 0)
        ? this.dataListIndex - 1 + this.dataList.length
        : this.dataListIndex - 1;
    },
    rightIndex() {
      return (this.dataListIndex + 1 >= this.dataList.length)
        ? this.dataListIndex + 1 - this.dataList.length
        : this.dataListIndex + 1;
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handle);
  },
  destroyed() {
    window.removeEventListener('scroll', this.handle);
  },
  methods: {
    handleScroll: function () {
      this.animateBegin = this.$refs.mark.getBoundingClientRect().top < window.innerHeight * 0.66;
    },
    handle() {
      const fun = this.handleScroll();
      this.COMMON.throttle(fun, 60, 100);
    },
    dataListIndexSwitch(direction) {
      if (direction === 'next') {
        this.dataListIndex++;
        this.dataListIndex =
          this.dataListIndex >= this.dataList.length
            ? this.dataListIndex - this.dataList.length
            : this.dataListIndex;
      } else if (direction === 'prev') {
        this.dataListIndex--;
        this.dataListIndex =
          this.dataListIndex < 0
            ? this.dataListIndex + this.dataList.length
            : this.dataListIndex;
      }
    },
    dataListIndexSwitchDirect(i) {
      this.dataListIndex = i;
    },
    swipeHandler(direction) {
      if (this.COMMON.isMobile()) {
        if (direction === 'right') {
          this.dataListIndexSwitch('prev');
        }
        if (direction === 'left') {
          this.dataListIndexSwitch('next');
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@include animateSteps(1);

.home-5-de-advantages {
  padding-bottom: 0;

  .unit-container {
    display: flex;
    justify-content: space-between;
    text-align: center;

    .unit {
      padding: 0 15px;
      width: 33.33%;
      text-align: center;
      transition: all 0.6s cubic-bezier(0.25, 1, 0.5, 1);

      img {
        height: 110px;
      }

      h3 {
        margin-top: 26px;
        font: 600 24px Montserrat;
        color: #2A2A2A;
      }

      p {
        margin-top: 18px;
        font: 500 20px/32px Montserrat;
        color: #000000;
      }
    }

    .dots {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      text-align: center;
      font-size: 0;
      display: none;

      i {
        display: inline-block;
        margin: 0 8px;
        width: 12px;
        height: 12px;
        background-color: #C1CEE5;
        border-radius: 50%;
        cursor: pointer;
        transition: all 0.8s;

        &.on {
          background-color: #005FFF;
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .home-5-de-advantages {
    .unit-container {
      position: relative;
      display: block;
      height: 50vw;

      .unit {
        position: absolute;
        padding: 0 4vw;
        width: 100%;

        &.left, &.right {
          opacity: 0;
        }

        &.center {
          opacity: 1;
        }

        &.left, &.right {
          box-shadow: 0 10px 20px #2D4CC712;
          z-index: 0;
        }

        &.left {
          transform: translateX(-15vw) scale(1);
        }

        &.right {
          transform: translateX(15vw) scale(1);
        }

        &.center {
          transform: translateX(0) scale(1);
          z-index: 1;
        }

        img {
          max-width: (110px/2);
          height: (114px/2);
        }

        h3 {
          margin-top: (26px/2);
          font-size: (32px/2);
        }

        p {
          margin-top: (18px/2);
          font-size: (24px/2);
          line-height: (36px/2);
        }
      }

      .dots {
        display: block;

        i {
          margin: 0 4px;
          width: 6px;
          height: 6px;
        }
      }
    }
  }
}
</style>

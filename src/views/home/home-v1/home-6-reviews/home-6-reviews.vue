<template>
  <div ref="mark" :class="{ 'on': animateBegin }" class="home-6-reviews home__sec">
    <div class="wrapper">
      <h2 class="home__sec_h2 step-0">{{ h2Title }}</h2>
      <p class="star-rating step-1">
        <i></i>
        <i></i>
        <i></i>
        <i></i>
        <i class="half"></i>
      </p>

      <div class="slider-card step-2">
        <div class="card">
          <div
            v-for="(unit, i) in reviewList" :key="i"
            v-touch:swipe="swipeHandler"
            :class="{
              'center': i === reviewListIndex,
              'left': i === leftIndex,
              'right': i === rightIndex,
            }"
            class="unit"
          >
            <img :src="unit.avatar" alt="avatar">
            <h3 class="title">{{ unit.author }}</h3>
            <p class="content" v-html="unit.content"></p>
            <p class="star-rating">
              <i></i>
              <i></i>
              <i></i>
              <i></i>
              <i></i>
            </p>
          </div>
        </div>
        <div class="arrow">
          <i class="left" @click="reviewListIndexSwitch('prev')"></i>
          <i class="right" @click="reviewListIndexSwitch('next')"></i>
        </div>
        <div class="dots">
          <i v-for="(unit, i) in reviewList" :key="i"
             :class="{ 'on': i === reviewListIndex }"
             @click="reviewListIndexSwitchDirect(i)"
          ></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import avatar0 from './img/reviewer-avatar-0.png';
import avatar1 from './img/reviewer-avatar-1.png';
import avatar2 from './img/reviewer-avatar-2.png';
import avatar3 from './img/reviewer-avatar-3.png';

export default {
  name: 'Home6Reviews',
  components: {},
  props: {
    title: {
      type: String,
      default: '',
      required: false
    },
    notHome: {
      type: Boolean,
      default: false,
      required: false
    }
  },
  data() {
    return {
      animateBegin: false,
      reviewListIndex: 0,
      listSwiping: false
    };
  },
  computed: {
    h2Title() {
      return this.title === '' ? this.$t('home.home-6.title') : this.title;
    },
    reviewList() {
      if (this.$i18n.locale === 'de') {
        return [
          {
            avatar: avatar1,
            author: 'Carrie-Ann Edmonds',
            content: this.$t('home.home-6.unit-1.text')
          },
          {
            avatar: avatar0,
            author: 'Emilee Reeves',
            content: this.$t('home.home-6.unit-3.text')
          },
          {
            avatar: avatar3,
            author: 'Happy Yadav',
            content: this.$t('home.home-6.unit-0.text')
          },
          {
            avatar: avatar2,
            author: 'Melvin Warner',
            content: this.$t('home.home-6.unit-2.text')
          }
        ];
      } else {
        return [
          {
            avatar: avatar3,
            author: 'Happy Yadav',
            content: this.$t('home.home-6.unit-0.text')
          },
          {
            avatar: avatar1,
            author: 'Carrie-Ann Edmonds',
            content: this.$t('home.home-6.unit-1.text')
          },
          {
            avatar: avatar2,
            author: 'Melvin Warner',
            content: this.$t('home.home-6.unit-2.text')
          },
          {
            avatar: avatar0,
            author: 'Emilee Reeves',
            content: this.$t('home.home-6.unit-3.text')
          }
        ];
      }
    },
    leftIndex() {
      return (this.reviewListIndex - 1 < 0)
        ? this.reviewListIndex - 1 + this.reviewList.length
        : this.reviewListIndex - 1;
    },
    rightIndex() {
      return (this.reviewListIndex + 1 >= this.reviewList.length)
        ? this.reviewListIndex + 1 - this.reviewList.length
        : this.reviewListIndex + 1;
    }
  },
  mounted() {
    if (!this.notHome) {
      window.addEventListener('scroll', this.handle);
    } else {
      this.animateBegin = true;
    }
  },
  destroyed() {
    if (!this.notHome)
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
    reviewListIndexSwitch(direction) {
      if (!this.listSwiping) {
        this.listSwiping = true;
        setTimeout(() => {
          this.listSwiping = false;
        }, 600);

        if (direction === 'next') {
          this.reviewListIndex++;
          this.reviewListIndex =
            this.reviewListIndex >= this.reviewList.length
              ? this.reviewListIndex - this.reviewList.length
              : this.reviewListIndex;
        } else if (direction === 'prev') {
          this.reviewListIndex--;
          this.reviewListIndex =
            this.reviewListIndex < 0
              ? this.reviewListIndex + this.reviewList.length
              : this.reviewListIndex;
        }
      }
    },
    reviewListIndexSwitchDirect(i) {
      this.reviewListIndex = i;
    },
    swipeHandler(direction) {
      if (direction === 'right') {
        this.reviewListIndexSwitch('prev');
      }
      if (direction === 'left') {
        this.reviewListIndexSwitch('next');
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@include animateSteps(2);

.home-6-reviews {
  padding-top: 140px;
  padding-bottom: 80px;
  background-color: #F8F9FC;

  .star-rating {
    margin-top: 30px;
    text-align: center;

    i {
      margin: 0 6px;
      display: inline-block;
      width: 33px;
      height: 31px;
      background: url("~@/assets/images/global/icon_star.svg") no-repeat;
      background-size: contain;

      &.half {
        background-image: url("~@/assets/images/global/icon_star_half.svg");
      }
    }
  }

  .slider-card {
    position: relative;
    margin-top: 110px;

    .card {
      position: relative;
      margin: 0 auto;
      width: 1064px;
      height: 640px;

      .unit {
        touch-action: pan-y pinch-zoom;
        //布局
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        margin: auto;
        padding: 36px 46px 60px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        width: 862px;
        height: 525px;
        background: #FFFFFF;
        box-shadow: 0 10px 20px #2D4CC72E;
        border-radius: 28px;
        user-select: none;
        cursor: grab;
        opacity: 0;
        transform: scale(0.7);
        transition: all 0.8s cubic-bezier(0.77, 0, 0.175, 1);

        * {
          transition: all 0.8s cubic-bezier(0.77, 0, 0.175, 1);
        }

        img {
          width: 140px;
          height: 140px;
          object-fit: cover;
          border-radius: 50%;
        }

        .title {
          margin-top: 20px;
          font: 600 24px/60px Montserrat;
          color: #2A2A2A;
          text-align: center;
        }

        .content {
          width: 100%;
          font: 500 20px/30px Montserrat;
          color: #000000;
          text-align: center;
        }

        .star-rating {
          i {
            margin: 0 4px;
            width: 24px;
            height: 23px;
          }
        }

        //定位
        &.left, &.right, &.center {
          opacity: 1;
        }

        &.left, &.right {
          box-shadow: 0 10px 20px #2D4CC712;
          z-index: 0;

          * {
            opacity: 0;
          }
        }

        &.left {
          transform: translateX(-190px) scale(0.8);
        }

        &.right {
          transform: translateX(190px) scale(0.8);
        }

        &.center {
          transform: translateX(0) scale(1);
          z-index: 1;
        }
      }
    }

    .arrow {
      position: absolute;
      top: 200px;
      width: 100%;

      i {
        position: absolute;
        top: 0;
        z-index: 3;
        display: block;
        width: 115px;
        height: 115px;
        background-color: transparent;
        border-radius: 50%;
        cursor: pointer;
        transition: background-color 0.3s, box-shadow 0.3s;

        &:hover {
          background-color: #fff;
          box-shadow: 0 10px 20px #2D4CC712;
        }

        &:active {
          top: 2px;
        }

        &:before {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          margin: auto;
          content: "";
          display: block;
          width: 36px;
          height: 58px;
          background: url("~@/views/home/home-v1/home-6-reviews/img/icon_navigate_next.svg") no-repeat center;
          background-size: contain;
        }

        &.left {
          left: -200px;

          &:before {
            transform: rotate(180deg);
          }
        }

        &.right {
          right: -200px;

          &:before {
          }
        }
      }
    }

    .dots {
      width: 100%;
      text-align: center;
      font-size: 0;

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
  .home-6-reviews {
    padding-top: (140px/2);
    padding-bottom: (114px/2);

    .star-rating {
      margin-top: (30px/2);

      i {
        margin: 0 (6px/2);
        width: (33px/2);
        height: (31px/2);
      }
    }

    .slider-card {
      margin-top: (130px/2);

      .card {
        width: 100%;
        height: 370px;

        .unit {
          padding: (75px/2) (32px/2) (70px/2);
          width: 75vw;
          height: 95vw;
          box-shadow: 0 5px 10px #2D4CC72E;
          border-radius: 14px;
          transition: all 0.3s ease;

          * {
            transition: all 0.3s ease;
          }

          img {
            width: (140px/2);
            height: (140px/2);
          }

          h3.title {
            margin-top: (50px/2);
            font-size: (32px/2);
            line-height: (60px/2);
          }

          p.content {
            font-size: (20px/2);
            line-height: (30px/2);
          }

          .star-rating {
            i {
              margin: 0 1.5px;
              width: (24px/2);
              height: (23px/2);
            }
          }

          //定位
          &.left, &.right {
            box-shadow: 0 5px 10px #2D4CC712;
          }

          &.left {
            transform: translateX(-15vw) scale(0.8);
          }

          &.right {
            transform: translateX(15vw) scale(0.8);
          }

          &.center {
            transform: translateX(0) scale(1);
            z-index: 1;
          }
        }
      }

      .arrow {
        display: none;
      }

      .dots {
        margin-top: 60px;

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

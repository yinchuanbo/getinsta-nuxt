<template>
  <div ref="mark" :class="{ 'on': animateBegin }" class="home-6-reviews home__sec">
    <div class="wrapper">
      <img class="home__sec_logo" :src="$store.state.productLogo" alt="logo">

      <h2 class="home__sec_h2 step-0">{{ h2Title }}</h2>
      <!--      <p class="star-rating step-1">-->
      <!--        <i></i>-->
      <!--        <i></i>-->
      <!--        <i></i>-->
      <!--        <i></i>-->
      <!--        <i class="half"></i>-->
      <!--      </p>-->
    </div>

    <div class="world-wide-map">
      <div class="wrapper">
        <div class="unit">
          <i>65,203,802</i>
          <p>
            <b class="add"></b>
            <span>Followers Provided</span>
          </p>
        </div>
        <div class="unit">
          <i>505,602,663</i>
          <p>
            <b class="like"></b>
            <span>Likes Delivered</span>
          </p>
        </div>
        <div class="unit">
          <i>25,368,975</i>
          <p>
            <b class="heart"></b>
            <span>Repeat Customers</span>
          </p>
        </div>
        <div class="unit">
          <i>150+</i>
          <p>
            <b class="flag"></b>
            <span>Countries</span>
          </p>
        </div>
      </div>
    </div>

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
          <p class="title">{{ unit.author }}</p>
          <p class="star-rating">
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
          </p>
          <p class="content" v-html="unit.content"></p>
        </div>
      </div>
      <div class="arrow">
        <!--          <i class="left" @click="reviewListIndexSwitch('prev')"></i>-->
        <div class="pagination">
          <b v-for="(unit, i) in reviewList" :key="i"
             :class="{ on: reviewListIndex === i }"
             :style="{ width: `${1/reviewList.length*100}%` }"
          ></b>
        </div>
        <i class="right" @click="reviewListIndexSwitch('next')"></i>
      </div>
      <!--        <div class="dots">-->
      <!--          <i v-for="(unit, i) in reviewList" :key="i"-->
      <!--             :class="{ 'on': i === reviewListIndex }"-->
      <!--             @click="reviewListIndexSwitchDirect(i)"-->
      <!--          ></i>-->
      <!--        </div>-->
    </div>
  </div>
</template>

<script>
import avatar0 from './img/avatar-0.png';
import avatar1 from './img/avatar-1.png';
import avatar2 from './img/avatar-2.png';
import avatar3 from './img/avatar-3.png';

export default {
  name: 'Home6ReviewsV2',
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
      return this.title === '' ? 'Serve the Millions of Customers Across the Global' : this.title;
    },
    reviewList() {
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
        }, 800);

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
  padding: 100px 0;
  background-color: #fff;

  .home__sec_h2 {
    text-align: center;
    font: normal normal 600 40px/50px BalooChettan;
  }

  .star-rating {
    margin-top: 30px;
    text-align: left;

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

  .world-wide-map {
    margin-top: 30px;
    height: 744px;
    background: url("./img/world-map.svg") center no-repeat;
    background-size: 1416px 744px;

    .wrapper {
      padding-left: 200px;
      width: 1110px;
    }

    .unit {
      margin-top: 78px;

      &:first-child {
        padding-top: 70px;
        margin-top: 0;
      }

      &:nth-child(2), &:nth-child(4) {
        margin-top: 0;
      }

      &:nth-child(even) {
        padding-left: 50%;
      }

      i {
        font-style: normal;
        font-size: 44px;
        font-weight: 700;
        background: linear-gradient(270deg, #FF5C87 0%, #4761FF 100%);
        -webkit-background-clip: text;
        color: transparent;
      }

      p {
        margin-top: 3px;
        font-size: 0;

        b {
          margin-right: 8px;
          display: inline-block;
          width: 24px;
          height: 15px;
          background-size: contain;
          background-repeat: no-repeat;
          background-position: center;
          vertical-align: middle;

          &.add {
            background-image: url("./img/icon_add.svg");
          }

          &.like {
            background-image: url("./img/icon_likes.svg");
          }

          &.heart {
            background-image: url("./img/icon_grin_hearts.svg");
          }

          &.flag {
            background-image: url("./img/Icon_flag.svg");
          }
        }

        span {
          font: normal normal 500 14px/14px BalooChettan;
          color: #000000;
          vertical-align: middle;
        }
      }
    }
  }

  .slider-card {
    position: relative;
    margin-top: -270px;

    .card {
      position: relative;
      margin: 0 auto;
      width: 690px;
      height: 214px;

      .unit {
        touch-action: pan-y pinch-zoom;
        //布局
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        margin: auto;
        padding: 30px 180px 30px 50px;
        //display: flex;
        //justify-content: center;
        //align-items: center;
        //flex-direction: column;
        width: 690px;
        height: auto;
        background: #FFFFFF;
        box-shadow: 0 10px 20px #2D4CC72E;
        border-radius: 20px;
        user-select: none;
        cursor: grab;
        opacity: 0;
        transform: scale(0.7);
        transition: all 0.8s cubic-bezier(0.77, 0, 0.175, 1);

        * {
          transition: all 0.8s cubic-bezier(0.77, 0, 0.175, 1);
        }

        img {
          position: absolute;
          top: -40px;
          right: 10px;
          width: 140px;
          height: 140px;
          object-fit: cover;
          border-radius: 50%;
        }

        .title {
          //margin-top: 20px;
          font: normal normal 600 20px/25px BalooChettan;
          color: #000;
          text-align: left;
        }

        .star-rating {
          margin-top: 7px;

          i {
            margin: 0 4px;
            width: 12px;
            height: 12px;
          }
        }

        .content {
          margin-top: 15px;
          width: 100%;
          font: normal normal 600 14px/20px BalooChettan;
          color: #7F8498;
          text-align: left;
        }

        //定位
        &.left, &.right, &.center {
          opacity: 1;
        }

        &.left, &.right {
          box-shadow: 0 10px 20px #2D4CC712;
          z-index: 0;
          opacity: 0;
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
      margin: 35px auto 0;
      position: relative;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 30px;
      width: 690px;

      i {
        position: relative;
        display: block;
        width: 54px;
        height: 48px;
        background-color: #6257FF;
        border-radius: 6px;
        cursor: pointer;
        transition: all 0.4s;

        &:hover {
          background-color: #7E74FF;
        }

        &:before {
          position: absolute;
          top: 0;
          left: 0;
          content: "";
          display: block;
          width: 100%;
          height: 100%;
          background-repeat: no-repeat;
          background-position: center;
        }

        &.left {
          &:before {
            transform: rotate(180deg);
          }
        }

        &.right {
          &:before {
            background-image: url("./img/icon_next.svg");
            background-size: 26px 8px;
          }
        }
      }
    }

    .pagination {
      width: 78px;
      height: 2px;
      font-size: 0;

      b {
        display: inline-block;
        height: 100%;
        background-color: #D9DCE8;
        transition: all 0.5s;

        &.on {
          background-color: #6257FF;
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
    padding-bottom: 74px;
    overflow: hidden;

    .home__sec_h2 {
      font: normal normal 600 32px/40px BalooChettan;
    }

    .star-rating {
      margin-top: 6px;

      i {
        margin: 0 (6px/2);
        width: (33px/2);
        height: (31px/2);
      }
    }

    .world-wide-map {
      margin-top: 56px;
      padding-top: 65px;
      padding-left: 36px;
      height: 396px;
      background-size: cover;
      background-position-x: 33%;

      .wrapper {
        padding: 0;
        width: 100%;
      }

      .unit {
        margin-top: 14px;

        i {
          font-size: 26px;
        }

        p {
          span {
            font: normal normal 500 12px/12px BalooChettan;
          }
        }
      }
    }

    .slider-card {
      margin-top: (130px/2);

      .card {
        width: 100%;
        height: 294px;

        .unit {
          margin-left: 12vw;
          padding: 30px 74px 40px 16px;
          width: 92vw; //4vw多余宽度
          height: auto;
          box-shadow: 0 10px 20px rgba(45, 76, 199, 0.18);
          border-radius: 20px;
          transition: all 0.4s ease;

          * {
            transition: all 0.4s ease;
          }

          img {
            width: 152px;
            height: 167px;
          }

          p.title {
            font: normal normal 600 20px/25px BalooChettan;
          }

          p.content {
            margin-top: 12px;
            font: normal normal 600 14px/20px BalooChettan;
            color: #7F8498;
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
            opacity: 0;
          }

          &.right {
            transform: translateX(15vw) scale(1.2);
            opacity: 0;
          }

          &.center {
            transform: translateX(0) scale(1);
            z-index: 1;
            opacity: 1;
          }
        }
      }

      .arrow {
        padding: 0 8.53vw 0 18.67vw;
        width: 100%;

        i {
          transition: all 0.1s;

          &:hover {
            background-color: #6257FF;
          }

          &:active {
            background-color: #7E74FF;
          }
        }
      }

      .pagination {
        width: 20.8vw;
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

<template>
  <div class="blog-img-gallery"
       :class="{ 'horizontal': imgDirectionHorizontal, 'vertical': !imgDirectionHorizontal }"
  >
    <div class="img-container">
      <img v-for="(img, i) in imgList" :key="i"
           :src="img"
           :class="{
             'center': i === listIndex,
             'left': i === leftIndex,
             'right': i === rightIndex,
           }"
           alt="image"
      >
    </div>
    <div class="pagination">
      <span class="left" @click="listIndexSwitch('prev')"></span>
      <span v-for="(img, i) in imgList" :key="i"
            class="point"
            :class="{ 'on': i === listIndex }"
            @click="listIndexSwitchDirect(i)"
      ></span>
      <span class="right" @click="listIndexSwitch('next')"></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BlogImgGallery',
  components: {},
  props: {
    imgDirectionHorizontal: {
      type: Boolean,
      default: true,
      required: false
    },
    imgList: {
      type: Array,
      default() {
        return [''];
      },
      required: true
    }
  },
  data() {
    return {
      listIndex: 0,
      listSwiping: false
    };
  },
  computed: {
    leftIndex() {
      return (this.listIndex - 1 < 0)
        ? this.listIndex - 1 + this.imgList.length
        : this.listIndex - 1;
    },
    rightIndex() {
      return (this.listIndex + 1 >= this.imgList.length)
        ? this.listIndex + 1 - this.imgList.length
        : this.listIndex + 1;
    }
  },
  methods: {
    listIndexSwitch(direction) {
      if (!this.listSwiping) {
        this.listSwiping = true;
        setTimeout(() => {
          this.listSwiping = false;
        }, 500);

        if (direction === 'next') {
          this.listIndex++;
          this.listIndex =
            this.listIndex >= this.imgList.length
              ? this.listIndex - this.imgList.length
              : this.listIndex;
        } else if (direction === 'prev') {
          this.listIndex--;
          this.listIndex =
            this.listIndex < 0
              ? this.listIndex + this.imgList.length
              : this.listIndex;
        }
      }
    },
    listIndexSwitchDirect(i) {
      this.listIndex = i;
    }
  }
};
</script>

<style lang="scss" scoped>
.blog-img-gallery {
  &.vertical {
    .img-container {
      width: 330px;
      height: 480px;
    }
  }

  &.horizontal {
    .img-container {
      width: 480px;
      height: 330px;
    }
  }

  .img-container {
    position: relative;
    margin: 0 auto;

    img {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      margin: auto;
      width: 100%;
      height: 100%;
      background-color: #e0e0e0;
      object-fit: contain;
      opacity: 0;
      transform: translateX(0);
      transition: all 0.5s ease-in-out;

      &.center {
        opacity: 1;
      }

      &.left {
        transform: translateX(-50px);
      }

      &.right {
        transform: translateX(50px);
      }
    }
  }

  .pagination {
    margin-top: 20px;
    text-align: center;

    span {
      margin: 0 10px;
      display: inline-block;
      width: 10px;
      height: 10px;
      background-color: #D1D1D1;
      border-radius: 50%;
      vertical-align: middle;
      cursor: pointer;
      transition: all 0.5s ease-in-out;

      &.left, &.right {
        width: 12px;
        height: 12px;
        background-color: transparent;
        background-repeat: no-repeat;
        background-position: center;
        background-size: contain;
        background-image: url("./img/icon-arrow.svg");
      }

      &.right {
        transform: rotate(180deg);
      }

      &.on {
        background-color: #005FFF;
      }
    }
  }
}

@media (max-width: 768px) {
}
</style>

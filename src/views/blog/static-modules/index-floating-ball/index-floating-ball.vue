<template>
  <div v-if="show && scrollShow"
       ref="moveDiv"
       class="index-floating-ball"
       title="Drag to any position. Click to return article index."
       :style="{ left }"
       @mousedown="dragStart"
       @touchstart="dragStart"
       @mousemove="dragMove"
       @touchmove.prevent="dragMove"
       @mouseup="dragEnd"
       @touchend="dragEnd"
  ></div>
</template>

<script>
export default {
  name: 'IndexFloatingBall',
  components: {},
  props: {
    show: {
      type: Boolean,
      default: false,
      required: false
    }
  },
  data() {
    return {
      left: 0,
      scrollShow: false,
      dragX: 0,
      dragY: 0,
      // Touch
      flags: false,
      flagTime: null,
      position: { x: 0, y: 0 },
      nx: '', ny: '', dx: '', dy: '', xPum: '', yPum: ''
    };
  },
  mounted() {
    if (process.server) return;
    this.calculatePositionAndDisplay();
    window.addEventListener('scroll', this.handle);
    window.addEventListener('resize', this.handle);
  },
  destroyed() {
    if (process.server) return;
    window.removeEventListener('scroll', this.handle);
    window.removeEventListener('resize', this.handle);
  },
  methods: {
    scrollToIndex() {
      this.$scrollTo('#index-v2', { offset: -1 * this.COMMON.headerHeight() });
    },
    handle() {
      let _this = this;
      this.COMMON.throttle(_this.handleScroll(), 100, 500);
    },
    handleScroll() {
      this.calculatePositionAndDisplay();
    },
    calculatePositionAndDisplay() {
      const indexContainer = document.querySelector('.index-v2');
      if (!indexContainer) return;

      const indexWidth = indexContainer.getBoundingClientRect().width;
      const indexHeight = indexContainer.getBoundingClientRect().height;
      const indexLeft = indexContainer.getBoundingClientRect().left;
      const indexTop = indexContainer.getBoundingClientRect().top;

      if (indexContainer && !this.COMMON.isMobile()) {
        this.left = `${indexLeft + indexWidth + 10}px`;
        this.scrollShow = indexTop + indexHeight < this.COMMON.headerHeight();
      }

      if (indexContainer && this.COMMON.isMobile()) {
        this.left = '50%';
        this.scrollShow = indexTop + indexHeight < this.COMMON.headerHeight();
      }
    },
    dragStart() {
      this.flags = true;
      this.flagTime = new Date().getTime();

      let touch;
      if (event.touches) {
        touch = event.touches[0];
      } else {
        touch = event;
      }
      this.position.x = touch.clientX;
      this.position.y = touch.clientY;
      this.dx = this.$refs.moveDiv.offsetLeft;
      this.dy = this.$refs.moveDiv.offsetTop;

      document.onmousemove = () => {
        this.dragMove();
      };
    },
    dragMove() {
      if (this.flags) {
        let touch;
        if (event.touches) {
          touch = event.touches[0];
        } else {
          touch = event;
        }
        this.nx = touch.clientX - this.position.x;
        this.ny = touch.clientY - this.position.y;
        this.xPum = this.dx + this.nx;
        this.yPum = this.dy + this.ny;
        this.$refs.moveDiv.style.left = this.xPum + 'px';
        this.$refs.moveDiv.style.top = this.yPum + 'px';
        document.addEventListener('touchmove', function () {
          event.preventDefault();
        }, false);
      }
    },
    dragEnd() {
      this.flags = false;
      event.preventDefault();
      document.onmouseup = () => {
        document.onmousemove = null;
        this.flags = false;
        event.preventDefault();
      };

      if (new Date().getTime() - this.flagTime < 200) {
        this.scrollToIndex();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.index-floating-ball {
  position: fixed;
  top: 88%;
  width: 38px;
  height: 38px;
  background: url("./img/bg.svg") center/contain no-repeat;
  border-radius: 50%;
  box-shadow: 0 4px 1px 0 #BED7F3;
  cursor: grab;

  &:active {
    cursor: grabbing;
  }
}

@media (max-width: 768px) {
  .index-floating-ball {
    top: 80%;
    transform: translateX(-50%);
  }
}
</style>

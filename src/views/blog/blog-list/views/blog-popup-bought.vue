<template>
  <div class="blog-popup-bought mobile" :class="{ on: show }">
    <div class="blog-popup-bought__wrapper">
      <div class="close" @click="close"></div>
      <div class="main" @click="jump">
        <p>
          Someone from
          <b>{{ city[Math.floor(Math.random() * city.length)] }}</b>
          just bought
          <strong>{{ quantity[Math.floor(Math.random() * quantity.length)] }} followers</strong>
          ! Get yours now!
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BlogPopupBought',
  data() {
    return {
      show: false,
      city: ['London', 'Sydney', 'New Delhi', 'Hong Kong', 'Moscow'],
      quantity: [100, 500, 1000, 2000]
    };
  },
  mounted() {
    setTimeout(() => {
      this.show = true;
    }, 60);
  },
  methods: {
    close() {
      this.show = false;
    },
    jump() {
      this.$ga.event('bannerlick', 'click', 'mblog');
      this.$nuxt.$router.push({
        path: '/buy-instagram-followers',
        query: {
          'from': 'mblogbanner',
          's': 'blog_popup'
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.blog-popup-bought {
  position: fixed;
  bottom: 76px;
  z-index: 9;
  transform: translateY(100%);
  opacity: 0;
  transition: all 0.6s cubic-bezier(0.76, 0, 0.24, 1);

  padding: 0 30px;
  width: 700px;
  height: 112px;
  font-size: 0;

  .blog-popup-bought__wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;

    border: 0.5px solid rgba(172, 172, 172, 0.35);
    border-radius: 6px;
    background-color: rgba(255, 255, 255, 0.14);
    backdrop-filter: blur(19px);

    .close {
      position: absolute;
      top: 0;
      right: 0;
      z-index: 10;
      display: block;
      width: 48px;
      height: 48px;
      background: url("~@/views/blog/blog-detail/img/blog-popup-bought__icon-close.svg") center no-repeat;
      background-size: contain;
    }

    .main {
      position: relative;
      padding: 8px 80px 8px 16px;
      width: 100%;
      height: 100%;

      p {
        font: 500 12px/18px Montserrat;
        color: #2A2A2A;

        b {
          font-weight: 600;
        }

        strong {
          font-weight: 600;
          color: #FF9C39;
        }
      }

      &:after {
        content: "";
        position: absolute;
        top: 16px;
        right: 80px;
        width: 80px;
        height: 80px;
        background: url("~@/views/blog/blog-detail/img/blog-popup-bought__icon-arrow.svg") center no-repeat;
        background-size: contain;
      }
    }
  }

  &.on {
    transform: translateY(0);
    opacity: 1;
  }
}

@media (max-width: 768px) {
  .blog-popup-bought {
    bottom: max(66px, calc(env(safe-area-inset-bottom) + 66px));
    padding: 0 4vw;
    width: 100%;
    height: 56px;

    .blog-popup-bought__wrapper {
      .main {
        &:after {
          top: 8px;
          right: 24px;
          width: 40px;
          height: 40px;
        }
      }

      .close {
        width: 24px;
        height: 24px;
      }
    }
  }
}
</style>

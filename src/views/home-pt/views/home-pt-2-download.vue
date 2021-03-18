<template>
  <div ref="mark"
       :class="{ 'on': animateBegin, 'bg-white': bgColor === 'white' }"
       class="home-2-free home__sec pt"
  >
    <div class="wrapper">
      <h2 class="home__sec_h2 step-0" v-html="h2Text"></h2>

      <div class="home-2-free__btn-container step-1" @click="ga0">
        <button-blue text="Baixar para PC" />
      </div>

      <div class="ou step-2"><b>OU</b></div>

      <p class="home-2-free__p step-3">Leia o Código QR para Obter o App no Android</p>

      <img class="home-2-free__img step-4" src="../../../assets/images/global/qr-code__download.svg" alt="QR Code">

      <p class="home-2-free__p step-5">100% seguro e limpo</p>
    </div>
  </div>
</template>

<script>
import ButtonBlue from '@/components/button/button-blue';

export default {
  name: 'HomePt2Download',
  components: { ButtonBlue },
  props: {
    bgColor: {
      type: String,
      default: 'grey',
      required: false
    }
  },
  data() {
    return {
      animateBegin: false
    };
  },
  computed: {
    h2Text() {
      const text0 = 'Baixe GetInsta para Obter Seguidores Reais e <br> Curtidas Grátis Instantaneamente!';
      const text1 = 'Quer Baixar o GetInsta Agora?';
      return this.bgColor === 'white' ? text1 : text0;
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
    ga0() {
      if (this.bgColor === 'white') {
        this.$ga.event('insdl', 'download', 'pthpwindl3');
      } else {
        this.$ga.event('insdl', 'download', 'pthpwindl2');
      }
      window.location.href = 'https://www.easygetinsta.com/downloadpc';
    }
  }
};
</script>

<style lang="scss" scoped>
@include animateSteps(5);

.home-2-free {
  background-color: #F8F9FC;
  text-align: center;

  &.bg-white {
    background-color: #fff;

    .ou {
      b {
        background-color: #fff;
      }
    }
  }

  .home__sec_h2 {
    font-size: 40px;
  }

  .home-2-free__btn-container {
    margin-top: 72px;
    display: inline-block;
    width: 450px;
    height: 100px;
  }

  .home-2-free__p {
    margin-top: 36px;
    font: 400 16px Montserrat;
    color: #000;
  }

  .home-2-free__img {
    margin-top: 36px;
  }

  .ou {
    margin: 58px auto 0;
    position: relative;
    width: 790px;

    b {
      position: relative;
      z-index: 1;
      padding: 0 35px;
      display: inline-block;
      background-color: #F8F9FC;
      font: 400 16px/20px Montserrat;
      color: #2A2A2A;
    }

    &:before {
      position: absolute;
      left: 0;
      top: 50%;
      margin-top: -1px;
      width: 100%;
      height: 1px;
      background-color: #DFDFDF;
      content: "";
    }
  }
}

@media (max-width: 768px) {
  .home-2-free {
    .home__sec_h2 {
      padding: 0 10vw;
      font-size: (40px/2);
    }

    .home-2-free__btn-container {
      margin-top: 20px;
      width: (540px/2);
      height: (112px/2);
    }

    .home-2-free__p {
      margin-top: 12px;
      font-size: (24px/2);
    }

    .home-2-free__img {
      margin-top: 30px;
    }
  }
}
</style>

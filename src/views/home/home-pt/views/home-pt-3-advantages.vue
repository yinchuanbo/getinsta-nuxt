<template>
  <div :class="{ 'on': animateBegin }" class="home-5-advantages home__sec pt">
    <div class="wrapper">
      <h2 ref="mark" class="home__sec_h2 step-0">Mais Vantagens</h2>

      <div class="unit-container">
        <div class="unit step-1">
          <img src="../../../../assets/images/home/home-5-advantages/home-5-advantages__icon_clock.svg" alt="icon">
          <h3>Entrega Instântanea</h3>
          <p>
            Todas as tarefas serão finalizadas num tempo aceitável e você verá mudanças em 24 horas. Entrega instântanea é crucial, porém se rápido de mais pode trazer riscos,
            portanto GetInsta usa esta janela de tempo para garantir que não haverá riscos de a sua conta ser punida.
          </p>
        </div>

        <div class="unit step-2" style="padding-top: 12px">
          <img src="../../../../assets/images/home/home-5-advantages/home-5-advantages__icon_support.svg" alt="icon">
          <h3>Suporte 24/7</h3>
          <p>
            Nosso suporte estará sempre disponível. Caso você tenha quaisquer dúvidas sobre nossos produtos ou encontre dificuldades ao utilizar o sistema, por favor não hesite em
            nos contatar.
          </p>
        </div>

        <div class="unit step-3">
          <img src="../../../../assets/images/home/home-5-advantages/home-5-advantages__icon_team.svg" alt="icon">
          <h3>Time Experiente</h3>
          <p>
            Nosso time profissional é experiente no setor de redes sociais há 10 anos. Nós entendemos as regras da indústria e agimos de acordo. Nós oferecemos soluções para te
            ajudar a obter seguidores e curtidas.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomePt3Advantages',
  components: {},
  data() {
    return {
      animateBegin: false
    };
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
    }
  }
};
</script>

<style lang="scss" scoped>
@include animateSteps(3);

.home-5-advantages {
  .unit-container {
    margin-top: 140px;
    display: flex;
    justify-content: space-between;

    .unit {
      width: 330px;
      text-align: center;

      h3 {
        margin-top: 26px;
        font: 600 24px/60px Montserrat;
        color: #2A2A2A;
      }

      p {
        margin-top: 18px;
        font: 400 20px/36px Montserrat;
        color: #000000;
      }
    }
  }
}

@media (max-width: 768px) {
  .home-5-advantages {
    .unit-container {
      margin-top: (145px/2);
      display: block;
      text-align: center;

      .unit {
        display: none;

        &:first-child {
          display: inline-block;
        }

        img {
          max-width: (110px/2);
        }

        h3 {
          margin-top: (26px/2);
          font-size: (24px/2);
          line-height: (60px/2);
        }

        p {
          margin-top: (18px/2);
          font-size: (20px/2);
          line-height: (36px/2);
        }
      }
    }
  }
}
</style>

<template>
  <div class="home-pt-0-banner" :class="{ 'on': animateBegin }">
    <div class="banner">
      <div class="header-blank"></div>
      <div class="wrapper">
        <h1>Ganhe Seguidores Reais e Curtidas <br> Grátis no Instagram</h1>
        <h2>
          GetInsta disponibiliza seguidores reais limitados no Instagram e curtidas de pessoas como você. Baixe GetInsta para ganhar GRÁTIS seguidores reais e curtidas no
          Instagram. 100% seguro e limpo.
        </h2>
        <div class="btn-container" @click="ga0">
          <button-wave-cyan text="Baixar para PC" />
          <div class="pop-num like"
               :class="{ 'animate': popNumAnimateLike }"
               :style="{ top: `-${popNumTopLike}%`, left: `${popNumLeftLike}%` }"
          >
            <span>{{ popNumLike }}</span>
          </div>
          <div class="pop-num follow"
               :class="{ 'animate': popNumAnimateFollow }"
               :style="{ top: `-${popNumTopFollow}%`, left: `${popNumLeftFollow}%` }"
          >
            <span>{{ popNumFollow }}</span>
          </div>
        </div>
        <div class="ou">OU</div>
        <div class="text">
          <p>Leia o Código QR para Obter o App no Android</p>
          <p><i></i>100% seguro e limpo</p>
        </div>
        <div class="qr-code">
          <img src="../../../../assets/images/global/qr-code__download.svg" alt="QR Code">
        </div>
      </div>
    </div>
    <div ref="mark" class="des home__sec pt">
      <div class="wrapper">
        <h2 class="home__sec_h2 step-1">Como pode ser GRÁTIS?</h2>
        <p class="home__sec_p pt-banner step-2">
          Nós reunimos usuários reais do Instagram para seguir e curtir os posts um dos outros. Qualquer um pode obter moedas seguindo outros perfis ou curtindo
          seus posts. Com as moedas, você pode obter seguidores reais grátis e curtidas para a sua própria conta e posts do Instagram. Soa bem? Baixe GetInsta para obter moedas
          grátis. É fácil e 100% seguro!
        </p>
        <img class="step-3" src="../../../../assets/images/home-pt/home-pt-0-banner/home-pt-0-banner__phone.png" alt="QR Code">
      </div>
    </div>
  </div>
</template>

<script>
import ButtonWaveCyan from '@/components/button/button-wave-cyan';

export default {
  name: 'HomePt0Banner',
  components: { ButtonWaveCyan },
  data() {
    return {
      animateBegin: false,
      popNumLike: 80,
      popNumFollow: 50,
      popNumTopLike: 0,
      popNumLeftLike: 0,
      popNumTopFollow: 0,
      popNumLeftFollow: 0,
      popNumAnimateLike: false,
      popNumAnimateFollow: false
    };
  },
  mounted() {
    window.addEventListener('scroll', this.handle);
    this.popNum();
  },
  destroyed() {
    window.removeEventListener('scroll', this.handle);
  },
  methods: {
    popNum() {
      setInterval(() => {
        this.popNumLike = this.COMMON.randomNumInt(10, 300);
        this.popNumFollow = this.COMMON.randomNumInt(10, 300);

        this.popNumTopLike = this.COMMON.randomNumInt(66, 120);
        this.popNumLeftLike = this.COMMON.randomNumInt(10, 70);
        this.popNumTopFollow = this.COMMON.randomNumInt(66, 120);
        this.popNumLeftFollow = this.COMMON.randomNumInt(10, 70);

        let likeTimeOut = this.COMMON.randomNumInt(0, 4000);
        setTimeout(() => {
          this.popNumAnimateLike = true;
          setTimeout(() => {
            this.popNumAnimateLike = false;
          }, 6000);
        }, likeTimeOut);

        let followTimeOut = this.COMMON.randomNumInt(0, 4000);
        setTimeout(() => {
          this.popNumAnimateFollow = true;
          setTimeout(() => {
            this.popNumAnimateFollow = false;
          }, 6000);
        }, followTimeOut);

      }, 8100);
    },
    handleScroll: function () {
      this.animateBegin = this.$refs.mark.getBoundingClientRect().top < window.innerHeight * 0.66;
    },
    handle() {
      const fun = this.handleScroll();
      this.COMMON.throttle(fun, 60, 100);
    },
    ga0() {
      this.$ga.event('insdl', 'download', 'pthpwindl1');
      window.location.href = 'https://www.easygetinsta.com/downloadpc';
    }
  }
};
</script>

<style lang="scss" scoped>
@include animateSteps(3);
.home-pt-0-banner {
  .banner {
    height: 960px;
    background: url("~@/assets/images/home-pt/home-pt-0-banner/home-pt-0-banner__bg.jpg") no-repeat top center;
    text-align: center;
    color: #FFFFFF;

    h1 {
      padding-top: 156px;
      font: 700 50px/66px Montserrat;
      text-shadow: 0 3px 6px #00000029;
    }

    h2 {
      margin-top: 28px;
      font: 400 20px/30px Montserrat;
    }

    .btn-container {
      position: relative;
      margin: 124px auto 0;
      width: 320px;
      height: 80px;

      .pop-num {
        position: absolute;
        top: -66%;
        left: 10%;
        padding: 10px 12px 22px;
        /*width: 68px;*/
        /*height: 48px;*/
        background: url("~@/assets/images/home-pt/home-pt-0-banner/home-pt-0-banner__pop-bg.svg") no-repeat center;
        background-size: 100% 100%;
        text-align: center;
        font-size: 0;

        opacity: 0;
        transform: translateY(10px);
        transition: opacity 0.3s, transform 0.3s;

        &:before {
          margin-right: 6px;
          content: "";
          display: inline-block;
          width: 18px;
          height: 18px;
          background-size: contain;
          background-repeat: no-repeat;
          background-position: center center;
          vertical-align: middle;
        }

        span {
          font: 500 20px/20px Montserrat;
          color: #FFFFFF;
          vertical-align: middle;
        }

        &.like {
          &:before {
            background-image: url("~@/assets/images/home-pt/home-pt-0-banner/home-pt-0-banner__pop-like.svg");
          }
        }

        &.follow {
          left: 50%;

          &:before {
            background-image: url("~@/assets/images/home-pt/home-pt-0-banner/home-pt-0-banner__pop-follow.svg");
          }
        }

        &.animate {
          animation: 4s popAnimate ease forwards;
        }

        @keyframes popAnimate {
          0% {
            opacity: 0;
            transform: translateY(10px);
          }
          20% {
            opacity: 1;
            transform: translateY(0);
          }
          80% {
            opacity: 1;
            transform: translateY(0);
          }
          100% {
            opacity: 0;
            transform: translateY(-10px);
          }
        }
      }
    }

    .ou {
      margin: 70px auto 0;
      width: 40px;
      height: 40px;
      text-align: center;
      background-color: rgb(0, 0, 0, 0.27);
      border-radius: 50%;
      color: #FFFFFF;
      font: 400 16px/40px Montserrat;
    }

    .text {
      p {
        margin-top: 18px;
        font: 400 16px/24px Montserrat;
        color: #FFFFFF;

        i {
          margin-right: 14px;
          display: inline-block;
          width: 18px;
          height: 24px;
          vertical-align: top;
          background: url("~@/assets/images/home-pt/home-pt-0-banner/home-pt-0-banner__icon_shield.svg") no-repeat center;
          background-size: contain;
        }
      }
    }

    .qr-code {
      margin-top: 36px;
    }
  }

  .des {
    padding-bottom: 0;
    background-color: #F8F9FC;
    text-align: center;

    .home__sec_p.pt-banner {
      font-size: 20px;
    }

    img {
      margin-top: 80px;
      margin-bottom: -140px;
      width: 611px;
      height: 452px;
    }
  }
}

@media (max-width: 768px) {
  .home-pt-0-banner {
    .banner {
      padding: 0 30px;
      height: 672px;
      background-size: cover;

      h1 {
        padding-top: (156px/2);
        line-height: 30px;
        font-size: 27px;
      }

      h2 {
        font-size: 14px;
        line-height: 17px;
      }

      .btn-container {
        margin: 62px auto 0;
        width: 211px;
        height: 56px;
      }

      .ou {
        margin: 35px auto 0;
        width: 20px;
        height: 20px;
        font: 400 12px/20px Montserrat;
      }

      .text {
        p {
          margin-top: 12px;
          font: 400 12px/12px Montserrat;

          i {
            margin-right: 7px;
            width: (18px/2);
            height: (24px/2);
          }
        }
      }
    }

    .des {
      .home__sec_p.pt-banner {
        margin-top: 10px;
        padding: 0 15px;
        font-size: 14px;
        line-height: 18px;
      }

      img {
        margin-top: 40px;
        width: 81.46vw;
        height: 60.26vw;
      }
    }
  }
}
</style>

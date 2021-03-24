<template>
  <div class="footer-text">
    <div class="footer-text__links">
      <div class="wrapper">
        <div class="footer-text__links_column logo">
          <nuxt-link to="/">
            <i></i>
            <h2>GetInsta</h2>
          </nuxt-link>
          <p>Copyright © {{ currentYear }} <br> easygetinsta.com</p>
        </div>
        <div class="footer-text__links_column">
          <h3><span>Sobre</span></h3>
          <br>
          <nuxt-link to="/terms">Termos de Serviço</nuxt-link>
          <br>
          <nuxt-link to="/privacy">Política de Privacidade</nuxt-link>
        </div>
        <div class="footer-text__links_column">
          <h3><span>Serviços</span></h3>
          <br>
          <nuxt-link to="/get-instagram-followers-likes">Ganhar Seguidores</nuxt-link>
          <br>
          <nuxt-link to="/get-instagram-followers-likes">Ganhar Curtidas</nuxt-link>
        </div>
        <div class="footer-text__links_column">
          <h3><span>Recursos</span></h3>
          <br>
          <nuxt-link to="/login">Login</nuxt-link>
          <br>
          <nuxt-link to="/faqs">Perguntas Frequentes</nuxt-link>
          <br>
          <a download href="https://www.easygetinsta.com/downloadcenter" @click="ga">Download do App</a>
          <br>
          <nuxt-link to="/blog">Blog</nuxt-link>
        </div>
      </div>
    </div>
    <div v-if="userCenter" class="mobile user-center-bottom-blank"></div>
  </div>
</template>

<script>
export default {
  name: 'FooterLinkPt',
  components: {},
  props: {},
  data() {
    return {
      userCenter: false
    };
  },
  computed: {
    currentYear() {
      let date = new Date();
      return date.getFullYear();
    }
  },
  methods: {
    ga() {
      this.$ga.event('insdl', 'download', 'pthpappdl-footer');
    }
  }
};
</script>

<style lang="scss" scoped>
.footer-text {
  padding: 125px 0 94px;
  background-color: #757E97;

  .footer-text__links {
    .footer-text__links_column {
      width: 250px;
      display: inline-block;
      vertical-align: top;

      &.logo {
        margin-right: 115px;
        padding-right: 20px;
        width: 290px;
        height: 330px;
        border-right: 1px solid rgb(255, 255, 255, 0.15);

        i {
          display: inline-block;
          width: 100px;
          height: 100px;
          background-image: url("~@/assets/images/global/logo.svg");
          background-size: contain;
        }
      }

      h2 {
        margin-top: 8px;
        font: 800 italic 28px/34px Montserrat;
        color: #fff;
      }

      p {
        margin-top: 15px;
        line-height: 26px;
      }
    }

    p, a {
      font: 400 20px Montserrat;
      color: rgba(255, 255, 255, 0.6);
      transition: all 0.1s;
    }

    a {
      line-height: 40px;

      &:hover {
        color: rgba(255, 255, 255, 1);
      }
    }

    h3 {
      font: 600 20px/40px Montserrat;
      color: #FFFFFF;
    }
  }
}

@media (max-width: 768px) {
  .footer-text {
    padding: (112px/2) 0 (50px/2);

    .footer-text__links {
      padding-bottom: env(safe-area-inset-bottom);

      .footer-text__links_column {
        margin: (90px/2) auto 0;
        padding: 0 8vw;
        width: 100% !important;
        height: auto !important;
        text-align: center;

        &.logo {
          margin-top: 0;
          margin-right: 0;
          padding: 0;
          border-right: none;

          i {
            width: (156px/2);
            height: (156px/2);
          }
        }

        h2 {
          margin-top: (8px/2);
          font-size: (48px/2);
          line-height: (58px/2);
        }

        p {
          margin-top: 4px;
          font-size: (32px/2);
          line-height: (40px/2);

          br {
            display: none;
          }
        }

        h3 {
          position: relative;
          margin-bottom: 10px;
          display: inline-block;
          width: 100%;
          font-size: (32px/2);
          line-height: (40px/2);

          span {
            position: relative;
            z-index: 1;
            display: inline-block;
            background-color: #5920CE;
            padding: 0 8vw;
          }

          &:before {
            position: absolute;
            left: 0;
            top: 50%;
            width: 100%;
            height: 1px;
            background-color: rgba(255, 255, 255, 0.2);
            content: "";
          }
        }

        a {
          font-size: (32px/2);
          line-height: (80px/2);
        }
      }
    }

    .user-center-bottom-blank {
      height: 56px;
    }
  }

}
</style>


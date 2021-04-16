<template>
  <div class="instadownload">
    <div class="flex-instadown">
      <div><img src="../img/pic.svg" alt="" /></div>
      <div v-if="usenum===1" class="flex-art">
        <h1>
          Get Free Followers after Getting a Cool Name!
        </h1>
        <p>
          After having a satisfying username, try GetInsta to get free followers to promote your account quickly.
        </p>
        <div class="btn-css" @click="dowApp">
          <ButtonGreen />
        </div>
      </div>
      <div v-if="usenum===3" class="flex-art">
        <h1>
          Download GetInsta to Get Free Followers Now!
        </h1>
        <p>
          You can get real free Instagram followers and likes with the safe app GetInsta. Download it to become popular on Instagram.
        </p>
        <div class="btn-css" @click="dowApp">
          <ButtonGreen />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ButtonGreen from './button-green';

export default {
  components: {
    ButtonGreen
  },
  props: {
    usenum: {
      type: Number,
      default: 0
    }
  },
  methods: {
    dowApp() {
      if (!this.COMMON.isMobile()) {
        this.$ga.event('insdl', 'download', `pcdl${this.usenum}-iug`);
        window.location.href = this.$constant.app.download.windows;
      } else {
        let url = '';
        if (this.COMMON.isiOS()) {
          // url = 'https://apps.apple.com/app/apple-store/id1498558125?pt=121014724&ct=en-seo-iug&mt=8';
          url = 'https://apps.apple.com/app/apple-store/id1525688965?pt=118374901&ct=en-seo-iug&mt=8'
        }

        if (this.COMMON.isAndroid()) {
          // url = 'https://play.google.com/store/apps/details?id=com.insfollower.getinsta&referrer=utm_source%3Den-seo-iug';
          url = this.$store.state.enAdrLinkWithoutGpReferrer
            + this.$constant.app.campaign.androidReferrerQuery
            + 'en-seo-iug';
        }

        this.$ga.event(
          'insdl',
          'download',
          `${this.$store.state.platform}dl${this.usenum}-iug`
        );
        location.href = url;
      }

    }
  }
};
</script>

<style scoped lang="scss">
.instadownload {
  height: 447px;
  background: transparent linear-gradient(108deg, #ff8f96 0%, #aa4ef5 45%, #4233f2 100%) 0% 0% no-repeat padding-box;
  opacity: 1;

  .flex-instadown {
    width: 1100px;
    margin: 0 auto;
    display: flex;
    // flex-direction: row-reverse;
    padding: 53px 0;

    .flex-art {
      flex: 1;
      margin-left: 80px;

      h1 {
        font: normal bold 28px/40px Montserrat;
        letter-spacing: 0px;
        color: #ffffff;
      }

      p {
        margin-top: 15px;
        text-align: left;
        font: normal 18px/26px Montserrat;
        letter-spacing: 0px;
        color: #ffffff;
        opacity: 0.84;
      }

      .btn-css {
        width: 360px;
        height: 76px;
        margin-top: 30px;
      }
    }
  }
}

@media (max-width: 768px) {
  .instadownload {
    padding: 45px 15px 20px 15px;
    height: auto;

    .flex-instadown {
      width: 100%;
      flex-direction: column-reverse;
      padding: 0;

      img {
        width: 310px;
        height: 190px;
        margin: auto;
        margin-top: 30px;
      }

      .flex-art {
        margin: 0;
        text-align: center;

        h1 {
          font: 600 18px/25px Montserrat;
        }

        p {
          font: 500 14px/21px Montserrat;
        }

        .btn-css {
          width: 283px;
          height: 53px;
          margin: auto;
          margin-top: 20px;
        }
      }
    }
  }
}
</style>

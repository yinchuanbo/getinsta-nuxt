<template>
  <div class="insta-follower">
    <div class="wrapper">
      <h1>Download GetInsta to Get Free Followers NOW!</h1>
      <p>You can get real free Instagram followers and likes with the safe app GetInsta. Download it to become popular on Instagram.</p>
      <div class="btn-css">
        <div @click="dowWin">
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
    usenumtwo: {
      type: Number,
      default: 0
    }
  },
  methods: {
    dowWin() {
      if (!this.COMMON.isMobile()) {
        this.$ga.event('insdl', 'download', 'pcdl2-iug');
        window.location.href = this.$constant.app.download.windows;
      } else {
        let url = '';
        if (this.COMMON.isiOS()) {
          // url = 'https://apps.apple.com/app/apple-store/id1498558125?pt=121014724&ct=en-seo-iug&mt=8';
          // url = 'https://apps.apple.com/app/apple-store/id1525688965?pt=118374901&ct=en-seo-iug&mt=8'
          url = this.$storage.get('iosDownloadLink');
        }

        if (this.COMMON.isAndroid()) {
          // url = 'https://play.google.com/store/apps/details?id=com.insfollower.getinsta&referrer=utm_source%3Den-seo-iug';
          // url = this.$store.state.enAdrLinkWithoutGpReferrer
          //   + this.$constant.app.campaign.androidReferrerQuery
          //   + 'en-seo-iug';
          url = this.$storage.get('adrDownloadLink');
        }

        this.$ga.event(
          'insdl',
          'download',
          `${this.$store.state.platform}dl${this.usenumtwo}-iug`
        );
        location.href = url;
      }
    }
  }
};
</script>

<style scoped lang="scss">
.insta-follower {
  width: 100%;
  background: url('../img/bg-1.svg') no-repeat;
  background-size: cover;
  padding: 69px 0 53px 0;
  text-align: center;

  h1 {
    font: 600 28px/40px Montserrat;
    margin-bottom: 14px;
  }

  p {
    max-width: 787px;
    margin: auto;
    font: 500 18px/26px Montserrat;
  }

  .btn-css > div {
    width: 360px;
    height: 76px;
    margin: auto;
    margin-top: 30px;
    margin-bottom: 45px;
  }
}

@media (max-width: 768px) {
  .insta-follower {
    width: 100%;
    padding: 45px 15px 100px 15px;
    background: url('../img/like_mobile.svg') no-repeat;
    background-size: cover;

    h1 {
      font: 600 18px/25px Montserrat;
    }

    p {
      font: 500 14px/21px Montserrat;
    }

    .btn-css > div {
      width: 265px;
      height: 53px;
      margin: auto;
      margin-top: 20px;
    }
  }
}
</style>

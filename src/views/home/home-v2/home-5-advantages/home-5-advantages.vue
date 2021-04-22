<template>
  <div :class="{ on: animateBegin }" class="home-5-advantages home__sec">
    <div class="wrapper">
      <h2 ref="mark" class="home__sec_h2 big step-0">
        {{ $t("home.home-5.title") }}
      </h2>

      <div
        class="unit-container step-1"
        :class="{ 'minor-lang': $i18n.locale !== 'en' }"
      >
        <div v-for="(unit, i) in dataList" :key="i" class="unit">
          <img :src="unit.icon" alt="icon" />
          <div class="text">
            <h3>{{ unit.title }}</h3>
            <p class="font-16">{{ unit.text }}</p>
          </div>
        </div>
      </div>

      <div class="btn-container step-2">
        <div @click="btnActionGate">
          <button-icon-ins
            class="button-hover-1"
            theme="gradiant"
            text="Get Free Followers"
            square
            shadow
            :icon="'ins'"
            font-size="size-15"
          />
        </div>
        <div
          class="iosbtn btns pc"
          @click="downloadIOS"
          @mouseenter="tipQrCode('ios', $event)"
          @mouseleave="tipQrCode(false)"
        >
          <i></i>
          <span>Get Free Followers</span>
        </div>
        <div
          class="anzhuo btns pc"
          @click="downloadAndroid"
          @mouseenter="tipQrCode('android', $event)"
          @mouseleave="tipQrCode(false)"
        >
          <i></i>
          <span>Get Free Followers</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import img0 from "@/views/home/home-v1/home-5-advantages/img/home-5-advantages__icon_clock.svg";
import img1 from "@/views/home/home-v1/home-5-advantages/img/home-5-advantages__icon_support.svg";
import img2 from "@/views/home/home-v1/home-5-advantages/img/home-5-advantages__icon_team.svg";
import ButtonIconIns from "@/components/button/button-icon-ins";

export default {
  name: "Home5AdvantagesV2",
  components: { ButtonIconIns },
  data() {
    return {
      animateBegin: false,
      dataListIndex: 0,
    };
  },
  computed: {
    dataList() {
      return [
        {
          icon: img0,
          title: this.$t("home.home-5.unit-0.title"),
          text: this.$t("home.home-5.unit-0.text"),
        },
        {
          icon: img1,
          title: this.$t("home.home-5.unit-1.title"),
          text: this.$t("home.home-5.unit-1.text"),
        },
        {
          icon: img2,
          title: this.$t("home.home-5.unit-2.title"),
          text: this.$t("home.home-5.unit-2.text"),
        },
      ];
    },
  },
  mounted() {
    window.addEventListener("scroll", this.handle);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handle);
  },
  methods: {
    handleScroll: function () {
      this.animateBegin =
        this.$refs.mark.getBoundingClientRect().top < window.innerHeight * 0.66;
    },
    handle() {
      const fun = this.handleScroll();
      this.COMMON.throttle(fun, 60, 100);
    },
    btnActionGate() {
      if (this.COMMON.isMobile()) this.gaDownload();
      else this.gaLogin();
    },
    gaDownload() {
      this.$ga.event(
        "insdl",
        "download",
        `hp${this.$store.state.platform}dlnew5`
      );
      if (this.COMMON.isiOS()) {
        // window.location.href =
        //   `${this.$store.state.enIosLink}` +
        //   `?pt=${this.$store.state.enIosLinkPt}` +
        //   `&ct=${this.$store.state.enIosLinkCt}` +
        //   `&mt=8`;
        location.href = this.$storage.get('iosDownloadLink');
      } else {
        // window.location.href =
        //   this.$constant.app.download.androidGooglePlay1 +
        //   this.$constant.app.campaign.androidReferrerQuery +
        //   this.$store.state.enAdrLinkGpReferrer;
        location.href = this.$storage.get('adrDownloadLink');
      }
    },
    downloadIOS() {
      this.$ga.event("insdl", "download", "hppcdl1-ios");
      // window.location.href = `https://apps.apple.com/app/apple-store/id1498558125?pt=121014724&ct=en-seo-hpnew&mt=8`;
      location.href = this.$storage.get('iosDownloadLink')
    },
    downloadAndroid() {
      this.$ga.event("insdl", "download", "hppcdl1-app");
      // window.location.href = `https://play.google.com/store/apps/details?id=com.formeup.getinsita&referrer=utm_source%3Den-seo-hpnew`;
      location.href = this.$storage.get('adrDownloadLink');
    },
    gaLogin() {
      this.$ga.event("inslogin", "login", "hploginnew5");
      this.$nuxt.$router.push("/login");
    },
    tipQrCode(param, e) {
      if (this.COMMON.isMobile()) return;
      if (e) {
        this.$tipQrCode(param, e.clientX, e.clientY);
      } else {
        this.$tipQrCode(param);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@include animateSteps(2);

.home-5-advantages {
  background-color: #f1f4f6;

  &.home__sec {
    .home__sec_h2 {
      text-align: center;
      font: normal normal 600 40px/50px BalooChettan;
    }
  }

  .unit-container {
    margin-top: 100px;
    display: flex;
    justify-content: space-between;

    .unit {
      //padding: 0 15px;
      //width: 33.33%;
      width: 260px;
      text-align: left;
      transition: all 0.6s cubic-bezier(0.25, 1, 0.5, 1);

      img {
        max-width: 110px;
        width: 40px;
        height: 40px;
        object-fit: contain;
      }

      h3 {
        margin-top: 15px;
        font: normal normal 700 20px/30px BalooChettan;
        color: #000000;
      }

      p {
        margin-top: 9px;
        font: normal normal 500 14px/20px BalooChettan;
        color: #7f8498;
      }
    }
  }

  .btn-container {
    margin: 100px auto 0;
    display: flex;
    align-items: center;
    justify-content: center;
    .btns {
      flex-shrink: 0;
      width: 228px;
      height: 60px;
      box-shadow: 0px 12px 24px #5000323d;
      border: 2px solid #000000;
      border-radius: 8px;
      opacity: 1;
      margin-right: 20px;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      cursor: pointer;
      &:hover {
        background: #7f8498 !important;
        border-color: #7f8498;

        &.anzhuo {
          i {
            background: url("awesome-android1.svg") no-repeat;
            background-position: center center;
            background-size: 20px 24px;
          }
        }
        &.iosbtn {
          i {
            background: url("awesome-apple1.svg") no-repeat;
            background-position: center center;
            background-size: 20px 24px;
          }
        }
        span {
          color: #fff;
        }
      }
      i {
        display: inline-block;
        height: 100%;
        width: 70px;
      }
      span {
        text-align: left;
        font: normal normal 600 16px/60px BalooChettan;
        letter-spacing: 0px;
        color: #000000;
        opacity: 1;
      }
    }
    .anzhuo {
      i {
        background: url("awesome-android.svg") no-repeat;
        background-position: center center;
        background-size: 20px 24px;
      }
    }
    .iosbtn {
      i {
        background: url("awesome-apple.svg") no-repeat;
        background-position: center center;
        background-size: 20px 24px;
      }
    }
    > div {
      flex-shrink: 0;
      width: 228px;
      height: 60px;
      margin-right: 20px;
      button {
        flex-shrink: 0;
        &:last-child {
          margin-right: 0;
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .home-5-advantages {
    .unit-container {
      position: relative;
      margin-top: 62px;
      display: block;

      .unit {
        margin-top: 50px;
        padding: 0 45px 0 30px;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: flex-start;

        &.left,
        &.right {
          opacity: 0;
        }

        &.center {
          opacity: 1;
        }

        &.left,
        &.right {
          box-shadow: 0 10px 20px #2d4cc712;
          z-index: 0;
        }

        &.left {
          transform: translateX(-15vw) scale(1);
        }

        &.right {
          transform: translateX(15vw) scale(1);
        }

        &.center {
          transform: translateX(0) scale(1);
          z-index: 1;
        }

        img {
          max-width: (110px/2);
          width: 44px;
          height: auto;
        }

        h3 {
          margin-top: 0;
          font: normal normal 700 20px/30px BalooChettan;
          color: #000000;
        }

        p {
          margin-top: 8px;
          font: normal normal 600 14px/20px BalooChettan;
          color: #7f8498;
        }

        .text {
          margin-left: 40px;

          * {
            text-align: left;
          }
        }
      }

      .dots {
        display: block;

        i {
          margin: 0 4px;
          width: 6px;
          height: 6px;
        }
      }
    }

    .btn-container {
      margin: 66px auto 0;
    }
  }
}
</style>

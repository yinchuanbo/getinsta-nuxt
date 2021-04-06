<template>
  <div class="bonus">
    <div class="wrapper">
      <h1>Bonus: How to Promote Your Instagram Account</h1>
      <p class="description">
        After creating an Instagram username, you need to consider how to promote your Instagram account to realize your goal. Here are the fastest way and other traditional ways to <a href="https://www.easygetinsta.com/blog/how-to-gain-free-instagram-followers-3">gain more free followers</a> and promote your Instagram account.
      </p>
      <div class="fatest">
        <h3><span>Fatest Way</span> to Promote Your Instagram Account</h3>
        <p>The most important and direct points that affect the performance of your account are the number of followers and likes. It’s time-wasting to use traditional methods to get followers and likes. That’s why many <a href="https://www.easygetinsta.com/blog/instagram-followers-app-28 ">Instagram followers apps</a> are listed on the market and popular. Try the best Instagram auto followers app GetInsta to get free Instagram followers and likes <a href="https://www.easygetinsta.com/blog/free-instagram-followers-no-password-31">without password</a>.</p>
        <div v-show="isPc" class="steps">
          <ul class="step-num">
            <li>
              <div class="imgcontainer"><img src="../img/1.svg" alt=""></div>
              <div class="dash"></div>
            </li>
            <li>
              <div class="imgcontainer img01"><img src="../img/2.svg" alt=""></div>
              <div class="dash"></div>
            </li>
            <li>
              <div class="imgcontainer img02"><img src="../img/3.svg" alt=""></div>
              <div class="dash"></div>
            </li>
            <li>
              <div class="imgcontainer"><img src="../img/4.svg" alt=""></div>
            </li>
          </ul>
          <ul class="step-text">
            <li>
              <span>Download GetInsta App on Play Store or App Store</span>
              <img src="../img/rightintr.svg" alt="">
            </li>
            <li>
              <span>Sign up with your email and log into GetInsta</span>
              <img src="../img/rightintr.svg" alt="">
            </li>
            <li>
              <span>Add your username and get some coins as a gift</span>
              <img class="lastimgright" src="../img/rightintr.svg" alt="">
            </li>
            <li>
              <span>Use coins to publish a task to get free followers and likes NOW</span>
            </li>
          </ul>
          <ul class="getInstaList">
            <li class="someDown">
              <a href="/"><img src="../img/logo.png" alt=""></a>
              <p class="des">GetInsta</p>
              <p class="destext">Get Free Instagram Followers & Likes</p>
              <div class="btn-container">
                <span v-show="!pageIOS" class="pc" @click="ga1PC">
                  <button-purple :text="'Download GetInsta'" :font-size="'size-20'" :icon="'windows'" />
                </span>
              </div>
              <!--two small btn-->
              <div v-show="!pageIOS" class="download-container pc">
                <a class="android" href="javascript:"
                   @click="ga3Android"
                   @mouseenter="tipQrCode('android', $event)"
                   @mouseleave="tipQrCode(false)"
                >
                  <img src="../img/icon_android_logo.svg" alt="icon">
                </a>
                <a v-show="!$store.state.hideIosMinorLang" class="ios" href="javascript:"
                   @click="ga3Ios"
                   @mouseenter="tipQrCode('ios', $event)"
                   @mouseleave="tipQrCode(false)"
                >
                  <img src="../img/icon_ios_logo.svg" alt="icon">
                </a>
              </div>
            </li>
            <li><img src="../img/a1.png" alt=""></li>
            <li><img src="../img/a2.png" alt=""></li>
            <li><img src="../img/a3.png" alt=""></li>
          </ul>
        </div>
        <div v-show="!isPc" class="stepMobile">
          <div class="left">
            <div class="step-one">
              <div class="imgcontainer"><img src="../img/1.svg" alt=""></div>
              <p>Download GetInsta App on Play Store or App Store</p>
              <div class="twoSome">
                <a href="/"><img src="../img/logo.png" alt=""></a>
                <p class="des">GetInsta</p>
                <p class="destext">Get Free Instagram Followers & Likes</p>
                <div class="btn-container">
                  <div v-show="isAdr" @click="gaDownloadAPPTest">
                    <img src="@/assets/images/global/button/btn__download_original-googleplay.svg" alt="" class="andr">
                  </div>
                  <div v-show="isIos" @click="gaDownloadAPPTest">
                    <img src="../img/btn.svg" alt="" class="btnios">
                  </div>
                </div>
              </div>
            </div>
            <div class="step-three">
              <div class="imgcontainer"><img src="../img/3.svg" alt=""></div>
              <p>Add your username and get some coins as a gift</p>
              <div class="a2"><img src="../img/a2.png" alt=""></div>
            </div>
          </div>
          <div class="center"></div>
          <div class="right">
            <div class="step-two">
              <div class="imgcontainer"><img src="../img/2.svg" alt=""></div>
              <p>Sign up with your email and log into GetInsta</p>
              <div class="a1"><img src="../img/a1.png" alt=""></div>
            </div>
            <div class="step-three">
              <div class="imgcontainer"><img src="../img/4.svg" alt=""></div>
              <p>Use coins to publish a task to get free followers and likes NOW</p>
              <div class="a3"><img src="../img/a3.png" alt=""></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ButtonPurple from '@/components/button/button-purple';

export default {
  name: 'Promote',
  components: { ButtonPurple },
  data() {
    return {
      pageIOS: false,
      isPc: !this.COMMON.isMobile(),
      isAdr: this.COMMON.isAndroid(),
      isIos: this.COMMON.isiOS()
    };
  },
  methods: {
    ga1PC() {
      this.$ga.event('insdl', 'download', 'pcdl4-iug');
      window.location.href = this.$constant.app.download.windows;
    },
    gaDownloadAPPTest() {
      let url = '';
      if (this.COMMON.isiOS()) {
        url = 'https://apps.apple.com/app/apple-store/id1498558125?pt=121014724&ct=en-seo-iug&mt=8';
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
        `${this.$store.state.platform}dl4-iug`
      );
      location.href = url;
    },
    ga3Android() {
      if (this.$i18n.locale === 'en') {
        this.$ga.event('insdl', 'download', `hpappdls1`);
      } else {
        this.$ga.event('insdl', 'download', `hp8-${this.$i18n.locale}`);
      }
      if (this.$i18n.locale === 'fr' || this.$i18n.locale === 'de') {
        location.href = this.$store.state.minorLangAdrLink;
      } else {
        window.location.href = this.$store.state.enAdrLink;
      }
    },
    ga3Ios() {
    },
    tipQrCode(param, e) {
      if (this.COMMON.isMobile()) return;
      if (e) {
        this.$tipQrCode(param, e.clientX, e.clientY);
      } else {
        this.$tipQrCode(param);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
a {
  text-decoration: underline;
}

.bonus {
  width: 100%;
  text-align: center;
  color: #000000;
  padding-top: 122px;
  padding-bottom: 28px;

  h1 {
    font: 600 36px/44px Montserrat;
    color: #572EE6;
    margin-bottom: 68px;
  }

  .description {
    padding-left: 68px;
    text-align: left;
    font: 500 18px/26px Montserrat;
    margin-bottom: 35px;
  }

  .fatest {
    width: 100%;
    padding: 64px 68px 56px 68px;
    background: #FAF8FF;

    h3 {
      font: 600 20px/24px Montserrat;

      span {
        color: #B125CB;
        font-weight: 600;
      }

      margin-bottom: 20px;
    }

    p {
      font: 500 16px/24px Montserrat;
      margin-bottom: 40px;
      text-align: left;
    }

    .step-num {
      display: flex;
      align-items: center;
      justify-content: center;

      li {
        display: flex;
        align-items: center;

        .imgcontainer {
          width: 65px;
          height: 65px;
          box-shadow: 0px 6px 10px #7C56FF21;
          background: #fff;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .img01, .img02 {
          margin: 0 19px;
        }

        .dash {
          width: 191px;
          height: 0px;
          border: 1px dashed #7C56FF;
          opacity: 0.35;
        }
      }
    }

    .step-text {
      padding-top: 25px;
      display: flex;
      align-items: center;

      li {
        display: flex;
        align-items: center;

        span {
          font: 500 14px/22px Montserrat;
        }

        img {
          margin-right: 15px;
          margin-left: 20px;
        }

        .lastimgright {
          margin-right: 0px;
        }
      }
    }

    .getInstaList {
      padding-top: 16px;
      display: flex;
      align-items: center;

      li:not(:last-child) {
        margin-right: 44px;
      }

      .someDown {
        width: 239px;
        height: 530px;
        padding-top: 60px;
        border: 1px solid #E5E5E5;
        background: #fff;

        .des {
          font: italic 800 18px/22px Montserrat;
          color: #010101;
          text-align: center;
          margin-top: 16px;
        }

        .destext {
          max-width: 144px;
          margin: auto;
          margin-top: 12px;
          font: 600 14px/22px Montserrat;
          text-align: center;
          color: #303030;
        }

        .btn-container {
          width: 201px;
          height: 44px;
          margin: auto;
          margin-top: (28px/2);
          height: 50px;

          ::v-deep button {
            background: transparent linear-gradient(90deg, #4bffc2 0%, #3dff9c 86%, #3bff96 100%) 0% 0% no-repeat padding-box;
            box-shadow: none;
          }

          ::v-deep button:hover {
            background: transparent linear-gradient(90deg, #3dffc4 0%, #00ffee 100%) 0% 0% no-repeat padding-box;
            box-shadow: 0px 6px 9px #00000029;
          }

          ::v-deep button.icon-windows:before {
            background-size: 70%;
            background-image: url("~@/assets/images/global/button/icon__btn-download_logo_windows_black.svg");
          }

          ::v-deep button:before {
            margin-right: 12px;
            // margin-left: -30px;
          }

          ::v-deep button.size-20 span {
            font-size: 12px;
            color: #000;
            font-weight: 600;
          }
        }

        .download-container {
          position: relative;
          margin-top: 17px;
          display: flex;
          justify-content: center;
          flex-direction: row-reverse;

          a {
            position: relative;
            margin: 0 16px;
            display: inline-block;
            width: 60px;
            height: 60px;
            // background-color: rgba(0, 0, 0, 0.1);
            border-radius: 50%;
            overflow: hidden;
            transition: all 0.3s;


            img {
              position: absolute;
              top: 0;
              bottom: 0;
              left: 0;
              right: 0;
              margin: auto;
              content: "";
              display: block;
              width: 25px;
              height: 29px;
              background-repeat: no-repeat;
              background-position: center;
              background-size: contain;
              transition: all 0.3s;
            }

            &.ios {
              img {
                transform: translateY(-2px);
              }
            }

            &:hover {
              background-color: #6666FF;

              img {
                filter: brightness(10);
              }
            }
          }
        }

        .download-container:before {
          position: absolute;
          content: "";
          width: 1px;
          height: 20px;
          background: #232323;
          top: 20px;
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .bonus {
    width: 100%;
    text-align: center;
    color: #000000;
    padding-top: 55px;
    padding-bottom: 15px;

    h1 {
      max-width: 87%;
      margin: auto;
      font: 600 18px/25px Montserrat;
      color: #572EE6;
      margin-bottom: 20px;
    }

    .description {
      max-width: 87%;
      margin: auto;
      padding-left: 0px;
      text-align: left;
      font: 500 12px/16px Montserrat;
      margin-bottom: 30px;
    }

    .fatest {
      width: 100%;
      padding: 48px 25px 0px 25px;
      background: #FAF8FF;

      h3 {
        font: 600 16px/24px Montserrat;

        span {
          color: #B125CB;
          font-weight: 600;
        }

        margin-bottom: 23px;
      }

      p {
        font: 500 12px/16px Montserrat;
        margin-bottom: 20px;
        text-align: left;
      }

      .step-num {
        display: flex;
        align-items: center;
        justify-content: center;

        li {
          display: flex;
          align-items: center;

          .imgcontainer {
            width: 65px;
            height: 65px;
            box-shadow: 0px 6px 10px #7C56FF21;
            background: #fff;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .img01, .img02 {
            margin: 0 19px;
          }

          .dash {
            width: 191px;
            height: 0px;
            border: 1px dashed #7C56FF;
            opacity: 0.35;
          }
        }
      }

      .step-text {
        padding-top: 25px;
        display: flex;
        align-items: center;

        li {
          display: flex;
          align-items: center;

          span {
            font: 500 14px/22px Montserrat;
          }

          img {
            margin-right: 15px;
            margin-left: 20px;
          }

          .lastimgright {
            margin-right: 0px;
          }
        }
      }

      .getInstaList {
        padding-top: 16px;
        display: flex;
        align-items: center;

        li:not(:last-child) {
          margin-right: 44px;
        }

        .someDown {
          width: 239px;
          height: 530px;
          padding-top: 60px;
          border: 1px solid #E5E5E5;
          background: #fff;

          .des {
            font: italic 800 18px/22px Montserrat;
            color: #010101;
            text-align: center;
            margin-top: 16px;
          }

          .destext {
            max-width: 144px;
            margin: auto;
            margin-top: 12px;
            font: 600 14px/22px Montserrat;
            text-align: center;
            color: #303030;
          }

          .btn-container {
            width: 201px;
            height: 44px;
            margin: auto;
            margin-top: (28px/2);
            height: 50px;

            ::v-deep button {
              background: #232323;
              box-shadow: none;
            }

            ::v-deep button:hover {
              background: #373737;
              box-shadow: 0px 6px 9px #00000029;
            }

            ::v-deep button.icon-windows:before {
              background-size: 70%;
            }

            ::v-deep button:before {
              margin-right: 12px;
            }

            ::v-deep button.size-20 span {
              font-size: 12px;
            }
          }

          .download-container {
            position: relative;
            margin-top: 17px;
            display: flex;
            justify-content: center;
            flex-direction: row-reverse;

            a {
              position: relative;
              margin: 0 16px;
              display: inline-block;
              width: 60px;
              height: 60px;
              // background-color: rgba(0, 0, 0, 0.1);
              border-radius: 50%;
              overflow: hidden;
              transition: all 0.3s;


              img {
                position: absolute;
                top: 0;
                bottom: 0;
                left: 0;
                right: 0;
                margin: auto;
                content: "";
                display: block;
                width: 25px;
                height: 29px;
                background-repeat: no-repeat;
                background-position: center;
                background-size: contain;
                transition: all 0.3s;
              }

              &.ios {
                img {
                  transform: translateY(-2px);
                }
              }

              &:hover {
                background-color: #6666FF;

                img {
                  filter: brightness(10);
                }
              }
            }
          }

          .download-container:before {
            position: absolute;
            content: "";
            width: 1px;
            height: 20px;
            background: #232323;
            top: 20px;
          }
        }
      }
    }

    .stepMobile {
      display: flex;
      justify-content: center;

      .left {
        width: 140px;

        .imgcontainer {
          width: 33px;
          height: 33px;
          border-radius: 50%;
          background: #FFFFFF;
          box-shadow: 0px 3px 5px #7C56FF21;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 6px;

          img {
            width: 10px;
            height: 15px;
          }
        }

        p {
          text-align: left;
          font: 500 11px/16px Montserrat;
          color: #303030;
          margin-bottom: 11px;
        }

        .twoSome {
          width: 100%;
          // height: 210px;
          padding-top: 43px;
          padding-left: 2px;
          padding-right: 2px;
          border: 1px solid #E5E5E5;
          background: #fff;

          a img {
            width: 46px;
            height: 47px;
          }

          .des {
            font: italic 800 14px/17px Montserrat;
            color: #010101;
            text-align: center;
            margin-top: 3px;
          }

          .destext {
            max-width: 123px;
            margin: auto;
            margin-top: 7px;
            font: 600 12px/16px Montserrat;
            text-align: center;
            color: #303030;
          }

          .btn-container {
            width: 100%;
            height: 44px;
            margin: auto;
            margin-top: 20px;
            height: 50px;

            .btnios {
              width: 100%;
              height: 30px;
            }

            .andr {
              width: 100%;
              height: 30px;
            }

            ::v-deep button {
              background: #232323;
              box-shadow: none;
            }

            ::v-deep button.android {
              min-width: 100%;
            }

            ::v-deep button.ios .icon i {
              background-size: 50%;
            }

            ::v-deep button:hover {
              background: #373737;
              box-shadow: 0px 6px 9px #00000029;
            }

            ::v-deep button.icon-windows:before {
              background-size: 70%;
            }

            ::v-deep button:before {
              margin-right: 12px;
              // margin-left: -30px;
            }

            ::v-deep button.size-15 span {
              font-size: 8px;
            }
          }

          .download-container {
            position: relative;
            margin-top: 17px;
            display: flex;
            justify-content: center;
            flex-direction: row-reverse;

            a {
              position: relative;
              margin: 0 16px;
              display: inline-block;
              width: 60px;
              height: 60px;
              // background-color: rgba(0, 0, 0, 0.1);
              border-radius: 50%;
              overflow: hidden;
              transition: all 0.3s;


              img {
                position: absolute;
                top: 0;
                bottom: 0;
                left: 0;
                right: 0;
                margin: auto;
                content: "";
                display: block;
                width: 25px;
                height: 29px;
                background-repeat: no-repeat;
                background-position: center;
                background-size: contain;
                transition: all 0.3s;
              }

              &.ios {
                img {
                  transform: translateY(-2px);
                }
              }

              &:hover {
                background-color: #6666FF;

                img {
                  filter: brightness(10);
                }
              }
            }
          }

          .download-container:before {
            position: absolute;
            content: "";
            width: 1px;
            height: 20px;
            background: #232323;
            top: 20px;
          }
        }

        .step-three {
          margin-top: 42px;

          .a2 img {
            width: 140px;
            height: 330px;
          }
        }
      }

      .center {
        width: 9px;
        height: 850px;
        margin: 0 10px;
        background: url("../img/line.svg") no-repeat center;
        background-size: contain;
      }

      .right {
        width: 140px;
        padding-top: 76px;
        padding-bottom: 35px;

        .imgcontainer {
          width: 33px;
          height: 33px;
          border-radius: 50%;
          background: #FFFFFF;
          box-shadow: 0px 3px 5px #7C56FF21;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 6px;

          img {
            width: 10px;
            height: 15px;
          }
        }

        p {
          text-align: left;
          font: 500 11px/16px Montserrat;
          color: #303030;
          margin-bottom: 11px;
        }

        .step-three {
          margin-top: 24px;
        }

        .a1 img, .a3 img {
          width: 140px;
          height: 330px;
        }
      }
    }
  }
}
</style>

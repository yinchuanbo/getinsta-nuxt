<template>
  <div class="blog-detail">
    <div class="header-blank"></div>
    <div class="wrapper">
      <div class="left">
        <div class="breadcrumb">
          <nuxt-link to="/">Home</nuxt-link>
          <span>&gt;</span>
          <nuxt-link to="/blogs">Blog</nuxt-link>
          <span>&gt;</span>
          <nuxt-link to="/blogs"><b>{{ blogDetailObj.blogTitle }}</b></nuxt-link>
        </div>
        <div class="meta-info">
          <h1>{{ blogDetailObj.blogTitle }}</h1>
          <p class="intro">{{ blogDetailObj.remark }}</p>
          <hr>
          <p class="info">Updated {{ blogDetailObj.addTime }} | by {{ blogDetailObj.author }}</p>
        </div>

        <div class="blog-detail__content"
             :class="{
               'ios': $store.state.isiOS,
               'android': $store.state.isAndroid,
               'windows': $store.state.isWindows,
             }"
        >
          <div class="tips">
            Want to know how to advertise on Instagram? There are actually a few different options, but this post will help to make sense of it all by showing you how to advertise
            on Instagram using each of them.
          </div>

          <!--download module 0-->
          EN
          <div class="download">
            <div class="download__left">
              <h3>GetInsta - Ultimate Tool to Get Free Instagram Followers & Likes</h3>
              <ul>
                <li>Get followers and likes from 1 00% real and activated Instagram users.</li>
                <li>Organically increasing of followers or likes day by day.</li>
                <li>Unlimited free and 100% safe. No payment. No password. No survey.</li>
              </ul>
            </div>
            <div class="download__right">
              <!--              <p class="star"><i></i><i></i><i></i><i></i><i></i></p>-->
              <div class="btn-container">
                <a class="btn-windows" download href="https://www.easygetinsta.com/downloadpc">
                  <button-green text="Free Download" />
                </a>
                <a class="btn-android" download href="https://play.google.com/store/apps/details?id=com.insfollower.getinsta&referrer=utm_source%3Den-seo">
                  <button-green text="Free Download" />
                  <!--                  <button-download-android />-->
                </a>
                <a class="btn-ios" href="https://apps.apple.com/app/apple-store/id1498558125?pt=121014724&ct=en-seo&mt=8">
                  <button-green text="Free Download" />
                  <!--                  <button-download-ios />-->
                </a>
              </div>
              <!--              <p class="note">100% safe & clean</p>-->
            </div>
          </div>

          <!--download module 0 fr-->
          FR
          <div class="download">
            <div class="download__left">
              <h3>GetInsta – L’outil ultime pour obtenir des abonnés et des likes sur Instagram</h3>
              <ul>
                <li>Gagnez des followers et des likes d’utilisateurs Instagram 100% vrais et actifs.</li>
                <li>Boostez naturellement vos followers et likes de jour en jour.</li>
                <li>Illimité gratuit et 100% sécurisé. Pas de paiement, pas de mot de passe et pas d’enquête.</li>
              </ul>
            </div>
            <div class="download__right">
              <p class="star"><i></i><i></i><i></i><i></i><i></i></p>
              <div class="btn-container">
                <div class="btn-apps btn-windows">
                  <a class="btn-apps__links" download href="https://play.google.com/store/apps/details?id=com.insfollower.getinsta&referrer=utm_source%3Den-seo">
                    <button class="btn-download-green no-text icon-android">
                      <div class="icon">
                        <i></i>
                        <b></b>
                      </div>
                    </button>
                  </a>
                  <a class="btn-apps__links" href="https://apps.apple.com/app/apple-store/id1498558125?pt=121014724&ct=en-seo&mt=8">
                    <button class="btn-download-green no-text icon-ios">
                      <div class="icon">
                        <i></i>
                        <b></b>
                      </div>
                    </button>
                  </a>
                </div>
                <a class="btn-android" download href="https://play.google.com/store/apps/details?id=com.insfollower.getinsta&referrer=utm_source%3Den-seo">
                  <button-green text="Télécharger l’application" />
                </a>
                <a class="btn-ios" href="https://apps.apple.com/app/apple-store/id1498558125?pt=121014724&ct=en-seo&mt=8">
                  <button-green text="Télécharger l’application" />
                </a>
              </div>
              <p class="note">100% sûr et fiable</p>
            </div>
          </div>

          <!--download module 0 de-->
          DE
          <div class="download">
            <div class="download__left">
              <h3>GetInsta – ultimatives Tool um kostenlose Instagram-Follower und Likes zu bekommen</h3>
              <ul>
                <li>Bekommen Sie Instagram Follower und Likes von 100 % echten und aktiven Nutzern.</li>
                <li>Erhöhen Sie die Anzahl der Instagram-Follower von Tag zu Tag.</li>
                <li>Unbegrenzt kostenlos und 100% sicher. Keine Zahlung, kein Passwort und keine Umfrage.</li>
              </ul>
            </div>
            <div class="download__right">
              <p class="star"><i></i><i></i><i></i><i></i><i></i></p>
              <div class="btn-container">
                <div class="btn-apps btn-windows">
                  <a class="btn-apps__links" download href="https://play.google.com/store/apps/details?id=com.insfollower.getinsta&referrer=utm_source%3Den-seo">
                    <button class="btn-download-green no-text icon-android">
                      <div class="icon">
                        <i></i>
                        <b></b>
                      </div>
                    </button>
                  </a>
                  <a class="btn-apps__links" href="https://apps.apple.com/app/apple-store/id1498558125?pt=121014724&ct=en-seo&mt=8">
                    <button class="btn-download-green no-text icon-ios">
                      <div class="icon">
                        <i></i>
                        <b></b>
                      </div>
                    </button>
                  </a>
                </div>
                <a class="btn-android" download href="https://play.google.com/store/apps/details?id=com.insfollower.getinsta&referrer=utm_source%3Den-seo">
                  <button-green text="Kostenlos Downloaden" />
                </a>
                <a class="btn-ios" href="https://apps.apple.com/app/apple-store/id1498558125?pt=121014724&ct=en-seo&mt=8">
                  <button-green text="Kostenlos Downloaden" />
                </a>
              </div>
              <p class="note">100% sicher</p>
            </div>
          </div>

          <p>
            The first option you have when it comes to how to advertise on Instagram, is to use promotions. Promotions are simply a tool that allows you to extend the reach of an
            already existing Instagram post to a much larger audience.
          </p>

          <div class="index">
            <ul>
              <li><a href="#aa">Types of Advertising on Instagram</a></li>
              <li>Promotions</li>
              <li>The Bottom Line</li>
            </ul>
          </div>

          <h2 id="aa">Types of Advertising on Instagram</h2>

          <p>
            The first option you have when it comes to how to advertise on Instagram, is to use promotions. Promotions are simply a tool that allows you to extend the reach of an
            already existing Instagram post to a much larger audience.
          </p>

          <!--table-->
          <table>
            <thead>
              <tr>
                <th>Features</th>
                <th>GetInsta</th>
                <th>GetInsta</th>
                <th><b>GetInsta</b></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>High Quality - Real & Safe</td>
                <td><i class="check"></i></td>
                <td><i class="check"></i></td>
                <td><i class="check"></i></td>
              </tr>
              <tr>
                <td>High Quality - Real & Safe</td>
                <td></td>
                <td><i class="cross"></i></td>
                <td><i class="check"></i></td>
              </tr>
            </tbody>
          </table>

          <!--download module 1-->
          EN
          <div class="download-type-1">
            <h2>GetInsta - Get Free Instagram Followers & Likes</h2>
            <ul>
              <li>Free high-quality Instagram followers & likes from 100% real person.</li>
              <li>Getting followers and also get the same amount of additional free likes.</li>
              <li>Instant delivery guaranteed and 24/7 customer support.</li>
            </ul>
            <div class="btn-container">
              <a class="btn-windows" download href="https://www.easygetinsta.com/downloadpc">
                <button class="btn-download-green icon-windows">
                  <div class="icon">
                    <i></i>
                    <b></b>
                  </div>
                  <div class="text">Free Download</div>
                </button>
              </a>

              <a class="btn-android" download href="https://play.google.com/store/apps/details?id=com.insfollower.getinsta&referrer=utm_source%3Den-seo">
                <button class="btn-download-green icon-android">
                  <div class="icon">
                    <i></i>
                    <b></b>
                  </div>
                  <div class="text">Free Download</div>
                </button>
                <!--                <button-download-android />-->
              </a>

              <a class="btn-ios" href="https://apps.apple.com/app/apple-store/id1498558125?pt=121014724&ct=en-seo&mt=8">
                <button class="btn-download-green icon-ios">
                  <div class="icon">
                    <i></i>
                    <b></b>
                  </div>
                  <div class="text">Free Download</div>
                </button>
                <!--                <button-download-ios />-->
              </a>

              <a class="btn-buy" href="https://www.easygetinsta.com/buy-instagram-followers">
                <button class="buy">Buy Now</button>
              </a>
            </div>
          </div>

          <div style="height: 60px;"></div>

          <!--download module 1 fr-->
          FR
          <div class="download-type-1">
            <h2>GetInsta - Gagnez des followers et des likes Instagram gratuits</h2>
            <ul>
              <li>Des abonnés Instagram gratuits et de haute qualité, personnes 100% réelles</li>
              <li>Obtenez des followers et gagnez également le même nombre de likes gratuits supplémentaires.</li>
              <li>Livraison instantanée garantie et support client 24/7.</li>
            </ul>
            <div class="btn-container">
              <div class="btn-apps btn-windows">
                <a class="btn-apps__links" download href="https://play.google.com/store/apps/details?id=com.insfollower.getinsta&referrer=utm_source%3Den-seo">
                  <button class="btn-download-green no-text icon-android">
                    <div class="icon">
                      <i></i>
                      <b></b>
                    </div>
                  </button>
                </a>
                <a class="btn-apps__links" href="https://apps.apple.com/app/apple-store/id1498558125?pt=121014724&ct=en-seo&mt=8">
                  <button class="btn-download-green no-text icon-ios">
                    <div class="icon">
                      <i></i>
                      <b></b>
                    </div>
                  </button>
                </a>
              </div>

              <a class="btn-android" download href="https://play.google.com/store/apps/details?id=com.insfollower.getinsta&referrer=utm_source%3Den-seo">
                <button class="btn-download-green">
                  <div class="icon">
                    <i></i>
                    <b></b>
                  </div>
                  <div class="text">Télécharger Gratuitement</div>
                </button>
              </a>

              <a class="btn-ios" href="https://apps.apple.com/app/apple-store/id1498558125?pt=121014724&ct=en-seo&mt=8">
                <button class="btn-download-green">
                  <div class="icon">
                    <i></i>
                    <b></b>
                  </div>
                  <div class="text">Télécharger Gratuitement</div>
                </button>
              </a>

              <a class="btn-buy" href="https://de.easygetinsta.com/buy-instagram-followers?utm_source=PC&utm_medium=blogbaner">
                <button class="buy">Acheter Maintenant</button>
              </a>
            </div>
          </div>

          <div style="height: 60px;"></div>

          <!--download module 1 de-->
          DE
          <div class="download-type-1">
            <h2>GetInsta – bekommen Sie kostenlose Instagram Follower und Likes</h2>
            <ul>
              <li>Kostenlose, hochwertige Instagram-Follower, 100% echte Menschen.</li>
              <li>Bekommen Sie Follower und erhalten Sie die gleiche Anzahl zusätzlicher kostenloser Likes.</li>
              <li>Garantierte sofortige Lieferung und 24/7 Kundenservice.</li>
            </ul>
            <div class="btn-container">
              <div class="btn-apps btn-windows">
                <a class="btn-apps__links" download href="https://play.google.com/store/apps/details?id=com.insfollower.getinsta&referrer=utm_source%3Den-seo">
                  <button class="btn-download-green no-text icon-android">
                    <div class="icon">
                      <i></i>
                      <b></b>
                    </div>
                  </button>
                </a>
                <a class="btn-apps__links" href="https://apps.apple.com/app/apple-store/id1498558125?pt=121014724&ct=en-seo&mt=8">
                  <button class="btn-download-green no-text icon-ios">
                    <div class="icon">
                      <i></i>
                      <b></b>
                    </div>
                  </button>
                </a>
              </div>

              <a class="btn-android" download href="https://play.google.com/store/apps/details?id=com.insfollower.getinsta&referrer=utm_source%3Den-seo">
                <button class="btn-download-green">
                  <div class="icon">
                    <i></i>
                    <b></b>
                  </div>
                  <div class="text">Kostenlos Downloaden</div>
                </button>
              </a>

              <a class="btn-ios" href="https://apps.apple.com/app/apple-store/id1498558125?pt=121014724&ct=en-seo&mt=8">
                <button class="btn-download-green">
                  <div class="icon">
                    <i></i>
                    <b></b>
                  </div>
                  <div class="text">Kostenlos Downloaden</div>
                </button>
              </a>

              <a class="btn-buy" href="https://de.easygetinsta.com/buy-instagram-followers?utm_source=PC&utm_medium=blogbaner">
                <button class="buy">JETZT KAUFEN</button>
              </a>
            </div>
          </div>

          <div style="height: 60px;"></div>

          <!--download module 2-->
          EN
          <div class="download-type-2">
            <hr>
            <div class="btn-container">
              <a class="btn-windows" download href="https://www.easygetinsta.com/downloadpc">
                <button class="btn-download-green icon-windows">
                  <div class="icon">
                    <i></i>
                    <b></b>
                  </div>
                  <div class="text">Free Download</div>
                </button>
              </a>

              <a class="btn-android" download href="https://play.google.com/store/apps/details?id=com.insfollower.getinsta&referrer=utm_source%3Den-seo">
                <button class="btn-download-green icon-android">
                  <div class="icon">
                    <i></i>
                    <b></b>
                  </div>
                  <div class="text">Free Download</div>
                </button>
                <!--                <button-download-android />-->
              </a>

              <a class="btn-ios" href="https://apps.apple.com/app/apple-store/id1498558125?pt=121014724&ct=en-seo&mt=8">
                <button class="btn-download-green icon-ios">
                  <div class="icon">
                    <i></i>
                    <b></b>
                  </div>
                  <div class="text">Free Download</div>
                </button>
                <!--                <button-download-ios />-->
              </a>

              <a class="btn-buy" href="https://www.easygetinsta.com/buy-instagram-followers">
                <button class="buy">Buy Now</button>
              </a>
            </div>
            <p class="note">100% safe & clean</p>
            <hr>
          </div>

          <div style="height: 60px;"></div>

          FR
          <div class="download-type-2">
            <hr>
            <div class="btn-container">
              <div class="btn-apps btn-windows">
                <a class="btn-apps__links" download href="https://play.google.com/store/apps/details?id=com.insfollower.getinsta&referrer=utm_source%3Den-seo">
                  <button class="btn-download-green no-text icon-android">
                    <div class="icon">
                      <i></i>
                      <b></b>
                    </div>
                  </button>
                </a>
                <a class="btn-apps__links" href="https://apps.apple.com/app/apple-store/id1498558125?pt=121014724&ct=en-seo&mt=8">
                  <button class="btn-download-green no-text icon-ios">
                    <div class="icon">
                      <i></i>
                      <b></b>
                    </div>
                  </button>
                </a>
              </div>

              <a class="btn-android" download href="https://play.google.com/store/apps/details?id=com.insfollower.getinsta&referrer=utm_source%3Den-seo">
                <button class="btn-download-green">
                  <div class="icon">
                    <i></i>
                    <b></b>
                  </div>
                  <div class="text">Télécharger Gratuitement</div>
                </button>
              </a>

              <a class="btn-ios" href="https://apps.apple.com/app/apple-store/id1498558125?pt=121014724&ct=en-seo&mt=8">
                <button class="btn-download-green">
                  <div class="icon">
                    <i></i>
                    <b></b>
                  </div>
                  <div class="text">Télécharger Gratuitement</div>
                </button>
              </a>

              <a class="btn-buy" href="https://www.easygetinsta.com/buy-instagram-followers">
                <button class="buy">Acheter Maintenant</button>
              </a>
            </div>
            <p class="note">100% sûr et fiable</p>
            <hr>
          </div>

          <div style="height: 60px;"></div>

          DE
          <div class="download-type-2">
            <hr>
            <div class="btn-container">
              <div class="btn-apps btn-windows">
                <a class="btn-apps__links" download href="https://play.google.com/store/apps/details?id=com.insfollower.getinsta&referrer=utm_source%3Den-seo">
                  <button class="btn-download-green no-text icon-android">
                    <div class="icon">
                      <i></i>
                      <b></b>
                    </div>
                  </button>
                </a>
                <a class="btn-apps__links" href="https://apps.apple.com/app/apple-store/id1498558125?pt=121014724&ct=en-seo&mt=8">
                  <button class="btn-download-green no-text icon-ios">
                    <div class="icon">
                      <i></i>
                      <b></b>
                    </div>
                  </button>
                </a>
              </div>

              <a class="btn-android" download href="https://play.google.com/store/apps/details?id=com.insfollower.getinsta&referrer=utm_source%3Den-seo">
                <button class="btn-download-green">
                  <div class="icon">
                    <i></i>
                    <b></b>
                  </div>
                  <div class="text">Kostenlos Downloaden</div>
                </button>
              </a>

              <a class="btn-ios" href="https://apps.apple.com/app/apple-store/id1498558125?pt=121014724&ct=en-seo&mt=8">
                <button class="btn-download-green">
                  <div class="icon">
                    <i></i>
                    <b></b>
                  </div>
                  <div class="text">Kostenlos Downloaden</div>
                </button>
              </a>

              <a class="btn-buy" href="https://www.easygetinsta.com/buy-instagram-followers">
                <button class="buy">JETZT KAUFEN</button>
              </a>
            </div>
            <p class="note">100% sicher</p>
            <hr>
          </div>
        </div>

        <div class="related-list">
          <h2>Related Readings for Reference</h2>
          <a v-for="(unit, i) in relatedArticleList" :key="i">{{ unit.title }}</a>
        </div>
      </div>
      <div class="right">
        <div class="mix-container">
          <img src="@/assets/images/global/logo.svg" alt="LOGO">
          <h2>GetInsta</h2>
          <p>Your ultimate tool to get free Instagram followers & likes. 100% real.</p>
          <div class="btn">
            <button-yellow-download text="Download App Now" :font-size="'header-small'" />
          </div>
          <p>100% safe & clean</p>
          <img class="qr" src="@/assets/images/global/qr-code__download.svg" alt="QR Code">
          <p>Scan the QR code to get the App</p>
        </div>
        <div class="hot-list">
          <h2>Hot Articles</h2>
          <div class="links">
            <nuxt-link to="/blog-detail">How to Advertise on Instagram? [Step by Step Guide] – 2019</nuxt-link>
            <nuxt-link to="/blog-detail">How to Advertise on Instagram? [Step by Step Guide] – 2019</nuxt-link>
            <nuxt-link to="/blog-detail">How to Advertise on Instagram? [Step by Step Guide] – 2019</nuxt-link>
            <nuxt-link to="/blog-detail">How to Advertise on Instagram? [Step by Step Guide] – 2019</nuxt-link>
            <nuxt-link to="/blog-detail">How to Advertise on Instagram? [Step by Step Guide] – 2019</nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ButtonGreen from '@/components/button/button-green';
import ButtonYellowDownload from '@/components/button/button-yellow-download';

export default {
  name: 'BlogDetailExample',
  components: {
    ButtonYellowDownload,
    ButtonGreen
  },
  props: {
    reqObj: {
      type: Object,
      require: true,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      relatedArticleList: [
        {
          title: 'How to Advertise on Instagram? [Step by Step Guide] – 2019',
          url: ''
        },
        {
          title: 'How to Advertise on Instagram? [Step by Step Guide] – 2019',
          url: ''
        },
        {
          title: 'How to Advertise on Instagram? [Step by Step Guide] – 2019',
          url: ''
        },
        {
          title: 'How to Advertise on Instagram? [Step by Step Guide] – 2019',
          url: ''
        }
      ],
      blogDetailObj: {
        blogTitle: 'Article Styles Sample',
        remark: 'Article Styles Sample Subtitle',
        addTime: '2020-01-01 00:00',
        author: 'Author'
      },
      ajaxRequesting: false,
      dialogFail: false,
      dialogFailMsg: ''
    };
  }
};
</script>

<style lang="scss" scoped src="./blog-detail.scss"></style>
<style lang="scss" scoped>
.blog-detail {
  padding-bottom: 100px;

  .wrapper {
    padding-top: 32px;
  }

  .left {
    display: inline-block;
    vertical-align: top;
    width: 800px;

    .breadcrumb {
      line-height: 60px;
      border-bottom: 1px solid #E8E8E8;

      a, span {
        margin: 0 2px;
        display: inline-block;
        font: 500 16px Montserrat;
        color: #7E7E7E;

        b {
          color: #000000;
          font-weight: 600;
        }
      }
    }

    .meta-info {
      padding-top: 28px;

      h1 {
        font: 600 40px/50px Montserrat;
        color: #2128BD;
      }

      p.intro {
        margin-top: 40px;
        font: 400 16px/20px Montserrat;
        color: #2A2A2A;
      }

      hr {
        margin-top: 30px;
        border-top: 1px solid #E8E8E8;
      }

      p.info {
        margin-top: 20px;
        font: Regular 16px/20px Montserrat;
        letter-spacing: 0;
        color: #A8A8A8;
      }
    }

    .related-list {
      margin-top: 110px;

      h2 {
        font: 600 20px/46px Montserrat;
        color: #2A2A2A;
      }

      a {
        display: inline-block;
        width: 100%;
        border-bottom: 1px solid #E8E8E8;
        font: 500 16px/64px Montserrat;
        color: #7E7E7E;
        transition: all 0.1s;

        &:hover {
          color: #005fff;
        }
      }
    }
  }

  .right {
    margin-left: 56px;
    display: inline-block;
    vertical-align: top;
    width: 342px;

    .mix-container {
      padding: 32px 0 22px;
      width: 100%;
      background: linear-gradient(270deg, #6924F2 0%, #6213FC 100%);
      box-shadow: 0 3px 6px #00000029;
      border-radius: 12px;

      text-align: center;

      h2 {
        margin-top: 20px;
        font: 800 italic 28px Montserrat;
        color: #fff;
      }

      p {
        margin-top: 16px;
        font: 400 16px/20px Montserrat;
        color: #FFFFFF;
      }

      .btn {
        margin-top: 22px;
        display: inline-block;
        width: 280px;
        height: 60px;
      }

      img.qr {
        margin-top: 22px;
        width: 100px;
      }
    }

    .hot-list {
      margin-top: 62px;

      h2 {
        font: 600 20px/47px Montserrat;
        color: #2A2A2A;
      }

      .links {
        a {
          margin-top: 20px;
          padding-bottom: 14px;
          display: block;
          border-bottom: 1px solid #E8E8E8;

          font: 500 16px/19px Montserrat;
          color: #7E7E7E;
          transition: all 0.1s;

          &:hover {
            color: #2128BD;
          }
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .blog-detail {
    padding-bottom: 60px;

    .wrapper {
      padding: 0 4vw;
    }

    .left {
      width: 100%;

      .breadcrumb {
        padding-top: 20px;
        line-height: normal;
        border-bottom: none;

        a, span {
          display: inline-block;
          font: 500 14px Montserrat;
        }
      }

      .meta-info {
        padding-top: 22px;

        h1 {
          font: 600 22px/27px Montserrat;
        }

        p.intro {
          margin-top: 16px;
          font: 400 14px/17px Montserrat;
        }

        hr {
          margin-top: 16px;
        }

        p.info {
          margin-top: 12px;
          font: 400 12px/14px Montserrat;
        }
      }

      .related-list {
        margin-top: (110px/2);

        h2 {
          margin-bottom: 36px;
          font: 600 16px/24px Montserrat;
        }

        a {
          margin-top: 10px;
          padding-bottom: 10px;
          font: 500 14px/20px Montserrat;
          @include text-ellipsis-multi(2);
        }
      }
    }

    .right {
      margin-left: 0;
      margin-top: 60px;
      width: 100%;

      .mix-container {
        padding: 4vw;

        .btn {
          margin-top: 22px;
          width: 72vw;
          height: 50px;
        }
      }

      .hot-list {
        margin-top: 62px;

        h2 {
          font: 600 16px/24px Montserrat;
        }

        .links {
          a {
            margin-top: 20px;
            padding-bottom: 14px;
            font: 500 16px Montserrat;
            @include text-ellipsis-multi(2);
          }
        }
      }
    }
  }
}
</style>

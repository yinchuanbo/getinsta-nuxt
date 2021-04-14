<template>
  <div class="blog-detail">
    <blog-title-v2 />

    <div class="wrapper">
      <div class="left">
        <div class="breadcrumb">
          <nuxt-link to="/">Home</nuxt-link>
          <span>&gt;</span>
          <nuxt-link to="/blog">Blog</nuxt-link>
          <span>&gt;</span>
          <nuxt-link to="/blog"><b>{{ blogDetailObj.blogTitle }}</b></nuxt-link>
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
          <!--tips-->
          <div class="tips">
            Want to know how to advertise on Instagram? There are actually a few different options, but this post will help to make sense of it all by showing you how to advertise
            on Instagram using each of them.
          </div>

          <!--notice-->
          <div class="tips notice">
            Want to know how to advertise on Instagram? There are actually a few different options, but this post will help to make sense of it all by showing you how to advertise
            on Instagram using each of them.
          </div>

          <!--download module 0-->
          <p>EN</p>
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

          <p>
            The first option you have when it comes to how to advertise on Instagram, is to use promotions. Promotions are simply a tool that allows you to extend the reach of an
            already existing Instagram post to a much larger audience.
          </p>

          <!--索引-->
          <div class="index">
            <ul>
              <li><a href="#aa">Types of Advertising on Instagram</a></li>
              <li>Promotions</li>
              <li>The Bottom Line</li>
            </ul>
          </div>

          <!--索引v2-->
          <div id="index-v2" class="index-v2">
            <p class="index-v2__title"><span>Contents</span></p>
            <div class="index-v2__unit-container">
              <div class="index-v2__unit">
                <a data-id="aa">Index list</a>
              </div>
              <div class="index-v2__unit sub active">
                <span class="index-v2__sub-title">Index sub title</span>
                <div class="index-v2__subunit-container">
                  <div class="index-v2__subunit">
                    <a data-id="aa">Index sub list</a>
                  </div>
                  <div class="index-v2__subunit">
                    <a data-id="aa">Index sub list</a>
                  </div>
                  <div class="index-v2__subunit">
                    <a data-id="aa">Index sub list</a>
                  </div>
                </div>
              </div>
              <div class="index-v2__unit">
                <a data-id="aa">Index list</a>
              </div>
              <div class="index-v2__unit">
                <a data-id="aa">Index list</a>
              </div>
              <div class="index-v2__unit">
                <a data-id="aa">Index list</a>
              </div>
              <div class="index-v2__unit">
                <a data-id="aa">Index list</a>
              </div>
              <div class="index-v2__unit">
                <a data-id="aa">Index list</a>
              </div>
              <div class="index-v2__unit">
                <a data-id="aa">Index list</a>
              </div>
              <div class="index-v2__unit">
                <a data-id="aa">Index list</a>
              </div>
              <div class="index-v2__unit">
                <a data-id="aa">Index list</a>
              </div>
              <div class="index-v2__unit">
                <a data-id="aa">Index list</a>
              </div>
              <div class="index-v2__unit">
                <a data-id="aa">Index list</a>
              </div>
            </div>
          </div>

          <h2><a id="aa"></a>Types of Advertising on Instagram</h2>

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
              <tr>
                <td>High Quality - Real & Safe</td>
                <td></td>
                <td><i class="cross"></i></td>
                <td><i class="check"></i></td>
              </tr>
              <tr>
                <td>High Quality - Real & Safe</td>
                <td></td>
                <td><i class="cross"></i></td>
                <td><i class="check"></i></td>
              </tr>
              <tr>
                <td>High Quality - Real & Safe</td>
                <td></td>
                <td><i class="cross"></i></td>
                <td><i class="check"></i></td>
              </tr>
              <tr>
                <td>High Quality - Real & Safe</td>
                <td></td>
                <td><i class="cross"></i></td>
                <td><i class="check"></i></td>
              </tr>
              <tr>
                <td>High Quality - Real & Safe</td>
                <td></td>
                <td><i class="cross"></i></td>
                <td><i class="check"></i></td>
              </tr>
              <tr>
                <td>High Quality - Real & Safe</td>
                <td></td>
                <td><i class="cross"></i></td>
                <td><i class="check"></i></td>
              </tr>
              <tr>
                <td>High Quality - Real & Safe</td>
                <td></td>
                <td><i class="cross"></i></td>
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
          <p>EN</p>
          <div class="download-type-1">
            <h2>GetInsta - Best Instagram Followers & Likes App</h2>
            <ul>
              <li>Free high-quality Instagram followers & likes from 100% real person.</li>
              <li>Organic daily IG followers & likes with various subscriptions.</li>
              <li>Instant delivery and 24/7 customer support.</li>
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
                <button class="buy yellow">Buy Now</button>
              </a>
            </div>
          </div>

          <!--download module 2-->
          <p>EN</p>
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

          <!--download module 3-->
          <p>Download Module 3</p>
          <div class="download-type-3">
            <div class="left">
              <h2>GetInsta - Ultimate Tool to Get Free Instagram Followers & Likes</h2>
              <ul>
                <li><span>Get followers and likes from 100% real and activated Instagram users.</span></li>
                <li><span>Organically increasing of followers or likes day by day.</span></li>
                <li><span>Unlimited free and 100% safe. No payment. No password. No survey.</span></li>
              </ul>
            </div>
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

              <p class="safe">100% safe & clean</p>
            </div>
          </div>

          <p>Images Gallery vertical</p>
          <div class="img-gallery vertical">
            <img src="./img/temp-img-gallery.png" alt="">
            <img src="./img/temp-img-gallery.png" alt="">
            <img src="./img/temp-img-gallery.png" alt="">
          </div>

          <p>Images Gallery horizontal</p>
          <div class="img-gallery horizontal">
            <img src="./img/temp-img-gallery.png" alt="">
            <img src="./img/temp-img-gallery.png" alt="">
            <img src="./img/temp-img-gallery.png" alt="">
          </div>

          <br><br>
          <p>Buy Instagram Daily Likes</p>
          <div class="blogBuyDailyLikes"></div>

          <br><br>
          <p>Instagram Search Banner</p>
          <div class="blogBanner"></div>
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
          <p class="sub"><span>{{ $t('blogDetail.subtitle') }}</span></p>
          <div class="btn pc">
            <div class="btn-c">
              <!--<button-download-windows-yellow />-->
              <button-download-windows />
            </div>
            <div class="btn-c">
              <!--<button-download-android :type="'transparent'" />-->
              <button-download-android />
            </div>
            <div class="btn-c">
              <!--<button-download-ios :type="'transparent'" />-->
              <button-download-ios />
            </div>
          </div>
          <div class="btn mobile">
            <button-download-ios v-if="$store.state.isiOS" />
            <button-download-android v-if="$store.state.isAndroid" />
          </div>
          <p class="sub b"><i></i><span>{{ $t('global.safe') }}</span></p>
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

    <index-floating-ball :show="indexFloatingBallShow" />
  </div>
</template>

<script>
import ButtonGreen from '@/components/button/button-green';
import BlogTitleV2 from '@/views/blog/static-modules/blog-title-v2/blog-title-v2';

// 动态挂载
import Vue from 'vue';
import imgGalleryCom from '@/views/blog/dynamical-modules/blog-img-gallery/blog-img-gallery';
import blogBuyAutoLikes from '@/views/blog/dynamical-modules/blog-buy-auto-likes/blog-buy-auto-likes.vue';
import blogSearch from '@/views/blog/dynamical-modules/blog-search/blog-search.vue';
import IndexFloatingBall from '@/views/blog/static-modules/index-floating-ball/index-floating-ball';

const ImgGallery = Vue.extend(imgGalleryCom);
const BlogBuyAutoLikes = Vue.extend(blogBuyAutoLikes);
const BlogSearch = Vue.extend(blogSearch);

export default {
  name: 'BlogDetailExample',
  components: {
    IndexFloatingBall,
    BlogTitleV2,
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
      dialogFailMsg: '',
      indexFloatingBallShow: false
    };
  },
  mounted() {
    this.imgGalleryDisplay();
    this.blogBuyAutoLikesDisplay();
    this.blogSearchDisplay();

    this.blogIndexClickEvent();
  },
  methods: {
    imgGalleryDisplay() {
      const checkNode = [...document.querySelectorAll('.img-gallery')];
      if (checkNode.length) {
        for (let i = 0; i < checkNode.length; i++) {
          let imgListArray = [];
          const container = checkNode[i];
          const imgNodes = container.querySelectorAll('img');
          for (let j = 0; j < imgNodes.length; j++) {
            imgListArray.push(imgNodes[j].src);
          }
          let component = new ImgGallery({
            propsData: {
              imgDirectionHorizontal: container.classList.contains('horizontal'),
              imgList: imgListArray
            }
          }).$mount();
          container.parentNode.replaceChild(component.$el, container);
        }
      }
    },
    blogBuyAutoLikesDisplay() {
      const checkNode = [...document.querySelectorAll('.blogBuyDailyLikes')];
      if (checkNode.length) {
        for (let j = 0; j < checkNode.length; j++) {
          let component = new BlogBuyAutoLikes({ propsData: { sendThis: this } }).$mount();
          checkNode[j].parentNode.replaceChild(component.$el, checkNode[j]);
        }
      }
    },
    blogSearchDisplay() {
      const checkNode = [...document.querySelectorAll('.blogBanner')];
      if (checkNode.length) {
        for (let j = 0; j < checkNode.length; j++) {
          let component = new BlogSearch({ propsData: { ax: '10', sendThis: this } }).$mount();
          checkNode[j].parentNode.replaceChild(component.$el, checkNode[j]);
        }
      }
    },
    blogIndexClickEvent() {
      let _this = this;
      let units = document.querySelectorAll('.index-v2__unit');

      // 悬浮球显示
      this.indexFloatingBallShow = units.length > 0;

      // Index二级菜单事件绑定
      for (let i = 0; i < units.length; i++) {
        let ta = units[i];
        if (ta.classList.contains('sub')) {
          ta.addEventListener('click', function (e) {
            let thisClassList = this.classList;
            if (e.target.className === 'index-v2__sub-title') {
              if (thisClassList.contains('active')) {
                thisClassList.remove('active');
              } else {
                thisClassList.add('active');
              }
            }
          });
        }
      }

      // Index锚点事件绑定
      for (let j = 0; j < units.length; j++) {
        let aTag = units[j].querySelector('a');
        aTag.addEventListener('click', function (e) {
          _this.$scrollTo(
            `#${e.target.attributes['data-id'].value}`,
            { offset: -1 * _this.COMMON.headerHeight() }
          );
          e.preventDefault();
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped src="./blog-detail.scss"></style>

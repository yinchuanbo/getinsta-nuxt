<template>
  <div>
    <div id="store-shelf-1-buy" class="store-shelf-1-buy pc">
      <div class="buy-content">
        <div class="buy-tabs">
          <div
            class="buy-tabs_item"
            :class="{ on: tabsIndex === 0 }"
            @click="tabSwitch(0)"
          >
            <p>Instant Likes</p>
          </div>

          <div
            class="buy-tabs_item"
            :class="{ on: tabsIndex === 1 }"
            @click="tabSwitch(1)"
          >
            <p>Auto Likes</p>
          </div>


          <div
            class="buy-tabs_item"
            :class="{ on: tabsIndex === 2 }"
            @click="tabSwitch(2)"
          >
            <p>Daily Likes</p>
          </div>
        </div>
        <div class="buy-tabs_content">
          <transition name="fade-tabs" mode="out-in">
            <div v-if="tabsIndex === 0" key="box0" class="buy-tabs_content-item">
              <!-- v-if="!productPkgListLoading" -->
              <div v-if="productPkgListLoading" style="width: 100%;height: 420px;display: flex;justify-content: center;align-items: flex-start">
                <img src="./img/loading-puff-black.svg" width="100" height="100" alt="">
              </div>
              <ul v-if="!productPkgListLoading">
                <li
                  v-for="(pkg, i) in productPkgListLike"
                  :key="i"
                  :class="{
                    follow: pkg['product_type'] === 2,
                    like: pkg['product_type'] === 1,
                    selected: productPkgListLikeIndex === i,
                    hot: pkg['promote_sale_type'] === 3,
                  }"
                  class="package spring"
                  @click="pkgCheck(pkg, i)"
                >
                  <div class="buy-tabs_content-item_top">
                    <h2>
                      <span></span>
                    </h2>
                    <p>{{ pkg['purchase_quantity'] }}</p>
                    <span>Likes</span>
                    <div v-if="pkg['gives'][0].quantity !== 0" class="tags">
                      + {{ pkg['gives'][0].quantity }} Free
                    </div>
                  </div>
                  <div class="buy-tabs_content-item_bottom">
                    <div v-if="pkg.payment_type === 1" class="bottom_price">
                      <sup>{{ pkg.price | numToFixed }} coins</sup>
                      <sub>{{ pkg['original_price'] | numToFixed }} coins</sub>
                    </div>
                    <div v-if="pkg.payment_type === 2" class="bottom_price">
                      <p>
                        {{
                          $t('global.currencySymbol')
                        }}{{ pkg.price_decimal | numToFixed }}
                      </p>
                    </div>
                    <div class="bottom_line">
                      <p></p>
                    </div>
                    <div class="bottom_text">
                      <div>
                        <img src="./img/selected-icon.svg" alt="" />
                        <p>Real Likes</p>
                      </div>
                      <div>
                        <img src="./img/selected-icon.svg" alt="" />
                        <p>Drop Protection</p>
                      </div>
                      <div>
                        <img src="./img/selected-icon.svg" alt="" />
                        <p>Instant Delivery</p>
                      </div>
                      <div>
                        <img src="./img/selected-icon.svg" alt="" />
                        <p>24/7 Support</p>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>

            <!-- auto likes -->
            <div v-if="tabsIndex === 1" key="box1" class="buy-tabs_content-item like-day-main auto-like">

              <p>This service will automatically deliver an equivalent number of likes to your upcoming new posts.</p>

              <div v-if="!productPkgListLoading" class="like-day">
                <label class="cycle days">
                    <select v-model="productPkgListDaysVMAuto" name="offer-daily" class="package changed">
                      <option v-for="(item, i) in productPkgListDaysAuto" :key="i" :value="item"
                      >For {{ item }} New Posts
                      </option>
                    </select>
                </label>
              </div>
              <!-- v-if="!productPkgListLoading" -->
              <div v-if="productPkgListLoading" style="width: 100%;height: 420px;display: flex;justify-content: center;align-items: flex-start">
                <img src="./img/loading-puff-black.svg" width="100" height="100" alt="">
              </div>
              <ul v-if="!productPkgListLoading">
                <li
                  v-for="(item, i) in productPkgListDailyAuto"
                  :key="i"
                  :class="{ dayActive: productPkgListDailyVMAuto === item, mostPopular: i=== 1 }"
                  @click="dayClick(item)"
                >
                  <span class="circle-span"></span>

                  <h3>{{ item.purchase_quantity * productPkgListDaysVMAuto}} Likes</h3>
                  <h4>{{ item.discount }}% OFF</h4>
                  <div class="auto-price">
                    <span>$</span>
                    <span>{{ item.price_decimal }}</span>
                    <s>${{ item.original_price_decimal }}</s>
                  </div>
                  <p>* {{ item.purchase_quantity }} likes/post</p>
                </li>
              </ul>
            </div>
            <div
              v-if="tabsIndex === 2"
              key="box2"
              class="buy-tabs_content-item like-day-main"
            >
              <div v-if="!productPkgListLoading" class="like-day">
                <div
                  v-for="(item, i) in productPkgListDays"
                  :key="i"
                  class="like-day_item"
                  :class="{ likeActive: productPkgListDaysVM === item }"
                  @click="likeClick(item)"
                >
                  <span></span>
                  <p>{{ item }}-Day</p>
                </div>
              </div>
              <!-- v-if="!productPkgListLoading" -->
              <div v-if="productPkgListLoading" style="width: 100%;height: 420px;display: flex;justify-content: center;align-items: flex-start">
                <img src="./img/loading-puff-black.svg" width="100" height="100" alt="">
              </div>
              <ul v-if="!productPkgListLoading">
                <li
                  v-for="(item, i) in productPkgListDaily"
                  :key="i"
                  :class="{ dayActive: productPkgListDailyVM === item }"
                  @click="dayClick(item)"
                >
                  <div class="buy-tabs_content-item_top">
                    <h2>
                      <span></span>
                    </h2>
                    <p>{{ item['purchase_quantity'] }}</p>
                    <span>Likes</span>
                    <div v-if="item['gives'][0].quantity !== 0" class="tags">
                      + {{ item['gives'][0].quantity }} Free
                    </div>
                  </div>
                  <div class="buy-tabs_content-item_bottom">
                    <div class="bottom_price">
                      <p>
                        ${{
                          (item.price_decimal / item.cycle_type).toFixed(2)
                        }}<span>/Day</span>
                      </p>
                    </div>
                    <div class="bottom_line">
                      <p></p>
                    </div>
                    <div class="bottom_text">
                      <div>
                        <img src="./img/selected-icon.svg" alt="" />
                        <p>Real Likes</p>
                      </div>
                      <div>
                        <img src="./img/selected-icon.svg" alt="" />
                        <p>Drop Protection</p>
                      </div>
                      <div>
                        <img src="./img/selected-icon.svg" alt="" />
                        <p>Instant Delivery</p>
                      </div>
                      <div>
                        <img src="./img/selected-icon.svg" alt="" />
                        <p>24/7 Support</p>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </transition>
        </div>
      </div>

      <div class="buy-box">
        <div v-if="tabsIndex === 0" class="box-text">
          <img src="./img/selecte-icon4.svg" alt="" width="16" height="16" />
          <div class="box-text_num">{{ productPkgCurrentLike.purchase_quantity }} Likes</div>
          <div class="box-text-price">${{ productPkgCurrentLike.price_decimal }}</div>
        </div>

        <div v-if="tabsIndex === 1" class="box-text">
          <img src="./img/selecte-icon4.svg" alt="" width="16" height="16" />
          <div class="box-text_num">
            <h3>{{ productPkgListDailyVMAuto.purchase_quantity * productPkgListDailyVMAuto.require_post_count}} Likes</h3>
            <p>For {{ productPkgListDailyVMAuto.require_post_count }} New Posts</p>
          </div>
          <div class="box-text-price">
            ${{
              (productPkgListDailyVMAuto.price_decimal ? productPkgListDailyVMAuto.price_decimal : 0).toFixed(2)
            }}
          </div>
        </div>

        <div v-if="tabsIndex === 2" class="box-text">
          <img src="./img/selecte-icon4.svg" alt="" width="16" height="16" />
          <div class="box-text_num">
            <h3>{{ productPkgListDailyVM.purchase_quantity }} Likes/Day</h3>
            <p>{{ productPkgListDailyVM.cycle_type }} - Day Plan</p>
          </div>
          <div class="box-text-price">
            ${{
              (productPkgListDailyVM.price_decimal / productPkgListDailyVM.cycle_type).toFixed(2)
            }}
          </div>
        </div>

        <div class="box-input">
          <label>
            <input
              v-model="searchInsInput"
              :disabled="searchInsLoading"
              type="text"
              placeholder="Enter Instagram username"
              :style="{
                borderColor: isBoxRed ? 'red!important' : '#E0E1E6!important',
              }"
              @input="changeInput"
              @blur="inputBlur"
              @focus="inputFocus"
            />
          </label>
          <div class="search_btn" @click="searchUsername">
            <button-yellow-icon
              text="OK"
              :sharp="true"
              font-size="size-16"
              :loading="searchInsLoading"
            />
          </div>
        </div>

        <transition name="fade-tabs" mode="out-in">
          <div v-if="insUser.ins_id" class="box-request">
            <div class="box-request_avator">
              <img :src="insUser.profile_pic_url || ''" alt="" />
            </div>
            <div class="box-request_info">
              <p>{{ insUser.ins_account }}</p>
              <ul>
                <li>
                  <h3>{{ insUser.post.post_count | numberAbbreviations }}</h3>
                  <p>{{ $t('global.instagramConcept.posts') }}</p>
                </li>
                <li>
                  <h3>{{ insUser.followed_by | numberAbbreviations }}</h3>
                  <p>{{ $t('global.instagramConcept.followers') }}</p>
                </li>
                <li>
                  <h3>{{ insUser.follow | numberAbbreviations }}</h3>
                  <p>{{ $t('global.instagramConcept.following') }}</p>
                </li>
              </ul>
            </div>
            <div class="box-request_list">
              <h3 id="title-post-like" :class="{ error: postListTitle }">
                {{ $t('store.buy.search.post.title.text') }}
                <i>{{ $t('store.buy.search.post.title.error') }}</i>
              </h3>
              <div v-if="postList.length !== 0" class="box-post_list">
                <div
                  v-for="(unit, i) in postList"
                  :key="i"
                  class="box-post_list-item"
                  :class="{ selected: postListIndex === i }"
                  @click="postListSwitch(unit, i)"
                >
                  <img :src="unit.like_pic_url" alt="post image" />
                  <div class="mark">
                    <i></i>
                    <p>
                      +{{
                        productPkgCurrentLike['purchase_quantity']
                          ? productPkgCurrentLike['purchase_quantity']
                          : 0
                      }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="post-more">
              <a
                v-if="postListInfo.has_next_page && !postListLoading"
                class="load-more"
                @click="postListNext"
              >{{ $t('store.buy.search.post.loadMore.text') }}>></a>
              <p v-if="postListLoading">
                <span></span>
                {{ $t('store.buy.search.post.loadMore.loading') }}
              </p>
            </div>
            <div class="post-btn" @click="tabBottomBtnAction">
              <button-yellow-icon
                :text="$t('store.buy.buyNow')"
                font-size="size-16"
                :loading="ajaxRequesting"
              />
            </div>
          </div>
        </transition>
      </div>



      <div class="new-module" v-if="tabsIndex === 1">
        <div class="new-module_text">
          <ul>
            <li>
              <img src="./img/autoLike-icon1.svg" width="56" alt="">
              Instant Detection</li>
            <li><img src="./img/autoLike-icon2.svg" width="56" alt="">
              No Password Required</li>
          </ul>
          <ul>
            <li>
              <img src="./img/autoLike-icon3.svg" width="56" alt="">
              100% Real Instagram Likes</li>
            <li>
              <img src="./img/autoLike-icon4.svg" width="56" alt="">
              24/7 Customer Support</li>
          </ul>
        </div>
      </div>



      <div class="likes-link">
        <!-- <router-link to="/buy-instagram-followers">Buy Instagram Followers >></router-link> -->
      </div>
    </div>
    <div id="store-shelf-1-buy" class="store-shelf-1-buy spring mobile">
      <!--main--><!--圣诞活动-->
      <div class="wrapper">
        <div class="section-store">
          <div class="tabs">
            <div
              class="unit"
              :class="{ on: tabsIndex === 0 }"
              @click="tabSwitch(0)"
            >
              Instant Likes
            </div>

            <div
              class="unit"
              :class="{ on: tabsIndex === 1 }"
              @click="tabSwitch(1)"
            >
              Auto Likes
            </div>



            <div
              class="unit"
              :class="{ on: tabsIndex === 2 }"
              @click="tabSwitch(2)"
            >
              Daily Likes
            </div>
          </div>

          <div class="tab-content">
            <div class="store-container">
              <!--pkg-container-->
              <transition name="fade-tabs" mode="out-in">
                <!--非周期Like任务-->
                <div v-if="tabsIndex === 0" key="box0" class="pkg-container">
                  <!-- <h2 id="title-pkg-follow" :class="{ 'error': productPkgListFollowTitle }">
                  <span>{{ $t('store.buy.title.text') }} <i>{{ $t('store.buy.title.error') }}</i></span>
                </h2> -->

                  <transition name="fade-skeleton" mode="out-in">
                    <div v-if="!productPkgListLoading">
                      <div class="pc">
                        <div
                          v-for="(pkg, i) in productPkgListLike"
                          :key="i"
                          :class="{
                            follow: pkg['product_type'] === 2,
                            like: pkg['product_type'] === 1,
                            selected: productPkgListLikeIndex === i,
                            hot: pkg['promote_sale_type'] === 3,
                          }"
                          class="package spring"
                          @click="pkgCheck(pkg, i)"
                        >
                          <!--num-->
                          <span class="num">
                            <i class="num-i"></i>
                            <i class="cross"></i>
                            <!-- <i class="hot-tag"></i> -->
                            <b>{{ pkg['purchase_quantity'] }}</b><span></span>
                          </span>

                          <!--gives mk 1-->
                          <span
                            v-if="pkg['gives'][0].quantity !== 0"
                            class="likes-mk-1"
                          >
                            <span>+ {{ pkg['gives'][0].quantity }}</span>
                          </span>

                          <!--price-->
                          <span v-if="pkg.payment_type === 1" class="coins">
                            <sup>{{ pkg.price | numToFixed }} coins</sup>
                            <sub>{{
                              pkg['original_price'] | numToFixed
                            }}
                              coins</sub>
                          </span>
                          <span v-if="pkg.payment_type === 2" class="coins">
                            <sup>{{ $t('global.currencySymbol') }}
                              {{ pkg.price_decimal | numToFixed }}</sup>
                            <!--<sub>-->
                            <!--  Total:-->
                            <!--  {{ $t('global.currencySymbol') }}{{ pkg['price_decimal'] | numToFixed }}-->
                            <!--</sub>-->
                          </span>
                        </div>
                      </div>
                      <div class="mobile">
                        <div
                          v-for="(pkg, i) in productPkgListLike"
                          :key="i"
                          :class="{
                            follow: pkg['product_type'] === 2,
                            like: pkg['product_type'] === 1,
                            selected: productPkgListLikeIndex === i,
                            hot: pkg['promote_sale_type'] === 3,
                          }"
                          class="package spring"
                          @click="pkgCheck(pkg, i)"
                        >
                          <div class="package_info">
                            <div class="select_icon"></div>
                            <!--num-->
                            <span class="num">
                              <i class="num-i"></i>
                              <!-- <i class="cross"></i> -->
                              <i class="spring-tis"></i>
                              <b>{{ pkg['purchase_quantity'] }}</b><span></span>
                              <!-- <i class="cross"></i> -->
                            </span>
                            <!--gives mk 1-->

                            <!-- <span v-if="pkg['gives'][0].quantity !== 0" class="likes-mk-1">
                            <span>+ {{ pkg['gives'][0].quantity }}</span>
                          </span> -->

                            <span
                              v-if="
                                pkg['gives'][0].quantity !== 0 &&
                                  pkg['promote_sale_type'] !== 3
                              "
                              class="likes-mk-1"
                            >
                              <span>
                                <i>+</i>
                                <i>{{ pkg['gives'][0].quantity }}</i>
                              </span>
                            </span>

                            <span
                              v-if="
                                pkg['gives'][0].quantity !== 0 &&
                                  pkg['promote_sale_type'] === 3
                              "
                              class="likes-mk-1"
                            >
                              <span>
                                <i>+</i>
                                <div>
                                  <p>FREE</p>
                                  <h4>{{ pkg['gives'][0].quantity }}</h4>
                                </div>
                              </span>
                            </span>
                          </div>

                          <!--price-->
                          <span v-if="pkg.payment_type === 1" class="coins">
                            <sup>{{ pkg.price | numToFixed }} coins</sup>
                            <sub>{{
                              pkg['original_price'] | numToFixed
                            }}
                              coins</sub>
                          </span>

                          <span v-if="pkg.payment_type === 2" class="coins">
                            <sup>{{ $t('global.currencySymbol') }}
                              {{ pkg.price_decimal | numToFixed }}</sup>
                            <!--<sub>-->
                            <!--  Total:-->
                            <!--  {{ $t('global.currencySymbol') }}{{ pkg['price_decimal'] | numToFixed }}-->
                            <!--</sub>-->
                          </span>

                          <div
                            v-if="pkg['promote_sale_type'] === 3"
                            class="best-icon"
                          ></div>
                        </div>
                      </div>
                    </div>
                    <div v-if="productPkgListLoading">
                      <div v-for="i in 4" :key="i" class="package skeleton">
                        <span class="num"><span class="s skeleton-bg"></span></span>
                        <span class="likes"><span class="s skeleton-bg"></span></span>
                        <span class="coins"><span class="s skeleton-bg"></span></span>
                      </div>
                    </div>
                  </transition>
                </div>

                <div v-if="tabsIndex === 1" key="box1" class="pkg-container auto-like-m">

              <p>This service will automatically deliver an equivalent number of likes to your upcoming new posts.</p>

              <div v-if="!productPkgListLoading">
                <label>
                    <select v-model="productPkgListDaysVMAuto" name="offer-daily" class="package changed">
                      <option v-for="(item, i) in productPkgListDaysAuto" :key="i" :value="item"
                      >For {{ item }} New Posts
                      </option>
                    </select>
                </label>
              </div>
              <!-- v-if="!productPkgListLoading" -->
              <div v-if="productPkgListLoading" style="width: 100%;height: 420px;display: flex;justify-content: center;align-items: flex-start">
                <img src="./img/loading-puff-black.svg" width="100" height="100" alt="">
              </div>
              <ul v-if="!productPkgListLoading">
                <li
                  v-for="(item, i) in productPkgListDailyAuto"
                  :key="i"
                  :class="{ dayActive: productPkgListDailyVMAuto === item, mostPopular: i=== 1  }"
                  @click="dayClick(item)"
                >
                  <span class="circle-span"></span>
                  <div class="auto-like-right">
                    <div class="auto-like-right_top">
                      <div>
                        <img src="./img/package__favorite.svg" alt="">
                        {{ item.purchase_quantity * productPkgListDaysVMAuto}}
                      </div>
                      <h4>{{ item.discount }}% OFF</h4>
                      <span>${{ item.price_decimal }}</span>
                    </div>
                    <div class="auto-like-right_bottom">
                      <p>* {{ item.purchase_quantity }} likes/post</p>
                      <s>${{ item.original_price_decimal }}</s>
                    </div>
                  </div>
                </li>
              </ul>
            </div>

                <!--周期Like任务-->
                <div v-if="tabsIndex === 2" key="box2" class="pkg-container">
                  <!--此处暂用like的标题-->
                  <h2
                    id="title-pkg-like"
                    :class="{ error: productPkgListLikeTitle }"
                  >
                    <span>{{ $t('store.buy.title.text') }}
                      <i>{{ $t('store.buy.title.error') }}</i></span>
                  </h2>

                  <transition name="fade-skeleton" mode="out-in">
                    <div v-if="!productPkgListLoading">
                      <label class="cycle days">
                        <select
                          v-model="productPkgListDaysVM"
                          name="offer-daily"
                          class="package changed"
                        >
                          <option
                            v-for="(item, i) in productPkgListDays"
                            :key="i"
                            :value="item"
                          >
                            {{ item }}-Day Subscription
                          </option>
                        </select>
                      </label>
                      <label class="cycle daily likeDaily">
                        <select
                          v-model="productPkgListDailyVM"
                          name="offer-daily"
                          class="package changed"
                        >
                          <option
                            v-for="(item, i) in productPkgListDaily"
                            :key="i"
                            :value="item"
                          >
                            {{ item['purchase_quantity'] }} Likes/Day (${{
                              (item.price_decimal / item.cycle_type).toFixed(2)
                            }})
                          </option>
                        </select>
                      </label>
                    </div>
                    <div v-if="productPkgListLoading">
                      <div v-for="i in 2" :key="i" class="package skeleton">
                        <span class="num"><span class="s skeleton-bg"></span></span>
                        <span class="likes"><span class="s skeleton-bg"></span></span>
                        <span class="coins"><span class="s skeleton-bg"></span></span>
                      </div>
                    </div>
                  </transition>
                </div>
              </transition>

              <!--search-container-->
              <div
                id="control-search_ins-container"
                class="control-search_ins-container"
              >
                <!-- <h2>{{ $t('store.buy.search.title') }}</h2> -->
                <h2 style="margin-bottom: 30px">Add an Instagram Account</h2>

                <div class="control-search_ins">
                  <label>
                    <input
                      v-model="searchInsInput"
                      :disabled="searchInsLoading"
                      type="text"
                      placeholder="Enter Instagram username"
                      :style="{
                        borderColor: isBoxRed
                          ? 'red!important'
                          : '#E0E1E6!important',
                      }"
                      @input="changeInput"
                      @blur="inputBlur"
                    />
                  </label>
                  <div class="search_btn" @click="searchUsername">
                    <button-yellow-icon
                      text="OK"
                      :sharp="true"
                      :loading="searchInsLoading"
                    />
                  </div>
                </div>

                <transition name="fade-tabs" mode="out-in">
                  <div v-if="insUser.ins_id" class="ins-info-container">
                    <img :src="insUser.profile_pic_url || ''" alt="" />
                    <h3>{{ insUser.ins_account }}</h3>
                    <p>
                      <span>
                        <b>{{
                          insUser.post.post_count | numberAbbreviations
                        }}</b>
                        {{ $t('global.instagramConcept.posts') }}
                      </span>
                      <span>
                        <b>{{ insUser.followed_by | numberAbbreviations }}</b>
                        {{ $t('global.instagramConcept.followers') }}
                      </span>
                      <span>
                        <b>{{ insUser.follow | numberAbbreviations }}</b>
                        {{ $t('global.instagramConcept.following') }}
                      </span>
                    </p>
                  </div>
                </transition>
              </div>
              <!--extra-post-container-->
              <transition-group name="fade-tabs" mode="out-in">
                <!--post-container-->
                <div v-if="insUser.ins_id" :key="1" class="post-container">
                  <h2 id="title-post-like" :class="{ error: postListTitle }">
                    <span>
                      {{ $t('store.buy.search.post.title.text') }}
                      <i>{{ $t('store.buy.search.post.title.error') }}</i>
                    </span>
                  </h2>
                  <div v-if="postList.length !== 0">
                    <div class="post-list">
                      <div class="post-list-wrapper">
                        <div
                          v-for="(unit, i) in postList"
                          :key="i"
                          :class="{ selected: postListIndex === i }"
                          class="img-container"
                          @click="postListSwitch(unit, i)"
                        >
                          <img :src="unit.like_pic_url" alt="post image" />
                          <div class="mark">
                            <i></i>
                            <p>
                              +{{
                                productPkgCurrentLike['purchase_quantity']
                                  ? productPkgCurrentLike['purchase_quantity']
                                  : 0
                              }}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <!--load more-->
                    <a
                      v-if="postListInfo.has_next_page && !postListLoading"
                      class="load-more"
                      @click="postListNext"
                    >{{ $t('store.buy.search.post.loadMore.text') }}>></a>

                    <!-- mobile buy -->
                    <!-- <div
                    class="mobile likesBuyBtn"
                    @click="tabBottomBtnAction"
                  >
                    <button-yellow-icon
                      :text="$t('store.buy.buyNow')"
                      :font-size="'size-16'"
                    />
                  </div> -->

                    <!--loading-->
                    <p v-if="postListLoading" class="load-more loading">
                      {{ $t('store.buy.search.post.loadMore.loading') }}
                    </p>
                  </div>
                  <div
                    v-if="!postListInfo.has_next_page"
                    class="post-blank"
                  ></div>

                  <div v-if="postList.length === 0">
                    <list-empty :msg="$t('store.buy.error.noPost.text')" />
                  </div>
                </div>
              </transition-group>

              <div class="new-module" v-if="tabsIndex === 1">
                <div class="new-module_text">
                  <ul>
                    <li>
                      <img src="./img/autoLike-icon1.svg" width="56" alt="">
                      Instant Detection</li>
                    <li><img src="./img/autoLike-icon2.svg" width="56" alt="">
                      No Password Required</li>
                    <li>
                      <img src="./img/autoLike-icon3.svg" width="56" alt="">
                      100% Real Instagram Likes</li>
                    <li>
                      <img src="./img/autoLike-icon4.svg" width="56" alt="">
                      24/7 Customer Support</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <!-- instant Likes -->
          <div class="btn-container pc" @click="tabBottomBtnAction">
            <button-yellow-icon
              :text="$t('store.buy.buyNow')"
              :icon="'cart'"
              :loading="ajaxRequesting"
            />
          </div>
        </div>

        <!--圣诞活动-->
        <!-- <div class="new-year__santa-claus" :class="{ hide: santaClausHide }"></div> -->
      </div>

      <!--buyNow Btn-->
      <div
        class="mobile likes-buy-btn"
        :class="{
          on: bottomBtnOn,
          'control-btn__bottom-buy': !independent,
          'btn-container mk0': independent,
        }"
        style="z-index: 5"
        @click="tabBottomBtnAction"
      >
        <button-yellow-icon
          :text="$t('store.buy.buyNow')"
          :font-size="'size-16'"
        />
      </div>

      <!--dialogs-->
      <transition name="fade">
        <div v-if="dialogFail" class="uni-dialog-box enter-box enter-mask">
          <div class="mask"></div>
          <div class="container">
            <i class="close" @click="closeDialog()"></i>
            <div class="content">
              <div class="model-box alert">
                <div class="title">
                  <i class="icon"></i>
                  <h3>Oops</h3>
                </div>
                <p class="note" v-html="dialogFailMsg"></p>
                <div class="btn" @click="closeDialog()">
                  <button-purple
                    text="Close"
                    :font-size="'size-16'"
                    :square="true"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="dialogAttention" class="uni-dialog-box enter-box enter-mask">
          <div class="mask"></div>
          <div class="container">
            <i class="close" @click="closeDialog()"></i>
            <div class="content">
              <div class="model-box attention">
                <div class="title">
                  <i class="icon"></i>
                  <h3>Wait</h3>
                </div>
                <p class="note" v-html="dialogAttentionMsg"></p>
                <div class="btn" @click="closeDialog()">
                  <button-purple
                    text="Close"
                    :font-size="'size-16'"
                    :square="true"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import api from '@/api/api.account.js';
import apiAccount from '@/api/api.account';
import apiIns from '@/api/api.ins';
import apiInsServer from '@/api/api.ins.server';
import apiPayment from '@/api/api.payment';
import apiTask from '@/api/api.task';
import ListEmpty from '@/components/list/list-empty';
import ButtonPurple from '@/components/button/button-purple';
import ButtonYellowIcon from '@/components/button/button-yellow-icon';

export default {
  name: 'StoreDailyLikesTab',
  components: {
    ButtonYellowIcon,
    ButtonPurple,
    ListEmpty
  },
  filters: {
    numToFixed(num) {
      if (typeof num === 'number') return num.toFixed(2);
      else return parseFloat(num).toFixed(2);
    },
    numberAbbreviations(num) {
      let numFormatted = 0;

      if (Math.pow(10, 12) <= num && num < Math.pow(10, 15)) {
        numFormatted = (num / Math.pow(10, 12)).toFixed(1) + 'T';
        return numFormatted;
      }
      if (Math.pow(10, 9) <= num && num < Math.pow(10, 12)) {
        numFormatted = (num / Math.pow(10, 9)).toFixed(1) + 'B';
        return numFormatted;
      }
      if (Math.pow(10, 6) <= num && num < Math.pow(10, 9)) {
        numFormatted = (num / Math.pow(10, 6)).toFixed(1) + 'M';
        return numFormatted;
      }
      if (Math.pow(10, 3) <= num && num < Math.pow(10, 6)) {
        numFormatted = (num / Math.pow(10, 3)).toFixed(1) + 'K';
        return numFormatted;
      }
      if (num < Math.pow(10, 3)) {
        numFormatted = num;
        return numFormatted;
      }
    }
  },
  props: {
    independent: {
      type: Boolean,
      default: false,
      required: false
    }
  },
  data() {
    return {
      // 圣诞
      santaClausHide: false,

      isBoxRed: false,

      isFocus: false,

      enterFirstTime: true,
      payMethodDisplay: 2,
      // 本字段控制页面显示何种支付方式的产品
      // 1 = 金币购买
      // 2 = 现金购买

      emittedData: {
        meta: {
          title: this.$t('store.meta.title-1')
        },
        route: {
          path: ''
        }
      },

      latest_post_time: 0,
      ajaxRequesting: false,
      bottomBtnOn: false,

      dialogFail: false,
      dialogFailMsg: '',
      dialogAttention: false,
      dialogAttentionMsg: '',

      tabsIndex: 0,
      searchStatus: false,

      searchInsLoading: false,
      searchInsInput: '',
      insUser: {},
      // postList 存储用户动态
      postList: [],
      postListIndex: -1,
      postCurrent: {},
      postListTitle: false,
      postListInfo: {
        post_count: 0,
        end_cursor: '',
        has_next_page: false,
        page_size: 12
      },
      postListLoading: false,

      productPkgListLoading: false,
      productPkgList: [],
      productPkgListFollowIndex: -1,
      productPkgCurrentFollow: {},
      productPkgListFollowTitle: false,
      productPkgListLikeIndex: -1,
      productPkgCurrentLike: {},
      productPkgListLikeTitle: false,
      pkgListWithUnit: [],
      productPkgListDaily: [],
      productPkgListDailyVM: [],
      productPkgListDays: [],
      productPkgListDaysVM: [],
      productPkgListDaysAuto: [],
      productPkgListDaysVMAuto: [],
      productPkgListDailyAuto: [],
      productPkgListDailyVMAuto: [],
    };
  },
  computed: {
    productPkgListDisplay: function () {
      const payMethodDisplay = this.payMethodDisplay;
      return this.productPkgList.filter(function (productPkg) {
        // promote_sale_type 展示种类
        return (
          productPkg['payment_type'] === payMethodDisplay &&
          (productPkg['promote_sale_type'] === undefined ||
            productPkg['promote_sale_type'] === 0 ||
            productPkg['promote_sale_type'] === 1 ||
            productPkg['promote_sale_type'] === 3)
        );
      });
    },
    productPkgListLike: function () {
      return this.productPkgListDisplay.filter(function (productPkg) {
        return (
          productPkg['product_type'] === 1 && productPkg['cycle_type'] === 1 && productPkg['require_post_count'] === 0
        );
      });
    },
    productPkgListFollow: function () {
      return this.productPkgListDisplay.filter(function (productPkg) {
        return productPkg['product_type'] === 2;
      });
    }
  },
  watch: {
    productPkgListDaysVM(val) {
      this.productPkgListDaily = this.pkgListWithUnit.filter(
        (item) => item.cycle_type === val
      );
      this.productPkgListDailyVM = this.productPkgListDaily[0];
    },
    productPkgListDaysVMAuto(val) {
      this.productPkgListDailyAuto = this.pkgListWithUnit.filter(
        (item) => item.require_post_count === val
      );
      this.productPkgListDailyVMAuto = this.productPkgListDailyAuto[1];
    },
    $route(to, from) {
      if (to.path === '/buy-instagram-likes') {
        this.tabsIndex = 0;
      } else if(to.path === '/buy-instagram-auto-likes') {
        this.tabsIndex = 1;
      } else if (to.path === '/buy-instagram-daily-likes') {
        this.tabsIndex = 2;
      }
    }
  },
  created() {
    this.initTabIndex();
    this.keyupSubmit();
  },
  mounted() {
    this.getPkgList();
    window.addEventListener('scroll', this.handle);
    this.$emit('changetabsIndex', this.tabsIndex);
  },
  destroyed() {
    window.removeEventListener('scroll', this.handle);
  },
  methods: {
    emitToParent() {
      this.$emit('emitToParent', this.emittedData);
    },
    closeDialog() {
      this.dialogFail = false;
      this.dialogAttention = false;
    },

    keyupSubmit() {
      if (process.server) return;
      document.onkeydown = (e) => {
        let _key = window.event.keyCode;
        if (_key === 13 && this.isFocus) {
          this.searchUsername();
        }
      };
    },

    likeClick(val) {
      this.productPkgListDaysVM = val;
    },
    dayClick(val) {
      if(this.tabsIndex === 1) {
        this.productPkgListDailyVMAuto = val;
      } else {
        this.productPkgListDailyVM = val;
      }
      
    },
    initTabIndex() {
      const path = this.$route.path;
      if (path === '/buy-instagram-likes') {
        this.tabsIndex = 0;
        this.emittedData.meta.title = this.$t('store.meta.title-1');
        this.emittedData.meta.description =
          this.$i18n.locale === 'en'
            ? this.$t('store.meta.description-1')
            : this.$t('store.meta.description');
      } else if(path == '/buy-instagram-auto-likes') {
        this.tabsIndex = 1;
        // 添加 TDK
      } else if (path === '/buy-instagram-daily-likes') {
        this.tabsIndex = 2;
        this.emittedData.meta.title = this.$t('store.meta.title-1');
        this.emittedData.meta.description =
          this.$i18n.locale === 'en'
            ? this.$t('store.meta.description-1')
            : this.$t('store.meta.description');
      } else if (path === '/buy-instagram-likes') {
        // this.tabsIndex = true;
        // this.emittedData.meta.title = this.$t('store.meta.title-1');
        // this.emittedData.meta.description
        //   = this.$i18n.locale === 'en'
        //   ? this.$t('store.meta.description-1')
        //   : this.$t('store.meta.description');
      } else if (path === '/event-followers') {
        // this.tabsIndex = false;
        // this.emittedData.meta.title = 'Get Unlimited Real Instagram Followers & Likes';
        // this.emittedData.meta.description = this.$t('store.meta.description-0');
      } else if (path === '/event-likes') {
        // this.tabsIndex = true;
        // this.emittedData.meta.title = 'Get Unlimited Real Instagram Followers & Likes';
        // this.emittedData.meta.description = this.$t('store.meta.description-1');
      }
    },
    tabSwitch(i) {
      this.tabsIndex = i;
      this.$emit('changetabsIndex', i);
      let originalPath = this.$route.path;
      let destPath = '';
      if (i === 0) {
        if (originalPath === '/event-followers') {
        } else if (originalPath === '/event-likes') {
        } else {
          destPath = '/buy-instagram-likes';
          this.emittedData.meta.title = this.$t('store.meta.title-1');
          this.emittedData.meta.description =
            this.$i18n.locale === 'en'
              ? this.$t('store.meta.description-1')
              : this.$t('store.meta.description');
        }
      } else if(i == 1) {
       if (originalPath === '/event-followers') {
        } else if (originalPath === '/event-likes') {
        } else {
          destPath = '/buy-instagram-auto-likes';
          // this.emittedData.meta.title = this.$t('store.meta.title-1');
          // this.emittedData.meta.description =
          //   this.$i18n.locale === 'en'
          //     ? this.$t('store.meta.description-1')
          //     : this.$t('store.meta.description');
        }
      } else if (i === 2) {
        if (originalPath === '/event-followers') {
        } else if (originalPath === '/event-likes') {
        } else {
          destPath = '/buy-instagram-daily-likes';
          this.emittedData.meta.title = this.$t('store.meta.title-1');
          this.emittedData.meta.description =
            this.$i18n.locale === 'en'
              ? this.$t('store.meta.description-1')
              : this.$t('store.meta.description');
        }
      }

      if (originalPath !== destPath) {
        this.emittedData.route.path = destPath;
        this.emitToParent();
      }
    },

    pkgCheck(pkg, i) {
      if (pkg['product_type'] === 1) {
        this.productPkgListLikeIndex = i;
        this.productPkgCurrentLike = pkg;
      } else if (pkg['product_type'] === 2) {
        this.productPkgListFollowIndex = i;
        this.productPkgCurrentFollow = pkg;
      }
      this.productPkgListFollowTitle = false;
      this.productPkgListLikeTitle = false;
      this.postListTitle = false;

      if (!this.enterFirstTime && !this.independent) this.anchorBottomBtn();
    },
    pkgSelectedInit(pkgList) {
      let pkgLikeFirstNum = 0,
        pkgFollowFirstNum = 0;
      for (let unit of pkgList) {
        if (unit['product_type'] === 1) {
          // like
          pkgLikeFirstNum = unit['purchase_quantity'];
          this.productPkgCurrentLike = unit;
        }
        if (unit['product_type'] === 2) {
          // follow
          pkgFollowFirstNum = unit['gives'][0]['quantity'];
          this.productPkgCurrentFollow = unit;
        }
        if (pkgLikeFirstNum !== 0 && pkgFollowFirstNum !== 0) {
          break;
        }
      }
    },

    getPkgList() {
      if (this.productPkgListLoading) return;

      this.productPkgListLoading = true;
      this.$nuxt.$axios
        .post(
          `${apiAccount.appConfig}?origin=web`,
          this.COMMON.paramSign({
            client_lan: this.$i18n.locale,
            cycle_product_enable: true,
            auto_like_enable: true
          })
        )
        .then((response) => {
          this.productPkgListLoading = false;
          if (response.data.product && response.data.product.list) {
            this.renderProductPkgList(response.data.product.list);
          } else {
            this.$alert(
              '',
              'error',
              'Oops',
              'Requesting Offer List failed, please try later.',
              '',
              'Close'
            );
          }

          setTimeout(() => {
            this.enterFirstTime = false;
          }, 1000);
        })
        .catch((error) => {
          this.productPkgListLoading = false;
          this.dialogFailMsg =
            '<samp>' +
            '<b>Error Status:</b> ' +
            error.status +
            '<br>' +
            '<b>Error Message:</b> ' +
            error.statusText +
            '</samp>';
          this.dialogFail = true;
          console.error('Catch Error: getPkgList', error);
        });
    },
    renderProductPkgList(pkgList) {
      this.productPkgList = pkgList;
      this.$storage.set('productPkgList', pkgList);

      this.$nextTick(() => {
        setTimeout(() => {
          this.renderPkgListHighlight();
        }, 500);
      });
      this.renderPkgListWithUnit(pkgList);
    },
    renderPkgListHighlight() {
      //  console.log('productPkgListFollow-new',this.productPkgListFollow)
      let indexFollow = 0;
      for (
        indexFollow = 0;
        indexFollow < this.productPkgListFollow.length;
        indexFollow++
      ) {
        if (this.productPkgListFollow[indexFollow]['promote_sale_type'] === 3)
          break;
      }
      let indexLike = 0;
      for (
        indexLike = 0;
        indexLike < this.productPkgListLike.length;
        indexLike++
      ) {
        if (this.productPkgListLike[indexLike]['promote_sale_type'] === 3)
          break;
      }

      if (indexFollow < this.productPkgListFollow.length) {
        this.pkgCheck(this.productPkgListFollow[indexFollow], indexFollow);
      }
      if (indexLike < this.productPkgListLike.length) {
        this.pkgCheck(this.productPkgListLike[indexLike], indexLike);
      }
    },
    // 生成周期循环offer独立数组
    renderPkgListWithUnit(pkgList) {
      console.log('pkgList', pkgList)
      // daily like 数据
      pkgList.map((item) => {
        if ((item['cycle_type'] > 1 && item.product_type === 1) || item.require_post_count !== 0) {
          item.dailyQuantity = item['purchase_quantity'];
          this.pkgListWithUnit.push(item);
        }
      });
      this.renderPkgListDays();
    },
    // 生成Daily Select数组（Offer选择）（未使用）
    renderPkgListDaily() {
      const res = new Map();
      this.productPkgListDaily = this.pkgListWithUnit.filter(
        (a) => !res.has(a.dailyQuantity) && res.set(a.dailyQuantity, 1)
      );
      this.productPkgListDailyVM = this.productPkgListDaily[0];
    },
    // 生成Days Select数组（周期选择）
    renderPkgListDays() {
      let autoList = this.pkgListWithUnit.filter(function(item, index) {
          return item.require_post_count != 0;
      });
      let DailyList = this.pkgListWithUnit.filter(function(item, index) {
          return item.require_post_count == 0;
      });

      this.productPkgListDays = [
        ...new Set(DailyList.map((item) => item.cycle_type))
      ];
      this.productPkgListDaysVM = this.productPkgListDays[0];

      this.productPkgListDaysAuto = [
        ...new Set(autoList.map((item) => item.require_post_count))
      ];
      this.productPkgListDaysVMAuto = this.productPkgListDaysAuto[0];
    },

    inputBlur() {
      this.isBoxRed = false;
      this.isFocus = false;
    },
    inputFocus() {
      this.isFocus = true;
    },
    searchUsername: function () {
      this.searchInsByServerV2();
      this.gaSearchBtn();
    },
    changeInput() {
      this.insUser = {};
      if (this.searchInsInput !== '') {
        this.isBoxRed = false;
      } else {
        this.isBoxRed = true;
      }
    },
    searchInsByServerV2() {
      if (this.searchInsInput === '') {
        this.isBoxRed = true;
        // this.$alert(
        //   "",
        //   "warn",
        //   this.$t("store.buy.error.noInsID.title"),
        //   this.$t("store.buy.error.noInsID.text"),
        //   "normal",
        //   this.$t("global.modelBox.btn.close")
        // );
        return;
      }

      this.isBoxRed = false;

      if (this.searchInsLoading) return;

      this.searchInsLoading = true;
      this.$nuxt.$axios
        .post(
          apiInsServer.getAccountByUsername,
          this.COMMON.paramSign({ ins_account: this.searchInsInput })
        )
        .then((response) => {
          this.searchInsLoading = false;
          this.searchStatus = true;

          if (response.data.status !== 'ok') {
            this.$alert(
              '',
              'error',
              this.$t('global.modelBox.title.oops'),
              this.$t('store.buy.error.errorInsID.text'),
              'normal',
              this.$t('global.modelBox.btn.close')
            );
            return;
          }

          const _sharedDataUser = response.data.content['graphql']['user'];
          const _sharedDataUserPosts =
            _sharedDataUser['edge_owner_to_timeline_media'];

          this.insUser.ins_id = _sharedDataUser.id;
          this.insUser.ins_account = _sharedDataUser.username;
          this.insUser.profile_pic_url = _sharedDataUser.profile_pic_url;
          this.insUser.followed_by =
            _sharedDataUser['edge_followed_by']['count'];
          this.insUser.follow = _sharedDataUser['edge_follow']['count'];
          this.insUser.post = this.insPostTransform(_sharedDataUserPosts);
          this.latest_post_time = _sharedDataUserPosts['edges'][0]['node']['taken_at_timestamp'];

          this.postList = this.insUser.post.post_list;
          this.postListInfo.post_count = this.insUser.post.post_count;
          this.postListInfo.end_cursor = this.insUser.post.end_cursor;
          this.postListInfo.has_next_page =
            this.insUser.post.post_count > this.postListInfo.page_size;

          this.$nextTick(() => {
            // 弹出底部购买 btn
            this.anchorBottomBtn();
          });
        })
        .catch((error) => {
          this.closeDialog();
          this.searchInsLoading = false;
          this.$alert(
            '',
            'error',
            this.$t('global.modelBox.title.oops'),
            this.$t('store.buy.error.errorRequest.text'),
            'normal',
            this.$t('global.modelBox.btn.close')
          );
          console.error('Catch Error: searchIns: ', error);
        });
    },
    searchInsByServer() {
      if (this.searchInsInput === '') {
        this.$alert(
          '',
          'warn',
          this.$t('store.buy.error.noInsID.title'),
          this.$t('store.buy.error.noInsID.text'),
          'normal',
          this.$t('global.modelBox.btn.close')
        );
        return;
      }
      if (!this.searchInsLoading) {
        this.searchInsLoading = true;
        this.$nuxt.$axios
          .post(
            apiAccount.getInsInfo,
            this.COMMON.paramSign({
              ins_account: this.searchInsInput
            })
          )
          .then((response) => {
            this.searchInsLoading = false;
            if (response.data.status === 'ok') {
              this.userStatus.search = true;
              this.insUser = response.data['ins_info'];
              this.postList = response.data['ins_info'].post['post_list'];

              this.postListInfo.post_count =
                response.data['ins_info'].post.post_count;
              this.postListInfo.end_cursor =
                response.data['ins_info'].post.end_cursor;
              this.postListInfo.has_next_page =
                response.data['ins_info'].post.post_count >
                this.postListInfo.page_size;
              setTimeout(() => {
                if (!this.independent)
                  this.$scrollTo('#search-result', { offset: -100 });
              }, 500);
            } else {
              this.dialogFailMsg = 'Please enter valid username.';
              this.dialogFail = true;
            }
          })
          .catch((error) => {
            this.searchInsLoading = false;
            this.dialogFailMsg =
              '<samp>' +
              '<b>Error Status:</b> ' +
              error.status +
              '<br>' +
              '<b>Error Message:</b> ' +
              error.statusText +
              '</samp>';
            this.dialogFail = true;
            console.log('Catch Error: searchIns');
            console.log(error);
          });
      }
    },
    insPostTransform(_sharedDataUserPosts) {
      let post = {};
      post.post_count = _sharedDataUserPosts.count;
      post.end_cursor = _sharedDataUserPosts['page_info']['end_cursor'];

      const insPostList = _sharedDataUserPosts['edges'];
      let postList = [];

      for (let i = 0; i < insPostList.length; i++) {
        let postObj = {};
        let insPostObj = insPostList[i]['node'];

        postObj.like_id = insPostObj.id;
        postObj.short_code = insPostObj['shortcode'];
        postObj.like_pic_url = insPostObj['thumbnail_src'];
        postObj.like_count = insPostObj['edge_liked_by']['count'];

        postList.push(postObj);
      }

      post.post_list = postList;

      return post;
    },

    postListSwitch(unit, i) {
      this.postListIndex = i;
      this.postCurrent = unit;
      this.postListTitle = false;

      this.anchorBottomBtn();
    },
    postListNext() {
      let param = {
        ins_id: this.insUser.ins_id,
        page_size: this.postListInfo.page_size,
        end_cursor: this.postListInfo.end_cursor
      };
      // this.postListNextRequestV2(param);
      this.postListNextRequest(param);
    },
    postListNextRequest(param) {
      if (!this.postListLoading) {
        this.postListLoading = true;

        this.$nuxt.$axios
          .post(api.getInsPost, this.COMMON.paramSign(param))
          .then((response) => {
            this.postListLoading = false;
            if (response.data.status === 'ok') {
              this.postList = [
                ...this.postList,
                ...response.data.data.post['post_list']
              ];
              this.renderPostListInfo(
                response.data.data.post['post_count'],
                response.data.data.post['page_info']['end_cursor'],
                response.data.data.post['page_info']['has_next_page']
              );
            } else {
              this.dialogFailMsg =
                '<samp>' +
                '<b>Error Type:</b> ' +
                response.data.error.type +
                '<br>' +
                '<b>Error Message:</b> ' +
                response.data.error.message +
                '</samp>';
              this.dialogFail = true;
            }
          })
          .catch((error) => {
            this.ajaxRequesting = false;
            this.dialogFailMsg =
              '<samp>' +
              '<b>Error Status:</b> ' +
              error.status +
              '<br>' +
              '<b>Error Message:</b> ' +
              error.statusText +
              '</samp>';
            this.dialogFail = true;
            console.log('Catch Error: postListNextRequest');
            console.log(error);
          });
      }
    },
    postListNextRequestV2(param) {
      if (!this.postListLoading) {
        this.postListLoading = true;

        const paramTrans = JSON.stringify(param);

        this.$nuxt.$axios
          .get(`${apiIns.insPostList}${paramTrans}`)
          .then((response) => {
            this.postListLoading = false;

            // console.log(response.data.data.user['edge_owner_to_timeline_media']['edges']);
            const insPostObj =
              response.data.data.user['edge_owner_to_timeline_media'];

            for (let i = 0; i < insPostObj["edges"].length; i++) {
              let insPostObjTransUnit = {};
              insPostObjTransUnit.like_id =
                insPostObj['edges'][i]['node']['id'];
              insPostObjTransUnit.like_pic_url =
                insPostObj['edges'][i]['node']['thumbnail_src'];
              insPostObjTransUnit.like_count =
                insPostObj['edges'][i]['node']['edge_media_preview_like'][
                  'count'
                  ];
              insPostObjTransUnit.short_code =
                insPostObj['edges'][i]['node']['shortcode'];

              this.postList.push(insPostObjTransUnit);
            }

            this.renderPostListInfo(
              insPostObj.count,
              insPostObj['page_info']['end_cursor'],
              insPostObj['page_info']['has_next_page']
            );
          })
          .catch((error) => {
            this.postListLoading = false;

            this.$alert(
              '',
              'error',
              this.$t('global.modelBox.title.oops'),
              this.$t('store.buy.error.errorRequest.text'),
              'normal',
              this.$t('global.modelBox.btn.close')
            );
            console.error('Catch Error: postListNextRequestV2: ', error);
          });
      }
    },
    renderPostListInfo(post_count, end_cursor, has_next_page) {
      let obj = {};
      obj.post_count = post_count;
      obj.end_cursor = end_cursor;
      obj.has_next_page = has_next_page;
      obj.page_size = this.postListInfo.page_size;

      this.postListInfo = obj;
    },

    // Bottom 按钮动作
    tabBottomBtnAction() {
      if (this.productPkgListLoading) return;
      if (this.tabsIndex === 0) {
        if (this.productPkgListFollowIndex === -1) {
          this.productPkgListFollowTitle = true;
          if (!this.independent)
            this.$scrollTo('#title-pkg-follow', { offset: -200 });
          return;
        }
      }

      if (!this.tabBottomBtnPreCheck()) {
        return;
      }
      if (!this.postCurrent.like_id) {
        this.postListTitle = true;
        if (!this.independent) {
          if(this.COMMON.isMobile()) {
            this.$scrollTo('#title-post-like', { offset: 700 });
          } else {
            this.$scrollTo('#title-post-like', { offset: -100 });
          }
        }
        return;
      }
      this.addToCart();
    },
    tabBottomBtnPreCheck() {
      // console.log("进入tabBottomBtnPreCheck",this.insUser)
      if (!this.insUser.ins_account) {
        this.$alert(
          '',
          'warn',
          this.$t('store.buy.error.noInsID.title'),
          this.$t('store.buy.error.noInsID.text'),
          'normal',
          this.$t('global.modelBox.btn.close')
        )
          .then(() => {
            if (this.$i18n.locale !== 'en') {
              let gaPage = '',
                gaPlatform = '';
              if (this.$route.path === '/') {
                //home
                gaPage = 'hp';
              } else if (
                this.$route.path === '/buy-instagram-followers' ||
                this.$route.path === '/buy-instagram-likes'
              ) {
                //store
                gaPage = 'store';
              }

              if (this.COMMON.isiOS()) gaPlatform = 'ios';
              if (this.COMMON.isAndroid()) gaPlatform = 'adr';

              this.$ga.event(
                'buttonclick',
                'click',
                `${gaPage}${gaPlatform}popclose-${this.$i18n.locale}`
              );
            }
          })
          .catch(() => {
          });
        if (!this.independent)
          this.$scrollTo('#control-search_ins-container', { offset: -44 });
        return false;
      } else {
        return true;
      }
    },
    bottomBtnDetective() {
      // if (this.tabsIndex === 0) {
      //   this.bottomBtnOn =
      //     this.productPkgListFollowIndex !== -1 && this.insUser.ins_id;
      // } else if (this.tabsIndex === 2) {
      //   this.bottomBtnOn = this.insUser.ins_id;
      // }
      // console.log(this.insUser.ins_id !== undefined);
      this.bottomBtnOn = this.insUser.ins_id;
    },
    anchorBottomBtn() {
      if (!this.COMMON.isMobile()) return;
      
      if(this.tabsIndex === 0) {
        if (!this.insUser.ins_id) {
          setTimeout(() => {
            if (!this.independent)
              this.$scrollTo(`#control-search_ins-container`, { offset: -44 });
          }, 500);
        }
      } else if(this.tabsIndex === 1) {
        
      } else if(this.tabsIndex === 2) {
        // if (this.productPkgListLikeIndex !== -1 && this.insUser.ins_id) {
        //   if (!this.independent)
        //     this.$scrollTo(`#title-post-like`, { offset: -60 });
        // }
      }

      // if (!this.tabsIndex) {
      //   if (this.productPkgListFollowIndex !== -1 && this.insUser.ins_id) {
      //   }
      //   if (this.productPkgListFollowIndex !== -1 && !this.insUser.ins_id) {
      //     setTimeout(() => {
      //       if (!this.independent)
      //         this.$scrollTo(`#control-search_ins-container`, { offset: -44 });
      //     }, 500);
      //   }
      // } else if (this.tabsIndex) {
      //   if (this.productPkgListLikeIndex !== -1 && !this.insUser.ins_id) {
      //     if (!this.independent)
      //       this.$scrollTo(`#control-search_ins-container`, { offset: -44 });
      //   }
      //   if (this.productPkgListLikeIndex !== -1 && this.insUser.ins_id) {
      //     if (!this.independent)
      //       this.$scrollTo(`#title-post-like`, { offset: -60 });
      //   }
      // }


      this.bottomBtnDetective();
    },

    addToCart() {
      let param = {
        ins_id: this.insUser.ins_id,
        ins_account: this.insUser.ins_account
      };
      const post = this.postCurrent;

      // 关注
      if (this.tabsIndex === 0) {
        var quantityNum = this.productPkgCurrentLike.purchase_quantity;
        // ga
        if (this.$store.state.s2) {
          switch (quantityNum) {
            case 100:
              this.$ga.event('insbuy', 'likebuy', 'st100');
              break;
            case 250:
              this.$ga.event('insbuy', 'likebuy', 'st250');
              break;
            case 500:
              this.$ga.event('insbuy', 'likebuy', 'st500');
              break;
            case 1000:
              this.$ga.event('insbuy', 'likebuy', 'st1000');
              break;
          }
        }

        param.task_type = 1;
        param.product_id = this.productPkgCurrentLike.product_id;
        param.purchase_quantity = quantityNum;
        param.price_decimal = this.productPkgCurrentLike.price_decimal || 8.8;

        param.product_type = this.productPkgCurrentLike.product_type;
        param.cycle_type = this.productPkgCurrentLike.cycle_type;

        param.like_id = post.like_id;
        param.like_pic_url = post.like_pic_url;
        param.short_code = post.short_code;

        param.like_count = this.productPkgCurrentLike['purchase_quantity'];
        param.gives = this.productPkgCurrentLike['gives'];

        param.follow_pic_url = this.insUser.profile_pic_url;
        param.post_count = this.insUser.post.post_count;
        param.follower_count = this.insUser.followed_by;
        param.following_count = this.insUser.follow;
        this.gaBottomBtn();
      }
      if(this.tabsIndex === 1) {

        let autoLikeNum = this.productPkgListDailyVMAuto.require_post_count + '*' + this.productPkgListDailyVMAuto['purchase_quantity'];

        if (this.$store.state.s2) {
          switch (autoLikeNum) {
            case '20*50':
              this.$ga.event('insbuy', 'autolbuy', 'st20*50');
              break;
            case '30*50':
              this.$ga.event('insbuy', 'autolbuy', 'st30*50');
              break;
            case '50*50':
              this.$ga.event('insbuy', 'autolbuy', 'st50*50');
              break;
            case '20*100':
              this.$ga.event('insbuy', 'autolbuy', 'st20*100');
              break;
            case '30*100':
              this.$ga.event('insbuy', 'autolbuy', 'st30*100');
              break;
            case '50*100':
              this.$ga.event('insbuy', 'autolbuy', 'st50*100');
              break;
            case '20*250':
              this.$ga.event('insbuy', 'autolbuy', 'st20*250');
              break;
            case '30*250':
              this.$ga.event('insbuy', 'autolbuy', 'st30*250');
              break;
            case '50*250':
              this.$ga.event('insbuy', 'autolbuy', 'st50*250');
              break;
          }
        }

      
        param.task_type = 1;
        param.product_id = this.productPkgListDailyVMAuto.product_id;
        param.like_id = post.like_id;
        param.like_pic_url = post.like_pic_url;
        param.short_code = post.short_code;
        param.like_count = this.productPkgListDailyVMAuto['purchase_quantity'];
        param.follow_pic_url = this.insUser.profile_pic_url;
        param.post_count = this.insUser.post.post_count;
        param.follower_count = this.insUser.followed_by;
        param.following_count = this.insUser.follow;
        param.purchase_quantity = this.productPkgListDailyVMAuto.purchase_quantity;
        param.price_decimal = this.productPkgListDailyVMAuto.price_decimal;
        param.product_type = this.productPkgListDailyVMAuto.product_type;
        param.cycle_type = this.productPkgListDailyVMAuto.cycle_type;
        param.like_count = this.productPkgListDailyVMAuto['purchase_quantity'];
        param.gives = this.productPkgListDailyVMAuto['gives'];
        param.require_post_count = this.productPkgListDailyVMAuto.require_post_count;
        param.latest_post_time = this.latest_post_time;
      }

      // 周期关注
      if (this.tabsIndex === 2) {
        // console.log("周期like",this.insUser)
        var likeDailyNum =
          this.productPkgListDailyVM.cycle_type +
          '*' +
          this.productPkgListDailyVM.dailyQuantity;
        if (this.$store.state.s2) {
          switch (likeDailyNum) {
            case '30*30':
              this.$ga.event('insbuy', 'dailylbuy', 'st3*30');
              break;
            case '30*50':
              this.$ga.event('insbuy', 'dailylbuy', 'st3*50');
              break;
            case '30*100':
              this.$ga.event('insbuy', 'dailylbuy', 'st3*100');
              break;

            case '60*30':
              this.$ga.event('insbuy', 'dailylbuy', 'st6*30');
              break;
            case '60*50':
              this.$ga.event('insbuy', 'dailylbuy', 'st6*50');
              break;
            case '60*100':
              this.$ga.event('insbuy', 'dailylbuy', 'st6*100');
              break;
            case '90*30':
              this.$ga.event('insbuy', 'dailylbuy', 'st9*30');
              break;
            case '90*50':
              this.$ga.event('insbuy', 'dailylbuy', 'st9*50');
              break;
            case '90*100':
              this.$ga.event('insbuy', 'dailylbuy', 'st9*100');
              break;
          }
        }

        param.task_type = 1;
        param.product_id = this.productPkgListDailyVM.product_id;
        param.purchase_quantity = this.productPkgListDailyVM.purchase_quantity;
        param.price_decimal = this.productPkgListDailyVM.price_decimal || 0;
        param.gives = this.productPkgListDailyVM['gives'];

        param.product_type = this.productPkgListDailyVM.product_type;
        param.cycle_type = this.productPkgListDailyVM.cycle_type;

        param.like_count = this.productPkgCurrentLike['purchase_quantity'];

        param.like_id = post.like_id;
        param.like_pic_url = post.like_pic_url;
        param.short_code = post.short_code;

        param.follow_pic_url = this.insUser.profile_pic_url;
        param.post_count = this.insUser.post.post_count;
        param.follower_count = this.insUser.followed_by;
        param.following_count = this.insUser.follow;

        this.gaBottomBtn();
      }

      // 广告参数
      let adStore = { s: '', c: '', k: '' };
      adStore.s = this.$route.query.s || '';
      adStore.c = this.$route.query.c || '';
      adStore.k = this.$route.query.k || '';
      this.$storage.set('adStore', adStore);

      this.transportCartUnitData(param);
    },
    transportCartUnitData(param) {
      this.$storage.set('cartUnit', param);

      const query = this.COMMON.envTest() ? { env_test: '1' } : {};
      this.$router.push({ path: '/checkout', query: query });
    },
    // 获取白名单（功能已变更为获取该地区支持的支付方式）
    initGeoIPWhiteList(param) {
      // console.log(param);
      // response.data['checkout_method']
      // 1 跳转 Stripe
      // 2 跳转 HotAntPay
      this.ajaxRequesting = true;
      this.$nuxt.$axios
        .post(
          apiPayment.getCheckoutMethod,
          this.COMMON.paramSign({
            client_lan: this.$i18n.locale
          })
        )
        .then((response) => {
          if (response.data.status === 'ok') {
            if (response.data['checkout_method'] === 1) {
              this.shopifyPay();
            } else {
              this.transportCartUnitData(param);
            }
          } else {
            this.ajaxRequesting = false;
            this.$alert(
              '',
              'error',
              'Sorry',
              'Something wrong with check payment method, please try later.',
              'normal',
              'Close'
            );
          }
        })
        .catch((error) => {
          this.ajaxRequesting = false;
          this.$alert(
            '',
            'error',
            'Sorry',
            'Something wrong with check payment method, please try later.',
            'normal',
            'Close'
          );
          console.log('initGeoIPWhiteList Error:', error);
          console.log(error);
        });
    },

    // Shopify 跳转支付
    // 注意task结构体中的insInfo对象名（与User页面不同）
    shopifyPay() {
      let param = {
        token: this.$storage.get('token'),
        locale: navigator.language,
        tasks: {
          ins_id: this.insUser.ins_id,
          ins_account: this.insUser.ins_account
        },
        ads: {
          s: this.$route.query.s || '',
          c: this.$route.query.c || '',
          k: this.$route.query.k || ''
        }
      };

      if (this.tabsIndex === 0) {
        // 关注
        param.tasks.product_id = this.productPkgCurrentFollow.product_id;
        param.tasks.task_type = 2;

        // param.gives = this.productPkgCurrentFollow['gives'];
        param.tasks.follow_pic_url = this.insUser.profile_pic_url;
        param.tasks.post_count = this.insUser.post.post_count;
        param.tasks.follower_count = this.insUser.followed_by;
        param.tasks.following_count = this.insUser.follow;

        if (this.postList.length > 1) {
          param.tasks.like_id = this.postList[0].like_id;
          param.tasks.like_pic_url = this.postList[0].like_pic_url;
          param.tasks.like_count = this.postList[0].like_count;
          param.tasks.short_code = this.postList[0].short_code;
        }
      }

      if (this.tabsIndex === 2) {
        // 点赞
        const post = this.postCurrent;

        param.tasks.product_id = this.productPkgCurrentLike.product_id;
        param.tasks.task_type = 1;
        param.tasks.like_id = post.like_id;
        param.tasks.like_pic_url = post.like_pic_url;
        param.tasks.short_code = post.short_code;
        param.tasks.like_count = this.productPkgCurrentLike[
          'purchase_quantity'
          ];
      }

      this.shopifyPayRequest(param);
    },
    shopifyPayRequest(param) {
      // if (!this.ajaxRequesting) {
      //   this.ajaxRequesting = true;
      //   console.log(param);
      this.$nuxt.$axios
        .post(apiTask.shopifyPay, this.COMMON.paramSign(param))
        .then((response) => {
          this.ajaxRequesting = false;
          // console.log(response);
          if (response.data.status === 'ok') {
            console.log(response.data.status);
            window.location.href = response.data['payment_url'];
          } else if (response.data.error !== undefined) {
            if (response.data.error.type === 'bad_token') {
              const msg = 'Login expired, redirecting to login page.';
              this.redirectToLogin(msg);
            } else if (response.data.error.type === 'bad_ins_account') {
              this.dialogFailMsg =
                'This Instagram account does not been added yet.';
              this.dialogFail = true;
            } else if (response.data.error.type === 'money_deficit') {
              this.coinsLackNumCal();
            } else if (response.data.error.type === 'product_expired') {
              this.dialogFailMsg =
                'This task cannot be published at this time.';
              this.dialogFail = true;
            } else if (response.data.error.type === 'product_locale') {
              this.dialogFailMsg =
                'Sorry. This package is not currently available in your country or region.';
              this.dialogFail = true;
            } else {
              this.dialogFailMsg =
                '<samp>' +
                '<b>Error Type:</b> ' +
                response.data.error.type +
                '<br>' +
                '<b>Error Message:</b> ' +
                response.data.error.message +
                '</samp>';
              this.dialogFail = true;
            }
          } else {
            this.dialogFailMsg = JSON.stringify(response.data);
            this.dialogFail = true;
          }
        })
        .catch((error) => {
          this.ajaxRequesting = false;
          this.dialogFailMsg =
            '<samp>' +
            '<b>Error Status:</b> ' +
            error.status +
            '<br>' +
            '<b>Error Message:</b> ' +
            error.statusText +
            '</samp>';
          this.dialogFail = true;
          console.log('Catch Error: shopifyPayRequest', error);
        });
      // }
    },

    // 使用安卓版接口（2-6）发起，
    // 可用于发起Stripe支付
    sendCheckoutInfo(param) {
      let paramCheckout = {};
      paramCheckout.tasks = [];
      paramCheckout.tasks.push(param);

      paramCheckout.token = this.$storage.get('token');
      paramCheckout.lan = '';
      paramCheckout.show_header = 1;
      paramCheckout.origin = 'web';
      paramCheckout.locale = navigator.language;

      // Google 广告参数
      let s = this.COMMON.getURLQuery('s');
      s = this.COMMON.getURLQuery('source');
      let c = this.COMMON.getURLQuery('c');
      c = this.COMMON.getURLQuery('camp');
      let k = this.COMMON.getURLQuery('k');

      if (s !== null) paramCheckout.ads = { s: s };
      if (c !== null) paramCheckout.ads = { c: c };
      if (k !== null) paramCheckout.ads = { k: k };

      this.$nuxt.$axios
        .post(apiTask.checkoutAndroid, this.COMMON.paramSign(paramCheckout))
        .then((response) => {
          this.ajaxRequesting = false;
          if (response.data.status === 'ok') {
            const query = this.COMMON.envTest() ? '&env_test=1' : '';
            window.location.href = `${response.data['checkout_url']}${query}`;
          } else {
            this.$alert(
              '',
              'error',
              'Sorry',
              'Something wrong with send checkout info, please try later.',
              'normal',
              'Close'
            );
          }
        })
        .catch((error) => {
          this.ajaxRequesting = false;
          this.$alert(
            '',
            'error',
            'Sorry',
            'Something wrong with send checkout info, please try later.',
            'normal',
            'Close'
          );
          console.log('sendCheckoutInfo Error:', error);
        });
    },

    gaSearchBtn() {
      let param = this.tabsIndex === 0 ? 'f' : 'l';
      let paramEvent0 = '';
      if (
        this.$route.path === '/event-followers' ||
        this.$route.path === '/event-likes'
      ) {
        paramEvent0 = '-ad';
      }
      if (this.tabsIndex === 2) paramEvent0 = '-daily';

      let gaPlatform = '';
      if (this.$i18n.locale !== 'en') {
        if (this.COMMON.isiOS()) gaPlatform = 'ios';
        if (this.COMMON.isAndroid()) gaPlatform = 'adr';
      }

      let gaMultiLang =
        this.$i18n.locale !== 'en' ? `-${this.$i18n.locale}` : '';

      let pageParam = '';
      if (this.$route.path === '/') {
        pageParam = 'hp';
      } else if (
        this.$route.path === '/buy-instagram-followers' ||
        this.$route.path === '/buy-instagram-likes'
      ) {
        pageParam = 'store';
      }
      // this.$ga.event(
      //   'buttonclick',
      //   'click',
      //   `store-daily-likes`
      // );

      if (this.$store.state.s2) {
        if (this.tabsIndex === 0) {
          this.$ga.event('buttonclick', 'click', 'likebuy');
        } else if(this.tabsIndex === 1)  {
          this.$ga.event('buttonclick', 'click', 'autolbuy');
        } else if(this.tabsIndex === 2) {
          this.$ga.event('buttonclick', 'click', 'dailylbuy');
        }
      } else {
        if (this.tabsIndex === 0) {
          // instant likes ok
          this.$ga.event('buttonclick', 'click', `storeaddl`);
        } else if(this.tabsIndex === 2) {
          // Daily likes ok
          this.$ga.event('buttonclick', 'click', `store-daily-likes`);
        }
      }

      // this.$ga.event(
      //   'buttonclick',
      //   'click',
      //   `storeaddl`
      // );
    },
    gaBottomBtn() {
      //  this.$ga.event('insbuy', 'buy', 'store-daily-likes');
      // this.$ga.event('insbuy', 'buy', 'storebuyl')

      if (this.tabsIndex === 0) {
        if (!this.$store.state.s2) {
          this.$ga.event('insbuy', 'buy', 'storebuyl');
        }
      } else if(this.tabsIndex === 2) {
        if (!this.$store.state.s2) {
          this.$ga.event('insbuy', 'buy', 'store-daily-likes');
        }
      }

      // let param = 'f';
      // let paramEvent0 = '';
      // if (this.$route.path === '/event-followers' || this.$route.path === '/event-likes') {
      //   paramEvent0 = '-ad';
      // }
      // if (this.tabsIndex) paramEvent0 = '-daily';

      // let gaPlatform = '';
      // if (this.$i18n.locale !== 'en') {
      //   if (this.COMMON.isiOS()) gaPlatform = 'ios';
      //   if (this.COMMON.isAndroid()) gaPlatform = 'adr';
      // }

      // let gaMultiLang = this.$i18n.locale !== 'en' ? `-${this.$i18n.locale}` : '';

      // let pageParam = '';
      // if (this.$route.path === '/') {
      //   pageParam = 'hp';
      // } else if (
      //   this.$route.path === '/buy-instagram-followers'
      //   || this.$route.path === '/buy-instagram-likes'
      // ) {
      //   pageParam = 'store';
      // }

      // if (this.$route.path === '/event-get') {
      //   this.$ga.event('insbuy', 'buy', 'paidlp-3');
      // } else {
      //   this.$ga.event(
      //     'insbuy',
      //     'buy',
      //     `${pageParam}${gaPlatform}buy${param}${paramEvent0}${gaMultiLang}`
      //   );
      // }
    },
    // 圣诞
    handleScroll: function () {
      this.santaClausHide =
        document.querySelector('.footer-text').getBoundingClientRect().top <
        window.innerHeight * 1.1;
    },
    handle() {
      const fun = this.handleScroll();
      this.COMMON.throttle(fun, 60, 100);
    }
  }
};
</script>

<style scoped lang="scss" src="./view.scss"></style>

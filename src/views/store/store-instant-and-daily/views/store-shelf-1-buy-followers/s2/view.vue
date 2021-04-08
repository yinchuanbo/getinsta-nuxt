<template>
  <div>
    <div id="store-shelf-1-buy" class="pc">
      <div class="pc-content">
        <div class="pc-content_tabs">
          <div class="pc-content_tabs-item" :class="{ on: !tabsIndex }" @click="tabSwitch(false)">
            <p>Instant Followers</p>
          </div>
          <div class="pc-content_tabs-item" :class="{ on: tabsIndex }" @click="tabSwitch (true)">
            <p>Daily Followers</p>
          </div>
        </div>
        <div class="country-select" v-if="!tabsIndex && showCountrySelect">
          <h2>Country-Targeted:</h2>
          <div class="select-content">
            <span class="national-flag">
              <img v-if="currentCountry.icon_url" :src="currentCountry.icon_url" alt="">
            </span>
            <select v-model="countryFlagSelect">
              <option value="-1" selected="true">Global</option>
              <option v-for="item in regionList" :key="item.region_id" :value="item.region_id" >
                {{ item.name[0].txt }}
              </option>
            </select>
          </div>
        </div>

        <div class="pc-content_main">
          <transition name="fade-tabs" mode="out-in">
            <div v-if="!tabsIndex" key="box0" class="pc-content_main-item">
              <!-- <ul v-if="!productPkgListLoading"> -->
              <div v-if="productPkgListLoading" style="width: 100%;height: 420px;display: flex;justify-content: center;align-items: flex-start">
                <img src="./img/loading-puff-black.svg" width="100" height="100" alt="">
              </div>
              <ul v-if="!productPkgListLoading">
                <li v-for="(pkg, i) in productPkgListFollow"
                    :key="i"
                    :class="{
                      'follow': pkg['product_type'] === 2,
                      'like': pkg['product_type'] === 1,
                      'selected': productPkgListFollowIndex === i,
                      'hot': pkg['promote_sale_type'] === 3
                    }"
                    @click="pkgCheck(pkg, i)"
                >
                  <div class="pc-content_main-item_top">
                    <div class="pc-content_main-item_top-circle">
                      <span></span>
                    </div>
                    <h2>{{ pkg['purchase_quantity'] }}</h2>
                    <p>
                      <img v-if="currentCountry.icon_url" :src="currentCountry.icon_url" alt="" width="20" height="20">
                      Followers
                    </p>
                    <div v-if="pkg['gives'][0].quantity !== 0" class="pc-content_main-item_top-tags">
                      <span>+ {{ pkg['gives'][0].quantity }} Free</span>
                    </div>
                  </div>
                  <div class="pc-content_main-item_bottom">
                    <h3 v-if="pkg.payment_type === 2">{{ $t('global.currencySymbol') }} {{ pkg.price_decimal | numToFixed }}</h3>
                    <span></span>
                    <dl>
                      <dd>
                        <img src="./img/right.svg" width="16" height="16" />
                        Real Followers
                      </dd>
                      <dd>
                        <img src="./img/right.svg" width="16" height="16" />
                        Drop Protection
                      </dd>
                      <dd>
                        <img src="./img/right.svg" width="16" height="16" />
                        Instant Delivery
                      </dd>
                      <dd>
                        <img src="./img/right.svg" width="16" height="16" />
                        24/7 Support
                      </dd>
                    </dl>
                  </div>
                </li>
              </ul>
            </div>

            <div v-if="tabsIndex" key="box1" class="pc-content_main-item">
              <div v-if="!productPkgListLoading" class="pc-content_main-item_btns" style="margin-bottom: 24px;">
                <div v-for="(item, i) in productPkgListDays" :key="i" :class="{ 'dayactive': productPkgListDaysVM == item }" @click="dayClick(item)">
                  <span></span>
                  <p>{{ item }}-Day</p>
                </div>
              </div>
              <!-- followers day -->
              <!-- v-if="!productPkgListLoading"  -->
              <div v-if="productPkgListLoading" style="width: 100%;height: 420px;display: flex;justify-content: center;align-items: flex-start">
                <img src="./img/loading-puff-black.svg" width="100" height="100" alt="">
              </div>
              <ul v-if="!productPkgListLoading" class="day-followers">
                <li v-for="(item, i) in productPkgListDaily" :key="i" :class="{ 'dailyactive': productPkgListDailyVM == item }" @click="dailyClick(item)">
                  <div class="pc-content_main-item_top">
                    <div class="pc-content_main-item_top-circle">
                      <span></span>
                    </div>
                    <h2>{{ item.dailyQuantity }}</h2>
                    <p>Followers</p>
                  </div>
                  <div class="pc-content_main-item_bottom">
                    <h3>
                      ${{ (item.price_decimal / item.cycle_type).toFixed(2) }}<span>/Day</span>
                    </h3>
                    <span></span>
                    <dl>
                      <dd>
                        <img src="./img/right.svg" width="16" height="16" />
                        Real Followers
                      </dd>
                      <dd>
                        <img src="./img/right.svg" width="16" height="16" />
                        Drop Protection
                      </dd>
                      <dd>
                        <img src="./img/right.svg" width="16" height="16" />
                        Instant Delivery
                      </dd>
                      <dd>
                        <img src="./img/right.svg" width="16" height="16" />
                        24/7 Support
                      </dd>
                    </dl>
                  </div>
                </li>
              </ul>
            </div>
          </transition>
        </div>
        <!-- 输入框 -->
        <div class="inputSelect">
          <div class="inputSelect-info">
            <img src="./img/small-selected.svg" />
            <p v-if="!tabsIndex">
              <span class="sp1">{{ productPkgCurrentFollow.purchase_quantity }} Followers</span>
              <span v-if="productPkgCurrentFollow && productPkgCurrentFollow.gives && productPkgCurrentFollow.gives[0] && productPkgCurrentFollow.gives[0].quantity != 0" class="sp2">+ {{ productPkgCurrentFollow.gives[0].quantity }} Free</span>
            </p>
            <p v-if="tabsIndex">
              <span class="sp1"> {{ productPkgListDailyVM.dailyQuantity }} Followers/Day</span>
              <span class="sp2">{{ productPkgListDailyVM.cycle_type }} - Day Plan</span>
            </p>

            <span>${{ tabsIndex ? (productPkgListDailyVM.price_decimal / productPkgListDailyVM.cycle_type).toFixed(2) : productPkgCurrentFollow.price_decimal }}</span>
          </div>
          <div class="inputSelect-input">
            <div v-if="!isBuyBtn" class="inputSelect-input_search">
              <label>
                <input
                  v-model="searchInsInput" type="text"
                  placeholder="Enter Instagram username"
                  :disabled="searchInsLoading"
                  :style="{borderColor:(isBoxRed ? 'red!important' : '#E0E1E6!important')}"
                  @input="bottomBtnDetective"
                  @blur="inputBlur"
                  @focus="inputFocus"
                  @keyup.enter="searchUsername"
                >
              </label>
              <div class="search_btn" @click="searchUsername">
                <button-yellow-icon text="Ok" :font-size="'size-16'" :sharp="true" :loading="searchInsLoading" />
              </div>
            </div>

            <div v-if="isBuyBtn" class="inputSelect-input_buy">
              <div class="inputSelect-avator">
                <img :src="insUser.profile_pic_url || ''" alt="">
              </div>
              <div class="inputSelect-text">
                <h2>{{ insUser.ins_account }}</h2>
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
              <label>
                <input
                  v-model="searchInsInput" type="text"
                  placeholder="Enter Instagram username"
                  :disabled="searchInsLoading"
                  :style="{borderColor:(isBoxRed ? 'red!important' : '#E0E1E6!important')}"
                  @input="bottomBtnDetective"
                  @blur="inputBlur"
                  @focus="inputFocus"
                >
              </label>
              <div class="buyBtn" @click="tabBottomBtnAction">
                <button-yellow-icon
                  :text="$t('store.buy.buyNow')" :font-size="'size-16'" :loading="ajaxRequesting"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="followers-link">
          <router-link to="/buy-instagram-likes">Buy Instagram Likes >></router-link>
        </div>
      </div>
    </div>
    <div id="store-shelf-1-buy" class="store-shelf-1-buy spring mobile">
      <!--main--><!--圣诞活动-->
      <div ref="pronbit" class="wrapper">
        <div class="section-store">
          <div class="tabs">
            <div class="unit" :class="{ on: !tabsIndex }" @click="tabSwitch(false)">
              {{ $t('store.buy.tabs.tab-followers-0') }}
            </div>
            <div class="unit" :class="{ on: tabsIndex }" @click="tabSwitch (true)">
              {{ $t('store.buy.tabs.tab-followers-1') }}
            </div>
          </div>

          <div class="tab-content">
            <div class="store-container">
              <!--pkg-container-->
              <transition name="fade-tabs" mode="out-in">
                <!--非周期Follower任务-->
                <div v-if="!tabsIndex" key="box0" class="pkg-container">
                  <!-- <h2 id="title-pkg-follow" :class="{ 'error': productPkgListFollowTitle }">
                    <span>{{ $t('store.buy.title.text') }} <i>{{ $t('store.buy.title.error') }}</i></span>
                    <span>Country-Targeted:</span>
                  </h2> -->

                  <div class="country-select-mobile" v-if="showCountrySelect">
                    <h2>Country-Targeted:</h2>
                    <div class="select-content">
                      <span class="national-flag">
                        <img v-if="currentCountry.icon_url" :src="currentCountry.icon_url" alt="">
                      </span>
                      <select v-model="countryFlagSelect">
                        <option value="-1" selected="true">Global</option>
                        <option v-for="item in regionList" :key="item.region_id" :value="item.region_id" >
                          {{ item.name[0].txt }}
                        </option>
                      </select>
                    </div>
                  </div>

                  <!-- 购买列表 -->
                  <transition name="fade-skeleton" mode="out-in">
                    <div v-if="!productPkgListLoading">
                      <div class="pc">
                        <div
                          v-for="(pkg, i) in productPkgListFollow" :key="i"
                          :class="{
                            'follow': pkg['product_type'] === 2,
                            'like': pkg['product_type'] === 1,
                            'selected': productPkgListFollowIndex === i,
                            'hot': pkg['promote_sale_type'] === 3,
                          }"
                          class="package spring"
                          @click="pkgCheck(pkg, i)"
                        >
                          <!--num-->
                          <span class="num">
                            <i class="num-i"></i>
                            <i class="cross"></i>
                            <i class="hot-tag"></i>
                            <b>{{ pkg['purchase_quantity'] }}</b><span></span>
                          </span>
                          <!--gives mk 0-->
                          <!--<span v-if="pkg['gives'][0].quantity !== 0" class="likes">-->
                          <!--  <span>+ {{ pkg['gives'][0].quantity }} Likes</span><i></i>-->
                          <!--</span>-->

                          <!--gives mk 1-->
                          <span v-if="pkg['gives'][0].quantity !== 0" class="likes-mk-1">
                            <span>+ {{ pkg['gives'][0].quantity }}</span>
                          </span>

                          <!--price-->
                          <span v-if="pkg.payment_type === 1" class="coins">
                            <sup>{{ pkg.price | numToFixed }} coins</sup>
                            <sub>{{ pkg['original_price'] | numToFixed }} coins</sub>
                          </span>
                          <span v-if="pkg.payment_type === 2" class="coins">
                            <sup>{{ $t('global.currencySymbol') }} {{ pkg.price_decimal | numToFixed }}</sup>
                            <!--<sub>-->
                            <!--  Total:-->
                            <!--  {{ $t('global.currencySymbol') }}{{ pkg['price_decimal'] | numToFixed }}-->
                            <!--</sub>-->
                          </span>
                        </div>
                      </div>
                      <!-- 手机端 -->
                      <div class="mobile">
                        <div
                          v-for="(pkg, i) in productPkgListFollow" :key="i"
                          :class="{
                            'follow': pkg['product_type'] === 2,
                            'like': pkg['product_type'] === 1,
                            'selected': productPkgListFollowIndex === i,
                            'hot': pkg['promote_sale_type'] === 3,
                          }"
                          class="package spring"
                          @click="pkgCheck(pkg, i)"
                        >
                          <div class="package-left">
                            <div class="circle on"></div>
                            <i class="hot-tag"></i>
                            <span class="num">
                              <i class="num-i"></i>
                              <b>{{ pkg['purchase_quantity'] }}</b><span></span>
                              <i v-if="pkg['gives'][0].quantity !== 0" class="cross">+</i>
                              <div class="item-flag" v-if="currentCountry.icon_url">
                                <img :src="currentCountry.icon_url" alt="">
                              </div>
                            </span>
                            <!--gives mk 1-->
                            <span v-if="pkg['gives'][0].quantity !== 0 && pkg['promote_sale_type'] === 3" class="likes-mk-1 spring hot-3">
                              <span>FREE</span>
                              <span>{{ pkg['gives'][0].quantity }}</span>
                            </span>

                            <span v-if="pkg['gives'][0].quantity === 0" style="width: 100px"></span>

                            <span v-if="pkg['gives'][0].quantity !== 0 && pkg['promote_sale_type'] !== 3" class="likes-mk-1 spring">
                              <span>{{ pkg['gives'][0].quantity }}</span>
                            </span>
                          </div>

                          <!--price-->
                          <span v-if="pkg.payment_type === 1" class="coins">
                            <sup>{{ pkg.price | numToFixed }} coins</sup>
                            <sub>{{ pkg['original_price'] | numToFixed }} coins</sub>
                          </span>
                          <span v-if="pkg.payment_type === 2" class="coins">
                            <sup>{{ $t('global.currencySymbol') }} {{ pkg.price_decimal | numToFixed }}</sup>
                            <!--<sub>-->
                            <!--  Total:-->
                            <!--  {{ $t('global.currencySymbol') }}{{ pkg['price_decimal'] | numToFixed }}-->
                            <!--</sub>-->
                          </span>
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

                <!--周期Follower任务-->
                <div v-if="tabsIndex" key="box1" class="pkg-container">
                  <!--此处暂用like的标题-->
                  <h2 id="title-pkg-like" :class="{ 'error': productPkgListLikeTitle }">
                    <span>{{ $t('store.buy.title.text') }} <i>{{ $t('store.buy.title.error') }}</i></span>
                  </h2>

                  <transition name="fade-skeleton" mode="out-in">
                    <div v-if="!productPkgListLoading">
                      <label class="cycle days">
                        <select v-model="productPkgListDaysVM" name="offer-daily" class="package changed">
                          <option v-for="(item, i) in productPkgListDays" :key="i"
                                  :value="item"
                          >{{ item }}-Day Subscription
                          </option>
                        </select>
                      </label>
                      <label class="cycle daily" style="margin-top: 12px;">
                        <select v-model="productPkgListDailyVM" name="offer-daily" class="package changed">
                          <option
                            v-for="(item, i) in productPkgListDaily" :key="i"
                            :value="item"
                          >{{ item.dailyQuantity }} Followers/Day (${{ (item.price_decimal / item.cycle_type).toFixed(2) }})
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
              <div v-if="showbottombutton" id="control-search_ins-container" class="control-search_ins-container">
                <span class="search_click" @click="openOrHide">
                  <span></span>
                </span>

                <div v-if="noUser" class="no-user">
                  <div class="noUser-info">
                    <span></span>
                    <div v-if="insUser.profile_pic_url" class="user_avator">
                      <img :src="insUser.profile_pic_url || ''" alt="">
                    </div>

                    <!-- <div v-if="!tabsIndex" class="followers-title">{{ productPkgCurrentFollow.purchase_quantity }} Followers</div> -->

                    <div v-if="!tabsIndex" class="followers-title">
                      <div class="followers-title_top"> {{ productPkgCurrentFollow.purchase_quantity }} Followers</div>
                      <div v-if="productPkgCurrentFollow && productPkgCurrentFollow.gives && productPkgCurrentFollow.gives[0] && productPkgCurrentFollow.gives[0].quantity != 0" class="followers-title_bottom">+ {{ productPkgCurrentFollow.gives[0].quantity }} Free</div>
                    </div>

                    <div v-if="tabsIndex" class="followers-title">
                      <div class="followers-title_top"> {{ productPkgListDailyVM.dailyQuantity }} Followers/Day</div>
                      <div class="followers-title_bottom">{{ productPkgListDailyVM.cycle_type }} - Day Plan</div>
                    </div>
                  </div>
                  <div class="followers-amount">${{ tabsIndex ? (productPkgListDailyVM.price_decimal / productPkgListDailyVM.cycle_type).toFixed(2) : productPkgCurrentFollow.price_decimal }}</div>
                </div>

                <div v-if="insUser.ins_id && hasUser" class="has-user">
                  <div v-if="insUser.profile_pic_url" class="user-persal-avator">
                    <img :src="insUser.profile_pic_url || ''" alt="">
                  </div>
                  <div style="flex: 1">
                    <h2>{{ insUser.ins_account }}</h2>
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
                </div>
                <div class="control-search_ins">
                  <label>
                    <input
                      v-model="searchInsInput" type="text"
                      placeholder="Enter Instagram username"
                      :disabled="searchInsLoading"
                      :style="{borderColor:(isBoxRed ? 'red!important' : '#E0E1E6!important')}"
                      @input="bottomBtnDetective"
                      @blur="inputBlur"
                      @focus="inputFocus"
                    >
                  </label>
                  <div v-if="!isBuyBtn" class="search_btn" @click="searchUsername">
                    <button-yellow-icon text="Next" :font-size="'size-16'" :sharp="true" :loading="searchInsLoading" />
                  </div>

                  <div v-if="isBuyBtn" class="search_btn" @click="tabBottomBtnAction">
                    <button-yellow-icon
                      :text="$t('store.buy.buyNow')" :loading="ajaxRequesting"
                    />
                  </div>
                </div>

                <!-- <transition name="fade-tabs" mode="out-in">
                  <div v-if="insUser.ins_id" class="ins-info-container">
                    <img :src="insUser.profile_pic_url || ''" alt="">
                    <h3>{{ insUser.ins_account }}</h3>
                    <p>
                      <span>
                        <b>{{ insUser.post.post_count | numberAbbreviations }}</b>
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
                </transition> -->
              </div>
            </div>
          </div>

          <div class="btn-container pc" @click="tabBottomBtnAction">
            <button-yellow-icon
              :text="$t('store.buy.buyNow')"
              :icon="'cart'" :loading="ajaxRequesting"
            />
          </div>
        </div>

        <!--圣诞活动-->
        <div class="new-year__santa-claus" :class="{ hide: santaClausHide }"></div>
      </div>

      <!--buyNow Btn-->
      <div
        class="mobile"
        :class="{
          'on': bottomBtnOn,
          'control-btn__bottom-buy':!independent,
          'btn-container mk0':independent
        }"
        @click="tabBottomBtnAction"
      >
        <button-yellow-icon
          :text="$t('store.buy.buyNow')"
          :icon="'cart'"
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
                  <button-purple text="Close" :font-size="'size-16'" :square="true" />
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
                  <button-purple text="Close" :font-size="'size-16'" :square="true" />
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
import apiAccount from '@/api/api.account';
import apiIns from '@/api/api.ins';
import apiInsServer from '@/api/api.ins.server';
import apiPayment from '@/api/api.payment';
import apiTask from '@/api/api.task';
import apiV2 from '@/api/api.v2.js';

import ButtonPurple from '@/components/button/button-purple';
import ButtonYellowIcon from '@/components/button/button-yellow-icon';
// import ListEmpty from '@/components/list/list-empty';

export default {
  name: 'StoreShelf1BuyFollowers',
  components: {
    // ListEmpty,
    ButtonYellowIcon,
    ButtonPurple
  },
  filters: {
    numToFixed(num) {
      if (typeof num === 'number')
        return num.toFixed(2);
      else
        return parseFloat(num).toFixed(2);
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

      showbottombutton: false,
      screenWidth: 0,
      showCountrySelect: false,

      isFocus: false,

      noUser: false,
      hasUser: false,

      enterFirstTime: true,
      payMethodDisplay: 2,
      // 本字段控制页面显示何种支付方式的产品
      // 1 = 金币购买
      // 2 = 现金购买

      emittedData: {
        meta: {
          title: this.$t('store.meta.title-0')
        },
        route: {
          path: ''
        }
      },

      isBuyBtn: false,
      ajaxRequesting: false,
      bottomBtnOn: false,

      dialogFail: false,
      dialogFailMsg: '',
      dialogAttention: false,
      dialogAttentionMsg: '',

      tabsIndex: false,
      searchStatus: false,

      searchInsLoading: false,
      searchInsInput: '',
      insUser: {},
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
      regionList: [],
      countryFlagSelect: -1,
      currentCountry: {
        icon_url: ''
      },
      productCountryList: []
    };
  },
  computed: {
    productPkgListDisplay: function () {
      const payMethodDisplay = this.payMethodDisplay;
      return this.productPkgList.filter(function (productPkg) {
        // promote_sale_type 展示种类
        return productPkg['payment_type'] === payMethodDisplay
          && (productPkg['promote_sale_type'] === undefined
            || productPkg['promote_sale_type'] === 0
            || productPkg['promote_sale_type'] === 1
            || productPkg['promote_sale_type'] === 3)
          && productPkg['cycle_type'] === 1;
      });
    },
    productPkgListLike: function () {
      return this.productPkgListDisplay.filter(function (productPkg) {
        return productPkg['product_type'] === 1;
      });
    },
    // followers
    productCountryListDisplay: function () {
      const payMethodDisplay = this.payMethodDisplay;
      return this.productCountryList.filter(function (productPkg) {
        // promote_sale_type 展示种类
        return productPkg['payment_type'] === payMethodDisplay
          && (productPkg['promote_sale_type'] === undefined
            || productPkg['promote_sale_type'] === 0
            || productPkg['promote_sale_type'] === 1
            || productPkg['promote_sale_type'] === 3)
          && productPkg['cycle_type'] === 1;
      });
    },
    productPkgListFollow: function () {
      let list = [];
      let _this = this;
      if(this.countryFlagSelect != -1) {
        list = _this.productCountryListDisplay.filter(function (productPkg) {
          return productPkg['product_type'] === 2;
        });
      } else {
        list = _this.productPkgListDisplay.filter(function (productPkg) {
          return productPkg['product_type'] === 2;
        });
      }
      return list;
    }
  },
  watch: {
    // productPkgListDailyVM(val) {
    //   let productPkgListDaysDuplicated = [];
    //   this.pkgListWithUnit.map(item => {
    //     if (item.dailyQuantity === val.dailyQuantity)
    //       productPkgListDaysDuplicated.push(item.cycle_type);
    //   });
    //
    //   this.productPkgListDays = [...new Set(productPkgListDaysDuplicated)];
    //   this.productPkgListDaysVM = this.productPkgListDays[0];
    // }
    productPkgListDaysVM(val) {
      this.productPkgListDaily = this.pkgListWithUnit.filter(item => item.cycle_type === val);
      // console.log("followers-daily-----",this.productPkgListDaily)
      this.productPkgListDailyVM = this.productPkgListDaily[0];
    },
    countryFlagSelect(newValue, oldVal) {
      let regionList = this.regionList;
      this.productPkgListLoading = true;
      if(regionList && regionList.length !==0) {
        regionList.forEach((item, index) => {
          if(item.region_id == newValue ) {
            this.currentCountry = item;
            return;
          }
        })
      }
      if(oldVal != '' && newValue != -1) {
        this.getCountryProduct()
      } else if(oldVal != '' && newValue == -1) {
        this.productPkgListLoading = false;
        this.productPkgListFollowIndex = -1;
        this.currentCountry = {};
        this.getPkgList();
      }
    }
  },
  created() {
    this.initTabIndex();
    this.keyupSubmit();
  },
  mounted() {
    this.getPkgList();
    if(!this.tabsIndex) {
      this.getRegionList();
    }
    window.addEventListener('scroll', this.handle);
    const that = this;
    window.onresize = () => {
      return (() => {
        window.screenWidth = document.body.clientWidth;
        that.screenWidth = window.screenWidth;
      })();
    };
  },
  destroyed() {
    window.removeEventListener('scroll', this.handle);
  },
  methods: {
    emitToParent() {
      this.$emit('emitToParent', this.emittedData);
    },
    dayClick(val) {
      this.productPkgListDaysVM = val;
    },
    getCountryProduct() {
      var _this = this;
      this.$nuxt.$axios.post(
        `${apiV2.getProduct}`,
        this.COMMON.paramSign({
          "origin": "web",
          "client_lan": 'en',
          "cycle_product_enable": false,
          "subscribe_product_enable": false,
          "system_id": 1,
          "region_id": parseInt(this.countryFlagSelect)
        })
      ).then((response) => {
        let { data } = response;
        if(data.status !== 'ok') return;
        this.productPkgListLoading = false;
        let { list } = data.product;
        this.productCountryList = list;
        this.productPkgCurrentFollow = list[0];
        if(this.countryFlagSelect != -1) {
          this.productPkgListFollowIndex = 0;
        }
      }).catch((error) => {
        this.productPkgListLoading = false;
        this.dialogFailMsg = '<samp>'
          + '<b>Error Status:</b> ' + error.status
          + '<br>' + '<b>Error Message:</b> ' + error.statusText
          + '</samp>';
        this.dialogFail = true;
        console.error('Catch Error: getProduct', error);
      });
    },
    getRegionList() {
      var _this = this;
      _this.productPkgListLoading = true;
      this.$nuxt.$axios.post(
        `${apiV2.getRegionList}`,
        this.COMMON.paramSign({
           "origin":"web",
           "system_id": 1
        })
      ).then((response) => {
        let { data } = response;
        if(data.status !== 'ok') return;
        data.region_list.forEach(function(item, index) {
          let lang = navigator.language || navigator.userLanguage;
          if(lang === 'hi') {
             lang = 'hi-in';
          } else if(lang === 'id') {
            lang = "id-id"
          }
          lang = lang.replace(/-/g, '_').toLowerCase();
          let display_locale_list = item.display_locale_list.join(',').toLowerCase().split(',');
          const isInArr = display_locale_list.includes(lang);
          if(!isInArr) {
            _this.showCountrySelect = false;
          } else {
            if(item.region_status === 1 && isInArr) {
              _this.showCountrySelect = true;
              _this.regionList.push(item);
            }
          }
        })
        if(this.countryFlagSelect == -1) return;
        this.currentCountry = _this.regionList[0];
        let region_id = parseInt(this.regionList[0].region_id);
        if(region_id && region_id != 0) {
          this.getCountryProduct();
        }
      }).catch((error) => {
        this.productPkgListLoading = false;
        this.dialogFailMsg = '<samp>'
          + '<b>Error Status:</b> ' + error.status
          + '<br>' + '<b>Error Message:</b> ' + error.statusText
          + '</samp>';
        this.dialogFail = true;
        console.error('Catch Error: getRegionList', error);
      });
    },
    keyupSubmit() {
      if (process.server) return;
      document.onkeydown = (e) => {
        let _key = window.event.keyCode;
        if (_key === 13 && this.isFocus) {
          if (!this.isBuyBtn) {
            this.searchUsername();
          } else {
            this.tabBottomBtnAction();
          }
        }
      };
    },
    dailyClick(val) {
      this.productPkgListDailyVM = val;
    },
    closeDialog() {
      this.dialogFail = false;
      this.dialogAttention = false;
    },
    openOrHide() {
      if (!this.noUser) {
        this.noUser = true;
        this.hasUser = this.insUser.ins_id ? true : false;
      } else {
        this.noUser = false;
        this.hasUser = false;
      }
    },
    inputBlur() {
      this.isBoxRed = false;
      this.isFocus = false;
    },
    inputFocus() {
      this.noUser = true;
      this.isFocus = true;
    },
    initTabIndex() {
      const path = this.$route.path;
      if (path === '/buy-instagram-followers') {
        this.tabsIndex = false;
        this.emittedData.meta.title = this.$t('store.meta.title-0');
        this.emittedData.meta.description
          = this.$i18n.locale === 'en'
          ? this.$t('store.meta.description-0')
          : this.$t('store.meta.description');
      } else if (path === '/buy-instagram-daily-followers') {
        this.tabsIndex = true;
        this.emittedData.meta.title = this.$t('store.meta.title-0');
        this.emittedData.meta.description
          = this.$i18n.locale === 'en'
          ? this.$t('store.meta.description-0')
          : this.$t('store.meta.description');
      } else if (path === '/buy-instagram-likes') {
        this.tabsIndex = true;
        this.emittedData.meta.title = this.$t('store.meta.title-1');
        this.emittedData.meta.description
          = this.$i18n.locale === 'en'
          ? this.$t('store.meta.description-1')
          : this.$t('store.meta.description');
      } else if (path === '/event-followers') {
        this.tabsIndex = false;
        this.emittedData.meta.title = 'Get Unlimited Real Instagram Followers & Likes';
        this.emittedData.meta.description = this.$t('store.meta.description-0');
      } else if (path === '/event-likes') {
        this.tabsIndex = true;
        this.emittedData.meta.title = 'Get Unlimited Real Instagram Followers & Likes';
        this.emittedData.meta.description = this.$t('store.meta.description-1');
      }

      this.$emit('emitToParent', this.emittedData);
    },
    tabSwitch(i) {
      this.tabsIndex = i;
      let originalPath = this.$route.path;
      let destPath = '';

      if (i === false) {

        if (originalPath === '/event-likes') {
          destPath = '/event-followers';
          this.emittedData.meta.title = 'Get Unlimited Real Instagram Followers & Likes';
          this.emittedData.meta.description = this.$t('store.meta.description-0');
        } else if (originalPath === '/event-followers') {
          destPath = '/event-followers';
          this.emittedData.meta.title = 'Get Unlimited Real Instagram Followers & Likes';
          this.emittedData.meta.description = this.$t('store.meta.description-1');
        } else {
          destPath = '/buy-instagram-followers';
          this.emittedData.meta.title = this.$t('store.meta.title-0');
          this.emittedData.meta.description
            = this.$i18n.locale === 'en'
            ? this.$t('store.meta.description-0')
            : this.$t('store.meta.description');
        }

      } else if (i === true) {

        if (originalPath === '/event-followers') {
          destPath = '/event-likes';
          this.emittedData.meta.title = 'Get Unlimited Real Instagram Followers & Likes';
          this.emittedData.meta.description = this.$t('store.meta.description-0');
        } else if (originalPath === '/event-likes') {
          destPath = '/event-likes';
          this.emittedData.meta.title = 'Get Unlimited Real Instagram Followers & Likes';
          this.emittedData.meta.description = this.$t('store.meta.description-1');
        } else {
          destPath = '/buy-instagram-daily-followers';
          // this.emittedData.meta.title = this.$t('store.meta.title-1');
          // this.emittedData.meta.description
          //   = this.$i18n.locale === 'en'
          //   ? this.$t('store.meta.description-1')
          //   : this.$t('store.meta.description');
          this.emittedData.meta.title = this.$t('store.meta.title-0');
          this.emittedData.meta.description
            = this.$i18n.locale === 'en'
            ? this.$t('store.meta.description-0')
            : this.$t('store.meta.description');
        }

      }

      if (originalPath !== destPath) {
        this.emittedData.route.path = destPath;
        this.emitToParent();
      }

      // this.bottomBtnDetective();
      // this.anchorBottomBtn();
    },
    pkgCheck(pkg, i) {
      if (pkg['product_type'] === 1) {
        this.productPkgListLikeIndex = i;
        this.productPkgCurrentLike = pkg;
      } else if (pkg['product_type'] === 2) {
        this.productPkgListFollowIndex = i;
        this.productPkgCurrentFollow = pkg;
      }
      // console.log('pkg', pkg);
      // console.log('i', i);
      this.productPkgListFollowTitle = false;
      this.productPkgListLikeTitle = false;
      this.postListTitle = false;

      if (!this.enterFirstTime && !this.independent)
        this.anchorBottomBtn();
    },
    pkgSelectedInit(pkgList) {
      console.log(pkgList)
      let pkgLikeFirstNum = 0, pkgFollowFirstNum = 0;
      for (let unit of pkgList) {
        if (unit['product_type'] === 1) { // like
          pkgLikeFirstNum = unit['purchase_quantity'];
          this.productPkgCurrentLike = unit;
        }
        if (unit['product_type'] === 2) { // follow
          pkgFollowFirstNum = unit['gives'][0]['quantity'];
          if(this.countryFlagSelect == -1) {
            this.productPkgCurrentFollow = unit;
          }
        }
        if (pkgLikeFirstNum !== 0 && pkgFollowFirstNum !== 0) {
          break;
        }
      }
    },

    getPkgList() {
      if (this.productPkgListLoading) return;

      // let client = 'en';
      // if (this.$i18n.locale === 'fr') client = 'fr';
      // if (this.$i18n.locale === 'de') client = 'de';

      // client = 'fr';

      this.productPkgListLoading = true;


      // this.$nuxt.$axios.get(
      //   `${apiAccount.appConfig}?origin=web`
      this.$nuxt.$axios.post(
        `${apiAccount.appConfig}?origin=web`,
        this.COMMON.paramSign({
          client_lan: this.$i18n.locale,
          cycle_product_enable: true
        })
      ).then((response) => {
        this.productPkgListLoading = false;

        if (response.data.product && response.data.product.list) {

          this.renderProductPkgList(response.data.product.list);

          //console.log(response.data.product.list);
        } else {
          this.$alert('', 'error', 'Oops',
            'Requesting Offer List failed, please try later.',
            '', 'Close');
        }

        setTimeout(() => {
          this.enterFirstTime = false;
        }, 1000);
      }).catch((error) => {
        this.productPkgListLoading = false;
        this.dialogFailMsg = '<samp>'
          + '<b>Error Status:</b> ' + error.status
          + '<br>' + '<b>Error Message:</b> ' + error.statusText
          + '</samp>';
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
      let indexFollow = 0;
      for (indexFollow = 0; indexFollow < this.productPkgListFollow.length; indexFollow++) {
        if (this.productPkgListFollow[indexFollow]['promote_sale_type'] === 3)
          break;
      }
      let indexLike = 0;
      for (indexLike = 0; indexLike < this.productPkgListLike.length; indexLike++) {
        if (this.productPkgListLike[indexLike]['promote_sale_type'] === 3)
          break;
      }

      if (indexFollow < this.productPkgListFollow.length) {
        this.pkgCheck(this.productPkgListFollow[indexFollow], indexFollow);
      }
      if (indexLike < this.productPkgListLike.length) {
        this.pkgCheck(this.productPkgListLike[indexLike], indexLike);
      }

      // console.log('indexFollow:', indexFollow);
      // console.log('indexLike:', indexLike);
      // console.log('this.productPkgListFollow:', this.productPkgListFollow[indexFollow]);
    },
    // 生成周期循环offer独立数组
    renderPkgListWithUnit(pkgList) {

      // 2222

      pkgList.map(item => {
        if (item['cycle_type'] > 1 && item.product_type === 2) {
          item.dailyQuantity = item['purchase_quantity'];
          this.pkgListWithUnit.push(item);
        }
      });
      // this.renderPkgListDaily();
      this.renderPkgListDays();
    },
    // 生成Daily Select数组（Offer选择）（未使用）
    renderPkgListDaily() {
      const res = new Map();
      this.productPkgListDaily = this.pkgListWithUnit.filter((a) =>
        !res.has(a.dailyQuantity) && res.set(a.dailyQuantity, 1));
      this.productPkgListDailyVM = this.productPkgListDaily[0];
    },
    // 生成Days Select数组（周期选择）
    renderPkgListDays() {
      this.productPkgListDays = [...new Set(this.pkgListWithUnit.map(item => item.cycle_type))];
      this.productPkgListDaysVM = this.productPkgListDays[0];
    },

    searchUsername: function () {
      this.searchInsByServerV2();
      this.gaSearchBtn();
    },
    searchInsByServerV2() {
      if (this.searchInsInput === '') {
        // this.dialogAttentionMsg = 'Please enter username.';
        // this.dialogAttention = true;

        this.isBoxRed = true;
        // this.$alert(
        //   '', 'warn',
        //   this.$t('store.buy.error.noInsID.title'),
        //   this.$t('store.buy.error.noInsID.text'),
        //   'normal',
        //   this.$t('global.modelBox.btn.close')
        // );
        return;
      }

      this.isBoxRed = false;

      if (this.searchInsLoading) return;

      this.searchInsLoading = true;

      this.$nuxt.$axios.post(
        apiInsServer.getAccountByUsername,
        this.COMMON.paramSign({ ins_account: this.searchInsInput })
      ).then((response) => {
        this.searchInsLoading = false;
        this.searchStatus = true;

        if (response.data.status !== 'ok') {
          this.$alert(
            '', 'error',
            this.$t('global.modelBox.title.oops'),
            this.$t('store.buy.error.errorInsID.text'),
            'normal',
            this.$t('global.modelBox.btn.close')
          );
          return;
        }

        const _sharedDataUser = response.data.content['graphql']['user'];
        const _sharedDataUserPosts = _sharedDataUser['edge_owner_to_timeline_media'];

        this.insUser.ins_id = _sharedDataUser.id;
        this.insUser.ins_account = _sharedDataUser.username;
        this.insUser.profile_pic_url = _sharedDataUser.profile_pic_url;
        this.insUser.followed_by = _sharedDataUser['edge_followed_by']['count'];
        this.insUser.follow = _sharedDataUser['edge_follow']['count'];
        this.insUser.post = this.insPostTransform(_sharedDataUserPosts);

        this.postList = this.insUser.post.post_list;
        this.postListInfo.post_count = this.insUser.post.post_count;
        this.postListInfo.end_cursor = this.insUser.post.end_cursor;
        this.postListInfo.has_next_page = this.insUser.post.post_count > this.postListInfo.page_size;
        this.$nextTick(() => {
          this.noUser = true;
          this.hasUser = this.insUser.ins_id ? true : false;
          this.isBuyBtn = true;
          this.anchorBottomBtn();
        });
      }).catch((error) => {
        this.closeDialog();
        this.searchInsLoading = false;
        this.isBuyBtn = false;
        // this.$alert(
        //   '', 'error', 'Oops',
        //   'Request Instagram Data failed, please try again later.',
        //   'normal', 'Close'
        // );
        this.$alert(
          '', 'error',
          this.$t('global.modelBox.title.oops'),
          this.$t('store.buy.error.errorRequest.text'),
          'normal',
          this.$t('global.modelBox.btn.close')
        );
        console.error('Catch Error: searchIns: ', error);
      });
    },
    // 搜索ins后直接跳转checkout
    searchInsByServerV2AndAddToCart() {
      if (this.searchInsInput === '') {
        // this.dialogAttentionMsg = 'Please enter username.';
        // this.dialogAttention = true;

        this.$alert(
          '', 'warn',
          this.$t('store.buy.error.noInsID.title'),
          this.$t('store.buy.error.noInsID.text'),
          'normal',
          this.$t('global.modelBox.btn.close')
        );
        return;
      }
      if (this.ajaxRequesting) return;
      if (this.searchInsLoading) return;

      this.ajaxRequesting = true;
      this.searchInsLoading = true;
      this.$nuxt.$axios.post(
        apiInsServer.getAccountByUsername,
        this.COMMON.paramSign({ ins_account: this.searchInsInput })
      ).then((response) => {
        this.ajaxRequesting = false;
        this.searchInsLoading = false;
        this.searchStatus = true;

        if (response.data.status !== 'ok') {
          this.$alert(
            '', 'error',
            this.$t('global.modelBox.title.oops'),
            this.$t('store.buy.error.errorInsID.text'),
            'normal',
            this.$t('global.modelBox.btn.close')
          );
          return;
        }

        const _sharedDataUser = response.data.content['graphql']['user'];
        const _sharedDataUserPosts = _sharedDataUser['edge_owner_to_timeline_media'];

        this.insUser.ins_id = _sharedDataUser.id;
        this.insUser.ins_account = _sharedDataUser.username;
        this.insUser.profile_pic_url = _sharedDataUser.profile_pic_url;
        this.insUser.followed_by = _sharedDataUser['edge_followed_by']['count'];
        this.insUser.follow = _sharedDataUser['edge_follow']['count'];
        this.insUser.post = this.insPostTransform(_sharedDataUserPosts);

        this.postList = this.insUser.post.post_list;
        this.postListInfo.post_count = this.insUser.post.post_count;
        this.postListInfo.end_cursor = this.insUser.post.end_cursor;
        this.postListInfo.has_next_page = this.insUser.post.post_count > this.postListInfo.page_size;

        this.$nextTick(() => {
          this.anchorBottomBtn();
          this.addToCart();
        });
      }).catch((error) => {
        this.closeDialog();
        this.searchInsLoading = false;
        this.ajaxRequesting = false;
        // this.$alert(
        //   '', 'error', 'Oops',
        //   'Request Instagram Data failed, please try again later.',
        //   'normal', 'Close'
        // );
        this.$alert(
          '', 'error',
          this.$t('global.modelBox.title.oops'),
          this.$t('store.buy.error.errorRequest.text'),
          'normal',
          this.$t('global.modelBox.btn.close')
        );
        console.error('Catch Error: searchIns: ', error);
      });
    },
    searchIns() {
      if (this.searchInsInput === '') {
        this.$alert(
          '', 'warn',
          this.$t('store.buy.error.noInsID.title'),
          this.$t('store.buy.error.noInsID.text'),
          'normal',
          this.$t('global.modelBox.btn.close')
        );
        return;
      }
      if (this.searchInsLoading) return;

      this.searchInsLoading = true;
      this.$nuxt.$axios.get(
        `https://www.instagram.com/${this.searchInsInput}/`
      ).then((response) => {
        this.searchInsLoading = false;
        this.searchStatus = true;

        const responsePage = response.data;
        const _sharedDataStr = responsePage.match('window._sharedData = (.*);<\/script')[1];
        const _sharedData = JSON.parse(_sharedDataStr);
        const _sharedDataUser = _sharedData['entry_data']['ProfilePage'][0]['graphql']['user'];
        const _sharedDataUserPosts = _sharedDataUser['edge_owner_to_timeline_media'];
        // console.log(_sharedData);
        // console.log(_sharedDataUser);
        // console.log(this.dataStored.user.ins_account.accounts[this.dataStoredInsListIndex - 1]);
        // console.log(this.dataStored.user.ins_account.accounts);

        this.insUser.ins_id = _sharedDataUser.id;
        this.insUser.ins_account = _sharedDataUser.username;
        this.insUser.profile_pic_url = _sharedDataUser.profile_pic_url;
        this.insUser.followed_by = _sharedDataUser['edge_followed_by']['count'];
        this.insUser.follow = _sharedDataUser['edge_follow']['count'];
        this.insUser.post = this.insPostTransform(_sharedDataUserPosts);

        this.postList = this.insUser.post.post_list;
        this.postListInfo.post_count = this.insUser.post.post_count;
        this.postListInfo.end_cursor = this.insUser.post.end_cursor;
        this.postListInfo.has_next_page = this.insUser.post.post_count > this.postListInfo.page_size;

        this.$nextTick(() => {
          this.anchorBottomBtn();
        });
      }).catch((error) => {
        this.closeDialog();
        this.searchInsLoading = false;
        this.dialogFailMsg = 'Failed to get your Instagram data, or there\'s no such an Instagram account. Please try again.';
        setTimeout(() => {
          this.dialogFail = true;
        }, 300);
        console.error('Catch Error: searchIns: ', error);
      });
    },
    searchInsByServer() {
      if (this.searchInsInput === '') {
        this.$alert(
          '', 'warn',
          this.$t('store.buy.error.noInsID.title'),
          this.$t('store.buy.error.noInsID.text'),
          'normal',
          this.$t('global.modelBox.btn.close')
        );
        return;
      }
      if (!this.searchInsLoading) {
        this.searchInsLoading = true;
        this.$nuxt.$axios.post(
          apiAccount.getInsInfo,
          this.COMMON.paramSign(
            {
              'ins_account': this.searchInsInput
            }
          )
        ).then((response) => {
          this.searchInsLoading = false;
          if (response.data.status === 'ok') {
            this.userStatus.search = true;
            this.insUser = response.data['ins_info'];
            this.postList = response.data['ins_info'].post['post_list'];

            this.postListInfo.post_count = response.data['ins_info'].post.post_count;
            this.postListInfo.end_cursor = response.data['ins_info'].post.end_cursor;
            this.postListInfo.has_next_page = response.data['ins_info'].post.post_count > this.postListInfo.page_size;
            setTimeout(() => {
              if (!this.independent)
                this.$scrollTo('#search-result', { offset: -100 });
            }, 500);
          } else {
            this.dialogFailMsg = 'Please enter valid username.';
            this.dialogFail = true;
          }
        }).catch((error) => {
          this.searchInsLoading = false;
          this.dialogFailMsg = '<samp>'
            + '<b>Error Status:</b> ' + error.status
            + '<br>' + '<b>Error Message:</b> ' + error.statusText
            + '</samp>';
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
        id: this.insUser.ins_id,
        first: this.postListInfo.page_size,
        after: this.postListInfo.end_cursor
      };
      this.postListNextRequestV2(param);
    },
    postListNextRequestV2(param) {
      if (!this.postListLoading) {
        this.postListLoading = true;

        const paramTrans = JSON.stringify(param);

        this.$nuxt.$axios.get(
          `${apiIns.insPostList}${paramTrans}`
        ).then((response) => {
          this.postListLoading = false;

          // console.log(response.data.data.user['edge_owner_to_timeline_media']['edges']);
          const insPostObj = response.data.data.user['edge_owner_to_timeline_media'];

          for (let i = 0; i < insPostObj['edges'].length; i++) {
            let insPostObjTransUnit = {};
            insPostObjTransUnit.like_id = insPostObj['edges'][i]['node']['id'];
            insPostObjTransUnit.like_pic_url = insPostObj['edges'][i]['node']['thumbnail_src'];
            insPostObjTransUnit.like_count = insPostObj['edges'][i]['node']['edge_media_preview_like']['count'];
            insPostObjTransUnit.short_code = insPostObj['edges'][i]['node']['shortcode'];

            this.postList.push(insPostObjTransUnit);
          }

          this.renderPostListInfo(
            insPostObj.count,
            insPostObj['page_info']['end_cursor'],
            insPostObj['page_info']['has_next_page']
          );

        }).catch((error) => {
          this.postListLoading = false;

          this.$alert(
            '', 'error',
            this.$t('global.modelBox.title.oops'),
            this.$t('store.buy.error.errorRequest.text'),
            'normal',
            this.$t('global.modelBox.btn.close')
          );
          console.error('Catch Error: postListNextRequestV2: ', error);
        });
      }
    },
    postListUpdateV2(unit, i) {
      this.postList = unit.post['post_list'];
      this.renderPostListInfo(
        unit.post['post_count'],
        unit.post['end_cursor'],
        unit.post['post_count'] > this.postList.length
      );

      this.accountListSwitchCallback(unit, i);
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
      // 关注
      if (!this.tabsIndex) {
        if (this.productPkgListFollowIndex === -1) {
          this.productPkgListFollowTitle = true;
          if (!this.independent)
            this.$scrollTo('#title-pkg-follow', { offset: -200 });
          return;
        }
      }

      // 点赞
      if (this.tabsIndex) {
        // if (this.productPkgListLikeIndex === -1) {
        //   this.productPkgListLikeTitle = true;
        //   if (!this.independent)
        //     this.$scrollTo('#title-pkg-like', { offset: -200 });
        //   return;
        // }

        // if (!this.postCurrent.like_id) {
        //   this.postListTitle = true;
        //   if (!this.independent)
        //     this.$scrollTo('#title-post-like', { offset: -100 });
        //   return;
        // }
      }

      // 流程调整
      if (!this.tabBottomBtnPreCheck()) {
        return;
      }

      // 金币/现金 支付
      // if (this.payMethodDisplay === 1) {
      //   this.publish();
      // } else if (this.payMethodDisplay === 2) {
      //
      // this.addToCart();
      // }

      // 流程调整前（先搜索ins续手动点击跳转checkout）
      this.addToCart();
      // 流程调整后（搜索ins后自动跳转checkout）
      // this.searchInsByServerV2AndAddToCart();
    },
    // 检查是否搜索过ins
    tabBottomBtnPreCheck() {
      if (!this.insUser.ins_account) {
        this.$alert(
          '', 'warn',
          this.$t('store.buy.error.noInsID.title'),
          this.$t('store.buy.error.noInsID.text'),
          'normal',
          this.$t('global.modelBox.btn.close')
        ).then(() => {
          if (this.$i18n.locale !== 'en') {
            let gaPage = '', gaPlatform = '';
            if (this.$route.path === '/') {//home
              gaPage = 'hp';
            } else if (
              this.$route.path === '/buy-instagram-followers'
              || this.$route.path === '/buy-instagram-likes'
            ) {//store
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
        }).catch(() => {
        });
        if (!this.independent)
          this.$scrollTo('#control-search_ins-container', { offset: -44 });
        return false;
      } else {
        return true;
      }
    },
    bottomBtnDetective() {

      this.insUser = {};
      this.isBuyBtn = false;

      if (this.searchInsInput !== '') {
        this.isBoxRed = false;
      } else {
        this.isBoxRed = true;
      }

      // if (!this.tabsIndex) {
      //   this.bottomBtnOn = this.productPkgListFollowIndex !== -1 && this.insUser.ins_id;
      // } else if (this.tabsIndex) {
      //   this.bottomBtnOn = this.insUser.ins_id;
      // }
      // 调整后
      // this.bottomBtnOn = this.searchInsInput !== '';
    },
    anchorBottomBtn() {
      if (!this.COMMON.isMobile()) return;
      if (!this.tabsIndex) {
        if (this.productPkgListFollowIndex !== -1 && this.insUser.ins_id) {
        }
        if (this.productPkgListFollowIndex !== -1 && !this.insUser.ins_id) {
          // 选择套餐，自动滚动
          // setTimeout(() => {
          //   if (!this.independent)
          //     this.$scrollTo(`#control-search_ins-container`, { offset: -44 });
          // }, 500);
        }
      } else if (this.tabsIndex) {
        if (this.productPkgListLikeIndex !== -1 && !this.insUser.ins_id) {
          if (!this.independent)
            this.$scrollTo(`#control-search_ins-container`, { offset: -44 });
        }
        if (this.productPkgListLikeIndex !== -1 && this.insUser.ins_id) {
          if (!this.independent)
            this.$scrollTo(`#title-post-like`, { offset: -60 });
        }
      }
      // this.bottomBtnDetective();
    },

    addToCart() {
      let param = {
        'ins_id': this.insUser.ins_id,
        'ins_account': this.insUser.ins_account
      };

      // 关注
      if (!this.tabsIndex) {
        param.task_type = 2;
        param.product_id = this.productPkgCurrentFollow.product_id;
        param.purchase_quantity = this.productPkgCurrentFollow.purchase_quantity;
        param.price_decimal = this.productPkgCurrentFollow.price_decimal || 8.8;
        param.cycle_type = this.productPkgCurrentFollow.cycle_type;
        param.product_type = this.productPkgCurrentFollow.product_type;
        param.gives = this.productPkgCurrentFollow['gives'];
        param.follow_pic_url = this.insUser.profile_pic_url;
        param.post_count = this.insUser.post.post_count;
        param.follower_count = this.insUser.followed_by;
        param.following_count = this.insUser.follow;

        if(this.currentCountry.icon_url) {
          param.icon_url = this.currentCountry.icon_url;
        }

        if (this.postList.length > 1) {
          param.like_id = this.postList[0].like_id;
          param.like_pic_url = this.postList[0].like_pic_url;
          param.like_count = this.postList[0].like_count;
          param.short_code = this.postList[0].short_code;
        }

        // console.log(param);
        this.gaBottomBtn();
      }

      // 周期关注
      if (this.tabsIndex) {
        // const post = this.postCurrent;

        param.task_type = 2;
        param.product_id = this.productPkgListDailyVM.product_id;
        param.purchase_quantity = this.productPkgListDailyVM.purchase_quantity;
        param.price_decimal = this.productPkgListDailyVM.price_decimal;
        // param.like_id = post.like_id;
        // param.like_pic_url = post.like_pic_url;
        // param.short_code = post.short_code;
        // param.like_count = this.productPkgCurrentLike['purchase_quantity'];
        param.gives = this.productPkgListDailyVM['gives'];
        param.follow_pic_url = this.insUser.profile_pic_url;
        param.post_count = this.insUser.post.post_count;
        param.follower_count = this.insUser.followed_by;
        param.following_count = this.insUser.follow;
        param.cycle_type = this.productPkgListDailyVM.cycle_type;
        param.product_type = this.productPkgListDailyVM.product_type;
        this.gaBottomBtn();
      }

      // 广告参数
      let adStore = { s: '', c: '', k: '' };
      adStore.s = this.$route.query.s || '';
      adStore.c = this.$route.query.c || '';
      adStore.k = this.$route.query.k || '';
      this.$storage.set('adStore', adStore);

      // console.log(this.$route.path);

      // console.log(1, param);
      // this.initGeoIPWhiteList(param);
      this.transportCartUnitData(param);
    },
    transportCartUnitData(param) {
      console.log(param);
      this.$storage.set('cartUnit', param);
      // this.$store.commit('cartUnit', param);

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
      this.$nuxt.$axios.post(
        apiPayment.getCheckoutMethod,
        this.COMMON.paramSign({
          client_lan: this.$i18n.locale
        })
      ).then((response) => {
        if (response.data.status === 'ok') {
          // if (this.$route.path === '/event-followers' || this.$route.path === '/event-likes') {
          //   this.sendCheckoutInfo(param);
          // } else {
          //   if (response.data['checkout_method'] === 1) {
          //     // Stripe
          //     this.sendCheckoutInfo(param);
          //   } else {
          //     // HotAntPay
          //     this.transportCartUnitData(param);
          //   }
          // }


          // askNet
          // if (this.askNet) {
          //   this.askNetPay();
          //   return;
          // }

          // Shopify
          // if (this.shopify) {
          //   this.shopifyPay();
          //   return;
          // }

          if (response.data['checkout_method'] === 1) {
            this.shopifyPay();
          } else {
            this.transportCartUnitData(param);
          }

        } else {
          this.ajaxRequesting = false;
          this.$alert(
            '', 'error', 'Sorry',
            'Something wrong with check payment method, please try later.',
            'normal',
            'Close'
          );
        }
      }).catch((error) => {
        this.ajaxRequesting = false;
        this.$alert(
          '', 'error', 'Sorry',
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
        'token': this.$storage.get('token'),
        'locale': navigator.language,
        'tasks': {
          'ins_id': this.insUser.ins_id,
          'ins_account': this.insUser.ins_account
        },
        'ads': {
          's': this.$route.query.s || '',
          'c': this.$route.query.c || '',
          'k': this.$route.query.k || ''
        }
      };

      if (!this.tabsIndex) {// 关注
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

      if (this.tabsIndex) {// 点赞
        const post = this.postCurrent;

        param.tasks.product_id = this.productPkgCurrentLike.product_id;
        param.tasks.task_type = 1;
        param.tasks.like_id = post.like_id;
        param.tasks.like_pic_url = post.like_pic_url;
        param.tasks.short_code = post.short_code;
        param.tasks.like_count = this.productPkgCurrentLike['purchase_quantity'];
      }

      this.shopifyPayRequest(param);
    },
    shopifyPayRequest(param) {
      // if (!this.ajaxRequesting) {
      //   this.ajaxRequesting = true;
      //   console.log(param);
      this.$nuxt.$axios.post(
        apiTask.shopifyPay,
        this.COMMON.paramSign(param)
      ).then((response) => {
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
            this.dialogFailMsg = 'This Instagram account does not been added yet.';
            this.dialogFail = true;
          } else if (response.data.error.type === 'money_deficit') {
            this.coinsLackNumCal();
          } else if (response.data.error.type === 'product_expired') {
            this.dialogFailMsg = 'This task cannot be published at this time.';
            this.dialogFail = true;
          } else if (response.data.error.type === 'product_locale') {
            this.dialogFailMsg = 'Sorry. This package is not currently available in your country or region.';
            this.dialogFail = true;
          } else {
            this.dialogFailMsg = '<samp>'
              + '<b>Error Type:</b> ' + response.data.error.type
              + '<br>' + '<b>Error Message:</b> ' + response.data.error.message
              + '</samp>';
            this.dialogFail = true;
          }
        } else {
          this.dialogFailMsg = JSON.stringify(response.data);
          this.dialogFail = true;
        }
      }).catch((error) => {
        this.ajaxRequesting = false;
        this.dialogFailMsg = '<samp>'
          + '<b>Error Status:</b> ' + error.status
          + '<br>' + '<b>Error Message:</b> ' + error.statusText
          + '</samp>';
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

      this.$nuxt.$axios.post(
        apiTask.checkoutAndroid,
        this.COMMON.paramSign(paramCheckout)
      ).then((response) => {
        this.ajaxRequesting = false;
        if (response.data.status === 'ok') {
          const query = this.COMMON.envTest() ? '&env_test=1' : '';
          window.location.href = `${response.data['checkout_url']}${query}`;
        } else {
          this.$alert(
            '', 'error', 'Sorry',
            'Something wrong with send checkout info, please try later.',
            'normal',
            'Close'
          );
        }
      }).catch((error) => {
        this.ajaxRequesting = false;
        this.$alert(
          '', 'error', 'Sorry',
          'Something wrong with send checkout info, please try later.',
          'normal',
          'Close'
        );
        console.log('sendCheckoutInfo Error:', error);
      });
    },

    gaSearchBtn() {
      let param = !this.tabsIndex ? 'f' : 'l';
      let paramEvent0 = '';
      if (this.$route.path === '/event-followers' || this.$route.path === '/event-likes') {
        paramEvent0 = '-ad';
      }
      if (this.tabsIndex) paramEvent0 = '-daily';

      let gaPlatform = '';
      if (this.$i18n.locale !== 'en') {
        if (this.COMMON.isiOS()) gaPlatform = 'ios';
        if (this.COMMON.isAndroid()) gaPlatform = 'adr';
      }

      let gaMultiLang = this.$i18n.locale !== 'en' ? `-${this.$i18n.locale}` : '';

      let pageParam = '';
      if (this.$route.path === '/') {
        pageParam = 'hp';
      } else if (
        this.$route.path === '/buy-instagram-followers'
        || this.$route.path === '/buy-instagram-likes'
      ) {
        pageParam = 'store';
      }

      if (this.$store.state.s2) {
        if (!this.tabsIndex) {
          this.$ga.event('buttonclick', 'click', 'followerbuy');
        } else {
          this.$ga.event('buttonclick', 'click', 'dailyfbuy');
        }
      } else {
        this.$ga.event(
          'buttonclick',
          'click',
          `${pageParam}${gaPlatform}add${param}${paramEvent0}${gaMultiLang}`
        );
      }
    },
    gaBottomBtn() {
      // let param = !this.tabsIndex ? 'f' : 'l';
      let param = 'f';
      let paramEvent0 = '';
      if (this.$route.path === '/event-followers' || this.$route.path === '/event-likes') {
        paramEvent0 = '-ad';
      }
      if (this.tabsIndex) paramEvent0 = '-daily';

      let gaPlatform = '';
      if (this.$i18n.locale !== 'en') {
        if (this.COMMON.isiOS()) gaPlatform = 'ios';
        if (this.COMMON.isAndroid()) gaPlatform = 'adr';
      }

      let gaMultiLang = this.$i18n.locale !== 'en' ? `-${this.$i18n.locale}` : '';

      let pageParam = '';
      if (this.$route.path === '/') {
        pageParam = 'hp';
      } else if (
        this.$route.path === '/buy-instagram-followers'
        || this.$route.path === '/buy-instagram-likes'
      ) {
        pageParam = 'store';
      }

      // console.log(this.$route.path);

      if (this.$route.path === '/event-get') {
        this.$ga.event('insbuy', 'buy', 'paidlp-3');
      } else {
        if (this.$store.state.s2) {
          if (!this.tabsIndex) {
            var allNum = this.productPkgCurrentFollow.purchase_quantity + this.productPkgCurrentFollow.gives[0].quantity;
            switch (allNum) {
              case 100:
                this.$ga.event('insbuy', 'followerbuy', 'st100');
                break;
              case 750:
                this.$ga.event('insbuy', 'followerbuy', 'st750');
                break;
              case 1500:
                this.$ga.event('insbuy', 'followerbuy', 'st1500');
                break;
              case 3000:
                this.$ga.event('insbuy', 'followerbuy', 'st3000');
                break;
              case 5000:
                this.$ga.event('insbuy', 'followerbuy', 'st5000');
                break;
            }
          } else {
            var likesNum = this.productPkgListDailyVM.cycle_type + '*' + this.productPkgListDailyVM.dailyQuantity;
            switch (likesNum) {
              case '30*50':
                this.$ga.event('insbuy', 'dailyfbuy', 'st3*50');
                break;
              case '30*150':
                this.$ga.event('insbuy', 'dailyfbuy', 'st3*150');
                break;
              case '30*200':
                this.$ga.event('insbuy', 'dailyfbuy', 'st3*200');
                break;
              case '60*50':
                this.$ga.event('insbuy', 'dailyfbuy', 'st6*50');
                break;
              case '60*150':
                this.$ga.event('insbuy', 'dailyfbuy', 'st6*150');
                break;
              case '60*200':
                this.$ga.event('insbuy', 'dailyfbuy', 'st6*200');
                break;
              case '90*50':
                this.$ga.event('insbuy', 'dailyfbuy', 'st9*50');
                break;
              case '90*150':
                this.$ga.event('insbuy', 'dailyfbuy', 'st9*150');
                break;
              case '90*200':
                this.$ga.event('insbuy', 'dailyfbuy', 'st9*200');
                break;
            }
          }
        } else {
          this.$ga.event(
            'insbuy',
            'buy',
            `${pageParam}${gaPlatform}buy${param}${paramEvent0}${gaMultiLang}`
          );
        }


      }
    },


    // 圣诞
    handleScroll: function () {
      this.santaClausHide
        = document.querySelector('.footer-text').getBoundingClientRect().top
        < window.innerHeight * 1.1;
    },
    handle() {
      this.showbottombutton = true;
      const fun = this.handleScroll();
      this.COMMON.throttle(fun, 60, 100);

      if (this.screenWidth >= 769) return;
      // 滚动的高度
      let scrollH = window.pageYOffset;
      // 元素的高度的
      let eleH = this.$refs.pronbit.offsetHeight - 98;

      // 距离顶部的告诉
      let TopH = this.$refs.pronbit.getBoundingClientRect().top;

      if (TopH + scrollH + eleH < scrollH) { // 消失
        this.showbottombutton = false;
      } else { // 显示
        this.showbottombutton = true;
      }
    }
  }
};
</script>

<style scoped lang="scss" src="./view.scss"></style>

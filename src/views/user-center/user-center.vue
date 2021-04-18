<template>
  <div class="user" :class="{'on': changeAccountStatus, 'no-ins': accountList.length === 0 }">
    <div class="header-blank"></div>

    <!--info-->
    <div class="user-info"
         :class="{ 'less-2': accountList.length <= 2 }"
    >
      <div class="name-email">
        <h2>{{ $t('userCenter.tabs.profile.briefZone.hi') }} {{ profile.user_name }}, &nbsp;</h2>
        <h3>{{ profile.user_account }}</h3>
      </div>
      <!-- 有 id -->
      <div v-if="accountList.length !== 0" class="wrapper hasid">
        <!-- @click="accountChange" -->
        <div class="user-list-info">
          <div class="avatar title" title="Change or add Instagram account">
            <img :src="accountCurrent.profile_pic_url | avatarCal" alt="">
            <span :class="{'open': showIdList }" @click="showIdList = !showIdList"></span>
          </div>
          <div class="text">
            <h2>{{ accountCurrent.ins_account || 'Instagram info load error' }}</h2>
            <p>
              <span :title="`${accountCurrent.post.post_count} ${$t('global.instagramConcept.posts')}`">
                <b>{{ profilePosts }}</b>
                {{ $t('global.instagramConcept.posts') }}
              </span>
              <span :title="`${accountCurrent.followed_by} ${$t('global.instagramConcept.followers')}`">
                <b>{{ profileFollowers }}</b>
                {{ $t('global.instagramConcept.followers') }}
              </span>
              <span :title="`${accountCurrent.follow} ${$t('global.instagramConcept.following')}`">
                <b>{{ profileLikes }}</b>
                {{ $t('global.instagramConcept.following') }}
              </span>
            </p>
          </div>
        </div>
        <transition name="fade">
          <div v-if="showIdList" class="user-list-content">
            <div class="add-name">
              <h2>{{ $t('userCenter.tabs.profile.accountZone.title') }}</h2>
              <h3>{{ $t('userCenter.tabs.profile.accountZone.tip') }}</h3>
            </div>
            <div class="add-container">
              <div v-for="(unit, i) in accountList" :key="i"
                   :class="{ 'account-on': accountListIndex === i }"
                   class="unit"
                   @click="accountListSwitch(unit, i)"
              >
                <img :src="unit.profile_pic_url | avatarCal" alt="">
                <p>{{ unit.ins_account || 'Unknown' }}</p>
                <i class="delete"
                   :title="$t('userCenter.tabs.profile.accountZone.unbindBtn')"
                   @click.stop="deleteIns(unit, i)"
                ></i>
              </div>
              <div v-if="accountList.length !== 5" class="unit unit__add" @click="openInsSearchDialog">
                <img src="./img/user-center__btn_add.svg" alt="">
                <p>{{ $t('userCenter.accountZone.btnAdd') }}</p>
              </div>
            </div>
          </div>
        </transition>

        <!-- <div v-if="accountList.length === 1" class="btn" @click="accountChange">
          <button-purple
            :text="$t('userCenter.accountZone.btnChangeAccount')"
            :font-size="'size-14'" :square="true"
          />
        </div> -->
      </div>
      <!-- 无 id -->
      <div v-if="accountList.length === 0" class="wrapper">
        <div class="add-ins">
          <div class="add-ins__add-btn" @click="openInsSearchDialog">
            <img src="./img/user-center__btn_add.svg" alt="add btn">
          </div>
          <h2>{{ $t('userCenter.accountZone.noAccountTitle') }}</h2>
        </div>
      </div>
      <!-- accountList 列表 -->
      <transition name="fade-skeleton">
        <div v-if="changeAccountStatus" class="wrapper">
          <div class="account">
            <div v-for="(unit, i) in accountList" :key="i"
                 :class="{ 'account-on': accountListIndex === i }"
                 class="unit"
                 @click="accountListSwitch(unit, i)"
            >
              <div class="avatar">
                <img :src="unit.profile_pic_url | avatarCal" alt="avatar">
              </div>
              <p :title="unit.ins_account || 'Unknown'">{{ unit.ins_account || 'Unknown' }}</p>
            </div>
            <div v-if="accountList.length !== 5" class="unit unit__add" @click="openInsSearchDialog">
              <img class="add-icon" src="./img/user-center__btn_add.svg" alt="add icon">
              <p>{{ $t('userCenter.accountZone.btnAdd') }}</p>
            </div>
          </div>
        </div>
      </transition>
    </div>

    <!--tabs-->

    <div class="user-tabs">
      <div class="wrapper">
        <h2>Get Instagram Followers & Likes</h2>
        <div class="user-tabs__tabs">
          <div
            v-for="(unit, i) in tabs" :key="i"
            :class="{ 'on': tabsIndex === i }" class="unit"
            @click="tabSwitch(i)"
          >
            <p>{{ unit.text }}</p>
          </div>
        </div>

        <div class="country-select" v-if="tabsIndex === 0 && showCountrySelect">
          <h2>Country-Targeted:</h2>
          <div class="select-content">
            <span class="national-flag">
              <img v-if="iconUrl" :src="iconUrl" alt="">
            </span>
            <select v-model="countryFlagSelect">
              <option value="-1" selected="true">Global</option>
              <option v-for="item in regionList" :key="item.region_id" :value="item.region_id" >
                {{ item.name[0].txt }}
              </option>
            </select>
          </div>
        </div>

        <transition name="fade-tabs" mode="out-in">
          <div v-if="tabsIndex === 0" key="tab0" class="user-tabs__tabs_wrapper follow">
            <div class="user-tabs__container">
              <div class="pkg-container">
                <div class="pc">
                  <template v-if="!productPkgListLoading">
                    <div v-for="(pkg, i) in productPkgListFollow"
                       :key="i"
                       :class="{
                         'follow': pkg['product_type'] === 2,
                         'like': pkg['product_type'] === 1,
                         'selected': productPkgListFollowIndex === i,
                         'hot': pkg['promote_sale_type'] === 3,
                       }"
                       class="package"
                       @click="pkgCheck(pkg, i)"
                  >
                    <!--num-->
                    <span class="num">
                      <i class="num-i"></i>
                      <i class="cross"></i>
                      <b>
                        <span style="margin-bottom: 5px">{{ pkg['purchase_quantity'] }}</span>
                        <span>
                          <img style="vertical-align: bottom;" v-if="currentCountry.icon_url" :src="currentCountry.icon_url" alt="" width="18" height="18">
                          Followers
                        </span>
                      </b><span></span>
                    </span>

                    <!--gives mk 0-->
                    <!--<span v-if="pkg['gives'][0].quantity !== 0" class="likes">-->
                    <!--  <span>+ {{ pkg['gives'][0].quantity }} Likes</span><i></i>-->
                    <!--</span>-->

                    <!--gives mk 1-->
                    <span v-if="pkg['gives'][0].quantity !== 0" class="likes-mk-1">
                      <span style="background: transparent;color: #00A231">{{ pkg['gives'][0].quantity }} Free</span>
                    </span>

                    <!--price-->
                    <span v-if="pkg.payment_type === 1" class="coins">
                      <sup>{{ pkg.price | numToFixed }} coins</sup>
                      <sub>{{ pkg['original_price'] | numToFixed }} coins</sub>
                    </span>
                    <span v-if="pkg.payment_type === 2" class="coins">
                      <sup v-if="$i18n.locale === 'en'">
                        {{ $t('global.currencySymbol') }} {{ pkg.price_decimal | numToFixed }}
                      </sup>
                      <sup v-if="$i18n.locale !== 'en'">
                        {{ pkg.price_decimal | numToFixed }} {{ $t('global.currencySymbol') }}
                      </sup>
                      <!--<sub>{{ pkg['original_price_decimal'] | numToFixed }} USD</sub>-->
                    </span>

                    <div class="pkg-line"></div>
                    <div class="pkg-text">
                      <div>
                        <img src="./img/select01.svg" alt="">
                        <p>Real Followers</p>
                      </div>
                      <div>
                        <img src="./img/select01.svg" alt="">
                        <p>Drop Protection</p>
                      </div>
                      <div>
                        <img src="./img/select01.svg" alt="">
                        <p>Instant Delivery</p>
                      </div>
                      <div>
                        <img src="./img/select01.svg" alt="">
                        <p>24/7 Support</p>
                      </div>
                    </div>
                  </div>
                  </template>
                  <div v-if="productPkgListLoading" style="width: 100%;height: 420px;display: flex;justify-content: center;align-items: flex-start">
                    <img src="./img/loading-puff-black.svg" width="100" height="100" alt="">
                  </div>
                </div>
                <div class="mobile">
                  <template v-if="!productPkgListLoading" >
                    <div v-for="(pkg, i) in productPkgListFollow"
                       :key="i"
                       :class="{
                         'follow': pkg['product_type'] === 2,
                         'like': pkg['product_type'] === 1,
                         'selected': productPkgListFollowIndex === i,
                         'hot': pkg['promote_sale_type'] === 3,
                       }"
                       class="package"
                       @click="pkgCheck(pkg, i)"
                  >
                    <!--num-->
                    <!--<span class="num-m">-->
                    <!--  <i class="num-i"></i>-->
                    <!--  <span class="num-text-m">-->
                    <!--    <p class="top">-->
                    <!--      <b>{{ pkg['purchase_quantity'] }}</b><span> Followers</span>-->
                    <!--    </p>-->
                    <!--    &lt;!&ndash;<p class="bottom">&ndash;&gt;-->
                    <!--    &lt;!&ndash;  <span v-if="pkg['gives'][0].quantity !== 0" class="likes">&ndash;&gt;-->
                    <!--    &lt;!&ndash;    <span>+ {{ pkg['gives'][0].quantity }} Likes</span><i></i>&ndash;&gt;-->
                    <!--    &lt;!&ndash;  </span>&ndash;&gt;-->
                    <!--    &lt;!&ndash;</p>&ndash;&gt;-->
                    <!--  </span>-->
                    <!--</span>-->

                    <span class="circle"></span>

                    <span class="num">
                      <i class="num-i"></i>
                      <i class="cross"></i>
                      <b>{{ pkg['purchase_quantity'] }}</b><span></span>
                      <div class="item-flag" v-if="currentCountry.icon_url">
                                <img :src="currentCountry.icon_url" alt="">
                              </div>
                    </span>

                    <span v-if="pkg['gives'][0].quantity === 0" class="juli"></span>

                    <!--gives mk 1-->
                    <span v-if="pkg['gives'][0].quantity !== 0" class="plus">+</span>
                    <span v-if="pkg['gives'][0].quantity !== 0 && pkg['promote_sale_type'] !== 3" class="likes-mk-1">
                      <span style="background: transparent;color: #00A231">{{ pkg['gives'][0].quantity }}</span>
                    </span>

                    <span v-if="pkg['gives'][0].quantity !== 0 && pkg['promote_sale_type'] === 3" class="likes-mk-1 hotlike">
                      <i>Free</i>
                      <i>{{ pkg['gives'][0].quantity }}</i>
                    </span>

                    <!--price-->
                    <span v-if="pkg.payment_type === 1" class="coins">
                      <sup>{{ pkg.price | numToFixed }} coins</sup>
                      <sub>{{ pkg['original_price'] | numToFixed }} coins</sub>
                    </span>
                    <span v-if="pkg.payment_type === 2" class="coins">
                      <sup v-if="$i18n.locale === 'en'">
                        {{ $t('global.currencySymbol') }} {{ pkg.price_decimal | numToFixed }}
                      </sup>
                      <sup v-if="$i18n.locale !== 'en'">
                        {{ pkg.price_decimal | numToFixed }} {{ $t('global.currencySymbol') }}
                      </sup>
                      <!--<sub>{{ pkg['original_price_decimal'] | numToFixed }} USD</sub>-->
                    </span>
                  </div>
                  </template>

                  <div v-if="productPkgListLoading">
                      <div v-for="i in 4" :key="i" class="package skeleton">
                        <span class="num"><span class="s skeleton-bg"></span></span>
                        <span class="likes"><span class="s skeleton-bg"></span></span>
                        <span class="coins"><span class="s skeleton-bg"></span></span>
                      </div>
                    </div>
                </div>
              </div>
              <div v-if="productPkgListFollow.length === 0 && !productPkgListLoading">
                <list-empty :msg="$t('userCenter.error.OfferListEmpty')" />
              </div>
              <!--<div v-if="postList.length !== 0" id="mark-extra" class="pkg-extra">-->
              <!--  <h2>-->
              <!--    <span>-->
              <!--      Additional-->
              <!--      <b>{{ productPkgCurrentFollow['gives'] ? productPkgCurrentFollow['gives'][0]['quantity'] : 0 }}</b>-->
              <!--      free likes to your latest post-->
              <!--    </span>-->
              <!--  </h2>-->
              <!--  <div class="img">-->
              <!--    <img :src="postList[0].like_pic_url || ''" alt="">-->
              <!--  </div>-->
              <!--  <p><i></i><span> +{{ productPkgCurrentFollow['gives'] ? productPkgCurrentFollow['gives'][0]['quantity'] : 0 }}</span></p>-->
              <!--</div>-->
              <!-- <div v-if="accountList.length === 0">
                <list-empty :msg="$t('userCenter.error.noInsAccount')" />
              </div> -->
            </div>

            <div class="user-tabs__btn pc" @click="tabBottomBtnAction">
              <button-yellow-icon
                :text="$t('global.header.button.buyNow')"
                :loading="ajaxRequesting"
              />
            </div>
          </div>
          <div v-if="tabsIndex === 1" key="tab1" class="user-tabs__tabs_wrapper like">
            <div class="user-tabs__container">
              <div class="pkg-container">
                <div class="pc">
                  <div v-for="(pkg, i) in productPkgListLike" :key="i"
                       :class="{
                         'follow': pkg['product_type'] === 2,
                         'like': pkg['product_type'] === 1,
                         'selected': productPkgListLikeIndex === i,
                         'hot': pkg['promote_sale_type'] === 3,
                       }"
                       class="package"
                       @click="pkgCheck(pkg, i)"
                  >
                    <!--num-->
                    <span class="num">
                      <i class="num-i"></i>
                      <i class="cross"></i>
                      <b>
                        <span>{{ pkg['purchase_quantity'] }}</span>
                        <span>Likes</span>
                      </b>
                      <span></span>
                    </span>

                    <!--gives mk 1-->
                    <span v-if="pkg['gives'][0].quantity !== 0" class="likes-mk-1">
                      <span>+ {{ pkg['gives'][0].quantity }} OFF</span>
                    </span>

                    <!--<span v-if="pkg['gives'][0].quantity !== 0" class="likes">-->
                    <!--  <span>+ {{ pkg['gives'][0].quantity }} Follows</span><i></i>-->
                    <!--</span>-->

                    <!--price-->
                    <span v-if="pkg.payment_type === 1" class="coins">
                      <sup>{{ pkg.price | numToFixed }} coins</sup>
                      <sub>{{ pkg['original_price'] | numToFixed }} coins</sub>
                    </span>
                    <span v-if="pkg.payment_type === 2" class="coins">
                      <sup v-if="$i18n.locale === 'en'">
                        {{ $t('global.currencySymbol') }} {{ pkg.price_decimal | numToFixed }}
                      </sup>
                      <sup v-if="$i18n.locale !== 'en'">
                        {{ pkg.price_decimal | numToFixed }} {{ $t('global.currencySymbol') }}
                      </sup>
                    </span>

                    <div class="pkg-line"></div>
                    <div class="pkg-text">
                      <div>
                        <img src="./img/select01.svg" alt="">
                        <p>Real likes</p>
                      </div>
                      <div>
                        <img src="./img/select01.svg" alt="">
                        <p>Drop Protection</p>
                      </div>
                      <div>
                        <img src="./img/select01.svg" alt="">
                        <p>Instant Delivery</p>
                      </div>
                      <div>
                        <img src="./img/select01.svg" alt="">
                        <p>24/7 Support</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="mobile">
                  <div v-for="(pkg, i) in productPkgListLike" :key="i"
                       :class="{
                         'follow': pkg['product_type'] === 2,
                         'like': pkg['product_type'] === 1,
                         'selected': productPkgListLikeIndex === i,
                         'hot': pkg['promote_sale_type'] === 3,
                       }"
                       class="package"
                       @click="pkgCheck(pkg, i)"
                  >
                    <!--num-->
                    <!--<span class="num-m">-->
                    <!--  <i class="num-i"></i>-->
                    <!--  <span class="num-text-m">-->
                    <!--    <p class="top">-->
                    <!--      <b>{{ pkg['purchase_quantity'] }}</b><span> Likes</span>-->
                    <!--    </p>-->
                    <!--    &lt;!&ndash;<p class="bottom">&ndash;&gt;-->
                    <!--    &lt;!&ndash;  <span v-if="pkg['gives'][0].quantity !== 0" class="likes">&ndash;&gt;-->
                    <!--    &lt;!&ndash;    <span>+ {{ pkg['gives'][0].quantity }} Followers</span><i></i>&ndash;&gt;-->
                    <!--    &lt;!&ndash;  </span>&ndash;&gt;-->
                    <!--    &lt;!&ndash;</p>&ndash;&gt;-->
                    <!--  </span>-->
                    <!--</span>-->
                    <div class="like-item-left">
                      <span class="circle"></span>
                      <span class="num">
                        <i class="num-i"></i>
                        <i class="cross"></i>
                        <b>{{ pkg['purchase_quantity'] }}</b><span></span>
                      </span>
                    </div>

                    <!--gives mk 1-->
                    <span v-if="pkg['gives'][0].quantity !== 0" class="likes-mk-1">
                      <span>+ {{ pkg['gives'][0].quantity }}</span>
                    </span>

                    <!-- <span class="off-m">10% OFF</span> -->

                    <!--price-->
                    <span v-if="pkg.payment_type === 1" class="coins">
                      <sup>{{ pkg.price | numToFixed }} coins</sup>
                      <sub>{{ pkg['original_price'] | numToFixed }} coins</sub>
                    </span>
                    <span v-if="pkg.payment_type === 2" class="coins">
                      <sup v-if="$i18n.locale === 'en'">
                        {{ $t('global.currencySymbol') }} {{ pkg.price_decimal | numToFixed }}
                      </sup>
                      <sup v-if="$i18n.locale !== 'en'">
                        {{ pkg.price_decimal | numToFixed }} {{ $t('global.currencySymbol') }}
                      </sup>
                    </span>
                  </div>
                </div>
              </div>
              <div v-if="productPkgListLike.length === 0">
                <list-empty :msg="$t('userCenter.error.OfferListEmpty')" />
              </div>

              <div class="post-container">
                <h2 id="title-post-like" :class="{ 'error': postListTitle }">
                  <span>
                    {{ $t('store.buy.search.post.title.text') }}
                    <i>{{ $t('store.buy.search.post.title.error') }}</i>
                  </span>
                </h2>
                <div v-if="postList.length !== 0 && accountList.length !== 0">
                  <div class="post-list">
                    <div class="post-list-wrapper">
                      <div
                        v-for="(unit, i) in postList" :key="i"
                        :class="{ 'selected': postListIndex === i }"
                        class="img-container"
                        @click="postListSwitch(unit, i)"
                      >
                        <img :src="unit.like_pic_url" alt="post image">
                        <div class="mark">
                          <i></i>
                          <p>+{{ productPkgCurrentLike['purchase_quantity'] ? productPkgCurrentLike['purchase_quantity'] : 0 }}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!--load more-->
                  <a v-if="postListInfo.has_next_page && !postListLoading"
                     class="load-more" @click="postListNext"
                  >{{ $t('store.buy.search.post.loadMore.text') }}</a>
                  <!--loading-->
                  <p v-if="postListLoading" class="load-more loading">{{ $t('store.buy.search.post.loadMore.loading') }}</p>
                </div>
                <div v-if="!postListInfo.has_next_page" class="post-blank"></div>

                <div v-if="postList.length === 0 && accountList.length !== 0">
                  <list-empty :msg="$t('store.buy.error.noPost.text')" />
                </div>
                <div v-if="accountList.length === 0">
                  <list-empty :msg="$t('userCenter.error.noInsAccount')" />
                </div>
              </div>
            </div>

            <div class="user-tabs__btn pc" @click="tabBottomBtnAction">
              <button-yellow-icon
                :text="$t('global.header.button.buyNow')"
                :loading="ajaxRequesting"
              />
            </div>
          </div>
          <!-- task list -->
          <div v-if="tabsIndex === 2" key="tab2" class="user-tabs__tabs_wrapper profile">
            <div class="user-tabs__container">
              <div class="task">
                <!-- <h2 id="mark-task"><span>{{ $t('userCenter.tabs.profile.myTaskZone.title') }}</span></h2> -->
                <div class="task-container" :class="{ hasList: taskList.length !== 0}">
                  <template v-if="taskList && taskList.length !== 0">
                    <div v-for="(unit, i) in taskList" v-show="i < showNum" :key="i"
                         :class="{
                           'like': unit.task_type === 1,
                           'follow': unit.task_type === 2
                         }" class="unit"
                    >
                      <!--<img alt="task thumb"-->
                      <!--     :src="unit.task_type === 1 ? unit.like_pic_url : unit.follow_pic_url">-->
                      <img alt="task thumb"
                           :src="unit.task_type == 1 ? `https://www.instagram.com/p/${unit.short_code}/media/?size=m` : unit.follow_pic_url"
                           onerror="this.src = 'https://cdn.easygetinsta.com/static/en/img/icon_avatar_default.2c1fbc4e.svg'"
                      />

                      <div class="progress pc"
                           :class="{ 'full': unit['task_progress'] / unit['task_quantity'] === 1 }"
                      >
                        <p>
                          <!-- {{ $t('userCenter.tabs.profile.myTaskZone.taskListText') }}: -->
                          <span>{{ unit['task_progress'] }} / {{ unit['task_quantity'] }}
                            {{ unit.task_type === 1 ? 'Likes' : 'Followers' }}</span>
                          <!-- <i></i> -->
                        </p>
                        <div class="bar">
                          <i :style="{ width: unit['task_progress'] / unit['task_quantity'] * 100 + '%' }"></i>
                        </div>
                        <div class="time">{{ Number(unit.task_create_time + '000') | formatDate }}</div>
                        <div class="user-icon"></div>
                      </div>

                      <div class="progress mobile"
                           :class="{ 'full': unit['task_progress'] / unit['task_quantity'] === 1 }"
                      >
                        <div>
                          <!-- {{ $t('userCenter.tabs.profile.myTaskZone.taskListText') }}: -->
                          <span>{{ unit['task_progress'] }} / {{ unit['task_quantity'] }}
                            {{ unit.task_type === 1 ? 'Likes' : 'Followers' }}</span>
                          <!-- <i></i> -->
                          <div class="time">{{ Number(unit.task_create_time + '000') | formatDate }}</div>
                          <div class="user-icon" :class="{'like-user-icon': unit.task_type === 1}"></div>
                        </div>
                        <div class="bar">
                          <i :style="{ width: unit['task_progress'] / unit['task_quantity'] * 100 + '%' }"></i>
                        </div>
                      </div>
                    </div>
                  </template>
                  <div v-else class="no-task">
                    <h2>{{ $t('userCenter.tabs.profile.myTaskZone.title') }}</h2>
                    <div>
                      <img src="./img/dialog__icon_alert-gray.svg" />
                      <p>{{ $t('userCenter.tabs.profile.myTaskZone.taskListEmptyText') }}</p>
                    </div>
                  </div>

                  <!-- <list-empty
                    v-if="taskList.length === 0"
                    :msg="$t('userCenter.tabs.profile.myTaskZone.taskListEmptyText')"
                  /> -->
                </div>
              </div>
              <div v-if="taskList && (taskList.length > 10)" class="show-more" @click="showmore">{{ showMoreTest }}</div>
            </div>
          </div>
        </transition>
        <div v-if="tabsIndex !== 2" class="mobile mobile-buy-btn" @click="tabBottomBtnAction">
          <button-yellow-icon
            :text="$t('global.header.button.buyNow')"
            :font-size="'size-16'"
          />
        </div>
      </div>
    </div>

    <!--mobile-btn Buy Now-->
    <!-- <div class="control-btn__bottom-buy mobile"
         :class="{ 'on': bottomBtnOn }"
         @click="tabBottomBtnAction"
    >
      <button-yellow-icon
        :text="$t('global.header.button.buyNow')"
        :font-size="'size-16'"
      />
    </div> -->

    <!--Dialogs-->
    <transition name="fade">
      <div v-if="dialogSearchIns" key="diag3" class="uni-dialog-box enter-box enter-mask searchAlert">
        <div class="mask"></div>
        <div class="container">
          <i class="close" @click="closeDialog()"></i>
          <div class="content">
            <div class="model-box">
              <div class="title search-add-ins">
                <!-- <h3>{{ $t('userCenter.dialog.EnterUsername') }}</h3> -->
                <img src="./img/dialog__icon_alert.svg" alt="">
                <p>Please add an Instagram account FIRST.</p>
              </div>
              <div class="input">
                <label>
                  <input v-model="searchInsInput" type="text" placeholder="Your Instagram ID">
                </label>
              </div>
              <p v-if="dialogFailMsg" class="error-msg" v-html="dialogFailMsg"></p>
              <div class="btn" @click="searchIns">
                <button-purple
                  :text="$t('userCenter.dialog.Add')"
                  font-size="size-16" square :loading="searchInsLoading"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="dialogAddIns" key="diag4" class="uni-dialog-box enter-box enter-mask">
        <div class="mask"></div>
        <div class="container">
          <i class="close" @click="closeDialog()"></i>
          <div class="content">
            <div class="model-box">
              <div class="ins">
                <img :src="searchInsCache.profile_pic_url | avatarCal" alt="avatar">
                <p>{{ searchInsCache.ins_account }}</p>
              </div>
              <div class="btn" @click="addInsRequest">
                <button-purple
                  :text="$t('userCenter.dialog.Add')"
                  :font-size="'size-16'" :square="true" :loading="searchInsLoading"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 删除绑定的 ins id -->
      <div v-if="dialogDeleteIns" key="diag9" class="uni-dialog-box enter-box enter-mask dialogDeleteIns">
        <div class="mask"></div>
        <div class="container">
          <i class="close" @click="closeDialog()"></i>
          <div class="content">
            <div class="model-box">
              <h2>Delete This Account?</h2>
              <div class="ins">
                <img :src="deleteInsCache.profile_pic_url | avatarCal" alt="avatar">
                <p>{{ deleteInsCache.ins_account }}</p>
              </div>
              <div class="btn">
                <div @click="closeDialog()">
                  <button type="button">Cancel</button>
                </div>
                <div @click="deleteInsRequestPreCheck">
                  <button-red
                    text="Delete"
                    :font-size="'size-16'" :square="true" :loading="deleteInsLoading"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 自定义删除 id 窗口 -->
      <div v-if="customDeleteIns" key="diag99" class="uni-dialog-box enter-box enter-mask customDeleteIns">
        <div class="mask"></div>
        <div class="container">
          <i class="close" @click="closeDialog()"></i>
          <div class="content">
            <div class="model-box">
              <h2>Are you sure to remove this Instagram account?</h2>
              <div class="ins-warrper">
                <div class="ins">
                  <img :src="deleteInsCache.profile_pic_url | avatarCal" alt="avatar">
                  <p>{{ deleteInsCache.ins_account }}</p>
                </div>
                <div class="ins-tips">
                  <img src="./img/dialog__icon_alert.svg" />
                  <p>The account will be removed in 24 hours to ensure its security.</p>
                </div>
              </div>

              <div class="btn">
                <div @click="closeDialog()">
                  <button type="button">Cancel</button>
                </div>
                <div @click="deleteInsRequest">
                  <button-purple
                    text="Remove"
                    :font-size="'size-16'" :square="true" :loading="deleteInsLoading"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="dialogSuccess" key="diag0" class="uni-dialog-box enter-box enter-mask">
        <div class="mask"></div>
        <div class="container">
          <i class="close" @click="closeDialog()"></i>
          <div class="content">
            <div class="model-box success">
              <div class="title">
                <i class="icon"></i>
                <h3>{{ dialogSuccessTitle }}</h3>
              </div>
              <p class="note" v-html="dialogSuccessMsg"></p>
              <div class="btn" @click="closeDialog()">
                <button-purple
                  :text="$t('global.modelBox.btn.close')"
                  :font-size="'size-16'" :square="true"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="dialogInsAddSuccess" key="diag10" class="uni-dialog-box enter-box enter-mask">
        <div class="mask"></div>
        <div class="container">
          <i class="close" @click="closeDialogInsAddSuccess()"></i>
          <div class="content">
            <div class="model-box success">
              <div class="title">
                <i class="icon"></i>
                <h3>{{ dialogInsAddSuccessTitle }}</h3>
              </div>
              <p class="note" v-html="dialogInsAddSuccessMsg"></p>
              <div class="btn" @click="closeDialogInsAddSuccess()">
                <button-purple
                  :text="$t('global.modelBox.btn.close')"
                  :font-size="'size-16'" :square="true"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="dialogFail" key="diag1" class="uni-dialog-box enter-box enter-mask">
        <div class="mask"></div>
        <div class="container">
          <i class="close" @click="closeDialog()"></i>
          <div class="content">
            <div class="model-box alert">
              <div class="title">
                <i class="icon"></i>
                <h3>{{ $t('global.modelBox.title.oops') }}</h3>
              </div>
              <p class="note" v-html="dialogFailMsg"></p>
              <div class="btn" @click="closeDialog()">
                <button-purple
                  :text="$t('global.modelBox.btn.close')"
                  :font-size="'size-16'" :square="true"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="dialogFailLoading" key="diag6" class="uni-dialog-box enter-box enter-mask">
        <div class="mask"></div>
        <div class="container">
          <i class="close" @click="closeDialog()"></i>
          <div class="content">
            <div class="model-box alert">
              <div class="title">
                <i class="icon"></i>
              </div>
              <p class="note" v-html="dialogFailLoadingMsg"></p>
            </div>
          </div>
        </div>
      </div>
      <div v-if="dialogFailFirstAddIns" key="diag11" class="uni-dialog-box enter-box enter-mask">
        <div class="mask"></div>
        <div class="container">
          <i class="close" @click="closeDialog()"></i>
          <div class="content">
            <div class="model-box alert">
              <div class="title">
                <i class="icon"></i>
                <h3>{{ $t('global.modelBox.title.oops') }}</h3>
              </div>
              <p class="note" v-html="dialogFailFirstAddInsMsg"></p>
              <div class="btn" @click="openInsSearchDialogFirst()">
                <button-purple
                  :text="$t('userCenter.dialog.Add')"
                  :font-size="'size-16'" :square="true"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="dialogAttention" key="diag2" class="uni-dialog-box enter-box enter-mask">
        <div class="mask"></div>
        <div class="container">
          <i class="close" @click="closeDialog()"></i>
          <div class="content">
            <div class="model-box attention">
              <div class="title">
                <i class="icon"></i>
                <h3>{{ $t('global.model.title.wait') }}</h3>
              </div>
              <p class="note" v-html="dialogAttentionMsg"></p>
              <div class="btn" @click="closeDialog()">
                <button-purple
                  :text="$t('global.model.btn.close')"
                  :font-size="'size-16'" :square="true"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="dialogFailCoins" key="diag7" class="uni-dialog-box enter-box enter-mask">
        <div class="mask"></div>
        <div class="container">
          <i class="close" @click="closeDialog()"></i>
          <div class="content">
            <div class="model-box alert-coin">
              <div class="title">
                <i class="icon"></i>
              </div>
              <p class="note bold">
                You only have <b>{{ $store.state.userCoins }}</b> coins.
                <br>
                To publish a task, you need at least <b>{{ dialogFailCoinsLacked }} more</b> coins.
              </p>
              <p class="note absolute">Download app to get more coins now!</p>
              <div class="btn" @click="gaCoinLackAppDownload()">
                <button-yellow-download-coin text="Download APP Now" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="dialogFailCoinsLogged" key="diag8" class="uni-dialog-box enter-box enter-mask">
        <div class="mask"></div>
        <div class="container">
          <i class="close" @click="closeDialog()"></i>
          <div class="content">
            <div class="model-box alert-coin">
              <div class="title">
                <i class="icon"></i>
              </div>
              <p class="note bold">
                You only have <b>{{ $store.state.userCoins }}</b> coins.
                <br>
                To publish this task, you need <b>{{ dialogFailCoinsLacked }} more</b> coins.
              </p>
              <div class="btn" @click="gaCoinLackAppDownload()">
                <button-purple text="Go to Earn More Coins on App" :font-size="'size-16'" :square="true" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <!--Loading - PreparingInstagramData-->
    <transition name="fade-skeleton">
      <div v-if="globalLoadingMask" key="diag5" class="uni-dialog-box enter-box enter-mask">
        <div class="mask"></div>
        <div class="loading-progress-container">
          <div class="loading-progress">
            <i :style="{ width: loadingProgress }"></i>
          </div>
          <p>{{ $t('userCenter.dialog.PreparingInstagramData') }}</p>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
// import api from '@/api/api.account.js';
import apiAccount from '@/api/api.account';
import apiTask from '@/api/api.task';
import apiIns from '@/api/api.ins';
import apiPayment from '@/api/api.payment';
import apiInsServer from '@/api/api.ins.server';
import apiV2 from '@/api/api.v2.js';

import ListEmpty from '@/components/list/list-empty';
import ButtonPurple from '@/components/button/button-purple';
import ButtonYellowDownloadCoin from '@/components/button/button-yellow-download-coin';
import ButtonRed from '@/components/button/button-red';
import ButtonYellowIcon from '@/components/button/button-yellow-icon';

import defaultAvatar from '@/assets/images/global/icon_avatar_default.svg';

export default {
  name: 'User',
  components: {
    ButtonYellowIcon,
    ButtonRed,
    ButtonYellowDownloadCoin,
    ListEmpty,
    ButtonPurple
  },
  filters: {
    avatarCal: function (URL) {
      return URL ? URL : defaultAvatar;
    },
    numToFixed(num) {
      return num.toFixed(2);
    },
    formatDate: function (value) {
        let date = new Date(value);
        let y = date.getFullYear();
        let MM = date.getMonth() + 1;
        MM = MM < 10 ? ('0' + MM) : MM;
        let d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        let h = date.getHours();
        h = h < 10 ? ('0' + h) : h;
        let m = date.getMinutes();
        m = m < 10 ? ('0' + m) : m;
        let s = date.getSeconds();
        s = s < 10 ? ('0' + s) : s;
        return y + '-' + MM + '-' + d;
      }
  },
  data() {
    return {
      askNet: false, // 本字段控制页面支付方式是否为 askNet

      showNum: 10,
      showMoreTest: 'More Tasks',
      countryFlagSelect: -1,
      regionList: [],
      currentCountry: {
        icon_url: ''
      },
      showCountrySelect: false,
      productCountryList: [],
      showIdList: false,
      customDeleteIns: false,
      payMethodDisplay: 2,
      // 本字段控制页面显示何种支付方式的产品
      // 1 = 金币购买
      // 2 = 现金购买

      meta: {
        title: `${this.$store.state.productName}${this.$t('userCenter.meta.title-0')}`,
        canonical: this.$route.path
      },
      globalLoadingMask: false,
      ajaxRequesting: false,
      needGoToTask: false,

      bottomBtnOn: false,

      tabsIndex: 0,
      tabs: [
        { text: 'Get Followers' },
        { text: 'Get Likes' },
        { text: 'Task List' },
      ],

      errorObj: {},
      dialogSuccess: false,
      dialogSuccessTitle: '',
      dialogSuccessMsg: '',
      dialogInsAddSuccess: false,
      dialogInsAddSuccessTitle: '',
      dialogInsAddSuccessMsg: '',
      dialogFail: false,
      dialogFailMsg: '',
      dialogFailFirstAddIns: false,
      dialogFailFirstAddInsMsg: '',
      dialogAttention: false,
      dialogAttentionMsg: '',
      dialogSearchIns: false,
      dialogAddIns: false,
      dialogDeleteIns: false,
      dialogFailLoading: false,
      dialogFailLoadingMsg: '',
      dialogFailCoins: false,
      dialogFailCoinsLacked: 0,
      dialogFailCoinsLogged: false,

      firstEntryBeacon: false,

      searchInsInput: '',
      searchInsCache: {},
      searchInsLoading: false,

      deleteInsCache: {},
      deleteInsCacheIndex: 0,
      deleteInsLoading: false,

      profile: {
        user_name: '',
        user_account: '',
        coins: {
          count: 0
        }
      },

      changeAccountStatus: false,
      accountList: [],
      accountListIndex: 0,
      accountCurrent: {
        'ins_status': 1,
        'ins_id': '',
        'ins_account': '',
        'profile_pic_url': '',
        'followed_by': 0,
        'follow': 0,
        'post': {
          'post_count': 0
        }
      },

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

      productPkgList: [],
      productPkgListFollowIndex: -1,
      productPkgCurrentFollow: {},
      productPkgListFollowTitle: false,
      productPkgListLikeIndex: -1,
      productPkgCurrentLike: {},
      productPkgListLikeTitle: false,

      taskList: [],

      dataStored: {},
      dataStoredInsListIndex: 0,
      dataStoredInsLoadingTotal: 6,
      productPkgListLoading: false
    };
  },
  computed: {
    productPkgListDisplay: function () {
      const payMethodDisplay = this.payMethodDisplay;
      return this.productPkgList.filter(function (productPkg) {
        return productPkg['payment_type'] === payMethodDisplay
          && (productPkg['promote_sale_type'] === undefined
            || productPkg['promote_sale_type'] === 0
            || productPkg['promote_sale_type'] === 1
            || productPkg['promote_sale_type'] === 3);
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
    },
    loadingProgress() {
      const percent = (this.dataStoredInsListIndex + 1) / (this.dataStoredInsLoadingTotal + 1) * 100;
      return `${percent}%`;
    },
    profilePosts() {
      return this.accountCurrent.post ? this.COMMON.numberAbbreviations(this.accountCurrent.post.post_count) : 0;
    },
    profileFollowers() {
      return this.COMMON.numberAbbreviations(this.accountCurrent.followed_by);
    },
    profileLikes() {
      return this.COMMON.numberAbbreviations(this.accountCurrent.follow);
    },
    iconUrl: function() {
      let icon_url = this.currentCountry.icon_url;
      if(!icon_url && this.countryFlagSelect == -1) {
        icon_url = require('./img/earth.png');
      }
      return icon_url;
    }
  },
  watch: {
    $route() {
      this.meta.canonical = this.$route.path;
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
        this.getCountryProduct();
        // this.productPkgListLoading = false;
      } else if(oldVal != '' && newValue == -1) {
        this.productPkgListLoading = false;
        this.productPkgListFollowIndex = 0;
        this.currentCountry = {};
        let _this = this;
        this.productPkgListFollow.forEach(function(item, index) {
          if(item['promote_sale_type'] === 3) {
            _this.productPkgListFollowIndex = index;
            _this.productPkgCurrentFollow = item;
          }
        })
      }
    }
  },
  created() {
    this.initTabIndex();
  },
  mounted() {
    if(this.tabsIndex === 0) {
      this.getRegionList();
    }
    if (this.COMMON.getURLQuery('ins_test') === '1') {
      this.readUserInfo();
      this.getInfo();
    } else {
      this.detectiveGetInfo();
    }
  },
  methods: {
    /* ins支付测试 ins_test参数功用
    ins_test === 1
    功能1：“Buy Now”按钮跳转时无视白名单，跳转至iot /checkout页面
    功能2：进入页面后的数据拉取使用老接口“getInfo”
    */
    closeDialog() {
      this.dialogSuccess = false;
      this.dialogFail = false;
      this.dialogAttention = false;
      this.dialogSearchIns = false;
      this.dialogAddIns = false;
      this.searchInsLoading = false;
      this.dialogFailLoading = false;
      this.dialogFailCoins = false;
      this.dialogFailCoinsLogged = false;
      this.dialogDeleteIns = false;
      this.dialogInsAddSuccess = false;
      this.dialogFailFirstAddIns = false;
      this.customDeleteIns = false;

      if (this.needGoToTask) this.goToTask();
    },
    closeDialogInsAddSuccess() {
      this.dialogInsAddSuccess = false;
      this.firstEntryJump();
    },

    getRegionList() {
      var _this = this;
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
        let { list } = data.product;
        this.productCountryList = list;
        this.productPkgListLoading = false;
        this.productPkgCurrentFollow = list[0];
        if(this.countryFlagSelect != -1) {
          this.productPkgListFollowIndex = 0;
          let _this = this;
          list.forEach(function(item, index) {
            if(item.promote_sale_type === 3) {
              _this.productPkgCurrentFollow = item;
              _this.productPkgListFollowIndex = index;
              _this.productPkgCurrentFollow = item;
              return;
            }
          })
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

    showmore() {
      const num = this.taskList.length;
      if(num && num > 10) {
        this.showNum = this.showNum === 10 ? num : 10;
      }
      this.showMoreTest = this.showMoreTest === 'More Tasks' ? 'Less Tasks' : 'More Tasks';
    },
    anchor() {
      const anchor = this.$route.query.anchor;
      if (anchor === undefined || anchor === null || anchor === '') return;

      this.$scrollTo(`#mark-${anchor}`, { offset: -120 });

      const URL = this.COMMON.deleteURLQuery('anchor');
      window.history.replaceState({}, document.title, URL);
    },
    anchorBottomBtn() {
      if (!this.COMMON.isMobile()) return;

      if (this.tabsIndex === 0) {
        if (this.productPkgListFollowIndex !== -1) {
          this.bottomBtnOn = true;
          this.$scrollTo(`#mark-extra`, { offset: -60 });
        }
      } else if (this.tabsIndex === 1) {
        if (this.productPkgListLikeIndex !== -1) {
          this.$scrollTo(`#title-post-like`, { offset: -60 });
          if (this.postListIndex !== -1) {
            this.bottomBtnOn = true;
          }
        }
      }
    },
    bottomBtnDetective() {
      if (this.tabsIndex === 0) {
        this.bottomBtnOn = false;
      } else if (this.tabsIndex === 0) {
        this.bottomBtnOn = this.productPkgListFollowIndex !== -1;
      } else if (this.tabsIndex === 1) {
        this.bottomBtnOn = this.productPkgListLikeIndex !== -1 && this.postListIndex !== -1;
      }
    },

    // 绑定账户
    detectInsAccountNum() {
      if (this.accountList.length === 0) {
        this.openInsSearchDialog();
        this.firstEntryBeacon = true;
      }
    },
    openInsSearchDialog() {
      this.dialogSearchIns = true;
      this.dialogFailMsg = '';
      this.searchInsInput = '';
    },
    openInsSearchDialogFirst() {
      this.closeDialog();
      setTimeout(() => {
        this.openInsSearchDialog();
      }, 300);
    },
    searchIns() {
      if (!this.searchInsLoading && this.searchInsInput !== '') {
        this.searchInsLoading = true;
        this.$nuxt.$axios.post(
          apiInsServer.getAccountByUsername,
          this.COMMON.paramSign({ ins_account: this.searchInsInput })
        ).then((response) => {

          this.ajaxRequesting = false;
          this.globalLoadingMask = false;
          // this.dialogSearchIns = false;
          this.searchInsLoading = false;

          if (response.data.status !== 'ok') {
            // 查询不到 ins ID
            // setTimeout(() => {
            //   this.$alert(
            //     '', 'error',
            //     this.$t('global.modelBox.title.oops'),
            //     this.$t('store.buy.error.errorInsID.text'),
            //     'normal', 'Close'
            //   );
            // }, 300);
            let reg = new RegExp('<br>','g')
            this.dialogFailMsg = this.$t('store.buy.error.errorInsID.text').replace(reg,'');
            return;
          }

          const _sharedDataUser = response.data.content['graphql']['user'];
          const _sharedDataUserPosts = _sharedDataUser['edge_owner_to_timeline_media'];

          this.searchInsCache = {};

          this.searchInsCache.ins_id = _sharedDataUser.id;
          this.searchInsCache.ins_account = _sharedDataUser.username;
          this.searchInsCache.profile_pic_url = _sharedDataUser.profile_pic_url;
          this.searchInsCache.followed_by = _sharedDataUser['edge_followed_by']['count'];
          this.searchInsCache.follow = _sharedDataUser['edge_follow']['count'];
          this.searchInsCache.post = this.insPostTransform(_sharedDataUserPosts);

          this.addInsRequest();
        }).catch((error) => {
          // this.closeDialog();
          this.ajaxRequesting = false;
          this.globalLoadingMask = false;
          let reg = new RegExp('<br>','g')
          this.dialogFailMsg = this.$t('store.buy.error.errorRequest.text').replace(reg,'');
          // 请求 ins ID 报错
          // setTimeout(() => {
          //   this.$alert(
          //     '', 'error',
          //     this.$t('global.modelBox.title.oops'),
          //     this.$t('store.buy.error.errorRequest.text'),
          //     'normal', 'Close'
          //   );
          // }, 300);
          console.error('Catch Error: searchIns: ', error);
        });
      }
    },
    searchInsByInsServer() {
      if (!this.searchInsLoading && this.searchInsInput !== '') {
        this.searchInsLoading = true;
        this.$nuxt.$axios.get(
          `${apiIns.ins}${this.searchInsInput}`
        ).then((response) => {
          this.ajaxRequesting = false;
          this.globalLoadingMask = false;

          const responsePage = response.data;
          const _sharedDataStr = responsePage.match('window._sharedData = (.*);<\/script')[1];
          const _sharedData = JSON.parse(_sharedDataStr);
          const _sharedDataUser = _sharedData['entry_data']['ProfilePage'][0]['graphql']['user'];
          const _sharedDataUserPosts = _sharedDataUser['edge_owner_to_timeline_media'];
          // console.log(_sharedData);
          // console.log(_sharedDataUser);
          // console.log(this.dataStored.user.ins_account.accounts[this.dataStoredInsListIndex - 1]);
          // console.log(this.dataStored.user.ins_account.accounts);

          this.searchInsCache = {};

          this.searchInsCache.ins_id = _sharedDataUser.id;
          this.searchInsCache.ins_account = _sharedDataUser.username;
          this.searchInsCache.profile_pic_url = _sharedDataUser.profile_pic_url;
          this.searchInsCache.followed_by = _sharedDataUser['edge_followed_by']['count'];
          this.searchInsCache.follow = _sharedDataUser['edge_follow']['count'];
          this.searchInsCache.post = this.insPostTransform(_sharedDataUserPosts);

          this.searchInsLoading = false;
          this.addInsRequest();
        }).catch((error) => {
          this.closeDialog();
          this.ajaxRequesting = false;
          this.globalLoadingMask = false;
          this.dialogFailMsg = this.$t('store.buy.error.errorRequest.text');
          setTimeout(() => {
            this.dialogFail = true;
          }, 300);
          console.error('Catch Error: searchIns: ', error);
        });
      }
    },
    searchInsByServerOld() {
      if (!this.searchInsLoading && this.searchInsInput !== '') {
        this.searchInsLoading = true;
        this.$nuxt.$axios.post(
          apiAccount.getInsInfo,
          this.COMMON.paramSign(
            {
              'ins_account': this.searchInsInput
            }
          )
        ).then((response) => {
          // this.closeDialog();
          // console.log(response.data);
          if (response.data.status === 'ok') {
            // setTimeout(() => {
            //   this.dialogAddIns = true;
            // }, 300);
            this.searchInsCache = response.data['ins_info'];
            this.searchInsLoading = false;
            this.addInsRequest();
          } else {
            this.closeDialog();
            this.searchInsLoading = false;
            this.dialogFailMsg = 'Please enter valid username.';
            this.dialogFail = true;
          }
        }).catch((error) => {
          this.closeDialog();
          this.searchInsLoading = false;
          console.log('Catch Error: searchIns');
          console.warn(error);
        });
      }
    },
    addInsRequest() {
      if (!this.searchInsLoading) {
        this.searchInsLoading = true;

        this.$nuxt.$axios.post(
          apiAccount.setInsAccount,
          this.COMMON.paramSign(
            {
              'token': this.$storage.get('token'),
              'ins_id': this.searchInsCache.ins_id,
              'ins_account': this.searchInsCache.ins_account,
              'type': 1,
              'origin': 'web'
            }
          )
        ).then((response) => {
          // this.closeDialog();
          this.searchInsLoading = false;
          if (response.data.status === 'ok') {
            // debugger
            this.accountList.push(this.searchInsCache);
            let data = response.data.result;
            data.ins_account.accounts = this.accountList;
            this.updateInsList(data);
            this.closeDialog();
            // setTimeout(() => {
            //   this.dialogInsAddSuccessTitle = this.$t('global.modelBox.title.success');
            //   this.dialogInsAddSuccessMsg = this.$t('userCenter.msg.accountAddedSuccess');
            //   this.dialogInsAddSuccess = true;
            // }, 300);
          } else if (response.data.error !== undefined) {
            if (response.data.error.type === 'bad_token') {
              const msg = this.$t('global.modelBox.msg.loginExpired');
              this.redirectToLogin(msg);
            } else if (response.data.error.type === 'bad_ins_account') {
              this.dialogFailMsg = this.$t('userCenter.error.badInsAccount');
              // this.dialogFail = true;
            } else {
              this.dialogFailMsg = '<samp>'
                + '<b>Error Type:</b> ' + response.data.error.type
                + '<br>' + '<b>Error Message:</b> ' + response.data.error.message
                + '</samp>';
              // this.dialogFail = true;
            }
          } else {
            this.dialogFailMsg = 'Unknown error';
            // this.dialogFail = true;
          }
        }).catch((error) => {
          this.searchInsLoading = false;
          this.closeDialog();
          console.log('Catch Error: addInsRequest', error);
        });
      }
    },
    updateInsList(data) {
      // debugger
      this.renderInsList(data.ins_account);
      if (data['bind_reward']) this.renderHeaderUserCoins(data['bind_reward']);
    },
    firstEntryJump() {
      if (this.firstEntryBeacon) {
        this.tabSwitch(1);
        this.firstEntryBeacon = false;
      }
    },

    deleteIns(InsData, i) {
      this.deleteInsCache = InsData;
      this.deleteInsCacheIndex = i;
      this.dialogDeleteIns = true;
    },
    deleteInsRequestPreCheck() {
      this.dialogDeleteIns = false;
      setTimeout(() => {
        if (this.deleteInsCache.ins_status !== 3) {
          this.customDeleteIns = true;
          // this.$alert(
          //   '', 'error', '',
          //   this.$t('userCenter.msg.conFirmRemoveAccount'),
          //   '', 'Remove'
          // ).then(() => {
          //   this.deleteInsRequest();
          // }).catch();
        } else {
          const remainingTimeS = this.deleteInsCache['relieve_remaining_time'];
          const remainingTimeHour = Math.floor(remainingTimeS / 3600);
          this.$alert(
            '', 'info', '',
            `${this.$t('userCenter.msg.accountRemoved0')} ${remainingTimeHour} ${this.$t('userCenter.msg.accountRemoved1')}`,
            '', this.$t('global.modelBox.btn.close')
          ).catch();
        }
      }, 300);
    },
    deleteInsRequest() {
      if (!this.deleteInsLoading) {
        // this.deleteInsLoading = true;
        this.globalLoadingMask = true;
        this.$nuxt.$axios.post(
          apiAccount.setInsAccount,
          this.COMMON.paramSign(
            {
              'token': this.$storage.get('token'),
              'ins_id': this.deleteInsCache.ins_id,
              'ins_account': this.deleteInsCache.ins_account,
              'type': 2,
              'origin': 'web'
            }
          )
        ).then((response) => {
          this.closeDialog();
          this.globalLoadingMask = false;

          if (response.data.status === 'ok') {
            // Old：直接删除账户
            // this.accountList.splice(this.deleteInsCacheIndex, 1);
            // New：修改账户状态
            this.accountList[this.deleteInsCacheIndex].ins_status = 3;
            this.accountList[this.deleteInsCacheIndex].relieve_remaining_time = 86400;

            let data = response.data.result;
            data.ins_account.accounts = this.accountList;
            this.updateInsList(data);

          } else if (response.data.error !== undefined) {

            if (response.data.error.type === 'bad_token') {
              const msg = this.$t('global.modelBox.msg.loginExpired');
              this.redirectToLogin(msg);
            } else if (response.data.error.type === 'bad_ins_account') {
              this.$alert(
                '', 'error',
                this.$t('global.modelBox.title.oops'),
                this.$t('userCenter.error.accountHasBeenDeleted'),
                '', 'Close'
              ).catch();
            } else {
              this.$alert(
                '', 'error', '',
                `<samp><b>Error Type:</b>${response.data.error.type}<br><b>Error Message:</b>${response.data.error.message}</samp>`,
                '', 'Close'
              ).catch();
            }
          } else {
            this.$alert(
              '', 'error', '',
              `Unknown error, please try again later.`,
              '', 'Close'
            ).catch();
          }
        }).catch((error) => {
          this.globalLoadingMask = false;
          this.closeDialog();
          console.log('deleteInsRequest Error:', error);
        });
      }
    },

    initTabIndex() {
      const path = this.$route.path;
      if (path === '/user-get-followers') {
        this.tabsIndex = 0;
        this.meta.title = `${this.$store.state.productName}${this.$t('userCenter.meta.title-1')}`;
      } else if (path === '/user-get-likes') {
        this.tabsIndex = 1;
        this.meta.title = `${this.$store.state.productName}${this.$t('userCenter.meta.title-2')}`;
      } else {
        this.tabsIndex = 0;
        this.meta.title = `${this.$store.state.productName}${this.$t('userCenter.meta.title-0')}`;
      }
    },
    tabSwitch(i) {
      this.tabsIndex = i;
      // let originalPath = this.$route.path;
      // let destPath = '';
      // const insTestQuery = this.COMMON.getURLQuery('ins_test') === '1' ? '?ins_test=1' : '';
      // if (i === 0) {
      //   destPath = `/user-get-followers${insTestQuery}`;
      //   this.meta.title = `${this.$store.state.productName}${this.$t('userCenter.meta.title-1')}`;
      // } else if (i === 1) {
      //   destPath = `/user-get-likes${insTestQuery}`;
      //   this.meta.title = `${this.$store.state.productName}${this.$t('userCenter.meta.title-2')}`;
      // } else {
      //   destPath = `/user${insTestQuery}`;
      //   this.meta.title = `${this.$store.state.productName}${this.$t('userCenter.meta.title-0')}`;
      // }
      //
      // if (originalPath !== destPath) {
      //   this.$nuxt.$router.push({ path: destPath });
      // }

      this.bottomBtnDetective();
    },
    accountChange() {
      // this.changeAccountStatus = !this.changeAccountStatus;
      let gaLabel = '';
      if (this.tabsIndex === 0) {
        gaLabel = 'umpchange';
      } else if (this.tabsIndex === 1) {
        gaLabel = 'umfchange';
      } else if (this.tabsIndex === 2) {
        gaLabel = 'umlchange';
      }
      this.$ga.event('buttonclick', 'click', gaLabel);
    },
    accountListSwitch(unit, i) {
      if (i !== this.accountListIndex) {
        this.postListUpdateV2(unit, i);
      }
    },
    accountListSwitchCallback(unit, i) {
      this.accountListIndex = i;
      this.accountCurrent = unit;
      this.$storage.set('userInsAccountCurrent', unit);
      this.$storage.set('userInsAccountCurrentIndex', i);
      this.renderHeaderAvatar(unit.profile_pic_url);

      if (unit['post']) {
        this.renderPost(unit['post']);
      }
      this.postListIndex = -1;

      this.accountChange();
    },
    postListSwitch(unit, i) {
      this.postListIndex = i;
      this.postCurrent = unit;
      this.postListTitle = false;

      this.anchorBottomBtn();
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

      this.anchorBottomBtn();
    },
    pkgSelectedInit(pkgList) {
      let pkgLikeFirstNum = 0, pkgFollowFirstNum = 0, likesArr = [], followersArr = [];
      for (let unit of pkgList) {
        if (unit['product_type'] === 1 && unit['payment_type'] === 2 && (unit['promote_sale_type'] === 0 || unit['promote_sale_type'] === 1 || unit['promote_sale_type'] === 3)) { // like
          // pkgLikeFirstNum = unit['purchase_quantity'];
          // this.productPkgCurrentLike = unit;
          likesArr.push(unit);
        }
        if (unit['product_type'] === 2 && unit['payment_type'] === 2 && (unit['promote_sale_type'] === 0 || unit['promote_sale_type'] === 1 || unit['promote_sale_type'] === 3)) { // follow
          followersArr.push(unit);
          // pkgFollowFirstNum = unit['gives'][0]['quantity'];
          // if(this.countryFlagSelect == -1) {
          //   this.productPkgCurrentFollow = unit;
          // }
        }
        // if (pkgLikeFirstNum !== 0 && pkgFollowFirstNum !== 0) {
        //   break;
        // }
      }
      let _this = this;
      likesArr.forEach(function(item, index) {
        if(item.promote_sale_type === 3) {
          _this.productPkgCurrentLike = item;
          _this.productPkgListLikeIndex = index;
        }
      })
      followersArr.forEach(function(item, index) {
        if(item.promote_sale_type === 3) {
          _this.productPkgCurrentFollow = item;
          _this.productPkgListFollowIndex = index;
        }
      })
    },

    redirectToLogin(errorMsg) {
      this.renderHeaderAvatar(defaultAvatar);
      setTimeout(() => {
        this.dialogFailLoadingMsg = errorMsg;
        this.dialogFailLoading = true;
      }, 300);
      setTimeout(() => {
        this.$store.commit('loginChange', false);
        this.$router.replace({ path: '/login' });
      }, 2000);
    },

    // GetInfo 获取账号及Ins信息V1
    readUserInfo() {
      let dialogFailMsg;

      if (!this.$storage.has('user')
        || this.$storage.get('user') === null
        || typeof this.$storage.get('user').token !== 'string') {
        dialogFailMsg = 'No user data stored. <br> Redirecting to login page.';
        this.redirectToLogin(dialogFailMsg);
        return;
      }
      if (!this.$storage.has('productPkgList')) {
        dialogFailMsg = 'No product data stored. <br> Redirecting to login page.';
        this.redirectToLogin(dialogFailMsg);
        return;
      }

      let dataStored = {};
      dataStored.user = this.$storage.get('user');
      dataStored.user.coins.count = this.$storage.get('userCoins');
      dataStored.user.ins_account = this.$storage.get('userInsAccount');
      dataStored.product = this.$storage.get('productPkgList');
      this.renderPage(dataStored);
    },
    getInfo() {
      const token = this.$storage.get('token');
      if (token === undefined || token === null || token === '') {
        const dialogFailMsg = 'Login expired, <br> Redirecting to login page...';
        this.redirectToLogin(dialogFailMsg);
        return;
      }

      if (!this.ajaxRequesting) {
        this.ajaxRequesting = true;
        this.globalLoadingMask = true;
        this.$nuxt.$axios.post(
          apiAccount.getInfo,
          this.COMMON.paramSign({
            token: token
          })
        ).then((response) => {
          this.ajaxRequesting = false;
          setTimeout(() => {
            this.globalLoadingMask = false;
          }, 300);

          if (response.data.status === 'ok') {

            this.renderPage(response.data);
            // this.detectInsAccountNum();

          } else if (response.data.error !== undefined) {

            if (response.data.error.type === 'bad_token') {
              const msg = 'Login expired, redirecting to login page.';
              this.redirectToLogin(msg);

            } else if (response.data.error.type === 'bad_account') {
              this.dialogFailMsg = 'Couldn\'t find your account.';
              this.dialogFail = true;

            } else if (response.data.error.type === 'account_locked') {
              this.dialogFailMsg = 'This account has been locked.';
              this.dialogFail = true;

            } else {
              this.dialogFailMsg = '<samp>'
                + '<b>Error Type:</b> ' + response.data.error.type
                + '<br>' + '<b>Error Message:</b> ' + response.data.error.message
                + '</samp>';
              this.dialogFail = true;
            }
          } else {
            this.dialogFailMsg = 'Unknown error';
            this.dialogFail = true;
          }
        }).catch((error) => {
          this.ajaxRequesting = false;
          this.globalLoadingMask = false;
          this.dialogFailMsg = '<samp>'
            + '<b>Error Status:</b> ' + error.status
            + '<br>' + '<b>Error Message:</b> ' + error.statusText
            + '</samp>';
          this.dialogFail = true;
          console.log('Catch Error: getInfo');
          console.error(error);
        });
      }
    },
    renderPage(data) {
      this.renderInsList(data.user.ins_account);
      this.renderProductPkgList(data.product);
      this.renderProfile(data.user);
      this.renderTask(data.user['task']);
      this.renderHeaderUserName(data.user);
      this.renderHeaderUserCoins(data.user);

      setTimeout(() => {
        this.anchor();
      }, 500);

      // this.$nextTick(() => {
      //   this.detectInsAccountNum();
      // });
    },
    renderInsList(insObj) {
      if (insObj.count > 0) {
        this.accountList = insObj['accounts'];
        const storedIndex = this.$storage.has('userInsAccountCurrentIndex');

        if (storedIndex) {
          if (insObj.count - 1 < this.$storage.get('userInsAccountCurrentIndex')) {
            this.renderProfileCurrentInsAccount(insObj['accounts'][insObj.count - 1], insObj.count - 1);
          } else {
            const insCrtIndex = this.$storage.get('userInsAccountCurrentIndex');
            this.renderProfileCurrentInsAccount(insObj['accounts'][insCrtIndex], insCrtIndex);
          }
        } else {
          this.renderProfileCurrentInsAccount(insObj['accounts'][0], 0);
        }

        if (insObj['accounts'][this.accountListIndex]['post']) {
          this.renderPost(insObj['accounts'][this.accountListIndex]['post']);
          this.renderHeaderAvatar(insObj['accounts'][this.accountListIndex]['profile_pic_url']);
        } else {
          this.dialogFailMsg = 'Fail to get your Instagram account info, please try again later.';
          this.dialogFail = true;
          console.error('Server Ins Account Request Error. (Exceptional user.ins_account.accounts)');
        }
      } else {
        this.renderHeaderAvatar(defaultAvatar);
        this.ajaxRequesting = false;
        this.globalLoadingMask = false;
      }

      this.$storage.set('userInsAccount', insObj);
    },
    renderProfileCurrentInsAccount(userInsAccountCurrent, userInsAccountCurrentIndex) {
      this.accountCurrent = userInsAccountCurrent;
      this.accountListIndex = userInsAccountCurrentIndex;
      this.$storage.set('userInsAccountCurrent', userInsAccountCurrent);
      this.$storage.set('userInsAccountCurrentIndex', userInsAccountCurrentIndex);
    },
    renderProductPkgList(pkgList) {
      this.productPkgList = pkgList;
      if (pkgList.length > 0) this.pkgSelectedInit(pkgList);
      this.$storage.set('productPkgList', pkgList);
    },
    renderProfile(data) {
      this.profile.user_name = data.user_name;
      this.profile.user_account = data.user_account;
      this.profile.coins.count = data.coins.count;
    },
    renderTask(task) {
      this.taskList = this.sortKey(task, "task_create_time");

      this.taskList.map(taskItem => {
        let image = '';
        const match = this.accountList.some(account => {
          if (account.ins_account === taskItem.ins_account) {
            image = account.profile_pic_url;
            return true;
          }
        });
        if (match && taskItem.task_type === 2)
          taskItem.follow_pic_url = image;
      });
      // this.$storage.set('userTaskList', task);
    },
    sortKey(array, key) {
      return array.sort(function(a, b) {
        var x = a[key];
        var y = b[key];
        return x > y ? -1 : x < y ? 1 : 0;
      });
    },
    renderPost(postObj) {
      this.postList = postObj['post_list'];
      console.log(this.postList);
      this.renderPostListInfo(
        postObj.post_count,
        postObj.end_cursor,
        postObj.post_count > this.postListInfo.page_size
      );
    },
    renderPostListInfo(post_count, end_cursor, has_next_page) {
      let obj = {};
      obj.post_count = post_count;
      obj.end_cursor = end_cursor;
      obj.has_next_page = has_next_page;
      obj.page_size = this.postListInfo.page_size;
      this.postListInfo = obj;
    },
    renderHeaderAvatar(avatar) {
      this.$storage.set('userAvatar', avatar);
      this.$store.commit('userAvatar', avatar);
    },
    renderHeaderUserName(data) {
      this.$storage.set('userName', data.user_name);
      this.$store.commit('userName', data.user_name);
    },
    renderHeaderUserCoins(data) {
      this.$storage.set('userCoins', data.coins.count);
      this.$store.commit('userCoins', data.coins.count);
    },

    // GetInfo 获取账号及Ins信息V2(主动请求Ins服务器)
    // 数据请求与加工
    insInfoRequestByInsServer(insUsername) {
      // if (!this.ajaxRequesting) {
      // const insUsername = 'liuyu9045';

      this.dataStoredInsListIndex++;

      this.ajaxRequesting = true;
      this.globalLoadingMask = true;

      this.$nuxt.$axios.get(
        `${apiIns.ins}${insUsername}/`
      ).then((response) => {
        this.ajaxRequesting = false;
        this.globalLoadingMask = false;

        const responsePage = response.data;
        const _sharedDataStr = responsePage.match('window._sharedData = (.*);<\/script')[1];
        const _sharedData = JSON.parse(_sharedDataStr);
        const _sharedDataUser = _sharedData['entry_data']['ProfilePage'][0]['graphql']['user'];
        const _sharedDataUserPosts = _sharedDataUser['edge_owner_to_timeline_media'];
        // console.log(_sharedData);
        // console.log(_sharedDataUser);
        // console.log(this.dataStored.user.ins_account.accounts[this.dataStoredInsListIndex - 1]);
        // console.log(this.dataStored.user.ins_account.accounts);

        this.dataStored.user.ins_account.accounts[this.dataStoredInsListIndex - 1].profile_pic_url
          = _sharedDataUser.profile_pic_url || '';
        this.dataStored.user.ins_account.accounts[this.dataStoredInsListIndex - 1].followed_by
          = _sharedDataUser['edge_followed_by']['count'];
        this.dataStored.user.ins_account.accounts[this.dataStoredInsListIndex - 1].follow
          = _sharedDataUser['edge_follow']['count'];
        this.dataStored.user.ins_account.accounts[this.dataStoredInsListIndex - 1].post
          = this.insPostTransform(_sharedDataUserPosts);
        this.getInsInfoV2(this.dataStored.user.ins_account, this.dataStoredInsListIndex);

      }).catch((error) => {
        this.ajaxRequesting = false;
        this.globalLoadingMask = false;
        // this.dialogFailMsg = '<samp>'
        //   + '<b>Error Status:</b> ' + error.status
        //   + '<br>' + '<b>Error Message:</b> ' + error.statusText
        //   + '</samp>';
        this.dialogFailMsg = 'Request Instagram Data failed, please try again later.';
        this.dialogFail = true;
        console.error('Catch Error: insInfoRequestDirectly: ', error);
      });
      // }
    },
    insInfoRequestByServerV2(insUsername) {
      this.dataStoredInsListIndex++;

      this.ajaxRequesting = true;
      this.globalLoadingMask = true;

      this.$nuxt.$axios.post(
        apiInsServer.getAccountByUsername,
        this.COMMON.paramSign({ ins_account: insUsername })
      ).then((response) => {
        if (response.data.status !== 'ok') {
          this.ajaxRequesting = false;
          this.globalLoadingMask = false;
          let errorText = 'Request Instagram Data failed, please try again later.';
          if (response.data.error && response.data.error.type === 'limited_request') {
            errorText = 'Requesting Instagram Data times too much, please try again later.';
          }
          this.$alert('', 'error', 'Oops', errorText, 'normal', 'Close');
          return;
        }

        const _sharedDataUser = response.data.content['graphql']['user'];
        const _sharedDataUserPosts = _sharedDataUser['edge_owner_to_timeline_media'];
        // console.log(_sharedData);
        // console.log(_sharedDataUser);
        // console.log(this.dataStored.user.ins_account.accounts[this.dataStoredInsListIndex - 1]);
        // console.log(this.dataStored.user.ins_account.accounts);

        this.dataStored.user.ins_account.accounts[this.dataStoredInsListIndex - 1].profile_pic_url
          = _sharedDataUser.profile_pic_url || '';
        this.dataStored.user.ins_account.accounts[this.dataStoredInsListIndex - 1].followed_by
          = _sharedDataUser['edge_followed_by']['count'];
        this.dataStored.user.ins_account.accounts[this.dataStoredInsListIndex - 1].follow
          = _sharedDataUser['edge_follow']['count'];
        this.dataStored.user.ins_account.accounts[this.dataStoredInsListIndex - 1].post
          = this.insPostTransform(_sharedDataUserPosts);
          console.log(this.insPostTransform(_sharedDataUserPosts))
        this.getInsInfoV2(this.dataStored.user.ins_account, this.dataStoredInsListIndex);

      }).catch((error) => {
        this.ajaxRequesting = false;
        this.globalLoadingMask = false;
        this.$alert(
          '', 'error', 'Oops',
          'Request Instagram Data failed, please try again later.',
          'normal', 'Close'
        );
        console.error('Catch Error: insInfoRequestDirectly: ', error);
      });
      // }
    },
    getInfoV2() {
      const token = this.$storage.get('token');
      if (token === undefined || token === null || token === '') {
        const dialogFailMsg = 'Login expired, <br> Redirecting to login page...';
        this.redirectToLogin(dialogFailMsg);
        return;
      }

      if (!this.ajaxRequesting) {
        this.ajaxRequesting = true;
        setTimeout(() => {
          this.globalLoadingMask = true;
        }, 300);

        this.$nuxt.$axios.post(
          apiAccount.getInfoV2,
          this.COMMON.paramSign({
            token: token
          })
        ).then((response) => {

          if (response.data.status === 'ok') {

            this.dataStored = response.data;
            this.dataStoredInsLoadingTotal = response.data.user.ins_account.count;
            this.getInsInfoV2(response.data.user.ins_account, this.dataStoredInsListIndex);

          } else if (response.data.error !== undefined) {
            this.ajaxRequesting = false;
            this.globalLoadingMask = false;

            if (response.data.error.type === 'bad_token') {
              const msg = 'Login expired, redirecting to login page.';
              this.redirectToLogin(msg);

            } else if (response.data.error.type === 'bad_account') {
              this.dialogFailMsg = 'Couldn\'t find your account.';
              this.dialogFail = true;

            } else if (response.data.error.type === 'account_locked') {
              this.dialogFailMsg = 'This account has been locked.';
              this.dialogFail = true;

            } else {
              this.dialogFailMsg = '<samp>'
                + '<b>Error Type:</b> ' + response.data.error.type
                + '<br>' + '<b>Error Message:</b> ' + response.data.error.message
                + '</samp>';
              this.dialogFail = true;
            }
          } else {
            this.ajaxRequesting = false;
            this.globalLoadingMask = false;
            this.$alert('', 'error', 'Oops', 'Unknown error', 'normal', 'Close');
          }
        }).catch((error) => {
          this.ajaxRequesting = false;
          this.globalLoadingMask = false;
          this.$alert(
            '', 'error', 'Oops',
            `<b>Error Status:</b> ${error.status} <br> <b>Error Message:</b> ${error.statusText}`,
            'normal', 'Close'
          );
          console.log('Catch Error: getInfoV2');
          console.error(error);
        });
      }
    },
    getInsInfoV2(insAccountObj, dataStoredInsListIndex) {

      const insList = insAccountObj.accounts;
      const total = insAccountObj.count;

      if (dataStoredInsListIndex < total) {
        // this.insInfoRequestDirectly(insList[dataStoredInsListIndex].ins_account);
        this.insInfoRequestByServerV2(insList[dataStoredInsListIndex].ins_account);
      } else {
        this.ajaxRequesting = false;
        setTimeout(() => {
          this.globalLoadingMask = false;
        }, 300);

        this.renderPage(this.dataStored);
        // debugger
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
    // 数据流逻辑
    detectiveGetInfo() {
      const beacon = this.$storage.get('needGetInfo');
      const beaconExist = this.$storage.has('needGetInfo');
      // console.log(beacon);
      // console.log(beaconExist);
      if (beaconExist && beacon) {
        this.readUserInfoV2();
      } else {
        this.getInfoV2();
      }
    },
    readUserInfoV2() {
      this.$storage.remove('needGetInfo');

      let dialogFailMsg;

      if (!this.$storage.has('user')
        || this.$storage.get('user') === null
        || typeof this.$storage.get('user').token !== 'string') {
        dialogFailMsg = 'No user data stored. <br> Redirecting to login page.';
        this.redirectToLogin(dialogFailMsg);
        return;
      }
      if (!this.$storage.has('productPkgList')) {
        dialogFailMsg = 'No product data stored. <br> Redirecting to login page.';
        this.redirectToLogin(dialogFailMsg);
        return;
      }

      let dataStored = {};
      dataStored.user = this.$storage.get('user');
      // dataStored.user.coins.count = this.$storage.get('userCoins');
      // dataStored.user.ins_account = this.$storage.get('userInsAccount');
      dataStored.product = this.$storage.get('productPkgList');
      // debugger


      this.dataStored = dataStored;
      this.dataStoredInsLoadingTotal = dataStored.user.ins_account.count;

      setTimeout(() => {
        this.getInsInfoV2(dataStored.user.ins_account, this.dataStoredInsListIndex);
      }, 500);
    },

    // Bottom 按钮动作
    tabBottomBtnAction() {
      if (!this.tabBottomBtnPreCheck()) {
        return;
      }
      if (this.tabsIndex === 0) {// 关注
        if (this.productPkgListFollowIndex === -1) {
          this.productPkgListFollowTitle = true;
          this.$scrollTo('#title-pkg-follow', { offset: -200 });
          return;
        }

        // if (!this.accountCurrent.post) {
        //   this.dialogFailMsg = 'Fail to get your Instagram account info, please try again later.';
        //   this.dialogFail = true;
        //   return;
        // }
      }

      if (this.tabsIndex === 1) {// 点赞
        if (this.productPkgListLikeIndex === -1) {
          this.productPkgListLikeTitle = true;
          this.$scrollTo('#title-pkg-like', { offset: -200 });
          return;
        }

        if (!this.postCurrent.like_id) {
          this.postListTitle = true;
          this.$scrollTo('#title-post-like', { offset: -100 });
          return;
        }
      }

      // 金币/现金 支付
      if (this.payMethodDisplay === 1) {
        this.publish();
      } else if (this.payMethodDisplay === 2) {
        this.addToCart();
      }
    },
    tabBottomBtnPreCheck() {
      if (this.accountList.length === 0) {
        this.openInsSearchDialog()

        // this.dialogFailFirstAddInsMsg = this.$t('userCenter.error.addAccountFirst');
        // this.dialogFailFirstAddIns = true;

        return false;
      } else {
        return true;
      }
    },

    publish() {
      let param = {
        'token': this.$storage.get('token'),
        'locale': navigator.language,
        'ins_id': this.accountCurrent.ins_id,
        'ins_account': this.accountCurrent.ins_account
      };

      if (this.tabsIndex === 0) {// 关注
        param.product_id = this.productPkgCurrentFollow.product_id;
        param.task_type = 2;

        // param.gives = this.productPkgCurrentFollow['gives'];
        param.follow_pic_url = this.accountCurrent.profile_pic_url;
        param.post_count = this.accountCurrent.post.post_count;
        param.follower_count = this.accountCurrent.followed_by;
        param.following_count = this.accountCurrent.follow;

        if (this.postList.length > 1) {
          param.like_id = this.postList[0].like_id;
          param.like_pic_url = this.postList[0].like_pic_url;
          param.like_count = this.postList[0].like_count;
          param.short_code = this.postList[0].short_code;
        }

        this.$ga.event('buttonclick', 'click', 'umfpublish');
      }

      if (this.tabsIndex === 1) {// 点赞
        const post = this.postCurrent;

        param.product_id = this.productPkgCurrentLike.product_id;
        param.task_type = 1;
        param.like_id = post.like_id;
        param.like_pic_url = post.like_pic_url;
        param.short_code = post.short_code;
        param.like_count = this.productPkgCurrentLike['purchase_quantity'];

        this.$ga.event('buttonclick', 'click', 'umlpublish');
      }

      this.publishRequest(param);
    },
    publishRequest(param) {
      if (!this.ajaxRequesting) {
        this.ajaxRequesting = true;
        this.$nuxt.$axios.post(
          apiTask.publishTask,
          this.COMMON.paramSign(param)
        ).then((response) => {
          this.ajaxRequesting = false;
          // console.log(response);
          if (response.data.status === 'ok') {
            this.dialogSuccessTitle = 'Congratulations';
            this.dialogSuccessMsg = 'Task published successfully!';
            this.dialogSuccess = true;
            this.needGoToTask = true;

            this.updateTaskList(response.data['task']);
            this.profile.coins.count = response.data.coins.count;
            this.renderHeaderUserCoins(response.data);
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
          console.log('Catch Error: publishRequest');
          console.error(error);
        });
      }
    },
    updateTaskList(newTask) {
      this.taskList.unshift(newTask);
      // this.$storage.set('userTaskList', this.taskList);
    },
    coinsLackNumCal() {
      const firstLogin = this.$storage.get('user')['first_login'];
      if (firstLogin) {
        this.dialogFailCoinsLacked = 260;
        this.dialogFailCoins = true;
      } else {
        let price = 0;
        if (this.tabsIndex === 0) {
          price = this.productPkgCurrentFollow.price;
          this.$ga.event('inspop', 'pop', 'notenoughcoinsf');
        } else if (this.tabsIndex === 1) {
          price = this.productPkgCurrentLike.price;
          this.$ga.event('inspop', 'pop', 'notenoughcoinsl');
        }
        this.dialogFailCoinsLacked = price - this.profile.coins.count;
        this.dialogFailCoinsLogged = true;
      }
    },

    postListNext() {
      // let param = {
      //   id: this.accountCurrent.ins_id,
      //   first: this.postListInfo.page_size,
      //   after: this.postListInfo.end_cursor
      // };
      let param = {
        ins_id: this.accountCurrent.ins_id,
        page_size: this.postListInfo.page_size,
        end_cursor: this.postListInfo.end_cursor
      };
      // this.postListNextRequestV2(param);
      this.postListNextRequest(param);
    },
    postListNextRequest(param) {
      if (!this.postListLoading) {
        this.postListLoading = true;
        this.$nuxt.$axios.post(
          apiAccount.getInsPost,
          this.COMMON.paramSign(param)
        ).then((response) => {
          this.postListLoading = false;
          if (response.data.status === 'ok') {
            this.postList = [...this.postList, ...response.data.data.post['post_list']];
            this.renderPostListInfo(
              response.data.data.post['post_count'],
              response.data.data.post['page_info']['end_cursor'],
              response.data.data.post['page_info']['has_next_page']
            );
          } else if (response.data.error !== undefined) {
            if (response.data.error.type === 'bad_token') {
              const msg = 'Login expired, redirecting to login page.';
              this.redirectToLogin(msg);
            } else {
              this.dialogFailMsg = '<samp>'
                + '<b>Error Type:</b> ' + response.data.error.type
                + '<br>' + '<b>Error Message:</b> ' + response.data.error.message
                + '</samp>';
              this.dialogFail = true;
            }
          } else {
            this.dialogFailMsg = 'Unknown error';
            this.dialogFail = true;
          }
        }).catch((error) => {
          this.ajaxRequesting = false;
          this.dialogFailMsg = '<samp>'
            + '<b>Error Status:</b> ' + error.status
            + '<br>' + '<b>Error Message:</b> ' + error.statusText
            + '</samp>';
          this.dialogFail = true;
          console.log('Catch Error: postListNextRequest');
          console.error(error);
        });
      }
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

          this.dialogFailMsg = 'Request Instagram Data failed, please try again later.';
          this.dialogFail = true;
          console.error('Catch Error: postListNextRequestV2: ', error);
        });
      }
    },
    postListUpdate(unit, i) {
      let param = {
        ins_id: unit.ins_id,
        page_size: this.postListInfo.page_size,
        end_cursor: ''
      };
      if (!this.postListLoading) {
        this.globalLoadingMask = true;
        this.postListLoading = true;
        this.$nuxt.$axios.post(
          apiAccount.getInsPost,
          this.COMMON.paramSign(param)
        ).then((response) => {
          this.globalLoadingMask = false;
          this.postListLoading = false;
          if (response.data.status === 'ok') {
            this.postList = response.data.data.post['post_list'];
            this.renderPostListInfo(
              response.data.data.post['post_count'],
              response.data.data.post['page_info']['end_cursor'],
              response.data.data.post['page_info']['has_next_page']
            );
          } else if (response.data.error !== undefined) {
            if (response.data.error.type === 'bad_token') {
              const msg = 'Login expired, redirecting to login page.';
              this.redirectToLogin(msg);
            } else {
              this.dialogFailMsg = '<samp>'
                + '<b>Error Type:</b> ' + response.data.error.type
                + '<br>' + '<b>Error Message:</b> ' + response.data.error.message
                + '</samp>';
              this.dialogFail = true;
            }
          } else {
            this.dialogFailMsg = 'Unknown error';
            // this.dialogFail = true;
          }


          this.accountListSwitchCallback(unit, i);
        }).catch((error) => {
          this.globalLoadingMask = false;
          this.ajaxRequesting = false;
          this.dialogFailMsg = '<samp>'
            + '<b>Error Status:</b> ' + error.status
            + '<br>' + '<b>Error Message:</b> ' + error.statusText
            + '</samp>';
          // this.dialogFail = true;
          console.log('Catch Error: postListNextRequest');
          console.error(error);
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

    gaCoinLackAppDownload() {
      if (this.tabsIndex === 0) {
        this.$ga.event('insdl', 'download', 'pfappdl');
      } else if (this.tabsIndex === 1) {
        this.$ga.event('insdl', 'download', 'plappdl');
      }
      this.closeDialog();
    },

    goToTask() {
      this.tabSwitch(0);
      setTimeout(() => {
        this.$scrollTo('#mark-task', { offset: -100 });
      }, 800);
      this.needGoToTask = false;
    },
    gaProfileGet() {
      this.$ga.event('buttonclick', 'click', 'umpget');
    },

    addToCart() {
      let param = {
        'ins_id': this.accountCurrent.ins_id,
        'ins_account': this.accountCurrent.ins_account
      };

      if (this.tabsIndex === 0) { // 关注
        param.task_type = 2;
        param.product_id = this.productPkgCurrentFollow.product_id;
        param.purchase_quantity = this.productPkgCurrentFollow.purchase_quantity;
        param.price_decimal = this.productPkgCurrentFollow.price_decimal || 8.8;

        param.gives = this.productPkgCurrentFollow['gives'];
        param.follow_pic_url = this.accountCurrent.profile_pic_url;
        param.post_count = this.accountCurrent.post.post_count;
        param.follower_count = this.accountCurrent.followed_by;
        param.following_count = this.accountCurrent.follow;

        param.product_type = 2;
        param.cycle_type = 1;

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
        this.$ga.event('insbuy', 'buy', 'umfbuy');
      }

      if (this.tabsIndex === 1) { // 点赞
        const post = this.postCurrent;

        param.task_type = 1;
        param.product_id = this.productPkgCurrentLike.product_id;
        param.purchase_quantity = this.productPkgCurrentLike.purchase_quantity;
        param.price_decimal = this.productPkgCurrentLike.price_decimal || 8.8;

        param.like_id = post.like_id;
        param.like_pic_url = post.like_pic_url;
        param.short_code = post.short_code;
        param.like_count = this.productPkgCurrentLike['purchase_quantity'];

        param.product_type = 1;
        param.cycle_type = 1;

        this.$ga.event('insbuy', 'buy', 'umlbuy');
      }

      // this.initGeoIPWhiteList(param);
      this.transportCartUnitData(param);
    },
    transportCartUnitData(param) {
      this.$storage.set('cartUnit', param);
      // this.$store.commit('cartUnit', param);

      const query = this.COMMON.envTest() ? { env_test: '1' } : {};
      this.$nuxt.$router.push({ path: '/checkout', query: query });
    },
    // 获取白名单
    initGeoIPWhiteList(param) {
      console.log(param);
      if (this.ajaxRequesting) return;
      this.ajaxRequesting = true;
      this.$nuxt.$axios.post(
        apiPayment.getCheckoutMethod,
        this.COMMON.paramSign({
          client_lan: this.$i18n.locale
        })
      ).then((response) => {
        if (response.data.status === 'ok') {
          // console.log(response.data['checkout_method']);

          // if (this.COMMON.getURLQuery('ins_test') === '1') {
          //   this.sendCheckoutInfo(param);
          // } else {
          //
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

          if (response.data['checkout_method'] === 1) {
            this.shopifyPay();
            // console.log(111k);
          } else {
            this.transportCartUnitData(param);
          }

          // Shopify
          // if (this.shopify) {
          //   this.shopifyPay();
          //   return;
          // }

        } else {
          this.ajaxRequesting = false;
          this.$alert(
            '', 'error', 'Sorry',
            'Something wrong with checking payment method, please try later.',
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
      });
    },
    // 使用安卓发起支付接口2-6，发起Stripe支付
    sendCheckoutInfo(param) {
      let paramCheckout = {};
      paramCheckout.tasks = [];
      paramCheckout.tasks.push(param);

      paramCheckout.token = this.$storage.get('token');
      paramCheckout.lan = '';
      paramCheckout.show_header = 1;
      paramCheckout.origin = 'web';
      paramCheckout.locale = navigator.language;

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
        console.log('initGeoIPWhiteList Error:', error);
      });
    },


    // askNet 跳转支付
    askNetPay() {
      let param = {
        'token': this.$storage.get('token'),
        'locale': navigator.language,
        'tasks': {
          'ins_id': this.accountCurrent.ins_id,
          'ins_account': this.accountCurrent.ins_account
        }
      };

      if (this.tabsIndex === 0) {// 关注
        param.tasks.product_id = this.productPkgCurrentFollow.product_id;
        param.tasks.task_type = 2;

        // param.gives = this.productPkgCurrentFollow['gives'];
        param.tasks.follow_pic_url = this.accountCurrent.profile_pic_url;
        param.tasks.post_count = this.accountCurrent.post.post_count;
        param.tasks.follower_count = this.accountCurrent.followed_by;
        param.tasks.following_count = this.accountCurrent.follow;

        if (this.postList.length > 1) {
          param.tasks.like_id = this.postList[0].like_id;
          param.tasks.like_pic_url = this.postList[0].like_pic_url;
          param.tasks.like_count = this.postList[0].like_count;
          param.tasks.short_code = this.postList[0].short_code;
        }

        // this.$ga.event('buttonclick', 'click', 'umfpublish');
      }

      if (this.tabsIndex === 1) {// 点赞
        const post = this.postCurrent;

        param.tasks.product_id = this.productPkgCurrentLike.product_id;
        param.tasks.task_type = 1;
        param.tasks.like_id = post.like_id;
        param.tasks.like_pic_url = post.like_pic_url;
        param.tasks.short_code = post.short_code;
        param.tasks.like_count = this.productPkgCurrentLike['purchase_quantity'];

        // this.$ga.event('buttonclick', 'click', 'umlpublish');
      }

      this.askNetPayRequest(param);
    },
    askNetPayRequest(param) {
      if (!this.ajaxRequesting) {
        this.ajaxRequesting = true;
        console.log(param);
        this.$nuxt.$axios.post(
          apiTask.askNetPay,
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
          console.log('Catch Error: publishRequest');
          console.error(error);
        });
      }
    },

    // Shopify 跳转支付
    // 注意task结构体中的insInfo对象名（与Store页面不同）
    shopifyPay() {
      let param = {
        'token': this.$storage.get('token'),
        'locale': navigator.language,
        'tasks': {
          'ins_id': this.accountCurrent.ins_id,
          'ins_account': this.accountCurrent.ins_account
        },
        'ads': {
          's': this.$route.query.s || '',
          'c': this.$route.query.c || '',
          'k': this.$route.query.k || ''
        }
      };

      if (this.tabsIndex === 0) {// 关注
        param.tasks.product_id = this.productPkgCurrentFollow.product_id;
        param.tasks.task_type = 2;

        // param.gives = this.productPkgCurrentFollow['gives'];
        param.tasks.follow_pic_url = this.accountCurrent.profile_pic_url;
        param.tasks.post_count = this.accountCurrent.post.post_count;
        param.tasks.follower_count = this.accountCurrent.followed_by;
        param.tasks.following_count = this.accountCurrent.follow;

        if (this.postList.length > 1) {
          param.tasks.like_id = this.postList[0].like_id;
          param.tasks.like_pic_url = this.postList[0].like_pic_url;
          param.tasks.like_count = this.postList[0].like_count;
          param.tasks.short_code = this.postList[0].short_code;
        }
      }

      if (this.tabsIndex === 1) {// 点赞
        const post = this.postCurrent;

        param.tasks.product_id = this.productPkgCurrentLike.product_id;
        param.tasks.task_type = 1;
        param.tasks.like_id = post.like_id;
        param.tasks.like_pic_url = post.like_pic_url;
        param.tasks.short_code = post.short_code;
        param.tasks.like_count = this.productPkgCurrentLike['purchase_quantity'];
      }

      // console.log(param);
      this.shopifyPayRequest(param);
    },
    shopifyPayRequest(param) {
      // console.log(param)
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
        console.log('shopifyPayRequest Error:', error);
      });
      // }
    }
  }
};
</script>

<style lang="scss" scoped>
.user {
  padding-bottom: 140px;

  .wrapper {
    width: 1200px;
  }

  .user-info {
    padding-top: 40px;
    // height: 300px;
    background-color: #F8F8F8;
    transition: all 0.3s;

    .wrapper {
      padding: 0 24px;
    }

    .avatar, .text, .btn {
      display: inline-block;
      vertical-align: middle;
    }

    .avatar {
      position: relative;
      z-index: 1;
      width: 80px;
      height: 80px;
      cursor: pointer;

      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        object-fit: cover;
      }

      &.title {
        &:after {
          position: absolute;
          right: 0;
          bottom: 0;
          display: block;
          content: "";
          width: 28px;
          height: 28px;
          background: url("~@/views/user-center/img/user-center__icon_change-account.svg") no-repeat center;
          background-size: contain;
          transition: all 0.5s;
        }
      }
    }

    .text {
      margin-left: 34px;
      width: 458px;

      h2, b {
        font: 500 24px Montserrat;
        color: #2A2A2A;
      }

      h2, p {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        cursor: default;
      }

      p {
        margin-top: 6px;
        width: 100%;
        font: 500 16px Montserrat;
        color: #A8A8A8;

        span {
          margin-left: 30px;
          margin-right: 6px;
          display: inline-block;

          &:first-child {
            margin-left: 0;
          }
        }
      }
    }

    .btn {
      margin-left: 20px;
      width: 160px;
      height: 52px;
    }

    .account {
      margin-top: 64px;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-evenly;
      opacity: 0;
      transition: all 0.3s;

      .unit {
        width: 90px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-direction: column;
        cursor: pointer;

        .avatar {
          position: relative;
          padding: 2px;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 90px;
          height: 90px;
          border: 2px solid transparent;
          border-radius: 50%;
          transition: all 0.3s;

          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 50%;
          }

          &:before {
            position: absolute;
            top: -26px;
            left: 0;
            right: 0;
            margin: auto;
            display: block;
            width: 18px;
            height: 12px;
            background: url("~@/views/user-center/img/user-center__icon_selected.svg") no-repeat;
            background-size: contain;
            opacity: 0;
            transform: translateY(-20px);
            transition: all 0.3s;
            content: "";
          }
        }

        p {
          margin-top: 6px;
          width: 100%;
          word-break: break-all;
          font: 500 16px/20px Montserrat;
          color: #2A2A2A;
          text-align: center;
          @include text-ellipsis-multi(2);
        }

        &:hover {
          .avatar {
            border: 2px solid rgba(0, 101, 255, 0.3);
          }
        }

        &.account-on {
          cursor: default;

          .avatar {
            border: 2px solid #005FFF;
            cursor: default;

            &:before {
              opacity: 1;
              transform: translateY(0);
            }
          }
        }
      }
    }

    .add-ins {
      width: 100%;
      text-align: center;

      h2 {
        font: 600 30px/40px Montserrat;
        color: #2A2A2A;
      }

      .add-ins__add-btn {
        margin-top: 40px;
        display: inline-block;
        border-radius: 50%;
        overflow: hidden;
        cursor: pointer;
        font-size: 0;
        width: 80px;
        height: 80px;

        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          object-fit: cover;
        }
      }
    }
  }

  .user-tabs {
    margin-top: -140px;
    transform: translateY(0);

    .user-tabs__tabs {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 55px;
      text-align: center;

      .unit {
        margin: 0 2px;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 250px;
        height: 100%;
        background-color: #EAECF3;
        border-radius: 12px 12px 0 0;
        text-align: center;
        cursor: pointer;

        font: 500 20px Montserrat;
        letter-spacing: 0;
        color: #2A2A2A;

        &.on {
          background-color: #fff;
          color: #005FFF;
        }
      }
    }

    .user-tabs__tabs_wrapper {
      &.like {
        .user-tabs__container {
          padding-bottom: 0;
        }
      }
    }

    .user-tabs__container {
      padding: 42px 0 60px;
      background: #FFFFFF;
      box-shadow: 0 0 20px #00136112;
      border-radius: 12px;

      h2 {
        font-size: 0;

        span {
          font: 600 28px/34px Montserrat;
          color: #2A2A2A;
          vertical-align: middle;
        }

        i {
          margin-left: 10px;
          display: inline-block;
          font-size: 22px;
          color: #FF3A3A;
          opacity: 0;
          transform-origin: left center;
          vertical-align: middle;
        }

        &.error {
          i {
            animation: 0.5s title-error-show 0.5s ease forwards;
          }
        }

        @keyframes title-error-show {
          0% {
            opacity: 0;
            transform: scale(0);
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
      }

      hr {
        margin: 60px 50px;
        border-top: 1px solid #E5E5E5;
      }

      .info, .add, .task, .package, .pkg-container, .pkg-extra, .post-container {
        padding: 0 50px;
      }

      .info {
        text-align: center;

        h3 {
          margin-top: 6px;
          font: 500 16px/19px Montserrat;
          color: #A8A8A8;
        }

        p {
          margin-top: 26px;
          font: 400 16px/20px Montserrat;
          color: #2A2A2A;

          b {
            margin: 0 10px;
            font-weight: 600;
            color: #FF8000;
          }
        }

        .btn {
          margin-top: 46px;
          display: inline-block;
          width: 344px;
          height: 60px;
        }
      }

      .add {
        text-align: center;

        h3 {
          margin-top: 6px;
          font: 500 16px/20px Montserrat;
          color: #A8A8A8;
        }

        .add-container {
          margin-top: 55px;
          display: flex;
          justify-content: flex-start;
          align-items: flex-start;

          .unit {
            position: relative;
            margin: 0 30px;
            width: 86px;
            text-align: center;

            img {
              width: 80px;
              height: 80px;
              border-radius: 50%;
              object-fit: cover;
            }

            p {
              margin-top: 10px;
              word-break: break-all;
              font: 500 16px/20px Montserrat;
              color: #2A2A2A;

              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;
              overflow: hidden;
            }

            i.delete {
              position: absolute;
              right: 0;
              top: 80-24px;
              display: block;
              width: 24px;
              height: 24px;
              background: url("~@/views/user-center/img/user-center__btn_remove.svg") no-repeat center;
              background-size: contain;
              cursor: pointer;

              &:hover {
                filter: contrast(200%);
              }

              &:active {
                filter: contrast(100%);
              }
            }

            &.unit__add {
              cursor: pointer;

              &:hover {
              }
            }

          }
        }
      }

      .task {
        padding: 0;

        h2 {
          margin-bottom: 50px;
          padding: 0 50px;
        }

        .task-container {
          .unit {
            position: relative;
            padding: 20px 50px;
            height: 120px;
            background-color: #F2F3F9;

            img {
              position: absolute;
              top: 20px;
              left: 50px;
              width: 80px;
              height: 80px;
              border-radius: 50%;
              object-fit: cover;
            }

            .progress {
              padding-left: 118px;
              padding-top: 12px;
              display: inline-block;
              width: 100%;

              p {
                position: relative;
                font: 600 20px/24px Montserrat;
                color: #2A2A2A;

                span {
                  margin-left: 12px;
                  color: #A8A8A8;
                  font-weight: 500;
                }

                i {
                  position: absolute;
                  right: 0;
                  top: 0;
                  display: inline-block;
                  width: 34px;
                  height: 28px;
                  background-size: contain;
                  background-repeat: no-repeat;
                }
              }

              .bar {
                position: relative;
                margin-top: 18px;
                width: 100%;
                height: 14px;
                background-color: #D9DBE6;
                border-radius: 7px;
                overflow: hidden;

                i {
                  position: absolute;
                  top: 0;
                  left: 0;
                  height: 100%;
                  background-color: #7C56FF;
                  border-radius: 7px;
                  transition: all 0.8s cubic-bezier(0.77, 0, 0.175, 1);
                }
              }

              &.full {
                p {
                  span {
                    color: #00D478;
                  }
                }

                .bar {
                  i {
                    background-color: #00D674;
                  }
                }
              }
            }

            &.like {
              .progress {
                p {
                  i {
                    background-image: url("img/user__task_icon_like.svg");
                  }
                }
              }
            }

            &.follow {
              .progress {
                p {
                  i {
                    background-image: url("img/user__task_icon_follow.svg");
                  }
                }
              }
            }
          }
        }
      }

      .post-container {
        margin-top: 64px;
      }
    }

    .user-tabs__btn {
      margin-top: 30px;
      width: 100%;
      height: 80px;
    }
  }

  &.on {
    .user-info {
      height: 300px+200;

      .avatar {
        &:after {
          transform: rotate(180deg);
        }
      }

      .account {
        opacity: 1;
      }
    }
  }

  &.no-ins {
    .user-info {
      // height: 400px;
    }
  }
}

.error-msg {
  font: normal normal 500 14px/14px BalooChettan!important;
  color: #ED2C5B;
  text-align: left;
  width: 100%;
  margin: 0 auto;
  margin-top: 3px;
}

@media (min-width: 769px) {
  .user {
    padding-bottom: 0;
    background-color: #f8f8f8;;
  }
  .show-more {
    width: 100%;
    font: 600 20px/50px Montserrat;
    color: #2a2a2a;
    text-align: center;
    text-decoration: underline;
    transition: all .1s;
    cursor: pointer;
    &:hover {
      color: #005fff;
    }
  }
  .user-info {
    // min-height: 400px!important;
    margin-bottom: 50px;
    .name-email {
      width: 1200px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      padding-left: 150px;
      margin-bottom: 35px;
      h2 {
        font: normal normal 500 16px/20px BalooChettan;
        color: #000000;
      }
      h3 {
        font: normal normal 500 14px/20px BalooChettan;
        color: #B1B1B1;
      }
    }
    .wrapper {
      .add-ins {
        width: 1120px;
        height: 140px;
        border-radius: 12px;
        background-color: #fff;
        display: flex;
        align-items: center;
        .add-ins__add-btn {
          margin-top: 0;
          width: 60px;
          height: 60px;
          margin-left: 115px;
          margin-right: 22px;
        }
        h2 {
          font: normal normal 600 16px/30px BalooChettan;
          color: #000000;
        }
      }
    }
    .hasid {
      min-height: 140px;
      background-color: #fff;
      padding-top: 20px!important;
      padding-bottom: 20px!important;
      overflow: hidden;
      width: 1120px;
      border-radius: 12px;
      .user-list-info {
        display: flex;
        align-items: center;
        padding-left: 115px!important;
      }
      .avatar {
        width: 84px;
        height: 84px;
        border: 6px solid #EEEDFD;
        border-radius: 100%;
        position: relative;
        span {
          display: inline-block;
          width: 37px;
          height: 37px;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          bottom: -23px;
          background: url('./img/arrow.svg') no-repeat;
          background-size: 100% 100%;
          transition: all 0.08s;
          &.open {
            background: url('./img/arrow-top.svg') no-repeat;
            background-size: 100% 100%;
          }
        }
        &::after {
          content: none!important;
        }
      }
      .text {
        h2 {
          font: normal normal 600 18px/30px BalooChettan;
          color: #000000;
        }
        p {
          span {
            font: normal normal 500 16px/30px BalooChettan;
            color: #4D4D4D;
            b {
              font: normal normal 600 18px/30px BalooChettan;
              color: #000000;
              margin-right: 5px;
            }
          }
        }
      }
      .user-list-content {
        width: 100%;
        height: 140px;
        background: #F4F6FC;
        border-radius: 8px;
        position: relative;
        margin-top: 30px;
        display: flex;
        align-items: center;
        .add-name {
          margin-left: 90px;
          margin-right: 50px;
          h2 {
            font: normal normal 600 16px/25px BalooChettan;
            color: #000000;
          }
          h3 {
            font: normal normal 500 14px/20px BalooChettan;
            color: #A8A8A8;
          }
        }
        .add-container {
          display: flex;
          align-items: center;
          .unit {
            width: 70px;
            margin-right: 60px;
            position: relative;
            cursor: pointer;
            &.account-on {
              position: relative;
              img {
                border: 1px solid #37C99D;
                padding: 2px;
                box-sizing: border-box;
              }
              &::before {
                position: absolute;
                content: '';
                width: 30px;
                height: 30px;
                background: url('./img/select-on.svg') no-repeat;
                background-size: 100% 100%;
                top: 45px;
                right: -7px;
              }
            }
            .delete {
              width: 16px;
              height: 16px;
              display: inline-block;
              position: absolute;
              background: url("./img/delete.svg") no-repeat;
              background-size: 100% 100%;
              top: 0;
              left: 0;
              cursor: pointer;
            }
            &:last-child {
              margin-right: 0;
            }
            img {
              width: 70px;
              border-radius: 100%;
              margin-bottom: 5px;
            }
            p {
              text-align: center;
              font: normal normal 500 14px/12px BalooChettan;
              color: #7B7B7B;
              word-break:break-all
            }
          }
        }

        &::before {
          position: absolute;
          content: '';
          width: 0;
          height: 0;
          border: 10px solid;
          border-color: transparent transparent #F4F6FC;
          left: 147px;
          top: -20px;
        }
      }
    }
  }
  .user-tabs {
    margin-top: 0!important;
    background-color: #f8f8f8;
    .country-select {
      display: flex;
      align-items: center;
      h2 {
        margin-right: 15px;
        font: normal normal 600 14px/21px BalooChettan;
        color: #000000;
      }
      .select-content {
        position: relative;
        box-shadow: 0px 3px 6px rgb(0 0 0 / 10%);
        border-radius: 7px;
        .national-flag {
          display: inline-block;
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          left: 16px;
          width: 20px;
          height: 20px;
          border-radius: 100%;
          z-index: 5;
          img {
            display: block;
            width: 100%;
            height: 100%;
          }
        }
        select {
          width: 156px;
          height: 35px;
          border: 0;
          font: normal normal 600 16px/35px BalooChettan;
          color: #000000;
          padding-left: 45px;
          cursor: pointer;
          background: rgba(#fff, 0.5) url("~@/assets/images/global/arrow-bottom.svg") no-repeat right 3% center !important;
          background-size: 15px 15px!important;
          border-radius: 7px;
        }
      }

    }
    .user-tabs__btn {
      margin: 0 auto;
      margin-top: 0!important;
      margin-bottom: 86px!important;
      width: 444px!important;
      height: 96px!important;
      button {
        background: transparent linear-gradient(90deg, #FFB24E 0%, #FF600E 100%) 0% 0% no-repeat padding-box;
        box-shadow: 0px 12px 24px #5050501C;
        border-radius: 12px;
      }
      &:hover {
        button {
          background: transparent linear-gradient(270deg, #FFBE4E 0%, #FF984A 100%) 0% 0% no-repeat padding-box;
          box-shadow: 0px 12px 24px #7575753D;
        }
      }
    }
    .wrapper {
      > h2 {
        text-align: center;
        font: normal normal 600 32px/36px BalooChettan;
        color: #000000;
        margin-bottom: 30px;
      }
      .user-tabs__tabs {
        height: 64px;
        .unit {
          border-radius: 0;
          margin: 0;
          align-items: flex-start;
          width: 150px;
          background-color: transparent;
          p {
            height: 51px;
            font: normal normal 600 16px/23px BalooChettan;
            color: #000000;
            width: 100%;
            line-height: 51px;
          }
          &:nth-child(1) {
            &.on {
              background:url('./img/select03.svg') no-repeat;
              background-size: 100% 100%;
              background-position: 3px 0px;
              p {
                color: #fff;
              }
            }
          }
          &:nth-child(2) {
            &.on {
              background: url('./img/select04.svg') no-repeat;
              background-size: 100% 100%;
              p {
                color: #fff;
              }
            }
          }
          &:nth-child(3) {
            &.on {
              background: url('./img/select05.svg') no-repeat;
              background-size: 100% 100%;
              background-position: -3px 0;
              p {
                color: #fff;
              }
            }
          }
        }
        .unit:first-child {
          p {
            border-radius: 26px 0 0 26px;
            border-right: 1px solid #F59453;

          }
        }
        .unit:last-child {
          p {
            border-radius: 0 26px 26px 0;
            border-left: 1px solid #F59453;
          }
        }
        .unit:not(.on) {
          p {
            height: 56px;
            border-bottom: 6px solid #F59453;
            background-color: #FFE3D1;
          }
        }
      }
      .user-tabs__tabs_wrapper {
        margin-top: 55px;
        .task {
            .task-container {
              .unit {
                background-color: #f8f8f8;
                height: 94px;
                padding: 0;
                background: #FFFFFF;
                border: 1px solid #EBEBEB;
                border-radius: 16px;
                margin-bottom: 26px;
                > img {
                  width: 50px;
                  height: 50px;
                  border-radius: 100%;
                  left: 100px;
                }
                .progress {
                  display: flex;
                  flex-direction: row;
                  align-items: center;
                  height: 100%;
                  padding-top: 0;
                  padding-left: 180px;
                  .bar {
                    width: 400px;
                    margin-top: 0;
                    margin-right: 30px;
                    height: 11px;
                  }
                  .time {
                    font: normal normal 400 16px/28px BalooChettan;
                    color: #7F8498;
                    margin-right: 51px;
                  }
                  .user-icon {
                    width: 46px;
                    height: 46px;
                    background: url('./img/user-icon.svg') no-repeat;
                    background-size: cover;
                    background-position: center center;
                    &.like-user-icon {
                      background: url('./img/user-icon-2.svg') no-repeat!important;
                      background-size: cover!important;
                      background-position: center center!important;
                    }
                  }
                  p {
                    font: normal normal 600 20px/29px BalooChettan;
                    color: #000000;
                    margin-right: 20px;
                    span {
                      font: normal normal 500 20px/29px BalooChettan;
                      display: inline-block;
                      color: #7B7B7B;
                      width: 250px;
                    }
                  }
                }
                &:last-child {
                  margin-bottom: 0
                }
              }
            }
        }
        &.profile {
          .no-task {
            width: 1120px;
            height: 145px;
            background: #FFFFFF;
            border-radius: 16px;
            margin: 0 auto;
            margin-top: 38px;
            padding-left: 104px;
            display: flex;
            flex-direction:  column;
            justify-content: center;

            h2 {
              font: normal normal 600 21px/39px BalooChettan;
              color: #000000;
              margin: 0;
              padding: 0;
              margin-bottom: 17px;
            }
            > div {
              display: flex;
              align-items: center;
              img {
                margin-right: 8px;
              }
              p {
                font: normal normal 400 16px/16px BalooChettan;
                color: #7F8498;
              }
            }
          }
        }
        .user-tabs__container {
          background-color: transparent;
          box-shadow: none;
          padding-top: 0;
          .post-container {
            .post-list {
              .post-list-wrapper {
                width: 100%;
              }
            }
          }
          .pkg-container {
            padding: 0;
            .pc {
              display: flex;
              justify-content: center;
              .package {
                display: flex;
                flex-direction: column;
                justify-content: flex-start;
                margin-right: 25px;
                margin-top: 0;
                &:last-child {
                  margin-right: 0;
                }
                width: 220px;
                height: 420px;
                padding: 0;
                box-sizing: border-box;
                position: relative;
                box-shadow: 0px 12px 24px #00000012;
                border: 1px solid #FFFFFF;
                border-radius: 16px;
                backdrop-filter: blur(30px);
                -webkit-backdrop-filter: blur(30px);
                .num {
                  display: flex;
                  flex-direction: column;
                  width: 100%;
                  height: 138px;
                  background-color: rgba(251, 251, 251);
                  padding-top: 50px;
                  border-radius: 16px 16px 0 0;
                  position: relative;
                  &::before {
                    content: '';
                    position: absolute;
                    top: 10px;
                    left: 10px;
                    width: 28px;
                    height: 28px;
                    background: #FFFFFF;
                    border: 1px solid #AE9BA0;
                    z-index: 10;
                    border-radius: 100%;
                  }
                  .num-i,.cross {
                    display: none;
                  }
                  b {
                    display: flex;
                    flex-direction: column;
                    text-align: center;
                    span:first-child {
                      font: normal normal 600 42px/42px BalooChettan;
                      color: #000000;
                    }
                    span:last-child {
                      font: normal normal 500 16px/16px BalooChettan;
                      color: #7F8498;
                    }
                  }
                }
                .follow {
                  .likes-mk-1 {
                    span {
                      color: #37C99D!important;
                    }
                  }
                }
                .likes-mk-1{
                  width: 96px;
                  height: 22px;
                  background: #FFFFFF;
                  border: 1px solid #37C99D;
                  border-radius: 6px;
                  position: absolute;
                  top: 127px;
                  span {
                    display: inline-block;
                    width: 100%;
                    height: 100%;
                    text-align: center;
                    font: normal normal 500 14px/22px BalooChettan;
                    margin: 0;
                    padding: 0;
                  }
                  &:before {
                    content: none;
                  }
                }
                .coins {
                  margin-top: 26px;
                  sup {
                    font: normal normal 400 32px/45px BalooChettan;
                    color: #000000;
                  }
                }
                .pkg-line {
                  width: 38px;
                  height: 0px;
                  border-bottom: 4px solid #000000;
                  opacity: 0.07;
                  margin: 15px auto 30px ;
                }
                .pkg-text {
                  font: normal normal 400 16px/32px BalooChettan;
                  width: 100%;
                  color: #000000;
                  padding-left: 24px;
                  box-sizing: border-box;
                  > div {
                    display: flex;
                    align-items: center;
                    img {
                      margin-right: 10px;
                    }
                  }
                }
              }
              .like {
                .likes-mk-1 {
                  background-color: #fff;
                  border-color: #FFA41C;
                  span {
                    background-color: #fff;
                    color: #FFA41C;
                  }
                }
                &.selected {
                  .likes-mk-1 {
                    span {
                      background-color: #FFA41C!important;
                      color: #fff;
                      border-radius: 0;
                    }
                  }
                }
              }
              .hot {
                &::before {
                  content: none;
                }
              }
              .selected::after {
                content: none;
              }
              .follow.selected {
                .likes-mk-1 {
                  background-color: #37C99D!important;
                  span {
                    background-color: #37C99D!important;
                    color: #fff!important;
                    border-radius: 0px!important;
                  }
                }
              }
              .selected{
                padding: 0!important;
                // border-color: #6257FF!important;
                border: 0!important;
                &::after {
                  content: '';
                  position: absolute;
                  width: 100%;
                  height: 100%;
                  top: 0;
                  left: 0;
                  border: 4px solid #6257FF!important;
                  background: transparent!important;
                  border-radius: 16px;
                  box-sizing: inherit;
                  // transition: opacity 0!important;
                }
                .num::before {
                  content: none;
                }
                .coins {
                  sup {
                    color: #FF4E4E;
                  }
                }
                .num::after {
                  content: '';
                  position: absolute;
                  top: 10px;
                  left: 10px;
                  width: 28px;
                  height: 28px;
                  z-index: 10;
                  border-radius: 100%;
                  background: url('./img/select02.svg') no-repeat;
                  background-size: 100% 100%;
                }
              }
            }
          }
        }
      }
    }
  }
  // 处理弹框样式
  .searchAlert {
    .container {
      width: 460px;
      height: 290px;
      .input {
        margin-top: 0!important;
      }
      .search-add-ins {
         display: flex;
         align-items: center;
         img {
           margin-right: 10px;
         }
         p {
           font: normal normal 500 18px/30px BalooChettan;
           color: #000000;
         }
      }
    }

  }
  // 处理ins id 删除第一步骤弹窗
  .dialogDeleteIns,.customDeleteIns {
    .container {
      width: 460px;
      height: 290px;
      .content {
        .model-box {
          > h2 {
            font: normal normal 500 18px/30px BalooChettan;
            color: #000000;
          }
          .ins {
            padding-top: 25px;
            img {
              width: 64px;
              height: 64px;
            }
            p {
              font: normal normal 500 14px/15px BalooChettan;
              color: #7B7B7B;
              margin-top: 5px;
            }
          }
          .btn {
            display: flex;
            justify-content: center;
            button {
              width: 134px;
              height: 40px;
            }
            >div:first-child {
              margin-right: 36px;
              button {
                border: 1px solid #959595;
                border-radius: 10px;
                background: #fff;
                font-size: 16px;
                font-weight: 600;
                cursor: pointer;
                &:hover {
                  background: #D2D2D2;
                  font: normal normal 600 16px/30px BalooChettan;
                  color: #343434;
                  border-color: #D2D2D2;
                }
              }
            }
          }
        }
      }
    }
  }
  .customDeleteIns {
    .ins-warrper {
      width: 100%;
      display: flex;
      align-items: flex-start;
      padding-left: 50px;
      .ins {
        margin-right: 20px;
        padding-top: 0!important;
      }
      .ins-tips {
        display: flex;
        align-items: flex-start;
        margin-top: 15px;
        img {
          margin-right: 6px;
        }
        p {
          font: normal normal 400 14px/18px BalooChettan;
          color: #7B7B7B;
          text-align: left;
          padding-right: 30px;
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .country-select {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 20px;
      margin-top: 20px;
      h2 {
        margin-right: 15px;
        font: normal normal 600 14px/21px BalooChettan;
        color: #7F8498;
      }
      .select-content {
        position: relative;
        .national-flag {
          display: inline-block;
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          left: 16px;
          width: 20px;
          height: 20px;
          border-radius: 100%;
          z-index: 5;
          img {
            display: block;
            width: 100%;
            height: 100%;
          }
        }
        select {
          width: 140px;
          height: 35px;
          border: 0;
          font: normal normal 600 16px/25px BalooChettan!important;
          color: #000000;
          padding-left: 45px;
          cursor: pointer;
          background: rgba(#fff, 0.5) url("~@/assets/images/global/arrow-bottom.svg") no-repeat right 3% center !important;
          background-size: 15px 15px!important;
        }
      }

  }
  .show-more {
    width: 100%;
    font: 600 14px/50px Montserrat;
    color: #2a2a2a;
    text-align: center;
    text-decoration: underline;
    transition: all .1s;
  }
  .mobile-buy-btn {
    width: 227px;
    height: 60px;
    margin: 0 auto;
    margin-top: 43px;
    button {
      background: transparent linear-gradient(90deg, #FFB24E 0%, #FF600E 100%) 0% 0% no-repeat padding-box;
      box-shadow: 0px 12px 24px #5050501C;
    }
  }
  .user {
    padding-bottom: 0;

    .wrapper {
      padding: 0 4vw;
      width: 100%;
    }

    .user-info {
      padding-top: 30px;
      margin-bottom: 37px;
      background: #fff;
      // height: 250px;

      .name-email {
        padding-left: 33px;
        box-sizing: border-box;
        margin-bottom: 14px;
        h2 {
          font: normal normal 500 16px/20px BalooChettan;
          color: #343434;
        }
        h3 {
          font: normal normal 500 14px/20px BalooChettan;
          color: #D2D2D2;
        }
      }

      .wrapper {
        border-top: 1px dashed rgba(#707070, 0.45);
        border-bottom: 1px dashed rgba(#707070, 0.45);
        padding: 20px 0 20px 0;
        // opacity: 0.45;
        width: calc(100% - 32px);
        margin: 0 auto;
        .user-list-info {
          padding-left: 16px;
          box-sizing: border-box;
        }
        .add-ins {
          display: flex;
          align-items: center;
          .add-ins__add-btn {
            margin-top: 0;
            margin-right: 24px;
          }
        }
      }
      .hasid {
      min-height: 100px;
      padding-top: 20px!important;
      padding-bottom: 20px!important;
      .user-list-info {
        display: flex;
        align-items: center;
      }
      .avatar {
        width: 52px;
        height: 52px;
        border: 6px solid #EEEDFD;
        border-radius: 100%;
        position: relative;
        flex-shrink: 0;
        span {
          display: inline-block;
          width: 37px;
          height: 37px;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          bottom: -23px;
          background: url('./img/arrow.svg') no-repeat;
          background-size: 100% 100%;
          transition: all 0.08s;
          &.open {
            background: url('./img/arrow-top.svg') no-repeat;
            background-size: 100% 100%;
          }
        }
        &::after {
          content: none!important;
        }
      }
      .text {
        h2 {
          font: normal normal 600 14px/20px BalooChettan;
          color: #000000;
        }
        p {
          span {
            font: normal normal 500 12px/12px BalooChettan;
            color: #4D4D4D;
            b {
              font: normal normal 600 14px/14px BalooChettan;
              color: #000000;
              margin-right: 3px;
            }
          }
        }
      }
      .user-list-content {
        width: 100%;
        height: 153px;
        background: #F4F6FC;
        border-radius: 8px;
        position: relative;
        margin-top: 30px;
        display: flex;
        flex-direction: column;
        align-items: center;
        .add-name {
          display: flex;
          align-items: flex-start;
          padding-left: 16px;
          box-sizing: border-box;
          width: 100%;
          margin-top: 17px;
          margin-bottom: 13px;
          h2 {
            font: normal normal 600 16px/25px BalooChettan;
            color: #000000;
            margin-right: 14px;
          }
          h3 {
            font: normal normal 500 14px/20px BalooChettan;
            color: #A8A8A8;
          }
        }
        .add-container {
          display: flex;
          align-items: flex-start;
          width: 100%;
          padding: 0 16px;
          box-sizing: border-box;
          .unit {
            // width: 50px;
            position: relative;
            cursor: pointer;
            margin-right: 10px;
            &.account-on {
              position: relative;
              img {
                border: 1px solid #37C99D;
                padding: 2px;
                box-sizing: border-box;
              }
              &::before {
                position: absolute;
                content: '';
                width: 30px;
                height: 30px;
                background: url('./img/select-on.svg') no-repeat;
                background-size: 100% 100%;
                top: 30px;
                right: -7px;
              }
            }
            .delete {
              width: 16px;
              height: 16px;
              display: inline-block;
              position: absolute;
              background: url("./img/delete.svg") no-repeat;
              background-size: 100% 100%;
              top: 0;
              left: 0;
              cursor: pointer;
            }
            &:last-child {
              margin-right: 0;
            }
            img {
              width: 50px;
              border-radius: 100%;
              margin-bottom: 5px;
            }
            p {
              text-align: center;
              font: normal normal 500 14px/12px BalooChettan;
              color: #7B7B7B;
              word-break:break-all;
              width: 50px;
            }
          }
        }

        &::before {
          position: absolute;
          content: '';
          width: 0;
          height: 0;
          border: 10px solid;
          border-color: transparent transparent #F4F6FC;
          left: 31px;
          top: -20px;
        }
      }
    }

      .avatar {
        width: 44px;
        height: 44px;

        img {
          width: 100%;
          height: 100%;
        }

        &.title {
          &:after {
            width: 14px;
            height: 14px;
          }
        }
      }

      .text {
        margin-left: -44px;
        padding-left: 44+12px;
        padding-top: 4px;
        width: 100%;

        h2, b {
          font: 600 16px/20px Montserrat;
        }

        b {
          font-size: 14px;
        }

        p {
          margin-top: 5px;
          font: 500 11px/20px Montserrat;

          span {
            margin-left: 1vw;
            margin-right: 0.8vw;

            &:first-child {
              margin-left: 0;
            }
          }
        }
      }

      .btn {
        margin: 20px auto;
        display: none;
        width: 50vw;
        height: 40px;
      }

      .account {
        margin-top: 0;

        .unit {
          margin-top: 30px;
          padding: 0 2vw;
          width: 20+2vw;
          border-width: 0.75px;

          .avatar {
            padding: 1px;
            width: 12vw;
            height: 12vw;
            border: 1px solid transparent;

            &:before {
              position: absolute;
              top: -14px;
              width: 11px;
              height: 7px;
            }
          }

          p {
            margin-top: 3px;
            font: 500 14px/17px Montserrat;
          }

          &.account-on {
            .avatar {
              border: 1px solid #005FFF;
            }
          }

          &.unit__add {
            img.add-icon {
              width: 45px;
              height: 45px;
            }
          }
        }
      }

      .add-ins {
        width: 100%;
        text-align: center;

        h2 {
          font: 600 16px/20px Montserrat;
        }

        .add-ins__add-btn {
          margin-top: (54px/2);
          width: 50px;
          height: 50px;
        }
      }
    }

    .user-tabs {
      margin-top: 0;

      // mobile task
    .task {
      margin-top: 25px;
      .task-container {
        // border: 1px solid #E1E1E1;
        border-radius: 26px;
        &.hasList {
          border: 1px solid #E1E1E1;
        }
        .unit {
          height: 94px!important;
          background: #fff!important;
          border-bottom: 1px solid #E1E1E1;
          padding: 0!important;
          margin: 0 16px!important;
          &:last-child {
            border-bottom: 0;
            border-radius: 0 0 26px 26px;
          }
          &:first-child {
            border-radius: 26px 26px 0 0 ;
          }
          > img {
             margin-top: 18px;
             width: 44px!important;
             height: 44px!important;
             left: 0px!important;
          }
          .mobile {
            height: 100%;
            padding-top: 0!important;
            display: flex!important;
            flex-direction: column;
            justify-content: center;
            &.progress {
              padding-left: 54px!important;

            }
            > div:first-child {
              display: flex;
              justify-content: space-between;
              font: normal normal 600 14px/21px BalooChettan;
              color: #000000;

              span {
                font: normal normal medium 14px/21px Baloo Chettan 2;
                color: #7B7B7B;
              }
              .time {
                font: normal normal 400 12px/21px BalooChettan;
                color: #7F8498;
              }
              .user-icon {
                width: 22px;
                height: 22px;
                background: url("./img/user-icon-small.svg") no-repeat;
                background-position: -9px -3px;
                &.like-user-icon {
                  background: url("./img/user-icon-small-2.svg") no-repeat!important;
                  background-position: -9px -3px!important;
                }
              }
            }
          }
        }
      }
    }

      .wrapper {
        >h2 {
          font: normal normal 600 22px/36px BalooChettan;
          color: #000000;
          margin-bottom: 20px;
          text-align: center;
        }
      }


      .user-tabs__tabs {
        height: 35px;
        display: flex;
        border: 1px solid #E1E1E1;
        border-radius: 31px;

        .unit {
          margin: 0;
          flex: 1;
          height: 100%;
          border-radius: 0;
          font: 600 12px Montserrat;
          background: #fff;
          &:first-child {
            border-radius: 31px 0 0 31px;
            border-right: 1px solid #E1E1E1;
          }
          &:last-child {
            border-radius: 0 31px 31px 0;
            border-left: 1px solid #E1E1E1;
          }
          p {
            font: normal normal 600 14px/21px BalooChettan;
            color: #000000;
          }
          &.on {
            background: rgba(#000, 0.1);
          }
        }
      }

      .no-task {
        height: 104px;
        background: #F4F6FC;
        border-radius: 8px;
        // margin-top: 20px;
        padding: 17px 19px;
        box-sizing: border-box;
        h2 {
          font: normal normal 600 16px/30px BalooChettan;
          color: #000000;
          margin-bottom: 10px!important;
          padding: 0!important;
        }
        div {
          display: flex;
          align-items: flex-start;
          img {
            margin-right: 5px;
          }
        }
      }

      .user-tabs__container {
        padding: 0;
        box-shadow: none;

        .pkg-container {
          padding: 0!important;
        }

        h2 {
          span {
            font: 600 16px/20px Montserrat;
          }

          i {
            margin-left: 5px;
            font-size: 12px;
          }
        }

        hr {
          margin: 30px 4vw;
        }

        .info, .add, .task, .package, .pkg-container, .pkg-extra, .post-container {
          padding: 0 4vw;
        }

        // followers list
        .package {
          height: 68px;
          box-shadow: none;
          border-radius: 34px;
          padding-left: 20px!important;
          // 取消hot
          &::before {
            content: none;
          }
          &.selected {
            border-color: #7257FA!important;
            .circle {
              position: relative;
              &::before {
                content: '';
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%,-50%);
                width: 16px;
                height: 16px;
                background: #7257FA;
                border-radius: 100%;
              }
            }
            &::after {
              content: none;
            }
          }
          .num {
            position: relative;
            .num-i {
              width: 30px;
              height: 23px;
              margin-right: 20px;
            }
            .cross {
              display: none;
            }
            b {
              font: normal normal 700 18px/21px BalooChettan;
              color: #000000;
            }
            .item-flag {
              position: absolute;
              top: 11px;
              left: 24px;
              width: 16px;
              height: 16px;
              border-radius: 100%;
              img {
                display: block;
                width: 100%;
                height: 100%;
                border-radius: 100%;
              }
            }
          }
          .circle {
            width: 26px;
            height: 26px;
            border: 2px solid #CFCFCF;
            border-radius: 100%;
          }
          .plus {
            font: normal normal 600 20px/23px BalooChettan;
            color: #7F8498;
          }
          .juli {
            width: 102px;
          }
          .coins {
            sup {
              font: normal normal 600 16px/17px BalooChettan;
              color: #7F8498;
            }
          }
          .likes-mk-1 {
            span {
              font: normal normal 500 14px/21px BalooChettan;
              color: #000000!important;
            }
            &::before {
              position: relative;
              z-index: 1;
              content: "";
              display: inline-block;
              width: 27px;
              height: 32px;
              background: url("./img/free.svg") no-repeat center;
              background-size: contain;
              vertical-align: middle;
              left: -3px;
            }
          }
          .hotlike {
            position: relative;
            &::before {
              position: relative;
              z-index: 1;
              content: "";
              display: inline-block;
              width: 46px;
              height: 49px;
              background: url("./img/free2.svg") no-repeat center;
              background-size: contain;
              vertical-align: middle;
              left: 0;
            }
            i:first-child {
              font: normal normal 400 9px/9px BalooChettan;
              color: #FFFFFF;
              text-transform: uppercase;
              text-align: center;
              display: block;
              position: absolute;
              top: 9px;
              left: 50%;
              transform: translateX(-50%);
              z-index: 2;
            }
            i:last-child {
              text-align: center;
              display: block;
              width: 100%;
              font: normal normal 600 13px/18px BalooChettan;
              color: #FFFFFF;
              position: absolute;
              top: 22px;
              left: 50%;
              transform: translateX(-50%);
              z-index: 2;
            }
          }
        }

        .package.like {
          .like-item-left {
            display: flex;
            align-items: center;
            .circle {
              margin-right: 14px;
            }
          }
          .off-m {
            font: normal normal 600 18px/21px BalooChettan;
            color: #FFA41C;
          }
        }

        .info {
          margin-bottom: 56px;

          h3 {
            margin-top: 5px;
            font: 500 11px/13px Montserrat;
          }

          p {
            margin-top: 16px;
            font: 400 14px/18px Montserrat;

            b {
              margin: 0 10px;
              font-weight: 600;
            }
          }

          .btn {
            margin-top: 32px;
            width: 100%;
            height: 56px;
          }
        }

        .add {
          h3 {
            margin-top: 3px;
            font: 500 14px Montserrat;
          }

          .add-container {
            margin-top: 28px;

            .unit {
              margin: 2vw;
              width: 50px;
              text-align: center;

              img {
                width: 40px;
                height: 40px;
              }

              p {
                margin-top: 5px;
                font: 500 12px/14px Montserrat;
              }

              i.delete {
                top: 40-16px;
                width: 16px;
                height: 16px;
              }
            }
          }
        }

        .task {
          padding: 0;

          h2 {
            margin-bottom: 25px;
            padding: 0 4vw;
          }

          .task-container {
            .unit {
              //margin-top: 25px;
              padding: 10px 4vw;
              height: 70px;

              img {
                top: 10px;
                left: 4vw;
                width: 50px;
                height: 50px;
              }

              .progress {
                padding-left: 59px;
                padding-top: 10px;

                p {
                  font: 600 12px/16px Montserrat;

                  span {
                    margin-left: 6px;
                  }

                  i {
                    width: 17px;
                    height: 14px;
                  }
                }

                .bar {
                  margin-top: 9px;
                  height: 7px;
                  border-radius: 7px;
                }
              }
            }
          }
        }

        .post-container {
          margin-top: 32px;
        }
      }

      .user-tabs__btn {
        margin-top: 15px;
        height: 50px;
      }
    }

    .searchAlert {
      .container {
        width: calc(100% - 32px);
        height: 197px;
        .input {
          margin-top: 0!important;
          input {
            height: 50px;
          }
        }
        i.close {
          top: -8px;
          right: -6px;
          width: 18px;
          height: 18px;
          border: 1px solid #ddd;
        }
        .search-add-ins {
          display: flex;
          align-items: center;
          margin-top: 10px;
          margin-bottom: 10px;
          img {
            margin-right: 2px;
          }
          p {
            font: normal normal 600 16px/30px BalooChettan;
            color: #000000;
          }
        }
      }

    }
    // 处理ins id 删除第一步骤弹窗
  .dialogDeleteIns,.customDeleteIns {
    .container {
      width: calc(100% - 32px);
      height: 235px;
      .content {
        .model-box {
          > h2 {
            font: normal normal 500 18px/30px BalooChettan;
            color: #000000;
          }
          .ins {
            padding-top: 25px;
            img {
              width: 64px;
              height: 64px;
            }
            p {
              font: normal normal 500 14px/15px BalooChettan;
              color: #7B7B7B;
              margin-top: 5px;
            }
          }
          .btn {
            display: flex;
            justify-content: center;
            button {
              width: 134px;
              height: 40px;
            }
            >div:first-child {
              margin-right: 36px;
              button {
                border: 1px solid #959595;
                border-radius: 10px;
                background: #fff;
                font-size: 16px;
                font-weight: 600;
                cursor: pointer;
                &:hover {
                  background: #D2D2D2;
                  font: normal normal 600 16px/30px BalooChettan;
                  color: #343434;
                  border-color: #D2D2D2;
                }
              }
            }
          }
        }
      }
    }
  }
  .customDeleteIns {
    i.close {
      top: -8px;
      right: -6px;
      width: 18px;
      height: 18px;
      border: 1px solid #ddd;
    }
    .model-box {
      > h2 {
        font: normal normal 600 14px/18px BalooChettan!important;
        margin-bottom: 10px;
      }
    }
    .ins-warrper {
      width: 100%;
      display: flex;
      align-items: flex-start;
      .ins {
        margin-right: 20px;
        padding-top: 0!important;
      }
      .ins-tips {
        display: flex;
        align-items: flex-start;
        margin-top: 15px;
        img {
          margin-right: 6px;
        }
        p {
          font: normal normal 500 14px/18px BalooChettan;
          color: #7B7B7B;
          text-align: left;
          padding-right: 16px;
        }
      }
    }
  }

    &.on {
      .user-info {
        height: 470px;

        &.less-2 {
          height: 350px;
        }

        .account {
          opacity: 1;
        }
      }
    }

    &.no-ins {
      .user-info {
        // height: 290px;
      }
    }
  }
}
</style>

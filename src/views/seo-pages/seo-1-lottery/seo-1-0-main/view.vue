<template>
  <div class="seo-1-0-main">
    <header-module-mk0 />
    <div class="wrapper">
      <h1 v-html="title"></h1>
      <div v-if="lotteryCountDownEnabled" class="countdown-container">
        <countdown
          ref="countDown"
          :end-time="new Date().getTime() + lotteryCountDown * 1000"
          :speed="60" :auto-start="false"
          @finish="lotteryCountDownEnd"
        >
          <template #before>
            <b>Loading...</b>
          </template>
          <template #process="{ timeObj }">
            <b>{{ timeObj.d }}</b><span>D</span>
            <b>{{ timeObj.h }}</b><span>H</span>
            <b>{{ timeObj.m }}</b><span>M</span>
            <b>{{ timeObj.s }}</b><span>S</span>
            <b class="tri">{{ timeObj.ms }}</b><span>ms</span>
          </template>
          <template #finish>
            <b>Sorry!&emsp;The Lucky Draw has ended.</b>
          </template>
        </countdown>
      </div>
      <div v-if="!lotteryCountDownEnabled" class="countdown-container-blank"></div>
      <div class="lottery-container">
        <seo100-module :lottery-obj="lotteryList[8]" :on="lotteryLightIndex === 8" :loading="requestingList" />
        <seo100-module :lottery-obj="lotteryList[1]" :on="lotteryLightIndex === 1" :loading="requestingList" />
        <seo100-module :lottery-obj="lotteryList[2]" :on="lotteryLightIndex === 2" :loading="requestingList" />

        <seo100-module :lottery-obj="lotteryList[7]" :on="lotteryLightIndex === 7" :loading="requestingList" />
        <seo100-module :lottery-obj="lotteryList[0]" :on="!lotteryLaunchBtn" :loading="requestingList" @click.native="lotteryLaunchGate" />
        <seo100-module :lottery-obj="lotteryList[3]" :on="lotteryLightIndex === 3" :loading="requestingList" />

        <seo100-module :lottery-obj="lotteryList[6]" :on="lotteryLightIndex === 6" :loading="requestingList" />
        <seo100-module :lottery-obj="lotteryList[5]" :on="lotteryLightIndex === 5" :loading="requestingList" />
        <seo100-module :lottery-obj="lotteryList[4]" :on="lotteryLightIndex === 4" :loading="requestingList" />
      </div>

      <label v-if="false" id="test-label">
        <input v-model.number="lotteryWinningTicket" type="number" placeholder="Test" value="4">
      </label>

      <div class="winning-news">
        <div v-if="otherWinningUserList.length > 0">
          <transition name="rolling-subtitles" mode="out-in">
            <p v-if="otherWinningUserListIndex >= 0" :key="otherWinningUserListIndex" class="note-0">
              <span>{{ otherWinningUserList[otherWinningUserListIndex]['user_email'] }}</span>
              won {{ otherWinningUserList[otherWinningUserListIndex].reward_count }} Coins just now
            </p>
          </transition>
        </div>
      </div>
      <div class="rules-container">
        <h2>RULES</h2>
        <ol>
          <li>Sign up and log in to get started.</li>
          <li>One account gets one chance to participate the game.</li>
          <li>Prizes will be sent in coins instantly to your account if wins.</li>
          <li><b>Download GetInsta app to pick up your prize.</b></li>
        </ol>
        <div v-if="!pageAndroid" class="btn">
          <div class="btn-big" @click="gaBtnLotteryBegin">
            <button-yellow-download class="pc" text="Download GetInsta" :icon="platform" :theme="'blue'" :font-size="'size-16'" />
            <!--            <button-download-android v-if="$store.state.isAndroid" />-->
            <!--            <button-download-ios v-if="$store.state.isiOS" />-->
            <button-icon-ins v-if="$store.state.isMobile" text="Get Free Followers" square shadow :icon="'ins'" font-size="size-15" theme="cyan" />
          </div>
          <div class="btn-small pc">
            <download-icon-set :ga="gaIconSet0" :icon="'black'" />
          </div>
        </div>
        <p class="note-1"><b>{{ otherWinningUserTotal.toLocaleString() }}</b> people have won the prize</p>
      </div>
    </div>

    <div v-if="modelBoxLoginRegisterShow" class="uni-dialog-box login"
         :class="{ 'enter-box': modelBoxLoginRegisterEnterBox, 'enter-mask': modelBoxLoginRegisterEnterMask }"
    >
      <div class="mask"></div>
      <div class="container" :class="{ 'login': modelBoxLoginRegisterSwitch, 'register': !modelBoxLoginRegisterSwitch }">
        <i class="close" @click="modelBoxLoginRegisterClose()"></i>
        <div class="content">
          <div class="model-box warn">
            <div class="title">
              <i class="icon"></i>
              <h3>{{ modelBoxLoginRegisterTitle }}</h3>
            </div>

            <div class="model-box-body">
              <div class="login-register">
                <transition name="fade-skeleton" mode="out-in">
                  <div v-if="modelBoxLoginRegisterSwitch" key="login" class="login-register__form">
                    <ValidationObserver v-slot="{ invalid, errors, validate}">
                      <ValidationProvider v-slot="{ classes }" name="Email address" rules="required|email">
                        <label class="email" :class="classes">
                          <input v-model="form.field.email" name="email" type="email" placeholder="Email address">
                        </label>
                      </ValidationProvider>
                      <ValidationProvider v-slot="{ classes }" name="Password" rules="required|min:4|max:18">
                        <label class="password" :class="classes">
                          <input v-model="form.field.password" name="password" type="password" placeholder="Password">
                        </label>
                      </ValidationProvider>
                      <label class="msg">
                        <i v-for="(unit, i) in errors" v-show="unit[0]" :key="i">{{ unit[0] }}<br></i>
                      </label>
                      <label class="btn" @click="formSubmitLogin(invalid, validate)">
                        <button-purple text="Log In" :font-size="'size-16'" :square="true" :border-radius="6" :loading="ajaxRequesting" />
                      </label>
                    </ValidationObserver>
                    <label class="links">
                      <router-link to="/forgot">Forgot Password?</router-link>
                      <a href="javascript:" @click="modelBoxLoginRegisterSwitch = false">Sign Up</a>
                    </label>
                  </div>
                  <div v-if="!modelBoxLoginRegisterSwitch" key="register" class="login-register__form">
                    <ValidationObserver v-slot="{ invalid, errors, validate}">
                      <ValidationProvider v-slot="{ classes }" name="Username" rules="required|alpha_dash|min:4|max:44">
                        <label class="username" :class="classes">
                          <input v-model="form.field.username" name="username" type="text" placeholder="Username">
                        </label>
                      </ValidationProvider>

                      <ValidationProvider
                        v-slot="{ classes }" name="Email"
                        :rules="emailProviderGetter ? `required|email_provider:${emailProvider}` : 'required'"
                      >
                        <label class="email" :class="classes">
                          <input v-model="form.field.email" name="email" type="email" placeholder="Email address">
                        </label>
                      </ValidationProvider>

                      <ValidationProvider v-slot="{ classes }" vid="password" name="Password" rules="required|min:4|max:18">
                        <label class="password" :class="classes">
                          <input v-model="form.field.password" name="password" type="password" placeholder="Password">
                        </label>
                      </ValidationProvider>

                      <ValidationProvider v-slot="{ classes }" name="Confirmed password" rules="required|confirmed:password">
                        <label class="password" :class="classes">
                          <input v-model="form.field.passwordConfirm" name="passwordConfirm" type="password" placeholder="Confirm your password">
                        </label>
                      </ValidationProvider>
                      <label class="msg">
                        <i v-for="(unit, i) in errors" v-show="unit[0]" :key="i">{{ unit[0] }}<br></i>
                      </label>
                      <label class="btn" @click="formSubmitRegister(invalid, validate)">
                        <button-purple text="Sign Up Now" :font-size="'size-16'" :square="true" :border-radius="6" :loading="ajaxRequesting" />
                      </label>
                    </ValidationObserver>
                    <label class="links-row">
                      By signing up, you agree to our
                      <router-link to="/privacy">Privacy Policy</router-link>
                    </label>
                    <label class="links-row">
                      <a href="javascript:" @click="modelBoxLoginRegisterSwitch = true">Already have an account? Log In</a>
                    </label>
                  </div>
                </transition>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import apiSelf from '~/src/api/api.self.js';
import apiOther from '~/src/api/api.other.js';
import api from '~/src/api/api.account';
// import apiAccount from '@/api/api.account';
import apiInsServer from '~/src/api/api.ins.server';

import HeaderModuleMk0 from '@/components/header/header-module-mk-0';
import ButtonPurple from '@/components/button/button-purple';
import Seo100Module from '~/src/views/seo-pages/seo-1-lottery/seo-1-0-main/seo-1-0-0-module/view';
import ButtonYellowDownload from '@/components/button/button-yellow-download';
import DownloadIconSet from '@/components/control/download-icon-set';
// import ButtonDownloadAndroid from '@/components/button/button-download-android';
// import ButtonDownloadIos from '@/components/button/button-download-ios';
import ButtonIconIns from '@/components/button/button-icon-ins';

// import defaultAvatar from '@/assets/images/global/icon_avatar_default.svg';

export default {
  name: 'Seo10Main',
  components: {
    ButtonIconIns,
    // ButtonDownloadIos,
    // ButtonDownloadAndroid,
    ButtonPurple,
    DownloadIconSet,
    ButtonYellowDownload,
    Seo100Module,
    HeaderModuleMk0
  },
  data() {
    return {
      title: '',

      requestingList: true,
      lotteryLaunchBtn: false,
      lotteryProcessing: false,
      lotteryList: [
        {
          'reward_type': 1,
          'reward_count': 0,
          'reward_id': 0,
          'order_id': -1,
          'equivalent_type': 1,
          'equivalent_quantity': 0
        }
      ],
      lotteryLightIndex: 0,
      lotteryWinningTicket: 1,
      lotterySpeed: 500,
      lotterySpeedMax: 60,
      lotterySpeedAcceleration: true, // 加速度true：加速；加速度false：减速
      lotteryTimer: 0,
      lotteryRepeatTipNum: -1,

      lotteryCountDown: 99999, // Unit：秒
      lotteryCountDownEnabled: true,

      otherWinningUserList: [],
      otherWinningUserListIndex: -1,
      otherWinningUserTotal: this.COMMON.randomNumInt(1000, 5000),

      modelBoxLoginRegisterShow: false,
      modelBoxLoginRegisterEnterBox: false,
      modelBoxLoginRegisterEnterMask: false,
      modelBoxLoginRegisterSwitch: true, // true = login， false = register
      ajaxRequesting: false,
      form: {
        field: {
          username: '',
          email: '',
          password: '',
          passwordConfirm: '',
          to: ''
        }
      },
      emailProviderGetter: false,
      emailProvider: [],

      // 购买
      insUser: {},
      successProduct: {
        id: 351, // beacon: 特殊offerID
        quantity: 200,
        price: 2.99
      },

      luckyDrawID: 1,

      pageAndroid: false,
      pageTestLabel: '',

      gaIconSet0: {
        ios: 'ios1',
        android: 'app1'
      }
    };
  },
  computed: {
    platform() {
      let name = '';
      if (this.$store.state.isAndroid) {
        name = 'android';
      } else if (this.$store.state.isiOS) {
        name = 'ios';
      } else {
        name = 'windows';
      }
      return name;
    },
    modelBoxLoginRegisterTitle() {
      let text = '';
      if (this.modelBoxLoginRegisterSwitch) {
        text = 'Login to get started';
      } else {
        text = 'Sign up to get the chance instantly';
      }
      return text;
    }
  },
  created() {
    this.getUrlKey();
  },
  mounted() {
    this.requestLotteryList();
    this.winningNews2Show();
    this.requestEmailLimitList();
    // this.requestLotteryReset();
    setTimeout(() => {
      //this.modelBoxLoginRegisterOpen(false);
    }, 1000);

    this.pageAndroid = this.$route.path === '/event-lucky-draw-1';
    if (this.$route.path === '/lucky-draw-test') this.pageTestLabel = '-test';

    this.title = this.pageAndroid
      ? 'Take the Chance to Win COINS <br> Once per Day'
      : 'Get Unlimited Real Followers for Free Instantly';

  },
  methods: {
    lotteryLaunchGate() {
      if (!this.$store.state.loginStatus) {
        this.modelBoxLoginRegisterOpen(true);
        this.lotteryLaunchBtn = false;
        return;
      }

      if (this.lotteryCountDown === 0) {
        this.$alert(
          'idle',
          'error',
          'Sorry',
          `The Lucky Draw has ended.<br>Thank you for your participation.`,
          'normal',
          'Close'
        ).catch();
        return;
      }
      if (!this.lotteryProcessing
        && this.lotteryRepeatTipNum === 0) {
        if (this.$route.path === '/event-lucky-draw-1') {
          this.lotteryResultNotWin();
        } else {
          this.$alert(
            'idle',
            'warn',
            'Thanks for participation',
            'Download GetInsta app to get free followers immediately.',
            'download-icon',
            'Download App Now'
          ).then(() => {
            this.gaDownload(4);
          }).catch();
        }
        return;
      }
      if (!this.lotteryProcessing
        && this.lotteryRepeatTipNum > 0) {
        if (this.$route.path === '/event-lucky-draw-1') {
          this.lotteryResultWin(this.lotteryRepeatTipNum);
        } else {
          this.$alert(
            'festival',
            'idle',
            'Sorry',
            `You have won <b>${this.lotteryRepeatTipNum} Coins</b> in the Lucky Draw. One account gets only one chance to participate the game.`,
            'download',
            'Download App to Get Your Prize')
            .then(() => {
              this.gaDownload(5);
            }).catch();
        }
        return;
      }

      if (!this.lotteryProcessing && this.lotteryLaunchBtn) {
        this.lotteryProcessing = true;
        this.lotteryLaunchBtn = false;
        this.lotteryLaunch();
      }
    },
    lotteryLaunch() {
      this.lotterySpeedAcceleration = true;

      // lottery Speed Accelerate
      this.lotterySpeedSwitch(500);

      setTimeout(() => {
        this.lotterySpeedSwitch(250);
      }, 500);
      setTimeout(() => {
        this.lotterySpeedSwitch(100);
      }, 500 + 1000 + 250);
      setTimeout(() => {
        this.lotterySpeedSwitch(50);
      }, 500 + 1000 + 250 + 1000 + 100);

      // 接口调用完成，结束轮盘
      setTimeout(() => {
        // this.lotteryLand(this.lotteryWinningTicket);
        this.requestLotteryResult();
      }, 500 + 1000 + 250 + 1000 + 100 + 1000);
    },
    lotteryLand(winningTicket) {
      this.lotterySpeedAcceleration = false;

      // lottery Speed Decelerate
      this.lotterySpeedSwitch(100);

      setTimeout(() => {
        this.lotterySpeedSwitch(250);

        if (winningTicket !== undefined && typeof winningTicket === 'number') {
          this.lotteryWinningTicket = winningTicket;
        }
      }, 500 + 100);
    },
    lotterySpeedSwitch(speed) {
      this.lotterySpeed = speed;
      this.lotteryCycle();
    },
    lotteryCycle() {
      clearInterval(this.lotteryTimer);
      this.lotteryTimer = setInterval(() => {
        if (this.lotteryLightIndex >= this.lotteryList.length - 1) {
          this.lotteryLightIndex = 1;
        } else {
          this.lotteryLightIndex++;
        }

        // 终点前减速
        if (!this.lotterySpeedAcceleration
          && this.lotteryWinningTicket
          && this.lotteryWinningTicket !== -1
          && this.lotterySpeed === 250) {

          if (this.lotteryWinningTicket - 2 > 1) {

            if (this.lotteryLightIndex === this.lotteryWinningTicket - 2) {
              setTimeout(() => {
                this.lotterySpeedSwitch(500);
              }, 250);
            }
          } else {

            if (this.lotteryLightIndex === this.lotteryWinningTicket - 2 + 6) {
              setTimeout(() => {
                this.lotterySpeedSwitch(500);
              }, 250);
            }
          }
        }

        // 到达终点
        if (!this.lotterySpeedAcceleration &&
          this.lotteryWinningTicket !== -1
          && this.lotteryLightIndex === this.lotteryWinningTicket
          && this.lotterySpeed === 500) {
          clearInterval(this.lotteryTimer);
          this.redeemLottery();
        }
      }, this.lotterySpeed);
    },
    lotteryCycleEmergencyBrake() {
      clearInterval(this.lotteryTimer);
      this.lotteryLightIndex = 0;
      this.lotteryWinningTicket = -1;
    },
    requestLotteryList() {
      let param = { 'luckdraw_id': this.luckyDrawID };

      this.$axios.post(
        apiOther.getRewards,
        this.COMMON.paramSign(param)
      ).then((response) => {
        this.lotteryProcessing = false;
        this.lotteryLaunchBtn = true;
        this.requestingList = false;

        if (response.data.status === 'ok') {
          this.lotteryList = [...this.lotteryList, ...response.data['reward']];

          // 倒计时显示处理
          this.lotteryCountDownEnabled = response.data['countdown_enabled'] === true;
          this.lotteryCountDown = response.data['left_time'];

          if (this.lotteryCountDownEnabled)
            this.$nextTick(() => {
              this.$refs.countDown.startCountdown(true);
            });

          this.requestWinningUser();
        } else if (response.data.error !== undefined) {

          if (response.data.error.type === 'bad_token') {
            this.$store.commit('loginChange', false);
            // this.modelBoxLoginRegisterOpen(true);
          } else {
            this.$alert(
              '',
              'error',
              '',
              `<b>Error Type:</b> ${response.data.error.type}`,
              'normal',
              'Close'
            ).catch();
          }
        } else {
          this.$alert(
            '',
            'error',
            '',
            `Unknown Error`,
            'normal',
            'Close'
          ).catch();
        }
      }).catch((error) => {
        this.lotteryProcessing = false;
        this.lotteryLaunchBtn = false;
        this.requestingList = false;
        console.error(`requestLotteryList: `, error);

        this.$alert(
          '',
          'error',
          '',
          `<b>Error Status:</b> ${error.status}<br><b>Error Message:</b> ${error.statusText}`,
          'normal',
          'Close'
        ).catch();
      });
    },
    requestLotteryResult() {
      let param = { token: this.$storage.get('token') };
      if (this.COMMON.getURLQuery('key') !== null)
        param = { key: this.COMMON.getURLQuery('key') };

      param.luckdraw_id = this.luckyDrawID;

      this.$axios.post(
        apiOther.luckDrawInit,
        this.COMMON.paramSign(param)
      ).then((response) => {
        this.lotteryProcessing = false;
        if (response.data.status === 'ok') {
          this.lotteryLand(response.data.order_id);

          if (this.$route.path === '/event-lucky-draw-1') {
            this.$ga.event('insluckydraw', 'draw', 'go-android');
          } else {
            this.$ga.event('insluckydraw', 'draw', `go${this.pageTestLabel}`);
          }

        } else if (response.data.error !== undefined) {
          this.lotteryCycleEmergencyBrake();

          if (response.data.error.type === 'bad_token') {
            this.$store.commit('loginChange', false);
            this.modelBoxLoginRegisterOpen(true);

          } else if (response.data.error.type === 'bad_user') {
            this.lotteryRepeatTipNum = response.data['reward'].reward_count;
            if (response.data['reward'].reward_count === 0) {
              if (this.$route.path === '/event-lucky-draw-1') {
                this.lotteryResultNotWin();
              } else {
                this.$alert(
                  'idle',
                  'warn',
                  'Thanks for participation',
                  'Download GetInsta app to get free followers immediately.',
                  'download-icon',
                  'Download App Now'
                ).then(() => {
                  this.gaDownload(4);
                }).catch();
              }
            } else {
              if (this.$route.path === '/event-lucky-draw-1') {
                this.lotteryResultWin(response.data['reward'].reward_count);
              } else {
                this.$alert(
                  'festival',
                  'idle',
                  'Sorry',
                  `You have won <b>${response.data['reward'].reward_count} Coins</b> in the Lucky Draw. One account gets only one chance to participate the game.`,
                  'download',
                  'Download App to Get Your Prize')
                  .then(() => {
                    this.gaDownload(5);
                  }).catch();
              }
            }
          } else {
            this.$alert(
              '',
              'error',
              '',
              `Unknown Error`,
              'normal',
              'Close'
            ).catch();
            this.lotteryCycleEmergencyBrake();
          }
        } else {
          this.$alert(
            '',
            'error',
            '',
            `Unknown Error`,
            'normal',
            'Close'
          ).catch();
          this.lotteryCycleEmergencyBrake();
        }
      }).catch((error) => {
        this.lotteryProcessing = false;
        this.requestingList = false;
        console.error(`requestLotteryResult: `, error);

        this.$alert(
          '',
          'error',
          '',
          `<b>Error Status:</b> ${error.status}<br><b>Error Message:</b> ${error.statusText}`,
          'normal',
          'Close'
        ).catch();
        this.lotteryCycleEmergencyBrake();
      });
    },
    requestLotteryReset() {
      let param = { token: this.$storage.get('token') };
      if (this.COMMON.getURLQuery('key') !== null)
        param = { key: this.COMMON.getURLQuery('key') };

      this.$axios.post(
        apiOther.clearRecord,
        this.COMMON.paramSign(param)
      ).then((response) => {
        if (response.data.status === 'ok') {
          this.$alert(
            '',
            'success',
            'Success',
            `中奖记录已清除`,
            'normal',
            'Close'
          ).catch();
        } else {
          this.$alert(
            '',
            'error',
            'Error',
            `中奖记录清除失败`,
            'normal',
            'Close'
          ).catch();
        }
      }).catch((error) => {
        this.lotteryProcessing = false;
        this.requestingList = false;
        console.error(`requestLotteryResult: `, error);

        this.$alert(
          '',
          'error',
          '',
          `<b>Error Status:</b> ${error.status}<br><b>Error Message:</b> ${error.statusText}`,
          'normal',
          'Close'
        ).catch();
      });
    },
    redeemLottery() {
      let param = { token: this.$storage.get('token') };
      if (this.COMMON.getURLQuery('key') !== null) param = { key: this.COMMON.getURLQuery('key') };

      param.luckdraw_id = this.luckyDrawID;

      this.$axios.post(
        apiOther.luckDrawConfirm,
        this.COMMON.paramSign(param)
      ).then((response) => {
        this.lotteryProcessing = false;
        if (response.data.status === 'ok') {
          this.notifyHitReward();

        } else if (response.data.error !== undefined) {
          if (response.data.error.type === 'bad_user') {
            this.$alert(
              '',
              'error',
              '',
              'User is not eligible for lottery',
              'normal',
              'Close'
            ).catch();
          } else if (response.data.error.type === 'bad_reward') {
            this.$alert(
              '',
              'error',
              '',
              'No winning information found',
              'normal',
              'Close'
            ).catch();
          } else {
            this.$alert(
              '',
              'error',
              '',
              `<b>Error Status:</b> ${error.status}<br><b>Error Message:</b> ${error.statusText}`,
              'normal',
              'Close'
            ).catch();
          }
        } else {
          this.$alert(
            '',
            'error',
            '',
            `Unknown Error`,
            'normal',
            'Close'
          ).catch();
        }
      }).catch((error) => {
        this.lotteryProcessing = false;
        this.requestingList = false;
        console.error(`redeemLottery: `, error);

        this.$alert(
          '',
          'error',
          '',
          `<b>Error Status:</b> ${error.status}<br><b>Error Message:</b> ${error.statusText}`,
          'normal',
          'Close'
        ).catch();
      });
    },
    notifyHitReward() {
      const rewardLotteryObj = this.lotteryList[this.lotteryLightIndex];
      this.lotteryRepeatTipNum = rewardLotteryObj.reward_count;

      if (rewardLotteryObj.reward_count === 0) {
        if (this.$route.path === '/event-lucky-draw-1') {
          this.lotteryResultNotWin();
        } else {
          this.$alert(
            'idle',
            'warn',
            'Thanks for participation',
            'Download GetInsta app to get free followers immediately.',
            'download-icon',
            'Download App Now'
          ).then(() => {
            this.gaDownload(4);
          }).catch();
        }
      } else {
        // 首次中奖
        if (this.$route.path === '/event-lucky-draw-1') {
          this.lotteryResultWin(rewardLotteryObj.reward_count, true);
        } else {
          const bodyText
            = `You win <b>${rewardLotteryObj.reward_count} Coins</b>
            in this Lucky Draw. Pick up your prize on the App.`;
          this.$alert(
            'festival',
            'clap',
            'Congrats',
            bodyText,
            'download',
            'Download App Now')
            .then(() => {
              this.gaDownload(3);
            }).catch();
        }
      }

      this.lotteryWinningTicket = -1;
      this.lotteryLightIndex = 0;
    },

    lotteryCountDownEnd() {
      this.lotteryProcessing = false;
      this.lotteryLaunchBtn = false;
      this.lotteryCountDown = 0;
      this.$alert(
        'idle',
        'error',
        'Sorry',
        `The Lucky Draw has ended. <br>Thank you for your participation.`,
        'normal',
        'Close'
      ).catch();
    },

    requestWinningUser() {
      let param = { 'luckdraw_id': this.luckyDrawID };

      this.$axios.post(
        apiOther.getRewardUser,
        this.COMMON.paramSign(param)
      ).then((response) => {
        if (response.data.status === 'ok') {
          this.otherWinningUserList = response.data['reward_users'];

          this.winningNewsShow();
        }
      }).catch((error) => {
        console.error(`requestWinningUser: `, error);
      });
    },
    winningNewsShow() {
      this.otherWinningUserListIndex = 0;
      setInterval(() => {
        if (this.otherWinningUserListIndex < this.otherWinningUserList.length - 1) {
          this.otherWinningUserListIndex++;
        } else {
          this.otherWinningUserListIndex = 0;
        }
      }, 5000);
    },
    winningNews2Show() {
      setInterval(() => {
        this.otherWinningUserTotal += this.COMMON.randomNumInt(10, 50);
      }, 5000);
    },

    modelBoxLoginRegisterOpen(loginOrNot) {
      this.modelBoxLoginRegisterSwitch = loginOrNot;

      this.modelBoxLoginRegisterShow = true;
      setTimeout(() => {
        this.modelBoxLoginRegisterEnterBox = true;
      }, 10);
      setTimeout(() => {
        this.modelBoxLoginRegisterEnterMask = true;
      }, 310);
    },
    modelBoxLoginRegisterClose() {
      this.modelBoxLoginRegisterEnterBox = false;
      setTimeout(() => {
        this.modelBoxLoginRegisterEnterMask = false;
      }, 300);
      setTimeout(() => {
        this.modelBoxLoginRegisterShow = false;
      }, 600);
    },

    formSubmitLogin(invalid, validate) {
      validate();

      // if (!this.COMMON.checkSupportLocalStorage('localStorage')) {
      //   this.dialogFailMsg = 'To browse the website normally, please enable <b>Cookies</b> from Settings or turn <b>Private Browsing</b> off.';
      //   this.dialogFail = true;
      //   return;
      // }
      if (!invalid && !this.ajaxRequesting) {
        this.sendLoginInfo();
      }
      this.$ga.event('insrg', 'register', `luckydraw-lg${this.pageTestLabel}`);
    },
    sendLoginInfo() {
      let query = '';
      if (this.COMMON.getURLQuery('utm_source') === 'IOT-PC') {
        query = '-IOT-PC';
      }

      this.ajaxRequesting = true;
      this.$axios.post(
        api.login,
        this.COMMON.paramSign(
          {
            account: this.form.field.email,
            password: this.form.field.password,
            origin: `web${query}`
          }
        )
      ).then((response) => {
        // console.log(response.data);
        if (response.data.status === 'ok') {
          // this.dialogSuccess = true;

          this.$store.commit('loginChange', true); // Vuex Commit

          this.$storage.set('token', response.data.user.token);
          this.$storage.set('user', response.data.user);
          this.$storage.set('userCoins', response.data.user.coins.count);
          this.$storage.set('userInsAccount', response.data.user.ins_account);
          this.$storage.set('productPkgList', response.data.product);

          // User页面不需重新请求getInfo埋点
          this.$storage.set('needGetInfo', true);

          this.modelBoxLoginRegisterClose();

          this.lotteryLaunchBtn = true;
        } else {
          let bodyText;
          if (response.data.error.type === 'bad_account') {
            bodyText = 'Couldn\'t find your account.';
          } else if (response.data.error.type === 'bad_password') {
            bodyText = 'Wrong password. <br> Try again or click \'Forgot Password?\' to reset it.';
          } else if (response.data.error.type === 'account_locked') {
            bodyText = 'This account has been locked.';
          } else {
            bodyText = `<b>Error Type:</b> ${response.data.error.type}`;
          }

          this.$alert(
            '',
            'error',
            '',
            bodyText,
            'normal',
            'Close'
          ).catch();
        }
        this.ajaxRequesting = false;
      }).catch((error) => {
        this.ajaxRequesting = false;
        this.$alert(
          '',
          'error',
          '',
          'Login failed, please try again later',
          'normal',
          'Close'
        ).catch();
        console.log('Catch Error: sendLoginInfo', error);
      });
    },
    formSubmitRegister(invalid, validate) {
      validate();
      // if (!this.COMMON.checkSupportLocalStorage('localStorage')) {
      //   this.dialogFailMsg = 'To browse the website normally, please enable <b>Cookies</b> from Settings or turn <b>Private Browsing</b> off.';
      //   this.dialogFail = true;
      //   return;
      // }
      if (!invalid && !this.ajaxRequesting) {
        this.sendRegisterInfo();
      }
      this.$ga.event('insrg', 'register', `luckydraw-rg${this.pageTestLabel}`);
    },
    sendRegisterInfo() {
      let query = '';
      if (this.COMMON.getURLQuery('utm_source') === 'IOT-PC') {
        query = '-IOT-PC';
      }

      this.ajaxRequesting = true;
      this.$axios.post(
        api.register,
        this.COMMON.paramSign(
          {
            user_name: this.form.field.username,
            account: this.form.field.email,
            password: this.form.field.password,
            origin: `web${query}`,
            key: this.$storage.get('registerKey'),
            to: this.form.field.to
          }
        )
      ).then((response) => {
        if (response.data.status === 'ok') {
          this.sendLoginInfo();
        } else {
          let bodyText;
          if (response.data.error.type === 'account_occupied') {
            bodyText = 'An account with these credentials already exists.';
          } else if (response.data.error.type === 'bad_account') {
            bodyText = 'Account error, please try another email.';
          } else {
            bodyText = `<b>Error Type:</b> ${response.data.error.type}`;
          }

          this.$alert(
            '',
            'error',
            '',
            bodyText,
            'normal',
            'Close'
          ).catch();

          this.ajaxRequesting = false;
        }
      }).catch((error) => {
        this.ajaxRequesting = false;
        this.$alert(
          '',
          'error',
          '',
          'Register failed, please try again later',
          'normal',
          'Close'
        ).catch();
        console.log('Catch Error: sendRegisterInfo', error);
      });
    },
    requestEmailLimitList() {
      this.$axios.get(
        apiSelf.emailLimitList
      ).then((response) => {
        this.emailProvider = response.data['site'];
        this.emailProviderGetter = true;
      }).catch((error) => {
        console.log('Catch Error: requestEmailLimitList', error);
      });
    },


    // 普通未中奖与活动未中奖对话框切换
    lotteryResultNotWin() {
      if (this.COMMON.getURLQuery('ins_account') !== null) {
        this.$specialAward('not-win', 0).then(() => {
          this.insAccountGet();
        }).catch();
      } else {
        this.$alert(
          'idle',
          'warn',
          'Thanks for participation',
          'Good luck next time. Try watching short videos to gain 1000+ free coins immediately!',
          'lottery',
          '',
          { text: 'Watch Videos Now +1000', ga: 'adrdl-luckydraw-tc3' }
        ).catch();
      }
    },
    // 普通中奖与活动中奖对话框切换
    lotteryResultWin(prize, ...FirstORNot) {
      if (this.COMMON.getURLQuery('ins_account') !== null) {
        this.$specialAward('win', prize).then(() => {
          this.insAccountGet();
        }).catch();
      } else {
        if (FirstORNot.length > 0) {
          const bodyText
            = `You win <b>${prize} Coins</b>
            in this Lucky Draw. Watch short videos to gain more free coins!`;

          this.$alert(
            'festival',
            'clap',
            'Congrats',
            bodyText,
            'lottery',
            '',
            { text: 'Watch Videos Now +1000', ga: 'adrdl-luckydraw-tc1' }
          ).catch();
        } else {
          const body
            = `You have won <b>${prize} Coins</b>
          in the Lucky Draw. Try watching videos to gain more coins everyday!`;

          this.$alert(
            'festival',
            'idle',
            'Sorry', body,
            'lottery',
            '',
            { text: 'Watch Videos Now +1000', ga: 'adrdl-luckydraw-tc2' }
          ).catch();
        }
      }
    },

    // ins 信息获取 及 购买
    insAccountGet() {
      this.$loading(true);
      let insAccount = this.COMMON.getURLQuery('ins_account');

      if (insAccount !== null && insAccount !== undefined && insAccount !== '') {
        this.$storage.set('key', this.COMMON.getURLQuery('key'));
        this.searchInsByServer(insAccount);

        this.$ga.event('insbuy', 'buy', 'luckybuy');
      } else {
        this.$loading(false);
        this.$alert(
          '', 'error', 'Oops',
          'Sorry, Query ins_account does not exist.',
          '', 'Close'
        ).catch();
      }
    },
    searchInsByServer(insAccount) {
      this.$axios.post(
        apiInsServer.getAccountByUsername,
        this.COMMON.paramSign(
          {
            'ins_account': insAccount
          }
        )
      ).then((response) => {
        if (response.data.status === 'ok') {
          this.$loading(false);
          // this.insUser = response.data['ins_info'];

          const _sharedDataUser = response.data.content['graphql']['user'];
          const _sharedDataUserPosts = _sharedDataUser['edge_owner_to_timeline_media'];

          this.insUser.ins_id = _sharedDataUser.id;
          this.insUser.ins_account = _sharedDataUser.username;
          this.insUser.profile_pic_url = _sharedDataUser.profile_pic_url;
          this.insUser.followed_by = _sharedDataUser['edge_followed_by']['count'];
          this.insUser.follow = _sharedDataUser['edge_follow']['count'];
          this.insUser.post = this.insPostTransform(_sharedDataUserPosts);

          this.addToCart();

        } else {
          this.$alert(
            '', 'error', 'Oops',
            'Sorry, can\'t get current Ins info',
            '', 'Close'
          ).catch();
          this.$loading(false);
        }
      }).catch((error) => {
        const errorMsg = '<samp>'
          + '<b>Error Status:</b> ' + error.status
          + '<br>' + '<b>Error Message:</b> ' + error.statusText
          + '</samp>';

        this.$alert(
          '', 'error', 'Oops',
          errorMsg,
          '', ''
        ).catch();
        console.log('Catch Error: searchInsByServer', error);
        this.$loading(false);
      });
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
    addToCart() {
      let param = {
        'ins_id': this.insUser.ins_id,
        'ins_account': this.insUser.ins_account
      };

      param.task_type = 2;
      param.product_id = this.successProduct.id;
      // 测试offerID
      if (this.COMMON.envTest()) param.product_id = 284;
      param.purchase_quantity = this.successProduct.quantity;
      param.price_decimal = this.successProduct.price;

      param.follow_pic_url = this.insUser.profile_pic_url;
      param.post_count = this.insUser.post.post_count;
      param.follower_count = this.insUser.followed_by;
      param.following_count = this.insUser.follow;

      this.transportCartUnitData(param);
    },
    transportCartUnitData(param) {
      this.$storage.set('cartUnit', param);

      const query = this.COMMON.envTest() ? { env_test: '1' } : {};
      query.url_cart = '2';

      this.$storage.remove('cartList');
      this.$router.push({ path: '/checkout', query: query });
    },

    getUrlKey() {
      if (this.COMMON.getURLQuery('key') !== null || this.$route.path === '/event-lucky-draw-1') {
        this.$store.commit('loginChange', true);
        this.luckyDrawID = 2;
      }
    },

    gaBtnLotteryBegin() {
      let label = '';
      if (this.$store.state.isAndroid) {
        label = 'app1';
        if (this.$store.state.enAdrType === 1) {
          location.href
            = this.$store.state.enAdrLinkWithoutGpReferrer
            + this.$constant.app.campaign.androidReferrerQuery
            + 'en-seo-lucky-draw';
        } else {
          location.href
            = this.$constant.app.download.android;
        }
      }
      if (this.$store.state.isiOS) {
        label = 'ios1';
        location.href
          = this.$store.state.enIosLink
          + `?pt=${this.$store.state.enIosLinkPt}`
          + `&ct=en-seo-lucky-draw`
          + `&mt=8`;
      }
      if (this.$store.state.isWindows) label = 'win1';

      this.$ga.event('insdl', 'download', `luckydrawdl-${label}${this.pageTestLabel}`);
    },
    gaDownload(number) {
      if (this.$store.state.isAndroid) {
        // window.location.href = this.$constant.app.download.android;
        this.$ga.event('insdl', 'download', `luckydrawdl-app${number}${this.pageTestLabel}`);
        if (this.$store.state.enAdrType === 1) {
          location.href
            = this.$store.state.enAdrLinkWithoutGpReferrer
            + this.$constant.app.campaign.androidReferrerQuery
            + 'en-seo-lucky-draw';
        } else {
          location.href
            = this.$constant.app.download.android;
        }
      }
      if (this.$store.state.isiOS) {
        this.$ga.event('insdl', 'download', `luckydrawdl-ios${number}${this.pageTestLabel}`);
        // window.location.href = this.$constant.app.download.ios;
        location.href
          = this.$store.state.enIosLink
          + `?pt=${this.$store.state.enIosLinkPt}`
          + `&ct=en-seo-lucky-draw`
          + `&mt=8`;
      }
      if (this.$store.state.isWindows) {
        this.$ga.event('insdl', 'download', `luckydrawdl-win${number}${this.pageTestLabel}`);
        window.location.href = this.$constant.app.download.windows;
      }
    }
  }
};
</script>

<style scoped lang="scss" src="view.scss"></style>

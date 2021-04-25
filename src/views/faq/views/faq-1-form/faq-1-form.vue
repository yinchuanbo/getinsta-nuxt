<template>
  <div class="faq-1-form">
    <div class="wrapper">
      <div class="faq-1-form__container">
        <i class="icon"></i>
        <h2>
          <!-- {{ $t('faq.faqForm.title-0') }}
          <a @click="routerPush('/faqs')">FAQs</a>
          {{ $t('faq.faqForm.title-1') }} -->
          {{ $t('faq.faqForm.title-2') }}
        </h2>
        <ValidationObserver v-slot="{ invalid, errors, validate}">
          <div class="row double">
            <ValidationProvider v-slot="{ classes }" name="Email" rules="required|email">
              <label class="email" :class="classes">
                <input
                  v-model="form.field.email"
                  type="email"
                  :placeholder="$t('faq.faqForm.yourEmail')"
                >
                <transition name="fade-tabs" mode="out-in">
                  <div v-if="classes.touched" class="tip">{{ $t('faq.faqForm.yourEmailTip') }}</div>
                </transition>
              </label>
            </ValidationProvider>

            <ValidationProvider v-slot="{ classes }" name="Name" rules="">
              <label class="name" :class="classes">
                <input
                  v-model="form.field.name"
                  type="text"
                  :placeholder="$t('faq.faqForm.yourName')"
                >
              </label>
            </ValidationProvider>
          </div>

          <div class="row double">
            <ValidationProvider v-slot="{ classes }" name="Your Instagram username" rules="">
              <label class="ins" :class="classes">
                <input
                  v-model="form.field.ins"
                  type="text"
                  :placeholder="$t('faq.faqForm.insUsername')"
                >
              </label>
            </ValidationProvider>

            <ValidationProvider v-slot="{ classes }" name="Request Type" rules="required|is_not:default'">
              <label class="type" :class="classes">
                <select v-model="form.field.type" :class="{ 'clicked': clicked }" @click="selectClicked">
                  <option value="" disabled selected>{{ $t('faq.faqForm.requestType.title') }}</option>
                  <option v-for="(unit, i) in requestTypeSelectList" :key="i" :value="unit">{{ unit }}</option>
                </select>
              </label>
            </ValidationProvider>
          </div>

          <div class="row">
            <ValidationProvider v-slot="{ classes }" name="Operating System" rules="required">
              <label class="radio label"><span class="label">{{ $t('faq.faqForm.operatingSystem.title') }}:</span></label>

              <div class="radio-container">
                <label v-for="(unit, i) in operatingSystemRadioList" :key="i" class="radio" :class="classes">
                  <input v-model="form.field.origin" type="radio" name="os" :value="unit.value">
                  <span class="label">{{ unit.title }}</span>
                </label>
              </div>
            </ValidationProvider>
          </div>

          <!--App Name-->
          <div v-if="appNameShow" class="row">
            <ValidationProvider v-slot="{ classes }" name="App Name" rules="required">
              <label :class="classes">
                <input v-model="formAppName" type="text" placeholder="App Name">
              </label>
            </ValidationProvider>
          </div>

          <div class="row">
            <ValidationProvider v-slot="{ classes }" name="Message" rules="required|min:50">
              <label class="message" :class="classes">
                <textarea
                  v-model="form.field.message"
                  :placeholder="formTypePlaceholder"
                ></textarea>
              </label>
            </ValidationProvider>
          </div>

          <div class="row">
            <ValidationProvider v-slot="{ classes }" name="Your Images" rules="">
              <label class="file" :class="classes">
                <input id="form-image-0" ref="image0" type="file" accept="image/png,image/gif,image/jpeg">
                <input id="form-image-1" ref="image1" type="file" accept="image/png,image/gif,image/jpeg">
                <input id="form-image-2" ref="image2" type="file" accept="image/png,image/gif,image/jpeg">
              </label>
            </ValidationProvider>
          </div>

          <div class="row">
            <label class="send" @click="formSubmit(invalid, validate)">
              <button-purple
                :text="$t('faq.faqForm.send')"
                :square="true"
                :font-size="'size-16'"
                :loading="ajaxRequesting"
              />
            </label>
          </div>

          <div v-if="errors.length !== 0" class="row">
            <label class="msg">
              <i v-for="(unit, i) in errors" v-show="unit[0]" :key="i">{{ unit[0] }}<br></i>
            </label>
          </div>
        </ValidationObserver>
      </div>
    </div>
  </div>
</template>

<script>
import ButtonPurple from '@/components/button/button-purple';
import api from '@/api/api.other';

export default {
  name: 'Faq1Form',
  components: { ButtonPurple },
  data() {
    return {
      form: {
        field: {
          name: '',
          email: '',
          message: '',
          type: '',
          ins: '',
          origin: ''
        }
      },
      formTypePlaceholder: this.$t('faq.faqForm.textarea'),
      dialogSuccess: false,
      dialogSuccessMsg: '',
      dialogFail: false,
      dialogFailMsg: '',
      ajaxRequesting: false,
      clicked: false,
      appNameShow: false,
      formAppName: ''
    };
  },
  computed: {
    requestTypeSelectList() {
      return this.$t('faq.faqForm.requestType.select');
    },
    operatingSystemRadioList() {
      return this.$t('faq.faqForm.operatingSystem.radio');
    }
  },
  watch: {
    'form.field.type'(val) {
      this.formTypePlaceholder =
        val === this.$t('faq.faqForm.requestType.specialSelect')
          ? this.$t('faq.faqForm.textarea-1')
          : this.$t('faq.faqForm.textarea');
    }
  },
  mounted() {
    this.appNameShow = this.COMMON.getURLQuery('variables') === null;
  },
  methods: {
    formSubmit(invalid, validate) {
      validate();

      if (!invalid && !this.ajaxRequesting) {
        this.submitForm();
      }

      const lang = this.$i18n.locale !== 'en' ? `-${this.$i18n.locale}` : '';
      this.$ga.event('buttonclick', 'click', `faqsend${lang}`);
    },
    submitForm() {
      let params = {
        user_name: this.form.field.name,
        email: this.form.field.email,
        content: this.form.field.message,
        request_type: this.form.field.type,
        ins_account: this.form.field.ins,
        operate_system: this.form.field.origin
      };

      const appVariables = this.COMMON.getURLQuery('variables');
      if (appVariables) {
        const appVariablesJSON = JSON.parse(appVariables);
        const channel = appVariablesJSON.channel || undefined;
        const app_version = appVariablesJSON.app_version || undefined;
        if (appVariablesJSON && channel) params.channel = channel;
        if (appVariablesJSON && app_version) params.app_version = app_version;
        // params.app_name = this.formAppName;
      } else {
        params.chosen_app_name = this.formAppName;
      }

      const paramsSigned = this.COMMON.paramSign(params);

      const img0 = this.$refs.image0.files[0] || null;
      const img1 = this.$refs.image1.files[0] || null;
      const img2 = this.$refs.image2.files[0] || null;

      let formData = new FormData();
      formData.append('signed_body', paramsSigned.signed_body);
      formData.append('sign_version', paramsSigned.sign_version);
      formData.append('image[0]', img0);
      formData.append('image[1]', img1);
      formData.append('image[2]', img2);

      // console.log('image[0]', formData.getAll('image[0]'));
      // console.log('image[1]', formData.getAll('image[1]'));
      // console.log('image[2]', formData.getAll('image[2]'));

      this.ajaxRequesting = true;
      let instance = this.$nuxt.$axios.create({
        withCredentials: true
      });
      instance.post(
        api.sendContactMSG,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' }
        }
      ).then((response) => {
        this.ajaxRequesting = false;
        if (response.data.status === 'ok') {
          this.$alert('', 'success',
            this.$t('global.modelBox.title.success'),
            this.$t('faq.faqForm.sendSuccess.body'),
            'normal',
            this.$t('global.modelBox.btn.close')
          );
        } else {
          if (!response.data.error) {
            this.$alert('', 'error',
              this.$t('global.modelBox.title.oops'),
              `unKnown Error`,
              'normal',
              this.$t('global.modelBox.btn.close')
            );
            return;
          }

          if (response.data.error.type === 'repeat_operation') {
            this.$alert('', 'error',
              this.$t('global.modelBox.title.oops'),
              this.$t('faq.faqForm.sendFail.repeatedRequest'),
              'normal',
              this.$t('global.modelBox.btn.close')
            );
          } else {
            this.$alert('', 'error',
              this.$t('global.modelBox.title.oops'),
              `<samp><b>Error Type:</b> ${response.data.error.type}<br><b>Error Message:</b> ${response.data.error.message}</samp>`,
              'normal',
              this.$t('global.modelBox.btn.close')
            );
          }
        }
      }).catch((error) => {
        this.ajaxRequesting = false;
        this.$alert('', 'error',
          this.$t('global.modelBox.title.oops'),
          `<samp><b>Error Type:</b> ${error.status}<br><b>Error Message:</b> ${error.statusText}</samp>`,
          'normal',
          this.$t('global.modelBox.btn.close')
        );
        console.log('Catch Error: submitForm');
        console.log(error);
      });
    },
    closeDialog() {
      this.dialogSuccess = false;
      this.dialogFail = false;
    },
    selectClicked() {
      this.clicked = true;
    },
    routerPush(path) {
      if (path === this.$nuxt.$route.path) {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      } else {
        this.$nuxt.$router.push({ path: path });
      }
      return false;
    }
  }
};
</script>

<style lang="scss" scoped>
.faq-1-form {
  padding-bottom: 108px;

  .wrapper {
    width: 1200px;
  }

  .faq-1-form__container {
    position: relative;
    margin-top: 90px;
    padding: 60px 78px 60px 342px;
    width: 100%;
    /*height: 566px;*/
    box-shadow: 0 10px 20px #00136112;
    border-radius: 12px;

    i.icon {
      position: absolute;
      top: 75px;
      left: 118px;
      display: block;
      width: 141px;
      height: 108px;
      background-image: url("~@/views/faq/views/faq-1-form/img/faq-1-form__icon_feedback.svg");
      background-repeat: no-repeat;
      background-position: center;
      background-size: contain;
      content: "";
    }

    h2 {
      margin-bottom: 56px;
      font: 600 20px/24px Montserrat;
      color: #2A2A2A;
    }

    .row {
      margin-top: 26px;

      &.double {
        font-size: 0;

        label {
          width: 372px;
        }

        span:last-child {
          label {
            margin-left: 18px;
            width: 390px;
          }
        }
      }

      .radio-container {
        display: inline-block;
      }

      label {
        position: relative;
        display: inline-block;
        width: 100%;
        height: 60px;

        &.message {
          height: 160px;
        }

        &.send {
          width: 280px;
          height: 60px;
        }

        &.msg {
          color: #FF4444;
        }

        &.invalid {
          input, textarea, select {
            border-color: #FF3939;
          }
        }

        &.file {
          height: auto;

          input[type="file"] {
            width: 30%;
          }
        }

        &.radio {
          margin-left: 38px;
          width: auto;
          height: auto;
          cursor: pointer;

          &:first-child {
            margin-left: 30px;
          }

          span.label {
            margin-left: 10px;
            font: 600 16px/19px Montserrat;
            color: #2A2A2A;
            vertical-align: middle;
          }

          &.label {
            margin-left: 0;
            cursor: default;

            span.label {
              margin-left: 0;
            }
          }
        }

        .tip {
          position: absolute;
          bottom: 68px;
          left: 0;
          padding: 10px;
          max-width: 100%;
          background-color: #f4f4f4;
          border: 2px solid #afafaf;
          border-radius: 5px;
          font-size: 12px;
          font-weight: 500;

          &:after, &:before {
            content: "";
            position: absolute;
            left: 26px;
            bottom: -20px;
            z-index: 1;
            width: 0;
            height: 0;
            font-size: 0;
            border-width: 10px;
            border-style: solid;
            border-color: #aaaaaa transparent transparent;
            overflow: hidden;
          }

          &:before {
            z-index: 2;
            bottom: -17px;
            border-color: #f4f4f4 transparent transparent;
          }
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .faq-1-form {
    padding-bottom: 50px;

    .wrapper {
      padding: 0 4vw;
      width: 100%;
    }

    .faq-1-form__container {
      margin-top: 25px;
      padding: 50px 4vw;
      width: 100%;
      height: auto;
      box-shadow: 0 10px 20px #00136112;
      border-radius: 12px;

      i.icon {
        position: relative;
        top: 0;
        left: 0;
        margin: 0 auto;
        width: (164px/2);
        height: (126px/2);
      }

      h2 {
        margin-top: 9px;
        margin-bottom: 44px;
        font: 600 16px/20px Montserrat;
        text-align: center;
      }

      .row {
        margin-top: 16px;

        &.double {
          label {
            width: 100%;
          }

          span:last-child {
            label {
              width: 100%;
              margin-top: 16px;
              margin-left: 0;
            }
          }
        }

        .radio-container {
          margin-top: 16px;
          display: flex;
          justify-content: space-between;
        }

        label {
          display: inline-block;
          height: 44px;
          width: 100% !important;

          &.message {
            height: 160px;
          }

          &.send {
            height: 60px;
          }

          &.msg {
            text-align: center;
          }

          &.file {
            height: auto;

            input[type="file"] {
              margin-top: 10px;
              width: 100%;

              &:first-child {
                margin-top: 0;
              }
            }
          }

          &.radio {
            margin-left: 0;

            &:first-child {
              margin-left: 0;
            }

            &:nth-child(2) {
              text-align: center;
            }

            &:last-child {
              text-align: right;
            }

            span.label {
              margin-left: 10px;
              font: 600 14px/17px Montserrat;
            }

            &.label {
              margin-left: 0;
              cursor: default;

              span.label {
                margin-left: 0;
              }
            }
          }

          .tip {
            bottom: 53px;
            border-width: 1px;
            font-size: 11px;

            &:before {
              bottom: -18px;
            }
          }
        }
      }
    }
  }
}
</style>

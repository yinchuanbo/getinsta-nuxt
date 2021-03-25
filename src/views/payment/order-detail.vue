<template>
  <div class="order-detail" :class="{ 'client': routerClient }">
    <div class="wrapper">
      <h1>{{ $t('orderDetail.title') }}</h1>
      <h2>{{ $t('orderDetail.subtitle') }}</h2>
      <div class="order-detail-container">
        <h3>
          {{ $t('orderDetail.form.YourOrder') }}
          <span v-if="!routerClient && $i18n.locale === 'en'" class="btn-container" @click="ga0">
            <button-white :text="$t('orderDetail.form.ViewProgress')" :white="false" :font-size="'header-small'" />
          </span>
        </h3>
        <div class="content">
          <div class="content__unit">
            <h4>{{ $t('orderDetail.form.OrderNumber') }}: <b>{{ orderData.orderNumber }}</b></h4>
            <div class="container">
              <div class="cart-list">
                <div v-for="(unit, i) in orderData.tasks" :key="i" class="cart-list__unit">
                  <!--icon-->
                  <img v-if="unit['is_coin'] !== 1"
                       :src="unit.task_type === 1 ? unit.like_pic_url : unit.follow_pic_url"
                       alt="avatar"
                  >
                  <img v-if="unit['is_coin'] === 1"
                       src="../../assets/images/global/icon_coins.svg"
                       alt="Coin icon"
                  >
                  <!--text-->
                  <p v-if="unit['cycle_type'] > 1">
                    {{ unit.purchase_quantity }}
                    {{ unit.task_type === 2 ? 'followers' : 'likes' }}
                    × {{ unit.cycle_type }}-Day Subscription
                    <br>
                    {{ $i18n.locale === 'en' ? $t('global.currencySymbol') : '' }}
                    {{ unit.price_decimal | numToFixed }}
                    {{ $i18n.locale !== 'en' ? $t('global.currencySymbol') : '' }}
                  </p>
                  <p v-if="(!unit['cycle_type'] || unit['cycle_type'] === 1) && unit['is_coin'] !== 1">
                    {{ unit.purchase_quantity }} {{ unit.task_type === 2 ? 'followers' : 'likes' }}
                    {{
                      unit.gives && unit.gives[0] && unit.gives[0].quantity !== 0
                        ? (unit.gives[0].type === 1 ? `(+ ${unit.gives[0].quantity} Likes)`
                          : `(+ ${unit.gives[0].quantity} Followers)`) : ''
                    }}
                    <br>
                    {{ $i18n.locale === 'en' ? $t('global.currencySymbol') : '' }}
                    {{ unit.price_decimal | numToFixed }}
                    {{ $i18n.locale !== 'en' ? $t('global.currencySymbol') : '' }}
                  </p>
                  <p v-if="(!unit['cycle_type'] || unit['cycle_type'] === 1) && unit['is_coin'] === 1">
                    {{ unit.purchase_quantity }} Coins
                    {{
                      unit.gives && unit.gives[0] && unit.gives[0].quantity !== 0
                        ? `(+ ${unit.gives[0].quantity} Coins)` : ''
                    }}
                    <br>
                    {{ $i18n.locale === 'en' ? $t('global.currencySymbol') : '' }}
                    {{ unit.price_decimal | numToFixed }}
                    {{ $i18n.locale !== 'en' ? $t('global.currencySymbol') : '' }}
                  </p>
                </div>
              </div>
            </div>
            <p v-if="$i18n.locale === 'en'" class="note">Tax: $0.00</p>
            <p class="note">
              {{ $t('orderDetail.form.TotalPrice') }}:
              {{ $i18n.locale === 'en' ? $t('global.currencySymbol') : '' }}
              {{ cartTotalPrice | numToFixed }}
              {{ $i18n.locale !== 'en' ? $t('global.currencySymbol') : '' }}
            </p>
          </div>
          <div class="content__unit">
            <h4>{{ $t('orderDetail.form.BillingInformation') }}</h4>
            <div class="container">
              <div class="text">
                <p>{{ orderData.bill.firstName }} {{ orderData.bill.lastName }}</p>
                <p>{{ orderData.bill.address }}</p>
                <p>{{ orderData.bill.zipCode }}</p>
                <p>{{ orderData.bill.city }}</p>
                <p>{{ orderData.bill.state }}</p>
                <p>{{ orderData.bill.country }}</p>
                <p>{{ $t('orderDetail.form.Phone') }}: {{ orderData.bill.phone }}</p>
                <p>{{ $t('orderDetail.form.Email') }}: {{ orderData.bill.email }}</p>
                <p>{{ $t('orderDetail.form.PaymentMethod') }}: {{ orderData.bill.paymentMethod }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="bottom-text">
        <div class="unit">
          <h3>{{ $t('orderDetail.note.InstantDelivery.title') }}</h3>
          <p>{{ $t('orderDetail.note.InstantDelivery.text') }}</p>
        </div>
        <div class="unit">
          <h3>{{ $t('orderDetail.note.24/7Support.title') }}</h3>
          <p>
            {{ $t('orderDetail.note.24/7Support.text0') }}
            <a href="mailto:support@easygetinsta.com">{{ $t('orderDetail.note.24/7Support.link') }}</a>
            {{ $t('orderDetail.note.24/7Support.text1') }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ButtonWhite from '@/components/button/button-white';

export default {
  name: 'OrderDetail',
  components: { ButtonWhite },
  filters: {
    numToFixed(num) {
      if (num === null || num === '' || num === undefined) {
        return 0;
      } else {
        return num.toFixed(2);
      }
    }
  },
  data() {
    return {
      meta: {
        title: 'Congratulations!'
      },
      routerClient: false,
      orderData: {
        orderNumber: 0,
        bill: {
          email: '',
          name: '',
          country: '',
          paymentMethod: ''
        },
        tasks: []
      }
    };
  },
  computed: {
    cartTotalPrice() {
      let total = 0;
      for (let i = 0; i < this.orderData.tasks.length; i++) {
        total = this.COMMON.accAdd(total, this.orderData.tasks[i].price_decimal);
      }
      return total;
    }
  },
  watch: {
    $route() {
      this.routerClient
        = this.COMMON.getURLQuery('url_cart') !== null
        && this.COMMON.getURLQuery('url_cart') !== '0';
    }
  },
  mounted() {
    this.routerClient
      = this.COMMON.getURLQuery('url_cart') !== null
      && this.COMMON.getURLQuery('url_cart') !== '0';
    this.collectOrderData();
    this.metaDataInit();
  },
  methods: {
    metaDataInit() {
      if (this.$route.path === '/checkout-2') {
        this.meta.title = `${this.$store.state.productName} ${this.$t('orderDetail.meta.title-1')}`;
      } else {
        if (this.$i18n.locale === 'en') {
          this.meta.title = `${this.$store.state.productName} ${this.$t('orderDetail.meta.title-0')}`;
        } else {
          this.meta.title = `${this.$t('orderDetail.meta.title-0')}`;
        }
      }
    },
    collectOrderData() {
      if (this.$storage.has('orderData')) {
        this.orderData = this.$storage.get('orderData');

        if (this.COMMON.getURLQuery('order_id') !== null) {
          this.orderData.orderNumber = this.COMMON.getURLQuery('order_id');
        }

        this.$storage.remove('cartList');
        this.$storage.remove('cartCache');
      } else {
        // this.$router.push({ path: '/user' });
        console.error('collectOrderData: There is no orderData.');
      }
    },
    ga0() {
      this.$ga.event('buttonclick', 'click', 'tkpagevp');
      this.$router.push({ path: '/user', query: { anchor: 'task' } });
    }
  }
};
</script>

<style lang="scss" scoped>
.order-detail {
  position: relative;
  padding-top: 80px;
  padding-bottom: 100px;

  &.client {
    padding-top: 0;

    &:before {
      height: 300px;
    }
  }

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 380px;
    background-color: #F8F8F8;
  }

  .wrapper {
    padding-top: 48px;

    h1 {
      font: 600 28px/34px Montserrat;
      color: #2A2A2A;
      text-align: center;
    }

    h2 {
      margin-top: 12px;
      font: 400 16px Montserrat;
      color: #A8A8A8;
      text-align: center;
    }

    .order-detail-container {
      margin-top: 50px;
      padding: 60px;
      background-color: #fff;
      box-shadow: 0 0 20px rgba(0, 19, 97, 0.07);
      border-radius: 12px;

      h3 {
        display: flex;
        justify-content: space-between;
        align-items: center;

        font: 600 24px/32px Montserrat;
        color: #2A2A2A;

        .btn-container {
          display: inline-block;
          font-size: 0;
          width: 162px;
          height: 40px;
        }
      }

      .content {
        margin-top: 36px;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;

        .content__unit {
          width: 526px;

          h4 {
            font: 400 16px/20px Montserrat;
            color: #A8A8A8;

            b {
              font-weight: 500;
              color: #2A2A2A;
            }
          }

          .container {
            margin-top: 20px;
            margin-bottom: 16px;
            padding: 24px;
            width: 100%;
            background-color: #F6F6F6;
            border: 2px dotted #E1E1E1;
            border-radius: 6px;

            .cart-list {
              .cart-list__unit {
                margin-top: 20px;
                font-size: 0;

                &:first-child {
                  margin-top: 0;
                }

                * {
                  vertical-align: middle;
                }

                img {
                  width: 64px;
                  height: 64px;
                  border-radius: 50%;
                }

                p {
                  margin-left: 24px;
                  display: inline-block;
                  font: 600 16px/20px Montserrat;
                  max-width: 80%;
                  @include text-ellipsis;
                }
              }
            }

            .text {
              p {
                font: 500 16px/32px Montserrat;
              }
            }
          }

          p.note {
            font: 500 16px/32px Montserrat;
          }
        }
      }
    }

    .bottom-text {
      .unit {
        margin-top: 36px;

        &:first-child {
          margin-top: 72px;
        }

        h3 {
          font: 600 18px/30px Montserrat;
          color: #2A2A2A;
        }

        p {
          margin-top: 10px;
          font: 400 14px/24px Montserrat;
          color: #A8A8A8;

          a {
            text-decoration: underline;
          }
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .order-detail {
    padding-top: 44px;
    padding-bottom: 80px;

    &.client {
      padding-top: 0;

      &:before {
        height: 176px;
      }
    }

    &:before {
      height: 220px;
      background-color: #005FFF;
    }

    .wrapper {
      padding: 30px 4vw 0;

      h1 {
        font: 700 22px/28px Montserrat;
        color: #fff;
      }

      h2 {
        margin-top: 16px;
        font: 400 14px Montserrat;
        color: #fff;
      }

      .order-detail-container {
        margin-top: 26px;
        padding: 6vw 4vw;
        box-shadow: 0 5px 10px rgba(0, 19, 97, 0.07);
        border-radius: 6px;

        h3 {
          font: 600 16px/20px Montserrat;

          .btn-container {
            width: 105px;
            height: 28px;
          }
        }

        .content {
          margin-top: 13px;
          display: block;

          .content__unit {
            width: 100%;

            &:last-child {
              margin-top: 50px;
            }

            h4 {
              font: 400 14px/17px Montserrat;

              b {
                font-weight: 500;
              }
            }

            .container {
              margin-top: 16px;
              margin-bottom: 12px;
              padding: 4vw;
              border: 1px dotted #E1E1E1;
              border-radius: 3px;

              .cart-list {
                .cart-list__unit {
                  margin-top: 16px;

                  img {
                    width: 40px;
                    height: 40px;
                  }

                  p {
                    margin-left: 9px;
                    font: 600 14px/17px Montserrat;
                  }
                }
              }

              .text {
                p {
                  font: 500 14px/16px Montserrat;
                }
              }
            }

            p.note {
              font: 500 14px/16px Montserrat;
            }
          }
        }
      }

      .bottom-text {
        .unit {
          margin-top: 30px;

          &:first-child {
            margin-top: 56px;
          }

          h3 {
            font: 600 14px/15px Montserrat;
          }

          p {
            margin-top: 9px;
            font: 400 14px/17px Montserrat;
          }
        }
      }
    }
  }
}
</style>

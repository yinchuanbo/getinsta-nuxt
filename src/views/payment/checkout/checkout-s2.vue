<template>
  <div
    class="checkout"
    :class="{ client: routerClient }"
    style="background: #fff"
  >
    <div class="wrapper" :class="{ processing: loading }">
      <ValidationObserver v-slot="{ invalid, validate, reset }">
        <div class="checkout__main">
          <!-- <h1 class="mobile">{{ $t('checkout.form.title') }}</h1> -->
          <!--Purchase Form-->
          <!--Items in Cart-->
          <div class="checkout__main_wrapper right">
            <div class="checkout__main_wrapper_container">
              <h2>
                <span>{{ $t('checkout.cart.title') }}</span>
              </h2>

              <!--Cart List-->
              <transition name="fade-skeleton" mode="out-in">
                <div v-if="!cartLoading" key="Box1">
                  <div v-if="cartList && cartList.length !== 0" class="checkout__main_cart">
                    <div class="checkout__main_cart-list">
                      <div v-for="(unit, i) in cartList" :key="i" class="unit">
                        <div class="national-flag" v-if="unit.icon_url" :style="{background: 'url('+ unit.icon_url +')', backgroundSize: '100% 100%'}">
                          <!-- <img :src="unit.icon_url" alt=""> -->
                        </div>
                        <!--icon-->
                        <img
                          v-if="unit['is_coin'] !== 1"
                          :src="
                            unit.task_type === 1 && !unit.require_post_count
                              ? unit.like_pic_url
                              : unit.follow_pic_url
                          "
                          alt="Task avatar"
                        />

                        <img
                          v-if="unit['is_coin'] !== 1 && unit.task_type === 1 && unit.require_post_count && unit.require_post_count != 0"
                          :src="unit.follow_pic_url"
                          alt="Task avatar"
                        />


                        <img
                          v-if="unit['is_coin'] === 1"
                          src="../../../assets/images/global/icon_coins.svg"
                          alt="Coin icon"
                        />

                        <!--texts-->
                        <div class="text">
                          <!--main texts-->
                          <div class="text-div">
                            <p
                              v-if="
                                unit['cycle_type'] > 1 &&
                                  unit['product_type'] === 2
                              "
                              class="main"
                            >
                              <span>
                                {{ unit.purchase_quantity }} Followers/Day |
                                {{
                                  $i18n.locale === 'en'
                                    ? $t('global.currencySymbol')
                                    : ''
                                }}
                                {{
                                  (unit.price_decimal / unit.cycle_type)
                                    | numToFixed
                                }}
                                {{
                                  $i18n.locale !== 'en'
                                    ? $t('global.currencySymbol')
                                    : ''
                                }}
                              </span>
                            </p>
                            <p
                              v-if="
                                unit['cycle_type'] > 1 &&
                                  unit['product_type'] === 1
                              "
                              class="main"
                            >
                              <span>
                                {{ unit.purchase_quantity }} Likes/Day | {{ $i18n.locale === 'en' ? $t('global.currencySymbol') : ''
                                }}
                                {{
                                  (unit.price_decimal / unit.cycle_type)
                                    | numToFixed
                                }}
                                {{
                                  $i18n.locale !== 'en'
                                    ? $t('global.currencySymbol')
                                    : ''
                                }}
                              </span>
                            </p>
                            <p v-if="!unit['cycle_type'] || unit['cycle_type'] === 1" class="main">
                              <span v-if="unit['is_coin'] !== 1 && !unit.require_post_count">
                                {{ unit.purchase_quantity }} {{ unit.task_type === 2 ? displayletFollowers : displayletLikes }}
                                <!-- | {{ $i18n.locale === 'en' ? $t('global.currencySymbol') : '' }}
                              {{ unit.price_decimal | numToFixed }}
                              {{ $i18n.locale !== 'en' ? $t('global.currencySymbol') : '' }} -->
                              </span>

                              <span v-if="unit['is_coin'] !== 1 && unit.require_post_count">
                                {{ unit.purchase_quantity }} Likes/Post
                              </span>


                              <span v-if="unit['is_coin'] === 1">
                                {{ unit.purchase_quantity }} Coins | {{ $i18n.locale === 'en' ? $t('global.currencySymbol'): ''}}
                                {{ unit.price_decimal | numToFixed }}
                                {{ $i18n.locale !== 'en' ? $t('global.currencySymbol'): ''}}
                              </span>
                            </p>
                            <!--gifts texts-->
                            <p v-if="unit['cycle_type'] > 1" class="subscribe">
                              <span>{{ unit['cycle_type'] }}-Day Subscription</span>
                            </p>
                            <p v-if="unit['cycle_type'] == 1 && unit.require_post_count" class="subscribe">
                              <span>For {{ unit['require_post_count'] }} New Posts</span>
                            </p>

                            <p
                              v-if="
                                (!unit['cycle_type'] ||
                                  unit['cycle_type'] === 1) &&
                                  unit['is_coin'] !== 1 &&
                                  unit.gives &&
                                  unit.gives[0] &&
                                  unit.gives[0].quantity !== 0
                              "
                              class="gifts"
                            >
                              <span>
                                {{
                                  unit.gives[0].type === 1
                                    ? '+' + unit.gives[0].quantity + ' likes '
                                    : ''
                                }}

                                <span v-if="unit.gives[0].type === 2">
                                  +
                                  <b class="type2-icon"></b>
                                  {{ unit.gives[0].quantity }}
                                  Free
                                </span>
                                <!-- {{ (unit.gives[0].type === 2 ? '+' + unit.gives[0].quantity + ' followers ' : '') }} -->
                                {{
                                  unit.gives[0].type === 3
                                    ? '+' + unit.gives[0].quantity + ' coins '
                                    : ''
                                }}
                              </span>
                            </p>
                            <p
                              v-if="
                                (!unit['cycle_type'] ||
                                  unit['cycle_type'] === 1) &&
                                  unit['is_coin'] === 1 &&
                                  unit.gives &&
                                  unit.gives[0] &&
                                  unit.gives[0].quantity !== 0
                              "
                              class="gifts"
                            >
                              <span>
                                {{ `+ ${unit.gives[0].quantity} Coins` }}
                              </span>
                            </p>
                          </div>

                          <div v-if="unit.cycle_type === 1 && !unit.require_post_count" class="addNum">
                            <div>
                              <span
                                @click="
                                  reduceClick(
                                    unit.product_id,
                                    unit.product_num,
                                    unit.like_id
                                  )
                                "
                              >-</span>
                              <span>{{ unit.product_num }}</span>
                              <span
                                @click="addClick(unit.product_id, unit.product_num, unit.like_id)"
                              >+</span>
                            </div>
                          </div>

                          <div class="addPrice">
                            {{
                              $i18n.locale === 'en'
                                ? $t('global.currencySymbol')
                                : ''
                            }}
                            {{
                              (unit.price_decimal * (unit.product_num ? unit.product_num : 1)) | numToFixed
                            }}
                            {{
                              $i18n.locale !== 'en'
                                ? $t('global.currencySymbol')
                                : ''
                            }}
                          </div>
                        </div>
                        <i
                          :title="$t('checkout.cart.delete')"
                          @click="cartUnitDelete(i)"
                        ></i>
                      </div>
                    </div>
                    <div class="checkout__main_cart-total">
                      <div v-if="flen" class="followers-price">
                        <p>Total Followers:</p>
                        <b>{{ flen }}</b>
                      </div>
                      <div v-if="llen" class="followers-price">
                        <p>Total Likes:</p>
                        <b>{{ llen }}</b>
                      </div>
                      <!-- <div class="total-price">
                        <p>Total Price:</p>
                        <b>{{ cartOriginalPrice | numToFixed }} {{ $t('global.currency') }}</b>
                      </div> -->
                      <!-- <div class="discount-price">
                        <p>Discount:</p>
                        <b>-{{ (cartOriginalPrice - cartTotalPrice) | numToFixed }} {{ $t('global.currency') }}</b>
                      </div> -->
                      <div v-if="flen || llen" class="price-line"></div>
                      <div class="all-price">
                        <p>Subtotal:</p>
                        <b>{{ cartTotalPrice | numToFixed }}
                          {{ $t('global.currency') }}</b>
                      </div>
                      <!-- {{ $t('checkout.cart.subtotal') }}:
                      <b>{{ cartTotalPrice | numToFixed }} {{ $t('global.currency') }}</b> -->
                    </div>
                  </div>
                  <div v-if="!cartList || cartList.length === 0" class="checkout__main_cart">
                    <list-empty :msg="$t('checkout.error.cartEmpty.text')" />
                  </div>
                </div>
                <div v-if="cartLoading" key="Box2" class="checkout__main_cart">
                  <div class="checkout__main_cart-list">
                    <div class="unit skeleton">
                      <div class="img"></div>
                      <div class="p"></div>
                    </div>
                    <div class="unit skeleton">
                      <div class="img"></div>
                      <div class="p"></div>
                    </div>
                  </div>
                </div>
              </transition>
            </div>

            <!-- <p v-if="payChannelStripe" class="checkout__main_wrapper_p">
              By placing this order, you agree to the Terms & Privacy Policy.
            </p> -->

            <!-- <p v-if="!payChannelStripe" class="checkout__main_wrapper_p">
              {{ $t('checkout.note.text0') }}
              <router-link to="/terms">{{ $t('checkout.note.link0') }}</router-link>
              {{ $t('checkout.note.text1') }}
              {{ $store.state.productName }} {{ $t('checkout.note.text2') }}
              <router-link to="/privacy">{{ $t('checkout.note.link1') }}</router-link>
              {{ $t('checkout.note.text3') }}
              <router-link to="/refund">{{ $t('checkout.note.link2') }}</router-link>
              {{ $t('checkout.note.text4') }}
            </p> -->
          </div>
          <div class="checkout__main_wrapper left">
            <div class="checkout__main_wrapper_container">
              <h2 class="pc">
                <span>{{ $t('checkout.form.title') }}</span>
              </h2>
              <h2 class="mobile"><span>Complete Your Order</span></h2>

              <div v-show="!formLoading" class="checkout__main_form">
                <!--Tab & Credit Card Form-->
                <div class="pay-method">
                  <!--Tab-->
                  <!--Radio-->
                  <div class="row radio-group">
                    <!--Stripe-->
                    <label v-if="payChannelStripe" class="radio">
                      <input
                        v-model="form.field.paymentMethod"
                        type="radio"
                        name="payment-method"
                        value="Credit Card"
                      />
                      <!--<i class="CreditCard pc"></i>-->
                      <span>{{ $t('checkout.form.CreditCard') }}</span>
                    </label>

                    <!--Paddle-->
                    <label v-if="payChannelPaddle" class="radio Paddle">
                      <input
                        v-model="form.field.paymentMethod"
                        type="radio"
                        name="payment-method"
                        value="Paddle"
                      />
                      <i class="Paddle"></i>
                    </label>

                    <!--PayPal-->
                    <!--<label v-if="cartTotalPrice > 4" class="radio PayPal">-->
                    <!--                    <label-->
                    <!--                      v-if="payChannelPayPal"-->
                    <!--                      class="radio PayPal"-->
                    <!--                    >-->
                    <!--                      <input-->
                    <!--                        v-model="form.field.paymentMethod"-->
                    <!--                        type="radio"-->
                    <!--                        name="payment-method"-->
                    <!--                        value="PayPal"-->
                    <!--                      >-->
                    <!--                      <i class="PayPal"></i>-->
                    <!--                    </label>-->

                    <!--HotAntPay-->
                    <label v-if="payChannelCreditCard" class="radio">
                      <!--HotAntPay-->
                      <input
                        v-model="form.field.paymentMethod"
                        type="radio"
                        name="payment-method"
                        value="Credit Card"
                        @click="resetVeeValidateError(reset)"
                      />
                      <!--<i class="CreditCard pc"></i>-->
                      <span>{{ $t('checkout.form.CreditCard') }}</span>
                      <i class="VISA"></i>
                      <i class="MasterCard"></i>
                      <i class="AmericanExpress"></i>
                      <i class="JCB"></i>
                    </label>

                    <!--PayOp-->
                    <!--<label class="radio PayOp">-->
                    <!--  <input v-model="form.field.paymentMethod" type="radio" name="payment-method" value="PayOp">-->
                    <!--  <i class="PayOp"></i>-->
                    <!--</label>-->

                    <!--Payssion-->
                    <label
                      v-if="payChannelPayssion"
                      class="radio Payssion"
                      @click="payssionSelected()"
                    >
                      <input
                        v-model="form.field.paymentMethod"
                        type="radio"
                        name="payment-method"
                        value="Payssion"
                      />
                      <span class="payssion-el">Local Payment</span>
                      <i class="flag">
                        <img
                          :src="payssionCountryVModel.countryFlag"
                          alt="Country Flag"
                        />
                      </i>
                      <label class="radio-select payssion-el">
                        <select
                          v-model="payssionCountryVModel"
                          @change="
                            payssionCountrySelectHandle(payssionCountryVModel)
                          "
                        >
                          <option
                            v-for="(unit, i) in payssionCountryList"
                            :key="i"
                            :value="unit"
                          >
                            {{ unit.countryName }}
                          </option>
                        </select>
                      </label>
                    </label>

                    <div
                      v-if="form.field.paymentMethod === 'Payssion'"
                      class="payssion-pm"
                    >
                      <div
                        v-for="(
                          unit, i
                        ) in payssionCountryVModel.supportedPayment"
                        :key="i"
                        class="unit"
                        :title="unit.pmName"
                        :class="{
                          on: unit.pmID === payssionSupportedPaymentVModel.pmID,
                        }"
                        @click="payssionMethodClick(unit)"
                      >
                        <img :src="unit.icon" alt="pm icon" />
                      </div>
                    </div>
                  </div>

                  <!--Stripe Credit Card Form-->
                  <div v-if="payChannelStripe" class="radio-fieldset">
                    <div class="fieldset c-card">
                      <div class="row" :class="{ invalid: cardNumberError }">
                        <label
                          id="card-number"
                          class="stripe-filed"
                          @click="resetStripeError"
                        ></label>
                        <i class="error">{{ cardNumberErrorMsg }}</i>
                      </div>
                      <div class="row">
                        <label class="title">{{ $t('checkout.form.ExpiryDate') }}:</label>
                        <div class="double">
                          <div
                            class="set"
                            :class="{ invalid: cardExpiryError }"
                          >
                            <label
                              id="card-expiry"
                              class="stripe-filed expiry"
                              @click="resetStripeError"
                            ></label>
                            <i class="error">{{ cardExpiryErrorMsg }}</i>
                          </div>
                        </div>
                        <div class="double">
                          <div class="set" :class="{ invalid: cardCVCError }">
                            <label
                              id="card-cvc"
                              class="stripe-filed cvc"
                              @click="resetStripeError"
                            ></label>
                            <i class="error">{{ cardCVCErrorMsg }}</i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!--HotAntPay Credit Card Form-->
                  <div
                    v-if="
                      payChannelCreditCard &&
                        form.field.paymentMethod === 'Credit Card'
                    "
                    class="radio-fieldset"
                  >
                    <div class="fieldset c-card">
                      <!--Card Number-->
                      <div class="row">
                        <ValidationProvider
                          v-slot="{ classes, errors }"
                          name="Card Number"
                          rules="required|numeric_lite|min_lite:13|max_lite:19"
                        >
                          <div class="row" :class="classes">
                            <label>
                              <input
                                v-model="form.field.cardNumber"
                                type="tel"
                                :placeholder="$t('checkout.form.CardNumber')"
                              />
                            </label>
                            <i class="error">{{ errors[0] }}</i>
                          </div>
                        </ValidationProvider>
                      </div>

                      <!--Expiry Date, CVC-->
                      <div class="row has-title">
                        <label class="title">{{ $t('checkout.form.ExpiryDate') }}:</label>

                        <div class="double">
                          <!--Card ED Month-->
                          <ValidationProvider
                            v-slot="{ classes, errors }"
                            name="Card Expire Month"
                            rules="required_lite|numeric_lite|between_lite:01,12|digits_lite:2"
                          >
                            <div class="month" :class="classes">
                              <label>
                                <input
                                  v-model="form.field.cardExpireMonth"
                                  type="tel"
                                  placeholder="MM"
                                />
                              </label>
                              <i class="error">{{ errors[0] }}</i>
                            </div>
                          </ValidationProvider>
                          <!--Card ED Year-->
                          <ValidationProvider
                            v-slot="{ classes, errors }"
                            name="Card Expire Year"
                            rules="required_lite|numeric_lite|between_lite:2020,2030|digits_lite:4"
                          >
                            <div class="year" :class="classes">
                              <label>
                                <input
                                  v-model="form.field.cardExpireYear"
                                  type="tel"
                                  placeholder="YYYY"
                                />
                              </label>
                              <i class="error">{{ errors[0] }}</i>
                            </div>
                          </ValidationProvider>
                        </div>
                        <!--Card CVC-->
                        <ValidationProvider
                          v-slot="{ classes, errors }"
                          name="Card CVC"
                          rules="required_lite|numeric_lite|min_lite:3|max_lite:4"
                        >
                          <div class="double" :class="classes">
                            <label>
                              <input
                                v-model="form.field.cardCVC"
                                type="tel"
                                placeholder="CVC"
                              />
                            </label>
                            <i class="error">{{ errors[0] }}</i>
                          </div>
                        </ValidationProvider>
                      </div>
                    </div>
                  </div>
                </div>

                <!--first name, last name-->
                <div class="row">
                  <div class="double">
                    <ValidationProvider
                      v-slot="{ classes, errors }"
                      name="First Name"
                      rules="required_lite"
                    >
                      <div class="set" :class="classes">
                        <label>
                          <input
                            v-model="form.field.firstName"
                            type="text"
                            :placeholder="$t('checkout.form.FirstName')"
                          />
                        </label>
                        <i class="error">{{ errors[0] }}</i>
                      </div>
                    </ValidationProvider>
                  </div>

                  <div class="double">
                    <ValidationProvider
                      v-slot="{ classes, errors }"
                      name="Last Name"
                      rules="required_lite"
                    >
                      <div class="set" :class="classes">
                        <label>
                          <input
                            v-model="form.field.lastName"
                            type="text"
                            :placeholder="$t('checkout.form.LastName')"
                          />
                        </label>
                        <i class="error">{{ errors[0] }}</i>
                      </div>
                    </ValidationProvider>
                  </div>
                </div>

                <!--Street Address-->
                <ValidationProvider
                  v-if="
                    !payChannelStripe &&
                      form.field.paymentMethod === 'Credit Card'
                  "
                  v-slot="{ classes, errors }"
                  name="Street Address"
                  rules="required"
                >
                  <div class="row" :class="classes">
                    <label>
                      <input
                        v-model="form.field.address"
                        type="text"
                        :placeholder="$t('checkout.form.StreetAddress')"
                      />
                    </label>
                    <i class="error">{{ errors[0] }}</i>
                  </div>
                </ValidationProvider>

                <!--Zip Code, Country (Stripe)-->
                <div v-if="payChannelStripe" class="row">
                  <div class="double">
                    <div class="set" :class="{ invalid: cardPostalCodeError }">
                      <label id="card-postal" class="stripe-filed"></label>
                      <i class="error">{{ cardPostalCodeErrorMsg }}</i>
                    </div>
                  </div>

                  <div class="double">
                    <ValidationProvider
                      v-slot="{ classes, errors }"
                      name="Country"
                      rules="required_lite"
                    >
                      <div class="set" :class="classes">
                        <label>
                          <select
                            v-model="form.field.country"
                            :class="[classes, { changed: countryGeoIPChange }]"
                          >
                            <option value="" disabled>
                              {{ $t('checkout.form.Country') }}
                            </option>
                            <option
                              v-for="(unit, i) in countryDB"
                              :key="i"
                              :value="unit[0]"
                            >
                              {{ unit[1] }}
                            </option>
                          </select>
                        </label>
                        <i class="error">{{ errors[0] }}</i>
                      </div>
                    </ValidationProvider>
                  </div>
                </div>

                <!--Zip Code, City-->
                <div
                  v-if="
                    !payChannelStripe &&
                      form.field.paymentMethod === 'Credit Card'
                  "
                  class="row"
                >
                  <div class="double">
                    <ValidationProvider
                      v-slot="{ classes, errors }"
                      name="Zip Code"
                      rules="required_lite"
                    >
                      <div class="set" :class="classes">
                        <label>
                          <input
                            v-model="form.field.zipCode"
                            type="text"
                            :placeholder="$t('checkout.form.ZipCode')"
                          />
                        </label>
                        <i class="error">{{ errors[0] }}</i>
                      </div>
                    </ValidationProvider>
                  </div>

                  <div class="double">
                    <ValidationProvider
                      v-slot="{ classes, errors }"
                      name="City"
                      rules="required_lite"
                    >
                      <div class="set" :class="classes">
                        <label>
                          <input
                            v-model="form.field.city"
                            type="text"
                            :placeholder="$t('checkout.form.City')"
                          />
                        </label>
                        <i class="error">{{ errors[0] }}</i>
                      </div>
                    </ValidationProvider>
                  </div>
                </div>

                <!--State, Country-->
                <div
                  v-if="
                    !payChannelStripe &&
                      form.field.paymentMethod === 'Credit Card'
                  "
                  class="row"
                >
                  <div class="double">
                    <ValidationProvider
                      v-slot="{ classes, errors }"
                      name="State/Province"
                      rules="required_lite"
                    >
                      <div class="set" :class="classes">
                        <label>
                          <input
                            v-model="form.field.state"
                            type="text"
                            :placeholder="$t('checkout.form.State')"
                          />
                        </label>
                        <i class="error">{{ errors[0] }}</i>
                      </div>
                    </ValidationProvider>
                  </div>

                  <div class="double">
                    <ValidationProvider
                      v-slot="{ classes, errors }"
                      name="Country"
                      rules="required_lite"
                    >
                      <div class="set" :class="classes">
                        <label>
                          <select
                            v-model="form.field.country"
                            :class="[classes, { changed: countryGeoIPChange }]"
                          >
                            <option value="" disabled>
                              {{ $t('checkout.form.Country') }}
                            </option>
                            <option
                              v-for="(unit, i) in countryDB"
                              :key="i"
                              :value="unit[0]"
                            >
                              {{ unit[1] }}
                            </option>
                          </select>
                        </label>
                        <i class="error">{{ errors[0] }}</i>
                      </div>
                    </ValidationProvider>
                  </div>
                </div>

                <!--Country-->
                <ValidationProvider
                  v-if="
                    !payChannelStripe &&
                      form.field.paymentMethod !== 'Credit Card' &&
                      form.field.paymentMethod !== 'Payssion'
                  "
                  v-slot="{ classes, errors }"
                  name="Country"
                  rules="required"
                >
                  <div class="row" :class="classes">
                    <label>
                      <select
                        v-model="form.field.country"
                        :class="[classes, { changed: countryGeoIPChange }]"
                      >
                        <option value="" disabled>
                          {{ $t('checkout.form.Country') }}
                        </option>
                        <option
                          v-for="(unit, i) in countryDB"
                          :key="i"
                          :value="unit[0]"
                        >
                          {{ unit[1] }}
                        </option>
                      </select>
                    </label>
                    <i class="error">{{ errors[0] }}</i>
                  </div>
                </ValidationProvider>

                <!--Phone-->
                <ValidationProvider
                  v-if="
                    !payChannelStripe &&
                      form.field.paymentMethod === 'Credit Card'
                  "
                  v-slot="{ classes, errors }"
                  name="Phone"
                  rules="required|numeric"
                >
                  <div class="row" :class="classes">
                    <label>
                      <input
                        v-model="form.field.phone"
                        type="text"
                        :placeholder="$t('checkout.form.Phone')"
                      />
                    </label>
                    <i class="error">{{ errors[0] }}</i>
                  </div>
                </ValidationProvider>

                <!--Email-->
                <ValidationProvider
                  v-slot="{ classes, errors }"
                  name="Email"
                  rules="required|email"
                >
                  <div class="row" :class="classes">
                    <label>
                      <input
                        v-model="form.field.email"
                        type="email"
                        :placeholder="$t('checkout.form.Email')"
                      />
                    </label>
                    <i class="error">{{ errors[0] }}</i>
                  </div>
                </ValidationProvider>

                <!-- 购买按钮 -->
                <div
                  class="checkout__main_wrapper_btn-container"
                  @click="purchaseGate(invalid, validate)"
                >
                  <button-yellow-icon
                    :text="$t('checkout.BuyNow')"
                    :loading="loading"
                  />
                </div>
              </div>
              <div v-show="formLoading" class="checkout__main_form loading">
                <img
                  src="../../../assets/images/global/loading-puff-black.svg"
                  alt="loading"
                />
              </div>
            </div>
          </div>
        </div>
      </ValidationObserver>
    </div>

    <transition name="fade">
      <div
        v-if="dialogFail"
        key="diag1"
        class="uni-dialog-box enter-box enter-mask"
      >
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
      <div
        v-if="stripeIframe"
        key="box1"
        class="uni-dialog-box stripe-iframe enter-box enter-mask"
      >
        <div class="mask"></div>
        <div class="container">
          <div class="loading-puff-type-1"></div>
          <div class="content">
            <div id="stripe-iframe" class="content"></div>
          </div>
        </div>
      </div>
    </transition>
    <transition name="fade-skeleton">
      <div v-if="loading" class="loading-animation">
        <i></i>
        <p>{{ $t('global.loading.processing') }}</p>
      </div>
    </transition>

    <form
      v-if="hotAntPayRequestBody !== {}"
      ref="hotAntPayForm"
      action="https://security.hotantpay.com/Interface"
      method="post"
    >
      <input
        v-for="(value, key, i) in hotAntPayRequestBody"
        :key="i"
        type="hidden"
        :name="key"
        :value="value"
      />
    </form>
  </div>
</template>

<script>
// API
import apiTask from '@/api/api.task';
// import apiGeoIP from '@/api/api.geoip';
import apiPayment from '@/api/api.payment';
import apiOther from '@/api/api.other';
import apiIOT from '@/api/api.iot';
import apiV2 from '@/api/api.v2';

//JSON
import countryDB from '@/assets/json/country.json';

// Component
import ListEmpty from '@/components/list/list-empty';
import ButtonPurple from '@/components/button/button-purple';
import ButtonYellowIcon from '@/components/button/button-yellow-icon';
import defaultAvatar from '@/assets/images/global/icon_avatar_default.svg';

// images
// Payssion
// import payssionIconPaytmIn from '@/assets/images/payment/passion/paytm_in.png';
import payssionIconUpiIn from '@/assets/images/payment/passion/upi_in.png';
import payssionIconEbankingIn from '@/assets/images/payment/passion/ebanking_in.png';
import payssionIconDanaId from '@/assets/images/payment/passion/dana_id.png';
import payssionIconLinkajaId from '@/assets/images/payment/passion/linkaja_id.png';
import payssionIconOvoId from '@/assets/images/payment/passion/ovo_id.png';
import payssionIconDokuId from '@/assets/images/payment/passion/doku_id.png';
import payssionIconFpxMy from '@/assets/images/payment/passion/fpx_my.png';
import payssionIconBoostMy from '@/assets/images/payment/passion/boost_my.png';
import payssionIconEbankingMy from '@/assets/images/payment/passion/ebanking_my.png';
import payssionIconDragonpayPh from '@/assets/images/payment/passion/dragonpay_ph.png';
import payssionIconGrabpayPh from '@/assets/images/payment/passion/grabpay_ph.png';
import payssionIconGcashPh from '@/assets/images/payment/passion/gcash_ph.png';
import payssionIconEnetsSg from '@/assets/images/payment/passion/enets_sg.png';
import payssionIconScbTh from '@/assets/images/payment/passion/scb_th.png';
import payssionIconKrungsriTh from '@/assets/images/payment/passion/krungsri_th.png';
import payssionIconKtbTh from '@/assets/images/payment/passion/ktb_th.png';
import payssionIconUobTh from '@/assets/images/payment/passion/uob_th.png';
import payssionIconEbankingVn from '@/assets/images/payment/passion/ebanking_vn.png';
import payssionIconCreditCardMx from '@/assets/images/payment/passion/creditcard_mx.png';
import payssionIconItauBr from '@/assets/images/payment/passion/itau_br.png';
import payssionIconBancoDoBrasilBr from '@/assets/images/payment/passion/bancodobrasil_br.png';
import payssionIconPixBr from '@/assets/images/payment/passion/pix_br.png';
import payssionIconSofort from '@/assets/images/payment/passion/sofort.png';
// Country Flags
import flagIndia from '@/assets/images/global/flags/India.png';
import flagIndonesia from '@/assets/images/global/flags/Indonesia.png';
import flagMalaysia from '@/assets/images/global/flags/Malaysia.png';
import flagPhilippines from '@/assets/images/global/flags/Philippines.png';
import flagSingapore from '@/assets/images/global/flags/Singapore.png';
import flagThailand from '@/assets/images/global/flags/Thailand.png';
import flagVietnam from '@/assets/images/global/flags/Vietnam.png';
import flagMexico from '@/assets/images/global/flags/Mexico.png';
import flagBrazil from '@/assets/images/global/flags/Brazil.png';
import flagAustria from '@/assets/images/global/flags/Austria.png';
import flagBelgium from '@/assets/images/global/flags/Belgium.png';
import flagGermany from '@/assets/images/global/flags/Germany.png';
import flagItaly from '@/assets/images/global/flags/Italy.png';
import flagPoland from '@/assets/images/global/flags/Poland.png';
import flagSpain from '@/assets/images/global/flags/Spain.png';
import flagSwitzerland from '@/assets/images/global/flags/Switzerland.png';
import flagNetherlands from '@/assets/images/global/flags/Netherlands.png';

export default {
  name: 'Checkout',
  components: {
    ButtonYellowIcon,
    ListEmpty,
    ButtonPurple
  },
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
        title: ''
      },
      // 支付开关
      payBumper: false,
      // Is IOT
      hostIsIOT: process.client ? location.hostname === 'www.iotransfer.net' : false,

      inputNum: 0,

      // Stripe
      stripe: {},
      elements: {},
      cardNumber: {},
      cardExpiry: {},
      cardCVC: {},
      cardPostalCode: {},
      stripePublicKey: '',
      cardNumberError: false,
      cardNumberErrorMsg: '',
      cardExpiryError: false,
      cardExpiryErrorMsg: '',
      cardCVCError: false,
      cardCVCErrorMsg: '',
      cardPostalCodeError: false,
      cardPostalCodeErrorMsg: '',
      stripeIframe: false,
      stripePaymentIntent: {
        clientSecret: '',
        amount: '',
        currency: '',
        id: ''
      },

      // Fire Ant Pay
      hotAntPayRequestBody: {},
      // Payssion
      payssionCountryList: [
        {
          countryName: 'Austria',
          countryCode: 'AT',
          countryFlag: flagAustria,
          supportedPayment: [
            {
              pmName: 'SOFORT',
              pmID: 'sofort',
              icon: payssionIconSofort
            }
          ]
        },
        {
          countryName: 'Belgium',
          countryCode: 'BE',
          countryFlag: flagBelgium,
          supportedPayment: [
            {
              pmName: 'SOFORT',
              pmID: 'sofort',
              icon: payssionIconSofort
            }
          ]
        },
        {
          countryName: 'Brazil',
          countryCode: 'BR',
          countryFlag: flagBrazil,
          supportedPayment: [
            {
              pmName: 'PIX',
              pmID: 'pix_br',
              icon: payssionIconPixBr
            },
            {
              pmName: 'Itaú',
              pmID: 'itau_br',
              icon: payssionIconItauBr
            },
            {
              pmName: 'Banco do Brasil',
              pmID: 'bancodobrasil_br',
              icon: payssionIconBancoDoBrasilBr
            }
            // {
            //   pmName: 'Cartões de Crédito',
            //   pmID: 'creditcard_br',
            //   icon: payssionIconCreditCardBr
            // }
          ]
        },
        {
          countryName: 'Germany',
          countryCode: 'DE',
          countryFlag: flagGermany,
          supportedPayment: [
            {
              pmName: 'SOFORT',
              pmID: 'sofort',
              icon: payssionIconSofort
            }
          ]
        },
        {
          countryName: 'India',
          countryCode: 'IN',
          countryFlag: flagIndia,
          supportedPayment: [
            // {
            //   pmName: 'Paytm',
            //   pmID: 'paytm_in',
            //   icon: payssionIconPaytmIn
            // },
            {
              pmName: 'UPI',
              pmID: 'upi_in',
              icon: payssionIconUpiIn
            },
            {
              pmName: 'Netbanking',
              pmID: 'ebanking_in',
              icon: payssionIconEbankingIn
            }
          ]
        },
        {
          countryName: 'Indonesia',
          countryCode: 'ID',
          countryFlag: flagIndonesia,
          supportedPayment: [
            {
              pmName: 'Dana',
              pmID: 'dana_id',
              icon: payssionIconDanaId
            },
            {
              pmName: 'LinkAja',
              pmID: 'linkaja_id',
              icon: payssionIconLinkajaId
            },
            {
              pmName: 'OVO',
              pmID: 'ovo_id',
              icon: payssionIconOvoId
            },
            {
              pmName: 'DOKU',
              pmID: 'doku_id',
              icon: payssionIconDokuId
            }
          ]
        },
        {
          countryName: 'Italy',
          countryCode: 'IT',
          countryFlag: flagItaly,
          supportedPayment: [
            {
              pmName: 'SOFORT',
              pmID: 'sofort',
              icon: payssionIconSofort
            }
          ]
        },
        {
          countryName: 'Malaysia',
          countryCode: 'MY',
          countryFlag: flagMalaysia,
          supportedPayment: [
            {
              pmName: 'FPX',
              pmID: 'fpx_my',
              icon: payssionIconFpxMy
            },
            {
              pmName: 'Boost',
              pmID: 'boost_my',
              icon: payssionIconBoostMy
            },
            {
              pmName: 'E-banking',
              pmID: 'ebanking_my',
              icon: payssionIconEbankingMy
            }
          ]
        },
        {
          countryName: 'Mexico',
          countryCode: 'MX',
          countryFlag: flagMexico,
          supportedPayment: [
            {
              pmName: 'Tarjetas de Crédito',
              pmID: 'creditcard_mx',
              icon: payssionIconCreditCardMx
            }
          ]
        },
        {
          countryName: 'Netherlands',
          countryCode: 'NL',
          countryFlag: flagNetherlands,
          supportedPayment: [
            {
              pmName: 'SOFORT',
              pmID: 'sofort',
              icon: payssionIconSofort
            }
          ]
        },
        {
          countryName: 'Philippines',
          countryCode: 'PH',
          countryFlag: flagPhilippines,
          supportedPayment: [
            {
              pmName: 'Dragonpay',
              pmID: 'dragonpay_ph',
              icon: payssionIconDragonpayPh
            },
            {
              pmName: 'Grabpay',
              pmID: 'grabpay_ph',
              icon: payssionIconGrabpayPh
            },
            {
              pmName: 'Globe Gcash',
              pmID: 'gcash_ph',
              icon: payssionIconGcashPh
            }
          ]
        },
        {
          countryName: 'Poland',
          countryCode: 'PL',
          countryFlag: flagPoland,
          supportedPayment: [
            {
              pmName: 'SOFORT',
              pmID: 'sofort',
              icon: payssionIconSofort
            }
          ]
        },
        // {
        //   countryName: 'Saudi Arabia',
        //   countryCode: 'SA',
        //   countryFlag: flagSaudiArabia,
        //   supportedPayment: [
        //     {
        //       pmName: 'Credit Card',
        //       pmID: 'creditcard_sa',
        //       icon: payssionIconCreditCardSa
        //     }
        //   ]
        // },
        // {
        //   countryName: 'Singapore',
        //   countryCode: 'SG',
        //   countryFlag: flagSingapore,
        //   supportedPayment: [
        //     {
        //       pmName: 'e-Nets',
        //       pmID: 'enets_sg',
        //       icon: payssionIconEnetsSg
        //     }
        //   ]
        // },
        {
          countryName: 'Spain',
          countryCode: 'ES',
          countryFlag: flagSpain,
          supportedPayment: [
            {
              pmName: 'SOFORT',
              pmID: 'sofort',
              icon: payssionIconSofort
            }
          ]
        },
        {
          countryName: 'Switzerland',
          countryCode: 'CH',
          countryFlag: flagSwitzerland,
          supportedPayment: [
            {
              pmName: 'SOFORT',
              pmID: 'sofort',
              icon: payssionIconSofort
            }
          ]
        },
        {
          countryName: 'Thailand',
          countryCode: 'TH',
          countryFlag: flagThailand,
          supportedPayment: [
            {
              pmName: 'SCB',
              pmID: 'scb_th',
              icon: payssionIconScbTh
            },
            {
              pmName: 'Krungsri',
              pmID: 'krungsri_th',
              icon: payssionIconKrungsriTh
            },
            {
              pmName: 'Krung Thai Bank',
              pmID: 'ktb_th',
              icon: payssionIconKtbTh
            },
            {
              pmName: 'UOB',
              pmID: 'uob_th',
              icon: payssionIconUobTh
            }
          ]
        },
        // {
        //   countryName: 'United Arab Emirates',
        //   countryCode: 'AE',
        //   countryFlag: flagUnitedArabEmirates,
        //   supportedPayment: [
        //     {
        //       pmName: 'Credit Card',
        //       pmID: 'creditcard_ae',
        //       icon: payssionIconCreditCardAe
        //     }
        //   ]
        // },
        {
          countryName: 'Vietnam',
          countryCode: 'VN',
          countryFlag: flagVietnam,
          supportedPayment: [
            {
              pmName: 'ebanking',
              pmID: 'ebanking_vn',
              icon: payssionIconEbankingVn
            }
          ]
        }
      ],
      payssionCountryVModel: {},
      payssionSupportedPaymentVModel: {
        pmName: '',
        pmID: '',
        icon: ''
      },

      // GeoIP
      countryDB,
      geoIpCountryIsoCode: '',
      countryGeoIPChange: false,

      // Views
      routerClient: false,
      loading: false,
      cartLoading: true,
      formLoading: false,
      dialogFail: false,
      dialogFailMsg: '',
      orderFail: {
        type: '',
        message: ''
      },

      // Cart Data
      form: {
        field: {
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          address: '',
          zipCode: '',
          city: '',
          state: '',
          country: '',
          paymentMethod: '', // 初始化方法：initSupportedPayChannel() BeaconID:00
          cardNumber: '',
          cardCVC: '',
          cardExpireMonth: '',
          cardExpireYear: '',
          payssionPmID: ''
        }
      },
      cartList: [],
      cartListMultiple: [],
      cartUnit: {},
      purchaseParams: {
        token: '',
        locale: '',
        origin: '',
        orderID: '',
        urlCart: '0',
        urlCartType: '',
        ads: {
          s: '',
          c: '',
          k: ''
        }
      },

      // 支付渠道
      supportedPayChannel: 2, // Stripe支付切换，已弃用 (需要设置常量2)
      payChannelStripe: false,
      payChannelCreditCard: false,
      payChannelPayssion: false,
      payChannelPayPal: false,
      payChannelPaddle: false
    };
  },
  metaInfo() {
    return {
      title: this.meta.title,
      link: [
        {
          rel: 'canonical',
          href: `${window.location.origin}${this.$route.path}`
        }
      ]
    };
  },
  computed: {
    cartTotalPrice() {
      let total = 0;
      if (!this.cartList) return;
      for (let i = 0; i < this.cartList.length; i++) {
        let product_num = this.cartList[i].product_num ? this.cartList[i].product_num : 1;
        total = this.COMMON.accAdd(
          total,
          this.cartList[i].price_decimal * product_num
        );
      }
      return total;
    },
    cartOriginalPrice() {
      let total = 0;
      if (!this.cartList) return;
      for (let i = 0; i < this.cartList.length; i++) {
        total = this.COMMON.accAdd(
          total,
          this.cartList[i].original_price_decimal
        );
      }
      return total;
    },
    flen() {
      let len = 0;
      if (!this.cartList) return;
      for (let i = 0; i < this.cartList.length; i++) {
        let item = this.cartList[i];
        let product_num = item.product_num ? item.product_num : 1;
        let givesnum = 0;
        if(item.gives && item.gives[0].quantity) {
          givesnum = item.gives[0].quantity;
        }
        if (item.product_type === 2) {
          if (item.cycle_type === 1) {
            len +=
              (item.purchase_quantity + givesnum) * product_num;
          } else {
            len +=
              item.cycle_type * item.purchase_quantity;
          }
        }
      }
      return len;
    },
    llen() {
      let len = 0;
      if (!this.cartList) return;
      for (let i = 0; i < this.cartList.length; i++) {
        let item = this.cartList[i];
        let givesnum = 0;
        let product_num = item.product_num ? item.product_num : 1;
        let require_post_count = item.require_post_count ? item.require_post_count : 0;

        if(item.gives && item.gives[0].quantity) {
          givesnum = item.gives[0].quantity;
        }

        if (item.product_type === 1) {
          if (item.cycle_type === 1) {
           len += require_post_count ? require_post_count * item.purchase_quantity * product_num : (item.purchase_quantity + givesnum) * product_num;
          } else {
            len += item.cycle_type * item.purchase_quantity;
          }
        }
      }
      return len;
    },
    displayletLikes() {
      let display = '';
      if (this.hostIsIOT) {
        display = 'Pieces';
      } else {
        display = 'Likes';
      }
      return display;
    },
    displayletFollowers() {
      let display = '';
      if (this.hostIsIOT) {
        display = 'Pro Pieces';
      } else {
        display = 'Followers';
      }
      return display;
    }
  },
  watch: {
    $route() {
      this.routerClient =
        this.COMMON.getURLQuery('url_cart') !== null &&
        this.COMMON.getURLQuery('url_cart') !== '0' &&
        this.COMMON.isMobile();
      this.stripePublicKeySelect();
    },
    cartList: {
      handler: function (array) {
        this.$store.commit('cartLength', array ? array.length : 0);
        this.$storage.set('cartLength', array ? array.length : 0);
        this.transCartList();
      },
      deep: true
    },
    '$store.state.accessCountry'() {
      this.payssionCountrySelectByAccessCountry();
    }
  },
  // beforeCreate() {
  //   this.$storage.set('cartUnit', {
  //     follow_pic_url: 'https://scontent-lga3-1.cdninstagram.com/v/t51.2885-19/s150x150/117956588_167163798361110_846370134359382185_n.jpg?_nc_ht=scontent-lga3-1.cdninstagram.com&_nc_ohc=auhVvncQH64AX-KdIzh&oh=def7f046a2df4d128639a93ddcd19d96&oe=5FC49527',
  //     follower_count: 51529174,
  //     following_count: 967,
  //     ins_account: 'nba',
  //     ins_id: '20824486',
  //     like_count: 45006,
  //     like_id: '2429695205495014044',
  //     like_pic_url: 'https://scontent-lga3-1.cdninstagram.com/v/t51.2885-15/sh0.08/e35/c0.280.720.720a/s640x640/122713074_3543954292334118_9118011057023386314_n.jpg?_nc_ht=scontent-lga3-1.cdninstagram.com&_nc_cat=1&_nc_ohc=DIXgPlTSwf4AX9M2ANA&oh=114c0c72c17b33f3dc360884553d3c75&oe=5F9BA696',
  //     post_count: 37325,
  //     short_code: 'CG4AuqUAAKc',
  //     task_type: 2,
  //
  //
  //     cycle_type: 5,
  //     gives: [{type: 0, quantity: 0}],
  //     original_price_decimal: 18.99,
  //     payment_type: 2,
  //     price_decimal: 16.99,
  //     product_id: 380,
  //     product_type: 2,
  //     promote_sale_type: 1,
  //     purchase_quantity: 555
  //   });
  // },
  mounted() {
    this.payBumperTrigger(); // 支付总开关
    this.payChannelInit(); // 支付环境判断
    this.checkURLParams();
    this.initGeoIpByLocal();
    this.checkURLCartLang();
    this.metaDataInit();
    this.historyHack();
    this.transCartList();
    this.payssionCountryVModel = this.payssionCountryList[0];
  },
  methods: {
    /*
     * 测试参数 cart_test === 1 功能
     * 1、无视判断条件使用IOT接口通过orderID获取订单内容
     * 2、无视请求，写入静态购物车JSON
     * */

    // Renderer
    closeDialog() {
      this.dialogFail = false;
    },
    transCartList() {
      let arr = [];
      let cartList = this.$storage.get('cartList');
      if (cartList && cartList.length) {
        for (let i = 0; i < cartList.length; i++) {
          let product_num = cartList[i].product_num;
          if (!product_num) {
            arr.push(cartList[i]);
          } else {
            if (product_num !== 1) {
              for (let j = 0; j < product_num; j++) {
                delete cartList[i].product_num;
                arr.push(cartList[i]);
              }
            } else {
              delete cartList[i].product_num;
              arr.push(cartList[i]);
            }
          }

        }
        this.cartListMultiple = arr;
        console.log(this.cartListMultiple);
      }
    },
    metaDataInit() {
      if (this.$route.path === '/checkout-2') {
        this.meta.title = `${this.$store.state.productName} ${this.$t(
          'checkout.meta.title-0'
        )}`;
      } else {
        this.meta.title = `${this.$store.state.productName} ${this.$t(
          'checkout.meta.title-1'
        )}`;
      }
    },
    reduceClick(product_id, product_num, like_id) {
      if (product_num === 1) return;
      let cartList = this.$storage.get('cartList');
      if (!cartList) return;
      for (let i = 0; i < cartList.length; i++) {
        if (
          cartList[i].product_id === product_id &&
          cartList[i].like_id === like_id
        ) {
          cartList[i].product_num--;
        }
      }
      this.$storage.set('cartList', cartList);
      this.cartList = cartList;
    },
    addClick(product_id, product_num, like_id) {
      let cartList = this.$storage.get('cartList');
      if (!cartList) return;
      if(product_num == 5) return;
      for (let i = 0; i < cartList.length; i++) {
        if (
          cartList[i].product_id == product_id &&
          cartList[i].like_id == like_id
        ) {
          cartList[i].product_num++;
        }
      }
      this.$storage.set('cartList', cartList);
      this.cartList = cartList;
    },
    redirectToLogin(errorMsg) {
      this.renderHeaderAvatar(defaultAvatar);
      setTimeout(() => {
        this.dialogFailMsg = errorMsg;
        this.dialogFail = true;
      }, 300);
      setTimeout(() => {
        this.$store.commit('loginChange', false);
        this.$router.replace({ path: '/login' });
      }, 2000);
    },
    renderHeaderAvatar(avatar) {
      this.$storage.set('userAvatar', avatar);
      this.$store.commit('userAvatar', avatar);
    },
    resetVeeValidateError(reset) {
      // reset();
    },

    // Cart Data Handle
    cartLocalInit() {
      this.cartLoading = false;
      this.cartUnitLocalCollect();
    },
    cartUnitDelete(i) {
      this.cartList.splice(i, 1);
      this.$storage.set('cartList', this.cartList);
      if (this.cartList && this.cartList.length === 0) {
        this.$storage.remove('cartList');
      }
    },
    cartUnitLocalCollect() {
      let unitObj = {};
      if (this.$storage.has('cartUnit')) {
        unitObj = this.$storage.get('cartUnit');
        if (unitObj.task_type !== undefined) {
          // delete unitObj.price_decimal;
          this.cartUnit = unitObj;
        } else {
          unitObj = false;
        }
      } else {
        unitObj = false;
      }
      this.purchaseParams.origin = 'web';
      this.purchaseParams.locale = navigator.language;

      if (this.$storage.has('adStore'))
        this.purchaseParams.ads = this.$storage.get('adStore');
      this.cartUnitToList(unitObj);
    },
    cartUnitToList(cartUnit) {
      let oldList = this.$storage.get("cartList");
      if (cartUnit !== false) {
        cartUnit.product_num = 1;
        if (this.$storage.has("cartList")) {
          if (!cartUnit.cycle_type || cartUnit.cycle_type !== 1) {
            oldList.push(cartUnit);
          } else {
            if (!oldList.length) {
              oldList.push(cartUnit);
            } else {
              let result;
              result = oldList.some(function(item) {
                let res;
                if (cartUnit.task_type == 2) { // followers
                  res = cartUnit.product_id == item.product_id && cartUnit.ins_id == item.ins_id;
                } else if (cartUnit.task_type == 1) { // likes
                  res = cartUnit.product_id == item.product_id && cartUnit.like_id == item.like_id && cartUnit.ins_id == item.ins_id;
                }
                return res;
              })
              if(!result) {
                oldList.push(cartUnit);
              } else {
                for (let i = 0; i < oldList.length; i++) {
                  if (cartUnit.task_type == 2) {
                    // followers
                    if (cartUnit.product_id == oldList[i].product_id && cartUnit.ins_id == oldList[i].ins_id && oldList[i].product_num < 5) {
                      oldList[i].product_num++;
                      break;
                    }
                  } else if (cartUnit.task_type == 1) {
                    // likes
                    if (cartUnit.product_id == oldList[i].product_id && cartUnit.ins_id == oldList[i].ins_id && cartUnit.like_id == oldList[i].like_id && oldList[i].product_num < 5) {
                      oldList[i].product_num++;
                      break;
                    }
                  }
                }
              }
            }
          }
          this.cartList = oldList;
        } else {
          if (cartUnit !== false) {
            this.cartList.push(cartUnit);
          }
        }
        this.$storage.set("cartList", this.cartList);
      } else {
        this.cartList = oldList;
      }
      this.$storage.remove("cartUnit");
    },
    // Pay Channel Selection 支付通道初始化判断
    payChannelInit() {
      // const domain = window.location.hostname;

      // supportedPayChannel === 1 启用Stripe
      // supportedPayChannel === 2 启用PayPal+Hotant+Payssion
      // if (domain === this.$constant.pay.page.iot) {
      //   this.initSupportedPayChannel(1);
      // } else {
      //   this.initSupportedPayChannel(2);
      // }
      // this.initSupportedPayChannel(1);

      // Online GeoIP (区域信息来自GeoIP接口)
      this.formLoading = true;
      this.$nuxt.$axios
        .post(
          // apiPayment.getCheckoutMethod
          apiV2.getCheckoutMethodV2,
          this.COMMON.paramSign({ client_lan: this.$i18n.locale })
        )
        .then((response) => {
          this.formLoading = false;

          if (response.data.status === 'ok') {
            this.initSupportedPayChannelV2(response.data['enable_platforms']);
          } else {
            this.form.field.paymentMethod = 'Credit Card';
            console.log('payChannelInit Error:', response.data);
          }

          // 国家字段默认勾选
          this.form.field.country = this.$store.state.accessCountry;
        })
        .catch((error) => {
          this.formLoading = false;
          this.form.field.paymentMethod = 'Credit Card';
          console.log('payChannelInit Error:', error);
        });
    },
    initSupportedPayChannel(val) {
      // val = response.data['checkout_method']
      // this.supportedPayChannel = val;
      this.payChannel = val;

      if (this.payChannelStripe) {
        this.stripeInit();
      }

      // BeaconID:00
      // this.form.field.paymentMethod = 'Payssion';

      if (val === 1) {
        // PayPal+Hotant
        // this.form.field.paymentMethod = 'PayPal';
        this.form.field.paymentMethod = 'Paddle';
      } else if (val === 2) {
        // PayPal+Hotant+Payssion
        this.form.field.paymentMethod = 'Payssion';
        this.payssionCountrySelectByAccessCountry();
      } else {
        this.$alert(
          '',
          'error',
          'Sorry',
          'Getting payment method failed. Please try later.',
          '',
          'Close'
        );
      }

      // for test
      // this.payChannel = 2;
      // this.form.field.paymentMethod = 'Payssion';
      // this.payssionCountrySelectByAccessCountry();
    },
    initSupportedPayChannelV2(enabledPlatforms) {
      // console.log(enabledPlatforms);
      this.payChannelStripe = false;
      this.payChannelPayPal = enabledPlatforms['paypal']['enable'];
      this.payChannelCreditCard = enabledPlatforms['credit_card']['enable']; // Hotant Pay
      this.payChannelPayssion = enabledPlatforms['payssion']['enable'];
      this.payChannelPaddle = enabledPlatforms['paddle']['enable'];

      // Stripe init
      if (this.payChannelStripe) this.stripeInit();

      if (this.payChannelCreditCard)
        this.form.field.paymentMethod = 'Credit Card';
      if (this.payChannelPaddle) this.form.field.paymentMethod = 'Paddle';
      if (this.payChannelPayPal) this.form.field.paymentMethod = 'PayPal';
      if (this.payChannelPayssion) this.form.field.paymentMethod = 'Payssion';
    },
    // GeoIP Handle（功能已变更为获取该地区支持的支付方式 Pay Channel Selection）
    initGeoIpByLocal() {
      // Local GeoIP (区域信息来自独立接口)
      if (!this.$storage.has('accessCountry')) return;
      this.form.field.country = this.$storage.get('accessCountry');
      this.countryGeoIPChange = true;
    },

    // Stripe Init
    stripeInit() {
      this.stripePublicKeySelect();

      this.COMMON.includeStripe(
        'js.stripe.com/v3/',
        function () {
          this.configureStripe();
        }.bind(this)
      );
    },
    stripePublicKeySelect() {
      if (this.COMMON.getURLQuery('env_test') === '1') {
        this.stripePublicKey = this.$constant.stripe.publicKey.test;
      } else {
        this.stripePublicKey = this.$constant.stripe.publicKey.live;
      }
      // console.log(this.COMMON.getURLQuery('env_test'));
      // console.log(this.stripePublicKey);
    },
    configureStripe() {
      let style = {
        base: {
          color: '#2A2A2A',
          fontSize: '16px',
          fontWeight: 600,
          fontFamily: 'Montserrat, sans-serif',
          lineHeight: '24px',
          '::placeholder': {
            color: '#A8A8A8'
          },
          ':hover': {
            '::placeholder': {
              color: '#656565'
            }
          }
        },

        invalid: {
          // All of the error styles go inside of here.
        }
      };
      if (this.COMMON.isMobile()) {
        style.base.fontSize = '14px';
        style.base.lineHeight = '24px';
      }

      // console.log(this.stripePublicKey);
      this.stripe = Stripe(this.stripePublicKey);

      this.elements = this.stripe.elements();

      this.cardNumber = this.elements.create('cardNumber', {
        style: style,
        showIcon: true,
        placeholder: 'Card Number'
      });
      this.cardNumber.mount('#card-number');
      this.cardNumber.on('change', ({ error }) => {
        if (error) {
          // console.log(error);
          this.cardNumberErrorMsg = error.message;
          this.cardNumberError = true;
        } else {
          this.cardNumberError = false;
        }
      });

      this.cardExpiry = this.elements.create('cardExpiry', {
        style: style,
        placeholder: 'MM / YY'
      });
      this.cardExpiry.mount('#card-expiry');
      this.cardExpiry.on('change', ({ error }) => {
        if (error) {
          this.cardExpiryErrorMsg = error.message;
          this.cardExpiryError = true;
        } else {
          this.cardExpiryError = false;
        }
      });

      this.cardCVC = this.elements.create('cardCvc', {
        style: style
        // placeholder: 'Security Code (CVC)'
      });
      this.cardCVC.mount('#card-cvc');
      this.cardCVC.on('change', ({ error }) => {
        if (error) {
          this.cardCVCErrorMsg = error.message;
          this.cardCVCError = true;
        } else {
          this.cardCVCError = false;
        }
      });

      this.cardPostalCode = this.elements.create('postalCode', {
        style: style,
        placeholder: 'Postal Code (ZIP)'
      });
      this.cardPostalCode.mount('#card-postal');
      this.cardPostalCode.on('change', ({ error }) => {
        if (error) {
          this.cardPostalCodeErrorMsg = error.message;
          this.cardPostalCodeError = true;
        } else {
          this.cardPostalCodeError = false;
        }
      });
    },
    resetStripeError() {
      this.cardNumberError = false;
      this.cardExpiryError = false;
      this.cardCVCError = false;
    },

    // ⭐PurchaseGate 支付入口⭐
    purchaseGate(invalid, validate) {
      if (this.payBumperEngine()) {
        return;
      }

      // 巴西和墨西哥访问限制
      // if (this.form.field.country === 'BR'
      //   // || this.form.field.country === 'IN'
      //   // || this.form.field.country === 'MA'
      //   || this.form.field.country === 'MX') {
      //   // this.$alert(
      //   //   '', 'error', 'Oops',
      //   //   'Our system is upgrading currently. Please try again later.',
      //   //   'normal', 'Close'
      //   // );
      //
      //   this.$actionSheet(
      //     false, '', 'logo-getinsup',
      //     this.$t('orderFail.actionSheet.getInsUp.title'),
      //     this.$t('orderFail.actionSheet.getInsUp.body'),
      //     'download-getinsup-google-play',
      //     this.$t('orderFail.actionSheet.getInsUp.btnGooglePlay')
      //   ).then(() => {
      //       this.$ga.event('insdl', 'download', 'nonelist');
      //       location.href = this.$constant.app.download.ios + '?pt=121014724&ct=nonelist&mt=8';
      //     }
      //   ).catch(() => {
      //   });
      //   return;
      // }

      if (this.cartList && this.cartList.length === 0) {
        this.$alert(
          '',
          'error',
          this.$t('global.modelBox.title.oops'),
          this.$t('checkout.error.cartEmptyLong.text'),
          'normal',
          this.$t('global.modelBox.btn.close')
        );
        return;
      }

      if (
        this.form.field.paymentMethod === 'Payssion' &&
        this.payssionSupportedPaymentVModel.pmID === ''
      ) {
        this.$alert(
          '',
          'warn',
          this.$t('global.modelBox.title.caution'),
          this.$t('checkout.error.needSelectLocalPayment'),
          '',
          'Close'
        ).catch();
        return;
      }

      // VeeValidate
      validate();
      console.log(`VeeValidate.invalid:`, invalid);
      // console.log(`VeeValidate.errors:`, errors);
      if (invalid) {
        setTimeout(() => {
          this.$scrollTo('.invalid', {
            offset: -1 * document.getElementById('header').offsetHeight
          });
        }, 500);
        return;
      }

      this.gaBuyNow();

      if (this.payChannelStripe) {
        this.purchaseStripe();
      } else {
        if (this.form.field.paymentMethod === 'PayPal') {
          this.purchasePayPal();
        } else if (this.form.field.paymentMethod === 'Credit Card') {
          this.purchaseHotAntPay();
        } else if (this.form.field.paymentMethod === 'PayOp') {
          this.purchasePayOp();
        } else if (this.form.field.paymentMethod === 'Payssion') {
          this.purchasePayssion();
        } else if (this.form.field.paymentMethod === 'Paddle') {
          this.purchasePayPal();
        } else {
          console.error(
            'purchaseGate: pending; Need Check purchaseGate() judgment.'
          );
        }
      }
    },

    // Stripe
    purchaseStripe() {
      // let self = this;
      if (this.loading) return;
      this.loading = true;

      this.purchaseSubmitCart();
    },
    stripeErrorDisplay(error) {
      this.loading = false;

      if (error.code === 'incomplete_zip') {
        this.cardPostalCodeErrorMsg = error.message;
        this.cardPostalCodeError = true;
        return;
      }

      this.dialogFailMsg = error.message;
      this.dialogFail = true;
      console.error(`Stripe Error: `, error);
    },
    // Stripe New API
    stripeCollectParams(data) {
      this.stripePaymentIntent.clientSecret = data['client_secret'];
      this.stripePaymentIntent.amount = data['amount'];
      this.stripePaymentIntent.currency = data['currency'];

      this.stripeConfirmCardPayment();
    },
    stripeConfirmCardPayment() {
      let self = this;
      // if (this.loading) return;
      this.loading = true;

      const returnURL =
        this.COMMON.getURLQuery('env_test') === '1'
          ? self.$constant.stripe.check['3ds'].test
          : self.$constant.stripe.check['3ds'].live;

      this.stripe
        .confirmCardPayment(self.stripePaymentIntent.clientSecret, {
          payment_method: { card: self.cardNumber }
          // return_url: returnURL
        })
        .then((result) => {
          // console.log(result);
          // this.loading = false;
          if (result.error) {
            this.stripeErrorDisplay(result.error);
            return;
          }

          this.stripePaymentIntent.id = result['paymentIntent'].id;
          this.stripeRetrievePayment();
        });
    },
    stripeRetrievePayment() {
      let params = {};

      params.token =
        this.purchaseParams.urlCart === '1'
          ? this.purchaseParams.token
          : this.$storage.get('token');

      params.intent_id = this.stripePaymentIntent.id;

      let API = '';
      if (this.purchaseParams.urlCartType === 'coin') {
        API = apiPayment.stripeRetrieve;
      } else {
        if (this.hostIsIOT) {
          API = apiIOT.stripeRetrieve;
        } else {
          API = apiTask.stripeRetrieve;
        }
      }

      this.$nuxt.$axios
        .post(API, this.COMMON.paramSign(params))
        .then((response) => {
          if (response.data.status === 'ok') {
            this.purchaseParams.orderID = response.data.order_id;
            this.jumpToOrderDetail();
          } else if (response.data.error !== undefined) {
            this.loading = false;

            if (response.data.error.type === 'bad_token') {
              if (this.purchaseParams.urlCart === '1') {
                this.dialogFailMsg = `Invalid token, please try again.`;
                this.dialogFail = true;
                console.error(
                  `stripeRetrievePayment Error: `,
                  response.data.error
                );
              } else {
                const msg = 'Login expired, redirecting to login page.';
                this.redirectToLogin(msg);
              }
            } else if (response.data.error.type === 'bad_intent') {
              this.dialogFailMsg = `Invalid payment intent ID, please try again.`;
              this.dialogFail = true;
              console.error(
                `stripeRetrievePayment Error: `,
                response.data.error
              );
            } else {
              this.orderFail.type = response.data.error.type;
              this.orderFail.message = response.data.error.message;
              this.jumpToFail();
            }
            // console.log(`Unify Cart Error: `, response.data);
          } else {
            this.loading = false;
            this.dialogFailMsg = JSON.stringify(response.data);
            this.dialogFail = true;
          }
        })
        .catch((error) => {
          this.loading = false;
          this.dialogFailMsg =
            '<samp>' +
            '<b>Error Status:</b> ' +
            error.status +
            '<br>' +
            '<b>Error Message:</b> ' +
            error.statusText +
            '</samp>';
          this.dialogFail = true;
          console.error(`stripeRetrievePayment Error: `, error);
        });
    },
    // PayPal
    purchasePayPal() {
      this.loading = true;
      this.purchaseSubmitCart();
    },
    purchaseJumpToPayPal(PayPalURL) {
      this.prepareOrderData();
      this.$storage.remove('cartList');
      this.$storage.remove('cartCache');
      window.location.href = PayPalURL;
    },
    // FireAntPay(HotAntPay)
    purchaseHotAntPay() {
      this.loading = true;
      this.purchaseSubmitCart();
    },
    purchaseJumpToHotAntPay(destURL) {
      this.prepareOrderData();
      this.$storage.remove('cartList');
      this.$storage.remove('cartCache');
      window.location.href = destURL;
    },
    purchasePrepareForm(requestBody) {
      // vue 模板遍历：value, key 的顺序不能错
      // v-for="(value, key, i) in hotAntPayRequestBody"
      this.hotAntPayRequestBody = requestBody;
      this.$nextTick(() => {
        this.$refs.hotAntPayForm.submit();
      });
    },
    // PayOp
    purchasePayOp() {
      this.loading = true;
      this.purchaseSubmitCart();
    },
    purchaseJumpToPayOp(PayOpURL) {
      this.prepareOrderData();

      this.$storage.remove('cartList');
      this.$storage.remove('cartCache');

      window.location.href = PayOpURL;
    },
    // Payssion
    purchasePayssion() {
      this.loading = true;
      this.purchaseSubmitCart();
    },
    payssionSelected() {
      this.form.field.country = this.payssionCountryVModel.countryCode;
    },
    payssionMethodClick(unit) {
      // console.log("unit======",unit)
      this.payssionSupportedPaymentVModel = unit;
    },
    payssionCountrySelectHandle(payssionCountryVModel) {
      this.form.field.country = payssionCountryVModel.countryCode;
      this.payssionSupportedPaymentVModel =
        payssionCountryVModel.supportedPayment[0];
    },
    purchaseJumpToPayssion(redirectURL) {
      this.prepareOrderData();

      this.$storage.remove('cartList');
      this.$storage.remove('cartCache');
      window.location.href = redirectURL;
    },
    payssionCountrySelectByAccessCountry() {
      this.payssionCountryList.some((country) => {
        if (country.countryCode === this.$store.state.accessCountry) {
          this.payssionCountrySelectHandle(country);
          this.payssionCountryVModel = country;
          return true;
        }
      });
    },

    // ⭐统一支付接口⭐
    purchaseSubmitCart() {
      // 参数准备
      let param = {
        env_test: this.COMMON.getURLQuery('env_test'),

        token: this.purchaseParams.token, // this.purchaseParams.token 来自 collectURLParams()
        key: '',
        locale: this.purchaseParams.locale,
        origin: this.purchaseParams.origin,

        email: this.form.field.email,
        phone: this.form.field.phone,
        first_name: this.form.field.firstName,
        last_name: this.form.field.lastName,
        address: this.form.field.address,
        zip: this.form.field.zipCode,
        city: this.form.field.city,
        state: this.form.field.state,
        country: this.form.field.country
      };

      // token 获取
      if (this.purchaseParams.urlCart === '1') {
        param.order_id = this.purchaseParams.orderID;
      } else {
        if (param.token === null) {
          delete param.token;
        } else {
          if (this.$store.state.loginStatus) {
            param.token = this.$storage.get('token');
          } else {
            delete param.token;
          }
        }
      }

      // key 获取
      if (this.$storage.has('key') && this.$storage.get('key') !== null) {
        param.key = this.$storage.get('key');
      } else {
        delete param.key;
      }

      if (this.form.field.paymentMethod === 'Credit Card') {
        if (this.payChannelStripe) {
          param.payment_type = 2;
        } else {
          param.payment_type = 3;

          param.card_number = this.form.field.cardNumber;
          param.card_security_code = this.form.field.cardCVC;
          param.card_expire_month = this.form.field.cardExpireMonth;
          param.card_expire_year = this.form.field.cardExpireYear;
        }
      } else if (this.form.field.paymentMethod === 'PayOp') {
        param.payment_type = 4;
      } else if (this.form.field.paymentMethod === 'PayPal') {
        param.payment_type = 1;
      } else if (this.form.field.paymentMethod === 'Payssion') {
        param.payment_type = 5;
        param.pm_id = this.payssionSupportedPaymentVModel.pmID;
        param.country = this.payssionCountryVModel.countryCode;
      } else if (this.form.field.paymentMethod === 'Paddle') {
        param.payment_type = 6;
      }

      if (this.purchaseParams.urlCartType === 'coin')
        param.order_id = this.purchaseParams.orderID;

      // 语言环境
      param.client_lan = this.$i18n.locale;

      // 广告参数
      param.ads = this.purchaseParams.ads;

      // 任务列表参数
      // param.tasks = this.cartList;
      param.tasks = this.cartListMultiple;

      //缓存参数
      this.cacheCartParam(param);

      console.log(`Unify Cart Submitted Data:`, param);

      // API准备
      // 判断是否登录(非登录购买)
      let api = '';

      if (
        param.token !== null &&
        param.key !== null &&
        param.token !== undefined &&
        param.key !== undefined
      ) {
        api = apiTask.pay;
      } else {
        api = apiTask.guestPay;
      }
      console.log('param.token:', param.token);
      console.log('param.key:', param.key);

      if (this.purchaseParams.urlCart === '1') {
        if (this.hostIsIOT) {
          if (param.token === null) {
            api = apiIOT.submitFromGuest;
          } else {
            api = apiIOT.submitByCash;
          }
        } else {
          api = apiTask.pay;
        }
      }
      if (this.purchaseParams.urlCartType === 'coin') {
        api = apiPayment.paymentCreate;
      }

      if (this.COMMON.getURLQuery('cart_test') === '1') {
        if (param.token === null) {
          api = apiIOT.submitFromGuest;
        } else {
          api = apiIOT.submitByCash;
        }
      }

      this.$nuxt.$axios
        .post(api, this.COMMON.paramSign(param))
        .then((response) => {
          if (response.data.status === 'ok') {
            if (this.form.field.paymentMethod === 'Credit Card') {
              if (this.payChannelStripe) {
                // Stripe
                this.stripeCollectParams(response.data);
              } else {
                // HotAntPay
                // 跳转判断凭据：payment_url
                const paymentUrl = response.data['payment_url'];
                if (paymentUrl) {
                  this.purchaseJumpToHotAntPay(response.data['payment_url']);
                } else {
                  this.purchaseParams.orderID = response.data.order_id;
                  this.jumpToOrderDetail();
                }
                // 跳转判断凭据：hotantpay_request_body
                // const requestBody = response.data['hotantpay_request_body'];
                // if (requestBody) {
                //   this.purchasePrepareForm(requestBody);
                // } else {
                //   this.jumpToFail();
                // }
              }
            } else if (this.form.field.paymentMethod === 'PayPal') {
              this.purchaseJumpToPayPal(response.data['payment_url']);
            } else if (this.form.field.paymentMethod === 'PayOp') {
              this.purchaseJumpToPayOp(response.data['payment_url']);
            } else if (this.form.field.paymentMethod === 'Payssion') {
              this.purchaseJumpToPayssion(response.data['payment_url']);
            } else if (this.form.field.paymentMethod === 'Paddle') {
              this.purchaseJumpToPayssion(response.data['payment_url']);
            }
          } else if (response.data.error !== undefined) {
            this.loading = false;

            if (response.data.error.type === 'bad_token') {
              if (this.purchaseParams.urlCart === '1') {
                this.dialogFailMsg = `Invalid token, please try again.`;
                this.dialogFail = true;
                console.error(
                  `stripeRetrievePayment Error: `,
                  response.data.error
                );
              } else {
                const msg = 'Login expired, redirecting to login page.';
                this.redirectToLogin(msg);
              }
            } else if (response.data.error.type === 'incorrect_number') {
              console.log('Your card number is incorrect.');
              this.cardNumberError = true;
              this.cardNumberErrorMsg = 'Your card number is incorrect.';
            } else if (response.data.error.type === 'intent_error') {
              console.log('intent_error');
              this.dialogFailMsg = `The price of some items in cart is too low.`;
              this.dialogFail = true;
            } else {
              this.orderFail.type = response.data.error.type;
              this.orderFail.message = response.data.error.message;
              this.jumpToFail();
            }
            // console.log(`Unify Cart Error: `, response.data);
          } else {
            this.loading = false;
            this.dialogFailMsg = JSON.stringify(response.data);
            this.dialogFail = true;
          }
        })
        .catch((error) => {
          this.loading = false;
          this.$alert(
            '',
            'error',
            this.$t('global.modelBox.title.oops'),
            `<samp><b>Error Status:</b> ${error.status}<br><b>Error Message:</b> ${error.statusText}</samp>`,
            'normal',
            this.$t('global.modelBox.btn.close')
          );
          console.error(`Unify Cart Error: `, error);
        });
    },

    // Order Data Handle
    jumpToOrderDetail() {
      this.prepareOrderData();

      let pathSuffix = '';
      if (this.$route.path === '/checkout-2') pathSuffix = '-2';

      let url_cart = this.COMMON.getURLQuery('url_cart');
      if (url_cart === null) url_cart = '0';

      if (this.payChannelStripe) {
        window.location.href = this.$constant.pay.page.order.success;
      } else {
        this.$router.push({
          path: `/order-detail${pathSuffix}`,
          query: { url_cart: url_cart }
        });
      }
    },
    jumpToFail() {
      this.prepareFailData();
    },
    prepareOrderData() {
      let orderData = {};
      orderData.bill = this.form.field;
      orderData.tasks = this.cartList;

      if (this.form.field.paymentMethod === 'Credit Card') {
        orderData.orderNumber = this.purchaseParams.orderID;
      } else {
        orderData.orderNumber = 0;
      }

      this.$storage.set('orderData', orderData);
    },
    prepareFailData() {
      this.$storage.set('orderFailData', this.orderFail);

      let url_cart = this.COMMON.getURLQuery('url_cart');
      if (url_cart === null) url_cart = '0';

      let query = { url_cart: url_cart };

      let env_test = this.COMMON.getURLQuery('env_test');
      if (env_test !== null) {
        query.env_test = env_test;
      }

      let url_cart_type = this.COMMON.getURLQuery('url_cart_type');
      if (url_cart_type !== null) {
        query.url_cart_type = url_cart_type;
      }

      let pathSuffix = '';
      if (this.$route.path === '/checkout-2') pathSuffix = '-2';

      if (this.payChannelStripe) {
        window.location.href = this.$constant.pay.page.order.fail;
      } else {
        this.$router.push({ path: `/order-fail${pathSuffix}`, query: query });
      }
    },

    // Params Handle
    checkURLParams() {
      this.purchaseParams.urlCart = this.COMMON.getURLQuery('url_cart');
      this.purchaseParams.urlCartType = this.COMMON.getURLQuery(
        'url_cart_type'
      );

      if (
        this.$storage.has('cartCache') &&
        this.COMMON.getURLQuery('cart_cache') === '1'
      ) {
        const storedCartCache = this.$storage.get('cartCache');

        
        // console.log(storedCartCache);

        if (storedCartCache.order_id)
          this.purchaseParams.orderID = storedCartCache.order_id;

        this.purchaseParams.token = storedCartCache.token || null;
        this.purchaseParams.key = storedCartCache.key || null;
        this.purchaseParams.locale = storedCartCache.locale;
        this.purchaseParams.origin = storedCartCache.origin;
        this.purchaseParams.ads = storedCartCache.ads;

        this.form.field.email = storedCartCache.email;
        this.form.field.phone = storedCartCache.phone;
        this.form.field.firstName = storedCartCache.first_name;
        this.form.field.lastName = storedCartCache.last_name;
        this.form.field.address = storedCartCache.address;
        this.form.field.zipCode = storedCartCache.zip;
        this.form.field.city = storedCartCache.city;
        this.form.field.state = storedCartCache.state;
        this.form.field.country = storedCartCache.country;

        this.$storage.set('cartList', storedCartCache.tasks);
        this.cartLoading = false;

        this.pageGAInit(this.purchaseParams.origin);
      } else {
        if (this.purchaseParams.urlCart === '1') {
          this.requestUrlCartData(this.COMMON.getURLQuery('order_id'));
        } else {
          // beacon test cartUnit
          if (this.COMMON.getURLQuery('cart_test') === '1') {
            const cartUnitTest = {
              follow_pic_url:
                'https://scontent-tpe1-1.cdninstagram.com/v/t51.2885-19/s150x150/68761814_406547376656235_6673091594033299456_n.jpg?_nc_ht=scontent-tpe1-1.cdninstagram.com&_nc_ohc=DPAB3iq90g8AX9a55Qc&oh=52514c6b4cf8eb4f0bf861be45e915e0&oe=5F07301D',
              follower_count: 124,
              following_count: 81,
              gives: [
                {
                  quantity: 0,
                  type: 0
                }
              ],
              ins_account: 'liuyu9045',
              ins_id: '39322421',
              like_count: 0,
              like_id: '2292137692798012155',
              like_pic_url:
                'https://scontent-tpe1-1.cdninstagram.com/v/t51.2885-15/sh0.08/e35/c81.0.815.815a/s640x640/94188443_594411697834507_6414606497590697406_n.jpg?_nc_ht=scontent-tpe1-1.cdninstagram.com&_nc_cat=107&_nc_ohc=5ER2hTV6rA0AX81mktZ&oh=3ce2144a9a10c6fa80ed694f78c6cee2&oe=5F05F2B2',
              post_count: 204,
              price_decimal: 2,
              product_id: 105,
              purchase_quantity: 10,
              short_code: 'B_PTxZbgkr7',
              task_type: 2
            };
            this.$storage.set('cartUnit', cartUnitTest);
          }

          this.cartLocalInit();
          this.pageGAInit('web');
        }
      }
    },
    requestUrlCartData(orderID) {
      if (orderID === null || orderID === '' || orderID === undefined) {
        this.dialogFailMsg = 'There\'s no available orderID';
        this.dialogFail = true;
        return;
      }

      this.purchaseParams.orderID = orderID;

      let API = '';
      if (this.purchaseParams.urlCartType === 'coin') {
        API = apiPayment.getCoinProduct;
      } else {
        if (this.hostIsIOT) {
          API = apiIOT.getTask;
        } else {
          API = apiTask.getUrlCart;
        }
      }

      this.cartLoading = true;
      this.$nuxt.$axios
        .post(
          API,
          this.COMMON.paramSign({
            order_id: orderID
          })
        )
        .then((response) => {
          this.cartLoading = false;

          if (response.data.status === 'ok') {
            this.collectURLParams(response.data);
          } else if (response.data.error !== undefined) {
            if (response.data.error.type === 'bad_token') {
              this.dialogFailMsg = 'Login status expired, please login again.';
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
          // console.log(response.data);
        })
        .catch((error) => {
          this.cartLoading = false;
          this.dialogFailMsg =
            '<samp>' +
            '<b>Error Status:</b> ' +
            error.status +
            '<br>' +
            '<b>Error Message:</b> ' +
            error.statusText +
            '</samp>';
          this.dialogFail = true;
          console.log('Catch Error: submitCart');
          console.error(error);
        });
    },
    cacheCartParam(param) {
      let paramCache = {};
      paramCache.token = param.token;
      paramCache.locale = param.locale;
      paramCache.origin = param.origin;

      paramCache.email = param.email;
      paramCache.phone = param.phone;
      paramCache.first_name = param.first_name;
      paramCache.last_name = param.last_name;
      paramCache.address = param.address;
      paramCache.zip = param.zip;
      paramCache.city = param.city;
      paramCache.state = param.state;
      paramCache.country = param.country;

      paramCache.ads = param.ads || '';

      paramCache.tasks = param.tasks;

      if (param.order_id) paramCache.order_id = param.order_id;

      this.$storage.set('cartCache', paramCache);
    },
    checkURLCartLang() {
      let lang = this.COMMON.getURLQuery('lang');
      if (lang === 'en' || lang === null) {
        this.$i18n.locale = 'en';
        this.$cookies.remove('googtrans');
        this.$cookies.remove('googtrans', '/', location.hostname);
      } else {
        const langLower = lang.toLowerCase();
        if (langLower !== 'en') {
          this.$i18n.locale = langLower;
        } else {
          if (lang === 'zh-cn') {
            lang = 'zh-CN';
          } else if (lang === 'zh-tw') {
            lang = 'zh-TW';
          }

          const param = encodeURI(`/en/${lang}`);

          this.$cookies.remove('googtrans');
          this.$cookies.remove('googtrans', '/', location.hostname);
          this.$cookies.set(
            'googtrans',
            param,
            '30d',
            '/',
            location.hostname,
            false,
            'Lax'
          );
        }
      }

      if (!this.$store.state.googleTransLoad) {
        this.$store.commit('googleTransLoad', true);
      }
    },
    collectURLParams(data) {
      this.purchaseParams.token = data.token;
      this.purchaseParams.origin = data.origin;
      this.purchaseParams.locale = data.locale || '';
      this.purchaseParams.ads = data.ads || '';

      this.cartList = data.tasks;

      this.$storage.set('cartList', data.tasks);
      this.$storage.remove('cartUnit');

      this.pageGAInit(this.purchaseParams.origin);
    },

    // GA
    pageGAInit(gaLabel) {
      // this.$ga.event("checkoutview", "ckview", `ckview-${gaLabel}`);
      this.$ga.event('insimp', 'impression', 'checkout-new');
    },
    gaBuyNow() {
      if (this.$i18n.locale === 'en') {
        if (this.payChannelStripe) {
          this.$ga.event('insbuy', 'buy', `insbuy`);
        } else {
          // this.$ga.event(
          //   "insbuy",
          //   "buy",
          //   `checkoutbuy-${this.purchaseParams.origin}`
          // );
          this.$ga.event('insbuy', 'buy', `checkoutnew`);
        }
      } else {
        let client = '';
        if (this.COMMON.isiOS()) client = 'ios';
        if (this.COMMON.isAndroid()) client = 'adr';
        this.$ga.event(
          'insbuy',
          'buy',
          `shopping${client}buy-${this.purchaseParams.origin}-${this.$i18n.locale}`
        );
      }
    },

    // Bumper
    payBumperTrigger() {
      let api = '';

      if (this.hostIsIOT) {
        api = apiIOT.webCashEnable;
      } else {
        api = apiOther.webCashEnable;
      }

      this.$nuxt.$axios
        .post(api)
        .then((response) => {
          if (response.data.status === 'ok') {
            this.payBumper = response.data.enable === 0; // enable === 0 不能支付
            this.payBumperEngine();
          } else {
            console.log('payBumperTrigger Error:', response.data);
          }
        })
        .catch((error) => {
          console.log('payBumperTrigger Error:', error);
        });
    },
    payBumperEngine() {
      if (this.payBumper && this.$route.path === '/checkout') {
        this.dialogFailMsg =
          'Our system is upgrading currently. Please try again later.';
        this.dialogFail = true;
        console.warn('payBumper Status:', this.payBumper);
        return true;
      } else {
        return false;
      }
    },

    historyHack() {
      if (window.location.hostname !== this.$constant.pay.page.iot) return;

      history.pushState(null, null, document.URL);
      window.addEventListener('popstate', function () {
        history.pushState(null, null, document.URL);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.checkout {
  position: relative;
  padding-top: 80px;
  padding-bottom: 100px;
  background-color: #f8f8f8;

  &:before {
    display: none;
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 380px;
    background-color: #f8f8f8;
  }

  &.client {
    padding-top: 0;

    &:before {
      height: 300px;
    }
  }

  .wrapper {
    transition: filter 0.5s;

    &.processing {
      filter: blur(8px) !important;
    }

    h1 {
      margin: 60px 0 42px;
      font: 600 28px/34px Montserrat;
      color: #2a2a2a;
    }

    .checkout__main {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      width: 100%;

      .checkout__main_wrapper {
        margin-top: 48px;

        &.left {
          width: 670px;

          .checkout__main_wrapper_container {
            padding: 0;

            .pc {
              text-align: center;
              border-bottom: 1px solid #ddd;
              padding-bottom: 20px;
            }

            h2 {
              span {
                font-size: 28px;
              }
            }
          }
        }

        &.right {
          margin-left: 66px;
          width: 572px;

          .checkout__main_wrapper_container {
            background-color: #fff;
            box-shadow: 0 0 20px rgba(0, 19, 97, 0.07);
            border-radius: 12px;

            h2 {
              text-align: center;
            }
          }
        }

        .checkout__main_wrapper_container {
          padding: 32px 0;
          width: 100%;

          h2 {
            font-size: 0;

            span {
              font: 600 24px Montserrat;
              color: #2a2a2a;
            }

            i {
              margin-right: 20px;
              display: inline-block;
              width: 32px;
              height: 32px;
              text-align: center;
              line-height: 32px;
              background-color: #005fff;
              border-radius: 50%;
              font-size: 14px;
              font-style: normal;
              font-weight: 600;
              color: #fff;
              vertical-align: top;
            }
          }

          .checkout__main_cart {
            margin-top: 32px;

            .checkout__main_cart-list {
              .unit {
                position: relative;
                padding: 12px 12+40px 12px 12+64+12px;
                width: 100%;
                height: 92px;
                border-top: 1px solid #e6e6e6;
                font-size: 0;

                &:last-child {
                  height: 93px;
                  border-bottom: 1px solid #e6e6e6;
                }

                img,
                .img {
                  position: absolute;
                  left: 24px;
                  top: 12px;
                  width: 64px;
                  height: 64px;
                  border-radius: 50%;
                }

                .text {
                  display: flex;
                  justify-content: center;
                  align-items: flex-start;
                  flex-direction: column;
                  padding-left: 16px;
                  width: 100%;
                  height: 100%;

                  p {
                    margin: 3px 0;
                    max-width: 100%;
                    @include text-ellipsis;

                    span {
                      width: 100%;
                      font: 600 16px Montserrat;
                      color: #2a2a2a;
                      vertical-align: middle;
                    }

                    &.gifts {
                      span {
                        color: #ff9c39;
                      }

                      &:after {
                        margin-left: 5px;
                        content: "";
                        display: inline-block;
                        width: 14px;
                        height: 14px;
                        background: url("~@/assets/images/global/icon_giftbox.svg") no-repeat center;
                        background-size: contain;
                        vertical-align: middle;
                      }
                    }

                    &.subscribe {
                      span {
                        color: #ff9c39;
                      }
                    }
                  }
                }

                i {
                  position: absolute;
                  right: 12px;
                  top: 12px;
                  display: inline-block;
                  width: 40px;
                  height: 64px;
                  background: url("~@/assets/images/payment/payment__icon-delete.svg") no-repeat center;
                  background-size: 13px 16px;
                  cursor: pointer;
                  transition: all 0.3s;

                  &:hover {
                    opacity: 0.7;
                  }
                }

                &.skeleton {
                  display: flex;
                  justify-content: flex-start;
                  align-items: center;

                  * {
                    background: linear-gradient(
                        to right,
                        #eff1f3 4%,
                        #e2e2e2 25%,
                        #eff1f3 36%
                    );
                    background-size: 200% 100%;
                    animation: shimmer 4s infinite linear;
                    @keyframes shimmer {
                      0% {
                        background-position: 200% 100%;
                      }
                      100% {
                        background-position: -200% 100%;
                      }
                    }
                  }

                  .p {
                    margin-left: 24px;
                    width: 60%;
                    height: 19px;
                  }
                }
              }
            }

            .checkout__main_cart-total {
              // border: 1px solid #e5effa;
              // border-radius: 8px;
              // margin: 0 15px;
              margin-top: 27px;
              padding: 17px 0;

              > div {
                display: flex;
                align-items: center;
                justify-content: flex-end;
                padding-right: 0 !important;

                &.followers-price,
                &.all-price {
                  padding-right: 67px;
                  box-sizing: border-box;

                  p {
                    min-width: 110px;
                    text-align: left;
                  }

                  b {
                    display: inline-block;
                    width: 150px;
                    text-align: left;
                  }
                }

                > p {
                  font: normal normal 500 16px/30px BalooChettan;
                  color: #3e3e3e;
                  margin-right: 67px;
                }

                > b {
                  font: normal normal 500 18px/30px BalooChettan;
                  color: #000000;
                }

                &.discount-price {
                  b {
                    font: normal normal 600 16px/30px BalooChettan;
                    color: #ff8b07;
                  }
                }

                &.price-line {
                  width: 100%;
                  height: 1px;
                  // border: 1px dashed #e5effa;
                  border-bottom: 1px dashed #707070;
                  opacity: 0.19;
                  margin-top: 20px;
                  margin-bottom: 20px;
                }

                &.all-price {
                  p {
                    font: normal normal 600 20px/30px BalooChettan;
                    color: #000000;
                  }

                  b {
                    font: normal normal 600 20px/30px BalooChettan;
                    color: #000000;
                  }
                }
              }

              b {
                font-weight: 600;
                color: #2a2a2a;
              }
            }
          }

          .checkout__main_form {
            // margin-top: 20px;

            &.loading {
              padding: 10%;
              text-align: center;

              img {
                width: 14%;
              }
            }

            input {
              border-color: #e7e7e7;
            }

            .row {
              margin-top: 30px;
              font-size: 0;

              input[type="number"] {
                &::-webkit-outer-spin-button,
                &::-webkit-inner-spin-button {
                  -webkit-appearance: none !important;
                  margin: 0;
                }

                -moz-appearance: textfield;
              }

              .double {
                display: inline-block;
                width: 300px;
                vertical-align: top;

                &:last-child {
                  margin-left: 17px;
                }
              }

              label {
                display: inline-block;
                width: 100%;
                height: 60px;
                vertical-align: middle;

                &.radio {
                  margin-top: 30px;
                  width: 100%;
                  height: 32px;
                  cursor: pointer;
                  font-size: 0;

                  &:first-child {
                    margin-top: 0;
                  }

                  &.PayPal,
                  &.PayOp {
                    // width: 40%;
                  }

                  * {
                    vertical-align: middle;
                  }

                  input[type="radio"] {
                    margin-right: 12px;
                    vertical-align: middle;
                  }

                  span {
                    font: 600 16px/19px Montserrat;
                    color: #2a2a2a;
                    vertical-align: middle;
                  }

                  i {
                    margin-right: 6px;
                    display: inline-block;
                    height: 32px;
                    background-size: contain;
                    background-repeat: no-repeat;
                    background-position: center;
                    vertical-align: middle;

                    &.CreditCard {
                      width: 43px;
                      background-image: url("~@/assets/images/payment/payment__icon-credit_card.svg");
                    }

                    &.PayPal {
                      width: 93px;
                      background-image: url("~@/assets/images/payment/payment__icon-paypal.svg");
                    }

                    &.VISA {
                      margin-left: 10px;
                      width: 50px;
                      background-image: url("~@/assets/images/payment/payment__icon_card-issuer_visa.svg");
                    }

                    &.MasterCard {
                      width: 46px;
                      background-image: url("~@/assets/images/payment/payment__icon_card-issuer_master-card.svg");
                    }

                    &.AmericanExpress {
                      width: 26px;
                      background-image: url("~@/assets/images/payment/payment__icon_card-issuer_american-express.svg");
                    }

                    &.JCB {
                      width: 38px;
                      background-image: url("~@/assets/images/payment/payment__icon_card-issuer_jcb.svg");
                    }

                    &.PayOp {
                      width: 72px;
                      background-image: url("~@/assets/images/payment/payment__icon-payop.png");
                    }

                    &.flag {
                      margin-left: 20px;
                      margin-right: 0;
                      width: 40px;
                      height: 32px;
                      border: 1px solid #dedede;
                      border-right: none;
                      border-radius: 6px 0 0 6px;
                      background-color: #fff;
                      font-size: 0;
                      text-align: center;

                      img {
                        width: 20px;
                        height: 20px;
                        vertical-align: middle;
                      }

                      &:after {
                        content: "";
                        display: inline-block;
                        vertical-align: middle;
                        width: 0;
                        height: 100%;
                      }
                    }

                    &.Paddle {
                      width: 179px;
                      background-image: url("~@/assets/images/payment/payment__icon-paddle.svg");
                    }
                  }
                }

                &.title {
                  margin-bottom: 10px;
                  height: auto;
                  font: 400 16px/20px Montserrat;
                  color: #a8a8a8;
                }

                &.radio-select {
                  width: 233px;
                  height: 32px;

                  select {
                    padding: 0 14px;
                    border-radius: 0 6px 6px 0;
                  }
                }
              }

              &.radio-group {
                margin-top: 0;
                padding: 28px 0 34px;
                // border-top: 1px solid #DCDCDC;
                // border-bottom: 1px solid #DCDCDC;
              }

              .month,
              .year {
                display: inline-block;
                vertical-align: top;

                input {
                  &:focus,
                  &:hover {
                    z-index: 1;
                  }

                  text-align: center;
                }
              }

              .month {
                width: 124px;

                input {
                  border-radius: 6px 0 0 6px;
                }
              }

              .year {
                margin-left: -2px;
                width: 178px;

                input {
                  border-radius: 0 6px 6px 0;
                }
              }

              i.error {
                padding: 0 12px;
                margin: 0 auto;
                display: block;
                width: 94%;
                height: 0;
                background-color: #ff4444;
                border-radius: 0 0 6px 6px;
                font: 500 15px/40px Montserrat;
                color: #ffffff;
                transition: all 0.3s;
              }

              p.note {
                font: 400 16px/24px Montserrat;
                color: #2a2a2a;
              }

              &.invalid,
              .invalid {
                label {
                  input,
                  select,
                  &.stripe-filed {
                    z-index: 1;
                    border-color: #ff3939;
                  }
                }

                i.error {
                  height: 40px;
                }
              }
            }

            .radio-fieldset {
              .fieldset {
                //height: 0;
                overflow: hidden;
                transition: all 0.3s cubic-bezier(0.76, 0, 0.24, 1);

                &.height-0 {
                  height: 190px;

                  &.height-card-error {
                    height: 230px;
                  }
                }

                &.height-1 {
                  height: 44px;
                }

                .row {
                  &.has-title {
                    margin-top: 20px;

                    .title {
                      font: normal normal 600 16px/16px BalooChettan;
                      color: #7e7e7e;
                    }
                  }
                }
              }
            }

            .payssion-pm {
              margin-top: 20px;
              display: flex;
              justify-content: flex-start;
              flex-wrap: wrap;

              .unit {
                position: relative;
                margin: 20px 20px 0 0;
                display: flex;
                justify-content: center;
                align-items: center;
                width: 134px;
                height: 48px;
                background-color: #fff;
                border: 2px solid #e7e7e7;
                border-radius: 6px;
                overflow: hidden;
                cursor: pointer;
                font-size: 0;
                transition: all 0.3s;

                &:nth-child(4) {
                  margin-right: 0;
                }

                &:after {
                  content: "";
                  position: absolute;
                  top: -2px;
                  right: -2px;
                  display: block;
                  width: 36px;
                  height: 36px;
                  background: url("~@/assets/images/payment/payment__icon_check-blue.svg") center no-repeat;
                  background-size: contain;
                  opacity: 0;
                  transition: all 0.3s;
                }

                &.on {
                  border-color: #005fff;

                  &:after {
                    opacity: 1;
                  }
                }

                img {
                  max-width: 90%;
                  max-height: 90%;
                }
              }
            }
          }
        }

        .checkout__main_wrapper_p {
          margin-top: 36px;
          font: 400 14px/24px Montserrat;
          color: #a8a8a8;
        }

        .checkout__main_wrapper_btn-container {
          margin-top: 36px;
          height: 80px;
        }
      }
    }
  }
}

.stripe-card-container {
  margin: 50px auto;
  width: 400px;
}

.credit-card-inputs.complete {
  border: 2px solid green;
}

@media (min-width: 769px) {
  // input,select {
  //   border-width: 1px;
  //   font: normal normal 400 14px/50px BalooChettan;
  //   color: #7E7E7E;
  //   &:not([type='radio']) {
  //     height: 50px;
  //   }
  // }
  .national-flag {
    position: absolute;
    top: 33px;
    left: 62px;
    width: 18px;
    height: 18px;
    z-index: 9;
    border-radius: 100%;
  }
  .checkout {
    padding-top: 117px;
    padding-bottom: 50px;
    background: #8d8d8d21 !important;

    margin: 0 auto;

    &.client {
      padding-top: 0;

      &:before {
        height: 176px;
      }
    }

    // &:before {
    //   display: block;
    //   height: 220px;
    //   background-color: #005FFF;
    // }

    .wrapper {
      // padding: 0 4vw;
      background-color: #fff;
      // padding-top: 38px;
      width: 972px;
      padding: 0 100px;
      box-sizing: border-box;
      box-shadow: 0px 6px 10px #8d8d8d21;
      border-radius: 14px;
      padding-bottom: 30px;

      h1 {
        margin: 32px 0 28px;
        font: 700 22px/28px Montserrat;
        color: #fff;
        text-align: center;
      }

      .checkout__main {
        display: block;

        .checkout__main_wrapper {
          width: 100%;
          margin-top: 32px;

          &:first-child {
            margin-top: 0;
          }

          &.left {
            width: 100%;

            .checkout__main_wrapper_container {
              // padding: 4vw;
              background-color: #fff;
              box-shadow: none;
              border-radius: 6px;

              .mobile {
                span {
                  padding-left: 25px;
                  font: normal normal 600 24px/30px BalooChettan;
                  color: #000000;
                }
              }
            }
          }

          &.right {
            margin-left: 0;
            width: 100%;
            padding-top: 38px;

            .checkout__main_wrapper_container {
              background-color: #fff;
              box-shadow: none;
              border-radius: 6px;
              padding: 0;

              h2 {
                padding: 0;
                padding-left: 28px;

                span {
                  font: normal normal 600 24px/30px BalooChettan;
                  color: #000000;
                }
              }
            }
          }

          .checkout__main_wrapper_container {
            padding: 6vw 4vw;
            // box-shadow: 0 0 10px rgba(0, 19, 97, 0.07);
            border-radius: 6px;

            h2 {
              font-size: 0;

              span {
                font: 600 16px/28px Montserrat;
              }

              i {
                margin-right: 10px;
                width: 28px;
                height: 28px;
                line-height: 28px;
                font-size: 12px;
              }
            }

            .checkout__main_cart {
              margin-top: 16px;

              .checkout__main_cart-list {
                // padding: 0 15px;
                .unit {
                  margin-top: 13px;
                  padding: 0;
                  height: 68px;
                  border: 0;
                  // box-shadow: 0px 4px 12px #c4cce6ba;
                  border: 1px solid #e8e8e8;
                  border-radius: 8px;

                  &:first-child {
                    margin-top: 10px;
                  }

                  &:last-child {
                    height: 68px;
                  }

                  img,
                  .img {
                    top: 50%;
                    left: 24px;
                    width: 50px;
                    height: 50px;
                    transform: translateY(-50%);
                  }

                  .text {
                    padding-left: 72px;
                    display: flex !important;
                    flex-direction: row;
                    justify-content: space-between;
                    padding-right: 88px;
                    position: relative;

                    .text-div {
                      height: 100%;
                      min-width: 110px;
                      display: flex;
                      align-items: center;
                      // justify-content: center;
                      margin-left: 40px;
                    }

                    p {
                      margin: 2px 0;
                      margin-right: 20px;

                      span {
                        font: normal normal 600 18px/30px BalooChettan;
                        color: #000000;
                        display: inline-block;
                        height: 100%;

                        span {
                          display: flex;
                          align-items: center;
                          font: normal normal 600 20px/30px BalooChettan;
                        }
                      }

                      .type2-icon {
                        width: 24px;
                        height: 25px;
                        display: inline-block;
                        background: url("./img/gifts-icon.png") no-repeat;
                        background-size: contain;
                        margin: 0 10px;
                      }

                      &.gifts {
                        &:after {
                          content: none;
                        }
                      }
                    }

                    .addNum {
                      width: 81px;
                      height: 100%;
                      // margin-left: 15px;
                      position: absolute;
                      top: 50%;
                      transform: translateY(-50%);
                      right: 224px;

                      div {
                        border: 1px solid #e2dcdc;
                        border-radius: 4px;
                        width: 100%;
                        height: 30px;
                        margin-top: 21px;
                        display: flex;
                        justify-content: space-between;
                      }

                      span {
                        display: inline-block;
                        color: #000;
                        text-align: center;
                        box-sizing: border-box;
                        cursor: pointer;
                        font: normal normal 600 19px/30px BalooChettan;
                        color: #959595;

                        &:hover {
                          color: #000;
                        }
                      }

                      span:first-child {
                        width: 25px;
                        height: 100%;
                        border-right: 1px solid #e2dcdc;
                      }

                      span:nth-child(2) {
                        flex: 1;
                        height: 100%;
                        font: normal normal 500 16px/30px BalooChettan;
                        color: #000000;
                      }

                      span:last-child {
                        width: 25px;
                        height: 100%;
                        border-left: 1px solid #e2dcdc;
                      }
                    }

                    .addPrice {
                      font: normal normal 600 20px/68px BalooChettan;
                      color: #000000;
                      height: 100%;
                    }
                  }

                  i {
                    top: 50%;
                    right: 30px;
                    width: 40px;
                    height: 40px;
                    transform: translateY(-50%);
                    // background-size: 13px 16px;
                    background: url("./img/close.svg") no-repeat center;
                  }
                }
              }
            }

            .checkout__main_form {
              // padding: 0 3vw;
              // background: #fbfcfe;
              // border: 1px solid #e5effa;
              border-radius: 8px;
              // margin: 0 4vw;
              padding-top: 34px;
              // margin-top: 20px;
              // margin-bottom: 50px;

              &.loading {
                padding: 10%;

                img {
                  width: 18%;
                }
              }

              .row {
                margin-top: 16px;
                font-size: 0;

                &.radio-group {
                  padding-top: 0;
                  padding-bottom: 16px;
                  border-top: none;
                }

                &.first {
                  margin-top: 0;
                }

                .double {
                  width: 370px;

                  &:last-child {
                    margin-left: 32px;
                  }
                }

                label {
                  display: inline-block;
                  width: 100%;
                  height: 56px;

                  &.radio {
                    // margin-top: 14px;
                    // height: 28px;
                    // width: 100%;

                    &.PayOp {
                      width: 100%;
                    }

                    &.PayPal {
                      margin-top: 14px;
                    }

                    input[type="radio"] {
                      //   margin-right: 9px;
                    }

                    span {
                      // font: 600 14px/17px Montserrat;
                      //   font: normal normal 600 16px/30px BalooChettan;
                    }

                    i {
                      margin-right: 4px;
                      height: 22px;

                      &.CreditCard {
                        width: 29px;
                      }

                      &.PayPal {
                        width: 78px;
                      }

                      &.Paddle {
                        width: 139px;
                        height: 25px;
                      }

                      &.PayOp {
                        width: 54px;
                      }

                      &.VISA {
                        margin-left: 2px;
                        width: 42px;
                      }

                      &.MasterCard {
                        width: 33px;
                      }

                      &.AmericanExpress {
                        width: 22px;
                      }

                      &.JCB {
                        width: 29px;
                      }

                      &.flag {
                        // margin-left: 4vw;
                        // margin-right: 0;
                        // width: 7.467vw;
                        // height: 22px;
                        // border-width: 0.5px;
                        // border-radius: 3px 0 0 3px;

                        // img {
                        //   width: 14px;
                        //   height: 10px;
                        // }
                      }
                    }
                  }

                  &.title {
                    margin-bottom: 8px;
                    font: 400 14px/17px Montserrat;
                  }

                  &.month {
                    width: 15.733vw;

                    input {
                      border-radius: 3px 0 0 3px;
                    }
                  }

                  &.year {
                    margin-left: -1px;
                    width: 24.8vw;

                    input {
                      border-radius: 0 3px 3px 0;
                    }
                  }

                  &.radio-select {
                    // width: 104px;
                    // height: 22px;

                    select {
                      padding: 0 6px;
                      border-radius: 0 3px 3px 0;
                      font-size: 10px;
                      font-weight: 500;
                      @include text-ellipsis;
                    }
                  }

                  span.payssion-el {
                    // width: 28.8vw;
                    // @include text-ellipsis;
                  }

                  label.payssion-el {
                    // width: 28vw;
                  }
                }

                i.error {
                  padding: 0 6px;
                  border-radius: 0 0 3px 3px;
                  font: 500 14px/35px Montserrat;
                  background-color: #fff;
                  color: red;
                }

                p.note {
                  font: 400 14px/17px Montserrat;
                }

                .month {
                  width: 46%;

                  input {
                    border-radius: 4px 0 0 4px;
                  }
                }

                .year {
                  margin-left: -1px;
                  width: 54%;

                  input {
                    border-radius: 0 4px 4px 0;
                  }
                }

                &.invalid,
                .invalid {
                  i.error {
                    height: 35px;
                  }
                }
              }

              .radio-fieldset {
                .fieldset {
                  &.height-0 {
                    height: 178px;
                  }

                  &.height-1 {
                    height: 54px;
                  }
                }
              }

              .pay-method {
                .payssion-pm {
                  //   margin-top: 0;

                  .unit {
                    // margin: 10px 5.333vw 0 0;
                    // border-width: 1px;
                    // width: 24.267vw;
                    // height: 32px;

                    &:nth-child(3) {
                      margin-right: 0;
                    }
                  }
                }
              }
            }

            .checkout__main_order {
              .checkout__main_order-list {
                font-size: 0;

                .unit {
                  margin-top: 17px;

                  * {
                    vertical-align: middle;
                  }

                  i {
                    display: inline-block;
                    width: 16px;
                    height: 16px;
                    background: url("~@/assets/images/payment/payment__icon_check.svg") no-repeat center;
                    background-size: contain;
                  }

                  p {
                    margin-left: 12px;
                    display: inline-block;
                    font: 600 14px/17px Montserrat;
                    color: #a8a8a8;
                  }
                }
              }

              .checkout__main_order-total {
                margin-top: 24px;
                padding-top: 24px;
                border-top: 0.5px solid #e5e5e5;
                text-align: right;
                font: 400 14px/15px Montserrat;
                color: #a8a8a8;

                b {
                  margin-left: 10px;
                  font-weight: 600;
                  color: #2a2a2a;
                }
              }
            }
          }

          .checkout__main_wrapper_p {
            font: 400 11px/15px Montserrat;
          }

          .checkout__main_wrapper_btn-container {
            // margin-top: 40px;
            // margin-bottom: 60px;
            // height: 60px;
            text-align: center;

            button {
              width: 277px;
              height: 60px;
              margin: 0 auto;
              background: transparent linear-gradient(90deg, #ffb24e 0%, #ff600e 100%) 0% 0% no-repeat padding-box;
              box-shadow: 0px 12px 24px #4747473d;
              border-radius: 8px;

              &:hover {
                background: transparent linear-gradient(270deg, #ffbe4e 0%, #ff984a 100%) 0% 0% no-repeat padding-box;
                box-shadow: 0px 12px 24px #7575753d;
              }
            }
          }
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .national-flag {
    position: absolute;
    top: 33px;
    left: 51px;
    width: 16px;
    height: 16px;
    z-index: 9;
    border-radius: 100%;
  }
  .checkout__main_cart-total {
    border: 1px solid #e5effa !important;
    border-radius: 8px !important;
    margin: 0 15px !important;
    margin-top: 27px !important;
    padding: 17px 24px !important;

    > div {
      display: flex;
      align-items: center !important;
      justify-content: space-between !important;

      > p {
        font: normal normal 500 16px/30px BalooChettan !important;
        color: #3e3e3e !important;
      }

      > b {
        font: normal normal 600 14px/30px BalooChettan !important;
        color: #000000 !important;
      }

      &.discount-price {
        b {
          font: normal normal 600 16px/30px BalooChettan !important;
          color: #ff8b07 !important;
        }
      }

      &.price-line {
        width: 100% !important;
        height: 1px !important;
        border-bottom: 1px dashed #e5effa !important;
        margin-top: 15px !important;
        margin-bottom: 15px !important;
        opacity: 1 !important;
      }

      &.all-price {
        p {
          font: normal normal 700 16px/30px BalooChettan !important;
          color: #000000 !important;
          width: auto !important;
        }

        b {
          font: normal normal 700 16px/30px BalooChettan !important;
          color: #000000 !important;
          width: auto !important;
        }
      }

      &.followers-price {
        p, b {
          width: auto !important;
        }
      }
    }

    b {
      font-weight: 600 !important;
      color: #2a2a2a !important;
    }
  }
  .checkout {
    padding-top: 44px;
    padding-bottom: 50px;

    &.client {
      padding-top: 0;

      &:before {
        height: 176px;
      }
    }

    // &:before {
    //   display: block;
    //   height: 220px;
    //   background-color: #005FFF;
    // }

    .wrapper {
      // padding: 0 4vw;
      background-color: #fff;
      // padding-top: 38px;

      h1 {
        margin: 32px 0 28px;
        font: 700 22px/28px Montserrat;
        color: #fff;
        text-align: center;
      }

      .checkout__main {
        display: block;

        .checkout__main_wrapper {
          width: 100%;
          margin-top: 32px;

          &:first-child {
            margin-top: 0;
          }

          &.left {
            width: 100%;

            .checkout__main_wrapper_container {
              // padding: 4vw;
              background-color: #fff;
              box-shadow: none;
              border-radius: 6px;

              .mobile {
                span {
                  padding-left: 25px;
                  font: normal normal 600 24px/30px BalooChettan;
                  color: #000000;
                }
              }
            }
          }

          &.right {
            margin-left: 0;
            width: 100%;
            padding-top: 38px;

            .checkout__main_wrapper_container {
              background-color: #fff;
              box-shadow: none;
              border-radius: 6px;
              padding: 0;

              h2 {
                padding: 0;
                padding-left: 28px;
                text-align: left;

                span {
                  font: normal normal 600 24px/30px BalooChettan;
                  color: #000000;
                }
              }
            }
          }

          .checkout__main_wrapper_container {
            padding: 6vw 4vw;
            // box-shadow: 0 0 10px rgba(0, 19, 97, 0.07);
            border-radius: 6px;

            h2 {
              font-size: 0;

              span {
                font: 600 16px/28px Montserrat;
              }

              i {
                margin-right: 10px;
                width: 28px;
                height: 28px;
                line-height: 28px;
                font-size: 12px;
              }
            }

            .checkout__main_cart {
              margin-top: 16px;

              .checkout__main_cart-list {
                padding: 0 15px;

                .unit {
                  margin-top: 23px;
                  padding: 0;
                  height: 68px;
                  border: 0;
                  box-shadow: 0px 4px 12px #c4cce6ba;
                  border-radius: 8px;

                  &:first-child {
                    margin-top: 10px;
                  }

                  &:last-child {
                    height: 68px;
                  }

                  img,
                  .img {
                    top: 50%;
                    left: 12px;
                    width: 50px;
                    height: 50px;
                    transform: translateY(-50%);
                  }

                  .text {
                    padding-left: 72px;
                    display: flex !important;
                    flex-direction: row;
                    justify-content: space-between;
                    padding-right: 12px;

                    .text-div {
                      height: 100%;
                      min-width: 110px;
                      display: flex;
                      flex-direction: column;
                      align-items: flex-start;
                      justify-content: center;
                    }

                    p {
                      margin: 2px 0;

                      span {
                        font: normal normal 700 16px/16px BalooChettan;
                        color: #000000;
                        display: inline-block;
                        height: 100%;

                        span {
                          display: flex;
                          align-items: center;
                        }
                      }

                      .type2-icon {
                        width: 20px;
                        height: 21px;
                        display: inline-block;
                        background: url("./img/gifts-icon.png") no-repeat;
                        background-size: cover;
                        margin: 0 5px;
                      }

                      &.gifts {
                        &:after {
                          content: none;
                        }
                      }
                    }

                    .addNum {
                      width: 65px;
                      height: 100%;
                      // margin-left: 15px;
                      div {
                        border: 1px solid #e2dcdc;
                        border-radius: 4px;
                        width: 100%;
                        height: 23px;
                        margin-top: 21px;
                        display: flex;
                        justify-content: space-between;
                      }

                      span {
                        display: inline-block;
                        color: #000;
                        text-align: center;
                        box-sizing: border-box;
                        cursor: pointer;
                        font: normal normal 600 18px/23px BalooChettan;
                        color: #959595;
                      }

                      span:first-child {
                        width: 20px;
                        font-size: 14px;
                        height: 100%;
                        border-right: 1px solid #e2dcdc;
                      }

                      span:nth-child(2) {
                        flex: 1;
                        height: 100%;
                        font: normal normal 500 16px/23px BalooChettan;
                        color: #000000;
                      }

                      span:last-child {
                        width: 20px;
                        height: 100%;
                        font-size: 14px;
                        border-left: 1px solid #e2dcdc;
                      }
                    }

                    .addPrice {
                      font: normal normal 600 16px/68px BalooChettan;
                      color: #000000;
                      height: 100%;
                    }
                  }

                  i {
                    top: -19px;
                    right: -17px;
                    width: 40px;
                    height: 40px;
                    // background-size: 13px 16px;
                    background: url("./img/close.svg") no-repeat center;
                  }
                }
              }
            }

            .checkout__main_form {
              padding: 0 3vw;
              background: #fbfcfe;
              border: 1px solid #e5effa;
              border-radius: 8px;
              margin: 0 4vw;
              padding-top: 34px;
              margin-top: 20px;
              margin-bottom: 50px;

              &.loading {
                padding: 10%;

                img {
                  width: 18%;
                }
              }

              .row {
                margin-top: 16px;
                font-size: 0;

                &.radio-group {
                  padding-top: 0;
                  padding-bottom: 16px;
                  border-top: none;
                }

                &.first {
                  margin-top: 0;
                }

                .double {
                  width: 40vw;

                  &:last-child {
                    margin-left: 4vw;
                  }
                }

                label {
                  display: inline-block;
                  width: 100%;
                  height: 56px;

                  &.radio {
                    margin-top: 14px;
                    height: 28px;
                    width: 100%;

                    &.PayOp {
                      width: 100%;
                    }

                    &.PayPal {
                      margin-top: 14px;
                    }

                    input[type="radio"] {
                      margin-right: 9px;
                    }

                    span {
                      font: 600 14px/17px Montserrat;
                    }

                    i {
                      margin-right: 4px;
                      height: 22px;

                      &.CreditCard {
                        width: 29px;
                      }

                      &.PayPal {
                        width: 78px;
                      }

                      &.Paddle {
                        width: 139px;
                        height: 25px;
                      }

                      &.PayOp {
                        width: 54px;
                      }

                      &.VISA {
                        margin-left: 2px;
                        width: 42px;
                      }

                      &.MasterCard {
                        width: 33px;
                      }

                      &.AmericanExpress {
                        width: 22px;
                      }

                      &.JCB {
                        width: 29px;
                      }

                      &.flag {
                        margin-left: 4vw;
                        margin-right: 0;
                        width: 7.467vw;
                        height: 22px;
                        border-width: 0.5px;
                        border-radius: 3px 0 0 3px;

                        img {
                          width: 14px;
                          height: 10px;
                        }
                      }
                    }
                  }

                  &.title {
                    margin-bottom: 8px;
                    font: 400 14px/17px Montserrat;
                  }

                  &.month {
                    width: 15.733vw;

                    input {
                      border-radius: 3px 0 0 3px;
                    }
                  }

                  &.year {
                    margin-left: -1px;
                    width: 24.8vw;

                    input {
                      border-radius: 0 3px 3px 0;
                    }
                  }

                  &.radio-select {
                    width: 104px;
                    height: 22px;

                    select {
                      padding: 0 6px;
                      border-radius: 0 3px 3px 0;
                      font-size: 10px;
                      font-weight: 500;
                      @include text-ellipsis;
                    }
                  }

                  span.payssion-el {
                    width: 28.8vw;
                    @include text-ellipsis;
                  }

                  label.payssion-el {
                    width: 28vw;
                  }
                }

                i.error {
                  padding: 0 6px;
                  border-radius: 0 0 3px 3px;
                  font: 500 14px/35px Montserrat;
                  background-color: #fff;
                  color: red;
                }

                p.note {
                  font: 400 14px/17px Montserrat;
                }

                .month {
                  width: 46%;

                  input {
                    border-radius: 4px 0 0 4px;
                  }
                }

                .year {
                  margin-left: -1px;
                  width: 54%;

                  input {
                    border-radius: 0 4px 4px 0;
                  }
                }

                &.invalid,
                .invalid {
                  i.error {
                    height: 35px;
                  }
                }
              }

              .radio-fieldset {
                .fieldset {
                  &.height-0 {
                    height: 178px;
                  }

                  &.height-1 {
                    height: 54px;
                  }
                }
              }

              .pay-method {
                .payssion-pm {
                  margin-top: 0;

                  .unit {
                    margin: 10px 5.333vw 0 0;
                    border-width: 1px;
                    width: 24.267vw;
                    height: 32px;

                    &:nth-child(3) {
                      margin-right: 0;
                    }
                  }
                }
              }
            }

            .checkout__main_order {
              .checkout__main_order-list {
                font-size: 0;

                .unit {
                  margin-top: 17px;

                  * {
                    vertical-align: middle;
                  }

                  i {
                    display: inline-block;
                    width: 16px;
                    height: 16px;
                    background: url("~@/assets/images/payment/payment__icon_check.svg") no-repeat center;
                    background-size: contain;
                  }

                  p {
                    margin-left: 12px;
                    display: inline-block;
                    font: 600 14px/17px Montserrat;
                    color: #a8a8a8;
                  }
                }
              }

              .checkout__main_order-total {
                margin-top: 24px;
                padding-top: 24px;
                border-top: 0.5px solid #e5e5e5;
                text-align: right;
                font: 400 14px/15px Montserrat;
                color: #a8a8a8;

                b {
                  margin-left: 10px;
                  font-weight: 600;
                  color: #2a2a2a;
                }
              }
            }
          }

          .checkout__main_wrapper_p {
            font: 400 11px/15px Montserrat;
          }

          .checkout__main_wrapper_btn-container {
            margin-top: 40px;
            margin-bottom: 60px;
            height: 60px;
            text-align: center;

            button {
              width: 277px;
              height: 60px;
              margin: 0 auto;
              background: transparent linear-gradient(90deg, #ffb24e 0%, #ff600e 100%) 0% 0% no-repeat padding-box;
              box-shadow: 0px 12px 24px #4747473d;
              border-radius: 8px;
            }
          }
        }
      }
    }
  }
}
</style>

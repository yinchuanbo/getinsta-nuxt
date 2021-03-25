<template>
  <div class="botpayment">
    <ul>
      <li>
        <p v-if="selectfoll">{{ selectfoll }} Daily Followers ${{ selectfollprice }}</p>
        <span v-if="selectday">{{ selectday }}-Day Subscription</span>
      </li>
      <li>
        <div class="botpayment-li">
          <h4>Enter Instagram Account</h4>
          <div class="control-search_ins">
            <label>
              <input
                v-model="inputval"
                type="text"
                :placeholder="'Instagram Username'"
                @input="giveFather"
              />
            </label>
            <div class="search_btn" @click="searchUsername">
              <button-purple
                text="Next >>"
                :sharp="true"
                :loading="searchInsLoading"
                :sizeweight="sizefont"
              />
            </div>
          </div>
        </div>
      </li>
      <li>
        <div class="sanicon"></div>
        <button class="addanimation" @click="addcart">
          Continue to Payment
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import ButtonPurple from "@/components/button/button-purple";
import apiAccount from "@/api/api.account";

export default {
  components: {
    ButtonPurple
  },
  props: {
    sendval: {
      type: String,
      default: null
    },
    selectfoll: {
      type: Number,
      default: null
    },
    selectfollprice: {
      type: String,
      default: null
    },
    selectday: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      inputval: this.sendval,
      searchInsLoading: false,
      sizefont: true
    };
  },
  watch: {
    sendval(newVal, oldVal) {
      this.inputval = newVal;
    }
  },
  methods: {
    giveFather() {
      this.$emit("NoticeFather", this.inputval);
    },
    searchUsername() {
      if (this.inputval !== "") {
        this.searchInsLoading = true;
      } else {
        this.searchInsLoading = false;
      }

      this.$emit("NoticeFathertwo");
    },
    addcart() {
      this.$emit("Addproduct");
    }
  }
};
</script>

<style lang="scss" scoped>
.botpayment {
  display: block;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: url("../../../assets/images/autofollower/bg1.png") no-repeat;
  background-position: center;
  background-size: cover;
  ul {
    display: flex;
    width: 1087px;
    margin: 0 auto;
    li {
      height: 80px;
      padding-left: 12px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      position: relative;
      &::before {
        content: "";
        width: 5px;
        height: 100%;
        position: absolute;
        right: -41px;
        top: 0;

        background: url("../../../assets/images/autofollower/line.png")
          no-repeat;
        background-size: cover;
      }
      p {
        font: normal normal bold 16px/19px Montserrat;
        letter-spacing: 0px;
        color: #e85000;
        margin-bottom: 6px;
      }
      span {
        font: normal normal medium 14px/18px Montserrat;
        letter-spacing: 0px;
        color: #e85000;
      }
    }
    .botpayment-li {
      padding-left: 45px;
      width: 600px;
      // flex-direction:row;
      display: flex;
      align-items: center;
      justify-content: center;
      h4 {
        margin-right: 15px;
        font-weight: 600;
      }
      .control-search_ins {
        width: 325px;
        height: 38px;
        margin-top: 0;
        box-shadow: none;
        label {
          width: 83%;
          input {
            background: #fff;
            padding-left: 28px;
            font: 500 18px Montserrat;
            border: 1px solid#DEB6EF !important;
          }
          input::-webkit-input-placeholder{
            color:#bfbfbf;
            font-size: 14px;
        }
        }
        .search_btn {
          width: 17%;
          button {
            border-right: none !important ;
            background: #8a70ff 0% 0% no-repeat padding-box;
            ::v-deep span {
              font-size: 12px !important;
            }
          }
        }
        &:hover {
          label {
            input {
              border: 1px solid #b6acfd !important;
            }
          }
          .search_btn {
            button {
              background-color: #ae70ff;
            }
          }
        }
      }
    }
    li:nth-child(3) {
      flex: 1;
      padding-left: 45px;

      button {
        position: relative;
        width: 177px;
        height: 40px;
        background: transparent
          linear-gradient(270deg, #fc8b3d 0%, #f1592d 100%) 0% 0% no-repeat
          padding-box;
        border-radius: 23px;
        font-size: 14px;
        color: #ffffff;
        cursor: pointer;
        overflow: hidden;
        transition: all 0.3s;
        &::before {
          content: "";
          position: absolute;
          width: 77px;
          height: 40px;
          position: absolute;
          top: 0;
          left: 0;
          background: url("~@/views/store/auto-follower/img/san.svg") center
            no-repeat;
          animation: mymove 3s linear normal infinite;
        }
        &:hover{
          background: transparent linear-gradient(270deg, #FC9D3D 0%, #F1822D 100%) 0% 0%;
        }
      }
      &::before {
        display: none;
      }
    }
  }
}
@keyframes mymove {
  from {
    left: 0;
  }
  to {
    left: 180px;
  }
}
@media (max-width: 768px) {
  .botpayment {
    display: none;
  }
}
</style>

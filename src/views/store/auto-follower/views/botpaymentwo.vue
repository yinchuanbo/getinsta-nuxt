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
          <input
            v-model="inputval"
            type="text"
            :placeholder="'Instagram Username'"
            @input="giveFather"
            @keyup.enter="searchUsername"
          />
        </div>
      </li>
      <li v-if="insfollower.post">
        <h3>{{ insfollower.ins_account }}</h3>
        <dl>
          <dd>
            <span>{{ insfollower.post.post_count |numberAbbreviations }}</span> Posts
          </dd>
          <dd>
            <span>{{ insfollower.followed_by |numberAbbreviations }}</span> Followers
          </dd>
          <dd>
            <span>{{ insfollower.follow |numberAbbreviations }}</span> Following
          </dd>
        </dl>
      </li>
      <li>
        <button @click="addcart">Continue to Payment</button>
      </li>
    </ul>
  </div>
</template>

<script>
// import ButtonPurple from "@/components/button/button-purple";

export default {
  components: {},
  filters: {
    // numToFixed(num) {
    //   if (typeof num === 'number')
    //     return num.toFixed(2);
    //   else
    //     return parseFloat(num).toFixed(2);
    // },
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
    sendval:{
      type:String,
      default:null
    },
    insfollower: {
      type: Object,
      default:null
    },
    selectfoll:{
      type:Number,
      default:null
    },
    selectfollprice: {
      type: String,
      default: null
    },
    selectday:{
      type:Number,
      default:null
    }
  },
  data() {
    return {
       inputval:this.sendval,
      searchInsLoading: false,
      sizefont: true,
      // objone: {
      //   ins_account: "nba",
      //   post: { post_count: "38312 " },
      //   followed_by: "53357610 ",
      //   follow: "991 "
      // }
    };
  },
  watch:{
    // sendval(newVal, oldVal){
    //   this.inputval = newVal
    // },
    // insfollower: {

    //   handler(newVal, oldVal) {
    //     this.inputval = newVal.ins_account
    //   },
    //   deep: true

    // }
  },
  mounted() {
    console.log('this.insfollower',this.insfollower);
    this.searchInsInput =this.insfollower.ins_account
  },

  methods: {
    giveFather(){
      this.$emit('NoticeFather',this.inputval)
    },
    searchUsername() {
      this.$emit('NoticeFathertwo')
    },
    addcart(){
      this.$emit('Addproduct')
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
  background-position:center;
  background-size: cover;
  ul {
    display: flex;
    width: 1087px;
    margin: 0 auto;
    li {
      height: 80px;
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
        right: 0px;
        top: 0;
        background: url("../../../assets/images/autofollower/line.png")
          no-repeat;
        background-size: cover;
      }
      p {
        font: normal normal bold 14px/19px Montserrat;
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
    li:nth-child(1) {
      padding-left: 12px;
      padding-right: 45px;
    }
    .botpayment-li {
      padding: 0 27px;
      // width: 600px;
      // flex-direction:row;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      h4 {
        font-weight: 600;
        font-size: 14px;
      }
      input {
        margin-top: 5px;
        width: 185px;
        height: 30px;
        outline: none;
        border: none;
      }
    }
    li:nth-child(3) {
      width: 400px;
      h3 {
        margin-left: -35px;
        font-weight: 600;
      }
      dl {
        width: 100%;
        display: flex;
        justify-content: space-around;
        margin-top: 10px;
        dd {
          color: #000;
          font-size: 14px;
          span {
            color: #000;
            font-weight: bold;
            font-size: 14px;
          }
        }
      }
    }
    li:last-child {
      flex: 1;
      button {
        position: relative;
        margin-left: 15px;
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
        &::before{
          content: '';
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
      }
      &::before {
        display: none;
      }
    }
  }
}
@keyframes mymove
{
from {left: 0;}
to {left: 180px;}
}
@media (max-width: 768px) {
  .botpayment {
    display: none;
  }
}
</style>

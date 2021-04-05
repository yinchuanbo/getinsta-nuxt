<template>
  <div class="store-s2-faqs-wrapper">
    <div class="store-s2-faqs">
      <h2>FAQs</h2>
      <p>from Users Who Pay for Instagram Followers</p>
      <ul>
        <li v-for="(item, i) in lists" :key="item.id">
          <div class="faqs-title" :class="{ 'on': i == currentNum }" @click="showOrHide(i)">
            <div class="faqs-title_icon">{{ i == currentNum ? '-' : '+' }}</div>
            <p>{{ item.title }}</p>
          </div>
          <div v-if="i == currentNum" class="faqs-content">
            <p v-html="item.content"></p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentNum: 9,
      lists: [
        {
          id: 0,
          title: 'How Many Users Choose to Buy Instagram Followers?',
          content: 'According to the statistics, more than 8,500 people per day pay for Instagram followers through GetInsta. Meanwhile, more than 80% of our customers are the customers who make continuous purchases. This service also works for your Instagram engagement.'
        },
        {
          id: 1,
          title: 'Why Should You Buy Instagram Followers?',
          content: 'The number of Instagram followers means a lot to the popularity of an Instagram account. According to the survey of experiment on how to build an Instagram influencer, it shows that buying real IG followers is the most used strategy in over 75% of experiments. If you want to stand out on Instragram, now go to buy 100, 500, 1000 or more Instagram followers with GetInsta!'
        },
        {
          id: 2,
          title: 'Is It at Risk to Buy Instagram Followers?',
          content: 'It depends on if the followers are real from real actions. Instagram privacy tells that they crack down on auto actions and bots account. Luckily, GetInsta builds the platform for Instagram users and all actions are done by real users themselves. You don’t need to worry about anything if you <strong style="font-weight: 600">purchase Instagram followers</strong> with GetInsta.'
        },
        {
          id: 3,
          title: 'Can I Buy Fake Instagram Followers from Unknown Web?',
          content: 'Many Instagram users choose to buy fake Instagram followers from unknown webs, for their cheap price. It is totally at risk for the safety of your Instagram accounts, even for the cash in your wallet online. <strong style="font-weight: 600">Where to buy Instagram followers real & cheap?</strong> GetInsta can be your best choice. Through growing the platform, we depress the price to the low level online.'
        }
      ]
    }
  },
  methods: {
    showOrHide(i) {
      if(this.currentNum != i) {
        this.currentNum = i;
      } else {
        this.currentNum = 9
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.store-s2-faqs {
   background: #F1F3F5;
   width: 100%;
   height: auto;
   padding: 72px 16px;
   padding-bottom: 56px;
   > h2 {
     text-align: center;
     font: normal normal 600 40px/50px BalooChettan;
     letter-spacing: 0px;
     color: #000000;
     margin-bottom: 10px;
   }
   > p {
     text-align: center;
     font: normal normal 500 14px/20px BalooChettan;
     color: #7F8498;
     margin-bottom: 39px;
   }
   ul {
     li {
        background: #FFFFFF;
        border-radius: 8px;
        display: flex;
        flex-direction: column;
        margin-bottom: 16px;
        .faqs-title {
          display: flex;
          height: 64px;
          border-radius: 8px;
          cursor: pointer;
          &.on {
            .faqs-title_icon, p {
              color: #6257FF;
            }
          }
          .faqs-title_icon {
            width: 48px;
            height: 100%;
            line-height: 64px;
            text-align: center;
            font-size: 30px;
            color: #7F8498;
          }
          p {
            display: flex;
            align-items: center;
            font: normal normal 500 14px/20px BalooChettan;
            color: #7F8498;
          }
        }
        .faqs-content {
          p {
            font: normal normal 400 14px/20px BalooChettan;
            color: #7F8498;
            padding-left: 48px;
            padding-right: 15px;
            padding-bottom: 24px;
          }

        }
     }
   }
}

@media (min-width: 769px) {
.store-s2-faqs-wrapper {
  background: #F1F3F5;
  .store-s2-faqs {
    width: 1120px!important;
    margin: 0 auto;
    padding: 100px 0;
    > h2 {
      font: normal normal 600 48px/60px BalooChettan;
    }
    > p {
      font: normal normal 600 16px/20px BalooChettan;
      margin-bottom: 50px;
    }
  }
  }
}
</style>

<template>
  <div class="store-s2-faqs">
    <h2>Buy Instagram Likes FAQs</h2>
    <ul>
      <li v-for="(item, i) in lists" :key="item.id">
        <div class="faqs-title" :class="{ 'on': i == currentNum}" @click="showOrHide(i)">
          <div class="faqs-title_icon">{{ i == currentNum ? '-' : '+' }}</div>
          <p>{{ item.title }}</p>
        </div>
        <div v-if="i == currentNum" class="faqs-content">
          <p v-html="item.content"></p>
        </div>
      </li>
    </ul>
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
          title: 'Is It Legal to Buy Likes on Instagram?',
          content: 'Technically, it’s legal to buy Instagram likes. However, Instagram official doesn\'t encourage users to buy Instagram likes or followers, especially the fake and bots ones. But if you buy real Instagram likes and make it grow like the organic one, there is no such chance of violating any rules.'
        },
        {
          id: 1,
          title: 'Did You Get Banned for Buying Likes?',
          content: 'Bot-created likes and followers can easily get your account banned. That’s because it breaks the Instagram’s Terms of Service. But if you <a href="/get-instagram-followers-likes">get Instagram followers and likes</a> from real person, it will not put your account at risk. GetInsta caters to the rules of Instagram, helping you grow real likes naturally without getting banned or suspended.'
        },
        {
          id: 2,
          title: 'Is GetInsta Safe to Use?',
          content: 'GetInsta is a safe, trusted, and reliable site and app for you to buy engagement services. No human verification, no survey before using our services. When you <a href="/buy-instagram-followers">buy Instagram followers</a> or likes, you just need to offer your Instagram username. Then, you can choose a verified payment method to complete your purchase. No strings attached, no hack, and no information leaks.'
        },
        {
          id: 3,
          title: 'How Long It Takes to Complete Delivery?',
          content: 'We’ll start delivering within just a few minutes after completing your purchase. You can see your likes surge. Large orders like <a href="/blog/instagram-followers-10k-9">10k Instagram followers</a> or likes may take longer to deliver as we do not offer you fake likes generated by bots. We only provided you with real likes and followers, which will not harm your account and increase engagement.'
        },
        {
          id: 4,
          title: 'How Can You Tell If Someone Buy Fake Likes?',
          content: 'You can check their likes lists. If those likes are from weird accounts with random posts or without any posts, profile photo, that must be fake likes from bots. When it comes to buying Instagram likes, GetInsta offers an exclusive service: your post will be shown to real people, so you will get genuine Instagram likes from them.'
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
     margin-bottom: 20px;
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
            font: normal normal 500 14px/20px BalooChettan;
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
  .store-s2-faqs {
    padding-top: 100px;
    padding-bottom: 100px;
    h2 {
      font: normal normal 600 48px/60px BalooChettan;
      padding-bottom: 50px;
    }
    ul {
      width: 1120px;
      margin: 0 auto;
    }
  }
}
</style>

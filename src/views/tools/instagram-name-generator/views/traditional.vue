<template>
  <div class="traditional">
    <div class="wrapper">
      <div class="contain">
        <h2><span>Traditional Ways</span> to Promote Your Instagram Account</h2>
        <ul>
          <li>
            <img src="../img/pic01.svg" alt="" class="aboutIcon">
            <div>
              <h3>Fill in the Profile</h3>
              <p>The profile on Instagram shows your info, including name, website, interests. A blank profile is taken as a fake account. Users choose to follow you or not according to your profile to a large extent. So the first step to promote your account and be successful on Instagram is to fill in the profile.</p>
            </div>
          </li>
          <li>
            <img src="../img/pic02.svg" alt="" class="aboutIcon">
            <div>
              <h3>Keep Posting</h3>
              <p>Millions of users post content on Instagram. That’s one of the most useful ways to gain new followers. To get more users to follow you, keeping posts is necessary. It gives others a sign that you’re trying to express something useful. You can gain some thoughts from the article <a href="https://www.easygetinsta.com/blog/first-instagram-post-ideas-127">first Instagram post ideas.</a></p>
            </div>
          </li>
          <li>
            <img src="../img/pic03.svg" alt="" class="aboutIcon">
            <div>
              <h3>Publish Attractive & High-Quality Content</h3>
              <p>On Instagram, what you post matters a lot. Logging into Instagram app, you could find that it contains almost all kinds of content in the form of image or video. To promote your Instagram account, publishing attractive and high-quality content is an essential method. You can gain more concentration and followers as well.</p>
            </div>
          </li>
          <li>
            <img src="../img/pic04.svg" alt="" class="aboutIcon">
            <div>
              <h3>Make Use of Hashtags</h3>
              <p>No one would doubt that hashtags are one of the most useful methods to improve visibility on Instagram. To promote your account, you need to make others know your account. How to reach more people? Make use of hashtags. If you have no idea, you could <a href="https://www.easygetinsta.com/blog/copy-paste-instagram-hashtags-25">copy and paste hashtags</a> that are related to your content.</p>
            </div>
          </li>
          <li>
            <img src="../img/pic05.svg" alt="" class="aboutIcon">
            <div>
              <h3>Utilize Instagram Reels</h3>
              <p>As a new feature published in the last year, Instagram Reels is well-received. It invites users to create and view videos, which can be edited with audio, effects, and other creative tools. Besides, it can be share to Feed and Explore. Use these functions and get more <a href="https://www.easygetinsta.com/blog/instagram-reels-views-509">Instagram reels views</a>. You can get more users to pay attention to your account by the way.</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Traditional'

};
</script>

<style lang="scss" scoped>
a {
  text-decoration: underline;
}

.traditional {
  width: 100%;
  color: #303030;

  .contain {
    width: 100%;
    background: #FAF8FF;
    padding: 64px 68px 36px 68px;
    margin-bottom: 66px;

    h2 {
      text-align: center;
      font: 600 20px/24px Montserrat;
      padding-bottom: 54px;

      span {
        font-weight: 600;
        color: #B125CB;
      }
    }

    ul {
      li {
        width: 100%;
        display: flex;
        align-items: center;
        border-top: 1px solid #E5E3E9;
        padding: 26px 0;

        h3 {
          font: 600 20px/24px Montserrat;
          color: #010101;
          margin-bottom: 20px;
        }

        p {
          font: 500 16px/24px Montserrat;
          color: #303030;
        }
      }

      li:nth-child(2n) {
        flex-direction: row-reverse;

        img {
          margin-left: 26px;
        }
      }

      li:nth-child(2n+1) {
        img {
          margin-right: 64px;
        }
      }
    }
  }

}

@media (max-width: 768px) {
  .traditional {
    width: 100%;
    color: #303030;
    background: #FAF8FF;

    .wrapper {
      width: 92%;
      margin: auto;
    }

    .contain {
      width: 100%;
      padding: 48px 0px 40px 0px;
      margin-bottom: 0px;

      h2 {
        text-align: center;
        font: 600 18px/25px Montserrat;
        padding-bottom: 20px;

        span {
          font-weight: 600;
          color: #B125CB;
        }
      }

      ul {
        li {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          border-top: none;
          border-bottom: 1px solid #E5E3E9;
          padding: 26px 0;

          img {
            margin-bottom: 20px;
          }

          h3 {
            font: 600 14px/17px Montserrat;
            color: #010101;
            margin-bottom: 16px;
            text-align: center;
          }

          p {
            font: 500 12px/16px Montserrat;
            color: #303030;
          }
        }

        li:nth-child(2n) {
          flex-direction: column;

          img {
            margin-left: 0px;
          }
        }

        li:last-child {
          border-bottom: none;
        }

        li:nth-child(2n+1) {
          img {
            margin-right: 0px;
          }
        }
      }
    }

  }
}

</style>

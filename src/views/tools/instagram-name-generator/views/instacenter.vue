<template>
  <div class="banner">
    <h1>Advantages of the Free Instagram Username Generator</h1>
    <div class="article">
      <p>
        Instagram username is a kind of identification. How to create a username cool and impressive? The free Instagram
        username generator works. It is designed to help users to create an Instagram username quickly. Except for
        words, you can decide to add other elements to your username, such as period and underscore. If you have no idea
        of an Instagram username, this Instagram Username Generator would generate many random username ideas for you to
        choose. The advantages of the free random Instagram Username Generator are below.
      </p>
      <dl>
        <dt>1. Generate Random Instagram Username</dt>
        <dd>
          How to generate a random Instagram username? You just need to <span v-if="!$store.state.isMobile" class="pctext">Click</span><span v-if="$store.state.isMobile" class="mobiletext">Tap</span> the “Generate” button and random Instagram
          usernames will be generated at once. You can use the tool as many times as you like to generate a list of
          random usernames.
        </dd>
        <dt>2. Plenty of Options to Choose</dt>
        <dd>
          Except for generating random usernames, the Instagram Username Generator gives you other options. It can
          generate Instagram usernames combined with other elements: period, number, underscore, and categories.
        </dd>
        <dt>3. Quick Results</dt>
        <dd>
          How long will it take to generate Instagram usernames after <span v-if="!$store.state.isMobile" class="pctext">clicking</span><span v-if="$store.state.isMobile" class="mobiletext">tapping</span> the generate button? The results will
          show in the next second. The speed is fast and the result is satisfying.
        </dd>
        <dt>4. Instant Availability Check on Instagram</dt>
        <dd>
          You know that every user has a unique Instagram username. After choosing one username you like, you need to
          check its availability on Instagram to make sure that it has not been used. Just <span v-if="!$store.state.isMobile" class="pctext">Click</span><span v-if="$store.state.isMobile" class="mobiletext">Tap</span> the check button and
          you can know the availability instantly.
        </dd>
      </dl>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld'
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.banner {
  padding-top: 122px;
  width: 1100px;
  margin: 0 auto;

  h1 {
    text-align: center;
    font: 600 36px/44px Montserrat;
    color: #572ee6;
    opacity: 1;
  }

  .article {
    margin-top: 68px;

    p {
      font: 500 18px/26px Montserrat;
      letter-spacing: 0px;
      color: #303030;
      opacity: 1;
    }

    dl {
      padding: 44px 0 84px 0;

      dt {
        font: 600 20px/41px Montserrat;
        letter-spacing: 0px;
        color: #000000;
        opacity: 1;
        margin-bottom: 21px;
      }

      dd {
        font: 500 16px/24px Montserrat;
        letter-spacing: 0px;
        color: #303030;
        opacity: 1;
        margin: 0;
        margin-bottom: 40px;

        .pctext {
          font: 500 16px/24px Montserrat;
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .banner {
    padding-top: 55px;
    width: 87%;
    margin: 0 auto;

    h1 {
      text-align: center;
      font: 600 18px/25px Montserrat;
      color: #572ee6;
      opacity: 1;
    }

    .article {
      margin-top: 24px;

      p {
        font: 500 12px/16px Montserrat;
        color: #303030;
        opacity: 1;
      }

      dl {
        padding: 22px 0 58px 0;

        dt {
          font: 600 14px/21px Montserrat;
          color: #000000;
          opacity: 1;
          margin-top: 10px;
        }

        dd {
          font: 500 12px/15px Montserrat;
          color: #303030;
          opacity: 1;
          margin: 0;
          margin-top: 10px;

          .pctext {
            font: 500 12px/15px Montserrat;
          }
        }
      }
    }
  }
}
</style>

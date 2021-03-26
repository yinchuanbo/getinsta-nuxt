<template>
  <div class="insta-cool">
    <div class="insta-weapper">
      <h1>Cool Instagram Username Ideas</h1>
      <p>
        Now young Instagram users tend to have a cool Instagram username. How to
        create cool Instagram usernames that aren't taken? There are 3 cool
        Instagram username ideas.
      </p>
      <div class="special-dt">
        <img src="../img/pic-right.svg" alt="" />
      </div>
      <dl>
        <dt>1. Use Meaningful Words</dt>
        <dd>
          Generally, words are the most important part to consist of an IG
          username. How to create a cool Instagram username? Common words are
          not going to work well. Try some words meaningful and special, such as
          your brand name, your favorite color, your loved sports... They make
          your username look unique and cool. Besides, they also convey useful
          info to users who see your profile and leave a deep impression.
        </dd>
        <dt>2. Add Speical Elements</dt>
        <dd>
          Instagram allows users to create an Instagram username with letters,
          numbers, periods, and underscores. So words are not the only element
          you can use to a username. You can try other elements: numbers,
          periods, and underscores and add them to a username. But remember that
          the Instagram username character is limited to 30 characters, and it
          is not the longer the better.
        </dd>
        <dt class="size-100">3. Utilize Figure of Speech</dt>
        <dd class="size-100">
          Except for the above methods, you need another trick to come up with a
          cool and aesthetic Instagram username, that is making use of figure of
          speech. Take alliteration, a kind of figure of speech, as an example.
          If you love movies and especially like the character Mogo, you could
          adopt MogoMovies as your username.
        </dd>
      </dl>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
.insta-cool {
  position: relative;
  background-position: top center;
  padding: 122px 0 57px 0;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: transparent url("../img/bg.svg") 0% 0% no-repeat padding-box;
    filter: blur(8px);
    z-index: -1;

    background-size: cover;
  }

  .insta-weapper {
    width: 1100px;
    margin: 0 auto;
    position: relative;

    .special-dt {
      position: absolute;
      top: 246px;
      right: 0;
    }
  }

  h1 {
    text-align: center;
    font: normal bold 36px/56px Montserrat;
    letter-spacing: 0px;
    color: #572ee6;
  }

  p {
    margin-top: 68px;
    text-align: left;
    font: normal 18px/26px Montserrat;
    letter-spacing: 0px;
    color: #000000;
  }

  dl {
    margin-top: 50px;

    dt {
      // width: 256px;
      font: normal bold 20px/41px Montserrat;
      color: #000000;

      margin-bottom: 21px;
    }

    dd {
      width: 542px;
      font: normal 16px/24px Montserrat;
      color: #303030;
      margin-bottom: 21px;
    }

    .size-100 {
      width: 100%;
    }
  }
}

@media (max-width: 768px) {
  .insta-cool {
    width: 100%;
    padding: 55px 25px;
    box-sizing: border-box;
    overflow: hidden;

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: transparent url("../img/mobile-bg.svg") 0% 0% no-repeat padding-box;
      filter: blur(8px);
      z-index: -1;
      background-size: cover;
    }

    .insta-weapper {
      width: 100%;

      .special-dt {
        width: 100%;
        margin-top: 15px;
        position: relative;
        top: 0;

        img {
          width: 100%;
        }
      }
    }

    h1 {
      font: normal bold 18px/25px Montserrat;
      width: 325px;
    }

    p {
      margin-top: 24px;
      font: normal 12px/16px Montserrat;
    }

    dl {
      margin-top: 25px;

      dt {
        font: normal normal bold 14px/20px Montserrat;
        margin-bottom: 16px;
      }

      dd {
        width: 100%;
        font: normal 12px/15px Montserrat;
        margin-bottom: 10px;
      }
    }
  }
}
</style>

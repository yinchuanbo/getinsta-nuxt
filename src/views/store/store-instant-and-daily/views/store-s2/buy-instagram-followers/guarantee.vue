<template>
  <div class="store-s2-guarantee">
    <h2>More Guarantee of GetInsta</h2>
    <ul>
      <li>
        <div class="guarantee-img">
          <img src="./img/icon_team.svg" alt="">
        </div>
        <h3>Professional Team</h3>
        <p>We own the most professional team in the industry online to offer you the most professional increase service on Instagram.</p>
      </li>
      <li>
        <div class="guarantee-img">
          <img src="./img/worldwide.svg" alt="">
        </div>
        <h3>Worldwide Users</h3>
        <p>Up to now, there are millions of active users around the world to boost your Instagram followers and popularity on GetInsta.</p>
      </li>
      <li>
        <div class="guarantee-img">
          <img src="./img/icon_support.svg" alt="">
        </div>
        <h3>Excellent After-Sales Service</h3>
        <p>We offer you 7x24 after-sales service. Once you are confronted with any issues, please contact us in time. We will help you at any time.</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.store-s2-guarantee {
  width: 100%;
  height: auto;
  padding: 72px 14px 0 14px;
  box-sizing: border-box;
  overflow: hidden;
  h2 {
    font: normal normal 600 40px/50px BalooChettan;
    color: #000000;
    text-align: center;
    margin-bottom: 58px;
  }
  ul {
    li {
      margin-bottom: 72px;
      .guarantee-img {
        width: 44px;
        min-height: 40px;
        margin: 0 auto;
        margin-bottom: 10px;
        img {
          width: 100%;
          height: 100%;
          display: block;
        }
      }
      h3 {
        font: normal normal 600 18px/21px BalooChettan;
        letter-spacing: 0px;
        color: #000000;
        text-align: center;
        margin-bottom: 10px;
      }
      p {
        text-align: center;
        font: normal normal 500 14px/20px BalooChettan;
        color: #7F8498;
      }
    }
  }
}
@media (min-width: 769px) {
  .store-s2-guarantee {
    > h2 {
      margin-bottom: 85px;
      font: normal normal 600 48px/60px BalooChettan;
    }
    ul {
      display: flex;
      justify-content: center;
      li {
        width: 328px;
        margin-right: 50px;
        .guarantee-img {
          margin: 0;
          margin-bottom: 10px;
        }
        h3 {
           text-align: left;
           font: normal normal 600 20px/30px BalooChettan;
        }
        p {
          text-align: left;
        }
        &:last-child {
          margin-right: 0;
        }
      }
    }
  }
}
</style>

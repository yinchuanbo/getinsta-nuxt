<template>
  <div class="store-likes-step">
    <h2>Steps to Buy Instagram Likes from GetInsta</h2>
    <div class="store-likes-step_content">
      <div>
        <span></span>
        <div class="store-likes-step_content_box-left">
          <h2>Step 1</h2>
          <p>Enter your Instagram username into sercrh box.</p>
        </div>
      </div>
      <div>
        <span></span>
        <div class="store-likes-step_content_box-right">
          <h2>Step 2</h2>
          <p>Select the target post you want to get likes on.</p>
        </div>
      </div>
      <div>
        <span></span>
        <div class="store-likes-step_content_box-left">
          <h2>Step 3</h2>
          <p>
            Select the offer (how many likes you’d like to buy from GetInsta)
          </p>
        </div>
      </div>
      <div style="margin-bottom: 0">
        <span></span>
        <div class="store-likes-step_content_box-right">
          <h2>Step 4</h2>
          <p>Click the “Buy Now” button and complete your purchase.</p>
        </div>
      </div>

      <div class="store-likes-step_center">
        <div class="store-likes-step_center-content">
          <div class="line"></div>
          <!-- <span style="top: 30.4vw"></span>
          <span style="top: 285px"></span>
          <span style="top: 455px"></span>
          <span style="top: 630px"></span> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.store-likes-step {
    padding-bottom: 50px;
  h2 {
    font: normal normal 600 40px/50px BalooChettan;
    color: #000000;
    padding: 0 15px;
    box-sizing: border-box;
    text-align: center;
    margin-bottom: 50px;
  }
  .store-likes-step_content {
    padding-top: 74px;
    position: relative;
    padding-left: 14px;
    padding-right: 14px;
    box-sizing: border-box;
    > div {
      width: 100%;
      height: 36.5vw;
      position: relative;
      overflow: hidden;
      margin-bottom: 16px;
      > span {
          position: absolute;
          width: 14px;
          height: 14px;
          border: 1px solid #707070;
          background: #ffffff;
          border-radius: 100%;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          z-index: 10;
        }
    }
    .store-likes-step_content_box-left {
      width: 42.6vw;
      height: 36.5vw;
      background: #f1f1f1;
      border-radius: 16px 0px 16px 16px;
      // margin-left: 14px;
      margin-bottom: 37px;
      padding-top: 16px;
      h2 {
        text-align: right;
        font: normal normal bold 18px/21px BalooChettan;
        color: #000000;
        margin-bottom: 12px;
        padding-right: 14px;
        letter-spacing: 0px;
      }
      p {
        text-align: right;
        font: normal normal 500 14px/20px BalooChettan;
        color: #7f8498;
        padding-right: 14px;
        letter-spacing: 0px;
      }
    }
    .store-likes-step_content_box-right {
      width: 42.6vw;
      height: 36.5vw;
      background: #f1f1f1;
      border-radius: 0px 16px 16px 16px;
      // margin-right: 14px;
      margin-bottom: 37px;
      position: absolute;
      right: 0;
      padding-top: 16px;
      h2 {
        text-align: left;
        font: normal normal bold 18px/21px BalooChettan;
        color: #000000;
        margin-bottom: 12px;
        padding-left: 14px;
        letter-spacing: 0px;
      }
      p {
        text-align: left;
        font: normal normal 500 14px/20px BalooChettan;
        color: #7f8498;
        padding-left: 14px;
        letter-spacing: 0px;
      }
    }
    padding-bottom: 74px;
    .store-likes-step_center {
      position: absolute;
      height: 100%;
      width: 34px;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      .store-likes-step_center-content {
        position: relative;
        width: 100%;
        height: 100%;
        .line {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 2px;
          height: 85%;
          border: 1px dashed #f1f1f1;
        }
        span {
          position: absolute;
          width: 14px;
          height: 14px;
          border: 1px solid #707070;
          background: #ffffff;
          border-radius: 100%;
          left: 50%;
          transform: translateX(-50%);
        }
        &::before {
          content: "";
          width: 34px;
          height: 34px;
          position: absolute;
          left: 0;
          top: 0;
          background: url("./img/top_icon.svg") no-repeat;
          background-size: cover;
        }
        &::after {
          content: "";
          width: 34px;
          height: 34px;
          position: absolute;
          left: 0;
          bottom: 0;
          background: url("./img/bttom-icon.svg") no-repeat;
          background-size: cover;
        }
      }
    }
  }
}
@media (min-width: 769px) {
  .store-likes-step {
    h2 {
      font: normal normal 600 48px/60px BalooChettan!important;
    }
  }
  .store-likes-step_content {
    overflow: hidden;
    padding-top: 116px!important;
    padding-bottom: 100px!important;
    > div {
      height: 100px!important;
      margin-bottom: 74px!important;
      &:nth-child(4) {
        margin-bottom: 0!important;
      }
    }

    .store-likes-step_center {
      height: 100%!important;
      margin-bottom: 0!important;
    }
    .store-likes-step_content_box-left {
      width: 417px!important;
      height: 100%!important;
      position: relative;
      left: 50%;
      transform: translateX(-50%);
      margin-left: -228.5px;
      h2 {
        font: normal normal bold 18px/21px BalooChettan!important;
      }
    }
    .store-likes-step_content_box-right {
      width: 417px!important;
      height: 100%!important;
      left: calc(50% + 20px);
      h2 {
        font: normal normal bold 18px/21px BalooChettan!important;
      }
    }
  }
}
</style>

<template>
  <div>
    <div class="have-container pc">
      <div class="have-wrapper">
        <h2>Until Now, We Have:</h2>
        <div class="have-line"></div>
        <div class="have-content">
          <img src="./img/pic-have.svg" alt="" />
          <div class="have-content_info">
            <ul>
              <li>
                <h2>505,602,663</h2>
                <p>Likes Delivered</p>
              </li>
              <li>
                <h2>65,203,802</h2>
                <p>Followers Provided</p>
              </li>
              <li>
                <h2>25,368,975</h2>
                <p>Repeat Customer</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="have-container mobile">
        <div class="have-wrapper">
            <h2>Until Now, We Have:</h2>
            <div class="have-line"></div>
            <div class="have-circle">
              <div class="img-center"></div>
              <div class="have-item1">
                <h2>505,602,663</h2>
                <p>Likes Delivered</p>
              </div>
              <div class="have-item2">
                <h2>65,203,802</h2>
                <p>Followers Provided</p>
              </div>
              <div class="have-item3">
                <h2>25,368,975</h2>
                <p>Repeat Customer</p>
              </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.have-container.pc {
  width: 100%;
  height: 613px;
  background: transparent linear-gradient(180deg, #d091ff 0%, #8a86fe 100%) 0%
    0% no-repeat padding-box;
  padding-top: 76px;
  box-sizing: border-box;
  .have-wrapper {
    width: 100%;
    height: 100%;
    background: url("./img/have-bg.svg") no-repeat;
    background-position: left bottom;
    > h2 {
      text-align: center;
      font: normal normal 600 36px/53px BalooChettan;
      color: #ffffff;
      margin-bottom: 33px;
    }
    .have-line {
      width: 116px;
      height: 8px;
      background: #ffffff 0% 0% no-repeat padding-box;
      border-radius: 7px;
      margin: 0 auto;
      margin-bottom: 52px;
    }
    .have-content {
      display: flex;
      justify-content: center;
      img {
        margin-right: 97px;
      }
      ul {
        li {
          h2 {
            font: normal normal 600 40px/50px BalooChettan;
            color: #fff239;
          }
          p {
            font: normal normal 500 24px/41px BalooChettan;
            color: #ffffff;
          }
          margin-bottom: 28px;
          &:last-child {
            margin-bottom: 0;
          }
        }
      }
    }
  }
}
.have-container.mobile {
    width: 100%;
    height: 512px;
    background: transparent linear-gradient(180deg, #E484F0 0%, #8A86FE 100%) 0% 0% no-repeat padding-box;
    .have-wrapper {
        padding-top: 36px;
        box-sizing: border-box;
        >h2 {
            text-align: center;
            font: normal normal 600 18px/25px BalooChettan;
            letter-spacing: 0px;
            color: #FFFFFF;
            margin-bottom: 17px;
        }
        .have-line {
            width: 58px;
            height: 4px;
            background: #FFFFFF;
            border-radius: 7px;
            margin: 0 auto;
            margin-bottom: 30px;
        }
        .have-circle {
            width: 100%;
            height: 100vw;
            background: url('./img/circle.svg') no-repeat; 
            background-size: contain;
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
            .img-center {
               width: 233px;
               height: 136px;
               background: url('./img/auto_two_per.svg') no-repeat; 
               background-size: contain;
               position: relative;
               z-index: 5;
            }
            .have-item1 {
                position: absolute;
                top: 64px;
                left: 0;
                width: 178px;
                height: 68px;
                background: #CB9AFF;
                border-radius: 0 68px 68px 0;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                h2 {
                    font: normal normal 600 25px/20px BalooChettan;
                    letter-spacing: 0px;
                    color: #FFF239;
                    margin-bottom: 3px;
                }
                p {
                    font: normal normal 500 13px/19px BalooChettan;
                    letter-spacing: 0px;
                    color: #FFFFFF;
                }
            }

            .have-item2 {
                position: absolute;
                top: 10px;
                right: 0;
                width: 187px;
                height: 68px;
                background: #E094FF;
                border-radius: 68px 0 0 68px;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                h2 {
                    font: normal normal 600 25px/20px BalooChettan;
                    letter-spacing: 0px;
                    color: #FFF239;
                    margin-bottom: 3px;
                }
                p {
                    font: normal normal 500 13px/19px BalooChettan;
                    letter-spacing: 0px;
                    color: #FFFFFF;
                }
            }

            .have-item3 {
                position: absolute;
                bottom: 25px;
                left: 50%;
                transform: translateX(-50%);
                width: 209px;
                height: 68px;
                background: #C2A8FF;
                border-radius: 68px;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                h2 {
                    font: normal normal 600 25px/20px BalooChettan;
                    letter-spacing: 0px;
                    color: #FFF239;
                    margin-bottom: 3px;
                }
                p {
                    font: normal normal 500 13px/19px BalooChettan;
                    letter-spacing: 0px;
                    color: #FFFFFF;
                }
            }
        }
    }
    
}
</style>

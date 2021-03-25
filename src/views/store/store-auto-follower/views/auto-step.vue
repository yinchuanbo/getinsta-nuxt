<template>
  <div class="auto-step">
    <ul>
      <li v-for="item in stepList" :key="item.id"><img :class="`curre${item.id}`" :src="item.imgurl" alt=""><span>{{ item.text }}</span></li>
    </ul>
  </div>
</template>

<script>
export default {
    name: 'AutoStep',
    data () {
        return {
            stepList: [{ id: 1, text: '100% Real Instagram Followers', imgurl: require('../img/autostep/icon01.svg') },
            { id: 2, text: 'Secure & Private Purchase', imgurl: require('../img/autostep/icon02.svg') },
            { id: 3, text: 'No Password & No Verification', imgurl: require('../img/autostep/icon03.svg') },
            { id: 4, text: 'Deliver Every 24 Hours', imgurl: require('../img/autostep/icon04.svg') },
            { id: 5, text: 'Drop Protection', imgurl: require('../img/autostep/icon05.svg') },
            { id: 6, text: '24/7 Customer Support', imgurl: require('../img/autostep/icon06.svg') }]
        }
    }
}
</script>

<style lang="scss" scoped>
.auto-step {
    display: none;
}
@media (max-width: 768px) {
    .auto-step {
        display: block;
        width: 86%;
        margin: auto;
        // box-shadow: 0px 11px 18px #8c85fd4d;
        border: 3px solid #9e85fa;
        border-radius: 20px;
        margin-top: 40px;
        margin-bottom: 50px;
        ul {
            letter-spacing: 0px;
            color: #000000;
            padding: 30px 20px 30px 25px;
            li {
                height: 50px;
                line-height: 50px;
                font: 14px Montserrat;
                display: flex;
                align-items: center;
                border-bottom: 1px solid #f3ecff;
                justify-content: flex-start;
                span {
                    text-align: left;
                    font-weight: 600;
                }
                .curre1 {
                    width: 44px;
                    height: 22px;
                    margin-right: 10px;
                }
                .curre2 {
                    width: 33px;
                    height: 27px;
                    margin-right: 16px;
                }
                .curre3 {
                    width: 36px;
                    height: 26px;
                    margin-right: 14px;
                }
                .curre4 {
                    width: 34px;
                    height: 31px;
                    margin-right: 14px;
                }
                .curre5 {
                    width: 29px;
                    height: 35px;
                    margin-right: 18px;
                }
                .curre6 {
                    width: 40px;
                    height: 23px;
                    margin-right: 10px;
                }
            }
        }
    }
}
</style>

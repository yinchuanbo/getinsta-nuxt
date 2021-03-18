<template>
  <div class="get-2-why home__sec" :class="{ 'on': animateOn }">
    <div class="wrapper">
      <h2 class="home__sec_h2">{{ $t('get.why.title') }}</h2>
    </div>
    <div class="list-container">
      <div class="unit type-0">
        <h3>{{ $t('get.why.list.data0.title') }}</h3>
        <p>{{ $t('get.why.list.data0.text') }}</p>
      </div>
      <div class="unit type-1">
        <h3>{{ $t('get.why.list.data1.title') }}</h3>
        <p>
          {{ $t('get.why.list.data1.text0') }}
          <router-link to="/blog/best-app-to-get-instagram-likes-18">{{ $t('get.why.list.data1.text1') }}</router-link>
          {{ $t('get.why.list.data1.text2') }}
        </p>
      </div>
      <div class="unit type-2">
        <h3>{{ $t('get.why.list.data2.title') }}</h3>
        <p>{{ $t('get.why.list.data2.text') }}</p>
      </div>

      <div class="unit type-0">
        <h3>{{ $t('get.why.list.data3.title') }}</h3>
        <p>{{ $t('get.why.list.data3.text') }}</p>
      </div>
      <div class="unit type-1">
        <h3>{{ $t('get.why.list.data4.title') }}</h3>
        <p>
          {{ $t('get.why.list.data4.text0') }}
          <router-link to="/blog/instagram-followers-instantly-free-10">{{ $t('get.why.list.data4.text1') }}</router-link>
          {{ $t('get.why.list.data4.text2') }}
        </p>
      </div>
      <div class="unit type-2">
        <h3>{{ $t('get.why.list.data5.title') }}</h3>
        <p>{{ $t('get.why.list.data5.text') }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Get2Why',
  components: {},
  data() {
    return {
      animateOn: false
    };
  },
  mounted() {
    setTimeout(() => {
      this.animateOn = true;
    }, 100);
  }
};
</script>

<style lang="scss" scoped>
.get-2-why {
  padding-top: 100px;
  padding-bottom: 0;
  background-color: #F8F9FC;

  .list-container {
    margin: 10px auto 0;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    max-width: 1694px;

    .unit {
      position: relative;
      margin-top: 86px;
      padding: 48px 50px 0;
      display: inline-block;
      width: 510px;
      height: 300px;
      background: #FFFFFF;
      box-shadow: 0 5px 20px #00000008;
      border-radius: 12px;
      vertical-align: top;

      h3 {
        font: 600 20px/24px Montserrat;
        color: #2128BD;
      }

      p {
        margin-top: 20px;
        font: 400 16px/24px Montserrat;
        color: #2A2A2A;
      }

      &:after {
        position: absolute;
        top: -10px;
        left: 50px;
        display: block;
        width: 112px;
        height: 10px;
        content: "";
      }

      &.type-0 {
        &:after {
          background-color: #FF9913;
        }
      }

      &.type-1 {
        &:after {
          background-color: #005FFF;
        }
      }

      &.type-2 {
        &:after {
          background-color: #13CFFF;
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .get-2-why {
    .list-container {
      padding: 0 4vw;
      width: 100%;
      max-width: 100%;

      .unit {
        margin-top: 43px;
        padding: 6.4vw;
        width: 100%;
        height: auto;
        box-shadow: 0 2px 10px #00000008;
        border-radius: 12px;

        h3 {
          font: 600 18px Montserrat;
        }

        p {
          margin-top: 10px;
          font: 400 13px/18px Montserrat;
        }

        &:after {
          top: -5px;
          left: 25px;
          width: (112px/2);
          height: 5px;
        }
      }
    }
  }
}
</style>

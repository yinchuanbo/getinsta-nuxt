<template>
  <div class="tips-mk-0-single-column">
    <div class="wrapper" :style="{ width: `${wrapperWidthPc}px` }">
      <h2>{{ title }}</h2>
      <div class="tips">
        <ul>
          <li v-for="(unit, i) in tipList" :key="i">
            <nuxt-link :to="unit.link">{{ unit.text }}</nuxt-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TipsMk0SingleColumn',
  components: {},
  props: {
    wrapperWidthPc: {
      type: Number,
      required: false,
      default: 1210
    },
    title: {
      type: String,
      required: false,
      default: 'Title'
    },
    tipList: {
      type: Array,
      required: false,
      default() {
        return [
          {
            text: 'You need Tips!',
            link: '/'
          }
        ];
      }
    }
  },
  data() {
    return {};
  },

  mounted() {
  },
  methods: {}
};
</script>

<style scoped lang="scss">
.tips-mk-0-single-column {
  padding: 60px 0 40px;

  h2 {
    font: 600 28px Montserrat;
    color: #2A2A2A;
    text-align: center;
  }

  .tips {
    ul {
      width: 100%;
      margin-top: 20px;
      font-size: 0;

      li {
        margin-top: 40px;
        display: inline-block;
        width: 100%;
        vertical-align: top;

        &:nth-child(odd) {
          padding-right: 20px;
        }

        a {
          position: relative;
          padding-left: 28px;
          font: 500 18px Montserrat;
          color: #2A2A2A;
          transition: all 0.3s;

          &:before {
            position: absolute;
            top: 3px;
            left: 0;
            content: "";
            display: inline-block;
            width: 15px;
            height: 15px;
            background: url("~@/assets/images/global/icon-point-blue.svg") center/contain no-repeat;
          }

          &:hover {
            color: #005FFF;
          }
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .tips-mk-0-single-column {
    padding: 40px 0 24px;

    .wrapper {
      width: 100% !important;
    }

    h2 {
      padding: 0 4vw;
      font: 600 16px Montserrat;
      color: #2A2A2A;
      text-align: center;
    }

    .tips {
      ul {
        margin-top: 28px;

        li {
          margin-top: 17px;
          padding: 0 6vw;
          width: 100%;

          &:first-child {
            margin-top: 0;
          }

          &:nth-child(odd) {
            padding-right: 8vw;
          }

          a {
            padding-left: 28px;
            font: 500 12px Montserrat;

            &:before {
              width: 10px;
              height: 10px;
            }
          }
        }
      }
    }
  }
}
</style>

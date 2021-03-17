<template>
  <div class="header-module-mk-0">
    <h1>GetInsta</h1>
  </div>
</template>


<script>
export default {
  name: 'HeaderModuleMk0',
  components: {},
  props: {},
  data() {
    return {};
  },
  mounted() {
  },
  methods: {}
};
</script>


<style lang="scss" scoped>
.header-module-mk-0 {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 46px;
  background: rgba(255, 255, 255, 0.13);
  text-align: center;
  vertical-align: middle;

  h1 {
    font: 800 italic 20px Montserrat;
    color: #FFFFFF;
  }
}

@media (max-width: 768px) {
  .header-module-mk-0 {
    h1 {

    }
  }
}
</style>

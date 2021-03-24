<template>
  <div></div>
</template>

<script>
export default {
  name: 'RegisterS',
  components: {},
  mounted() {
    const key = this.$route.params.key;
    this.$storage.set('registerKey', key);
    this.$router.push({ path: '/register' });
  },
  methods: {}
};
</script>

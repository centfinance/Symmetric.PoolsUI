<template>
  <Page :loading="loading">
    <!-- <PoolBoxes :pool="pool" :bPool="bPool" /> -->
    <InfoChart :pools="pools" />
  </Page>
</template>

<script>
// import { mapActions, mapGetters } from 'vuex';

export default {
  data() {
    return {
      pools: [],
      loading: false
    };
  },
  methods: {
    // ...mapGetters([]),
    getPools() {
      this.pools = this.$store.state.pools;
    }
  },
  mounted() {
    this.getPools();
  }
};
</script>
<style scoped>
.mivafarm button {
  background-image: linear-gradient(270deg, #443ad2, #8349d1);
  border: none;
}
.mivafarm button:hover {
  background: #8349d1;
}
</style>

<template>
  <div class="overflow-hidden ml-n2 mr-n2 text-center">
    <div class="col-12 col-md-4 float-left mb-4">
      <div
        class="border rounded-0 rounded-md-1 panel-background py-4 mx-0 mx-md-2"
      >
        <h3 v-text="_num(getTvl, 'usd')" />
        <p v-text="$t('liquidity')" class="mb-0" />
      </div>
    </div>
    <div class="col-12 col-md-4 float-left mb-4">
      <div
        class="border rounded-0 rounded-md-1 panel-background py-4 mx-0 mx-md-2"
      >
        <h3 v-text="_num(getVolume, 'usd')" />
        <p v-text="$t('volume24')" class="mb-0" />
      </div>
    </div>
    <div class="col-12 col-md-4 float-left mb-4">
      <div
        class="border rounded-0 rounded-md-1 panel-background py-4 mx-0 mx-md-2"
      >
        <h3 v-text="_num(getSwapFee, 'usd')" />
        <p v-text="$t('swapFee')" class="mb-0" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['getNetworkLiquidity', 'getPoolsTotals']),
    getTvl() {
      return this.getPoolsTotals.poolLiquidity;
    },
    getSwapFee() {
      return this.getPoolsTotals.poolTotalSwapFee;
    },
    getVolume() {
      return this.getPoolsTotals.poolTotalSwapVolume;
    }
  }
};
</script>
<style scoped lang="scss">
.panel-background {
  height: 140px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>

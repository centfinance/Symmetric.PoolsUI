<template>
  <div class="overflow-hidden ml-n2 mr-n2 text-center">
    <div class="col-12 col-md-3 float-left mb-4">
      <div
        class="border rounded-0 rounded-md-1 panel-background py-4 mx-0 mx-md-2"
      >
        <h3 v-text="_num(pool.liquidity, 'usd')" />
        <p v-text="$t('liquidity')" class="mb-0" />
      </div>
    </div>
    <div class="col-12 col-md-3 float-left mb-4">
      <div
        class="border rounded-0 rounded-md-1 panel-background py-4 mx-0 mx-md-2"
      >
        <h3 v-text="_num(pool.lastSwapVolume, 'usd')" />
        <p v-text="$t('volume24')" class="mb-0" />
      </div>
    </div>
    <div class="col-12 col-md-3 float-left mb-4">
      <div
        class="border rounded-0 rounded-md-1 panel-background py-4 mx-0 mx-md-2"
      >
        <h3 v-text="_num(pool.swapFee, 'percent')" />
        <p v-text="$t('swapFee')" class="mb-0" />
      </div>
    </div>
    <div class="col-12 col-md-3 float-left mb-4">
      <div
        class="border rounded-0 rounded-md-1 panel-background py-4 mx-0 mx-md-2"
      >
        <h3 v-text="_num(pool.apy, 'percent')" />
        <span
          :class="'tooltipped tooltipped-n mb-0'"
          :aria-label="$t('apyTip')"
        >
          {{ $t('apy') }}
          <Icon name="info" size="16" :style="`color: #red`" />
        </span>
      </div>
    </div>
    <div class="col-12 col-md-3 float-left mb-4">
      <div
        class="border rounded-0 rounded-md-1 panel-background py-4 mx-0 mx-md-2"
      >
        <h3>
          <div class="d-flex">
            <UiNum
              :value="pool.tokenReward"
              format="long"
              class="column-md hide-sm hide-md"
            />
            <div class="column-s hide-sm hide-md">SYMM</div>
          </div>
          <div class="d-flex" v-if="pool.tokenRewardCelo">
            <UiNum
              :value="pool.tokenRewardCelo"
              format="long"
              class="column-md hide-sm hide-md"
            />
            <div class="column-s hide-sm hide-md">CELO</div>
          </div>
          <div class="d-flex" v-if="pool.tokenRewardPoof">
            <UiNum
              :value="pool.tokenRewardPoof"
              format="long"
              class="column-md hide-sm hide-md"
            />
            <div class="column-s hide-sm hide-md">POOF</div>
          </div>
          <div class="d-flex" v-if="pool.tokenRewardMoo">
            <UiNum
              :value="pool.tokenRewardMoo"
              format="long"
              class="column-md hide-sm hide-md"
            />
            <div class="column-s hide-sm hide-md">MOO</div>
          </div>
          <div class="d-flex" v-if="pool.tokenRewardAri">
            <UiNum
              :value="pool.tokenRewardAri"
              format="long"
              class="column-md hide-sm hide-md"
            />
            <div class="column-s hide-sm hide-md">ARI</div>
          </div>
          <div class="d-flex" v-if="pool.tokenRewardGno">
            <UiNum
              :value="pool.tokenRewardGno"
              format="long"
              class="column-md hide-sm hide-md"
            />
            <div class="column-s hide-sm hide-md">GNO</div>
          </div>
        </h3>
        <p v-text="$t('symmReward')" class="mb-0" />
      </div>
    </div>
    <div class="col-12 col-md-3 float-left mb-4">
      <div
        class="border rounded-0 rounded-md-1 panel-background py-4 mx-0 mx-md-2"
      >
        <h3 v-text="_num(poolSharePercent, 'percent')" />
        <p v-text="$t('myPoolShare')" class="mb-0" />
      </div>
    </div>
  </div>
</template>

<script>
import { getAddress } from '@ethersproject/address';
import { normalizeBalance } from '@/helpers/utils';

export default {
  props: ['pool', 'bPool'],
  computed: {
    poolTokenBalance() {
      const bptAddress = this.bPool.getBptAddress();
      const balance = this.web3.balances[getAddress(bptAddress)];
      return normalizeBalance(balance || '0', 18);
    },
    totalShares() {
      return parseFloat(this.bPool.metadata.totalShares);
    },
    poolSharePercent() {
      if (
        (!this.pool.finalized && !this.bPool.isCrp()) ||
        !this.poolTokenBalance
      )
        return 0;
      return (1 / this.totalShares) * this.poolTokenBalance;
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

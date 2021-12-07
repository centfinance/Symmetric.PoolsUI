<template>
  <UiTableTr :to="{ name: 'pool', params: { id: pool.id } }">
    <!-- <div class="column-sm text-left hide-sm hide-md hide-lg">
      {{ _shortenAddress(pool.id) }}
    </div>
    <div>
      <Pie :tokens="pool.tokens" class="mx-3" size="34" />
    </div> -->
    <div class="flex-auto text-left">
      <div class="d-flex flex-wrap">
        <div
          v-for="token in pool.tokens"
          :key="token.address"
          :class="token.symbol.length > 14 && 'tooltipped tooltipped-n'"
          :aria-label="token.symbol"
          class="d-flex flex-items-center mr-2"
          style="width: 120px"
        >
          <Icon name="bullet" size="16" :style="`color: ${token.color}`" />
          {{ _num(token.weightPercent / 100, 'percent-short') }}
          {{ _shorten(token.symbol, 14) }}
        </div>
      </div>
    </div>
    <div v-text="_num(poolLiquidity, 'usd-long')" class="column" />
    <!-- <UiNum
      :value="pool.swapFee"
      format="percent"
      class="column hide-sm hide-md"
    /> -->
    <UiNum :value="pool.apy" format="percent" class="column hide-sm hide-md" />
    <div>
      <div class="d-flex">
        <UiNum
          :value="pool.rewardApy"
          format="percent"
          class="column hide-sm hide-md hide-mm"
        />
        <div class="column-xxs hide-sm hide-md hide-mm">SYMM</div>
      </div>
      <div class="d-flex" v-if="pool.rewardApyCelo">
        <UiNum
          :value="pool.rewardApyCelo"
          format="percent"
          class="column hide-sm hide-md hide-mm"
        />
        <div class="column-xxs hide-sm hide-md hide-mm">CELO</div>
      </div>
      <div class="d-flex" v-if="pool.rewardApyKnx">
        <UiNum
          :value="pool.rewardApyKnx"
          format="percent"
          class="column hide-sm hide-md hide-mm"
        />
        <div class="column-xxs hide-sm hide-md hide-mm">KNX</div>
      </div>
      <div class="d-flex" v-if="pool.rewardApyStake">
        <UiNum
          :value="pool.rewardApyStake"
          format="percent"
          class="column hide-sm hide-md hide-mm"
        />
        <div class="column-xxs hide-sm hide-md hide-mm">STAKE</div>
      </div>
    </div>
    <!-- <div>
      <div class="d-flex">
        <UiNum
          :value="pool.tokenReward"
          format="long"
          class="column-md hide-sm hide-md hide-mm"
        />
        <div class="column-xxs hide-sm hide-md hide-mm">SYMM</div>
      </div>
      <div class="d-flex" v-if="pool.tokenRewardCelo">
        <UiNum
          :value="pool.tokenRewardCelo"
          format="long"
          class="column-md hide-sm hide-md hide-mm"
        />
        <div class="column-xxs hide-sm hide-md hide-mm">CELO</div>
      </div>
      <div class="d-flex" v-if="pool.tokenRewardKnx">
        <UiNum
          :value="pool.tokenRewardKnx"
          format="long"
          class="column-md hide-sm hide-md hide-mm"
        />
        <div class="column-xxs hide-sm hide-md hide-mm">KNX</div>
      </div>
      <div class="d-flex" v-if="pool.tokenRewardStake">
        <UiNum
          :value="pool.tokenRewardStake"
          format="long"
          class="column-md hide-sm hide-md hide-mm"
        />
        <div class="column-xxs hide-sm hide-md hide-mm">STAKE</div>
      </div>
    </div> -->
    <div
      v-text="_num(myLiquidity, 'usd-long')"
      format="currency"
      class="column hide-sm hide-md hide-lg hide-sl hide-ml"
    />
    <div
      v-text="_num(pool.lastSwapVolume, 'usd-long')"
      format="currency"
      class="column hide-sm hide-md hide-lg hide-sl hide-ml"
    />
  </UiTableTr>
</template>

<script>
import { getPoolLiquidity } from '@/helpers/price';

export default {
  props: ['pool'],
  computed: {
    poolLiquidity() {
      return getPoolLiquidity(this.pool, this.price.values);
    },
    myLiquidity() {
      const poolShares = this.subgraph.poolShares[this.pool.id];
      if (!this.pool.finalized || !poolShares) return 0;
      return (this.poolLiquidity / this.pool.totalShares) * poolShares;
    }
  }
};
</script>

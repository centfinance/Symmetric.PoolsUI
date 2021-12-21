<template>
  <UiTableTr :to="{ name: 'pool', params: { id: pool.id } }">
    <div class="flex-auto text-left table-column-assets">
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
          {{ filterTokenSymbol(token.symbol, token.address) }}
        </div>
      </div>
    </div>
    <div v-text="_num(pool.liquidity, 'usd-long')" class="table-column" />
    <UiNum :value="pool.apy" format="percent" class="table-column hide-sm" />
    <div class="table-column hide-sm hide-md">
      <div class="d-flex">
        <UiNum :value="pool.rewardApy" format="percent" class="w-60" />
        <div class="w-40 ml-1 text-right">SYMM</div>
      </div>
      <div class="d-flex" v-if="pool.rewardApyCelo">
        <UiNum :value="pool.rewardApyCelo" format="percent" class="w-60" />
        <div class="w-40 ml-1 text-right">CELO</div>
      </div>
      <div class="d-flex" v-if="pool.rewardApyPoof">
        <UiNum :value="pool.rewardApyPoof" format="percent" class="w-60" />
        <div class="w-40 ml-1 text-right">POOF</div>
      </div>
      <div class="d-flex" v-if="pool.rewardApyGno">
        <UiNum :value="pool.rewardApyGno" format="percent" class="w-60" />
        <div class="w-40 ml-1 text-right">GNO</div>
      </div>
    </div>
    <div
      v-text="_num(myLiquidity, 'usd-long')"
      format="currency"
      class="table-column hide-sm hide-md hide-lg"
    />
    <div class="table-column hide-sm hide-md hide-lg">
      <div class="d-flex">
        <UiNum :value="myDailyRewards" format="long" class="w-60" />
        <div class="w-40 ml-1 text-right">SYMM</div>
      </div>
      <div class="d-flex" v-if="pool.tokenRewardCelo">
        <UiNum
          :value="getSpecificMyDailyRewards(pool.tokenRewardCelo)"
          format="long"
          class="w-60"
        />
        <div class="w-40 ml-1 text-right">CELO</div>
      </div>
      <div class="d-flex" v-if="pool.tokenRewardPoof">
        <UiNum
          :value="getSpecificMyDailyRewards(pool.tokenRewardPoof)"
          format="long"
          class="w-60"
        />
        <div class="w-40 ml-1 text-right">POOF</div>
      </div>
      <div class="d-flex" v-if="pool.tokenRewardGno">
        <UiNum
          :value="getSpecificMyDailyRewards(pool.tokenRewardGno)"
          format="long"
          class="w-60"
        />
        <div class="w-40 ml-1 text-right">GNO</div>
      </div>
    </div>
    <div
      v-text="_num(pool.lastSwapVolume, 'usd-long')"
      format="currency"
      class="table-column hide-sm"
    />
  </UiTableTr>
</template>

<script>
// import { getPoolLiquidity } from '@/helpers/price';
import { SYMM_TOKENS } from '@/helpers/tokens';

export default {
  props: ['pool'],
  computed: {
    // poolLiquidity() {
    //   return getPoolLiquidity(this.pool, this.price.values);
    // },
    myLiquidity() {
      const poolShares = this.subgraph.poolShares[this.pool.id];
      if (!this.pool.finalized || !poolShares) return 0;
      return (this.pool.liquidity / this.pool.totalShares) * poolShares;
    },
    myDailyRewards() {
      return (this.pool.tokenReward * this.myLiquidity) / this.pool.liquidity;
    }
  },
  methods: {
    filterTokenSymbol(symbol, address) {
      if (address === SYMM_TOKENS.v1) {
        return 'SYMMv1';
      } else {
        return this._shorten(symbol, 14);
      }
    },
    getSpecificMyDailyRewards(tokenReward) {
      return (tokenReward * this.myLiquidity) / this.pool.liquidity;
    }
  }
};
</script>

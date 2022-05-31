<template>
  <UiTableTr :to="{ name: 'pool', params: { id: pool.id } }">
    <div class="text-left table-column-number">
      {{ number + 1 }}
    </div>
    <div class="text-left table-column-assets">
      <div class="d-flex flex-wrap">
        <div
          v-for="token in pool.tokens"
          :key="token.address"
          :class="token.symbol.length > 14 && 'tooltipped tooltipped-n'"
          :aria-label="token.symbol"
          class="d-flex flex-items-center mr-2 asset"
        >
          {{ filterTokenSymbol(token.symbol, token.address) }}
          <div class="divider">&nbsp;/</div>
        </div>
      </div>
    </div>
    <div class="column-xl text-left">
      <a
        :href="`${_etherscanLink(pool.id, 'address')}`"
        target="_blank"
        class="text-white"
      >
        {{ _shortenAddress(pool.id) }}
      </a>
    </div>
    <div
      v-text="_num(pool.lastSwapVolume, 'usd-long')"
      format="currency"
      class="column-xl text-left hide-sm"
    />
    <div
      v-text="_num(pool.liquidity, 'usd-long')"
      class="column-xl text-right hide-sm hide-md flex-auto"
    />
  </UiTableTr>
</template>

<script>
import { SYMM_TOKENS } from '@/helpers/tokens';

export default {
  props: ['pool', 'number'],
  methods: {
    filterTokenSymbol(symbol, address) {
      if (address === SYMM_TOKENS.v1) {
        return 'SYMMv1';
      } else {
        return this._shorten(symbol, 14);
      }
    }
  }
};
</script>
<style scoped>
.table-column-assets .asset:last-child .divider {
  display: none;
}
</style>

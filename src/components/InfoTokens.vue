<template>
  <UiTable class="info-tokens">
    <UiTableTh>
      <div class="table-column-number text-left">#</div>
      <div class="table-column-assets text-left">Name</div>
      <div class="column-xl text-left">Address</div>
      <div class="column-xl hide-sm hide-md hide-lg text-right flex-auto">
        Price
      </div>
      <!-- <div class="column-xl text-right hide-sm hide-md flex-auto">TVL</div> -->
    </UiTableTh>
    <div class="overflow-hidden">
      <div v-if="tokens && tokens.length > 0">
        <UiTableTr v-for="(token, i) in tokens" :key="i" :token="token">
          <div class="text-left table-column-number">
            {{ i + 1 }}
          </div>
          <div class="text-left table-column-assets">
            {{ token.name }} ({{ token.symbol }})
          </div>
          <div class="column-xl text-left">
            <a
              :href="`${_etherscanLink(token.id, 'address')}`"
              target="_blank"
              class="text-white"
            >
              {{ _shortenAddress(token.id) }}
              <Icon name="external-link" size="16" class="ml-1" />
            </a>
          </div>
          <div
            class="column-xl hide-sm hide-md hide-lg text-right flex-auto"
          >
            {{ _num(token.price, 'usd-long') }}
          </div>
          <!-- <div class="column-xl text-right hide-sm hide-md flex-auto">
            {{ _num(token.liquidity, 'usd-long') }}
          </div> -->
        </UiTableTr>
      </div>
      <ListLoading
        v-if="loading"
        :classes="[
          'table-column-number text-left',
          'table-column-assets text-left',
          'column-xl text-left',
          'column-xl hide-sm hide-md hide-lg text-right flex-auto'
          // 'column-xl text-right hide-sm hide-md flex-auto'
        ]"
      />
    </div>
    <div
      v-if="tokens && tokens.length === 0 && !loading"
      class="border-top d-flex flex-items-center p-4 text-white"
      v-text="$t('emptyState')"
    />
  </UiTable>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      loading: false,
      tokens: [],
      pools: []
    };
  },
  methods: {
    ...mapActions(['getTokens', 'getPools']),
    getTvlFromSymbol(symbol) {
      if (this.pools.length) {
        const filtered = this.pools.filter(p => {
          const tokenFiltered = p.tokens.filter(t => t.symbol === symbol);
          // p.tokens[0].symbol === symbol || p.tokens[1].symbol === symbol;
          if (tokenFiltered.length) return true;
          else return false;
        });
        let tvl = 0;
        if (filtered.length) {
          filtered.forEach(e => {
            tvl += Number(e.liquidity);
          });
        }
        return tvl;
      }
      return 0;
    }
  },
  // computed: {
  //   tokens() {
  //     return this.$store.state.subgraph.tokens;
  //   }
  // },
  async mounted() {
    if (!this.tokens || !this.tokens.length) {
      this.loading = true;
      const query = { first: 100 };
      this.pools = await this.getPools(query);
      await this.getTokens();
      this.tokens = this.$store.state.subgraph.tokens;
      this.tokens = this.tokens.map(token => {
        return { ...token, liquidity: this.getTvlFromSymbol(token.symbol) };
      });
      this.tokens.sort((a, b) => b.liquidity - a.liquidity);
      this.loading = false;
    }
  }
};
</script>
<style scoped lang="scss">
.info-tokens {
  height: 610px;
  overflow: scroll;
}
</style>

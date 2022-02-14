<template>
  <UiTable class="anim-fade-in table-view">
    <UiTableTh>
      <div class="table-column-number text-left">#</div>
      <div class="table-column-assets text-left">
        {{ $t('pool') }}
      </div>
      <div class="column-xl text-left">Address</div>
      <div
        class="column-xl text-left hide-sm table-sort"
        @click="handleSort('lastSwapVolume')"
      >
        {{ $t('volume24') }}
        <img
          v-if="sortDirection === 'DESC' && sortField === 'lastSwapVolume'"
          src="@/assets/arrow-up.svg"
          alt="up"
        />
        <img
          v-if="sortDirection === 'ASC' && sortField === 'lastSwapVolume'"
          src="@/assets/arrow-down.svg"
          alt="down"
        />
      </div>
      <div
        class="column-xl text-right flex-auto table-sort"
        @click="handleSort('liquidity')"
      >
        {{ $t('marketCap') }}
        <img
          v-if="sortDirection === 'DESC' && sortField === 'liquidity'"
          src="@/assets/arrow-up.svg"
          alt="up"
        />
        <img
          v-if="sortDirection === 'ASC' && sortField === 'liquidity'"
          src="@/assets/arrow-down.svg"
          alt="down"
        />
      </div>
    </UiTableTh>
    <div v-infinite-scroll="loadMore" infinite-scroll-distance="10">
      <div v-if="pools.length > 0">
        <InfoPool
          v-for="(pool, i) in pools"
          :key="i"
          :pool="pool"
          :number="i"
        />
      </div>
      <UiTableTr v-else-if="!loading">
        <div v-text="$t('emptyState')" />
      </UiTableTr>
      <ListLoading
        v-if="loading"
        :classes="[
          'table-column-number text-left',
          'table-column-assets text-left',
          'column-xl text-left',
          'column-xl text-left',
          'column-xl text-right flex-auto'
        ]"
        :height="29"
      />
    </div>
  </UiTable>
</template>

<script>
import { mapActions } from 'vuex';
import { formatFilters, ITEMS_PER_PAGE } from '@/helpers/utils';
import { SYMM_TOKENS } from '@/helpers/tokens';
import config from '@/config';
import { crPoolIds, APR_FORMULA } from '@/helpers/constants';
import BigNumber from '@/helpers/bignumber';

export default {
  props: ['query', 'title'],
  computed: {},
  data() {
    return {
      loading: false,
      cols: 2,
      page: 0,
      pools: [],
      filters: formatFilters(this.$route.query),
      symmPoolsLoading: false,
      currentTotalPoolValues: {},
      totalPoolValues: {},
      sortDirection: 'DESC',
      sortField: '',
      APR_FORMULA
    };
  },
  mounted() {
    this.getTotalValues();
  },
  watch: {
    query() {
      this.page = 0;
      this.loading = true;
      this.loadMore();
    },
    filters() {
      if (!this.withFilters) return;
      this.page = 0;
      this.loading = true;
      this.pools = [];
      let query = formatFilters(this.filters);
      if (query.token && query.token.length === 0) query = {};
      query.filter = 1;
      this.$router.push({ query });
      this.loadMore();
    }
  },
  methods: {
    handleSort(sortKey) {
      this.sortField = sortKey;
      const sortReturns = {
        ASC: [1, -1],
        DESC: [-1, 1],
        NONE: [0, 0]
      };
      if (this.pools.length > 0) {
        if (sortKey === 'myLiquidity') {
          this.pools.sort((a, b) =>
            this.myLiquidity(a) > this.myLiquidity(b)
              ? sortReturns[this.sortDirection][0]
              : this.myLiquidity(b) > this.myLiquidity(a)
              ? sortReturns[this.sortDirection][1]
              : 0
          );
        } else if (sortKey === 'myDailyRewards') {
          this.pools.sort((a, b) =>
            this.myDailyRewards(a) > this.myDailyRewards(b)
              ? sortReturns[this.sortDirection][0]
              : this.myDailyRewards(b) > this.myDailyRewards(a)
              ? sortReturns[this.sortDirection][1]
              : 0
          );
        } else {
          this.pools.sort((a, b) =>
            Number(a[sortKey]) > Number(b[sortKey])
              ? sortReturns[this.sortDirection][0]
              : Number(b[sortKey]) > Number(a[sortKey])
              ? sortReturns[this.sortDirection][1]
              : 0
          );
        }
      }
      if (this.sortDirection === 'ASC') {
        this.sortDirection = 'DESC';
      } else if (this.sortDirection === 'DESC') {
        this.sortDirection = 'ASC';
      } else {
        this.sortDirection = 'NONE';
      }
    },
    myLiquidity(pool) {
      const poolShares = this.subgraph.poolShares[pool.id];
      if (!pool.finalized || !poolShares) return 0;
      return (pool.liquidity / pool.totalShares) * poolShares;
    },
    myDailyRewards(pool) {
      return (pool.tokenReward * this.myLiquidity(pool)) / pool.liquidity;
    },
    filterTokenSymbol(symbol, address) {
      if (address === SYMM_TOKENS.v1) {
        return 'SYMMv1';
      } else {
        return this._shorten(symbol, 4);
      }
    },
    getSpecificMyDailyRewards(tokenReward, pool) {
      return (tokenReward * this.myLiquidity(pool)) / pool.liquidity;
    },
    ...mapActions([
      'getPools',
      'getNetworkLiquidity',
      'getSpecificPools',
      'getTokens',
      'getSYMMprice'
    ]),
    async loadMore() {
      if (this.pools.length < this.page * ITEMS_PER_PAGE) return;
      this.loading = true;
      this.page++;
      const page = this.page;

      let query = this.query || {};
      query = { ...query, page };
      await this.getNetworkLiquidity();
      await this.getTokens();
      await this.getSYMMprice();
      if (config.network == 'celo') {
        await this.getSpecificPools({ query: this.query, id_in: crPoolIds });
      }
      const pools = await this.getPools(query);
      if (pools && pools.length > 0) {
        this.pools = this.pools.concat(pools);
      }

      this.currentTotalPoolValues = this.calculateTotalValues(this.pools);

      this.loading = false;
    },

    async getTotalValues() {
      await this.getNetworkLiquidity();

      const query = { first: 100 };
      const pools = await this.getPools(query);
      this.totalPoolValues = this.calculateTotalValues(pools);
    },

    calculateTotalValues(pools) {
      const totalValues = {
        totalLiquidity: 0,
        totalDailyRewards: new BigNumber(0),
        totalVolume: 0,
        totalMyLiquidity: 0
      };

      pools.forEach(pool => {
        totalValues.totalLiquidity += parseFloat(pool.liquidity);
        totalValues.totalDailyRewards = totalValues.totalDailyRewards.plus(
          this.getSpecificMyDailyRewards(pool.tokenReward, pool)
        );
        totalValues.totalVolume += pool.lastSwapVolume;
        totalValues.totalMyLiquidity += this.myLiquidity(pool);
        return pool;
      });
      return totalValues;
    }
  }
};
</script>
<style scoped lang="scss">
.reward-message {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.table-view {
  height: 580px;
  overflow: scroll;
  .table-sort {
    &:hover {
      cursor: pointer;
    }
  }
}
.cards {
  margin: 0 auto;
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(370px, 1fr));

  .card {
    background-color: var(--card-background-color);
    padding: 0px;
    margin: 0px;
    border-radius: 8px;

    .highlight-card {
      height: 100%;
      border: solid 1px var(--card-border-color);

      &:hover {
        background-color: var(--card-hover-background);
      }
    }
  }
}
.margin-top10 {
  margin-top: 2px;
}
.margin-top20 {
  margin-top: 6px;
}
.myForm {
  display: grid;
  grid-template-areas:
    'comments contact'
    '... button'
    '... farm';
  grid-template-rows: 10.5em 3em;
  grid-template-columns: 10.5em 1fr;
  grid-gap: 0.2em;
  background: linear-gradient(
    178deg,
    rgb(56 74 255 / 4%) 23.98%,
    var(--card-gradient) 100%
  );
  padding: 1em;
  height: 100%;

  .text-white-normal {
    color: var(--text-primary-color);
    font-weight: 480;
    font-size: 12px;
  }
}
.myForm .mivafarm {
  grid-area: farm;
}
.myForm .mivafarm button {
  background-image: linear-gradient(270deg, #443ad2, #8349d1);
  margin-top: 4px;
  width: 100%;
}
.myForm .mivafarm button:hover {
  background: #8349d1;
}
.myForm label {
  grid-area: labels;
}
.myForm input {
  grid-area: contact;
  width: 100%;
  padding: 1.1em;
  border: none;
  margin-bottom: 1em;
}
.myForm textarea {
  min-height: calc(100% - 2em);
  width: 100%;
  border: none;
}
#contact-details {
  grid-area: contact;
}
.border {
  border: 1px solid #566b79 !important;
}
#comment-box {
  grid-area: comments;
  width: 100%;
}
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  float: left;

  li {
    float: left;
    word-spacing: 2px;
    color: var(--text-primary-color);
    font-size: 9px;
  }
}
.myForm button {
  grid-area: button;
  border: 0;
  background: #5b8470;
  color: white;
}
.container {
  display: flex;
  border: 0px solid;
}
.col {
  margin: 0px;
  border: 0px solid;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}
.item-container {
  border: 1px solid;
}
.switch-view {
  color: var(--text-primary-color);
  display: flex;
  align-items: center;
}
@media (max-width: 543px) {
  .reward-message {
    justify-content: center;
  }
}
</style>

<template>
  <div>
    <div class="text-right ">
      {{ $t('rewardMessage') }}
    </div>
    <Container v-if="title" class="d-flex flex-items-center px-4 px-md-0 mb-3">
      <h3 class="flex-auto" v-text="title" />
    </Container>
    <!-- infinite scroll -->
    <div v-infinite-scroll="loadMore" infinite-scroll-distance="2">
      <div v-if="pools.length > 0">
        <vue-justified-layout
          :items="pools"
          v-slot="{ item }"
          :options="{
            forceAspectRatio: 1,
            containerPadding: 5,
            boxSpacing: 5
          }"
          ><div class="border highlight anim-fade-in rounded-1">
            <a :href="'#/pool/' + item.id" class="myForm">
              <div id="contact-details">
                <span
                  v-text="$t('marketCap')"
                  class="text-right text-white strong"
                />:
                <span v-text="_num(getLiquidity(item), 'usd-long')" />
                <div style="margin-top: 10px;" class="grouptext">
                  <span v-text="$t('swapFee')" class="row text-white" />
                  <span>: <UiNum :value="item.swapFee" format="percent"/></span>
                </div>
                <div class="grouptext margin-top10">
                  <span v-text="$t('apy')" class="text-white" />:
                  <UiNum
                    :value="item.apy"
                    format="percent"
                    class="column hide-sm hide-md"
                  />
                </div>
                <div class="grouptext margin-top10">
                  <span v-text="$t('volume24')" class="text-white" />:
                  <span
                    v-text="_num(item.lastSwapVolume, 'usd-long')"
                    format="currency"
                    class=""
                  />
                </div>
                <div class="grouptext margin-top10">
                  <span v-text="$t('rewardApy')" class="text-white" />:
                  <UiNum :value="item.rewardApy" format="percent" />
                </div>
              </div>
              <div id="comment-box">
                <Pie :tokens="item.tokens" class="mr-3" size="60" />
                <div
                  v-for="token in item.tokens"
                  :key="token.address"
                  :class="token.symbol.length > 14 && 'tooltipped tooltipped-n'"
                  :aria-label="token.symbol"
                  class="d-flex flex-items-center mr-2"
                >
                  <Icon
                    name="bullet"
                    size="12"
                    :style="`color: ${token.color}`"
                  />
                  {{ _num(token.weightPercent / 100, 'percent-short') }}
                  {{ _shorten(token.symbol, 14) }}
                </div>
                <div style="margin-top: 15px;" class="grouptext">
                  {{ _shortenAddress(item.id) }}
                </div>
              </div>
              <button>View Details</button>
              <div>
                <div v-text="$t('myLiquidity')" class="text-white text-left" />
                <div
                  v-text="_num(myLiquidity(item), 'usd-long')"
                  format="currency"
                  class="column hide-sm hide-md hide-lg"
                />
              </div>
            </a>
          </div>
        </vue-justified-layout>
      </div>
    </div>
    <!-- infinite scroll ends -->
    <UiTable>
      <UiTableTh>
        <div v-text="$t('poolAddress')" />
        <div v-text="$t('assets')" class="flex-auto text-left" />
        <div v-text="$t('marketCap')" class="column" />
        <div v-text="$t('swapFee')" class="column hide-sm hide-md" />
        <div v-text="$t('apy')" class="column hide-sm hide-md" />
        &nbsp;
        <div v-text="$t('rewardApy')" class="column-sm hide-sm hide-md" />
        &nbsp;
        <div
          v-text="$t('myLiquidity')"
          class="column hide-sm hide-md hide-lg"
        />
        <div v-text="$t('volume24')" class="column hide-sm hide-md hide-lg" />
      </UiTableTh>
      <div v-infinite-scroll="loadMore" infinite-scroll-distance="10">
        <div v-if="pools.length > 0">
          <ListPool v-for="(pool, i) in pools" :key="i" :pool="pool" />
        </div>
        <UiTableTr v-else-if="!loading">
          <div v-text="$t('emptyState')" />
        </UiTableTr>
        <ListLoading
          v-if="loading"
          :classes="[
            'column-sm text-left hide-sm hide-md hide-lg',
            'flex-auto text-left',
            'column hide-sm hide-md',
            'column',
            'column hide-sm hide-md hide-lg',
            'column hide-sm hide-md hide-lg'
          ]"
          :height="29"
        />
      </div>
    </UiTable>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { formatFilters, ITEMS_PER_PAGE } from '@/helpers/utils';
import { getPoolLiquidity } from '@/helpers/price';

export default {
  props: ['query', 'title'],
  data() {
    return {
      loading: false,
      page: 0,
      pools: [],
      filters: formatFilters(this.$route.query)
    };
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
    getLiquidity(pool) {
      console.log(pool);
      return getPoolLiquidity(pool, this.price.values);
      // return '1212';
    },
    myLiquidity(pool) {
      const poolShares = this.subgraph.poolShares[pool.id];
      if (!pool.finalized || !poolShares) return 0;
      return (this.getLiquidity(pool) / pool.totalShares) * poolShares;
    },
    ...mapActions(['getPools']),
    async loadMore() {
      if (this.pools.length < this.page * ITEMS_PER_PAGE) return;
      this.loading = true;
      this.page++;
      const page = this.page;
      let query = this.query || {};
      query = { ...query, page };
      const pools = await this.getPools(query);
      this.pools = this.pools.concat(pools);
      this.loading = false;
    }
  }
};
</script>
<style scoped>
.justified-container {
  height: auto;
  background-color: rgba(83, 91, 92, 0.356);
  width: 100%;
}
.margin-top10 {
  margin-top: 10px;
}
* {
  box-sizing: border-box;
}
.myForm {
  display: grid;
  grid-template-areas:
    'comments contact'
    '... button';
  grid-template-rows: 12em 2em;
  grid-template-columns: 8em 1fr;
  grid-gap: 0.8em;
  background: linear-gradient(
    178deg,
    rgb(56 74 255 / 4%) 23.98%,
    #253743a1 100%
  );
  padding: 1.2em;
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
#comment-box {
  grid-area: comments;
}
.myForm button {
  grid-area: button;
  border: 0;
  background: gray;
  color: white;
}
:root {
  --bg-shape-color: linear-gradient(120deg, #343a4f, #0f1620);
  --lightblue: #3d9dea;
  --darkblue: #4a4eee;
  --text-color: #d5e1ef;
}
</style>

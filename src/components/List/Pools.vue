<template>
  <div>
    <div class="text-right ">
      {{ $t('rewardMessage') }}
    </div>
    <Container v-if="title" class="d-flex flex-items-center px-4 px-md-0 mb-3">
      <h3 class="flex-auto" v-text="title" />
    </Container>
    <!-- <b-card-group deck> -->
    <vue-justified-layout
      :items="pools"
      v-slot="{ item }"
      :options="{
        forceAspectRatio: 1,
        boxSpacing: 25
      }"
    >
    {{ item.liquidity }}
      {{ item.id }}
      {{ item.swapFee }}
      {{ item.tokens }}
      <!-- <b-card
          :key="i"
          :pool="pool"
          :bg-variant="grey"
          text-variant="white"
          style="width: 5rem; height: 150px; border: solid red 1px; margin:10px"
          class="text-center"
        >
          <b-card-text>{{ pool.id }} Width comes here</b-card-text>
        </b-card> -->
    </vue-justified-layout>
    <!-- </b-card-group> -->
    <UiTable>
      <UiTableTh>
        <div
          v-text="$t('poolAddress')"
          class="column-sm text-left hide-sm hide-md hide-lg"
        />
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
  background-color: rgb(156, 94, 94);
  width: 100%;
}

.justified-item {
  background-color: #26a69a;
  border: 1px orange;
  /* nth-child(odd)
    background-color: #26a69a;
  &:nth-child(even)
    background-color: #81c784; */
}
</style>

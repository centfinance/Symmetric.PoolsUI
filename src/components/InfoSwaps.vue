<template>
  <UiTable>
    <UiTableTh>
      <div v-text="$t('tradeIn')" class="column-xl text-left" />
      <div v-text="$t('tradeOut')" class="column-xl text-left" />
      <div
        v-text="$t('swapFee')"
        class="column-xl text-left hide-sm hide-md hide-lg"
      />
      <div v-text="$t('account')" class="column-xl text-left" />
      <div
        v-text="'Time'"
        class="flex-auto text-right hide-sm hide-md hide-lg"
      />
    </UiTableTh>
    <div
      v-infinite-scroll="loadMore"
      infinite-scroll-distance="10"
      class="overflow-hidden"
    >
      <div v-if="swaps.length > 0">
        <UiTableTr v-for="(swap, i) in swaps" :key="i" :swap="swap">
          <div class="column-xl d-flex flex-items-center">
            <Token :address="swap.tokenIn" class="mr-2" />
            {{ _num(swap.tokenAmountIn) }}
            {{ _shorten(swap.tokenInSym, 12) }}
          </div>
          <div class="column-xl d-flex flex-items-center">
            <Token :address="swap.tokenOut" class="mr-2" />
            {{ _num(swap.tokenAmountOut) }}
            {{ _shorten(swap.tokenOutSym, 12) }}
          </div>
          <div
            v-text="_num(swap.feeValue, 'usd')"
            class="column-xl d-flex flex-items-center hide-sm hide-md hide-lg"
          />
          <div class="column-xl d-flex flex-items-center">
            <a
              :href="`${_etherscanLink(swap.userAddress.id, 'address')}`"
              target="_blank"
              class="text-white"
            >
              <!-- <Avatar :address="swap.userAddress.id" class="mr-2" /> -->
              {{ _shortenAddress(swap.userAddress.id) }}
              <Icon name="external-link" size="16" class="ml-1" />
            </a>
          </div>
          <div class="flex-auto text-right hide-sm hide-md hide-lg">
            <a
              :href="_etherscanLink(getTxHashFromId(swap.id), 'tx')"
              class="text-white"
              target="_blank"
            >
              {{ timeAgo.format(new Date(swap.timestamp * 1e3)) }}
              <Icon name="external-link" />
            </a>
          </div>
        </UiTableTr>
      </div>
      <ListLoading
        v-if="loading"
        :classes="[
          'column-xl text-left',
          'column-xl text-left',
          'column-xl text-left hide-sm hide-md hide-lg',
          'column-xl text-left',
          'flex-auto text-right hide-sm hide-md hide-lg'
        ]"
      />
    </div>
    <div
      v-if="swaps.length === 0 && !loading"
      class="border-top d-flex flex-items-center p-4 text-white"
      v-text="$t('emptyState')"
    />
  </UiTable>
</template>

<script>
import { mapActions } from 'vuex';
import { ITEMS_PER_PAGE } from '@/helpers/utils';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en.json';

export default {
  data() {
    return {
      loading: false,
      page: 0,
      swaps: [],
      timeAgo: null
    };
  },
  methods: {
    ...mapActions(['getAllSwaps']),
    async loadMore() {
      if (this.swaps.length < this.page * ITEMS_PER_PAGE) return;
      this.loading = true;
      this.page++;
      const page = this.page;
      const query = { page };
      const swaps = await this.getAllSwaps(query);
      this.swaps = this.swaps.concat(swaps);
      this.loading = false;
    },
    getTxHashFromId(id) {
      return id.split('-')[0];
    }
  },
  mounted() {
    TimeAgo.addDefaultLocale(en);
    this.timeAgo = new TimeAgo('en-US');
  }
};
</script>

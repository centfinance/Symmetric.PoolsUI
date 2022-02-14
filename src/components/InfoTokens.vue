<template>
  <UiTable class="info-tokens">
    <UiTableTh>
      <div class="table-column-number text-left">#</div>
      <div class="table-column-assets text-left">Name</div>
      <div class="column-xl text-left">Address</div>
      <div class="column-xl text-left">Price</div>
      <div class="column-xl text-right flex-auto">TVL</div>
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
          <div class="column-xl text-left">
            {{ _num(token.price, 'usd-long') }}
          </div>
          <div class="column-xl text-right flex-auto">
            {{ _num(token.poolLiquidity, 'usd-long') }}
          </div>
        </UiTableTr>
      </div>
      <ListLoading
        v-if="loading"
        :classes="[
          'table-column-number text-left',
          'table-column-assets text-left',
          'column-xl text-left',
          'column-xl text-left',
          'column-xl text-right flex-auto'
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
      loading: false
    };
  },
  methods: {
    ...mapActions(['getTokens'])
  },
  computed: {
    tokens() {
      return this.$store.state.subgraph.tokens;
    }
  },
  async mounted() {
    if (!this.tokens || !this.tokens.length) {
      this.loading = true;
      await this.getTokens();
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

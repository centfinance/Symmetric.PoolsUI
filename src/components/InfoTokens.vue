<template>
  <UiTable class="info-tokens">
    <UiTableTh>
      <div class="table-column-number text-left">#</div>
      <div class="table-column-assets flex-auto text-left">Name</div>
      <div class="table-column">Price</div>
      <div class="table-column">Address</div>
      <div class="table-column">TVL</div>
    </UiTableTh>
    <div class="overflow-hidden">
      <div v-if="tokens && tokens.length > 0">
        <UiTableTr v-for="(token, i) in tokens" :key="i" :token="token">
          <div class="text-left table-column-number">
            {{ i + 1 }}
          </div>
          <div class="flex-auto text-left table-column-assets">
            {{ token.name }} ({{ token.symbol }})
          </div>
          <div class="table-column">
            {{ _num(token.price, 'usd-long') }}
          </div>
          <div class="table-column">
            <a
              :href="`${_etherscanLink(token.id, 'address')}`"
              target="_blank"
              class="text-white"
            >
              {{ _shortenAddress(token.id) }}
              <Icon name="external-link" size="16" class="ml-1" />
            </a>
          </div>
          <div class="table-column">
            {{ _num(token.poolLiquidity, 'usd-long') }}
          </div>
        </UiTableTr>
      </div>
      <ListLoading
        v-if="loading"
        :classes="[
          'table-column-number text-left',
          'table-column-assets flex-auto text-left',
          'table-column',
          'table-column',
          'table-column'
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

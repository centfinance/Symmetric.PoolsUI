<template>
  <div class="overflow-hidden">
    <Toggle
      :value="type"
      :options="poolTypes"
      @select="selectType"
      style="background-color: #3C525F"
      class="mb-4"
    />&nbsp;
    <UiButton style="background-color: #5B8470;" class="button-primary">
      <a :href="config.exchangeUrl" class="text-white" target="_blank">
        {{ $t('swap') }}
        <Icon name="external-link" class="ml-1" />
      </a>
    </UiButton> | 
    <UiButton style="background-color: #5B8470;" class="button-primary">
      <a
        href="https://defillama.com/protocol/symmetric"
        class="text-white"
        target="_blank"
      >
        TVL :
        <span v-text="_num(tvl, 'usd-long')" />
        <!-- <Icon name="external-link" class="ml-1" /> -->
      </a>
    </UiButton>
    <div class="d-flex flex-items-center mb-4 pt-2 float-none float-sm-right">
      <div v-text="$t('filterByAsset')" class="pb-1" />
      <div v-for="(token, i) in tokens" :key="i" class="topic ml-2">
        <button
          class="topic-button text-center line-height-0 position-absolute right-0"
          @click="deleteToken(i)"
        >
          <Icon name="close" size="10" />
        </button>
        <span
          class="ml-2 pl-1"
          style="padding-right: 30px;"
          v-text="_ticker(token)"
        />
      </div>
      <div class="topic ml-2">
        <button @click="modalOpen = true" class="topic-button mb-1">
          <Icon name="plus" size="13" />
        </button>
      </div>
    </div>
    <portal to="modal">
      <ModalSelectToken
        :open="modalOpen"
        @close="modalOpen = false"
        @input="addToken"
        :not="tokens"
      />
    </portal>
  </div>
</template>

<script>
import { formatFilters } from '@/helpers/utils';

export default {
  props: ['value'],
  data() {
    return {
      input: {},
      tvl: '',
      tokens: [],
      type: 'shared',
      poolTypes: {
        shared: 'Shared',
        smart: 'Smart',
        private: 'Private'
      },
      modalOpen: false
    };
  },
  mounted() {
    // https://api.llama.fi/tvl/symmetric
    setTimeout(this.fetchTVL(), 600);
  },
  methods: {
    async fetchTVL() {
      const response = await fetch('https://api.llama.fi/tvl/symmetric');
      const data = await response.json();
      console.log(data);
      this.tvl = data;
    },
    addToken(token) {
      this.tokens.push(token);
      this.$emit('input', {
        type: this.type,
        token: this.tokens
      });
    },
    deleteToken(i) {
      delete this.tokens[i];
      this.tokens = this.tokens.filter(() => true);
      this.$emit('input', {
        type: this.type,
        token: this.tokens
      });
    },
    selectType(poolType) {
      this.type = poolType;
      this.$emit('input', {
        type: this.type,
        token: this.tokens
      });
    }
  },
  created() {
    const filters = formatFilters(this.value);
    this.tokens = filters.token;
    this.type = filters.type;
  }
};
</script>

<style scoped lang="scss">
@import '../vars';

.topic {
  background-color: $blue-900;
  color: $white;
  border: 0;
  border-radius: 14px;
  line-height: 28px;
  height: 28px;
  position: relative;

  button:hover {
    background-color: $blue !important;
  }

  .topic-button {
    background-color: $blue-900;
    color: $white;
    border: 0;
    border-radius: 24px;
    padding: 0 6px;
    height: 28px;
    width: 28px;
  }
}
</style>

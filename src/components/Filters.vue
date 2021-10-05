<template>
  <div class="overflow-hidden">
    <Toggle
      :value="type"
      :options="poolTypes"
      @select="selectType"
      style="background-color: #3C525F"
      class="mb-4"
    />
    |
    <UiButton style="background-color: #5B8470;" class="button-primary">
      <a :href="config.exchangeUrl" class="text-white" target="_blank">
        {{ $t('swap') }}
        <Icon name="external-link" class="ml-1" />
      </a>
    </UiButton>
    |
    <UiButton class="button-primary">
      <a
        href="https://defillama.com/protocol/symmetric"
        class="text-white"
        target="_blank"
      >
        TVL :
        <span v-text="_num(tvl, 'usd-long')" />
      </a>
    </UiButton>
    <div class="cards">
      <div class="cardInfo rounded-1">
        <div class="highlight-card anim-fade-in rounded-1">
          <span>
            <span>Symbol: </span>
            <span class="row text-white-normal">SYMM</span>
          </span>
          &nbsp;
          <!-- <span>
            <span>Price on Celo: </span>
             <span
              class="row text-white-normal"
              v-text="_num(SYMMPriceCelo, 'usd-long')"
            />
          </span>
          &nbsp;
          <span>
            <span>Price on xDai: </span>
             <span
              class="row text-white-normal"
              v-text="_num(SYMMPricexDAI, 'usd-long')"
            />
          </span>
          &nbsp; -->
          <span>
            <span>TVL Celo: </span>
            <span
              class="row text-white-normal"
              v-text="_num(celoTVL, 'usd-long')"
            />
          </span>
          &nbsp;
          <span>
            <span>TVL xDai: </span>
            <span
              class="row text-white-normal"
              v-text="_num(xDaiTVL, 'usd-long')"
            />
          </span>
        </div>
      </div>
    </div>
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
import {
  formatFilters,
  getSYMMPriceXDAI,
  getSYMMPriceCELO
} from '@/helpers/utils';
// import LineChart from './LineChart';

export default {
  // components: { LineChart },
  props: ['value'],
  data() {
    return {
      input: {},
      loaded: false,
      chartdata: null,
      xDaiTVL: null,
      celoTVL: null,
      SYMMPricexDAI: null,
      SYMMPriceCelo: null,
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
  async mounted() {
    // https://api.llama.fi/tvl/symmetric
    setTimeout(this.fetchTVL(), 600);
    this.loaded = false;
    try {
      const response = await fetch('https://api.llama.fi/protocol/symmetric');
      const data = await response.json();
      this.xDaiTVL = data.chainTvls.xDai.tvl.at(-1).totalLiquidityUSD;
      this.celoTVL = data.chainTvls.Celo.tvl.at(-1).totalLiquidityUSD;
      this.loaded = true;
    } catch (e) {
      console.error(e);
    }
  },
  methods: {
    async fetchTVL() {
      const response = await fetch('https://api.llama.fi/tvl/symmetric');
      const data = await response.json();
      console.log(data);
      this.tvl = data;
      this.SYMMPricexDAI = await getSYMMPriceXDAI();
      this.SYMMPriceCelo = await getSYMMPriceCELO();
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

.cardInfo {
  background-color: #272727;
  /* color: blue; */
  padding: 5px;
  height: 100%;
  margin: 1px;
}
.text-white-normal {
  color: white;
  font-weight: 480;
  font-size: 12px;
}
.card {
  background-color: #272727;
  /* color: blue; */
  padding: 0px;
  height: 13rem;
  margin: 5px;
}
.cards {
  /* background-color: #0A1E2A; */
  background: linear-gradient(
    178deg,
    rgb(10 30 42 / 4%) 23.98%,
    #0a1e2a83 100%
  );
  margin: 0 auto;
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
}
.margin-top10 {
  margin-top: 5px;
}
.myForm {
  display: grid;
  grid-template-areas:
    'comments contact'
    '... button';
  grid-template-rows: 9.5em 3em;
  grid-template-columns: 10.5em 1fr;
  grid-gap: 0.2em;
  background: linear-gradient(
    178deg,
    rgb(56 74 255 / 4%) 23.98%,
    #253743a1 100%
  );
  padding: 1em;
}
.chartjs-render-monitor {
  height: 195px !important;
  display: inline;
}
.TVL {
  display: grid;
  grid-template-areas:
    'comments contact'
    '... button';
  grid-template-rows: 9.5em 3em;
  grid-template-columns: 10.5em 1fr;
  grid-gap: 0.2em;
  background: linear-gradient(
    178deg,
    rgb(56 74 255 / 4%) 23.98%,
    #253743a1 100%
  );
  padding: 1em;
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

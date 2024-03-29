<template>
  <div class="overflow-hidden">
    <div class="d-flex explore-buttons mb-4">
      <div class="explore-buttons-toggle">
        <Toggle
          :value="type"
          :options="poolTypes"
          @select="selectType"
          style="background-color: #3c525f"
          class="mr-1 mb-1"
        />
      </div>
      <UiButton class="button-primary mx-1 mb-1">
        <a :href="config.exchangeUrl" class="btn-text-white" target="_blank">
          {{ $t('swap') }}
          <Icon name="external-link" class="ml-1" />
        </a>
      </UiButton>
      <UiButton class="button-primary mx-1 mb-1">
        <a
          href="https://defillama.com/protocol/symmetric"
          class="btn-text-white"
          target="_blank"
        >
          TVL :
          <span v-text="_num(tvl, 'usd-long')" />
        </a>
      </UiButton>
      <UiButton class="button-primary mx-1 mb-1">
        Volume on {{ getNetworkName() }} (24h) :
        <span v-text="_num(totalPoolValues.totalVolume, 'usd-long')" />
      </UiButton>
      <UiButton
        v-if="$auth.isAuthenticated && !wrongNetwork"
        class="button-primary mx-1 mb-1"
      >
        Total Daily Reward :
        <UiNum
          :value="totalPoolValues.totalRewardApy"
          format="long"
          class="w-60"
        />
        SYMM
      </UiButton>
    </div>
    <div class="cards">
      <div class="cardInfo rounded-1">
        <div class="highlight-card anim-fade-in rounded-1 d-flex">
          <div>
            <span>
              <span class="span-text-key">TVL Celo: </span>
              <span
                class="row span-text-value"
                v-text="_num(celoTVL, 'usd-long')"
              />
            </span>
            &nbsp;
            <span>
              <span class="span-text-key">TVL Gnosis: </span>
              <span
                class="row span-text-value"
                v-text="_num(xDaiTVL, 'usd-long')"
              />
            </span>
            &nbsp;
            <span>
              <span class="span-text-key">Circulating supply: </span>
              <span
                class="row span-text-value"
                v-text="_num(circulatingSupply, 'long')"
              />
            </span>
            &nbsp;
          </div>
          <div>
            <span>
              <span class="span-text-key">( </span>
            </span>
            <span>
              <span class="span-text-key">SYMM price on Celo: *</span>
              <span
                class="row span-text-value"
                v-text="_num(SYMMPriceCelo, 'usd-long')"
              />
            </span>
            &nbsp;
            <span>
              <span class="span-text-key">SYMM price on Gnosis: *</span>
              <span
                class="row span-text-value"
                v-text="_num(SYMMPricexDAI, 'usd-long')"
              />
            </span>
            &nbsp;
            <span class="span-text-value">*Last trade price )</span>
          </div>
        </div>
      </div>
    </div>
    <Announcements :msgs="annoucements" />
    <div
      class="d-flex flex-items-center mb-4 pt-2 float-none float-sm-right filter-by-asset"
    >
      <div v-text="$t('filterByAsset')" />
      <div v-for="(token, i) in tokens" :key="i" class="topic ml-2">
        <button
          class="topic-button text-center line-height-0 position-absolute right-0"
          @click="deleteToken(i)"
        >
          <Icon name="close" size="10" />
        </button>
        <span
          class="ml-2 pl-1"
          style="padding-right: 30px"
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
import { mapGetters, mapActions } from 'vuex';
import {
  formatFilters,
  getSYMMPriceXDAI,
  getSYMMPriceCELO
} from '@/helpers/utils';
import BigNumber from '@/helpers/bignumber';
import config from '@/config';

export default {
  props: ['value'],
  data() {
    return {
      input: {},
      loaded: false,
      xDaiTVL: null,
      celoTVL: null,
      annoucements: null,
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
      modalOpen: false,
      totalPoolValues: {}
    };
  },
  async mounted() {
    await this.fetchTVL();
    await this.fetchAnnoucements();

    try {
      this.getTotalValues();
      const response = await fetch('https://api.llama.fi/protocol/symmetric');
      const data = await response.json();
      if (data.chainTvls.Gnosis) {
        this.xDaiTVL = data.chainTvls.Gnosis.tvl.at(-1).totalLiquidityUSD;
      } else if (data.chainTvls.xDai) {
        this.xDaiTVL = data.chainTvls.xDai.tvl.at(-1).totalLiquidityUSD;
      }
      this.celoTVL = data.chainTvls.Celo.tvl.at(-1).totalLiquidityUSD;

      if (this.getSymmetricData && config.network === 'celo') {
        this.celoTVL = this.getSymmetricData.totalLiquidity;
      }

      if (this.getSymmetricData && config.network === 'xdai') {
        this.xDaiTVL = this.getSymmetricData.totalLiquidity;
      }

      this.loaded = true;
    } catch (e) {
      console.error(e);
    }
  },
  methods: {
    ...mapActions(['getPools', 'getNetworkLiquidity']),
    async getTotalValues() {
      await this.getNetworkLiquidity();
      const query = { first: 100 };
      const pools = await this.getPools(query);
      this.totalPoolValues = this.calculateTotalValues(pools);
    },
    getNetworkName() {
      return this.config.network === 'xdai'
        ? 'Gnosis'
        : this.config.network.charAt(0).toUpperCase() +
            this.config.network.slice(1);
    },
    calculateTotalValues(pools) {
      const totalValues = {
        totalLiquidity: 0,
        totalRewardApy: new BigNumber(0),
        totalVolume: 0
      };

      pools.forEach(pool => {
        totalValues.totalLiquidity += parseFloat(pool.liquidity);
        totalValues.totalRewardApy = totalValues.totalRewardApy.plus(
          this.getSpecificMyDailyRewards(pool.tokenReward, pool)
        );
        totalValues.totalVolume += pool.lastSwapVolume;
        return pool;
      });

      return totalValues;
    },
    myLiquidity(pool) {
      const poolShares = this.subgraph.poolShares[pool.id];
      if (!pool.finalized || !poolShares) return 0;
      return (pool.liquidity / pool.totalShares) * poolShares;
    },
    getSpecificMyDailyRewards(tokenReward, pool) {
      return (tokenReward * this.myLiquidity(pool)) / pool.liquidity;
    },
    async fetchTVL() {
      const response = await fetch('https://api.llama.fi/tvl/symmetric');
      const data = await response.json();
      this.tvl = data;
      this.SYMMPricexDAI = await getSYMMPriceXDAI();
      this.SYMMPriceCelo = await getSYMMPriceCELO();
    },
    async fetchAnnoucements() {
      const response = await fetch(
        'https://raw.githubusercontent.com/centfinance/Symmetric.Assets/master/data/announcements.json'
      );
      const data = await response.json();
      this.annoucements = data;
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
  computed: {
    ...mapGetters(['getSymmetricData']),
    circulatingSupply: mapState => mapState.ui.totalCirculatingSupply,
    wrongNetwork() {
      return (
        this.config.chainId !== this.web3.injectedChainId &&
        !this.ui.authLoading &&
        !this.loading
      );
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
.btn-text-white {
  color: white;
}
.card {
  padding: 0px;
  height: 13rem;
  margin: 5px;
}
.cards {
  margin: 0 auto;
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));

  .cardInfo {
    background-color: var(--filter-bar-background);

    padding: 8px 12px;
    margin: 1px;

    .span-text-key {
      color: var(--text-secondary-color);
    }

    .span-text-value {
      color: var(--text-primary-color);
      font-weight: 480;
      font-size: 12px;
    }
  }
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

.explore-buttons {
  flex-wrap: wrap;
}

@media (max-width: 767px) {
  .cards {
    margin-top: 8px;
    .cardInfo {
      .highlight-card {
        flex-direction: column;
      }
    }
  }

  .explore-buttons {
    flex-direction: column;

    &-toggle {
      margin-top: 22px;
      display: flex;
      justify-content: center;

      span {
        margin-bottom: 16px !important;
      }
    }
  }
}
.tooltipped {
  cursor: pointer;
}
@media (max-width: 543px) {
  .filter-by-asset {
    justify-content: center;
  }
}
</style>

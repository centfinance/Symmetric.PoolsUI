<template>
  <Page :loading="loading">
    <MessageSimilarPools
      v-if="pool.liquidity < 1e7 && pool.finalized"
      :pool="pool"
      class="mb-4"
    />
    <div class="d-block text-center text-md-left d-md-flex mb-3 mb-md-0">
      <PoolHeader :pool="bPool" class="flex-auto pb-3" />
      <div class="pb-3">
        <UiButton
          v-if="enableAddLiquidity && pool.tokens.length > 0"
          class="button-primary ml-2"
          @click="openAddLiquidityModal"
        >
          {{ $t('addLiquidity') }}
        </UiButton>
        <!-- MIVA:SYMM Pool with Farm -->
        <a
          v-if="
            this.id === '0x79670b0cb738a0bd826bc7709bc363c6b554690b' ||
            this.id === '0x93b599b54af63518d1dca6a116f323f33888453c'
          "
          target="_blank"
          class="ml-2 mivafarm"
          href="https://farm.minerva.digital/"
        >
          <UiButton class="button-primary"> Streaming Farm </UiButton>
        </a>
        <UiButton
          v-if="enableAddLiquidity && pool.tokens.length > 0"
          class="ml-2"
          @click="openRemoveLiquidityModal"
        >
          {{ $t('removeLiquidity') }}
        </UiButton>
      </div>
    </div>
    <PoolBoxes :pool="pool" :bPool="bPool" />
    <Chart :pool="pool" />
    <Tabs :pool="pool" />
    <router-view
      :key="$route.path"
      :pool="pool"
      :bPool="bPool"
      @reload="loadPool"
    />
    <portal to="modal">
      <ModalAddLiquidity
        :pool="pool"
        :bPool="bPool"
        :open="modalAddLiquidityOpen"
        @close="modalAddLiquidityOpen = false"
        @reload="loadPool"
      />
      <ModalRemoveLiquidity
        :pool="pool"
        :bPool="bPool"
        :open="modalRemoveLiquidityOpen"
        @close="modalRemoveLiquidityOpen = false"
        @reload="loadPool"
      />
      <ModalCustomToken
        :open="modalCustomTokenOpen"
        @close="modalCustomTokenOpen = false"
      />
    </portal>
  </Page>
</template>

<script>
import Vue from 'vue';
import { mapActions } from 'vuex';
import { getAddress } from '@ethersproject/address';
import Pool from '@/_balancer/pool';
import { bnum, scale } from '@/helpers/utils';
import store from '@/store';
import config from '@/config';

export default {
  data() {
    return {
      bPool: undefined,
      id: this.$route.params.id,
      pool: {},
      loading: false,
      modalAddLiquidityOpen: false,
      modalRemoveLiquidityOpen: false,
      modalCustomTokenOpen: false
    };
  },
  watch: {
    $route() {
      const id = this.$route.params.id;
      if (id !== this.id) {
        this.id = id;
        this.loadPool();
      }
    },
    'web3.account': async function (val, prev) {
      if (val && val.toLowerCase() !== prev) await this.loadPool();
    }
  },
  computed: {
    hasCustomToken() {
      if (!this.pool || !this.pool.tokens) return false;
      for (const token of this.pool.tokens) {
        const tokenMetadata = this.web3.tokenMetadata[token.checksum];
        if (!tokenMetadata || !tokenMetadata.whitelisted) return true;
      }
      return false;
    },
    enableAddLiquidity() {
      if (!this.bPool) return false;
      return this.pool.finalized || this.bPool.isCrp();
    },
    enableRemoveLiquidity() {
      return (
        this.config.chainId === this.web3.injectedChainId &&
        this.web3.account &&
        (Object.keys(this.subgraph.poolShares).includes(this.id) ||
          this.web3.balances[getAddress(this.id)])
      );
    }
  },
  methods: {
    ...mapActions([
      'getBalances',
      'getAllowances',
      'getPoolBalances',
      'loadTokenMetadata',
      'loadPricesByAddress',
      'getNetworkLiquidity',
      'getTokens',
      'getSYMMprice',
      'getSTAKEprice',
      'getGNOprice'
    ]),
    openAddLiquidityModal() {
      this.modalAddLiquidityOpen = true;
    },
    openRemoveLiquidityModal() {
      this.modalRemoveLiquidityOpen = true;
    },
    async loadSpecificPools() {
      const symmV1cUSD = '0x22324f68ff401a4379da39421140bcc58102338f';
      const symmV2cUSD = '0x8b44535e5137595aebebe5942c024863ee5c0db6';
      const symmV1cEUR = '0x13da4034a56f0293b8a78bc13524656e0136455c';
      const symmV2cEUR = '0x2fdcd64ad761485537cfeaa598c8980efd806532';
      const symmV1CELO = '0xf3ce35b10d3c9e74b0e6084ce08fd576fd9ec221';
      const symmV2CELO = '0x7ee06450f4ff97990c6288237964bf4f545f221f';
      const bPool1 = new Pool(symmV1cUSD);
      const bPool2 = new Pool(symmV2cUSD);
      const bPool3 = new Pool(symmV1cEUR);
      const bPool4 = new Pool(symmV2cEUR);
      const bPool5 = new Pool(symmV1CELO);
      const bPool6 = new Pool(symmV2CELO);
      let pool1, pool2, pool3, pool4, pool5, pool6;
      try {
        pool1 = await bPool1.getMetadata();
        pool2 = await bPool2.getMetadata();
        pool3 = await bPool3.getMetadata();
        pool4 = await bPool4.getMetadata();
        pool5 = await bPool5.getMetadata();
        pool6 = await bPool6.getMetadata();
      } catch (e) {
        console.log(e);
      }

      store.commit('GET_SYMMV1_CUSD_LIQUIDITY', pool1.liquidity);
      store.commit('GET_SYMMV2_CUSD_LIQUIDITY', pool2.liquidity);
      store.commit('GET_SYMMV1_CEUR_LIQUIDITY', pool3.liquidity);
      store.commit('GET_SYMMV2_CEUR_LIQUIDITY', pool4.liquidity);
      store.commit('GET_SYMMV1_CELO_LIQUIDITY', pool5.liquidity);
      store.commit('GET_SYMMV2_CELO_LIQUIDITY', pool6.liquidity);
    },
    async loadPool() {
      await this.getNetworkLiquidity();
      await this.getTokens();
      await this.getSYMMprice();
      await this.getSTAKEprice();
      await this.getGNOprice();
      if (config.network == 'celo') await this.loadSpecificPools();
      const bPool = new Pool(this.id);
      try {
        this.pool = await bPool.getMetadata();
        this.bPool = bPool;
      } catch (e) {
        return this.$router.push({ name: 'home' });
      }
      const unknownTokens = this.pool.tokensList.filter(
        tokenAddress => !this.web3.tokenMetadata[tokenAddress]
      );
      if (unknownTokens.length > 0) {
        await this.loadTokenMetadata(unknownTokens);
        await this.loadPricesByAddress(unknownTokens);
      }
      if (this.web3.account) {
        const data = await Promise.all([
          this.getBalances([
            ...this.pool.tokensList,
            getAddress(this.bPool.getBptAddress())
          ]),
          this.getAllowances(this.pool.tokensList),
          this.getPoolBalances({
            poolAddress: this.id,
            tokens: this.pool.tokensList
          })
        ]);
        this.fixPoolBalances(data[2]);
      }
    },
    fixPoolBalances(poolBalances) {
      for (const address in poolBalances) {
        const tokenIndex = this.pool.tokens.findIndex(
          token => token.checksum === address
        );
        const tokenDecimals = this.pool.tokens[tokenIndex].decimals;
        const poolBalance = scale(bnum(poolBalances[address]), -tokenDecimals);
        Vue.set(
          this.pool.tokens[tokenIndex],
          'balance',
          poolBalance.toString()
        );
      }
    }
  },
  async created() {
    this.loading = true;
    await this.loadPool();
    this.loading = false;
    setTimeout(() => {
      if (this.hasCustomToken && !this.bPool.isWhitelisted())
        this.modalCustomTokenOpen = true;
    }, 1e2);
  }
};
</script>
<style scoped>
.mivafarm button {
  background-image: linear-gradient(270deg, #443ad2, #8349d1);
  border: none;
}
.mivafarm button:hover {
  background: #8349d1;
}
</style>

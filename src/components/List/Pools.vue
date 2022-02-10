<template>
  <div>
    <div class="text-right reward-message mb-1">
      {{ $t('rewardMessage') }} |
      <span class="switch-view"
        ><span class="hide-sm mx-1">Switch View:</span>
        <toggle-button
          @change="switchView"
          :value="showCard"
          :width="70"
          :color="{ checked: '#FB6706', unchecked: '#FB6706' }"
          :switch-color="{ checked: '#123123', unchecked: '#535b5c5b' }"
          :labels="{ checked: 'Cards', unchecked: 'Table' }"
          class="ml-1"
      /></span>
    </div>
    <Container v-if="title" class="d-flex flex-items-center px-4 px-md-0 mb-3">
      <h3 class="flex-auto" v-text="title" />
    </Container>
    <!-- infinite scroll -->
    <!-- Card View -->
    <div
      v-infinite-scroll="loadMore"
      class="justified-container"
      infinite-scroll-distance="10"
      v-if="showCard"
    >
      <div v-if="pools.length > 0">
        <div class="cards">
          <!-- Total values -->
          <div class="card">
            <div class="highlight-card anim-fade-in rounded-1">
              <div class="myForm">
                <div></div>
                <div>
                  <div class="grouptext margin-top20">
                    <span class="text-white-normal">Total TVL: </span>
                    <span
                      v-text="_num(totalPoolValues.totalLiquidity, 'usd-long')"
                      class="table-column"
                    />
                  </div>

                  <div class="grouptext margin-top20">
                    <span class="text-white-normal">Total Daily Reward:</span>
                    <span
                      v-text="_num(totalPoolValues.totalDailyRewards, 'long')"
                      class="table-column"
                    />SYMM
                  </div>

                  <div class="grouptext margin-top20">
                    <span class="text-white-normal">Total Volume:</span>
                    <span
                      v-text="_num(totalPoolValues.totalVolume, 'usd-long')"
                      format="currency"
                      class="table-column hide-sm"
                    />
                  </div>
                </div>
                <div></div>
                <div class="grouptext margin-top10">
                  <span class="text-white-normal">Total Liquidity:</span>
                  <span
                    v-text="_num(totalPoolValues.totalMyLiquidity, 'usd-long')"
                    format="currency"
                    class="table-column hide-sm"
                  />
                </div>
              </div>
            </div>
          </div>

          <div class="card" v-for="item in pools" :key="item.id">
            <div class="highlight-card anim-fade-in rounded-1">
              <a :href="'#/pool/' + item.id" class="myForm">
                <div id="contact-details">
                  <span
                    v-text="$t('marketCap')"
                    class="text-right text-white-normal"
                  />:
                  <span v-text="_num(item.liquidity, 'usd-long')" />
                  <div class="grouptext margin-top10">
                    <span v-text="$t('apy')" class="text-white-normal" />:
                    <UiNum :value="item.apy" format="percent" class="column" />
                  </div>
                  <div class="grouptext margin-top10">
                    <span v-text="$t('rewardApy')" class="text-white-normal" />
                    <span
                      class="tooltipped tooltipped-e m-1 tooltipped-multiline"
                      :aria-label="APR_FORMULA"
                    >
                      <Icon name="info" size="16" />
                    </span>
                    <UiNum :value="item.rewardApy" format="percent" /> SYMM
                    <span v-if="item.rewardApyCelo">
                      /
                      <UiNum :value="item.rewardApyCelo" format="percent" />
                      CELO
                    </span>
                    <span v-if="item.rewardApyPoof">
                      /
                      <UiNum :value="item.rewardApyPoof" format="percent" />
                      POOF
                    </span>
                    <span v-if="item.rewardApyMoo">
                      /
                      <UiNum :value="item.rewardApyMoo" format="percent" />
                      MOO
                    </span>
                    <span v-if="item.rewardApyAri">
                      /
                      <UiNum :value="item.rewardApyAri" format="percent" />
                      ARI
                    </span>
                    <span v-if="item.rewardApyGno">
                      /
                      <UiNum :value="item.rewardApyGno" format="percent" />
                      GNO
                    </span>
                    <span v-if="item.rewardApyMOO">
                      /
                      <UiNum :value="item.rewardApyMOO" format="percent" />
                      MOO
                    </span>
                  </div>
                  <div class="grouptext margin-top10">
                    <span v-text="$t('myApr')" class="text-white-normal" />:
                    <span
                      v-text="
                        _num(
                          getSpecificMyDailyRewards(item.tokenReward, item),
                          'long'
                        )
                      "
                      format="long"
                      class=""
                    />
                    SYMM
                    <span v-if="item.tokenRewardCelo">
                      /
                      <span
                        v-text="
                          _num(
                            getSpecificMyDailyRewards(
                              item.tokenRewardCelo,
                              item
                            ),
                            'long'
                          )
                        "
                        format="long"
                        class=""
                      />
                      CELO
                    </span>
                    <span v-if="item.tokenRewardPoof">
                      /
                      <span
                        v-text="
                          _num(
                            getSpecificMyDailyRewards(
                              item.tokenRewardPoof,
                              item
                            ),
                            'long'
                          )
                        "
                        format="long"
                        class=""
                      />
                      POOF
                    </span>
                    <span v-if="item.tokenRewardMoo">
                      /
                      <span
                        v-text="
                          _num(
                            getSpecificMyDailyRewards(
                              item.tokenRewardMoo,
                              item
                            ),
                            'long'
                          )
                        "
                        format="long"
                        class=""
                      />
                      MOO
                    </span>
                    <span v-if="item.tokenRewardAri">
                      /
                      <span
                        v-text="
                          _num(
                            getSpecificMyDailyRewards(
                              item.tokenRewardAri,
                              item
                            ),
                            'long'
                          )
                        "
                        format="long"
                        class=""
                      />
                      ARI
                    </span>
                    <span v-if="item.tokenRewardGno">
                      /
                      <span
                        v-text="
                          _num(
                            getSpecificMyDailyRewards(
                              item.tokenRewardGno,
                              item
                            ),
                            'long'
                          )
                        "
                        format="long"
                        class=""
                      />
                      GNO
                    </span>
                  </div>

                  <div class="grouptext margin-top10">
                    <span v-text="$t('volume24')" class="text-white-normal" />:
                    <span
                      v-text="_num(item.lastSwapVolume, 'usd-long')"
                      format="currency"
                      class=""
                    />
                  </div>
                </div>
                <div id="comment-box">
                  <ul :key="token.address" v-for="token in item.tokens">
                    <li>
                      <Icon
                        name="bullet"
                        size="12"
                        :style="`color: ${token.color}`"
                      />
                      {{ _num(token.weightPercent / 100, 'percent-short') }}
                      {{ filterTokenSymbol(token.symbol, token.address) }}
                    </li>
                  </ul>
                  <hr style="width: 100%; opacity: 0" />
                  <Pie
                    :tokens="item.tokens"
                    style="left: 30%; position: relative; float: left"
                    size="55"
                  />
                </div>
                <UiButton class="button-primary"> Add Liquidity </UiButton>
                <!-- MIVA:SYMM Pool with Farm -->
                <a
                  v-if="
                    item.id === '0x79670b0cb738a0bd826bc7709bc363c6b554690b' ||
                    item.id === '0x93b599b54af63518d1dca6a116f323f33888453c'
                  "
                  class="mivafarm"
                  href="https://farm.minerva.digital/"
                  target="_blank"
                >
                  <UiButton class="button-primary"> Streaming Farm </UiButton>
                </a>
                <div class="grouptext">
                  <span
                    v-text="$t('myLiquidity')"
                    class="text-white-normal text-left"
                  />:
                  <span
                    style="color: #fb6706"
                    v-text="_num(myLiquidity(item), 'usd-long')"
                    format="currency"
                  />
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
      <ListLoading
        v-if="loading || symmPoolsLoading"
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
    <!-- infinite scroll ends -->
    <!-- Table View -->
    <UiTable class="anim-fade-in table-view" v-if="!showCard">
      <UiTableTh>
        <div class="table- column-assets flex-auto text-left">
          {{ $t('assets') }}
        </div>
        <div class="table-column table-sort" @click="handleSort('liquidity')">
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
        <div class="table-column hide-sm table-sort" @click="handleSort('apy')">
          {{ $t('apy') }}
          <img
            v-if="sortDirection === 'DESC' && sortField === 'apy'"
            src="@/assets/arrow-up.svg"
            alt="up"
          />
          <img
            v-if="sortDirection === 'ASC' && sortField === 'apy'"
            src="@/assets/arrow-down.svg"
            alt="down"
          />
        </div>
        <div
          class="table-column hide-sm hide-md table-sort"
          @click="handleSort('rewardApy')"
        >
          {{ $t('rewardApy') }}
          <span
            class="tooltipped tooltipped-e m-2 tooltipped-multiline"
            :aria-label="APR_FORMULA"
          >
            <Icon name="info" size="16" />
          </span>
          <img
            v-if="sortDirection === 'DESC' && sortField === 'rewardApy'"
            src="@/assets/arrow-up.svg"
            alt="up"
          />
          <img
            v-if="sortDirection === 'ASC' && sortField === 'rewardApy'"
            src="@/assets/arrow-down.svg"
            alt="down"
          />
        </div>
        <div
          class="table-column hide-sm hide-md hide-lg table-sort"
          @click="handleSort('myLiquidity')"
        >
          {{ $t('myLiquidity') }}
          <img
            v-if="sortDirection === 'DESC' && sortField === 'myLiquidity'"
            src="@/assets/arrow-up.svg"
            alt="up"
          />
          <img
            v-if="sortDirection === 'ASC' && sortField === 'myLiquidity'"
            src="@/assets/arrow-down.svg"
            alt="down"
          />
        </div>
        <div
          class="table-column hide-sm hide-md hide-lg table-sort"
          @click="handleSort('myDailyRewards')"
        >
          {{ $t('myApr') }}
          <img
            v-if="sortDirection === 'DESC' && sortField === 'myDailyRewards'"
            src="@/assets/arrow-up.svg"
            alt="up"
          />
          <img
            v-if="sortDirection === 'ASC' && sortField === 'myDailyRewards'"
            src="@/assets/arrow-down.svg"
            alt="down"
          />
        </div>
        <div
          class="table-column hide-sm table-sort"
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
            'table-column hide-sm hide-md',
            'table-column',
            'table-column hide-sm hide-md hide-lg',
            'table-column hide-sm hide-md hide-lg'
          ]"
          :height="29"
        />
      </div>
      <UiTableTh>
        <div class="table-column-assets flex-auto text-left">Total Values</div>
        <div
          v-text="_num(currentTotalPoolValues.totalLiquidity, 'usd-long')"
          class="table-column"
        />
        <div class="table-column hide-sm"></div>
        <div class="table-column hide-sm hide-md"></div>
        <div
          v-text="_num(currentTotalPoolValues.totalMyLiquidity, 'usd-long')"
          format="currency"
          class="table-column hide-sm hide-md hide-lg"
        />
        <div class="table-column hide-sm hide-md hide-lg">
          <div class="d-flex">
            <UiNum
              :value="currentTotalPoolValues.totalDailyRewards"
              format="long"
              class="w-60"
            />
            <div class="w-40 ml-1 text-right">SYMM</div>
          </div>
        </div>
        <div
          v-text="_num(currentTotalPoolValues.totalVolume, 'usd-long')"
          format="currency"
          class="table-column hide-sm"
        />
      </UiTableTh>
    </UiTable>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { formatFilters, ITEMS_PER_PAGE } from '@/helpers/utils';
// import { getPoolLiquidity } from '@/helpers/price';
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
      showCard: this.$cookie.get('cardView') === 'true' ? true : false,
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
    this.showCard = this.$cookie.get('cardView') === 'true' ? true : false;
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
    switchView(val) {
      this.$cookie.delete('cardView');
      this.$cookie.set('cardView', val.value, 5);
      this.showCard = val.value;
    },
    // getLiquidity(pool) {
    //   return getPoolLiquidity(pool, this.price.values);
    // },
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
      if (this.$cookie.get('cardView') === null) {
        this.switchView({ value: true });
        this.showCard = true;
      }
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
    margin: 0px; // TODO: should consider for mobile version
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

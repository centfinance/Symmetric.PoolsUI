import Vue from 'vue';
import { getAddress } from '@ethersproject/address';
import { request } from '@/helpers/subgraph';
import {
  formatPool,
  ITEMS_PER_PAGE,
  getNetworkLiquidity,
  getSYMMprice
} from '@/helpers/utils';
// import { cloneDeep } from 'lodash';

const state = {
  pools: [],
  balancer: {},
  poolShares: {},
  specificPools: [],
  myPools: [],
  tokens: {}, // all tokens from the subgraph
  tokenPrices: {}, // token prices from tokens {address: value}
  liquidity: {},
  SYMMprice: {},
  poolsTotals: {},
  transactions: []
};

const mutations = {
  CLEAR_USER(_state) {
    Vue.set(_state, 'poolShares', {});
    Vue.set(_state, 'myPools', []);
    console.debug('CLEAR_USER');
  },
  GET_POOLS_REQUEST() {
    console.debug('GET_POOLS_REQUEST');
  },
  GET_POOLS_SUCCESS(_state, payload) {
    Vue.set(_state, 'pools', payload);
    console.debug('GET_POOLS_SUCCESS', payload);
  },
  GET_POOLS_FAILURE(_state, payload) {
    console.debug('GET_POOLS_FAILURE', payload);
  },
  GET_SPECIFIC_POOLS_REQUEST() {
    console.debug('GET_SPECIFIC_POOLS_REQUEST');
  },
  GET_SPECIFIC_POOLS_SUCCESS(_state, payload) {
    Vue.set(_state, 'specificPools', payload);
    console.debug('GET_SPECIFIC_POOLS_SUCCESS');
  },
  GET_SPECIFIC_POOLS_FAILURE(_state, payload) {
    console.debug('GET_SPECIFIC_POOLS_FAILURE', payload);
  },
  GET_MY_POOLS_SHARES_REQUEST() {
    console.debug('GET_MY_POOLS_SHARES_REQUEST');
  },
  GET_MY_POOLS_SHARES_SUCCESS(_state, payload) {
    Vue.set(_state, 'poolShares', payload);
    console.debug('GET_MY_POOLS_SHARES_SUCCESS');
  },
  GET_MY_POOLS_SHARES_FAILURE(_state, payload) {
    console.debug('GET_MY_POOLS_SHARES_FAILURE', payload);
  },
  GET_POOLS_SWAPS_REQUEST() {
    console.debug('GET_POOLS_SWAPS_REQUEST');
  },
  GET_POOLS_SWAPS_SUCCESS() {
    console.debug('GET_POOLS_SWAPS_SUCCESS');
  },
  GET_POOLS_SWAPS_FAILURE(_state, payload) {
    console.debug('GET_POOLS_SWAPS_FAILURE', payload);
  },
  GET_POOLS_LBP_SWAPS_REQUEST() {
    console.debug('GET_POOLS_LBP_SWAPS_REQUEST');
  },
  GET_POOLS_LBP_SWAPS_SUCCESS() {
    console.debug('GET_POOLS_LBP_SWAPS_SUCCESS');
  },
  GET_POOLS_LBP_SWAPS_FAILURE(_state, payload) {
    console.debug('GET_POOLS_LBP_SWAPS_FAILURE', payload);
  },
  GET_POOLS_SHARES_REQUEST() {
    console.debug('GET_POOLS_SHARES_REQUEST');
  },
  GET_POOLS_SHARES_SUCCESS() {
    console.debug('GET_POOLS_SHARES_SUCCESS');
  },
  GET_POOLS_SHARES_FAILURE(_state, payload) {
    console.debug('GET_POOLS_SHARES_FAILURE', payload);
  },
  GET_POOLS_METRICS_REQUEST() {
    console.debug('GET_POOLS_METRICS_REQUEST');
  },
  GET_POOLS_METRICS_SUCCESS() {
    console.debug('GET_POOLS_METRICS_SUCCESS');
  },
  GET_POOLS_METRICS_FAILURE(_state, payload) {
    console.debug('GET_POOLS_METRICS_FAILURE', payload);
  },
  GET_ALL_POOLS_METRICS_REQUEST() {
    console.debug('GET_ALL_POOLS_METRICS_REQUEST');
  },
  GET_ALL_POOLS_METRICS_SUCCESS() {
    console.debug('GET_ALL_POOLS_METRICS_SUCCESS');
  },
  GET_ALL_POOLS_METRICS_FAILURE(_state, payload) {
    console.debug('GET_ALL_POOLS_METRICS_FAILURE', payload);
  },
  GET_TOKENS_REQUEST() {
    console.debug('GET_TOKEN_PRICES_REQUEST');
  },
  GET_TOKENS_SUCCESS(_state, payload) {
    Vue.set(_state, 'tokens', payload.tokens);
    Vue.set(_state, 'tokenPrices', payload.tokenPrices);
    console.debug('GET_TOKEN_PRICES_SUCCESS');
  },
  GET_TOKENS_FAILURE(_state, payload) {
    console.debug('GET_TOKEN_PRICES_FAILURE', payload);
  },
  GET_NETWORK_LIQUIDITY(_state, payload) {
    Vue.set(_state, 'liquidity', payload);
    console.debug('GET_NETWORK_LIQUIDITY', payload);
  },
  GET_SYMM_PRICE(_state, payload) {
    Vue.set(_state, 'SYMMprice', payload);
    console.debug('GET_SYMM_PRICE', payload);
  },
  GET_POOLS_TOTALS(_state, payload) {
    Vue.set(_state, 'poolsTotals', payload);
    console.debug('GET_POOLS_TOTALS', payload);
  },
  GET_INFO_TRANSACTIONS_REQUEST() {
    console.debug('GET_INFO_TRANSACTIONS_REQUEST');
  },
  GET_INFO_TRANSACTIONS(_state, payload) {
    Vue.set(_state, 'transactions', payload);
    console.debug('GET_INFO_TRANSACTIONS', payload);
  },
  GET_INFO_TRANSACTIONS_FAILURE(_state, payload) {
    console.debug('GET_INFO_TRANSACTIONS_FAILURE', payload);
  }
};

const actions = {
  clearUser: async ({ commit }) => {
    commit('CLEAR_USER');
  },
  getNetworkLiquidity: async ({ commit }) => {
    const liquidity = await getNetworkLiquidity();
    commit('GET_NETWORK_LIQUIDITY', liquidity);
  },
  getSYMMprice: async ({ commit }) => {
    const price = await getSYMMprice();
    commit('GET_SYMM_PRICE', price);
  },
  getPools: async ({ commit }, payload) => {
    const {
      first = 20,
      page = 1,
      orderBy = 'liquidity',
      orderDirection = 'desc',
      where = {}
    } = payload;
    const skip = (page - 1) * first;
    const ts = Math.round(new Date().getTime() / 1000);
    const tsYesterday = ts - 24 * 3600;
    where.tokensList_not = [];
    const query = {
      pools: {
        __args: {
          where,
          first,
          skip,
          orderBy,
          orderDirection
        },
        swaps: {
          __args: {
            where: {
              timestamp_lt: tsYesterday
            }
          }
        }
      }
    };
    commit('GET_POOLS_REQUEST');
    try {
      let { pools } = await request('getPools', query);
      pools = await Promise.all(
        pools.map(async (pool): Promise<object> => {
          return await formatPool(pool);
        })
      );
      commit('GET_POOLS_SUCCESS', pools);
      return pools;
    } catch (e) {
      commit('GET_POOLS_FAILURE', e);
    }
  },
  getSpecificPools: async ({ commit }, payload) => {
    // const { where = {} } = cloneDeep(payload.query);
    const { id_in } = payload; // array of pool ids
    const ts = Math.round(new Date().getTime() / 1000);
    const tsYesterday = ts - 24 * 3600;

    const where = { finalized: true, id_in: [] };
    where.id_in = id_in;

    const query = {
      pools: {
        __args: {
          where,
          first: id_in.length
        },
        swaps: {
          __args: {
            where: {
              timestamp_lt: tsYesterday
            }
          }
        }
      }
    };
    commit('GET_SPECIFIC_POOLS_REQUEST');
    try {
      const { pools } = await request('getPools', query);
      commit('GET_SPECIFIC_POOLS_SUCCESS', pools);
      return pools;
    } catch (e) {
      commit('GET_SPECIFIC_POOLS_FAILURE', e);
    }
  },
  getUserPoolShares: async ({ commit, rootState }) => {
    const address = rootState.web3.account;
    commit('GET_MY_POOLS_SHARES_REQUEST');
    try {
      const query = {
        poolShares: {
          __args: {
            where: {
              userAddress: address.toLowerCase()
            }
          }
        }
      };
      const { poolShares } = await request('getUserPoolShares', query);
      const balances: any = {};
      poolShares.forEach(share => (balances[share.poolId.id] = share.balance));
      commit('GET_MY_POOLS_SHARES_SUCCESS', balances);
      return poolShares;
    } catch (e) {
      commit('GET_MY_POOLS_SHARES_FAILURE', e);
    }
  },
  getLbpSwaps: async ({ commit }, payload) => {
    commit('GET_POOLS_LBP_SWAPS_REQUEST');
    try {
      const {
        first = 100,
        page = 1,
        orderBy = 'timestamp',
        orderDirection = 'asc',
        where = {}
      } = payload;
      const skip = (page - 1) * first;
      const query = {
        swaps: {
          __args: {
            where,
            first,
            skip,
            orderBy,
            orderDirection
          }
        }
      };
      const { swaps } = await request('getPoolSwaps', query);
      commit('GET_POOLS_LBP_SWAPS_SUCCESS');
      return swaps;
    } catch (e) {
      commit('GET_POOLS_LBP_SWAPS_FAILURE', e);
    }
  },
  getPoolSwaps: async ({ commit }, payload) => {
    commit('GET_POOLS_SWAPS_REQUEST');
    try {
      const {
        first = ITEMS_PER_PAGE,
        page = 1,
        orderBy = 'timestamp',
        orderDirection = 'desc',
        where = {}
      } = payload;
      const skip = (page - 1) * first;
      const query = {
        swaps: {
          __args: {
            where,
            first,
            skip,
            orderBy,
            orderDirection
          }
        }
      };
      const { swaps } = await request('getPoolSwaps', query);
      commit('GET_POOLS_SWAPS_SUCCESS');
      return swaps;
    } catch (e) {
      commit('GET_POOLS_SWAPS_FAILURE', e);
    }
  },
  getPoolShares: async ({ commit }, payload) => {
    commit('GET_POOLS_SHARES_REQUEST');
    try {
      const {
        first = ITEMS_PER_PAGE,
        page = 1,
        orderBy = 'balance',
        orderDirection = 'desc',
        where = {}
      } = payload;
      const skip = (page - 1) * first;
      const query = {
        poolShares: {
          __args: {
            where,
            first,
            skip,
            orderBy,
            orderDirection
          }
        }
      };
      const { poolShares } = await request('getPoolShares', query);
      commit('GET_POOLS_SHARES_SUCCESS');
      return poolShares;
    } catch (e) {
      commit('GET_POOLS_SHARES_FAILURE', e);
    }
  },
  getPoolMetrics: async ({ commit }, payload) => {
    commit('GET_POOLS_METRICS_REQUEST');
    try {
      const day = 24 * 60 * 60 * 1000;
      const now = Date.now();
      const today = now - (now % day);
      const query = {};
      for (let i = 0; i < 31; i++) {
        const timestamp = today - i * day;
        query[`metrics_${timestamp}`] = {
          __aliasFor: 'swaps',
          __args: {
            first: 1,
            orderBy: 'timestamp',
            orderDirection: 'desc',
            where: {
              poolAddress: payload,
              timestamp_gt: timestamp / 1000,
              timestamp_lt: (timestamp + day) / 1000
            }
          },
          poolTotalSwapVolume: true,
          poolTotalSwapFee: true,
          poolLiquidity: true
        };
      }
      const poolMetrics = await request('getPoolMetrics', query);
      commit('GET_POOLS_METRICS_SUCCESS');
      return poolMetrics;
    } catch (e) {
      commit('GET_POOLS_METRICS_FAILURE', e);
    }
  },
  getAllPoolsMetrics: async ({ commit }) => {
    commit('GET_ALL_POOLS_METRICS_REQUEST');
    try {
      const day = 24 * 60 * 60 * 1000;
      const now = Date.now();
      const today = now - (now % day);
      const query = {};
      for (let i = 0; i < 60; i++) {
        const timestamp = today - i * day;
        query[`metrics_${timestamp}`] = {
          __aliasFor: 'pools',
          __args: {
            first: 100
          },
          swaps: {
            __args: {
              first: 1,
              where: {
                timestamp_gt: timestamp / 1000,
                timestamp_lt: (timestamp + day) / 1000
              }
            },
            poolLiquidity: true,
            poolTotalSwapVolume: true,
            poolTotalSwapFee: true
          }
        };
      }
      const poolsMetrics = await request('getAllPoolsMetrics', query);
      commit('GET_ALL_POOLS_METRICS_SUCCESS');
      return poolsMetrics;
    } catch (e) {
      commit('GET_ALL_POOLS_METRICS_FAILURE', e);
    }
  },
  getTokens: async ({ commit }) => {
    commit('GET_TOKENS_REQUEST');
    try {
      const { tokenPrices: tokens } = await request('getTokenPrices'); // all tokens

      // get token prices only from "tokens"
      const tokenPrices = Object.fromEntries(
        tokens
          .sort((a, b) => b.poolLiquidity - a.poolLiquidity)
          .map(tokenPrice => [
            getAddress(tokenPrice.id),
            parseFloat(tokenPrice.price)
          ])
      );
      commit('GET_TOKENS_SUCCESS', { tokenPrices, tokens });
    } catch (e) {
      commit('GET_TOKENS_FAILURE', e);
    }
  },
  getPoolsTotals: async ({ commit }, payload) => {
    commit('GET_POOLS_TOTALS', payload);
  },
  getAllSwaps: async ({ commit }, payload) => {
    commit('GET_INFO_TRANSACTIONS_REQUEST');
    try {
      const {
        first = ITEMS_PER_PAGE,
        page = 1,
        orderBy = 'timestamp',
        orderDirection = 'desc',
        where = {}
      } = payload;
      const skip = (page - 1) * first;
      const query = {
        swaps: {
          __args: {
            where,
            first,
            skip,
            orderBy,
            orderDirection
          }
        }
      };
      const { swaps } = await request('getAllSwaps', query);
      commit('GET_INFO_TRANSACTIONS', swaps);
      return swaps;
    } catch (e) {
      commit('GET_INFO_TRANSACTIONS_FAILURE', e);
    }
  }
};

const getters = {
  getTokens(state) {
    return state.tokens;
  },
  getTokenPriceFromSymbol: state => symbol => {
    const filteredToken = state.tokens.filter(token => token.symbol === symbol);
    if (filteredToken.length > 0) {
      return filteredToken[0].price;
    } else return 0;
  },
  getNetworkLiquidity(state) {
    return state.liquidity;
  },
  getSYMMprice(state) {
    return state.SYMMprice;
  },
  getPoolLiquidityFromId: state => poolId => {
    const filteredPool = state.specificPools.filter(
      pool => pool.id.toLowerCase() === poolId.toLowerCase()
    );
    if (filteredPool.length > 0) {
      return filteredPool[0].liquidity;
    } else return 0;
  },
  getPoolsTotals(state) {
    return state.poolsTotals;
  }
};

export default {
  state,
  mutations,
  actions,
  getters
};

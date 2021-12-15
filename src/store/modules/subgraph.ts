import Vue from 'vue';
import { getAddress } from '@ethersproject/address';
import { request } from '@/helpers/subgraph';
import {
  formatPool,
  ITEMS_PER_PAGE,
  getNetworkLiquidity,
  getSYMMprice,
  getCELOprice,
  getKNXprice,
  getPOOFprice,
  getSTAKEprice
} from '@/helpers/utils';

const state = {
  balancer: {},
  poolShares: {},
  myPools: [],
  tokens: {},
  liquidity: {},
  SYMMprice: {},
  CELOprice: {},
  KNXprice: {},
  POOFprice: {},
  STAKEprice: {},
  symmV1cUSDLiquidity: 0,
  symmV2cUSDLiquidity: 0,
  symmV1cEURLiquidity: 0,
  symmV2cEURLiquidity: 0,
  symmV1CELOLiquidity: 0,
  symmV2CELOLiquidity: 0
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
  GET_POOLS_SUCCESS() {
    console.debug('GET_POOLS_SUCCESS');
  },
  GET_POOLS_FAILURE(_state, payload) {
    console.debug('GET_POOLS_FAILURE', payload);
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
  GET_TOKENS_REQUEST() {
    console.debug('GET_TOKEN_PRICES_REQUEST');
  },
  GET_TOKENS_SUCCESS(_state, payload) {
    Vue.set(_state, 'tokens', payload);
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
  GET_CELO_PRICE(_state, payload) {
    Vue.set(_state, 'CELOprice', payload);
    console.debug('GET_CELO_PRICE', payload);
  },
  GET_KNX_PRICE(_state, payload) {
    Vue.set(_state, 'KNXprice', payload);
    console.debug('GET_KNX_PRICE', payload);
  },
  GET_POOF_PRICE(_state, payload) {
    Vue.set(_state, 'POOFprice', payload);
    console.debug('GET_POOF_PRICE', payload);
  },
  GET_STAKE_PRICE(_state, payload) {
    Vue.set(_state, 'STAKEprice', payload);
    console.debug('GET_STAKE_PRICE', payload);
  },
  GET_SYMMV1_CUSD_LIQUIDITY(_state, payload) {
    Vue.set(_state, 'symmV1cUSDLiquidity', payload);
  },
  GET_SYMMV2_CUSD_LIQUIDITY(_state, payload) {
    Vue.set(_state, 'symmV2cUSDLiquidity', payload);
  },
  GET_SYMMV1_CEUR_LIQUIDITY(_state, payload) {
    Vue.set(_state, 'symmV1cEURLiquidity', payload);
  },
  GET_SYMMV2_CEUR_LIQUIDITY(_state, payload) {
    Vue.set(_state, 'symmV2cEURLiquidity', payload);
  },
  GET_SYMMV1_CELO_LIQUIDITY(_state, payload) {
    Vue.set(_state, 'symmV1CELOLiquidity', payload);
  },
  GET_SYMMV2_CELO_LIQUIDITY(_state, payload) {
    Vue.set(_state, 'symmV2CELOLiquidity', payload);
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
  getCELOprice: async ({ commit }) => {
    const price = await getCELOprice();
    commit('GET_CELO_PRICE', price);
  },
  getKNXprice: async ({ commit }) => {
    const price = await getKNXprice();
    commit('GET_KNX_PRICE', price);
  },
  getPOOFprice: async ({ commit }) => {
    const price = await getPOOFprice();
    commit('GET_POOF_PRICE', price);
  },
  getSTAKEprice: async ({ commit }) => {
    const price = await getSTAKEprice();
    commit('GET_STAKE_PRICE', price);
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
      commit('GET_POOLS_SUCCESS');
      return pools;
    } catch (e) {
      commit('GET_POOLS_FAILURE', e);
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
  getTokens: async ({ commit }) => {
    commit('GET_TOKENS_REQUEST');
    try {
      let { tokenPrices } = await request('getTokenPrices');
      tokenPrices = Object.fromEntries(
        tokenPrices
          .sort((a, b) => b.poolLiquidity - a.poolLiquidity)
          .map(tokenPrice => [
            getAddress(tokenPrice.id),
            parseFloat(tokenPrice.price)
          ])
      );
      commit('GET_TOKENS_SUCCESS', tokenPrices);
    } catch (e) {
      commit('GET_TOKENS_FAILURE', e);
    }
  }
};

const getters = {
  getNetworkLiquidity(state) {
    return state.liquidity;
  },
  getSYMMprice(state) {
    return state.SYMMprice;
  },
  getCELOprice(state) {
    return state.CELOprice;
  },
  getKNXprice(state) {
    return state.KNXprice;
  },
  getPOOFprice(state) {
    return state.POOFprice;
  },
  getSTAKEprice(state) {
    return state.STAKEprice;
  },
  getSymmV1cUSDLiquidity(state) {
    return state.symmV1cUSDLiquidity;
  },
  getSymmV2cUSDLiquidity(state) {
    return state.symmV2cUSDLiquidity;
  },
  getSymmV1cEURLiquidity(state) {
    return state.symmV1cEURLiquidity;
  },
  getSymmV2cEURLiquidity(state) {
    return state.symmV2cEURLiquidity;
  },
  getSymmV1CELOLiquidity(state) {
    return state.symmV1CELOLiquidity;
  },
  getSymmV2CELOLiquidity(state) {
    return state.symmV2CELOLiquidity;
  }
};

export default {
  state,
  mutations,
  actions,
  getters
};

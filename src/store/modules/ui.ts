import Vue from 'vue';
import config from '@/config';

const ETHERSCAN_ENDPOINT =
  'https://api.etherscan.io/api?module=stats&action=tokensupply&contractaddress=0x57db3ffca78dbbe0efa0ec745d55f62aa0cbd345&apikey=IQQUGPR4WF27TZ4FNWNEJ8GPWAVWM6ICDU';

const state = {
  init: false,
  loading: false,
  authLoading: false,
  address: '',
  balances: {},
  pools: [],
  proxy: '',
  sidebarIsOpen: false,
  modalOpen: false,
  totalCirculatingSupply: ''
};

const mutations = {
  SET(_state, payload) {
    Object.keys(payload).forEach(key => {
      Vue.set(_state, key, payload[key]);
    });
  }
};

const actions = {
  init: async ({ commit, dispatch }) => {
    commit('SET', { loading: true });
    const tokenIds = Object.keys(config.tokens)
      .map(tokenAddress => config.tokens[tokenAddress].id)
      .filter(tokenId => !!tokenId);
    await Promise.all([
      dispatch('loadPricesById', tokenIds),
      dispatch('initTokenMetadata')
    ]);
    const connector = await Vue.prototype.$auth.getConnector();
    if (connector) dispatch('login', connector);
    commit('SET', { loading: false, init: true });

    // get symm circulating supply from etherscan
    let data;
    try {
      const url = `${ETHERSCAN_ENDPOINT}`;
      const response = await fetch(url);
      data = await response.json();
    } catch (e) {
      console.error(e);
    }
    if (data?.result) {
      commit('SET', {
        totalCirculatingSupply: (data.result / 10e17).toFixed(2)
      });
    }
  },
  loading: ({ commit }, payload) => {
    commit('SET', { loading: payload });
  },
  toggleSidebar: ({ commit }) => {
    commit('SET', { sidebarIsOpen: !state.sidebarIsOpen });
  },
  hideSidebar: ({ commit }) => {
    commit('SET', { sidebarIsOpen: false });
  },
  toggleModal: ({ commit }) => {
    commit('SET', { modalOpen: !state.modalOpen });
  }
};

export default {
  state,
  mutations,
  actions
};

<template>
  <nav id="topnav" class="border-bottom position-fixed width-full">
    <div
      class="d-flex flex-items-center px-5"
      style="height: 66px;padding-left:2px !important"
    >
      <div class="flex-auto d-flex flex-items-center">
        <a class="d-block d-xl-none text-white" @click="toggleSidebar">
          <Icon name="menu" size="28" class="mr-3" />
        </a>
        <!-- <router-link class="brand" :to="'/'">
          <img class="logo" src="@/assets/symmetricIcon.svg">
          <div class="title">Symmetric</div>
          <br />
        </router-link>
        <span class="network"> xDai</span> -->
        <router-link
          :to="{ name: 'home' }"
          class="d-flex"
          style="padding-top: 2px;"
        >
          <img class="logo" src="@/assets/symmetricIcon.svg" />
          <span class="title">SYMMETRIC </span>
          <!-- <span
            style="letter-spacing: 1px; font-size: 24px; font-weight: 600; color: #FB6706;"
            v-text="'Symmetric '"
          /> -->
          <!-- <span
            style="letter-spacing: 1px; font-size: 14px; font-weight: 600; color: #ffffff;"
            v-text="' on ' + config.network "
          /> -->
        </router-link>
      </div>
      <div :key="web3.account">
        <UiButton
          v-if="$auth.isAuthenticated && !wrongNetwork"
          @click="modalOpen.account = true"
          :loading="loading || ui.authLoading"
        >
          <Avatar :address="web3.account" size="16" class="ml-n1 mr-n1" />
          <span v-if="web3.name" v-text="web3.name" class="hide-sm ml-2 pl-1" />
          <span
            v-else
            v-text="_shortenAddress(web3.account)"
            class="hide-sm ml-2 pl-1"
          />
        </UiButton>
        <UiButton
          v-if="$auth.isAuthenticated && wrongNetwork"
          class="button-yello px-5"
          @click="switchNetwork"
        >
          <Icon name="info" class="ml-n2 mr-1 v-align-middle" />
          {{ $t('switchNetwork') }}
        </UiButton>
        <UiButton
          v-if="$auth.isAuthenticated && wrongNetwork"
          class="button-red shake-horizontal"
        >
          <Icon name="warning" class="ml-n2 mr-1 v-align-middle" />
          {{ $t('wrongNetwork') }}
        </UiButton>
        <UiButton
          v-if="!$auth.isAuthenticated"
          @click="modalOpen.account = true"
          :loading="loading || ui.authLoading"
          class="button-primary"
        >
          {{ $t('connectWallet') }}
        </UiButton>
        <router-link
          v-if="$auth.isAuthenticated && !wrongNetwork && !ui.authLoading"
          :to="{ name: 'wallet' }"
          class="ml-2"
        >
          <UiButton class="v-align-bottom p-0">
            <Icon name="wallet" size="20" class="mx-3" />
          </UiButton>
        </router-link>
        <UiButton
          v-if="myPendingTransactions.length"
          @click="modalOpen.activity = true"
          class="button-primary ml-2"
        >
          {{ myPendingTransactions.length }}
        </UiButton>
      </div>
    </div>
    <div class="ml-6 !important" style="color:white; text-align: center;">
          Caution: Investments carry risk. Only add liquidity that you can afford to lose.
        </div>
    <portal to="modal">
      <ModalAccount
        :open="modalOpen.account"
        @close="modalOpen.account = false"
        @login="handleLogin"
      />
      <ModalActivity
        :open="modalOpen.activity"
        @close="modalOpen.activity = false"
        @login="handleLogin"
      />
    </portal>
  </nav>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      loading: false,
      modalOpen: {
        account: false,
        activity: false
      }
    };
  },
  computed: {
    ...mapGetters(['myPendingTransactions']),
    wrongNetwork() {
      return (
        this.config.chainId !== this.web3.injectedChainId &&
        !this.ui.authLoading &&
        !this.loading
      );
    }
  },
  methods: {
    ...mapActions(['toggleSidebar']),
    ...mapActions(['login']),
    async handleLogin(connector) {
      this.modalOpen.account = false;
      this.loading = true;
      await this.login(connector);
      this.loading = false;
    },

    async switchNetwork() {
            if (!window.ethereum) {
                console.error('No injected wallet found.');
                return;
            }
            switch (this.config.network) {
            case "xdai":
                window.ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [
                        {
                            'chainId': '0x64',
                            'chainName': 'xDai',
                            'rpcUrls': ['https://rpc.xdaichain.com'],
                            'nativeCurrency': {
                                'name': 'xDai Chain xDai',
                                'symbol': 'xDai',
                                'decimals': 18,
                            },
                            'blockExplorerUrls': ['https://blockscout.com/poa/xdai'],
                        },
                    ],
                    id: 1,
                }, console.log);
                break;
            case "celo":
                window.ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [
                        {
                            'chainId': '0xa4ec',
                            'chainName': 'Celo',
                            'rpcUrls': ['https://forno.celo.org'],
                            'nativeCurrency': {
                                'name': 'Celo',
                                'symbol': 'CELO',
                                'decimals': 18,
                            },
                            'blockExplorerUrls': ['https://explorer.celo.org'],
                        },
                    ],
                    id: 1,
                }, console.log);
                break;
            case "alfajores":
                window.ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [
                        {
                            'chainId': '0xaef3',
                            'chainName': 'Celo (Alfajores Testnet)',
                            'rpcUrls': ['https://alfajores-forno.celo-testnet.org'],
                            'nativeCurrency': {
                                'name': 'Celo',
                                'symbol': 'CELO',
                                'decimals': 18,
                            },
                            'blockExplorerUrls': ['https://alfajores-blockscout.celo-testnet.org'],
                        },
                    ],
                    id: 1,
                }, console.log);
                break;
            case "sokol":
                window.ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [
                        {
                            'chainId': '0x4d',
                            'chainName': 'Sokol Testnet',
                            'rpcUrls': ['https://sokol.poa.network'],
                            'nativeCurrency': {
                                'name': 'SPOA',
                                'symbol': 'SPOA',
                                'decimals': 18,
                            },
                            'blockExplorerUrls': ['https://blockscout.com/poa/sokol'],
                        },
                    ],
                    id: 1,
                }, console.log);
                break;
            }
        }

  }
};
</script>

<style scoped lang="scss">
@import '../vars';
.border-bottom {
  box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.15);
}
.network {
  color: #48a9a6 !important;
  font-size: 12px;
  font-weight: 200;
  align-self: flex-end;
}
.brand {
  margin-left: 20px;
  display: flex;
  align-items: center;
}
.title {
  margin-left: 2px;
  align-self: center;
  letter-spacing: 1px;
  font-size: 24px;
  font-weight: 500;
  color: white !important;
}
#topnav {
  z-index: 10;
  background-color: $panel-background;
}
</style>
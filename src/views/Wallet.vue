<template>
  <Page :requireLogin="true">
    <Container class="d-flex mb-3">
      <div class="flex-auto">
        <h3 v-text="$t('myWallet')" />
        <a :href="_etherscanLink(web3.account)" target="_blank">
          <span v-text="_shortenAddress(web3.account)" />
          <Icon name="external-link" size="16" class="ml-1 mr-2" />
        </a>
      </div>
      <UiButton class="button-yello px-5" @click="modalOpen.help = true">
        <Icon name="info" class="ml-n2 mr-1 v-align-middle" />
        Help
      </UiButton>
      <div class="text-right ml-3">
        <h3 v-text="_num(balancesTotalValue, 'usd-long')" />
        {{ $t('totalValue') }}
      </div>
    </Container>
    <UiTable>
      <UiTableTh>
        <div v-text="'Asset'" class="flex-auto text-left" />
        <div v-text="'Holdings'" class="column" />
      </UiTableTh>
      <UiTableTr v-for="(balance, i) in balances" :key="i">
        <Token :address="balance.address" class="mr-3" size="32" />
        <div class="text-left">
          <div v-text="balance.name" />
          <div v-text="balance.symbol" class="text-gray" />
        </div>
        <div class="flex-auto text-left">
          <div v-if="balance.address !== 'ether'" class="flex-auto">
            <UiButton
              v-if="balance.address === config.addresses.weth"
              @click="[(modalWrapperOpen = true), (side = 2)]"
              type="button"
              class="button-primary button-sm ml-2"
            >
              Unwrap to ETH
            </UiButton>
          </div>
          <div v-else class="flex-auto">
            <UiButton
              @click="[(modalWrapperOpen = true), (side = 1)]"
              type="button"
              class="button-primary button-sm ml-2"
            >
              Wrap to WETH
            </UiButton>
          </div>
          <div v-if="balance.address !== 'xdai'" class="flex-auto">
            <UiButton
              v-if="balance.address === config.addresses.wxdai"
              @click="[(modalWrapperOpen = true), (side = 2)]"
              type="button"
              class="button-primary button-sm ml-2"
            >
              Unwrap to XDAI
            </UiButton>
          </div>
          <div v-else class="flex-auto">
            <UiButton
              @click="[(modalWrapperOpen = true), (side = 1)]"
              type="button"
              class="button-primary button-sm ml-2"
            >
              Wrap to WXDAI
            </UiButton>
          </div>
          <div v-if="balance.address !== 'spoa'" class="flex-auto">
            <UiButton
              v-if="balance.address === config.addresses.wspoa"
              @click="[(modalWrapperOpen = true), (side = 2)]"
              type="button"
              class="button-primary button-sm ml-2"
            >
              Unwrap to SPOA
            </UiButton>
          </div>
          <div v-else class="flex-auto">
            <UiButton
              @click="[(modalWrapperOpen = true), (side = 1)]"
              type="button"
              class="button-primary button-sm ml-2"
            >
              Wrap to WSPOA
            </UiButton>
          </div>
        </div>
        <div class="column">
          <div>
            {{ _num(balance.balance, 'long') }}
            {{ balance.symbol }}
          </div>
          <div v-text="_num(balance.value, 'usd-long')" class="text-gray" />
        </div>
      </UiTableTr>
    </UiTable>
    <portal to="modal">
      <ModalWrapper
        :open="modalWrapperOpen"
        @close="modalWrapperOpen = false"
        :side="side"
      />
      <ModalHelpBalance
        :open="modalOpen.help"
        @close="modalOpen.help = false"
      />
    </portal>
  </Page>
</template>

<script>
import { formatUnits } from '@ethersproject/units';

export default {
  data() {
    return {
      modalWrapperOpen: false,
      side: 0,
      modalOpen: {
        help: false
      }
    };
  },
  computed: {
    balances() {
      if (process.env.VUE_APP_NETWORK === 'xdai') {
        const balances = Object.entries(this.web3.balances)
          .filter(
            ([address]) =>
              address !== 'xdai' && this.web3.tokenMetadata[address]
          )
          .map(([address, denormBalance]) => {
            const price = this.price.values[address];
            const balance = formatUnits(
              denormBalance,
              this.web3.tokenMetadata[address].decimals
            );
            return {
              address,
              name: this.web3.tokenMetadata[address].name,
              symbol: this.web3.tokenMetadata[address].symbol,
              price,
              balance,
              value: balance * price
            };
          })
          .filter(({ value }) => value > 0.001);
        const xdaiPrice = this.price.values[this.config.addresses.wxdai];
        const xdaiBalance = formatUnits(this.web3.balances['xdai'] || 0, 18);
        return [
          {
            address: 'xdai',
            name: 'XDAI',
            symbol: 'XDAI',
            price: xdaiPrice,
            balance: xdaiBalance,
            value: xdaiPrice * xdaiBalance
          },
          ...balances
        ];
      } else if (process.env.VUE_APP_NETWORK === 'sokol') {
        const balances = Object.entries(this.web3.balances)
          .filter(
            ([address]) =>
              address !== 'spoa' && this.web3.tokenMetadata[address]
          )
          .map(([address, denormBalance]) => {
            const price = this.price.values[address];
            const balance = formatUnits(
              denormBalance,
              this.web3.tokenMetadata[address].decimals
            );
            return {
              address,
              name: this.web3.tokenMetadata[address].name,
              symbol: this.web3.tokenMetadata[address].symbol,
              price,
              balance,
              value: balance * price
            };
          })
          .filter(({ value }) => value > 0.001);
        const spoaPrice = this.price.values[this.config.addresses.wspoa];
        const spoaBalance = formatUnits(this.web3.balances['spoa'] || 0, 18);
        return [
          {
            address: 'spoa',
            name: 'SPOA',
            symbol: 'SPOA',
            price: spoaPrice,
            balance: spoaBalance,
            value: spoaPrice * spoaBalance
          },
          ...balances
        ];
      } else if (
        process.env.VUE_APP_NETWORK === 'celo' ||
        process.env.VUE_APP_NETWORK === 'alfajores'
      ) {
        const balances = Object.entries(this.web3.balances)
          .filter(
            ([address]) =>
              address !== 'celo' && this.web3.tokenMetadata[address]
          )
          .map(([address, denormBalance]) => {
            const price = this.price.values[address];
            const balance = formatUnits(
              denormBalance,
              this.web3.tokenMetadata[address].decimals
            );
            return {
              address,
              name: this.web3.tokenMetadata[address].name,
              symbol: this.web3.tokenMetadata[address].symbol,
              price,
              balance,
              value: balance * price
            };
          })
          .filter(({ value }) => value > 0.001);
        return [...balances];
      } else {
        const balances = Object.entries(this.web3.balances)
          .filter(
            ([address]) =>
              address !== 'ether' && this.web3.tokenMetadata[address]
          )
          .map(([address, denormBalance]) => {
            const price = this.price.values[address];
            const balance = formatUnits(
              denormBalance,
              this.web3.tokenMetadata[address].decimals
            );
            return {
              address,
              name: this.web3.tokenMetadata[address].name,
              symbol: this.web3.tokenMetadata[address].symbol,
              price,
              balance,
              value: balance * price
            };
          })
          .filter(({ value }) => value > 0.001);
        const ethPrice = this.price.values[this.config.addresses.weth];
        const ethBalance = formatUnits(this.web3.balances['ether'] || 0, 18);
        return [
          {
            address: 'ether',
            name: 'ETH',
            symbol: 'ETH',
            price: ethPrice,
            balance: ethBalance,
            value: ethPrice * ethBalance
          },
          ...balances
        ];
      }
    },
    balancesTotalValue() {
      return this.balances.reduce((a, b) => a + b.value, 0);
    }
  }
};
</script>

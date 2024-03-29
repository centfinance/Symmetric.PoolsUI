<template>
  <UiModal :open="open" @close="$emit('close')" style="max-width: 440px">
    <UiModalForm @submit="handleSubmit">
      <template slot="header">
        <h3 v-text="$t('editTokenWeights')" class="text-white" />
      </template>
      <UiTable class="m-4">
        <UiTableTh>
          <div v-text="$t('tokens')" class="flex-auto text-left" />
          <div v-text="$t('weights')" class="column-sm" />
          <div v-text="$t('percent')" class="column" />
        </UiTableTh>
        <UiTableTr v-for="(token, i) in pool.tokens" :key="token.checksum">
          <Token :address="token.checksum" size="28" class="mr-2" />
          <div class="flex-auto text-left">
            {{ _ticker(token.checksum) }}
          </div>
          <div class="column-sm text-right">
            <input
              :value="weights[i]"
              class="input text-right ml-4"
              placeholder="0.0"
              @input="
                e => {
                  handleInputChange(i, e.target.value);
                }
              "
            />
          </div>
          <div
            class="column text-right"
            v-text="_num((weights[i] / totalWeight).toFixed(4), 'percent')"
          />
        </UiTableTr>
      </UiTable>
      <div v-if="isLocked" class="my-2 text-center">
        {{ $t('unlock') }} {{ _ticker(tokenToSpend) }} {{ $t('toContinue') }}.
        <ButtonUnlock :tokenAddress="tokenToSpend" :amount="amountToSpend" />
      </div>
      <template slot="footer">
        <UiButton @click="$emit('close')" type="button" class="mx-1">
          {{ $t('cancel') }}
        </UiButton>
        <UiButton
          :disabled="loading || !isValid"
          :loading="loading"
          type="submit"
          class="button-primary mx-1"
        >
          {{ $t('confirm') }}
        </UiButton>
      </template>
    </UiModalForm>
  </UiModal>
</template>

<script>
import { getAddress } from '@ethersproject/address';
import { mapActions } from 'vuex';
import {
  calcSingleInGivenWeightIncrease,
  calcPoolInGivenWeightDecrease
} from '@/helpers/math';
import { bnum, toWei, scale, isLocked } from '@/helpers/utils';

export default {
  props: ['open', 'pool', 'defaultValue'],
  data() {
    return {
      loading: false,
      tokenIndex: 0,
      weights: []
    };
  },
  watch: {
    open() {
      this.loading = false;
      this.weights = this.pool.tokens.map(
        token => 2 * parseFloat(token.denormWeight)
      );
    }
  },
  computed: {
    totalWeight() {
      return this.weights.reduce((a, b) => a + parseFloat(b), 0);
    },
    tokenToSpend() {
      if (this.isWeightIncrease) {
        return this.pool.tokens[this.tokenIndex].checksum;
      }
      if (this.isWeightDecrease) {
        return getAddress(this.pool.controller);
      }
      return undefined;
    },
    amountToSpend() {
      const token = this.pool.tokens[this.tokenIndex];
      if (this.isWeightIncrease) {
        const tokenAmountIn = calcSingleInGivenWeightIncrease(
          scale(bnum(token.balance), token.decimals),
          toWei(token.denormWeight),
          toWei(this.weights[this.tokenIndex])
        );
        return tokenAmountIn.toString();
      }
      if (this.isWeightDecrease) {
        const totalWeight =
          this.totalWeight +
          2 * parseFloat(token.denormWeight) -
          parseFloat(this.weights[this.tokenIndex]);
        const poolAmountIn = calcPoolInGivenWeightDecrease(
          toWei(totalWeight),
          toWei(token.denormWeight).times(2),
          toWei(this.weights[this.tokenIndex]),
          bnum(this.pool.metadata.totalShares)
        );
        return poolAmountIn.toString();
      }
      return '0';
    },
    isLocked() {
      if (!this.tokenToSpend) {
        return false;
      }
      return isLocked(
        this.web3.allowances,
        this.tokenToSpend,
        this.web3.dsProxyAddress,
        this.amountToSpend,
        this.web3.tokenMetadata[this.tokenToSpend].decimals
      );
    },
    isWeightIncrease() {
      const weight =
        2 * parseFloat(this.pool.tokens[this.tokenIndex].denormWeight);
      const newWeight = parseFloat(this.weights[this.tokenIndex]);
      return newWeight > weight;
    },
    isWeightDecrease() {
      const weight =
        2 * parseFloat(this.pool.tokens[this.tokenIndex].denormWeight);
      const newWeight = parseFloat(this.weights[this.tokenIndex]);
      return newWeight < weight;
    },
    isValid() {
      const isWeightChange = this.isWeightIncrease || this.isWeightDecrease;
      const correctWeight = this.totalWeight >= 2 && this.totalWeight <= 100;
      return isWeightChange && correctWeight;
    }
  },
  methods: {
    ...mapActions(['increaseWeight', 'decreaseWeight']),
    handleInputChange(i, weight) {
      this.tokenIndex = i;
      this.weights = this.pool.tokens.map(
        token => 2 * parseFloat(token.denormWeight)
      );
      this.weights[i] = weight;
    },
    async handleSubmit() {
      this.loading = true;
      const token = this.pool.tokens[this.tokenIndex];
      if (this.isWeightIncrease) {
        const tokenWeiAmountIn = bnum(this.amountToSpend);
        const tokenAmountIn = scale(tokenWeiAmountIn, -token.decimals);
        await this.increaseWeight({
          poolAddress: this.pool.controller,
          token: token.checksum,
          newWeight: this.weights[this.tokenIndex],
          tokenAmountIn
        });
      } else {
        const poolWeiAmountIn = bnum(this.amountToSpend);
        const poolAmountIn = scale(poolWeiAmountIn, -18);
        await this.decreaseWeight({
          poolAddress: this.pool.controller,
          token: token.checksum,
          newWeight: this.weights[this.tokenIndex],
          poolAmountIn
        });
      }
      this.$emit('close');
      this.loading = false;
    }
  }
};
</script>

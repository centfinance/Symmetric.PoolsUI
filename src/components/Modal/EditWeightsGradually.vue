<template>
  <UiModal :open="open" @close="$emit('close')" style="max-width: 440px;">
    <UiModalForm @submit="handleSubmit">
      <template slot="header">
        <h3 class="text-white">Gradual weight update</h3>
      </template>
      <UiTable>
        <UiTableTh>
          <div class="flex-auto text-left">Tokens</div>
          <div class="column-sm">Weights</div>
          <div class="column">Percent</div>
        </UiTableTh>
        <UiTableTr v-for="(token, i) in pool.tokens" :key="token.checksum">
          <Token :address="token.checksum" size="28" class="mr-2" />
          <div class="flex-auto text-left">
            {{ _ticker(token.checksum) }}
          </div>
          <div class="column-sm text-right">
            <input
              v-model="weights[i]"
              class="input text-right ml-4"
              placeholder="0.0"
            />
          </div>
          <div class="column text-right">
            {{
              _num(
                (
                  (2 * parseFloat(pool.tokens[i].denormWeight)) /
                  oldTotalWeight
                ).toFixed(4),
                'percent'
              )
            }}
            → {{ _num((weights[i] / totalWeight).toFixed(4), 'percent') }}
          </div>
        </UiTableTr>
      </UiTable>
      <div class="ml-2 my-2">
        Start block:
        <input
          v-model="startBlock"
          class="input input-blocknumber text-right ml-2"
          placeholder="0.0"
        />
        {{ formatBlockNumber(startBlock) }}
      </div>
      <div class="ml-2 my-2">
        End block:
        <input
          v-model="endBlock"
          class="input input-blocknumber text-right ml-2"
          placeholder="0.0"
        />
        {{ formatBlockNumber(endBlock) }}
      </div>
      <template slot="footer">
        <UiButton @click="$emit('close')" type="button" class="mx-1">
          Cancel
        </UiButton>
        <UiButton
          :disabled="loading || !isValid"
          :loading="loading"
          type="submit"
          class="button-primary mx-1"
        >
          Confirm
        </UiButton>
      </template>
    </UiModalForm>
  </UiModal>
</template>

<script>
import { getAddress } from '@ethersproject/address';
import { mapActions } from 'vuex';

import { blockNumberToTimestamp } from '@/helpers/utils';

const BLOCK_BUFFER = 100;

export default {
  props: ['open', 'pool'],
  data() {
    return {
      loading: false,
      weights: [],
      currentTime: 0,
      startBlock: 0,
      endBlock: 0
    };
  },
  watch: {
    async open(value) {
      if (value) {
        this.loading = false;
        this.weights = this.pool.tokens.map(
          token => 2 * parseFloat(token.denormWeight)
        );
        await this.getLatestBlock();
        this.currentTime = Date.now();
        this.startBlock = this.web3.blockNumber + BLOCK_BUFFER;
        this.endBlock = this.startBlock + this.minimumWeightChangeBlockPeriod;
      }
    }
  },
  computed: {
    oldTotalWeight() {
      return this.pool.tokens.reduce(
        (a, b) => a + 2 * parseFloat(b.denormWeight),
        0
      );
    },
    totalWeight() {
      return this.weights.reduce((a, b) => a + parseFloat(b), 0);
    },
    minimumWeightChangeBlockPeriod() {
      const crp = this.web3.crps[getAddress(this.pool.controller)];
      if (!crp) {
        return 0;
      }
      return crp.minimumWeightChangeBlockPeriod;
    },
    isValid() {
      const correctStartBlock = this.startBlock >= this.web3.blockNumber;
      const correctEndBlock =
        this.endBlock - this.startBlock >= this.minimumWeightChangeBlockPeriod;
      const correctBlocks = correctStartBlock && correctEndBlock;
      const correctWeight = this.totalWeight >= 2 && this.totalWeight <= 100;
      return correctBlocks && correctWeight;
    }
  },
  methods: {
    ...mapActions(['updateWeightsGradually', 'getLatestBlock']),
    async handleSubmit() {
      this.loading = true;
      const newWeights = {};
      for (let i = 0; i < this.pool.tokens.length; i++) {
        const token = this.pool.tokens[i];
        newWeights[token.checksum] = this.weights[i];
      }
      await this.updateWeightsGradually({
        poolAddress: this.pool.controller,
        tokens: this.pool.tokensList,
        newWeights,
        startBlock: this.startBlock,
        endBlock: this.endBlock
      });
      this.$emit('close');
      this.loading = false;
    },
    formatBlockNumber(blockNumber) {
      const blockTimestamp = blockNumberToTimestamp(
        this.currentTime,
        this.web3.blockNumber,
        blockNumber
      );
      const blockDate = new Date(blockTimestamp);
      return blockDate.toLocaleString('en-US');
    }
  }
};
</script>

<style scoped>
.input-blocknumber {
  width: 120px;
}
</style>
<template>
  <div>
    <div class="d-flex flex-items-center px-4 px-md-0 mb-3">
      <h4 v-text="$t('tokenSymbol')" class="flex-auto section-title" />
    </div>
    <div class="mb-4">
      <input
        class="input pool-input text-right text-white"
        :value="tokenSymbol"
        @change="$emit('change-symbol', $event.target.value)"
        placeholder="CPT"
      />
    </div>
    <div class="d-flex flex-items-center px-4 px-md-0 mb-3">
      <h4 v-text="$t('tokenName')" class="flex-auto section-title" />
    </div>
    <div class="mb-4">
      <input
        class="input pool-input text-right text-white"
        :value="tokenName"
        @change="$emit('change-name', $event.target.value)"
        placeholder="Symmetric Smart Pool"
      />
    </div>
    <div class="d-flex flex-items-center px-4 px-md-0 mb-3">
      <h4 v-text="$t('initialSupply')" class="flex-auto section-title" />
    </div>
    <div class="mb-4">
      <input
        class="ml-2 input pool-input text-right text-white"
        :value="initialSupply"
        type="number"
        :min="100"
        :max="1000000000"
        :step="100"
        @change="$emit('change-initial-supply', $event.target.value)"
        placeholder="100"
      />
    </div>
    <div class="d-flex flex-items-center px-4 px-md-0 mb-3">
      <h4 v-text="$t('rights')" class="flex-auto section-title" />
    </div>
    <div>
      <div class="d-flex flex-column">
        <UiCheckbox
          :checked="rights.canPauseSwapping"
          @change="$emit('toggle-right', 'canPauseSwapping')"
        >
          <span v-text="$t('canPauseSwapping')" class="ml-2 text-white" />
        </UiCheckbox>
        <UiCheckbox
          :checked="rights.canChangeSwapFee"
          @change="$emit('toggle-right', 'canChangeSwapFee')"
        >
          <span v-text="$t('canChangeSwapFee')" class="ml-2 text-white" />
        </UiCheckbox>
        <UiCheckbox
          :checked="rights.canChangeWeights"
          @change="$emit('toggle-right', 'canChangeWeights')"
        >
          <span v-text="$t('canChangeWeights')" class="ml-2 text-white" />
        </UiCheckbox>
        <div v-if="rights.canChangeWeights">
          <span v-text="$t('minimumUpdatePeriod')" />
          <input
            class="ml-2 input pool-input text-right text-white"
            type="number"
            :value="minimumWeightChangeBlockPeriod"
            :min="0"
            :step="10"
            @change="$emit('change-weight-period', $event.target.value)"
            placeholder="10"
          />
        </div>
        <UiCheckbox
          :checked="rights.canAddRemoveTokens"
          @change="$emit('toggle-right', 'canAddRemoveTokens')"
        >
          <span v-text="$t('canAddRemoveTokens')" class="ml-2 text-white" />
        </UiCheckbox>
        <div v-if="rights.canAddRemoveTokens">
          <span v-text="$t('addTokenTimelock')" />
          <input
            class="ml-2 input pool-input text-right text-white"
            type="number"
            :min="0"
            :step="10"
            :value="addTokenTimeLockInBlocks"
            @change="$emit('change-add-timelock', $event.target.value)"
            placeholder="10"
          />
        </div>
        <UiCheckbox
          :checked="rights.canWhitelistLPs"
          @change="$emit('toggle-right', 'canWhitelistLPs')"
        >
          <span v-text="$t('canWhitelistLPs')" class="ml-2 text-white" />
        </UiCheckbox>
        <UiCheckbox
          :checked="rights.canChangeCap"
          @change="$emit('toggle-right', 'canChangeCap')"
        >
          <span v-text="$t('canChangeCap')" class="ml-2 text-white" />
        </UiCheckbox>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    'tokenSymbol',
    'tokenName',
    'rights',
    'minimumWeightChangeBlockPeriod',
    'addTokenTimeLockInBlocks',
    'initialSupply'
  ]
};
</script>

<style scoped lang="scss">
.section-title {
  color: var(--text-primary-color);
}
.pool-input {
  width: 100px;

  &.text-white {
    color: var(--text-primary-color) !important;
  }
}
.text-white {
  color: var(--text-primary-color) !important;
}
</style>

<template>
  <UiModal :open="open" @close="$emit('close')" style="max-width: 440px">
    <h3 class="m-4 mb-0 text-center about-title">About</h3>
    <div class="m-4 mb-0 p-4 border rounded-2 text-white">
      <div class="d-flex">
        <span v-text="$t('version')" class="flex-auto text-gray mr-1" />
        <span class="value">{{ pkg.version }}</span>
        <span v-if="commitSha" v-text="`#${commitSha.slice(0, 7)}`" />
      </div>
      <div class="d-flex">
        <span v-text="$t('license')" class="flex-auto text-gray mr-1" />
        <span class="value">{{ pkg.license }}</span>
      </div>
      <div class="d-flex">
        <span v-text="$t('network')" class="flex-auto text-gray mr-1" />
        <span class="value">{{
          config.network === 'homestead' ? 'mainnet' : config.network
        }}</span>
      </div>
      <div class="d-flex">
        <span v-text="$t('blockNumber')" class="flex-auto text-gray mr-1" />
        <span class="value">{{ _num(web3.blockNumber, 'long') }}</span>
      </div>
    </div>
    <div class="m-4">
      <a
        :href="`https://github.com/${pkg.repository}`"
        target="_blank"
        class="mb-2 d-block"
      >
        <UiButton class="button-outline width-full">
          <Icon name="github" class="mr-1" />
          {{ pkg.repository }}
          <Icon name="external-link" class="ml-1" />
        </UiButton>
      </a>
    </div>
  </UiModal>
</template>

<script>
import pkg from '@/../package.json';

const commitSha = process.env.VUE_APP_COMMIT_SHA;

export default {
  props: ['open'],
  data() {
    return {
      pkg,
      commitSha
    };
  }
};
</script>

<style scoped lang="scss">
.about-title,
.value {
  color: var(--text-primary-color);
}
</style>

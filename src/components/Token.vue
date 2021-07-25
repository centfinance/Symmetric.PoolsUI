<template>
  <span
    class="circle bg-white overflow-hidden d-inline-block"
    style="line-height: 0;"
  >
    <img
      v-if="tokenLogoUrl && !loadingFailed"
      :src="tokenLogoUrl"
      :style="style"
      :title="symbol"
      @error="handleError"
    />
    <Avatar :size="size" :address="address" v-else />
  </span>
</template>

<script>
import { getTokenLogoUrl } from '@/_balancer/utils';

export default {
  props: ['address', 'symbol', 'size', 'custom'],
  data() {
    return {
      loadingFailed: false
    };
  },
  computed: {
    style() {
      const size = this.size || 22;
      return {
        width: `${size}px`,
        height: `${size}px`,
        lineHeight: `${size}px`,
        fontSize: `${(size / 2).toFixed()}px`
      };
    },
    tokenLogoUrl() {
      if (this.custom)
        return `https://raw.githubusercontent.com/centfinance/cent.dex_assets/master/assets/${this.address.toLowerCase()}.png`;
      if (this.address == 'xdai')
        return `https://raw.githubusercontent.com/centfinance/assets/master/blockchains/xdai/assets/0xe91D153E0b41518A2Ce8Dd3D7944Fa863463a97d/logo.png`;
      if (this.address == 'celo' || this.address == 'spoa')
        return `https://raw.githubusercontent.com/centfinance/assets/master/blockchains/celo/assets/0x471EcE3750Da237f93B8E339c536989b8978a438/logo.png`;
      return getTokenLogoUrl(this.address);
    }
  },
  methods: {
    handleError() {
      this.loadingFailed = true;
    }
  }
};
</script>
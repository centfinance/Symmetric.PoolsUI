<template>
  <UiModal :open="open" @close="$emit('close')" style="max-width: 440px">
    <h4 class="m-4 mb-0 text-center">Can't see your coins or ETH balance?</h4>
    <div style="font-weight: 300" class="m-4 p-4 border rounded-2 text-white">
      <div>
        <div class="vc_tta-panel-body" style="">
          <div class="wpb_text_column wpb_content_element">
            <div class="wpb_wrapper">
              <span
                ><span
                  >As Symmetric is running on Gnosis and if you have your
                  coins/tokens visible on Ethereum then you need to bring them
                  over to Gnosis network. <br /><br />
                  <p>
                    Bringing your ETH tokens is a very simple process, you can
                    follow the instructions at:
                    <a
                      class="orange"
                      target="_blank"
                      href="https://docs.tokenbridge.net/eth-xdai-amb-bridge/multi-token-extension/ui-to-transfer-tokens/transfer-erc20"
                      >Omnibridge <Icon name="external-link" class="ml-1" /></a
                    ><br /><br />
                    Or any other bridge that can transfer your coins from other
                    network to Gnosis network.
                  </p></span
                ></span
              ><br />
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <h4 v-if="this.currentTopic == 'balance'" class="m-4 mb-0 text-center">
      Can't see your coins? No problem {{ this.currentTopic }}
    </h4>

    <div v-if="this.currentTopic == 'balance'">
      
    </div> -->
    {{ this.currentTopic }}
  </UiModal>
</template>

<script>
import pkg from '@/../package.json';

const commitSha = process.env.VUE_APP_COMMIT_SHA;

export default {
  props: {
    open: Boolean,
    topic: String
  },
  data() {
    return {
      pkg,
      commitSha
    };
  },
  currentTopic() {
    return this.topic;
  }
};
</script>

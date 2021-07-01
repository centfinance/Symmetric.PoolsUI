<template>
  <UiModal :open="open" @close="$emit('close')" style="max-width: 440px;">
    <h4 :topic="metamask" class="m-4 mb-0 text-center">
      How to Set-up MetaMask for Symmetric
    </h4>
    <div
      :topic="metamask"
      style="font-weight: 300;"
      class="m-4 mb-0 p-4 border rounded-2 text-white"
    >
      <div>
        <div class="vc_tta-panel-body" style="">
          <div class="wpb_text_column wpb_content_element ">
            <div class="wpb_wrapper">
              <ol>
                <li>
                  <span
                    ><span
                      >Open Metamask, and select “Custom RPC” from the Network
                      Dropdown.<br /><br />
                      <img
                        loading="lazy"
                        src="https://symmetric.finance/wp-content/uploads/2021/06/xdai-setup-208x300.png"
                        alt=""
                        width="208"
                        height="300"
                        class="alignnone size-medium wp-image-1063"
                        srcset="
                          https://symmetric.finance/wp-content/uploads/2021/06/xdai-setup-208x300.png  208w,
                          https://symmetric.finance/wp-content/uploads/2021/06/xdai-setup-709x1024.png 709w,
                          https://symmetric.finance/wp-content/uploads/2021/06/xdai-setup-768x1109.png 768w,
                          https://symmetric.finance/wp-content/uploads/2021/06/xdai-setup.png          834w
                        "
                        sizes="(max-width: 208px) 100vw, 208px"/></span></span
                  ><br />
                </li>
                <li>
                  <p>
                    <span
                      ><span
                        >In the “Custom RPC” Settings, add in the xDai network
                        details and click
                        <strong class="bold-3c254bd9" data-slate-leaf="true"
                          >Save</strong
                        >:</span
                      ></span
                    >
                  </p>
                  <ul>
                    <li class="">
                      <div>
                        <p>
                          <span
                            ><span
                              >Network Name: <strong>xDai</strong></span
                            ></span
                          >
                        </p>
                      </div>
                    </li>
                    <li class="">
                      <div>
                        <p>
                          <span
                            ><span>New RPC URL: </span
                            ><a
                              href="https://rpc.xdaichain.com/"
                              target="_blank"
                              rel="noopener noreferrer"
                              ><span
                                ><strong
                                  class="bold-3c254bd9"
                                  data-slate-leaf="true"
                                  >https://rpc.xdaichain.com/</strong
                                ></span
                              ></a
                            ><span></span
                          ></span>
                        </p>
                      </div>
                    </li>
                    <li class="">
                      <div>
                        <p>
                          <span
                            ><span>Chain ID: <strong>0x64</strong></span></span
                          >
                        </p>
                      </div>
                    </li>
                    <li class="">
                      <div>
                        <p>
                          <span
                            ><span>Symbol: <strong>xDai</strong></span></span
                          >
                        </p>
                      </div>
                    </li>
                    <li class="">
                      <div>
                        <p>
                          <span
                            ><span>Block Explorer URL: </span
                            ><a
                              class="link-a079aa82--primary-53a25e66--link-faf6c434"
                              href="https://blockscout.com/xdai/mainnet/"
                              target="_blank"
                              rel="noopener noreferrer"
                              ><span
                                ><strong
                                  class="bold-3c254bd9"
                                  data-slate-leaf="true"
                                  >https://blockscout.com/xdai/mainnet</strong
                                ></span
                              ></a
                            ></span
                          >
                        </p>
                      </div>
                    </li>
                  </ul>
                </li>
              </ol>
              <!-- <p>
                <span
                  ><span
                    >Note: Chain ID 0x64 is the hexadecimal equivalent of 100,
                    which is the xDai chain ID. MetaMask recently updated the
                    ChainID to be a required field. When you update, you may
                    need to reenter the Chain ID: 100, and it will be converted
                    to hexadecimal: 0x64<strong>.</strong></span
                  ></span
                >
              </p> -->
              <p>
                <span
                  ><span
                    ><strong
                      >If you are having issues, try entering 100 for Chain ID
                      and resaving the configuration.</strong
                    ></span
                  ></span
                >
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <h4 :topic="balance" class="m-4 mb-0 text-center">
      How to bring your coins xDai
    </h4>
    <div>
      Help for bringin coins to xDai
      </div>
  </UiModal>
</template>

<script>
import pkg from '@/../package.json';

const commitSha = process.env.VUE_APP_COMMIT_SHA;

export default {
  props: ['open', 'topic'],
  data() {
    return {
      pkg,
      commitSha
    };
  }
};
</script>

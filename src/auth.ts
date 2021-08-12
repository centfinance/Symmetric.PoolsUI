import Vue from 'vue';
import { LockPlugin } from './connectors/plugins/vue';
import injected from './connectors/injected';
import celo from './connectors/celo';
import fortmatic from './connectors/fortmatic';
import portis from './connectors/portis';
import walletconnect from './connectors/walletconnect';
import walletlink from './connectors/walletlink';
import config from '@/config';

const options: any = { connectors: [] };
const connectors = { injected, celo, fortmatic, portis, walletconnect, walletlink };

Object.entries(config.connectors).forEach((connector: any) => {
  options.connectors.push({
    key: connector[0],
    connector: connectors[connector[0]],
    options: connector[1].options
  });
});

Vue.use(LockPlugin, options);

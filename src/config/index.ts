import merge from 'lodash/merge';
import registry from '@centfinance/cent.dex_assets/generated/pm/registry.homestead.json';
import registryKovan from '@centfinance/cent.dex_assets/generated/pm/registry.kovan.json';
import registrySokol from '@centfinance/cent.dex_assets/generated/pm/registry.sokol.json';
import registryxDai from '@centfinance/cent.dex_assets/generated/pm/registry.xdai.json';
import homestead from '@/config/homestead.json';
import kovan from '@/config/kovan.json';
import sokol from '@/config/sokol.json';
import xdai from '@/config/xdai.json';

const configs = { homestead, kovan, xdai, sokol };
configs.homestead = merge(registry, configs.homestead);
configs.kovan = merge(registryKovan, configs.kovan);
configs.sokol = merge(registrySokol, configs.sokol);
configs.xdai = merge(registryxDai, configs.xdai);
const network = process.env.VUE_APP_NETWORK || 'homestead';
const config = configs[network];
config.env = process.env.VUE_APP_ENV || 'staging';

export default config;

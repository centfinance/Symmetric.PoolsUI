import merge from 'lodash/merge';
import registry from '@centfinance/cent.dex_assets/generated/pm/registry.homestead.json';
import registryKovan from '@centfinance/cent.dex_assets/generated/pm/registry.kovan.json';
import registrySokol from '@centfinance/cent.dex_assets/generated/pm/registry.sokol.json';
import registryxDai from '@centfinance/cent.dex_assets/generated/pm/registry.xdai.json';
import registryAlfajores from '@centfinance/cent.dex_assets/generated/pm/registry.alfajores.json';
import registryCelo from '@centfinance/cent.dex_assets/generated/pm/registry.celo.json';
import registryAvalanche from '@centfinance/cent.dex_assets/generated/pm/registry.avalanche.json';
import registryFantom from '@centfinance/cent.dex_assets/generated/pm/registry.fantom.json';
import registryOptimism from '@centfinance/cent.dex_assets/generated/pm/registry.optimism.json';
import registryPolygon from '@centfinance/cent.dex_assets/generated/pm/registry.polygon.json';
import homestead from '@/config/homestead.json';
import kovan from '@/config/kovan.json';
import sokol from '@/config/sokol.json';
import xdai from '@/config/xdai.json';
import celo from '@/config/celo.json';
import alfajores from '@/config/alfajores.json';
import avalanche from '@/config/avalanche.json';
import fantom from '@/config/fantom.json';
import optimism from '@/config/optimism.json';
import polygon from '@/config/polygon.json';

const configs = {
  homestead,
  kovan,
  xdai,
  sokol,
  celo,
  alfajores,
  avalanche,
  fantom,
  optimism,
  polygon
};
configs.homestead = merge(registry, configs.homestead);
configs.kovan = merge(registryKovan, configs.kovan);
configs.sokol = merge(registrySokol, configs.sokol);
configs.xdai = merge(registryxDai, configs.xdai);
configs.alfajores = merge(registryAlfajores, configs.alfajores);
configs.celo = merge(registryCelo, configs.celo);
configs.avalanche = merge(registryAvalanche, configs.avalanche);
configs.fantom = merge(registryFantom, configs.fantom);
configs.optimism = merge(registryOptimism, configs.optimism);
configs.polygon = merge(registryPolygon, configs.polygon);
const network = process.env.VUE_APP_NETWORK || 'homestead';
const config = configs[network];
config.env = process.env.VUE_APP_ENV || 'staging';

export default config;

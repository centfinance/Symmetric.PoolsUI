import numeral from 'numeral';
import { getAddress } from '@ethersproject/address';
import { MaxUint256 } from '@ethersproject/constants';
import { Contract } from '@ethersproject/contracts';
import { Provider } from '@ethersproject/providers';
import { Wallet } from '@ethersproject/wallet';
import BigNumber from '@/helpers/bignumber';
import store from '@/store';
import config from '@/config';
import i18n from '@/i18n';
import { getFactors } from '@/helpers/miningFactors';
import merge from 'lodash/merge';
import queries from '@/helpers/queries.json';
import { subgraphRequest } from '@/_balancer/utils';
import cloneDeep from 'lodash/cloneDeep';
import { getPoolLiquidity } from '@/helpers/price';
import { specificPools, crPoolIds, symmv1Pools } from '@/helpers/constants';

export const ITEMS_PER_PAGE = 20;
export const MAX_GAS = new BigNumber('0xffffffff');
export const MAX_UINT = MaxUint256;
export const POOL_TOKENS_DECIMALS = 18;
export const GAS_LIMIT_BUFFER = 0.1;
export const MAX =
  '115792089237316195423570985008687907853269984665640564039457.584007913129639935';
export const EDIT_POOL_GOOGLE_FORM =
  'https://docs.google.com/forms/d/e/1FAIpQLSe_sIVqZCL0rO--8u3PUUNGuxZ68LviAZBtrqV4gVTeTxzHCA/viewform';

export const amplAddress = '0xD46bA6D942050d489DBd938a2C909A5d5039A161';
export const validAmplPools = ['0xa751a143f8fe0a108800bfb915585e4255c2fe80'];

export const unknownColors = [
  '#5d6872',
  '#7e9e99',
  '#9d9f7f',
  '#68aca9',
  '#a593a5',
  '#387080',
  '#c7bdf4',
  '#c28d75'
];

export const capInputOptions = {
  NUMERIC: i18n.tc('value'),
  UNLIMITED: i18n.tc('unlimited')
};

export const liquidityToggleOptions = {
  MULTI_ASSET: i18n.tc('multiAsset'),
  SINGLE_ASSET: i18n.tc('singleAsset')
};

export const poolTypes = {
  SHARED_POOL: i18n.tc('shared'),
  SMART_POOL: i18n.tc('smart')
};

export const poolRights = {
  canPauseSwapping: i18n.tc('canPauseSwapping'),
  canChangeSwapFee: i18n.tc('canChangeSwapFee'),
  canChangeWeights: i18n.tc('canChangeWeights'),
  canAddRemoveTokens: i18n.tc('canAddRemoveTokens'),
  canWhitelistLPs: i18n.tc('canWhitelistLPs'),
  canChangeCap: i18n.tc('canChangeCap')
};

export function jsonParse(input, fallback?) {
  try {
    return JSON.parse(input);
  } catch (err) {
    return fallback || undefined;
  }
}

export function shortenAddress(str = '') {
  return str ? `${str.slice(0, 6)}...${str.slice(str.length - 4)}` : str;
}

export function shorten(str = '', max = 14) {
  return str.length > max ? `${str.slice(0, max)}...` : str;
}

export function bnum(val: string | number | BigNumber): BigNumber {
  const number = typeof val === 'string' ? val : val ? val.toString() : '0';
  return new BigNumber(number);
}

export function scale(input: BigNumber, decimalPlaces: number): BigNumber {
  const scalePow = new BigNumber(decimalPlaces.toString());
  const scaleMul = new BigNumber(10).pow(scalePow);
  return input.times(scaleMul);
}

export function toWei(val: string | BigNumber): BigNumber {
  return scale(bnum(val.toString()), 18).integerValue();
}

export function denormalizeBalance(
  amount: BigNumber,
  tokenDecimals: number
): BigNumber {
  return scale(bnum(amount), tokenDecimals);
}

export function normalizeBalance(
  amount: BigNumber,
  tokenDecimals: number
): BigNumber {
  return scale(bnum(amount), -tokenDecimals);
}

export function isLocked(
  allowances,
  tokenAddress,
  spender,
  rawAmount,
  decimals
) {
  const tokenAllowance = allowances[tokenAddress];
  if (!tokenAllowance || !tokenAllowance[spender]) {
    return true;
  }
  if (!rawAmount) {
    return false;
  }
  const amount = denormalizeBalance(rawAmount, decimals);
  return amount.gt(tokenAllowance[spender]);
}

export async function getSYMMPriceXDAI() {
  try {
    const response = await subgraphRequest(
      config.subgraphUrlXDAI,
      queries['getSYMMPrice']
    );
    return response.tokenPrices[0].price;
  } catch (e) {
    console.error(e);
  }
}
export async function getSYMMPriceCELO() {
  try {
    const response = await subgraphRequest(
      config.subgraphUrlCELO,
      queries['getSYMM2PriceCELO']
    );
    return response.tokenPrices[0].price;
  } catch (e) {
    console.error(e);
  }
}
export async function getSYMMPriceAVALANCHE() {
  try {
    const response = await subgraphRequest(
      config.subgraphUrlAVALANCHE,
      queries['getSYMMPrice']
    );
    return response.tokenPrices[0].price;
  } catch (e) {
    console.error(e);
  }
}
export async function getSYMMPriceFANTOM() {
  try {
    const response = await subgraphRequest(
      config.subgraphUrlFANTOM,
      queries['getSYMMPrice']
    );
    return response.tokenPrices[0].price;
  } catch (e) {
    console.error(e);
  }
}
export async function getSYMMPriceOPTIMISM() {
  try {
    const response = await subgraphRequest(
      config.subgraphUrlOPTIMISM,
      queries['getSYMMPrice']
    );
    return response.tokenPrices[0].price;
  } catch (e) {
    console.error(e);
  }
}
export async function getSYMMPricePOLYGON() {
  try {
    const response = await subgraphRequest(
      config.subgraphUrlPOLYGON,
      queries['getSYMMPrice']
    );
    return response.tokenPrices[0].price;
  } catch (e) {
    console.error(e);
  }
}
export async function getTokenPriceXDAI(token: string) {
  try {
    const response = await subgraphRequest(
      config.subgraphUrlXDAI,
      queries[`get${token}Price`]
    );
    return response.tokenPrices[0].price;
  } catch (e) {
    console.error(e);
  }
}
export async function getTokenPriceCELO(token: string) {
  try {
    const response = await subgraphRequest(
      config.subgraphUrlCELO,
      queries[`get${token}Price`]
    );
    return response.tokenPrices[0].price;
  } catch (e) {
    console.error(e);
  }
}
export async function getTokenPriceAVALANCHE(token: string) {
  try {
    const response = await subgraphRequest(
      config.subgraphUrlAVALANCHE,
      queries[`get${token}Price`]
    );
    return response.tokenPrices[0].price;
  } catch (e) {
    console.error(e);
  }
}
export async function getTokenPriceFANTOM(token: string) {
  try {
    const response = await subgraphRequest(
      config.subgraphUrlAVALANCHE,
      queries[`get${token}Price`]
    );
    return response.tokenPrices[0].price;
  } catch (e) {
    console.error(e);
  }
}
export async function getTokenPriceOPTIMISM(token: string) {
  try {
    const response = await subgraphRequest(
      config.subgraphUrlOPTIMISM,
      queries[`get${token}Price`]
    );
    return response.tokenPrices[0].price;
  } catch (e) {
    console.error(e);
  }
}
export async function getTokenPricePOLYGON(token: string) {
  try {
    const response = await subgraphRequest(
      config.subgraphUrlPOLYGON,
      queries[`get${token}Price`]
    );
    return response.tokenPrices[0].price;
  } catch (e) {
    console.error(e);
  }
}

async function getPoolsNoPaging(payload, chainId) {
  const {
    orderBy = 'liquidity',
    orderDirection = 'desc',
    where = {}
  } = payload;
  // const ts = Math.round(new Date().getTime() / 1000);
  // const tsYesterday = ts - 24 * 3600;
  where.tokensList_not = [];
  const query = {
    pools: {
      __args: {
        where: {
          finalized: true
        },
        orderBy,
        orderDirection
      }
    }
  };
  try {
    switch (chainId) {
      case '42220':
        return await subgraphRequest(
          config.subgraphUrlCELO,
          merge(queries['getPools'], query)
        );
      case '137':
        return await subgraphRequest(
          config.subgraphUrlPOLYGON,
          merge(queries['getPools'], query)
        );
      case '43114':
        return await subgraphRequest(
          config.subgraphUrlAVALANCHE,
          merge(queries['getPools'], query)
        );
      case '250':
        return await subgraphRequest(
          config.subgraphUrlFANTOM,
          merge(queries['getPools'], query)
        );
      case '10':
        return await subgraphRequest(
          config.subgraphUrlOPTIMISM,
          merge(queries['getPools'], query)
        );
      case '100':
      default:
        return await subgraphRequest(
          config.subgraphUrlXDAI,
          merge(queries['getPools'], query)
        );
    }
  } catch (e) {
    console.error(e);
  }
}

function findPoolFromTokens(
  pool: any,
  token1: string,
  token2: string,
  weight1: number,
  weight2: number,
  count = 2
) {
  const { tokens } = pool;
  if (tokens.length !== count) {
    return false;
  }

  if (
    (tokens[0].symbol !== token1 && tokens[0].symbol !== token2) ||
    (tokens[1].symbol !== token1 && tokens[1].symbol !== token2) ||
    tokens[0].weightPercent !== weight1 ||
    tokens[1].weightPercent !== weight2
  ) {
    return false;
  }

  return true;
}

export async function formatPool(pool) {
  let colorIndex = 0;
  pool.tokens = pool.tokens.map(token => {
    token.checksum = getAddress(token.address);
    token.weightPercent = (100 / pool.totalWeight) * token.denormWeight;
    const configToken = config.tokens[token.checksum];
    if (configToken) {
      token.color = configToken.color;
    } else {
      token.color = unknownColors[colorIndex];
      colorIndex++;
    }
    return token;
  });
  if (pool.shares) pool.holders = pool.shares.length;
  pool.tokensList = pool.tokensList.map(token => getAddress(token));
  pool.lastSwapVolume = 0;
  const poolTotalSwapVolume =
    pool.swaps && pool.swaps[0] && pool.swaps[0].poolTotalSwapVolume
      ? parseFloat(pool.swaps[0].poolTotalSwapVolume)
      : 0;
  pool.lastSwapVolume = parseFloat(pool.totalSwapVolume) - poolTotalSwapVolume;
  pool.feesCollected = pool.lastSwapVolume * pool.swapFee;

  if (pool.liquidity === '0') {
    pool.liquidity = getPoolLiquidity(pool, store.getters['getTokenPrices']);
  }
  pool.apy = (100 / pool.liquidity) * ((pool.feesCollected * 365) / 100);

  // Get factors
  const factors = getFactors(
    pool.swapFee,
    pool.tokens,
    pool.tokensList,
    pool.totalWeight,
    config.chainId
  );

  const combinedAdjustmentFactor = new BigNumber(factors.feeFactor)
    .times(factors.ratioFactor)
    .times(factors.wrapFactor);

  // Calculate adjusted pool liquidity
  const adjustedPoolLiquidity = new BigNumber(pool.liquidity).times(
    combinedAdjustmentFactor
  );

  const totalAdjustedLiquidity = store.getters['getNetworkLiquidity'];

  // As per the Excel spreadsheet, calcultate the adjusted pool liquidity percent, the number of tokens paid out and then the value
  const adjustedPoolLiquidityPercent = adjustedPoolLiquidity.div(
    totalAdjustedLiquidity
  );

  const SYMMprice = store.getters['getSYMMprice']; // fetch Price for SYMM;

  const dailyCoinReward = new BigNumber(395.6);

  pool.tokenReward = dailyCoinReward.times(adjustedPoolLiquidityPercent);

  if (!symmv1Pools.includes(pool.id)) {
    pool.rewardApy = pool.tokenReward
      .times(SYMMprice)
      .div(pool.liquidity)
      .times(365);
  }

  // CELO APR and rewards,  cr is just prefix for Celo Rewards
  const crPool = cloneDeep(pool);

  // 100K usd for 84 days in total for celo rewards
  crPoolIds.forEach(async (poolId: string, index: number) => {
    if (poolId === pool.id) {
      const CELOprice = store.getters.getTokenPriceFromSymbol('CELO');

      const symmV2cUSDLiquidity = Number(
        store.getters.getPoolLiquidityFromId(specificPools.symmV2cUSD)
      );

      const cUSDcEURLiquidity = Number(
        store.getters.getPoolLiquidityFromId(specificPools.cUSDcEUR)
      );

      const liquidities = [symmV2cUSDLiquidity, cUSDcEURLiquidity];

      // 100000 USD / Price of Celo = Total quantity for 84 days
      const totalQuantity = 100000 / Number(CELOprice);
      // Qty of celo/number of days = daily celo for the pool
      const numberOfDays = 84;
      const dailyCelo = totalQuantity / numberOfDays / 10;

      const crDailyCoinReward = [
        new BigNumber(8 * dailyCelo), // symmv2 / cUSD
        new BigNumber(2 * dailyCelo) // cEUR / cUSD
      ];
      crPool.tokenRewardCelo = crDailyCoinReward[index];

      crPool.rewardApyCelo = crPool.tokenRewardCelo
        .div(liquidities[index])
        .times(CELOprice)
        .times(365);
    }
  });

  // ARI rewards
  if (findPoolFromTokens(crPool, 'ARI', 'cUSD', 95, 5)) {
    const ARIprice = store.getters.getTokenPriceFromSymbol('ARI');

    const ariDailyCoinReward = new BigNumber(2142.857); // 15K ARI a week
    crPool.tokenRewardAri = ariDailyCoinReward;
    crPool.rewardApyAri = crPool.tokenRewardAri
      .times(ARIprice)
      .div(crPool.liquidity)
      .times(365);
  }

  // mCREAL rewards
  if (findPoolFromTokens(crPool, 'mCREAL', 'mCUSD', 50, 50)) {
    const MOOprice = store.getters.getTokenPriceFromSymbol('MOO');
    const MOODailyCoinReward = new BigNumber(571.4285); // 4K mCREAL a week
    crPool.tokenRewardMOO = MOODailyCoinReward;
    crPool.rewardApyMOO = crPool.tokenRewardMOO
      .times(MOOprice)
      .div(crPool.liquidity)
      .times(365);
  }

  // GNO(Gnosis) APR and rewards
  // $100k for 168 days = $16666 per month (28 days) = $595.21 per day
  const enum gnoPool {
    GNO_WXDAI,
    SYMM_WXDAI,
    GNO_AGVE,
    None
  }
  let gnoPoolIndex = gnoPool.None;

  if (findPoolFromTokens(crPool, 'GNO', 'WXDAI', 60, 40)) {
    gnoPoolIndex = gnoPool.GNO_WXDAI;
  } else if (findPoolFromTokens(crPool, 'SYMM', 'WXDAI', 60, 40)) {
    gnoPoolIndex = gnoPool.SYMM_WXDAI;
  } else if (findPoolFromTokens(crPool, 'GNO', 'AGVE', 60, 40)) {
    gnoPoolIndex = gnoPool.GNO_AGVE;
  }

  if (gnoPoolIndex !== gnoPool.None) {
    const GNOprice = store.getters.getTokenPriceFromSymbol('GNO');
    const gnoDailyCoinReward = [
      new BigNumber((595.21 * 0.3) / Number(GNOprice)),
      new BigNumber((595.21 * 0.5) / Number(GNOprice)),
      new BigNumber((595.21 * 0.2) / Number(GNOprice))
    ];
    crPool.tokenRewardGno = gnoDailyCoinReward[gnoPoolIndex];

    crPool.rewardApyGno = crPool.tokenRewardGno
      .times(GNOprice)
      .div(crPool.liquidity)
      .times(365);
  }
  return crPool;
}

export async function getNetworkLiquidity() {
  const query = {
    where: {
      finalized: true,
      liquidity_gt: 0
    }
  };

  let totalAdjustedLiquidity = new BigNumber(0);
  let thisAdjustedPoolLiquidity = new BigNumber(0);

  // total liquidity for CELO APR and rewards
  let crTotalLiquidity = new BigNumber(0);
  const crPoolIds = [
    '0x13da4034a56f0293b8a78bc13524656e0136455c', // SYMM/cEUR
    '0x22324f68ff401a4379da39421140bcc58102338f', // SYMM/cUSD
    '0xf3ce35b10d3c9e74b0e6084ce08fd576fd9ec221' // SYMM/CELO
  ];

  const networks = ['100', '42220'];
  // const networks = ['100', '43114', '250', '10', '137', '42220']
  const nLen = networks.length;

  for (let i = 0; i < nLen; i++) {
    const pools = await getPoolsNoPaging(query, networks[i]);
    pools.pools.forEach(thispool => {
      const thisPoolFactors = getFactors(
        thispool.swapFee,
        thispool.tokens,
        thispool.tokensList,
        thispool.totalWeight,
        networks[i]
        // thispool.id
      );

      const thisCombinedAdjustmentFactor = new BigNumber(
        thisPoolFactors.feeFactor
      )
        .times(thisPoolFactors.ratioFactor)
        .times(thisPoolFactors.wrapFactor);

      thisAdjustedPoolLiquidity = new BigNumber(thispool.liquidity).times(
        thisCombinedAdjustmentFactor
      );

      totalAdjustedLiquidity = totalAdjustedLiquidity.plus(
        thisAdjustedPoolLiquidity
      );

      if ('celo' == networks[i]) {
        // get total liquidity for CELO APR and rewards
        if (crPoolIds.includes(thispool.id)) {
          crTotalLiquidity = crTotalLiquidity.plus(
            new BigNumber(thispool.liquidity)
          );
        }
      }
    });
  }

  return totalAdjustedLiquidity;
}

export async function getSYMMprice() {
  let SYMMprice = '1';
  switch (process.env.VUE_APP_NETWORK) {
    case 'celo':
      SYMMprice = await getSYMMPriceCELO();
      break;
    case 'polygon':
      SYMMprice = await getSYMMPricePOLYGON();
      break;
    case 'avalanche':
      SYMMprice = await getSYMMPriceAVALANCHE();
      break;
    case 'fantom':
      SYMMprice = await getSYMMPriceFANTOM();
      break;
    case 'optimism':
      SYMMprice = await getSYMMPriceOPTIMISM();
      break;
    case 'xdai':
    default:
      SYMMprice = await getSYMMPriceXDAI();
      break;
  }

  return SYMMprice;
}

export async function formatPools(pools) {
  pools = pools.map(pool => formatPool(pool));
  return pools;
}

export async function getMarketChartFromCoinGecko(address) {
  const ratePerDay = {};
  const uri = `https://api.coingecko.com/api/v3/coins/ethereum/contract/${address}/market_chart?vs_currency=usd&days=60`;
  try {
    const marketChart = await fetch(uri).then(res => res.json());
    marketChart.prices.forEach(p => {
      const date = new Date();
      date.setTime(p[0]);
      const day = date.toISOString();
      ratePerDay[day] = p[1];
    });
    return ratePerDay;
  } catch (e) {
    return Promise.reject();
  }
}

export function isValidAddress(str) {
  try {
    getAddress(str);
  } catch (e) {
    return false;
  }
  return true;
}

export function delay(ms) {
  return new Promise(resolve => setTimeout(() => resolve(), ms));
}

export function clone(item) {
  return JSON.parse(JSON.stringify(item));
}

export function trunc(value: number, decimals = 0) {
  const mutiplier = 10 ** decimals;
  return Math.trunc(value * mutiplier) / mutiplier;
}

export function calcPoolTokensByRatio(ratio, totalShares) {
  if (ratio.isNaN()) {
    return '0';
  }
  // @TODO - fix calcs so no buffer is needed
  const buffer = bnum(100);
  return bnum(ratio)
    .times(toWei(totalShares))
    .integerValue(BigNumber.ROUND_DOWN)
    .minus(buffer)
    .toString();
}

export function getTokenBySymbol(symbol) {
  const tokenAddresses = Object.keys(config.tokens);
  const tokenAddress = tokenAddresses.find(
    tokenAddress => config.tokens[tokenAddress].symbol === symbol
  );
  return config.tokens[tokenAddress];
}

export const isTxRejected = error => {
  if (!error) {
    return false;
  }
  return error.code === 4001 || error.code === -32603;
};

export const isTxReverted = error => {
  if (!error) {
    return false;
  }
  return error.code === -32016;
};

export function logRevertedTx(
  provider: Provider,
  contract: Contract,
  action: string,
  params: any,
  overrides: any
) {
  // address: 0xfffff6e3a909693c6e4dadbb72214fd6c3e47913
  const dummyPrivateKey =
    '0x651bd555534625dc2fd85e13369dc61547b2e3f2cfc8b98cee868b449c17a4d6';
  const dummyWallet = new Wallet(dummyPrivateKey).connect(provider);
  const loggingContract = contract.connect(dummyWallet);
  loggingContract[action](...params, overrides);
}

export function formatFilters(filters, fb) {
  if (!filters) return fb || {};
  if (!filters.token) filters.token = [];
  if (!filters.type) filters.type = 'shared';
  if (!Array.isArray(filters.token)) filters.token = [filters.token];
  return filters;
}

export function blockNumberToTimestamp(
  currentTime,
  currentBlockNumber,
  blockNumber
) {
  const AVG_BLOCK_TIMES = {
    1: 13,
    42: 5
  };
  const avgBlockTime = AVG_BLOCK_TIMES[config.chainId];
  return currentTime + avgBlockTime * 1000 * (blockNumber - currentBlockNumber);
}

export function filterObj(obj, fn) {
  return Object.fromEntries(Object.entries(obj).filter(item => fn(item)));
}

export function formatNumber(number, key) {
  if (number === 0) return '-';

  if (number < 0.0001) number = 0;

  let format = '0.[000]';
  if (number > 1000) format = '0.[0]a';
  if (number < 1) format = '0.[0000]';

  if (key === 'long') {
    format = '0,000.[00]';
    if (number < 1) format = '0.[0000]';
  }

  if (key === 'usd') {
    format = '$(0.[00])';
    if (number > 1000) format = '$(0.[0]a)';
    if (number < 1) format = '$(0.[0000])';
  }

  if (key === 'usd-long') {
    format = '$(0,000.[00])';
    if (number < 1) format = '$(0.[0000])';
  }

  if (key === 'percent') format = '(0.[00])%';
  if (key === 'percent-short') format = '(0)%';

  return numeral(number).format(format).toUpperCase();
}

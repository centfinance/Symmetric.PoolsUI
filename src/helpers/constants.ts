export const celoRewardPools = [
  {
    name: 'SYMM/cUSD',
    symbol1: 'SYMM',
    symbol2: 'cUSD',
    weight1: 60,
    weight2: 40,
    reward: 50
  },
  {
    name: 'cUSD/cEUR',
    symbol1: 'cUSD',
    symbol2: 'cEUR',
    weight1: 50,
    weight2: 50,
    reward: 20
  },
  {
    name: 'SUSHI/cUSD',
    symbol1: 'SUSHI',
    symbol2: 'cUSD',
    weight1: 50,
    weight2: 50,
    reward: 0.5
  },
  {
    name: 'CELO/cUSD',
    symbol1: 'CELO',
    symbol2: 'cUSD',
    weight1: 80,
    weight2: 20,
    reward: 20
  },
  {
    name: 'PACT/CELO',
    symbol1: 'PACT',
    symbol2: 'CELO',
    weight1: 80,
    weight2: 20,
    reward: 0.5
  },
  {
    name: 'ARI/cUSD',
    symbol1: 'ARI',
    symbol2: 'cUSD',
    weight1: 95,
    weight2: 5,
    reward: 2
  },
  {
    name: 'mcREAL/mCUSD',
    symbol1: 'mcREAL',
    symbol2: 'mCUSD',
    weight1: 50,
    weight2: 50,
    reward: 5
  },
  {
    name: 'KNOX/KUSD',
    symbol1: 'KNOX',
    symbol2: 'KUSD',
    weight1: 50,
    weight2: 50,
    reward: 2
  }
];

export const crPoolIds = [
  '0x8b44535e5137595aebebe5942c024863ee5c0db6', // SYMM/cUSD
  '0x5fa00d2ba520f95f548ff0813f9f74facdf1b807' // cEUR/cUSD
];

export const specificPools = {
  symmV2cUSD: '0x8b44535e5137595aebebe5942c024863ee5c0db6',
  cUSDcEUR: '0x5fa00d2ba520f95f548ff0813f9f74facdf1b807'
};

export const symmv1Pools = [
  '0x46807e20af614509385c49b3c7ec1acd5f391b1b', // SYMMv1/cUSD
  '0xf3ce35b10d3c9e74b0e6084ce08fd576fd9ec221', // SYMMv1/CELO
  '0x22324f68ff401a4379da39421140bcc58102338f', // SYMMv1/cUSD 60/40
  '0x13da4034a56f0293b8a78bc13524656e0136455c', // SYMMv1/cEUR
  '0x42dfece6e7384f6cc800203e03a17cbdf10b4210' // SYMMv1/cUSD 80/20
];

export const APR_FORMULA =
  'APR Formula: [(current token price) * (Daily reward token quantity) / (Total Value Locked)] * 365 days * 100';

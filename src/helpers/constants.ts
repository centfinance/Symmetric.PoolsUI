export const crPoolIds = [
  // '0x13da4034a56f0293b8a78bc13524656e0136455c', // SYMMv1/cEUR
  '0x2fdcd64ad761485537cfeaa598c8980efd806532', // SYMMv2/cEUR
  // '0x22324f68ff401a4379da39421140bcc58102338f', // SYMMv1/cUSD
  '0x8b44535e5137595aebebe5942c024863ee5c0db6', // SYMMv2/cUSD
  // '0xf3ce35b10d3c9e74b0e6084ce08fd576fd9ec221', // SYMMv1/CELO
  '0x7ee06450f4ff97990c6288237964bf4f545f221f' // SYMMv2/CELO
];

export const specificPools = {
  symmV1cUSD: '0x22324f68ff401a4379da39421140bcc58102338f',
  symmV2cUSD: '0x8b44535e5137595aebebe5942c024863ee5c0db6',
  symmV1cEUR: '0x13da4034a56f0293b8a78bc13524656e0136455c',
  symmV2cEUR: '0x2fdcd64ad761485537cfeaa598c8980efd806532',
  symmV1CELO: '0xf3ce35b10d3c9e74b0e6084ce08fd576fd9ec221',
  symmV2CELO: '0x7ee06450f4ff97990c6288237964bf4f545f221f'
};

export const APR_FORMULA =
  'APR Formula: [(current token price) * (Daily reward token quantity) / (Total Value Locked)] * 365 days * 100';

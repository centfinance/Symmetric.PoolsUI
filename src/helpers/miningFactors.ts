import { bnum } from '@/helpers/utils';
import { BigNumber } from 'bignumber.js';
import { BAL_TOKEN, uncappedTokens, equivalentSets } from './tokens';

// This code is suspiciously similar to bal-mining-scripts
// If that changes, change this as well!

const FEE_FACTOR_K = 0.25;
const WRAP_FACTOR_HARD = bnum(0.1);
const WRAP_FACTOR_SOFT = bnum(0.2);

export function getFeeFactor(swapFee) {
  const exp = (FEE_FACTOR_K * swapFee * 100) ** 2;

  return Math.exp(-exp);
}

export function getStakingBoostOfPair(
  chainId: string,
  balMultiplier: BigNumber,
  token1: string,
  weight1: BigNumber,
  token2: string,
  weight2: BigNumber,
  poolId: string
) {
  if (
    token1 == BAL_TOKEN[chainId].toLowerCase() &&
    uncappedTokens[chainId].includes(token2)
  ) {
    return balMultiplier
      .times(weight1)
      .plus(weight2)
      .div(weight1.plus(weight2));
  } else if (
    token2 == BAL_TOKEN[chainId].toLowerCase() &&
    uncappedTokens[chainId].includes(token1)
  ) {
    return weight1
      .plus(balMultiplier.times(weight2))
      .div(weight1.plus(weight2));
  } else {
    return bnum(1);
  }
}

export function computeRatioFactor(
  tokens,
  weights,
  chainId,
  balMultiplier = bnum(2),
  poolId
) {
  let brfSum = bnum(0);
  let pairWeightSum = bnum(0);
  const N = weights.length;
  for (let j = 0; j < N; j++) {
    if (weights[j].eq(bnum(0))) continue;

    for (let k = j + 1; k < N; k++) {
      const pairWeight = weights[j].times(weights[k]);
      const normalizedWeight1 = weights[j].div(weights[j].plus(weights[k]));
      const normalizedWeight2 = weights[k].div(weights[j].plus(weights[k]));

      const stakingBoostOfPair = getStakingBoostOfPair(
        chainId,
        balMultiplier,
        tokens[j].toLowerCase(),
        weights[j],
        tokens[k].toLowerCase(),
        weights[k],
        poolId
      );

      // stretches factor for equal weighted pairs to 1
      const ratioFactorOfPair = bnum(4)
        .times(normalizedWeight1)
        .times(normalizedWeight2)
        .times(pairWeight);

      const brfOfPair = stakingBoostOfPair.times(ratioFactorOfPair);

      brfSum = brfSum.plus(brfOfPair);
      pairWeightSum = pairWeightSum.plus(pairWeight);
    }
  }

  return brfSum.div(pairWeightSum);
}

export function getWrapFactorOfPair(tokenA, tokenB, chainId) {
  let foundTokenA = false;
  let foundTokenB = false;
  for (const set1 in equivalentSets[chainId]) {
    for (const set2 in equivalentSets[chainId][set1]) {
      const includesTokenA =
        equivalentSets[chainId][set1][set2].includes(tokenA);
      const includesTokenB =
        equivalentSets[chainId][set1][set2].includes(tokenB);

      if (includesTokenA && includesTokenB) {
        return WRAP_FACTOR_HARD;
      } else if (
        (includesTokenA && foundTokenB) ||
        (includesTokenB && foundTokenA)
      ) {
        return WRAP_FACTOR_SOFT;
      } else if (includesTokenA) {
        foundTokenA = true;
      } else if (includesTokenB) {
        foundTokenB = true;
      }

      break;
    }
  }

  return bnum(1.0);
}

function computeWrapFactor(tokens, weights, chainId) {
  let wrapFactorSum = bnum(0);
  let pairWeightSum = bnum(0);
  const N = weights.length;

  for (let x = 0; x < N; x++) {
    if (!weights[x].eq(bnum(0))) {
      for (let y = x + 1; y < N; y++) {
        const pairWeight = weights[x].times(weights[y]);
        const wrapFactorPair: BigNumber = getWrapFactorOfPair(
          tokens[x],
          tokens[y],
          chainId
        );
        wrapFactorSum = wrapFactorSum.plus(wrapFactorPair.times(pairWeight));
        pairWeightSum = pairWeightSum.plus(pairWeight);
      }
    }
  }

  return wrapFactorSum.div(pairWeightSum);
}

export function getFactors(
  swapFee,
  tokens,
  tokensList,
  totalWeight,
  chainId,
  poolId = ''
) {
  const totalWeightAsFloat = parseFloat(totalWeight);
  const weights = tokens.map(token =>
    bnum(parseFloat(token.denormWeight) / totalWeightAsFloat)
  );

  return {
    feeFactor: getFeeFactor(swapFee),
    ratioFactor: computeRatioFactor(
      tokensList,
      weights,
      chainId,
      bnum(2),
      poolId
    ),
    wrapFactor: computeWrapFactor(tokensList, weights, chainId)
  };
}

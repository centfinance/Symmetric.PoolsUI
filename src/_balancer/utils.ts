import { Interface } from '@ethersproject/abi';
import { Contract } from '@ethersproject/contracts';
import { getAddress } from '@ethersproject/address';
import { jsonToGraphQLQuery } from 'json-to-graphql-query';
import config from '../config';
import { abi as multicallAbi } from '../helpers/abi/Multicall.json';

const MULTICALL = config.addresses.multicall;

export async function multicall(provider, abi, calls, options?) {
  const multi = new Contract(MULTICALL, multicallAbi, provider);
  const itf = new Interface(abi);
  try {
    const [, response] = await multi.aggregate(
      calls.map(call => [
        call[0].toLowerCase(),
        itf.encodeFunctionData(call[1], call[2])
      ]),
      options || {}
    );
    return response.map((call, i) =>
      itf.decodeFunctionResult(calls[i][1], call)
    );
  } catch (e) {
    return Promise.reject();
  }
}

export async function subgraphRequest(url, query) {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query: jsonToGraphQLQuery({ query }) })
  });
  const { data } = await res.json();
  return data || {};
}

export function getTokenLogoUrl(address: string): string | null {

  if (
    address !== 'xdai' &&
    address !== 'ether' &&
    address !== 'spoa' &&
    address !== 'celo' &&
    address !== 'weth' &&
    address !== 'avax' &&
    address !== 'matic' &&
    address !== 'ftm'
  ) {
    const checksum = getAddress(address);
    const token = config.tokens[checksum];
    if (token && token.hasIcon) {
      return token.logoUrl;
    }
  }
  return null;
}

import { JsonRpcProvider } from '@ethersproject/providers';
import config from '@/config';

let provider = new JsonRpcProvider(config.rpcUrl);
switch (config.network) {
    case 'xdai':
        provider = new JsonRpcProvider(config.rpcUrl, 100);
        break;
    case 'sokol':
        provider = new JsonRpcProvider(config.rpcUrl, 77);
        break;
    case 'celo':
        provider = new JsonRpcProvider(config.rpcUrl, 42220);
        break;
    case 'alfajores':
        provider = new JsonRpcProvider(config.rpcUrl, 44787);
        break;
    case 'kovan':
        provider = new JsonRpcProvider(config.rpcUrl, 42);
        break;
    case 'avalanche':
        provider = new JsonRpcProvider(config.rpcUrl, 43114);
        break;
    case 'fantom':
        provider = new JsonRpcProvider(config.rpcUrl, 250);
        break;
    case 'optimism':
        provider = new JsonRpcProvider(config.rpcUrl, 10);
        break;
    case 'polygon':
        provider = new JsonRpcProvider(config.rpcUrl, 137);
        break;
    case 'ethereum':
    default:
        break;
}

export default provider;

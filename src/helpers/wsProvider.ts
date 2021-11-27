import { WebSocketProvider } from '@ethersproject/providers';
import config from '@/config';

let provider = new WebSocketProvider(config.wsUrl);
switch (config.network) {
    case 'xdai':
        provider = new WebSocketProvider(config.wsUrl, 100);
        break;
    case 'sokol':
        provider = new WebSocketProvider(config.wsUrl, 77);
        break;
    case 'celo':
        provider = new WebSocketProvider(config.wsUrl, 42220);
        break;
    case 'alfajores':
        provider = new WebSocketProvider(config.wsUrl, 44787);
        break;
    case 'kovan':
        provider = new WebSocketProvider(config.wsUrl, 42);
        break;
    case 'fuji':
        provider = new WebSocketProvider(config.wsUrl, 43113);
        break;
    case 'fantom':
        provider = new WebSocketProvider(config.wsUrl, 250);
        break;
    case 'fantom-testnet':
        provider = new WebSocketProvider(config.wsUrl, 4002);
        break;
    case 'optimism':
        provider = new WebSocketProvider(config.wsUrl, 10);
        break;
    case 'optimism-kovan':
        provider = new WebSocketProvider(config.wsUrl, 69);
        break;
    case 'polygon':
        provider = new WebSocketProvider(config.wsUrl, 137);
        break;
    case 'polygon-mumbai':
        provider = new WebSocketProvider(config.wsUrl, 80001);
        break;
    case 'ethereum':
    default:
        break;
}

export default provider;

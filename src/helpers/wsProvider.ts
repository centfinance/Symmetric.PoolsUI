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
    case 'ethereum':
    default:
        break;
}

export default provider;

// @ts-ignore
const get = () => import('@walletconnect/web3-provider');
import LockConnector from '../connector';

export default class Connector extends LockConnector {
  async connect() {
    console.log('Connecting Valora Wallet ...');
    let provider;
    try {
      const WalletConnectProvider = (await get()).default;
      provider = new WalletConnectProvider(this.options);
      console.log('Valora provider1 = ', provider);
      await provider.enable();
    } catch (e) {
      console.error(e);
      console.log('error = ', e)
      return;
    }
    console.log('Valora provider2 = ', provider);
    return provider;
  }

  logout() {
    if (localStorage) {
      localStorage.removeItem('walletconnect');
    }
    return;
  }
}

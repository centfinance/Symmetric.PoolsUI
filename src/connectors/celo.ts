import LockConnector from '../connector';

export default class Connector extends LockConnector {
  async connect() {
    let provider;
    if (window['celo']) {
      provider = window['celo'];
      try {
        await window['celo'].enable();
      } catch (e) {
        console.error(e);
      }
    } else if (window['web3']) {
      provider = window['web3'].currentProvider;
    }
    return provider;
  }

  async isLoggedIn() {
    if (!window['celo']) return false;
    if (window['celo'].selectedAddress) return true;
    await new Promise(r => setTimeout(r, 400));
    return !!window['celo'].selectedAddress
  }
}

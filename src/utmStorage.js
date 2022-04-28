class UTMStorage {
  constructor() {
    try {
      const ls = window.localStorage;
      this.setItem = ls.setItem.bind(localStorage);
      this.getItem = ls.getItem.bind(localStorage);
      this.removeItem = ls.removeItem.bind(localStorage);
      this.setItem('test', 'test');
      this.removeItem('test');
    } catch(e) {
      this.prefixToAvoidBuiltIns = '_utm_unique_';
      this.localMockedStorage = {};
      this.setItem = this.setLocalItem;
      this.getItem = this.getLocalItem;
    }
  }

  setLocalItem(key, value) {
    this.localMockedStorage[this.prefixToAvoidBuiltIns + key] = value;
  }

  getLocalItem(key) {
    return this.localMockedStorage[this.prefixToAvoidBuiltIns + key];
  }

}

export default UTMStorage;

class UTMStorage {
  constructor() {
    try {
      const ls = window.localStorage;
      this.setItem = ls.setItem;
      this.getItem = ls.getItem;
      this.removeItem = ls.removeItem;
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
    this.localMockedStorage[this.prefixToAvoidBuiltIns + key];
  }

}

export default UTMStorage;
class UTMStorage {
  localMockedStorage: Record<string, string> = {};
  prefixToAvoidBuiltIns = '_utm_unique_';

  setLocalItem(key: string, value: string) {
    this.localMockedStorage[this.prefixToAvoidBuiltIns + key] = value;
  }

  getLocalItem(key: string): string | null {
    return this.localMockedStorage[this.prefixToAvoidBuiltIns + key];
  }
  setItem = this.setLocalItem;
  getItem = this.getLocalItem

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  removeItem = (key:string) => {}
  constructor() {
    try {
      const ls = window.localStorage;
      this.setItem = ls.setItem.bind(localStorage);
      this.getItem = ls.getItem.bind(localStorage);
      this.removeItem = ls.removeItem.bind(localStorage);
      this.setItem('test', 'test');
      this.removeItem('test');
    } catch(e) {
      this.setItem = this.setLocalItem;
      this.getItem = this.getLocalItem;
    }
  }

}

export default UTMStorage;

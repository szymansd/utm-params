class UTMParams {
  /**
   * Get utm params allowed by GA
   *
   * @return {Object}
   */
  static parse() {
    const allowedParams = [
      'utm_name',
      'utm_term',
      'utm_source',
      'utm_medium',
      'utm_content'
    ];
    const urlSearch = new URL(window.location);
    const urlParams = new URLSearchParams(urlSearch.search);
    const parsedParams = {};
    for (const key of allowedParams) {
      const paramValue = urlParams.get(key);
      if(paramValue) {
        parsedParams[key] = paramValue;
      }
    }
    return parsedParams;
  }

  /**
   * Save UTM params in sessionStorage
   *
   * @param {Object} params
   * @return {Boolean}
   */
  static save(params) {
    if(!params) {
      return false;
    }
    try {
      window.sessionStorage.setItem('utmSavedParams', JSON.stringify(params));
      return true;
    } catch (e) {
      return false;
    }
  }

  /**
   * Reads UTM params from sessionStorage
   *
   * @return {Object}
   */
  static get() {
    const savedParams = window.sessionStorage.getItem('utmSavedParams');
    if(savedParams) {
      return JSON.parse(savedParams);
    }
    return null;
  }

}

export default UTMParams;
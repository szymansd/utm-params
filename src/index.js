import 'url-search-params-polyfill';

const allowedParams = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_name",
  "utm_term",
  "initial_utm_source",
  "initial_utm_medium",
  "initial_utm_campaign",
  "initial_utm_content",
  "initial_utm_name",
  "initial_utm_term",
];

function checkIfInitialParamsExist(params) {
  return Object.keys(params).find(k => k.includes("initial"));
};

class UTMParams {
  /**
   * Get utm params allowed by GA
   *
   * @return {Object}
   */
  static parse() {
    const urlSearch = new URL(window.location);
    const urlParams = new URLSearchParams(urlSearch.search);
    const parsedParams = {};
    allowedParams.forEach(key => {
      const paramValue = urlParams.get(key);
      if (paramValue) {
        parsedParams[key] = paramValue;
      }
    });
    return parsedParams;
  }

  /**
   * Save UTM params in localStorage
   *
   * @param {Object} params
   * @return {Boolean}
   */
  static save(params) {
    if (!params || !allowedParams.some(key => !!params[key])) {
      return false;
    }
    try {
      const paramsToSave = {};
      const initialParams = {};

      Object.assign(paramsToSave, params);

      if (window.localStorage.getItem("utmSavedParams")) {
        let existingParams = {};

        try {
          existingParams = JSON.parse(window.localStorage.getItem("utmSavedParams"));
        } catch (e) {
          existingParams = {};
        }

        if (checkIfInitialParamsExist(existingParams)) {
          Object.keys(existingParams).forEach(k => {
            if(k.includes('initial_')) {
              initialParams[k] = existingParams[k];
            }
          });
        }
      } else {
        Object.keys(paramsToSave).forEach(k => {
          initialParams['initial_'+k] = paramsToSave[k];
        });
      }

      Object.assign(paramsToSave, initialParams);

      window.localStorage.setItem("utmSavedParams", JSON.stringify(paramsToSave));
      return true;
    } catch (e) {
      throw new Error(e);
      return false;
    }
  }

  /**
   * Reads UTM params from localStorage
   *
   * @return {Object}
   */
  static get() {
    const savedParams = window.localStorage.getItem("utmSavedParams");
    if (savedParams) {
      return JSON.parse(savedParams);
    }
    return null;
  }
}

export default UTMParams;

import UTMStorage from './utmStorage';

type UTMParamsType = Record<string, string | null>;

enum allowedParams {
  utm_source = "utm_source",
  utm_medium = "utm_medium",
  utm_campaign = "utm_campaign",
  utm_content = "utm_content",
  utm_name = "utm_name",
  utm_term = "utm_term",
  initial_utm_source = "initial_utm_source",
  initial_utm_medium = "initial_utm_medium",
  initial_utm_campaign = "initial_utm_campaign",
  initial_utm_content = "initial_utm_content",
  initial_utm_name = "initial_utm_name",
  initial_utm_term = "initial_utm_term",
  gclid = "gclid",
}

const storage = new UTMStorage();

class UTMParams {
  /**
   * Get utm params allowed by GA
   *
   * @return {Object}
   */
  static parse() {
    console.log(window.location)
    const urlParams = new URLSearchParams(window.location.search);
    const parsedParams: UTMParamsType = {};
    Object.values(allowedParams).forEach((key: string) => {
      parsedParams[key] = urlParams.get(key);
      console.log(key + ': ' +urlParams.get(key))
    });
    return parsedParams;
  }

  /**
   * Save UTM params in localStorage
   *
   * @param {Object} params
   * @return {Boolean}
   */
  static save(params: UTMParamsType) {
    if (!params) {
      return false;
    }
    try {
      const paramsToSave: UTMParamsType = {};
      const initialParams: UTMParamsType = {};

      Object.assign(paramsToSave, params);
      const storedItems = storage.getItem("utmSavedParams")

      if (storedItems) {
        let existingParams: UTMParamsType = {};
        existingParams = JSON.parse(storedItems);

        Object.keys(existingParams).forEach((k: string) => {
          if(!k.includes('initial_') && !existingParams['initial_'+k]) {
            initialParams['initial_'+k] = existingParams[k];
          } else if (k.includes('initial_')) {
            initialParams[k] = existingParams[k];
          }
        });
      } else {
        Object.keys(paramsToSave).forEach(k => {
          if(!k.includes('initial_')) {
            initialParams['initial_' + k] = paramsToSave[k];
          }
        });
      }
      Object.assign(paramsToSave, initialParams);
      storage.setItem("utmSavedParams", JSON.stringify(paramsToSave));
      return true;
    } catch (e) {
      return false;
    }
  }

  /**
   * Reads UTM params from localStorage
   *
   * @return {Object}
   */
  static get() {
    const savedParams = storage.getItem("utmSavedParams");
    if (savedParams) {
      return JSON.parse(savedParams);
    }
    return null;
  }
}

export default UTMParams;

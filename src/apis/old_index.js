import CONFIG from '@src/config';
import AppHelper from '@helpers/AppHelper';

const Api = {
  async getDomains() {
    const url = `${CONFIG.SERVER}/config`;
    try {
      const res = await fetch(url);
      if (res.status === 200) {
        const data = await res.json();
        return data;
      }
      return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  },

  async getGameResult($params) {
    const query = AppHelper.buildHttpQuery($params);
    const url = `${CONFIG.SERVER}/sessions?${query}`;
    try {
      const res = await fetch(url);
      if (res.status === 200) {
        const data = await res.json();
        return data;
      }
      return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  },

  async getCompanyResult($params) {
    const query = AppHelper.buildHttpQuery($params);
    const url = `${CONFIG.SERVER}/company-sessions?${query}`;
    try {
      const res = await fetch(url);
      if (res.status === 200) {
        const data = await res.json();
        return data;
      }
      return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  },

  async getSearch(query) {
    const url = `${CONFIG.SERVER}/search?${query}`;
    try {
      const res = await fetch(url);
      if (res.status === 200) {
        const data = await res.json();
        return data;
      }
      return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  },

  async getStatResult(param) {
    const url = `${CONFIG.SERVER}/${param}`;
    try {
      const res = await fetch(url);
      if (res.status === 200) {
        const data = await res.json();
        return data;
      }
      return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  },
};

export default Api;

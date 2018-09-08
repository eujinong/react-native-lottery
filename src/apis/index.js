import CONFIG from '../config';
import RestApi from './rest';
import StorageApi from './storage';

const { API_ENDPOINT, FIELDS } = CONFIG;

const Api = {
  async getConfig() {
    const url = `${API_ENDPOINT}/config`;
    try {
      const res = await RestApi.get(url);
      if (res.status === 200) {
        const data = await res.text();
        return JSON.parse(data);
      }
      return [];
    } catch (error) {
      console.log(error); return [];
    }
  },

  async saveDomain(domain) {
    try {
      if (domain) {
        const domainString = JSON.stringify(domain);
        console.log(domainString);
        await StorageApi.save(FIELDS.DOMAIN, domainString);
      } else {
        await StorageApi.remove(FIELDS.DOMAIN);
      }
    } catch (e) {
      console.log(e);
    }
  },

  async loadDomain() {
    try {
      const domainString = await StorageApi.load(FIELDS.DOMAIN);
      if (domainString) {
        const domain = JSON.parse(domainString);
        return domain;
      }
    } catch (e) {
      console.log(e);
    }
    return null;
  },

  async getCompanies(domain) {
    const url = `${domain.endpoint}/companies`;
    console.log(url);
    try {
      const res = await RestApi.get(url);
      if (res.status === 200) {
        const data = await res.text();
        return JSON.parse(data);
      }
      return null;
    } catch (error) {
      console.log(error); return null;
    }
  },

  async getGame(domain, params) {
    const url = `${domain.endpoint}/sessions`;
    try {
      const res = await RestApi.get(url, params);
      if (res.status === 200) {
        const data = await res.text();
        return JSON.parse(data);
      }
      return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  },

  async getCompanyGames(domain, params) {
    const url = `${domain.endpoint}/company-sessions`;
    try {
      const res = await RestApi.get(url, params);
      if (res.status === 200) {
        const data = await res.text();
        return JSON.parse(data);
      }
      return [];
    } catch (error) {
      console.log(error);
      return [];
    }
  },

  async getSearch(domain, query) {
    const url = `${domain.endpoint}/search?${query}`;
    try {
      const res = await RestApi.get(url);
      if (res.status === 200) {
        const data = await res.text();
        return JSON.stringify(data);
      }
      return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  },

  async getStatResult(domain, param) {
    const url = `${domain.endpoint}/${param}`;
    try {
      const res = await RestApi.get(url);
      if (res.status === 200) {
        const data = await res.text();
        return JSON.stringify(data);
      }
      return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
};

export default Api;

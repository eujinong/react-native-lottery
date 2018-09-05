const StringHelper = {
  serializeObject: (params) => {
    const str = [];
    if (!params) return '';
    Object.keys(params).forEach((key) => {
      const value = params[key];
      str.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
    });
    return str.join('&');
  },
  toUpperCase: value => (value ? value.toUpperCase() : ''),
  toLowerCase: value => (value ? value.toLowerCase() : ''),
  toCapitalize: value => (value ? value.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()) : ''),
  replaceAll: (str, mapObj) => {
    const regex = new RegExp(Object.keys(mapObj).join('|'), 'gi');
    return str.replace(regex, matched => mapObj[matched]);
  }
};

export default StringHelper;

import moment from 'moment';

const AppHelper = {
  isRecentlyUpdated(updated_at) {
    const todayDate = new Date();
    return updated_at.indexOf(moment(todayDate).format('DD-MM-YYYY')) === 0;
  },
  convertChartData(stats) {
    const keys = Object.keys(stats);
    const data = [];
    for (let i = 0; i < keys.length; i++) {
      data.push({ name: keys[i], v: stats[keys[i]] });
    }
    data.sort((a, b) => a.name - b.name);

    const mainData = [];
    for (let i = 0; i < data.length; i++) {
      const tempData = [];
      tempData.push(data[i]);
      mainData.push(tempData);
    }
    return mainData;
  }
};

export default AppHelper;

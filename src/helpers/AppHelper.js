import I18n from 'react-native-i18n';
import moment from 'moment';

const AppHelper = {
  isRecentlyUpdated(updated_at) {
    const todayDate = new Date();
    return updated_at.indexOf(moment(todayDate).format('DD-MM-YYYY')) === 0;
  }
};

export default AppHelper;

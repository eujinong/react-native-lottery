import { Dimensions } from 'react-native';

const dimension = Dimensions.get('window');

const Metrics = {
  touchableOpacity: 0.8,
  padding: {
    mini: 5,
    tiny: 10,
    small: 15,
    normal: 20,
    large: 25
  },
  buttonHeight: {
    tiny: 28,
    small: 40,
    normal: 50,
    large: 60
  },
  dimension
};

export default Metrics;

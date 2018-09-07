import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { Metrics, Fonts, Colors } from '../theme';

const styles = {
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon: {
    color: Colors.navigationText,
    fontSize: Fonts.size.h4
  }
};

const NavigationButton = (props) => {
  const {
    onPress, icon
  } = props;

  return (
    <TouchableOpacity style={styles.container} activeOpacity={Metrics.touchableOpacity} onPress={onPress}>
      <Icon name={icon} style={styles.icon} />
    </TouchableOpacity>
  );
};

export default NavigationButton;

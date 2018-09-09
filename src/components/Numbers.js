import React from 'react';
import { View, Text } from 'react-native';

import { Colors, Metrics, Fonts } from '../theme';

const styles = {
  numbers: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },

  normal: {
    circleNumber: {
      justifyContent: 'center',
      alignItems: 'center',
      margin: Metrics.padding.tiny * 0.3,
      width: Fonts.size.default * 2,
      height: Fonts.size.default * 2,
      borderRadius: Fonts.size.default
    },
    circleNumberText: {
      fontSize: Fonts.size.default
    },
    standardNumber: {
      marginRight: Metrics.padding.tiny,
      padding: Metrics.padding.tiny * 0.5,
      margin: Metrics.padding.tiny * 0.3
    }
  },
  small: {
    circleNumber: {
      justifyContent: 'center',
      alignItems: 'center',
      margin: Metrics.padding.mini * 0.4,
      width: Fonts.size.small * 2,
      height: Fonts.size.small * 2,
      borderRadius: Fonts.size.small
    },
    circleNumberText: {
      fontSize: Fonts.size.small
    },
    standardNumber: {
      marginRight: Metrics.padding.tiny * 0.8,
      padding: Metrics.padding.tiny * 0.4,
      margin: Metrics.padding.tiny * 0.25
    }
  }
};

export const NumberCircle = (props) => {
  const {
    number, recentlyUpdated, size, disabled
  } = props;
  const str = number;
  const res = str.replace('+', '').replace('=', '').replace('!', '').replace('?', '');
  let color;
  let backgroundColor;

  if (disabled) {
    color = Colors.disabledBallText;
    backgroundColor = Colors.disabledBallBackground;
  } else if (number.indexOf('=') === 0) {
    color = Colors.matchBallText;
    backgroundColor = Colors.matchBallBackground;
  } else if (number.indexOf('!') === 0) {
    color = Colors.wrongBallText;
    backgroundColor = Colors.wrongBallBackground;
  } else if (number.indexOf('+') === 0) {
    color = Colors.bonusBallText;
    backgroundColor = Colors.bonusBallBackground;
  } else if (recentlyUpdated) {
    color = Colors.todayBallText;
    backgroundColor = Colors.todayBallBackground;
  } else {
    color = Colors.ballText;
    backgroundColor = Colors.ballBackground;
  }

  const ballStyles = styles[size];

  const questionIndex = number.indexOf('?');
  return (
    (!res || res.trim().length === 0) ? null
      : (questionIndex === 0 || questionIndex === 1 || res.trim().length > 2)
        ? (
          <Text style={[ballStyles.standardNumber, { backgroundColor, color }]}>{res}</Text>
        ) : (
          <View style={[ballStyles.circleNumber, { backgroundColor }]}>
            <Text style={[ballStyles.circleNumberText, { color }]}>{res}</Text>
          </View>
        )
  );
};
NumberCircle.defaultProps = {
  size: 'normal',
  disabled: false
};

export const NumbersCircle = (props) => {
  const {
    numbers, recentlyUpdated, disabled, size
  } = props;
  return (
    <View style={styles.numbers}>
      {numbers.map((number, index) => (
        <NumberCircle number={number} key={`${index}`} recentlyUpdated={recentlyUpdated} disabled={disabled} size={size} />
      ))}
    </View>
  );
};
NumbersCircle.defaultProps = {
  size: 'normal',
  disabled: false
};

export const NumberStandard = (props) => {
  const {
    number, recentlyUpdated, disabled, size
  } = props;
  const str = number;
  const res = str.replace('+', '').replace('=', '').replace('!', '').replace('?', '');
  let color;
  let backgroundColor;

  if (disabled) {
    color = Colors.disabledBallText;
    backgroundColor = Colors.disabledBallBackground;
  } else if (number.indexOf('+') === 1) {
    color = Colors.bonusBallText;
    backgroundColor = Colors.bonusBallBackground;
  } else if (recentlyUpdated) {
    color = Colors.todayBallText;
    backgroundColor = Colors.todayBallBackground;
  } else {
    color = Colors.ballText;
    backgroundColor = Colors.ballBackground;
  }

  const ballStyles = styles[size];

  return (
    (!number || number.trim().length === 0) ? null : (
      <Text style={[ballStyles.standardNumber, { backgroundColor, color }]} size={size} disabled={disabled}>{res}</Text>
    )
  );
};
NumberStandard.defaultProps = {
  size: 'normal',
  disabled: false
};

export const NumbersStandard = (props) => {
  const {
    numbers, recentlyUpdated, size, disabled
  } = props;
  return (
    <View style={styles.standardNumbers}>
      {numbers.map((number, index) => (
        <NumberStandard key={`${index}`} number={number} recentlyUpdated={recentlyUpdated} size={size} disabled={disabled} />
      ))}
    </View>
  );
};
NumbersStandard.defaultProps = {
  size: 'normal',
  disabled: false
};

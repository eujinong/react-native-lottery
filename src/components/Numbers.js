import React from 'react';
import { View, Text } from 'react-native';

import { Colors, Metrics, Fonts } from '../theme';

const styles = {
  circleNumbers: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
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
  standardNumbers: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  standardNumber: {
    marginRight: Metrics.padding.tiny,
    padding: Metrics.padding.tiny * 0.5,
    margin: Metrics.padding.tiny * 0.3
  }
};

export const NumberCircle = (props) => {
  const {
    number, recentlyUpdated
  } = props;
  const str = number;
  const res = str.replace('+', '').replace('=', '').replace('!', '').replace('?', '');
  let color;
  let backgroundColor;

  if (number.indexOf('=') === 0) {
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

  const questionIndex = number.indexOf('?');
  return (
    (!res || res.trim().length === 0) ? null
      : (questionIndex === 0 || questionIndex === 1 || res.trim().length > 2)
        ? (
          <Text style={[styles.standardNumber, { backgroundColor, color }]}>{res}</Text>
        ) : (
          <View style={[styles.circleNumber, { backgroundColor }]}>
            <Text style={[styles.circleNumberText, { color }]}>{res}</Text>
          </View>
        )
  );
};

export const NumbersCircle = (props) => {
  const { numbers, recentlyUpdated } = props;
  return (
    <View style={styles.circleNumbers}>
      {numbers.map((number, subindex) => (
        <NumberCircle number={number} key={`${subindex}`} recentlyUpdated={recentlyUpdated} />
      ))}
    </View>
  );
};

export const NumberStandard = (props) => {
  const { number, recentlyUpdated } = props;
  const str = number;
  const res = str.replace('+', '').replace('=', '').replace('!', '').replace('?', '');
  let color;
  let backgroundColor;

  if (number.indexOf('+') === 1) {
    color = Colors.bonusBallText;
    backgroundColor = Colors.bonusBallBackground;
  } else if (recentlyUpdated) {
    color = Colors.todayBallText;
    backgroundColor = Colors.todayBallBackground;
  } else {
    color = Colors.ballText;
    backgroundColor = Colors.ballBackground;
  }

  return (
    (!number || number.trim().length === 0) ? null : (
      <Text style={[styles.standardNumber, { backgroundColor, color }]}>{res}</Text>
    )
  );
};

export const NumbersStandard = (props) => {
  const { numbers, recentlyUpdated } = props;
  return (
    <View style={styles.standardNumbers}>
      {numbers.map((number, index) => (
        <NumberStandard key={`${index}`} number={number} recentlyUpdated={recentlyUpdated} />
      ))}
    </View>
  );
};

export default NumbersStandard;

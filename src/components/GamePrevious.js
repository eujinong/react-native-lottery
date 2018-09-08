import React from 'react';
import { View, Text } from 'react-native';
import moment from 'moment';
import { Metrics, Colors, Fonts } from '../theme';
import { NumbersCircle } from './Numbers';

const styles = {
  container: {
    paddingVertical: Metrics.padding.tiny
  },
  title: {
    textAlign: 'center',
    color: Colors.text,
    fontWeight: Fonts.weight.bold,
    fontSize: Fonts.size.h4
  },
  results: {

  },
  row: {
    flex: 'row'
  },
  date: {
    color: Colors.textMuted,
    fontWeight: Fonts.weight.bold,
    fontSize: Fonts.size.h6
  },
  result: {
    borderLeft: 1,
    borderColor: Colors.textMuted
  }
};
const GamePrevious = (props) => {
  const {
    data
  } = props;
  const renderResults = [];
  for (let i = data.length - 1; i >= 0; i--) {
    const item = data[i];
    const date = moment(item.date, 'YYYY-MM-DD').format('DD/MM');
    const renderResult = (
      <View style={styles.row}>
        <Text style={styles.date}>{date}</Text>
        <View style={styles.result}>
          <NumbersCircle number={item.score} key={`${i}`} recentlyUpdated={false} disabled size="small" />
        </View>
      </View>
    );
    renderResults.push(renderResult);
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Previous Result</Text>
      <View style={styles.results}>
        {renderResults}
      </View>
    </View>
  );
};

export default GamePrevious;

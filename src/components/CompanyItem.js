import React from 'react';
import {
  Image, TouchableOpacity, Text, View
} from 'react-native';

import {
  Colors, Fonts, Metrics, Images
} from '../theme';

const styles = {
  container: {
    paddingTop: Metrics.padding.tiny,
    paddingHorizontal: Metrics.padding.tiny,
    justifyContent: 'center',
    alignItems: 'center',
    aspectRatio: 1,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Colors.border
  },
  image: {
    borderRadius: 10,
    width: 80,
    height: 80
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    textAlign: 'center',
    fontSize: Fonts.size.default,
    color: Colors.text
  }
};

const CompanyItem = (props) => {
  const { data } = props;
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={Metrics.touchableOpacity}
      onPress={() => { props.onPress(data); }}>
      {
        data.logo && <Image style={styles.image} resizeMode="cover" source={{ uri: data.logo }} />
      }
      <View style={styles.content}>
        <Text style={styles.text}>{data.title}</Text>
      </View>
    </TouchableOpacity>
  );
};

CompanyItem.defaultProps = {
  onPress: () => {}
};

export default CompanyItem;

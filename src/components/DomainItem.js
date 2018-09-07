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
    borderColor: Colors.domainItemBorder
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
    fontSize: Fonts.size.default
  }
};

const DomainItem = (props) => {
  const { data } = props;
  return (
    <TouchableOpacity style={styles.container} activeOpacity={Metrics.touchableOpacity}>
      <Image style={styles.image} resizeMode="cover" source={Images.splash} />
      <View style={styles.content}>
        <Text style={styles.text}>{data.country}</Text>
      </View>
    </TouchableOpacity>
  );
};

DomainItem.defaultProps = {
  onPress: () => {}
};

export default DomainItem;

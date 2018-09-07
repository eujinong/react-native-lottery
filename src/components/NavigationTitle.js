import React from 'react';
import { View, Image, Text } from 'react-native';
import { Colors, Fonts } from '../theme';

const styles = {
  container: {

  },
  image: {

  },
  text: {
    flexGrow: 1,
    fontSize: Fonts.size.h6,
    color: Colors.navigationText
  }
};

const NavigationTitle = (props) => {
  const { text } = props;
  return (
    <View style={styles.container}>
      <Image style={styles.image} />
      <Text>{text}</Text>
    </View>
  );
};

export default NavigationTitle;

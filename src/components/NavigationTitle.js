import React from 'react';
import { View, Image, Text } from 'react-native';
import { Colors, Fonts, Images } from '../theme';

const styles = {
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: 50,
    height: 30,
    marginRight: 10
  },
  text: {
    fontWeight: Fonts.weight.bold,
    fontSize: Fonts.size.h6,
    color: Colors.navigationText
  }
};

const NavigationTitle = (props) => {
  const { text, logo } = props;
  return (
    <View style={styles.container}>
      {
        logo && <Image style={styles.image} source={logo} resizeMode="contain" />
      }
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

NavigationTitle.defaultProps = {
  logo: Images.logo
};

export default NavigationTitle;

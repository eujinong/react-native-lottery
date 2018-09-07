import React from 'react';
import { View, Image, ActivityIndicator } from 'react-native';
import { Colors, Images, Styles } from '../theme';

const SplashScreen = () => (
  <View style={Styles.container}>
    <Image style={Styles.fill} source={Images.splash} resizeMode="cover" />
    <ActivityIndicator style={[Styles.container, Styles.justifyContentCenter, Styles.alignItemsCenter]} size="small" color={Colors.activityIndicator} />
  </View>
);

export default SplashScreen;

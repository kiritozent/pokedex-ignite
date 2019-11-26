import { StyleSheet, Platform } from 'react-native';
import { convertPtToPx } from '../../Lib/helpers';
import metrics from '../../Themes/Metrics';

export default StyleSheet.create({
  carouselContainer: {
    width: metrics.screenWidth - convertPtToPx(6.7),
    height: convertPtToPx(66.7),
    flexDirection: 'column',
  },
  carouselImage: {
    width: metrics.screenWidth - convertPtToPx(6.7),
    height: convertPtToPx(66.7),
    resizeMode: 'contain',
  },
});

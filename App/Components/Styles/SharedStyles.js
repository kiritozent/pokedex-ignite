import { StyleSheet, Platform } from 'react-native';
import { convertPtToPx } from '../../Lib/helpers';
import colors from '../../Themes/Colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.silver,
    justifyContent: 'center',
  },
  flatList: { flexGrow: 1, width: '100%' },
  loadMoreIndicator: { paddingBottom: convertPtToPx(8) },
  itemContainer: {
    padding: convertPtToPx(1.3),
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: convertPtToPx(0.7),
    marginBottom: convertPtToPx(2.7),
    shadowOffset: { height: convertPtToPx(0.3) },
    shadowRadius: convertPtToPx(0.7),
    shadowColor: 'rgb(211,211,211)',
    shadowOpacity: 1,
    elevation: convertPtToPx(0.7),
  },
  roomContainer: {
    flexDirection: 'row',
  },
  flatListPaddingHorizontal:
    Platform.OS === 'android'
      ? { paddingHorizontal: convertPtToPx(4) }
      : { marginHorizontal: convertPtToPx(4) },
  flatListPaddingVertical:
    Platform.OS === 'android'
      ? { paddingVertical: convertPtToPx(4) }
      : { marginVertical: convertPtToPx(4) },
  fullScreenModal: {
    margin: 0,
    backgroundColor: colors.steel,
  },
});

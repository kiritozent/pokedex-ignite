import { StyleSheet, Platform } from 'react-native';
import { convertPtToPx } from '../../Lib/helpers';
import colors from '../../Themes/Colors';

export default StyleSheet.create({
  statsItemContainer: {
    paddingVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  statsItemDesc: {
    fontSize: convertPtToPx(4.7),
    textTransform: 'capitalize',
    flex: 1,
    color: colors.charcoal,
  },
  statsItemValue: { fontSize: convertPtToPx(6), color: colors.primary },
});

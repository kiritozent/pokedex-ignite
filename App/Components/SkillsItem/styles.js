import { StyleSheet, Platform } from 'react-native';
import { convertPtToPx } from '../../Lib/helpers';
import colors from '../../Themes/Colors';

export default StyleSheet.create({
  skillsItemContainer: {
    paddingVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  skillsItemIcon: {
    marginRight: 8,
    marginTop: convertPtToPx(1),
  },
  skillsItemText: {
    fontSize: convertPtToPx(6),
    textTransform: 'capitalize',
    color: colors.primary,
  },
});

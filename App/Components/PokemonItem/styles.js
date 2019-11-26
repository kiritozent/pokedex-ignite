import { StyleSheet, Platform } from 'react-native';
import { convertPtToPx } from '../../Lib/helpers';
import colors from '../../Themes/Colors';

export default StyleSheet.create({
  pokemonItemImage: { width: convertPtToPx(20), height: convertPtToPx(20) },
  pokemonItemView: {
    flexDirection: 'column',
    marginLeft: convertPtToPx(2),
    flex: 1,
  },
  pokemonItemNameText: {
    fontSize: convertPtToPx(5),
    color: colors.primary,
    textTransform: 'capitalize',
    flex: 1,
    marginTop: convertPtToPx(1),
  },
  pokemonItemTypes: {
    fontSize: convertPtToPx(4.7),
    color: colors.gray,
    textTransform: 'capitalize',
  },
  pokemonItemTypesText: {
    fontSize: convertPtToPx(4.7),
    color: colors.darkGray,
    textTransform: 'capitalize',
  },
  pokemonItemAbilities: {
    fontSize: convertPtToPx(4.7),
    color: colors.gray,
    textTransform: 'capitalize',
  },
  pokemonItemAbilitiesText: {
    fontSize: convertPtToPx(4.7),
    color: colors.darkGray,
  },
  pokemonItemId: {
    backgroundColor: colors.primary,
    position: 'absolute',
    padding: convertPtToPx(1.5),
    top: convertPtToPx(2),
    right: convertPtToPx(-1.5),
  },
  pokemonItemIdText: {
    color: colors.white,
    textTransform: 'capitalize',
    fontSize: convertPtToPx(4),
  },
  pokemonItemIdTriangle: {
    width: 0,
    height: 0,
    borderLeftWidth: 6,
    borderTopWidth: 3,
    borderBottomWidth: 3,
    borderStyle: 'solid',
    backgroundColor: 'transparent',
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: colors.primary,
    position: 'absolute',
    bottom: -3.25,
    right: 0,
  },
});

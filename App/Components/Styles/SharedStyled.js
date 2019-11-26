import Styled from 'styled-components/native';
import Modal from 'react-native-modal';
import { getBottomSpace, isIphoneX } from 'react-native-iphone-x-helper';
import { convertPtToPx } from '../../Lib/helpers';
import colors from '../../Themes/Colors';

export default {
  listItemContainer: Styled.TouchableOpacity`
    padding: ${convertPtToPx(4)}px;
    border: 0.5px solid ${colors.gray};
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    background-color: ${colors.white};
  `,
  viewCard: Styled.View`
    border-top-width: 1px;
    border-top-color: ${colors.steel};
    border-bottom-width: 1px;
    border-bottom-color: ${colors.steel};
    padding: ${convertPtToPx(3.3)}px;
    padding-bottom: ${convertPtToPx(3.3) +
      (getBottomSpace() - isIphoneX ? convertPtToPx(3.3) : 0)};
    flex-direction: column;
    background-color: ${colors.white};
    align-items: flex-start;
  `,
  typeCard: Styled.View`
    padding: ${convertPtToPx(2)}px;
    background-color: ${colors.primary};
  `,
  bottomModal: Styled(Modal)`
    justify-content: flex-end;
    margin: 0;
    width: 100%;
    padding: 0;
  `,
  listHeader: Styled.Text`
    padding-top: ${convertPtToPx(6.7)}px;
    padding-bottom: ${convertPtToPx(2.7)}px;
    padding-horizontal: ${convertPtToPx(4)}px;
    text-transform: uppercase;
    color: ${colors.darkGray};
  `,
};

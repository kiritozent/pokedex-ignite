import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { convertPtToPx } from '../../Lib/helpers';
import colors from '../../Themes/Colors';
import styles from './styles';

const Index = props => {
  const { desc } = props;
  return (
    <View style={styles.skillsItemContainer}>
      <Icon
        name="circle-small"
        style={styles.skillsItemIcon}
        color={colors.charcoal}
        size={convertPtToPx(6)}
      />
      <Text style={styles.skillsItemText}>{desc}</Text>
    </View>
  );
};

Index.propTypes = {
  desc: PropTypes.string.isRequired,
};

export default Index;

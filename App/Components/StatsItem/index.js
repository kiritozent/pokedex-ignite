import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import styles from './styles';

const Index = props => {
  const { desc, value } = props;
  return (
    <View style={styles.statsItemContainer}>
      <Text style={styles.statsItemDesc}>{desc}</Text>
      <Text style={styles.statsItemValue}>{value}</Text>
    </View>
  );
};

Index.propTypes = {
  desc: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
};

export default Index;

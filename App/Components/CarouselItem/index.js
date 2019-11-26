/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { withNavigation } from 'react-navigation';
import { Image, TouchableOpacity } from 'react-native';
import styles from './styles';

const Index = props => {
  const { item, navigation } = props;
  return (
    <TouchableOpacity
      style={styles.carouselContainer}
      onPress={() => navigation.navigate('NewsDetailScreen', { data: item })}
    >
      <Image style={styles.carouselImage} source={{ uri: item }} />
    </TouchableOpacity>
  );
};

Index.propTypes = {
  item: PropTypes.object.isRequired,
};

export default withNavigation(Index);

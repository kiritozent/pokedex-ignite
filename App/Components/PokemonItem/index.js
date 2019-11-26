/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { withNavigation } from 'react-navigation';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import I18n from '../../I18n';
import SharedStyles from '../Styles/SharedStyles';
import styles from './styles';

const Index = props => {
  const { item, navigation } = props;

  const types = item.types.map(({ type }) => type.name).join(', ');
  const abilities = item.abilities
    .map(({ ability }) => ability.name)
    .join(', ');

  return (
    <TouchableOpacity
      style={[SharedStyles.itemContainer, { alignItems: 'center' }]}
      onPress={() =>
        navigation.navigate('PokemonDetailScreen', {
          data: item,
        })
      }
    >
      <Image
        source={{ uri: item.sprites.front_default }}
        style={styles.pokemonItemImage}
        resizeMode="contain"
      />
      <View style={styles.pokemonItemView}>
        <Text style={styles.pokemonItemName}>{item.name}</Text>
        <Text style={styles.pokemonItemTypes}>
          {I18n.t('types')} :{' '}
          <Text style={styles.pokemonItemTypesText}>{types}</Text>
        </Text>
        <Text style={styles.pokemonItemAbilities} numberOfLines={2}>
          {I18n.t('abilities')} :{' '}
          <Text style={styles.pokemonItemAbilitiesText}>{abilities}</Text>
        </Text>
      </View>
      <View style={styles.pokemonItemId}>
        <Text style={styles.pokemonItemIdText}>#{item.id}</Text>
        <View style={styles.pokemonItemIdTriangle} />
      </View>
    </TouchableOpacity>
  );
};

Index.propTypes = {
  item: PropTypes.object.isRequired,
};

export default withNavigation(Index);

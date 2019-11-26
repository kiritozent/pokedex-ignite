import React from 'react';
import { TouchableOpacity } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Home from '../Containers/Home';
import colors from '../Themes/Colors';
import I18n from '../I18n';
import PokemonDetailScreen from '../Containers/PokemonDetail';

const HomeNavigator = createStackNavigator(
  {
    HomeScreen: {
      screen: Home,
      navigationOptions: ({ navigation }) => {
        return {
          title: I18n.t('pokemonList'),
        };
      },
    },
    PokemonDetailScreen: {
      screen: PokemonDetailScreen,
      navigationOptions: ({ navigation }) => {
        return {
          title: I18n.t('pokemonDetail'),
          headerLeft: (
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{
                paddingHorizontal: 8,
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Icon name="chevron-left" size={30} color={colors.slateGrey} />
            </TouchableOpacity>
          ),
        };
      },
    },
  },
  {
    // Default config for all screens
    headerMode: 'screen',
    initialRouteName: 'HomeScreen',
  },
);

export default HomeNavigator;

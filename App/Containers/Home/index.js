import React, { Component } from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import pokemonActions from '../../Redux/PokemonRedux';
import { PokemonItem } from '../../Components';
import SharedStyles from '../../Components/Styles/SharedStyles';
import { convertPtToPx } from '../../Lib/helpers';

class Index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      refreshing: true,
    };

    this.onRefresh = this.onRefresh.bind(this);
    this.onLoadMore = this.onLoadMore.bind(this);
    this.renderItem = this.renderItem.bind(this);
  }

  componentDidMount() {
    const { getPokemonRequest, getPokemonFilterRequest } = this.props;

    getPokemonRequest({ nextUrl: null, filter: {} }, false);
  }

  componentWillReceiveProps(nextProps) {
    const { getPokemon } = this.props;
    const { getPokemon: nextGetPokemon } = nextProps;

    if (nextGetPokemon && nextGetPokemon.payload && !nextGetPokemon.fetching) {
      this.setState({ refreshing: false });
    }
  }

  onRefresh() {
    const { getPokemonRequest } = this.props;
    this.setState({ refreshing: true }, () =>
      getPokemonRequest({ nextUrl: null, filter: {} }, true),
    );
  }

  onLoadMore() {
    const { getPokemon, getPokemonRequest } = this.props;

    getPokemonRequest(
      {
        nextUrl: getPokemon.payload.next,
        filter: {},
      },
      false,
    );
  }

  renderItem({ item, index }) {
    const { navigation } = this.props;
    return <PokemonItem item={item} index={index} navigation={navigation} />;
  }

  render() {
    const { refreshing } = this.state;
    const { getPokemon } = this.props;
    return (
      <View style={SharedStyles.container}>
        <FlatList
          style={SharedStyles.flatList}
          refreshing={refreshing}
          onRefresh={this.onRefresh}
          keyExtractor={(item, index) => index.toString()}
          data={getPokemon.data}
          renderItem={this.renderItem}
          contentContainerStyle={[
            SharedStyles.flatListPaddingHorizontal,
            SharedStyles.flatListPaddingVertical,
          ]}
          onEndReached={this.onLoadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            getPokemon.payload &&
            getPokemon.payload.next && (
              <View>
                <ActivityIndicator style={SharedStyles.loadMoreIndicator} />
              </View>
            )
          }
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  getPokemon: state.pokemon.getPokemon,
});

const mapDispatchToProps = dispatch => ({
  getPokemonRequest: (param, reset) =>
    dispatch(pokemonActions.getPokemonRequest(param, reset)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Index);

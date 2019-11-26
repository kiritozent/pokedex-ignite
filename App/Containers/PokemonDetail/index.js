/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import { View, ScrollView, ActivityIndicator, Text } from 'react-native';
import { connect } from 'react-redux';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import I18n from '../../I18n';
import pokemonActions from '../../Redux/PokemonRedux';
import SharedStyled from '../../Components/Styles/SharedStyled';
import SharedStyles from '../../Components/Styles/SharedStyles';
import { convertPtToPx } from '../../Lib/helpers';
import colors from '../../Themes/Colors';
import { CarouselItem, SkillsItem, StatsItem } from '../../Components';
import metrics from '../../Themes/Metrics';

class Index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeSlide: 0,
      images: [],
      types: [],
    };

    this.renderBasicStats = this.renderBasicStats.bind(this);
    this.renderItemCarousel = this.renderItemCarousel.bind(this);
  }

  componentDidMount() {
    const {
      navigation,
      getPokemonDetailRequest,
      getPokemonSkillsRequest,
    } = this.props;

    const data = navigation.getParam('data');

    // console.log({ data });

    getPokemonDetailRequest(data.id);
    getPokemonSkillsRequest(data.abilities);
  }

  componentWillReceiveProps(nextProps) {
    const { getPokemonDetail } = nextProps;

    if (
      getPokemonDetail &&
      getPokemonDetail.payload &&
      !getPokemonDetail.fetching
    ) {
      const { payload } = getPokemonDetail;

      const tempImages = [];

      Object.keys(payload.sprites).forEach(key => {
        if (payload.sprites[key] !== null) {
          tempImages.push(payload.sprites[key]);
        }
      });

      const types = payload.types.map(({ type }) => type.name).join(', ');

      this.setState({ images: tempImages, types }, () => {});
    }
  }

  get pagination() {
    const { activeSlide, images } = this.state;
    return (
      <Pagination
        dotsLength={images.length}
        activeDotIndex={activeSlide}
        containerStyle={{ position: 'absolute', bottom: -17.5, left: -12.5 }}
        dotContainerStyle={{ marginHorizontal: 3 }}
        dotStyle={{
          width: convertPtToPx(5.3),
          height: convertPtToPx(1),
          marginHorizontal: 0,
          backgroundColor: colors.primary,
          borderRadius: 0,
        }}
        inactiveDotScale={1}
        inactiveDotOpacity={0.5}
      />
    );
  }

  renderItemCarousel({ item, index }) {
    const { navigation } = this.props;
    return <CarouselItem item={item} navigation={navigation} key={index} />;
  }

  renderBasicStats() {
    const { getPokemonDetail } = this.props;
    const { types } = this.state;
    const { payload } = getPokemonDetail;
    return (
      <View style={{ width: '100%', paddingTop: 8 }}>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 24,
            textTransform: 'capitalize',
            color: colors.primary,
          }}
        >
          {payload.name}
        </Text>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            paddingVertical: 16,
          }}
        >
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1,
              borderRightWidth: 1,
              borderRightColor: colors.steel,
            }}
          >
            <Text style={{ fontSize: 18, color: colors.primary }}>
              {`${payload.height}${I18n.t('inch')}`}
            </Text>
            <Text
              style={{
                paddingTop: 8,
                fontSize: 16,
                color: colors.charcoal,
              }}
            >
              {I18n.t('height')}
            </Text>
          </View>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1,
              borderRightWidth: 1,
              borderRightColor: colors.steel,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                color: colors.primary,
                textTransform: 'capitalize',
              }}
            >
              {types}
            </Text>
            <Text
              style={{
                paddingTop: 8,
                fontSize: 16,
                color: colors.charcoal,
              }}
            >
              {I18n.t('types')}
            </Text>
          </View>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1,
            }}
          >
            <Text style={{ fontSize: 18, color: colors.primary }}>
              {`${payload.weight}${I18n.t('lbs')}`}
            </Text>
            <Text
              style={{
                paddingTop: 8,
                fontSize: 16,
                color: colors.charcoal,
              }}
            >
              {I18n.t('weight')}
            </Text>
          </View>
        </View>
      </View>
    );
  }

  render() {
    const { getPokemonDetail } = this.props;
    const { images } = this.state;
    const { fetching, payload } = getPokemonDetail;

    if (payload && !fetching) {
      return (
        <View style={SharedStyles.container}>
          <ScrollView>
            <SharedStyled.viewCard>
              <View style={{ flex: 1 }}>
                <Carousel
                  data={images}
                  renderItem={this.renderItemCarousel}
                  onSnapToItem={index => this.setState({ activeSlide: index })}
                  sliderWidth={metrics.screenWidth}
                  itemWidth={metrics.screenWidth}
                />
                {this.pagination}
              </View>
              {this.renderBasicStats()}
            </SharedStyled.viewCard>
            <SharedStyled.listHeader>
              {I18n.t('abilities')}
            </SharedStyled.listHeader>
            <SharedStyled.viewCard>
              {payload.abilities.map((item, index) => (
                <SkillsItem desc={item.ability.name} key={index} />
              ))}
            </SharedStyled.viewCard>
            <SharedStyled.listHeader>{I18n.t('stats')}</SharedStyled.listHeader>
            <SharedStyled.viewCard>
              {payload.stats.map((item, index) => (
                <StatsItem
                  desc={item.stat.name}
                  value={item.base_stat}
                  key={index}
                />
              ))}
            </SharedStyled.viewCard>
          </ScrollView>
        </View>
      );
    }

    return (
      <View
        style={[SharedStyles.container, { paddingVertical: convertPtToPx(4) }]}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  getPokemonDetail: state.pokemon.getPokemonDetail,
  getPokemonSkills: state.pokemon.getPokemonSkills,
});

const mapDispatchToProps = dispatch => ({
  getPokemonDetailRequest: pokemonId =>
    dispatch(pokemonActions.getPokemonDetailRequest(pokemonId)),
  getPokemonSkillsRequest: data =>
    dispatch(pokemonActions.getPokemonSkillsRequest(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Index);

import { takeLatest, all } from 'redux-saga/effects';
import API from '../Services/Api';
import DebugConfig from '../Config/DebugConfig';

/* ------------- Types ------------- */

import { PokemonTypes } from '../Redux/PokemonRedux';
import {
  getPokemon,
  getPokemonDetail,
  getPokemonSkills,
  getPokemonFilter,
} from './PokemonSagas';

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = API.create();

/* ------------- Connect Types To Sagas ------------- */

export default function* root() {
  yield all([
    // EVENT
    takeLatest(PokemonTypes.GET_POKEMON_REQUEST, getPokemon, api),
    takeLatest(PokemonTypes.GET_POKEMON_DETAIL_REQUEST, getPokemonDetail, api),
    takeLatest(PokemonTypes.GET_POKEMON_SKILLS_REQUEST, getPokemonSkills, api),
    takeLatest(PokemonTypes.GET_POKEMON_FILTER_REQUEST, getPokemonFilter, api),
  ]);
}

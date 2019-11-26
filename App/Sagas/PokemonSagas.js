/* ***********************************************************
 * A short word on how to use this automagically generated file.
 * We're often asked in the ignite gitter channel how to connect
 * to a to a third party api, so we thought we'd demonstrate - but
 * you should know you can use sagas for other flow control too.
 *
 * Other points:
 *  - You'll need to add this saga to sagas/index.js
 *  - This template uses the api declared in sagas/index.js, so
 *    you'll need to define a constant in that file.
 *************************************************************/

import { call, put, all, delay } from 'redux-saga/effects';
import PokemonActions from '../Redux/PokemonRedux';
// import { InboxSelectors } from '../Redux/InboxRedux'

export function* getPokemon(api, action) {
  const { param } = action;

  const response = yield call(api.getPokemon, param);
  if (response.ok) {
    yield all([put(PokemonActions.getPokemonSuccess(response.data))]);
  } else {
    yield put(PokemonActions.getPokemonFailure());
  }
}

export function* getPokemonDetail(api, action) {
  const { param } = action;
  const response = yield call(api.getPokemonDetail, param);
  if (response.ok) {
    yield put(PokemonActions.getPokemonDetailSuccess(response.data));
  } else {
    yield put(PokemonActions.getPokemonDetailFailure());
  }
}

export function* getPokemonSkills(api, action) {
  const { data } = action;
  if (Array.isArray(data)) {
    const response = yield call(api.getPokemonSkills, data);
    if (Array.isArray(response)) {
      yield put(PokemonActions.getPokemonSkillsSuccess(response));
    } else {
      yield put(PokemonActions.getPokemonSkillsFailure());
    }
  } else {
    yield put(PokemonActions.getPokemonSkillsFailure());
  }
}

export function* getPokemonFilter(api, action) {
  const responseColors = yield call(api.getPokemonColors);
  const responseTypes = yield call(api.getPokemonTypes);
  const responseHabitats = yield call(api.getPokemonHabitats);

  if (responseColors.ok && responseTypes.ok && responseHabitats.ok) {
    const temp = {
      pokemonColors: responseColors.data.results,
      pokemonTypes: responseTypes.data.results,
      pokemonHabitats: responseHabitats.data.results,
    };
    yield put(PokemonActions.getPokemonFilterSuccess(temp));
  } else {
    yield put(PokemonActions.getPokemonFilterFailure());
  }
}

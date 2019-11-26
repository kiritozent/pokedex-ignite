import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import {
  DEFAULT_REDUCER_STATE,
  DEFAULT_LIST_REDUCER_STATE,
} from '../Data/const';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  getPokemonRequest: ['param', 'reset'],
  getPokemonSuccess: ['payload'],
  getPokemonFailure: null,
  getPokemonDetailRequest: ['param'],
  getPokemonDetailSuccess: ['payload'],
  getPokemonDetailFailure: null,
  getPokemonSkillsRequest: ['data'],
  getPokemonSkillsSuccess: ['payload'],
  getPokemonSkillsFailure: null,
  getPokemonFilterRequest: null,
  getPokemonFilterSuccess: ['payload'],
  getPokemonFilterFailure: null,
});

export const PokemonTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  getPokemon: DEFAULT_LIST_REDUCER_STATE,
  getPokemonDetail: DEFAULT_REDUCER_STATE,
  getPokemonSkills: DEFAULT_LIST_REDUCER_STATE,
  getPokemonFilter: DEFAULT_REDUCER_STATE,
});

/* ------------- Selectors ------------- */

export const PokemonSelectors = {
  getData: state => state.data,
};

/* ------------- Reducers ------------- */

export const getPokemonRequestReducer = (state, { param, reset }) => {
  const newState = {
    ...state.getPokemon,
    fetching: true,
  };

  if (reset) {
    newState.payload = null;
    newState.data = [];
  }

  return state.merge({
    ...state,
    getPokemon: newState,
  });
};
export const getPokemonSuccessReducer = (state, { payload }) => {
  const { results } = payload;

  const newData = state.getPokemon.data.concat(results);

  return state.merge({
    ...state,
    getPokemon: { fetching: false, data: newData, payload, error: null },
  });
};
export const getPokemonFailureReducer = state => {
  return state.merge({
    ...state,
    getPokemon: { fetching: false, error: true, payload: null },
  });
};

export const getPokemonDetailRequestReducer = (state, { data }) => {
  return state.merge({
    ...state,
    getPokemonDetail: { fetching: true, data, payload: null },
  });
};
export const getPokemonDetailSuccessReducer = (state, { payload }) => {
  return state.merge({
    ...state,
    getPokemonDetail: { fetching: false, error: null, payload },
  });
};
export const getPokemonDetailFailureReducer = state => {
  return state.merge({
    ...state,
    getPokemonDetail: { fetching: false, error: true, payload: null },
  });
};

export const getPokemonSkillsRequestReducer = (state, { data }) => {
  return state.merge({
    ...state,
    getPokemonSkills: { fetching: true, payload: data, data: [], error: false },
  });
};
export const getPokemonSkillsSuccessReducer = (state, { payload }) => {
  const { results } = payload;

  const newData = state.getPokemonSkills.data.concat(results);

  return state.merge({
    ...state,
    getPokemonSkills: { fetching: false, data: newData, payload, error: null },
  });
};
export const getPokemonSkillsFailureReducer = state => {
  return state.merge({
    ...state,
    getPokemonSkills: { fetching: false, error: true, payload: null },
  });
};

export const getPokemonFilterRequestReducer = state => {
  return state.merge({
    ...state,
    getPokemonFilter: {
      fetching: true,
      payload: null,
      data: null,
      error: false,
    },
  });
};
export const getPokemonFilterSuccessReducer = (state, { payload }) => {
  return state.merge({
    ...state,
    getPokemonFilter: { fetching: false, data: payload, payload, error: null },
  });
};
export const getPokemonFilterFailureReducer = state => {
  return state.merge({
    ...state,
    getPokemonFilter: { fetching: false, error: true, payload: null },
  });
};

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_POKEMON_REQUEST]: getPokemonRequestReducer,
  [Types.GET_POKEMON_SUCCESS]: getPokemonSuccessReducer,
  [Types.GET_POKEMON_FAILURE]: getPokemonFailureReducer,
  [Types.GET_POKEMON_DETAIL_REQUEST]: getPokemonDetailRequestReducer,
  [Types.GET_POKEMON_DETAIL_SUCCESS]: getPokemonDetailSuccessReducer,
  [Types.GET_POKEMON_DETAIL_FAILURE]: getPokemonDetailFailureReducer,
  [Types.GET_POKEMON_SKILLS_REQUEST]: getPokemonSkillsRequestReducer,
  [Types.GET_POKEMON_SKILLS_SUCCESS]: getPokemonSkillsSuccessReducer,
  [Types.GET_POKEMON_SKILLS_FAILURE]: getPokemonSkillsFailureReducer,
  [Types.GET_POKEMON_FILTER_REQUEST]: getPokemonFilterRequestReducer,
  [Types.GET_POKEMON_FILTER_SUCCESS]: getPokemonFilterSuccessReducer,
  [Types.GET_POKEMON_FILTER_FAILURE]: getPokemonFilterFailureReducer,
});

// a library to wrap and simplify api calls
import apisauce from 'apisauce';

// our "constructor"
const create = (baseURL = 'https://pokeapi.co/api/v2/') => {
  // ------
  // STEP 1
  // ------
  //
  // Create and configure an apisauce-based api object.
  //
  const api = apisauce.create({
    // here are some default headers
    headers: {
      'Cache-Control': 'no-cache',
    },
    // 10 second timeout...
    timeout: 10000,
  });

  // ------
  // STEP 2
  // ------
  //
  // Define some functions that call the api.  The goal is to provide
  // a thin wrapper of the api layer providing nicer feeling functions
  // rather than "get", "post" and friends.
  //
  // I generally don't like wrapping the output at this level because
  // sometimes specific actions need to be take on `403` or `401`, etc.
  //
  // Since we can't hide from that, we embrace it by getting out of the
  // way at this level.
  //

  function getPokemonPromise(data) {
    return Promise.all(
      data.map(async item => {
        const temp = await api.get(item.url);
        return temp.data;
      }),
    );
  }

  function getPokemonBySpeciesPromise(data) {
    return Promise.all(
      data.map(async item => {
        const temp = await api.get(item.url);

        const results = await getPokemonPromise(temp.data.varieties);

        return results.data;
      }),
    );
  }

  function getPokemonSkillPromise(data) {
    return Promise.all(
      data.map(async item => {
        const temp = await api.get(item.ability.url);
        return temp.data;
      }),
    );
  }

  const getPokemon = ({ nextUrl, filter = {} }) => {
    let url = `${baseURL}pokemon/`;
    if (nextUrl) {
      url = nextUrl;
    }

    return api
      .get(url, {
        ...filter,
      })
      .then(async result => {
        const tempResult = { ...result };

        const finalData = await getPokemonPromise(result.data.results);

        tempResult.data.results = finalData;

        return tempResult;
      });
  };

  const getPokemonDetail = pokemonId => {
    return api.get(`${baseURL}pokemon/${pokemonId}`);
  };

  const getPokemonSkills = async data => {
    const results = await getPokemonSkillPromise(data);

    return results;
  };

  const getPokemonBySpecies = async data => {
    const results = await getPokemonBySpeciesPromise(data);

    const pokemonList = [];

    results.forEach(pokemonSpecies => {
      pokemonSpecies.forEach(pokemon => {
        pokemonList.push(pokemon);
      });
    });

    return pokemonList;
  };

  const getPokemonColors = (colorId = '') => {
    const url = `${baseURL}pokemon-color/`;
    if (colorId !== '') {
      return api.get(`${baseURL}pokemon-color/${colorId}`);
    }
    return api.get(url).then(async result => {
      const tempResult = { ...result };

      const finalData = await getPokemonPromise(result.data.results);

      tempResult.data.results = finalData;

      return tempResult;
    });
  };

  const getPokemonTypes = (typeId = '') => {
    const url = `${baseURL}type/`;
    if (typeId !== '') {
      return api.get(`${baseURL}type/${typeId}`);
    }
    return api.get(url).then(async result => {
      const tempResult = { ...result };

      const finalData = await getPokemonPromise(result.data.results);

      tempResult.data.results = finalData;

      return tempResult;
    });
  };

  const getPokemonHabitats = (habitatId = '') => {
    const url = `${baseURL}pokemon-habitat/`;
    if (habitatId !== '') {
      return api.get(`${baseURL}pokemon-habitat/${habitatId}`);
    }
    return api.get(url).then(async result => {
      const tempResult = { ...result };

      const finalData = await getPokemonPromise(result.data.results);

      tempResult.data.results = finalData;

      return tempResult;
    });
  };

  // ------
  // STEP 3
  // ------
  //
  // Return back a collection of functions that we would consider our
  // interface.  Most of the time it'll be just the list of all the
  // methods in step 2.
  //
  // Notice we're not returning back the `api` created in step 1?  That's
  // because it is scoped privately.  This is one way to create truly
  // private scoped goodies in JavaScript.
  //
  return {
    // a list of the API functions from step 2
    getPokemon,
    getPokemonDetail,
    getPokemonSkills,
    getPokemonColors,
    getPokemonTypes,
    getPokemonHabitats,
    getPokemonBySpecies,
  };
};

// let's return back our create method as the default.
export default {
  create,
};

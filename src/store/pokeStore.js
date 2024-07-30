import axios from "axios";

export default {
  namespaced: true,
  state: {
    randomPokemon: null,
    selectedPokemon: null,
    description: "",
    pokedex: [],
    allPokemons: [],
  },
  mutations: {
    SET_RANDOM_POKEMON(state, pokemon) {
      state.randomPokemon = pokemon;
    },
    SET_SELECTED_POKEMON(state, pokemon) {
      state.selectedPokemon = pokemon;
    },
    SET_DESCRIPTION(state, description) {
      state.description = description;
    },
    ADD_TO_POKEDEX(state, pokemon) {
      if (!state.pokedex.some((p) => p.id === pokemon.id)) {
        state.pokedex.push(pokemon);
      }
    },
    REMOVE_FROM_POKEDEX(state, pokemonId) {
      state.pokedex = state.pokedex.filter((p) => p.id !== pokemonId);
    },
    SET_ALL_POKEMONS(state, pokemons) {
      state.allPokemons = pokemons;
    },
  },
  actions: {
    async fetchRandomPokemon({ commit }) {
      try {
        const randomId = Math.floor(Math.random() * 898) + 1; // La PokeAPI tiene 898 pokémon en total
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${randomId}`
        );
        commit("SET_RANDOM_POKEMON", response.data);
        const speciesResponse = await axios.get(response.data.species.url);
        const descriptionEntry = speciesResponse.data.flavor_text_entries.find(
          (entry) => entry.language.name === "es"
        );
        commit(
          "SET_DESCRIPTION",
          descriptionEntry
            ? descriptionEntry.flavor_text
            : "No description available"
        );
      } catch (error) {
        console.error(error);
      }
    },
    async fetchPokemonDetails({ commit }, pokemonId) {
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
        );
        commit("SET_SELECTED_POKEMON", response.data);
        const speciesResponse = await axios.get(response.data.species.url);
        const descriptionEntry = speciesResponse.data.flavor_text_entries.find(
          (entry) => entry.language.name === "es"
        );
        commit(
          "SET_DESCRIPTION",
          descriptionEntry
            ? descriptionEntry.flavor_text
            : "No description available"
        );
      } catch (error) {
        console.error(error);
      }
    },
    async fetchAllPokemons({ commit }) {
      try {
        const response = await axios.get(
          "https://pokeapi.co/api/v2/pokemon?limit=898"
        );
        const allPokemons = await Promise.all(
          response.data.results.map(async (pokemon) => {
            const pokemonDetails = await axios.get(pokemon.url);
            return pokemonDetails.data;
          })
        );
        commit("SET_ALL_POKEMONS", allPokemons);
      } catch (error) {
        console.error(error);
      }
    },
    addPokemonToPokedex({ commit }, pokemon) {
      commit("ADD_TO_POKEDEX", pokemon);
    },
    removePokemonFromPokedex({ commit }, pokemonId) {
      commit("REMOVE_FROM_POKEDEX", pokemonId);
    },
  },
  getters: {
    randomPokemon: (state) => state.randomPokemon,
    selectedPokemon: (state) => state.selectedPokemon,
    description: (state) => state.description,
    pokedex: (state) => state.pokedex,
    allPokemons: (state) => state.allPokemons,
  },
};

//Axios para solicitudes HTTP
import axios from "axios";

export default {
  //Exporta un objeto que contiene la configuración del sotore (Por estar acostumbrada a trabajar con modularización)
  //El napespaced indica que este módulo del store tiene su propio espacio y todo lo que ocurre dentro está aislado.
  namespaced: true,
  state: {
    currentPokemon: null, //Pokemon que se muestra actualmente
    detailedPokemon: null, //Pokemon que se slecciona para ver los detalles
    pokedex: [], //Array que contiene los Pokemon agregados a la Pokedex del usuario
    pokemonList: [], //Array que contiene la lista completa de los Pokemon con todos los detalles
  },

  //Son las funciones que modifican el estado de arriba
  mutations: {
    setCurrentPokemon(state, payload) { //Establece el Pokemon actual que se está mostrando
      state.currentPokemon = payload;  
    },
    setDetailedPokemon(state, payload) { //Establece el Pokemon seleccionado para ver los detalles (tiene los detalles dentro)
      state.detailedPokemon = payload;
    },
    addToPokedex(state, payload) { //Agrega un Pokemon al state pokedex pero sólo si ya no está presente
      if (!state.pokedex.some((p) => p.id === payload.id)) {
        state.pokedex.push(payload);
      }
    },
    removeFromPokedex(state, pokemonId) { //Elimina un Pokemon del array pokedex usando su ID
      state.pokedex = state.pokedex.filter((p) => p.id !== pokemonId);
    },
    setPokemonList(state, payload) { //Establece la lista completa de Pokemon con sus detalles
      state.pokemonList = payload;
    },
  },
  actions: {

    //Se define la acción
    async initializePokemonData({ commit, state }) {
      if (state.pokemonList.length > 0) { //Verifica si pokemonList ya tiene datos para evitar hacer una solicitud innecesaria.
        return state.pokemonList;
      } else {  //  Si no hay datos
        try {
          const response = await axios.get( //Hace una solicitud a la API para obtener todos los Pokemon con un máximo de 898
            "https://pokeapi.co/api/v2/pokemon?limit=898"
          );
          const pokemonList = await Promise.all(   //Para cada Pokemon en la lista hace otra solicitud para obtener detalles adicionales
            response.data.results.map(async (pokemon) => {
              const { data } = await axios.get(pokemon.url);
              const { data: speciesData } = await axios.get(data.species.url);
              const description =
                speciesData.flavor_text_entries.find(             //Se obtiene la descripción en español a través de la búsqueda del prefijo "es"
                  (entry) => entry.language.name === "es"
                )?.flavor_text || "La descripción no está disponible";
              return { ...data, description };
            })
          );
          commit("setPokemonList", pokemonList); //Se almacena la lista de Pokemones en pokemonList
          const randomIndex = Math.floor(Math.random() * pokemonList.length); //Se selecciona uno aleatorio 
          commit("setCurrentPokemon", pokemonList[randomIndex]); //El Pokemon aleatorio se manda a currentPokemon
          return pokemonList;
        } catch (error) {
          console.error("Error al inicializar los datos de Pokémon:", error);
          throw error;
        }
      }
    },
    async selectPokemon({ commit, state }, pokemonId) {
      const selected = state.pokemonList.find(  //Busca en pokemonList el Pokemon que coincide con el pokemonId proporcionado
        (pokemon) => pokemon.id === pokemonId
      );
      if (selected) {
        commit("setDetailedPokemon", selected); //Si encuentra al Pokemon, lo establece como detailedPokemon y lo devuelve (Para mostrar al Pokemon con los detalles)
        return selected;
      } else {
        throw new Error("Pokemon no encontrado");
      }
    },
    async togglePokedex({ commit, state }, pokemon) { //Es lo que maneja el agregar o eliminar el pokemon de la Pokedex
      if (state.pokedex.some((p) => p.id === pokemon.id)) { //Verifica si el pokemon esta en la Pokedex
        commit("removeFromPokedex", pokemon.id);   //Si está en la Pokedex lo elimina, si no está, lo agrega.
      } else {
        commit("addToPokedex", pokemon);
      }
    },
  },
};

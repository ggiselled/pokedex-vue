<template>
  <div class="container text-center mt-5">
    <button class="btn btn-primary" @click="getRandomPokemon">¿QUIÉN ES ESE POKEMON?</button>
    <PokemonCard v-if="randomPokemon" :pokemon="randomPokemon" />
    <div class="row mt-5">
      <Filter :pokedex="pokedex" :allPokemons="allPokemons" @update:filter="updateFilteredPokemons" />
      <div class="counter mt-3">
        Pokemones encontrados: {{ discoveredCount }}/{{ totalPokemons }}
      </div>
      <PokemonCard
        v-for="pokemon in filteredPokemons"
        :key="pokemon.id"
        :pokemon="pokemon"
        :grayscale="!isInPokedex(pokemon.id)"
      />
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import PokemonCard from '../components/PokemonCard.vue'
import Filter from '../components/Filter.vue'

export default {
  components: {
    PokemonCard,
    Filter
  },
  data() {
    return {
      filter: 'ALL',
      filteredPokemons: []
    };
  },
  computed: {
    ...mapState('poke', ['randomPokemon', 'pokedex', 'allPokemons']),
    
    // Contador de Pokemones
    discoveredCount() {
      return this.pokedex.length;
    },
    totalPokemons() {
      return this.allPokemons.length;
    }
  },
  created() {
    this.fetchAllPokemons();
    this.updateFilteredPokemons(this.allPokemons); // Inicializar con todos los Pokémon
  },
  methods: {
    ...mapActions('poke', ['fetchRandomPokemon', 'fetchAllPokemons']),
    getRandomPokemon() {
      this.fetchRandomPokemon();
    },
    isInPokedex(id) {
      return this.pokedex.some(pokemon => pokemon.id === id);
    },
    updateFilteredPokemons(filteredPokemons) {
      this.filteredPokemons = filteredPokemons;
    }
  }
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: green;
}

.counter {
  font-size: 1.2em;
  font-weight: bold;
}
</style>

<template>
  <div class="container text-center mt-5">
    <div class="btn btn-home" @click="getRandomPokemon"><p>¿QUIÉN ES ESE POKEMON?</p></div>
    <PokemonCard v-if="currentPokemon" :pokemon="currentPokemon" />
    <div class="row mt-5">
      <Filter :pokedex="pokedex" :allPokemons="pokemonList" @update:filter="updateFilteredPokemons" />
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
    ...mapState('pokeStore', ['currentPokemon', 'pokedex', 'pokemonList']),
    // Contador de Pokemones
    discoveredCount() {
      return this.pokedex.length;
    },
    totalPokemons() {
      return this.pokemonList.length;
    }
  },
  created() {
    this.initializePokemonData().then(() => {
      this.updateFilteredPokemons(this.pokemonList);
      this.getRandomPokemon();
    });
  },
  methods: {
    ...mapActions('pokeStore', ['initializePokemonData']),
    getRandomPokemon() {
      const randomIndex = Math.floor(Math.random() * this.pokemonList.length);
      this.$store.commit('pokeStore/setCurrentPokemon', this.pokemonList[randomIndex]);
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
@import '../style/home.css';
@import '../style/button.css';
</style>

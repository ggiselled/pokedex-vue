<template>
  <div v-if="pokemon" class="container mt-5">
        <button class="btn btn-secondary" @click="goHome">
<i class="bi bi-caret-left-square-fill"></i>    </button>
    <div class="row">
      <div class="col-md-6">
        <img :src="pokemon.sprites.front_default" alt="pokemon image" class="img-fluid" />
      </div>
      <div class="col-md-6">
        <h1>{{ pokemon.name }}</h1>
        <p>Type: {{ pokemon.types[0].type.name }}</p>
        <p>Weight: {{ pokemon.weight }}</p>
        <p>Description: {{ description }}</p>
        <h2>Moves</h2>
        <ul>
          <li v-for="move in pokemon.moves" :key="move.move.name">{{ move.move.name }}</li>
        </ul>
        <button
          class="btn btn-primary mt-3"
          @click="togglePokedex"
        >
          {{ isInPokedex ? 'Eliminar de mi Pokedex' : 'Agregar a mi Pokedex' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters('poke', ['selectedPokemon', 'description', 'pokedex']),
    pokemon() {
      return this.selectedPokemon;
    },
    isInPokedex() {
      return this.pokedex && this.pokedex.some(pokemon => pokemon.id === this.pokemon.id);
    }
  },
  created() {
    this.fetchPokemonDetails(this.$route.params.id);
  },
  methods: {
    ...mapActions('poke', ['fetchPokemonDetails', 'addPokemonToPokedex', 'removePokemonFromPokedex']),
    togglePokedex() {
      if (this.isInPokedex) {
        this.removePokemonFromPokedex(this.pokemon.id);
      } else {
        this.addPokemonToPokedex(this.pokemon);
      }
      this.$router.push('/');
    },

        goHome() {
      this.$router.push('/');
    }
  }
}
</script>

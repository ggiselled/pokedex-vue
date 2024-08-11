<template>
  <div v-if="pokemon" class="detail-container">
    <div class="btn-details">
      <button class="btn btn-secondary" @click="goHome">
        <i class="bi bi-caret-left-square-fill"></i> Regresar
      </button>
    <div class="btn btn-toggle" @click="togglePokedexEntry">
      {{ isInPokedex ? "ELIMINAR DE MI POKEDEX" : "AGREGAR A MI POKEDEX" }}
    </div>
    </div>
    <div class="detail-info">
      <div class="detail-img">
        <img :src="pokemon.sprites.front_default" alt="pokemon image" class="img-info" />
        <h1>{{ pokemon.name }}</h1>
        <p>TIPO: {{ pokemon.types[0].type.name }}</p>
        <p>PESO: {{ pokemon.weight }}</p>
        <p class="description">DESCRIPCIÓN: {{ pokemon.description }}</p>
      </div>
      <div class="detail-mov">
        <h2>MOVIMIENTOS</h2>
        <ul>
          <li v-for="move in pokemon.moves" :key="move.move.name">
            {{ move.move.name }} |
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  computed: {
      ...mapState('pokeStore', ['detailedPokemon', 'pokedex']),
    pokemon() {
      return this.detailedPokemon;
    },
    isInPokedex() {
      return this.pokedex.some((p) => p.id === this.pokemon.id);
    },
  },
  created() {
    // Asegurarse de que los datos están listos antes de llamar a selectPokemon
    this.initializePokemonData().then(() => {
      this.selectPokemon(this.$route.params.id);
    }).catch(error => {
      console.error("Error al inicializar:", error);
    });
  },
  methods: {
     ...mapActions('pokeStore', ['selectPokemon', 'togglePokedex', 'initializePokemonData']),

    togglePokedexEntry() {
      if (this.pokemon) {
        this.togglePokedex(this.pokemon).then(() => {
          this.$router.push('/');
        }).catch(error => {
          console.error("Error al cambiar de pokedex:", error);
        });
      }
    },
    goHome() {
      this.$router.push('/');
    },
  },
};
</script>

<style scoped>
@import "../style/pokemonDetail.css";
@import "../style/button.css";
</style>

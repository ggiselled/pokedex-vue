<template>
  <div class="container">
    <div class="row">
      <PokemonCard
        v-for="pokemon in pokemons"
        :key="pokemon.name"
        :pokemon="pokemon"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import PokemonCard from './PokemonCard.vue'

export default {
  components: {
    PokemonCard
  },
  computed: {
    ...mapGetters('poke', ['pokemons'])
  },
  created() {
    this.fetchPokemons()
  },
  methods: {
    ...mapActions('poke', ['fetchPokemons'])
  }
}
</script>

<style scoped>
.container {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}
</style>

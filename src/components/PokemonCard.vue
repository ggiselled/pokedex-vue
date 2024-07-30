<template>
  <div class="card mt-5" :class="{ 'unclickable': grayscale }" @click="activePokemon">
    <img :src="pokemonImage" :class="{'grayscale': grayscale}" class="card-img-top" alt="pokemon image">
    <div class="card-body">
      <h5 class="card-title">{{ pokemon.name }}</h5>
      <p class="card-text">Tipo: {{ pokemon.types ? pokemon.types[0].type.name : '' }}</p>
      <p class="card-text">Peso: {{ pokemon.weight ? pokemon.weight : '' }} grs</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    pokemon: Object,
    grayscale: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    pokemonImage(){
      return this.pokemon.sprites?.front_default || 'placeholder_image_url';
    }
  },
  methods: {
    activePokemon() {
      if (!this.grayscale) {
        this.$router.push(`/pokemon/${this.pokemon.id}`)
      }
    }
  }
}
</script>

<style scoped>
.card {
  width: 18rem;
  margin: auto;
  cursor: pointer;
  background-color: red;
  transition: transform 0.2s;
}
.card:hover {
  transform: scale(1.05);
}
.grayscale {
  filter: grayscale(100%);
}
.unclickable {
  cursor: not-allowed;
}
.unclickable:hover {
  transform: none;
}
</style>

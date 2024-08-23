<template>
  <div class="container">
    <h1 class="my-4">Lista de Pokémon</h1>
    <b-row>
      <b-col v-for="pokemon in pokemons" :key="pokemon.id" cols="12" md="6" lg="4" class="mb-4">
        <b-card :title="pokemon.name" img-alt="Image" :img-src="pokemon.img">
          <b-card-text>
            <strong>Tipos:</strong>
            <ul>
              <li v-for="type in pokemon.types" :key="type">
                {{ type }}
              </li>
            </ul>
          </b-card-text>
          <b-button variant="primary">Detalles</b-button>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>


<script lang="ts">
import { defineComponent } from 'vue';
import { mapGetters, mapActions } from 'vuex';

export default defineComponent({
  async fetch({ store }) {
    const pokemons = store.state.pokemons;
    if (!pokemons.lengh) {
      await store.dispatch('getPokemons');
    }

  },
  computed: {
    ...mapGetters({
      pokemons: 'pokemons',
    }),
  },
  created() {
    console.log('created')
    console.log(this.pokemons)
  },
  unmounted() {
    console.log('unmounted')
    console.log(this.pokemons)
  },
});
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
}

ul {
  list-style-type: none;
  padding: 0;
}
</style>

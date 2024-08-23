<template>
  <div>
    <h1>Lista de Pokémon</h1>
    <ul>
      <li v-for="pokemon in pokemons" :key="pokemon.id">
        <img :src="pokemon.img" :alt="pokemon.name" width="50" />
        {{ pokemon.name }}
      </li>
    </ul>
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
ul {
  list-style: none;
  padding: 0;
}

li {
  margin: 10px 0;
  display: flex;
  align-items: center;
}

img {
  margin-right: 10px;
}
</style>

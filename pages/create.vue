<template>
  <div class="container">
    <h1 class="my-4">Crear Pokémon</h1>
    <b-form @submit.prevent="onSubmit">
      <b-form-group label="Nombre del Pokémon" label-for="pokemon-name">
        <b-form-input id="pokemon-name" v-model="name" required
          placeholder="Ingresa el nombre del Pokémon"></b-form-input>
      </b-form-group>

      <b-form-group label="HP" label-for="pokemon-hp">
        <b-form-input id="pokemon-hp" type="number" v-model="hp" required placeholder="HP del Pokémon"
          min="1"></b-form-input>
      </b-form-group>

      <b-form-group label="Fuerza" label-for="pokemon-strength">
        <b-form-input id="pokemon-strength" type="number" v-model="strength" required placeholder="Fuerza del Pokémon"
          min="1"></b-form-input>
      </b-form-group>

      <b-form-group label="Defensa" label-for="pokemon-defense">
        <b-form-input id="pokemon-defense" type="number" v-model="defense" required placeholder="Defensa del Pokémon"
          min="1"></b-form-input>
      </b-form-group>

      <b-form-group label="Velocidad" label-for="pokemon-speed">
        <b-form-input id="pokemon-speed" type="number" v-model="speed" required placeholder="Velocidad del Pokémon"
          min="1"></b-form-input>
      </b-form-group>

      <b-form-group label="Altura" label-for="pokemon-height">
        <b-form-input id="pokemon-height" type="number" v-model="height" required placeholder="Altura del Pokémon"
          min="1"></b-form-input>
      </b-form-group>

      <b-form-group label="Peso" label-for="pokemon-weight">
        <b-form-input id="pokemon-weight" type="number" v-model="weight" required placeholder="Peso del Pokémon"
          min="1"></b-form-input>
      </b-form-group>

      <b-form-group label="URL de la Imagen" label-for="pokemon-img">
        <b-form-input id="pokemon-img" v-model="img" required placeholder="Ingresa la URL de la imagen"></b-form-input>
      </b-form-group>

      <b-form-group label="Tipos" label-for="pokemon-types">
        <b-form-select id="pokemon-types" v-model="types" :options="typesOptions" multiple :max="2"></b-form-select>
      </b-form-group>

      <b-button type="submit" variant="primary">Crear Pokémon</b-button>
    </b-form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapGetters, mapActions } from 'vuex';
import { ActionsEnum } from '~/config/enums';

export default defineComponent({
  data() {
    return {
      name: '',
      hp: 1,
      strength: 1,
      defense: 1,
      speed: 1,
      height: 1,
      weight: 1,
      img: 'https://images.wikidexcdn.net/mwuploads/wikidex/thumb/7/77/latest/20150621181250/Pikachu.png/640px-Pikachu.png',
      types: [],
    };
  },
  computed: {
    ...mapGetters({
      typesOptions: 'types',
    }),
  },
  methods: {
    ...mapActions(['getTypes', 'createPokemon']),
    async onSubmit() {
      const newPokemon = {
        name: this.name,
        hp: this.hp,
        strength: this.strength,
        defense: this.defense,
        speed: this.speed,
        height: this.height,
        weight: this.weight,
        img: this.img,
        types: this.types,
      };

      // await this.createPokemon(newPokemon);
      await this.$store.dispatch('createPokemon', newPokemon)
      // Redirigir a la página principal después de la creación
      this.$router.push('/home');
    },
  },
  async fetch({ store }) {
    if (!store.state.types.length) {
      await store.dispatch('getTypes');
      console.log(store.state.types)
    }
  },
});
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: 0 auto;
}
</style>

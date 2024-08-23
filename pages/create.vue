<!-- <template>
  <div class="container">
    <h1 class="my-4">Crear Pokémon</h1>
    <b-form @submit.prevent="onSubmit">
      <b-form-group label="Nombre del Pokémon" label-for="pokemon-name">
        <b-form-input
          id="pokemon-name"
          v-model="name"
          required
          placeholder="Ingresa el nombre del Pokémon"
        ></b-form-input>
      </b-form-group>

      <b-form-group label="URL de la Imagen" label-for="pokemon-img">
        <b-form-input
          id="pokemon-img"
          v-model="img"
          required
          placeholder="Ingresa la URL de la imagen"
        ></b-form-input>
      </b-form-group>

      <b-form-group label="Tipos" label-for="pokemon-types">
        <b-form-select
          id="pokemon-types"
          v-model="selectedTypes"
          :options="typeOptions"
          multiple
        ></b-form-select>
      </b-form-group>

      <b-button type="submit" variant="primary">Crear Pokémon</b-button>
    </b-form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapGetters, mapActions } from 'vuex';

export default defineComponent({
  data() {
    return {
      name: '',
      img: '',
      selectedTypes: [],
    };
  },
  computed: {
    ...mapGetters({
      typeOptions: 'types',
    }),
  },
  methods: {
    ...mapActions(['getTypes', 'createPokemon']),
    async onSubmit() {
      const newPokemon = {
        name: this.name,
        img: this.img,
        types: this.selectedTypes,
      };

      await this.createPokemon(newPokemon);

      // Redirigir a la página principal después de la creación
      this.$router.push('/');
    },
  },
  async fetch() {
    await this.getTypes(); // Asegurarse de que los tipos están cargados
  },
});
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: 0 auto;
}
</style> -->

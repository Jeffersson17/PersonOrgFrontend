<template>
    <div v-if="person" class="form">
      <h1>Formulário de Atualização</h1>
        <v-container>
          <form @submit.prevent="submitUpdate" method="post">
            <v-text-field
              v-model="person.nome"
              label="Nome"
              required
            ></v-text-field>

            <v-text-field
              v-model="person.idade"
              label="Idade"
              required
            ></v-text-field>

            <v-btn
              class="me-4"
              type="submit"
            >submit</v-btn>
          </form>
        </v-container>
    </div>
    <div v-else>
      <h1>ERRO</h1>
    </div>
</template>

<script>
import { http } from '@/services/config';

export default {
  props: ['id'],
  data() {
      return {
        person: null,
    }
  },

  mounted() {
    this.fetchPerson();
  },

  methods: {

    async fetchPerson() {

      try{
        const response = await http.get(`persons/detail-api/${this.id}/`);
        this.person = response.data;
        console.log(this.person);

      } catch(error) {
        console.log('Erro ao buscar a pessoa: ', error.message);
      }
    },

    async submitUpdate() {

      try{
        // Atualiza os dados, e redireciona para a página principal
        await http.put(`persons/detail-api/${this.id}/`, this.person);
        this.$router.push({ name: 'Home' });

      } catch(error) {
        console.log('Erro ao atualizar: ', error);
      }
    }
  }
}

</script>

<style>

h1 {
  text-align: center;
  margin: 25px;
}

</style>
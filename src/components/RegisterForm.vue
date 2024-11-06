<template>
    <div class="form">
        <v-container>
          <form @submit.prevent="submitForm" method="post">
            <v-text-field
              v-model="nome"
              label="Nome"
              required
            ></v-text-field>

            <v-text-field
              v-model="idade"
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
</template>

<script>
import axios from 'axios';

export default {
  name: 'RegisterForm',
  data() {
    return {
      nome: '',
      idade: ''
    };
  },
  methods: {
    async submitForm() {
      try {
        const response = await axios.post("http://localhost:8000/persons/create-api/", {
          nome: this.nome,
          idade: this.idade
        });
        console.log('Pessoa criada com sucesso:', response.data);

        this.nome = '';
        this.idade = '';

      } catch(error) {
        console.log('Erro ao enviar os dados: ', error.data);
      }
    }
  }
}

</script>

<style scoped>

</style>
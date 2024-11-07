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
import { http } from '@/services/config';

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
      
        const response = await http.post("persons/create-api/", {
          nome: this.nome,
          idade: this.idade
        });
        console.log('Pessoa criada com sucesso:', response.message);

        this.$router.push('/');

      } catch(error) {
        console.log('Erro ao enviar os dados: ', error.message);

      }
    }
  }
}

</script>

<style scoped>

</style>
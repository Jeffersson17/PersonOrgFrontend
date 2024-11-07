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
      idade: '',
      snackbar: {
        visible: false,
        message: '',
        timeout: 3000 // Duração em milissegundos
      }
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

        this.$router.push({
          name: 'Home',
          query: { snackbarMessage: 'Cadastro realizado com sucesso!' }
        });

      } catch(error) {
        console.log('Erro ao enviar os dados: ', error.message);

        this.snackbar.message = 'Erro ao realizar o cadastro.';
        this.snackbar.visible = true;

      }
    }
  }
}

</script>

<style scoped>

</style>
<template>
    <div class="form">
        <v-container>
          <form @submit.prevent="submitForm" method="post">
            <v-text-field
              v-model="nome"
              label="Nome"
              variant="outlined"
              :error-messages="errors.nome"
              required
            ></v-text-field>

            <v-text-field
              v-model="idade"
              label="Idade"
              variant="outlined"
              :error-messages="errors.idade"
              required
            ></v-text-field>

            <v-btn
              class="me-4"
              variant="tonal"
              type="submit"
            >submit</v-btn>
          </form>

          <v-snackbar
            v-model="snackbar.visible"
            :color="snackbar.color"
            :timeout="snackbar.timeout"
          >
            {{ snackbar.message }}
            <template v-slot:action="{ attrs }">
              <v-btn
                color="white"
                text
                v-bind="attrs"
                @click="snackbar.visible = false"
              >
                Fechar
              </v-btn>
            </template>
          </v-snackbar>
        </v-container>
    </div>
</template>

<script setup>
import { http } from '@/services/config';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

// Declarando consts reativas
const nome = ref('');
const idade = ref('');
const snackbar = ref({ visible: false, message: '', color: 'success', timeout: 3000, });
const router = useRouter();
const errors = { nome: [], idade: [] };

function submitForm() {
  http.post('persons/create-api/', {
    nome: nome.value,
    idade: idade.value
  })
  .then(() => {
    // Redireciona para a página principal
    router.push({ name: 'Home', query: { snackbarMessage: 'Cadastro realizado com sucesso!' } });
  })
  .catch(error => {
    if(error.response && error.response.data) {
      errors.nome = [];
      errors.idade = [];

      // Verifica se há erros para o nome e idade
      if(error.response.data.nome) {
        errors.nome = error.response.data.nome;
      }
      if(error.response.data.idade) {
        errors.idade = error.response.data.idade;
      }

      // Exibe a mensagem de erro no snackbar
      snackbar.value.visible = true;
      snackbar.value.color = 'danger';
      snackbar.value.message = 'Erro ao realizar o cadastro.';
    }
  })
}
</script>

<style scoped>

</style>
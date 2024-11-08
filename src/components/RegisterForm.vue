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

<script setup>
import { http } from '@/services/config';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

// Declarando consts reativas
const nome = ref('');
const idade = ref('');
const snackbar = ref({ visible: false, message: '', timeout: 3000, });
const router = useRouter();

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
    snackbar.value.visible = true;
    snackbar.value.message = 'Erro ao realizar o cadastro.' + error.message;
  })
}
</script>

<style scoped>

</style>
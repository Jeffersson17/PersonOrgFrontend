<template>
  <div v-if="person" class="form">
    <h1>Formulário de Atualização</h1>
      <v-container>
        <form @submit.prevent="submitUpdate" method="post">
          <v-text-field
            v-model="person.nome"
            label="Nome"
            variant="outlined"
            :error-messages="errors.nome"
            required
          ></v-text-field>

          <v-text-field
            v-model="person.idade"
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

          <v-snackbar
            v-model="snackbar.visible"
            :color="snackbar.color"
            :timeout="snackbar.timeout"
          >
            {{ snackbar.message }}
          </v-snackbar>
        </form>
      </v-container>
  </div>
</template>

<script setup>
import { http } from '@/services/config';
import { defineProps, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

// Declarando consts reativas
const router = useRouter();
const person = ref(null);
const errors = { nome: [], idade: [] };
const props = defineProps({
  id: {
    type: [String, Number],
    required: true,
  }
});
const snackbar = ref({
    visible: false,
    message: '',
    color: 'success',
    timeout: 3000, // Timeout em milissegundos
});

// Values da pessoa
function fetchPerson() {
    http.get(`persons/detail-api/${props.id}/`)
    .then(response => {
        person.value = response.data;
    })
    .catch(error => {
      snackbar.value.visible = true;
      snackbar.value.color = 'red';
      snackbar.value.message = 'Erro ao buscar essa pessoa: ' + error.message;
    });
}

// Enviar os dados atualizados
function submitUpdate() {
  http.put(`persons/detail-api/${props.id}/`, person.value)
  .then(() => {
    router.push({ name: 'Home', query: { snackbarMessage: 'Atualização feita com sucesso!' }});
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

      snackbar.value.visible = true;
      snackbar.value.color = 'danger';
      snackbar.value.message = 'Erro ao atualizar os dados.';
    }
  })
}

// Mounted
onMounted(() => {
  fetchPerson();
});
</script>

<style>

h1 {
  text-align: center;
  margin: 30px;
}

</style>
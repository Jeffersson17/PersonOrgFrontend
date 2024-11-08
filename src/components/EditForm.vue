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

            <v-snackbar
              v-model="snackbar.visible"
              :timeout="snackbar.timeout"
              color="success"
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
          </form>
        </v-container>
    </div>
</template>

<script setup>
import { http } from '@/services/config';
import { defineProps, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

// Declarando consts reativas
const router = useRouter()
const person = ref(null);
const props = defineProps({
  id: {
    type: [String, Number],
    required: true,
  }
});
const snackbar = ref({
    visible: false,
    message: '',
    timeout: 3000, // Timeout em milissegundos
});

// Values da pessoa
function fetchPersons() {
    http.get(`persons/detail-api/${props.id}/`)
    .then(response => {
        person.value = response.data;
    })
    .catch(error => {
      snackbar.value.visible = true;
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
    snackbar.value.visible = true;
    snackbar.value.message = 'Erro ao atualizar os dados: ' + error.message;
  })
}

// Mounted
onMounted(() => {
  fetchPersons();
});
</script>

<style>

h1 {
  text-align: center;
  margin: 25px;
}

</style>
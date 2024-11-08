<template>
    <div>
        <h1 id="title-listing">Listagem de Todos os Cadastros</h1>

        <div id="create-person">
            <router-link class="btn btn-primary" to="/create">Cadastro</router-link>
            <router-view></router-view>
        </div>

        <v-table id="table-listing">
            <thead>
                <tr>
                    <th class="text-left">
                        ID
                    </th>
                    <th class="text-left">
                        NOME
                    </th>
                    <th class="text-left">
                        IDADE
                    </th>
                    <th class="text-center">
                        AÇÕES
                    </th>
                </tr>
            </thead>

            <tbody>
                <tr
                    v-for="pessoa in pessoas"
                    :key="pessoa.id"
                >
                    <td>{{ pessoa.id }}</td>
                    <td>{{ pessoa.nome }}</td>
                    <td>{{ pessoa.idade }}</td>
                    <td>
                        <div class="d-flex justify-space-around">
                            <v-icon @click="editPerson(pessoa.id)" color="blue" title="Editar">mdi-pencil</v-icon>
                            <v-icon @click="deletePerson(pessoa.id)" color="red" title="Deletar">mdi-delete</v-icon>
                        </div>
                    </td>
                </tr>
            </tbody>

            <v-snackbar
                v-model="snackbar.visible"
                :timeout="snackbar.timeout"
                :color="snackbar.color"
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
        </v-table>
    </div>
</template>

<script setup>
import { http } from '@/services/config';
import { ref, onMounted, nextTick } from 'vue';
import { useRoute, useRouter } from 'vue-router';

// Declarando consts reativas
const route = useRoute();
const router = useRouter();
const pessoas = ref([]);
const snackbar = ref({
    visible: false,
    message: '',
    color: 'success',
    timeout: 3000, // Timeout em milissegundos
});

// Listing
function fetchPersons() {
    http.get('persons/list-api/')
    .then(response => {
        pessoas.value = response.data;
    })
    .catch(error => {
        snackbar.value.visible = true;
        snackbar.value.color = 'red';
        snackbar.value.message = 'Erro ao buscar as pessoas: ' + error.message;
    });
}

// Update
function editPerson(id) {
    router.push({ name: 'Update', params: {id} });
}

// Delete
function deletePerson(id) {
    http.delete(`persons/detail-api/${id}/`)
    .then(() => {
        // Atualiza a lista removendo a pessoa com o id correspondente
        fetchPersons();

        snackbar.value.visible = true;
        snackbar.value.message = 'Exclusão feita com sucesso!';
    })
    .catch(error => {
        snackbar.value.visible = true;
        snackbar.value.color = 'danger';
        snackbar.value.message = 'Erro ao excluir essa pessoa: ' + error.message;
    });
}

// Mounted
onMounted(() => {
    fetchPersons();

    // Snackbar do RegisterForm e EditForm
    nextTick(() => {
        const message = route.query.snackbarMessage;

        if(message) {
            snackbar.value.message = message;
            snackbar.value.visible = true;
            // Limpa a query da URL
            router.replace({ name: 'Home', query: {} });
        }
    });
});
</script>

<style scoped>
#title-listing {
    text-align: center;
}

#create-person {
  margin: 40px;
  text-align: left;
}

</style>
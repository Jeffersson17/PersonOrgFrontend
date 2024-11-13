<template>
    <div>
        <h1 id="title-listing">Listagem de Todas as Organizações</h1>

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
                        TELEFONE
                    </th>
                    <th class="text-left">
                        CIDADE
                    </th>
                    <th class="text-left">
                        ENDEREÇO
                    </th>
                    <th class="text-left">
                        AREA
                    </th>
                    <th class="text-center">
                        AÇÕES
                    </th>
                </tr>
            </thead>

            <tbody>
                <tr
                    v-for="organization in organizations"
                    :key="organization.id"
                >
                    <td>{{ organization.id }}</td>
                    <td>{{ organization.name }}</td>
                    <td>{{ organization.phone }}</td>
                    <td>{{ organization.address.city.name }}</td>
                    <td>{{ organization.address.address }}</td>
                    <td>{{ organization.area }}</td>
                    <td>
                        <div class="d-flex justify-space-around">
                            <v-icon @click="editOrganization(organization.id)" color="blue" title="Editar">mdi-pencil</v-icon>
                            <v-icon @click="deleteOrganization(organization.id)" color="red" title="Deletar">mdi-delete</v-icon>
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
const organizations = ref([]);
const snackbar = ref({
    visible: false,
    message: '',
    color: 'success',
    timeout: 3000, // Timeout em milissegundos
});

// Listing
function fetchOrganizations() {
    http.get('organization/list-api/')
    .then(response => {
        organizations.value = response.data;
        console.log(response.data)
    })
    .catch(error => {
        snackbar.value.visible = true;
        snackbar.value.color = 'red';
        snackbar.value.message = 'Erro ao buscar as organizações: ' + error.message;
    });
}

// Update
function editOrganization(id) {
    router.push({ name: 'Update', params: {id} });
}

// Delete
function deleteOrganization(id) {
    http.delete(`organizations/detail-api/${id}/`)
    .then(() => {
        // Atualiza a lista após a exclusão
        fetchOrganizations();

        snackbar.value.visible = true;
        snackbar.value.message = 'Exclusão feita com sucesso!';
    })
    .catch(error => {
        snackbar.value.visible = true;
        snackbar.value.color = 'danger';
        snackbar.value.message = 'Erro ao excluir essa organização: ' + error.message;
    });
}

// Mounted
onMounted(() => {
    fetchOrganizations();

    // Snackbar do RegisterOrganization e EditOrganization
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
    margin: 30px;
}

#create-person {
  margin: 40px;
  text-align: left;
}

</style>
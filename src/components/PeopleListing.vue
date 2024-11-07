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
        </v-table>
    </div>
</template>

<script>
import { http } from '@/services/config';

    export default {
        name: 'PeopleListing',
        data() {
            return {
                pessoas: [],
                snackbar: {
                    visible: false,
                    message: '',
                    timeout: 3000 // Duração em milissegundos
            }
            }
        },
        mounted() {
            this.fetchPersons();

            const message = this.$route.query.snackbarMessage;
            if(message) {
                this.snackbar.message = message;
                this.snackbar.visible = true;

                // Limpa query  da URL
                this.$router.replace({
                    name: 'Home',
                    query: {}
                })
            }
        },
        methods: {
            async fetchPersons() {

                try {
                    const response = await http.get('persons/list-api/');
                    this.pessoas = response.data;

                } catch (error) {
                    console.error('Erro ao buscar os dados: ', error.message);
            }
        },

        editPerson(id) {
            // Redireciona para a rota de edição
            this.$router.push({ name: 'Update', params: { id } });
        },

        async deletePerson(id) {
            try {
                await http.delete(`persons/detail-api/${id}/`);
                this.snackbar.message = 'Exclusão feita com sucesso!';
                this.snackbar.visible = true;

                // Atualiza a listagem após a exclusão
                this.pessoas = this.pessoas.filter(person => person.id !== id);

            } catch(error) {
                console.log('Erro ao exluir a pessoa desejada: ',error.message);

                this.snackbar.message = 'Erro ao excluir a pessoa desejada.';
                this.snackbar.visible = true;
            }
        }
    }
}
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
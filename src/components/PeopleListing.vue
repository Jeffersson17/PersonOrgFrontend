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
        </v-table>
    </div>
</template>

<script>
import { http } from '@/services/config';

    export default {
        name: 'PeopleListing',
        data() {
            return {
                pessoas: []
            }
        },
        mounted() {
            this.fetchPersons();
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

                // Atualiza a listagem após a exclusão
                this.pessoas = this.pessoas.filter(person => person.id !== id);

            } catch(error) {
                console.log('Erro ao exluir a pessoa desejada: ',error.message);
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
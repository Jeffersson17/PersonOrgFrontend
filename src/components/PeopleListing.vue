<template>
    <div>
        <h1 id="title-listing">Listagem de Todos os Cadastros</h1>

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
                    v-for="item in pessoas"
                    :key="item.name"
                >
                    <td>{{ item.id }}</td>
                    <td>{{ item.nome }}</td>
                    <td>{{ item.idade }}</td>
                </tr>
            </tbody>
        </v-table>
    </div>
</template>

<script>
import axios from 'axios';

    export default {
        name: 'PeopleListing',
        data() {
            return {
                pessoas: []
            }
        },
        mounted() {
            this.fetchPersons()
        },
        methods: {
            async fetchPersons() {
                try {
                    const response = await axios.get('http://localhost:8000/persons/list-api/')
                    this.pessoas = response.data
                } catch (error) {
                    console.error('Erro ao buscar os dados: ', error);
            }
        }
    }
}
</script>

<style scoped>
#title-listing {
    text-align: center;
}

</style>
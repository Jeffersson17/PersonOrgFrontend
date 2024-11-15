<template>
    <div>
        <div id="organization">
            <h5>ORGANIZAÇÃO</h5>
            <v-form id="form-organization">
                <v-container>
                    <v-row>
                        <v-col
                            cols="12"
                            md="6"
                        >
                            <v-text-field
                                label="Nome"
                                required
                            ></v-text-field>
                        </v-col>

                        <v-col
                            cols="12"
                            md="6"
                        >
                            <v-text-field
                                label="Telefone"
                                required
                            ></v-text-field>
                        </v-col>

                        <v-col
                            cols="12"
                            md="6"
                        >
                            <v-combobox
                                label="Area de Atuação"
                            ></v-combobox>
                        </v-col>

                        <v-col
                            cols="12"
                            md="6"
                        >
                            <v-combobox
                                label="Endereço"
                            ></v-combobox>
                        </v-col>

                        <v-col
                            cols="12"
                            md="12"
                        >
                            <v-textarea
                                label="Descrição">
                            </v-textarea>
                        </v-col>
                    </v-row>

                    <h5>ENDEREÇO</h5>
                    <v-col
                        cols="12"
                        md="5"
                    >
                        <v-text-field
                            label="Endereço"
                            v-model="address"
                            required
                        ></v-text-field>
                    </v-col>

                    <v-col
                        cols="12"
                        md="4"
                    >
                        <v-combobox
                            label="Tipo de Endereço"
                            v-model="address_type"
                        ></v-combobox>
                    </v-col>

                    <v-col
                        cols="12"
                        md="3"
                    >
                        <v-text-field
                            label="Numero"
                            v-model="number"
                            required
                        ></v-text-field>
                    </v-col>

                    <v-col
                        cols="12"
                        md="6"
                    >
                        <v-combobox
                            label="Cidade"
                            v-model="city"
                        ></v-combobox>
                    </v-col>

                    <v-col
                        cols="12"
                        md="6"
                    >
                        <v-text-field
                            label="CEP"
                            v-model="cep"
                            required
                        ></v-text-field>
                    </v-col>

                    <v-col
                        cols="12"
                        md="12"
                    >
                        <v-textarea
                            label="Complemento ( Opcional )"
                            v-model="complement"
                        ></v-textarea>
                    </v-col>

                    <h5>CIDADE</h5>
                    <v-col
                        cols="12"
                        md="6"
                    >
                        <v-text-field
                            label="Nome da Cidade"
                            v-model="city"
                            required
                        ></v-text-field>
                    </v-col>

                    <v-col
                        cols="12"
                        md="6"
                    >
                        <v-combobox
                            label="Estado"
                            v-model="state"
                        ></v-combobox>
                    </v-col>

                    <v-btn
                        class="me-4"
                        type="submit"
                        id="btn-org"
                    >submit</v-btn>
                </v-container>
            </v-form>
        </div>
    </div>
</template>

<script setup>
import { http } from '@/services/config';
import { onMounted, ref } from 'vue';

const areaItems = ref([]);

function areaChoice() {
    http.get('/api/choices')
        .then(response => {
            if(response.data && response.data.area_choices) {
                areaItems.value = response.data.area_choices;
            }
        })
        .catch(error => {
            console.log(error.message);
        })
}

onMounted(() => {
    areaChoice();
});
</script>

<style>

h5{
    margin: 30px;
    text-align: center;
}

</style>

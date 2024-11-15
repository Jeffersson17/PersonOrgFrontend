<template>
    <div>
        <div id="organization">
            <h5>ORGANIZAÇÃO</h5>
            <v-form v-model="valid" id="form-organization">
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
                                :items="areaItems"
                            ></v-combobox>
                        </v-col>

                        <v-col
                            cols="12"
                            md="6"
                        >
                            <v-combobox
                                label="Endereço"
                                :items="address"
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

                    <v-btn
                        class="me-4"
                        type="submit"
                        id="btn-org"
                    >submit</v-btn>
                </v-container>
            </v-form>
        </div>

        <AddressRegister />
        <CityRegister />
    </div>
</template>

<script setup>
import { http } from '@/services/config';
import { onMounted, ref } from 'vue';
import AddressRegister from './AddressRegister.vue';
import CityRegister from './CityRegister.vue';

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

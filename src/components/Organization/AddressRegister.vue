<template>
    <div>
        <h5>ENDEREÇO</h5>
        <v-form id="form-organization">
            <v-container>
                <v-row>
                    <v-col
                        cols="12"
                        md="5"
                    >
                        <v-text-field
                            label="Endereço"
                            required
                        ></v-text-field>
                    </v-col>

                    <v-col
                        cols="12"
                        md="4"
                    >
                        <v-combobox
                            label="Tipo de Endereço"
                            :items="addressItems"
                        ></v-combobox>
                    </v-col>

                    <v-col
                        cols="12"
                        md="3"
                    >
                        <v-text-field
                            label="Numero"
                            required
                        ></v-text-field>
                    </v-col>

                    <v-col
                        cols="12"
                        md="6"
                    >
                        <v-combobox
                            label="Cidade"
                            :items="cityItems"
                        ></v-combobox>
                    </v-col>

                    <v-col
                        cols="12"
                        md="6"
                    >
                        <v-text-field
                            label="CEP"
                            required
                        ></v-text-field>
                    </v-col>

                    <v-col
                        cols="12"
                        md="12"
                    >
                        <v-textarea
                            label="Complemento ( Opcional )">
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

        <CityRegister @send-city="cityChoice" />
    </div>
</template>

<script setup>
import { http } from '@/services/config';
import { onMounted, ref } from 'vue';
import CityRegister from './CityRegister.vue';

const addressItems = ref([]);
const cityItems = ref([]);

function addressChoice() {
    http.get('/api/choices')
        .then(response => {
            if(response.data && response.data.address_type) {
                addressItems.value = response.data.address_type;
            }
        })
        .catch(error => {
            console.log(error.message);
        })
}

function cityChoice(name_city) {
    cityItems.value = [name_city.name];

    console.log(cityItems);
}

onMounted(() => {
    addressChoice();
});
</script>

<style lang="scss" scoped>

</style>
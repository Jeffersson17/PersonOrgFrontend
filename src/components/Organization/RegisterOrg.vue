<template>
    <div>
        <div id="organization">
            <h5>ORGANIZAÇÃO</h5>
            <v-form id="form-organization" @submit.prevent="submitOrg">
                <v-container>
                    <v-row>
                        <v-col
                            cols="12"
                            md="6"
                        >
                            <v-text-field
                                v-model="name"
                                label="Nome"
                                variant="outlined"
                                required
                            ></v-text-field>
                        </v-col>

                        <v-col
                            cols="12"
                            md="6"
                        >
                            <v-text-field
                                v-model="phone"
                                label="Telefone"
                                variant="outlined"
                                required
                            ></v-text-field>
                        </v-col>

                        <v-col
                            cols="12"
                            md="6"
                        >
                            <v-combobox
                                v-model="selectedArea"
                                label="Area de Atuação"
                                :items="areaItems"
                                variant="outlined"
                                required
                            ></v-combobox>
                        </v-col>

                        <v-col
                            cols="12"
                            md="6"
                        >
                            <v-combobox
                                v-model="selectedAddress"
                                label="Endereço"
                                :items="addressItems"
                                item-value="id"
                                item-text="address"
                                variant="outlined"
                                required
                            ></v-combobox>
                        </v-col>

                        <v-col
                            cols="12"
                            md="12"
                        >
                            <v-textarea
                                v-model="description"
                                variant="outlined"
                                label="Descrição"
                            ></v-textarea>
                        </v-col>

                        <v-col
                            cols="12"
                            md="12"
                        >
                            <v-btn
                                class="me-4"
                                type="submit"
                                variant="tonal"
                                id="btn-org"
                            >submit</v-btn>
                        </v-col>
                    </v-row>
                </v-container>
            </v-form>
        </div>
    </div>
</template>

<script setup>
import { http } from '@/services/config';
import { onMounted, ref } from 'vue';

const areaItems = ref([]);
const addressItems = ref([]);
const name = ref(null);
const phone = ref(null);
const description = ref(null);
const selectedAddress = ref(null);
const selectedArea = ref(null);

function areaChoice() {
    http.get('/api/choices')
        .then(response => {
            if(response.data && response.data.area_choices) {
                areaItems.value = response.data.area_choices;
                console.log(response.data);
            }
        })
        .catch(error => {
            console.log('Erro ao buscar as areas: ', error.message);
        })
}

function addressChoice() {
    http.get('/api/address/')
        .then(response => {
            if(response.data) {
                addressItems.value = response.data.map(address => address.address);
            }
        })
        .catch(error => {
            console.log('Erro na requisição: ', error.message);
        })
}

function submitOrg() {
    const addressData = {
        id: selectedAddress.value.id
    }

    http.post('/api/organizations/', {
        name: name.value,
        phone: phone.value,
        area: selectedArea.value,
        description: description.value,
        address_base: addressData
    })
        .then(() => {
            console.log('Enviado com sucesso!')
        })
        .catch(error => {
            console.log('Erro ao enviar o cadastro: ', error.response?.data || error.message);
            console.log(addressData);
        })
}

onMounted(() => {
    areaChoice();
    addressChoice();
});
</script>

<style>

h5{
    margin: 30px;
    text-align: center;
}

</style>

<template>
    <div>
        <div id="organization">
            <h5>EDIÇÃO DE ORGANIZAÇÕES</h5>
            <v-form @submit.prevent="submitUpdateOrg" method="post">
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
                                v-model="area"
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
                                v-model="address"
                                label="Endereço"
                                :items="addressItems"
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

                    <v-snackbar
                        v-model="snackbar.visible"
                        :color="snackbar.color"
                        :timeout="snackbar.timeout"
                    >
                        {{ snackbar.message }}
                    </v-snackbar>
                </v-container>
            </v-form>
        </div>
    </div>
</template>

<script setup>
import { http } from '@/services/config';
import { defineProps, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const name = ref(null);
const phone = ref(null);
const area = ref(null);
const address = ref({ id: '', title: '' });
const description = ref(null);
const router = useRouter();
const areaItems = ref([]);
const addressItems = ref([]);
const snackbar = ref({ visible: false, message: '', color: '', timeout: 2000, });
const props = defineProps({
  id: {
    type: Number,
    required: true,
  }
});

function fetchOrganization() {
    if (!props.id) {
        console.error('ID não foi passado!');
        return;
    }

    http.get(`/organizations/detail-api/${props.id}/`)
        .then(response => {
            name.value = response.data.name;
            phone.value = response.data.phone;
            area.value = response.data.area_base;
            address.value = {
                id: response.data.address_base.id,
                title: response.data.address_base.address
            };
            description.value = response.data.description;
        })
        .catch(error => {
            console.log(error.data)
        })
}

function areaChoice() {
    http.get('/api/choices')
        .then(response => {
            if(response.data && response.data.area_choices) {
                areaItems.value = response.data.area_choices.map(area => ({
                    id: area.id,
                    title: area.title
                }))
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
                addressItems.value = response.data.map(address => ({
                    id: address.id,
                    title: address.address
                }));
            }
        })
        .catch(error => {
            console.log('Erro na requisição: ', error.message);
        })
}

function submitUpdateOrg() {
    http.put(`/organizations/detail-api/${props.id}/`, {
        name: name.value,
        phone: phone.value,
        area: area.value.id,
        address: address.value.id,
        description: description.value
    })
        .then(() => {
            router.push({ name: 'ListingOrganization', query: { snackbarMessage: 'Atualização do cadastro realizado com sucesso!' }});
        })
        .catch(() => {
            snackbar.value.visible = true;
            snackbar.value.color = 'danger';
            snackbar.value.message = 'Erro ao realizar o cadastro!';
        })
}

onMounted(() => {
    fetchOrganization();
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

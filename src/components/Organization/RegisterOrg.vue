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
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const areaItems = ref([]);
const addressItems = ref([]);
const name = ref(null);
const phone = ref(null);
const description = ref(null);
const selectedAddress = ref(null);
const selectedArea = ref(null);
const snackbar = ref({ visible: false, message: '', color: '', timeout: 2000, });

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
        .catch(() => {
            snackbar.value.visible = true;
            snackbar.value.color = 'danger';
            snackbar.value.message = 'Erro ao buscar as areas!';
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
        .catch(() => {
            snackbar.value.visible = true;
            snackbar.value.color = 'danger';
            snackbar.value.message = 'Erro ao buscar os endereços!';
        })
}

function submitOrg() {
    if(!selectedArea.value || !selectedArea.value.id) {
        snackbar.value.visible = true;
        snackbar.value.color = 'danger';
        snackbar.value.message = 'Por favor, selecione uma área válida.';
        return;
    }
    if(!selectedAddress.value || !selectedAddress.value.id) {
        snackbar.value.visible = true;
        snackbar.value.color = 'danger';
        snackbar.value.message = 'Por favor, selecione um endereço válido.';
        return;
    }

    // Realiza o POST se tudo estiver preenchido
    http.post('/api/organizations/', {
        name: name.value,
        phone: phone.value,
        area: selectedArea.value.id,
        description: description.value,
        address: selectedAddress.value.id
    })
        .then(() => {
            router.push({ name: 'ListingOrganization', query: { snackbarMessage: 'Cadastro da organização realizado com sucesso!' }})
        })
        .catch(error => {
            snackbar.value.visible = true;
            snackbar.value.color = 'danger';
            snackbar.value.message = `Erro ao realizar o cadastro: ${error.message}`
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

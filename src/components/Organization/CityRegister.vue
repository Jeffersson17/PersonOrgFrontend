<template>
    <div>
        <h5>CIDADE</h5>
        <v-form v-model="valid" id="form-organization">
            <v-container>
                <v-row>
                    <v-col
                        cols="12"
                        md="6"
                    >
                        <v-text-field
                            label="Nome da Cidade"
                            required
                        ></v-text-field>
                    </v-col>

                    <v-col
                        cols="12"
                        md="6"
                    >
                    <v-combobox
                        label="Estado"
                        :items="stateItems"
                    ></v-combobox>
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
</template>

<script setup>
import { http } from '@/services/config';
import { onMounted, ref } from 'vue';

const stateItems = ref([]);

function addressChoice() {
    http.get('/api/choices')
        .then(response => {
            if(response.data && response.data.state_city_choice) {
                stateItems.value = response.data.state_city_choice;
            }
        })
        .catch(error => {
            console.log(error.message);
        })
}

onMounted(() => {
    addressChoice();
});
</script>

<style lang="scss" scoped>

</style>
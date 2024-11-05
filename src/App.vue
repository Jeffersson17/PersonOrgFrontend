<template>
  <div>
    <v-app>
      <v-main>
        <router-link to="/">
          Listagem
        </router-link>
        <router-link to="/create">
          Cadastro
        </router-link>


        <router-view />
      </v-main>
    </v-app>
  </div>
</template>

<script>
import Form from './components/Form.vue'

export default {
  name: 'App',
  components: {
    Form
  }
}
</script>

<template>
  <div>
    <v-app>
      <v-main>
        <router-link to="/create">Cadastro</router-link>
        <PeopleListing />
      </v-main>
    </v-app>
  </div>
</template>

<script>
import PeopleListing from './components/PeopleListing.vue';

export default {
  name: 'App',
  components: {
    PeopleListing
  }
}
</script>

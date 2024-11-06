<template>
  <div>
    <v-app>
      <v-main>
        <div class="container" id="home">
          <router-link class="btn btn-primary" to="/create">Cadastro</router-link>
          <router-view></router-view>
        </div>
      </v-main>
    </v-app>
  </div>
</template>

<script>

export default {
  name: 'App',
}
</script>

<style scoped>

#home {
  margin: 40px;
  text-align: left;
}

</style>

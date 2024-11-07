<template>
  <div>
    <v-app>
      <v-main>
        <div class="container" id="home">
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

</style>

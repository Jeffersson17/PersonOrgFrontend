<template>
  <div>
    <v-app>
      <v-main>
        <div class="container" id="home">
          <router-view></router-view>

          <footer class="footer">
            <div class="container">
              <div class="text-center">
                <p>&copy; 2024 Jeffersson Barros</p>
              </div>
            </div>
          </footer>
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

.footer {
  padding: 20px 0;
  color: #333; /* Cor do texto */
  text-align: center;
  font-size: 14px;
  margin-top: auto;
}

</style>

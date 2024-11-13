<template>
  <div>
    <v-app>
      <v-main>
        <div class="container" id="home">
          <v-app-bar color="primary" dark>
            <v-app-bar-title>Meu Projeto</v-app-bar-title>
            <v-spacer></v-spacer>

          <!-- Menu suspenso para Pessoa -->
          <v-menu
            open-on-hover
          >
            <template v-slot:activator="{ props }">
              <v-btn v-bind="props">
                Pessoa
              </v-btn>
            </template>

            <v-list>
              <v-list-item>
                <router-link to="/" class="v-list-item-title">
                  <v-btn text>Listagem</v-btn>
                </router-link>
              </v-list-item>

              <v-list-item>
                <router-link to="/create" class="v-list-item-title">
                  <v-btn text>Registrar Usuário</v-btn>
                </router-link>
              </v-list-item>
            </v-list>
          </v-menu>

          <v-menu
            open-on-hover
          >
            <template v-slot:activator="{ props }">
              <v-btn v-bind="props">
                Organização
              </v-btn>
            </template>

            <v-list>
              <v-list-item>
                <router-link to="/organization/listing" class="v-list-item-title">
                  <v-btn text>Listagem</v-btn>
                </router-link>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-app-bar>
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

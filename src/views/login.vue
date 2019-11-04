<template>
  <v-layout justify-center align-center class="page">
    <v-flex shrink>
      <v-card outlined min-width="300">

        <template v-if="isLoggingIn">
          <v-card-title>
            Login
          </v-card-title>
          <v-card-text>
            <v-text-field
              outlined
              label="Username"
              placeholder="enter your username"
              v-model="login.username"
            ></v-text-field>
            <v-text-field
              outlined
              type="password"
              label="Password"
              placeholder="enter your password"
              v-model="login.password"
            ></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text @click="toggleMode" class="caption">
              Create an account
            </v-btn>
            <v-btn class="primary" @click="onLogin">Login</v-btn>
          </v-card-actions>
        </template>

        <template v-else>
          <v-card-title>
            Create an account
          </v-card-title>
          <v-card-text>
            <v-text-field
              outlined
              label="Username"
              placeholder="enter your username"
              v-model="register.username"
            ></v-text-field>
            <v-text-field
              outlined
              type="password"
              label="Password"
              placeholder="enter your password"
              v-model="register.password"
            ></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text @click="toggleMode" class="caption">
              Cancel
            </v-btn>
            <v-btn class="primary" @click="onRegister">Create Account</v-btn>
          </v-card-actions>
        </template>

      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      isLoggingIn: true,
      login: {
        username: '',
        password: '',
      },
      register: {
        username: '',
        password: '',
      }
    }
  },
  methods: {
    async onLogin() {
      await this.$store.dispatch('user/LOGIN', {
        username: this.login.username,
        password: this.login.password,
      })
      this.$router.push('/me')
    },
    async onRegister() {
      await this.$store.dispatch('user/REGISTER', {
        username: this.register.username,
        password: this.register.password,
      })
      this.$router.push('/me')
    },
    toggleMode() {
      this.isLoggingIn = !this.isLoggingIn
    }
  }
}
</script>

<style scoped>
.login, .register {
  display: flex;
  flex-direction: column;
}
.login, .register > div {
  flex: 1;
  background-color: aliceblue;
  padding: .6rem 1rem;

}
</style>

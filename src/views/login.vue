<template>
  <div>
    <div class="login">
      <h3>Login</h3>
      <div>
        <label for="login-username">Username</label>
        <input type="text" id="login-username" v-model="login.username">
      </div>
      <div>
        <label for="login-password">Password</label>
        <input type="text" id="login-password" v-model="login.password">
      </div>
      <div>
        <button @click="onLogin">Login</button>
      </div>
    </div>

    <div class="register">
      <h3>Register</h3>
      <div>
        <label for="register-username">Username</label>
        <input type="text" id="register-username" v-model="register.username">
      </div>
      <div>
        <label for="register-password">Password</label>
        <input type="text" id="register-password" v-model="register.password">
      </div>
      <div>
        <button @click="onRegister">Register</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
    onLogin() {
      this.$store.dispatch('user/LOGIN', {
        username: this.login.username,
        password: this.login.password,
      })
    },
    onRegister() {
      this.$store.dispatch('user/REGISTER', {
        username: this.register.username,
        password: this.register.password,
      })
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

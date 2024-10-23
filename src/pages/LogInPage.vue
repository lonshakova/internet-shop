<
<template>
  <div class="login-page">
    <v-card class="login-card" elevation="16">
      <v-form class="log-in-form">
        <div>
          <v-text-field
          class="login"
          label="Логин"
          type="text"
          required
          v-model="login"
        />
        <v-text-field
          class="password"
          label="Пароль"
          required
          v-model="password"
          :type="isVisible ? 'text' : 'password'"
          :append-inner-icon="isVisible ? 'mdi-eye-off' : 'mdi-eye'"
          @click:append-inner="isVisible = !isVisible"
        />
        </div>
        
        <div class="btns">
          <v-btn
            class="btn"
            variant="plain"
            @click="$router.push('/signup')"
            color="#FF3C00"
            >Регистрация</v-btn
          >
          <v-btn class="btn" variant="plain" @click="enterUser()">Вход</v-btn>
        </div>
      </v-form>
    </v-card>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

let isVisible = ref(false);
let login = ref("");
let password = ref("");

function enterUser() {
  if (password.value && login.value) {
    router.push("/");
  }
}
</script>

<style lang="scss" scoped>
.login-page {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.login-card {
  margin-top: 50px;
  height: 40vh;
}

.log-in-form {
  margin: 10px;
  padding: 20px 0px;
  width: 20vw;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.btns {
  display: flex;
  justify-content: flex-end;
}

.btn {
  margin-left: 10px;
}
</style>

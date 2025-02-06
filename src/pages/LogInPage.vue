<
<template>
  <div class="login-page" >
    <v-card class="login-card" elevation="16">
      <v-form class="log-in-form" v-if="!userStore.isEntered">
        <div>
          <v-text-field
            class="login"
            label="Email"
            type="email"
            required
            v-model="user.email"
          />
          <v-text-field
            class="password"
            label="Пароль"
            required
            v-model="user.password"
            :type="isVisible ? 'text' : 'password'"
            :append-inner-icon="isVisible ? 'mdi-eye-off' : 'mdi-eye'"
            @click:append-inner="isVisible = !isVisible"
          />
        </div>
        <div v-if="isError" class="error-message">
          Неверный email или пароль
        </div>

        <div class="btns">
          <v-btn
            class="btn"
            variant="plain"
            @click="$router.push('/signup')"
            color="#FF3C00"
            text="Регистрация"
          />
          <v-btn
            class="btn"
            variant="plain"
            @click="userStore.enterUser(user)"
            text="Вход"
          />
        </div>
      </v-form>
      <div class="success" v-else>
        Вход выполняется
        <v-progress-circular indeterminate/>
      </div>
    </v-card>
  </div>
</template>

<script setup>
import { ref } from "vue";

import { useUserStore } from "../store/userStore";

const userStore = useUserStore();

let isVisible = ref(false);

let isError = ref(false);

const user = ref({
  id: null,
  name: "",
  surname: "",
  email: "",
  password: "",
  isAdmin: false,
});
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
  margin-top: 25vh;
  min-height: 30vh;
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

.error-message {
  color: #ff3c00;
}

.btns {
  display: flex;
  justify-content: flex-end;
}

.btn {
  margin-left: 10px;
}

.success {
  margin-top: 20%;
  color: #1e8449;
  font-size: xx-large;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>

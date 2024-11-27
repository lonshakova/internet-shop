<
<template>
  <div class="login-page">
    <v-card class="login-card" elevation="16">
      <v-form class="log-in-form">
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
        
        <div class="btns">
          <v-btn
            class="btn"
            variant="plain"
            @click="$router.push('/signup')"
            color="#FF3C00"
            >Регистрация</v-btn
          >
          <v-btn class="btn" variant="plain" @click="enterUser(user)">Вход</v-btn>
        </div>
      </v-form>
    </v-card>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

import { useUserStore } from "../store/userStore";

const userStore = useUserStore();
const router = useRouter();


let isVisible = ref(false);
const user = ref({
      id:null,
      name:"",
      surname:"",
      email:"",
      password:"",
      isAdmin:false,
    })

function enterUser(user) {
      let ind;
      for (ind in userStore.users){
        if (userStore.users[ind].email == user.email && userStore.users[ind].password == user.password){
          userStore.enterUser = userStore.users[ind];
          userStore.isEntered = true;
          router.push('/');
          break
        }
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

.btns {
  display: flex;
  justify-content: flex-end;
}

.btn {
  margin-left: 10px;
}
</style>

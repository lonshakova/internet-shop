<template>
  <div class="sigup-page">
    <v-card class="sigup-card" elevation="16">
      <v-form class="sigup-form" v-if="!userStore.isEntered">
        <div>
          <div class="name-and-surname">
            <v-text-field
              class="input"
              label="Имя"
              type="text"
              v-model="user.name"
              :rules="[rules.required]"
            />
            <v-text-field
              class="input"
              label="Фамилия"
              type="text"
              v-model="user.surname"
              :rules="[rules.required]"
            />
          </div>
          <v-text-field
            class="login"
            label="Email"
            type="email"
            v-model="user.email"
            :rules="[rules.required]"
          />
          <v-text-field
            class="password"
            label="Пароль"
            hint="At least 8 characters"
            :rules="[rules.required, rules.min]"
            :type="isVisible ? 'text' : 'password'"
            :append-inner-icon="isVisible ? 'mdi-eye-off' : 'mdi-eye'"
            @click:append-inner="isVisible = !isVisible"
            v-model="user.password"
          />
          <v-text-field
            class="password"
            label="Повторите пароль"
            :rules="[rules.required, rules.min, rules.repeatMatch]"
            :type="isVisibleRep ? 'text' : 'password'"
            :append-inner-icon="isVisibleRep ? 'mdi-eye-off' : 'mdi-eye'"
            @click:append-inner="isVisibleRep = !isVisibleRep"
            v-model="repPassword"
          />
        </div>
        <div class="btns">
          <v-btn class="btn" variant="plain" @click="$router.push('/login')"
            >Назад</v-btn
          >
          <v-btn
            class="btn"
            :variant="isformReady ? 'text' : 'plain'"
            :disabled="!isformReady"
            @click="userStore.registUser(user)"
            :color="isformReady ? '#FF3C00' : 'default'"
            >Регистрация</v-btn
          >
        </div>
      </v-form>
      <div v-else class="success-reg">
        Регистрация прошла успешно!
        <v-icon icon="mdi-party-popper" />
      </div>
    </v-card>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../store/userStore";
const userStore = useUserStore();
const router = useRouter();

let rules = ref({
  required: (value) => !!value || "Обязательно для заполнения",
  min: (v) => v.length >= 8 || "Минимум 8 символов",
  repeatMatch: () =>
    !!(user.value.password == repPassword.value) || "Пароли не совпадают",
});
let isVisible = ref(false);
let isVisibleRep = ref(false);
let isSuccess = ref(false);
let isformReady = computed(() => {
  return (
    user.value.name &&
    user.value.surname &&
    user.value.email &&
    user.value.password
  );
});
const user = ref({
  id: null,
  name: "",
  surname: "",
  email: "",
  password: "",
  isAdmin: false,
});
let repPassword = ref("");

async function registUser() {
  let isError = false;
  for (let ind in userStore.users) {
    if (userStore.users[ind].email == user.value.email) {
      alert("Такой пользователь уже зарегестрирован!");
      isError = true;
      break;
    }
  }
  if (!isError) {
    user.value.id = Date.now();
    isSuccess.value = true;
    userStore.isEntered = true;
    userStore.users.push(user.value);
    userStore.enterUser = user.value;
    user.value = {
      id: null,
      name: "",
      surname: "",
      email: "",
      password: "",
      isAdmin: false,
    };
    setTimeout(() => router.push("/"), 1000);
  }
}
</script>

<style lang="scss" scoped>
.sigup-page {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.sigup-card {
  margin-top: 10vh;
  width: 25vw;
  min-height: 50vh;
}

.sigup-form {
  margin: 10px;
  padding: 20px 0px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.name-and-surname {
  display: flex;
  gap: 10px;
}

.btns {
  display: flex;
  justify-content: flex-end;
}

.success-reg {
  margin-top: 40%;
  color: #1e8449;
  text-align: center;
  font-size: xx-large;
}
</style>

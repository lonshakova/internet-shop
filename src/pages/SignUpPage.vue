<template>
  <div class="sigup-page">
    <v-card class="sigup-card" elevation="16">
      <v-form class="sigup-form" v-if="!isSuccess">
        <div>
          <div class="name-and-surname">
            <v-text-field
              class="input"
              label="Имя"
              type="text"
              v-model="name"
              :rules="[rules.required]"
            />
            <v-text-field
              class="input"
              label="Фамилия"
              type="text"
              v-model="surname"
              :rules="[rules.required]"
            />
          </div>
          <v-text-field
            class="login"
            label="Email"
            type="email"
            v-model="login"
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
            v-model="password"
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
            variant="plain"
            @click="registUser()"
            color="#FF3C00"
            >Регистрация</v-btn
          >
        </div>
      </v-form>
      <div v-else class="success-reg">Регистрация прошла успешно!
        <v-icon icon="mdi-party-popper" />
      </div>
    </v-card>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useProductStore } from "../store/productStore";

const productStore = useProductStore();
const router = useRouter();

let rules = ref({
  required: (value) => !!value || "Обязательно для заполнения",
  min: (v) => v.length >= 8 || "Минимум 8 символов",
  repeatMatch: () =>
    !!(password.value == repPassword.value) || "Пароли не совпадают",
});
let isVisible = ref(false);
let isVisibleRep = ref(false);
let isSuccess = ref(false);
let name = ref("");
let surname = ref("");
let login = ref("");
let password = ref("");
let repPassword = ref("");

async function registUser() {
  if (password.value && login.value && repPassword.value == password.value) {
    isSuccess.value = !isSuccess.value;
    productStore.isEntered = true;
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

<template>
  <q-page class="flex flex-center">
    <q-card class="register-card">
      <q-card-section>
        <div class="text-h6">{{ $t("common.register") }}</div>
      </q-card-section>

      <q-card-section>
        <q-form @submit="onSubmit" class="q-gutter-lg">
          <q-input
            v-model="email"
            :label="$t('auth.email')"
            type="email"
            outlined
            :rules="[(val) => !!val || $t('login.required')]"
          />

          <div class="row q-col-gutter-md">
            <div class="col-8">
              <q-input
                v-model="firstName"
                :label="$t('auth.firstName')"
                outlined
                :rules="[(val) => !!val || $t('login.required')]"
              />
            </div>
            <div class="col-4">
              <q-input
                v-model="lastName"
                :label="$t('auth.lastName')"
                outlined
                :rules="[(val) => !!val || $t('login.required')]"
              />
            </div>
          </div>

          <q-input
            v-model="nickname"
            :label="$t('auth.nicknameOptional')"
            outlined
          />

          <q-input
            v-model="password"
            :label="$t('auth.password')"
            type="password"
            outlined
            :rules="[
              (val) => !!val || $t('login.required'),
              (val) => validatePassword(val) || $t('auth.passwordRule'),
            ]"
            :hint="$t('auth.passwordHint')"
          />

          <q-input
            v-model="confirmPassword"
            :label="$t('auth.confirmPassword')"
            type="password"
            outlined
            :rules="[
              (val) => !!val || $t('login.required'),
              (val) => val === password || '비밀번호가 일치하지 않습니다.',
            ]"
          />

          <div>
            <q-btn
              type="submit"
              color="primary"
              :label="$t('common.register')"
              class="full-width"
            />
          </div>
        </q-form>
      </q-card-section>

      <q-card-section class="text-center">
        <router-link :to="{ name: 'login' }" class="text-primary">
          {{ $t("common.login") }}
        </router-link>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from "vue";

const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const firstName = ref("");
const lastName = ref("");
const nickname = ref("");

const onSubmit = () => {
  // TODO: 회원가입 로직 구현
  console.log("회원가입 시도:", {
    email: email.value,
    password: password.value,
    confirmPassword: confirmPassword.value,
    firstName: firstName.value,
    lastName: lastName.value,
    nickname: nickname.value,
  });
};

const validatePassword = (password: string): boolean => {
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const isLongEnough = password.length >= 8;

  return (
    hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar && isLongEnough
  );
};
</script>

<style scoped>
.register-card {
  width: 100%;
  max-width: 400px;
  padding: 20px;
}

a {
  text-decoration: none;
  font-weight: 500;
}
</style>

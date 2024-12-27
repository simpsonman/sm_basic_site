<template>
  <q-page class="flex flex-center">
    <q-card class="register-card">
      <q-card-section>
        <div class="text-h6">{{ $t("common.register") }}</div>
      </q-card-section>

      <q-card-section>
        <q-form @submit="onSubmit" class="q-gutter-md">
          <q-input
            v-model="email"
            :label="$t('auth.email')"
            type="email"
            outlined
            :rules="[(val) => !!val || $t('login.required')]"
          />

          <q-input
            v-model="password"
            :label="$t('auth.password')"
            type="password"
            outlined
            :rules="[(val) => !!val || $t('login.required')]"
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

const onSubmit = () => {
  // TODO: 회원가입 로직 구현
  console.log("회원가입 시도:", {
    email: email.value,
    password: password.value,
    confirmPassword: confirmPassword.value,
  });
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

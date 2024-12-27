<template>
  <q-page class="flex flex-center">
    <q-card class="login-card">
      <q-card-section>
        <div class="text-h6">{{ $t("common.login") }}</div>
      </q-card-section>

      <q-card-section>
        <q-form @submit="onSubmit" class="q-gutter-md">
          <q-input
            v-model="email"
            :label="$t('login.email')"
            type="email"
            outlined
            :rules="[(val) => !!val || $t('login.required')]"
          />

          <q-input
            v-model="password"
            :label="$t('login.password')"
            type="password"
            outlined
            :rules="[(val) => !!val || $t('login.required')]"
          />

          <div>
            <q-btn type="submit" color="primary" :label="$t('common.login')" />
          </div>
        </q-form>
      </q-card-section>

      <q-card-section class="text-center">
        <p class="text-grey-6">{{ $t("login.noAccount") }}</p>
        <router-link :to="{ name: 'register' }" class="text-primary">
          {{ $t("login.register") }}
        </router-link>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from "vue";

const email = ref("");
const password = ref("");

const onSubmit = () => {
  // TODO: 로그인 로직 구현
  console.log("로그인 시도:", { email: email.value, password: password.value });
};
</script>

<style scoped>
.login-card {
  width: 100%;
  max-width: 400px;
  padding: 20px;
}

a {
  text-decoration: none;
  font-weight: 500;
}
</style>

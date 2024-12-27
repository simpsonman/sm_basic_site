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

          <div class="row justify-between items-center">
            <q-btn type="submit" color="primary" :label="$t('common.login')" />
            <div class="text-caption">
              <router-link to="/auth/find-account" class="text-primary">
                {{ $t("login.findAccount") }}
              </router-link>
            </div>
          </div>
        </q-form>
      </q-card-section>

      <q-card-section class="text-center q-pt-none">
        <p class="text-caption q-ma-none">
          {{ $t("login.noAccount") }}
          <router-link to="/auth/register" class="text-primary">
            {{ $t("login.register") }}
          </router-link>
        </p>
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
}

.text-caption {
  color: rgba(0, 0, 0, 0.6);
}
</style>

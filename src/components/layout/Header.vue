<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">{{ $t("common.home") }}</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav me-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/">
              {{ $t("common.home") }}
            </router-link>
          </li>
          <template v-if="!user">
            <li class="nav-item">
              <router-link class="nav-link" to="/auth/login">
                {{ $t("common.login") }}
              </router-link>
            </li>
          </template>
          <template v-else>
            <li class="nav-item">
              <span class="nav-link"
                >{{ user.firstName }} {{ user.lastName }}</span
              >
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#" @click.prevent="handleLogout">
                {{ $t("common.logout") }}
              </a>
            </li>
          </template>
        </ul>
        <div class="nav-item dropdown">
          <button
            class="btn btn-primary dropdown-toggle"
            type="button"
            id="languageDropdown"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Language
          </button>
          <ul
            class="dropdown-menu dropdown-menu-end"
            aria-labelledby="languageDropdown"
          >
            <li>
              <a class="dropdown-item" href="#" @click="changeLocale('ko')"
                >한국어</a
              >
            </li>
            <li>
              <a class="dropdown-item" href="#" @click="changeLocale('en')"
                >English</a
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";

const { locale } = useI18n();
const router = useRouter();

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: string;
}

const user = ref<User | null>(null);

onMounted(() => {
  const userJson = sessionStorage.getItem("user");
  if (userJson) {
    user.value = JSON.parse(userJson);
  }
});

const handleLogout = () => {
  sessionStorage.removeItem("user");
  user.value = null;
  router.push("/");
};

const changeLocale = (lang: string) => {
  locale.value = lang;
};
</script>

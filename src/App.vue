<template>
  <div>
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
              <a class="nav-link" href="/"> {{ $t("common.home") }} </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/auth/login"> {{ $t("common.login") }} </a>
            </li>
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
            <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="languageDropdown">
              <li>
                <a class="dropdown-item" href="#" @click="changeLocale('ko')">한국어</a>
              </li>
              <li>
                <a class="dropdown-item" href="#" @click="changeLocale('en')">English</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>

    <main class="container-fluid p-0">
      <router-view></router-view>
    </main>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { locale } = useI18n();

const changeLocale = (lang: string) => {
  locale.value = lang;
};
</script>

<style>
html, body {
  margin: 0;
  padding: 0;
  min-height: 100vh;
  background-color: #f8f9fa;
}

#app {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, 
    "Helvetica Neue", Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: 100vh;
}
</style>

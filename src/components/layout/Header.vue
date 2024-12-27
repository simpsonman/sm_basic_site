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
import { ref, onMounted, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import { Toast } from "bootstrap";

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

// 로그인 상태 체크 함수
const checkLoginStatus = () => {
  // localStorage와 sessionStorage 모두 체크
  const userJson =
    localStorage.getItem("user") || sessionStorage.getItem("user");
  if (userJson) {
    user.value = JSON.parse(userJson);
  } else {
    user.value = null;
  }
};

// 컴포넌트 마운트 시와 주기적으로 로그인 상태 체크
onMounted(() => {
  checkLoginStatus();

  // 스토리지 변경 감지
  window.addEventListener("storage", checkLoginStatus);
});

// 1초마다 로그인 상태 체크 (세션 만료 등을 감지하기 위해)
setInterval(checkLoginStatus, 1000);

const handleLogout = () => {
  // localStorage와 sessionStorage 모두 클리어
  localStorage.removeItem("user");
  sessionStorage.removeItem("user");
  user.value = null;

  // 로그아웃 토스트 메시지
  const toastContainer = document.createElement("div");
  toastContainer.innerHTML = `
    <div class="toast-container position-fixed top-0 end-0 p-3">
      <div class="toast align-items-center text-bg-success border-0" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="d-flex">
          <div class="toast-body">
            로그아웃되었습니다.
          </div>
          <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(toastContainer);
  const toast = new Toast(toastContainer.querySelector(".toast")!);
  toast.show();

  router.push("/");
};

const changeLocale = (lang: string) => {
  locale.value = lang;
};
</script>

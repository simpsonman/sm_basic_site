<template>
  <div class="container-fluid bg-light min-vh-100 d-flex align-items-center justify-content-center py-5">
    <div class="card shadow-sm" style="max-width: 400px;">
      <div class="card-body">
        <h4 class="card-title mb-4">로그인</h4>
        
        <form @submit.prevent="onSubmit" novalidate>
          <div class="mb-3">
            <label for="email" class="form-label">이메일</label>
            <input
              type="email"
              class="form-control"
              id="email"
              v-model="email"
              :class="{ 'is-invalid': errors.email }"
              required
            >
            <div class="invalid-feedback">{{ errors.email }}</div>
          </div>

          <div class="mb-4">
            <label for="password" class="form-label">비밀번호</label>
            <input
              type="password"
              class="form-control"
              id="password"
              v-model="password"
              :class="{ 'is-invalid': errors.password }"
              required
            >
            <div class="invalid-feedback">{{ errors.password }}</div>
          </div>

          <div class="d-flex justify-content-between align-items-center mb-4">
            <div class="form-check">
              <input class="form-check-input" type="checkbox" id="rememberMe" v-model="rememberMe">
              <label class="form-check-label" for="rememberMe">
                자동 로그인
              </label>
            </div>
            <router-link to="/auth/find-account" class="text-decoration-none">아이디/비밀번호 찾기</router-link>
          </div>

          <button 
            type="submit" 
            class="btn btn-primary w-100"
            :disabled="loading"
          >
            <span 
              v-if="loading" 
              class="spinner-border spinner-border-sm me-2" 
              role="status" 
              aria-hidden="true"
            ></span>
            {{ loading ? '로그인 중...' : '로그인' }}
          </button>

          <div class="text-center mt-3">
            <p class="mb-1">아직 계정이 없으신가요?</p>
            <router-link to="/auth/register" class="text-decoration-none">회원가입하기</router-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { userService } from '../services/userService';
import { Toast } from 'bootstrap';

const router = useRouter();
const email = ref('');
const password = ref('');
const rememberMe = ref(false);
const loading = ref(false);
const errors = reactive({
  email: '',
  password: ''
});

const validateForm = (): boolean => {
  let isValid = true;
  
  // 에러 초기화
  Object.keys(errors).forEach(key => {
    errors[key as keyof typeof errors] = '';
  });

  // 이메일 검증
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email.value) {
    errors.email = '이메일을 입력해주세요.';
    isValid = false;
  } else if (!emailRegex.test(email.value)) {
    errors.email = '올바른 이메일 형식이 아닙니다.';
    isValid = false;
  }

  // 비밀번호 검증
  if (!password.value) {
    errors.password = '비밀번호를 입력해주세요.';
    isValid = false;
  }

  return isValid;
};

const onSubmit = async () => {
  if (loading.value) return;

  if (!validateForm()) {
    return;
  }

  try {
    loading.value = true;
    console.log('로그인 시도:', { email: email.value });

    const user = await userService.login(email.value, password.value);
    console.log('로그인 성공:', user);

    // 자동 로그인 처리
    if (rememberMe.value) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      sessionStorage.setItem('user', JSON.stringify(user));
    }
    
    // 성공 메시지 표시
    const welcomeMessage = user.nickname 
      ? `환영합니다, ${user.nickname}님!`
      : `환영합니다, ${user.email}님!`;

    const toastContainer = document.createElement('div');
    toastContainer.innerHTML = `
      <div class="toast-container position-fixed top-0 end-0 p-3">
        <div class="toast align-items-center text-bg-success border-0" role="alert" aria-live="assertive" aria-atomic="true">
          <div class="d-flex">
            <div class="toast-body">
              ${welcomeMessage}
            </div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(toastContainer);
    const toast = new Toast(toastContainer.querySelector('.toast')!);
    toast.show();

    // 홈 화면으로 이동
    router.push('/');
  } catch (error) {
    console.error('로그인 오류:', error);
    
    // 에러 메시지 표시
    const errorMessage = error instanceof Error ? error.message : '로그인 중 오류가 발생했습니다.';
    const toastContainer = document.createElement('div');
    toastContainer.innerHTML = `
      <div class="toast-container position-fixed top-0 end-0 p-3">
        <div class="toast align-items-center text-bg-danger border-0" role="alert" aria-live="assertive" aria-atomic="true">
          <div class="d-flex">
            <div class="toast-body">
              ${errorMessage}
            </div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(toastContainer);
    const toast = new Toast(toastContainer.querySelector('.toast')!);
    toast.show();
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.min-vh-100 {
  min-height: 100vh;
}
</style>

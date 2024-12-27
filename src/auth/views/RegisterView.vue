<template>
  <div class="container-fluid bg-light min-vh-100 d-flex align-items-center justify-content-center py-5">
    <div class="card shadow-sm" style="max-width: 400px;">
      <div class="card-body">
        <h4 class="card-title mb-4">회원가입</h4>
        
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

          <div class="row mb-3">
            <div class="col-8">
              <label for="firstName" class="form-label">이름</label>
              <input
                type="text"
                class="form-control"
                id="firstName"
                v-model="firstName"
                :class="{ 'is-invalid': errors.firstName }"
                required
              >
              <div class="invalid-feedback">{{ errors.firstName }}</div>
            </div>
            <div class="col-4">
              <label for="lastName" class="form-label">성</label>
              <input
                type="text"
                class="form-control"
                id="lastName"
                v-model="lastName"
                :class="{ 'is-invalid': errors.lastName }"
                required
              >
              <div class="invalid-feedback">{{ errors.lastName }}</div>
            </div>
          </div>

          <div class="mb-3">
            <label for="nickname" class="form-label">닉네임 (선택)</label>
            <input
              type="text"
              class="form-control"
              id="nickname"
              v-model="nickname"
            >
          </div>

          <div class="mb-3">
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
            <div class="form-text">
              비밀번호는 8자 이상이어야 하며, 대문자, 소문자, 숫자, 특수문자를 포함해야 합니다.
            </div>
          </div>

          <div class="mb-4">
            <label for="confirmPassword" class="form-label">비밀번호 확인</label>
            <input
              type="password"
              class="form-control"
              id="confirmPassword"
              v-model="confirmPassword"
              :class="{ 'is-invalid': errors.confirmPassword }"
              required
            >
            <div class="invalid-feedback">{{ errors.confirmPassword }}</div>
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
            {{ loading ? '처리중...' : '회원가입' }}
          </button>

          <div class="text-center mt-3">
            <router-link to="/auth/login" class="text-decoration-none">이미 계정이 있으신가요? 로그인하기</router-link>
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

// 폼 데이터
const email = ref('');
const firstName = ref('');
const lastName = ref('');
const nickname = ref('');
const password = ref('');
const confirmPassword = ref('');
const loading = ref(false);

// 에러 상태
const errors = reactive({
  email: '',
  firstName: '',
  lastName: '',
  password: '',
  confirmPassword: ''
});

const validatePassword = (password: string): boolean => {
  if (!password) return false;
  
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const isLongEnough = password.length >= 8;

  return hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar && isLongEnough;
};

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

  // 이름 검증
  if (!firstName.value) {
    errors.firstName = '이름을 입력해주세요.';
    isValid = false;
  }

  // 성 검증
  if (!lastName.value) {
    errors.lastName = '성을 입력해주세요.';
    isValid = false;
  }

  // 비밀번호 검증
  if (!password.value) {
    errors.password = '비밀번호를 입력해주세요.';
    isValid = false;
  } else if (!validatePassword(password.value)) {
    errors.password = '비밀번호는 8자 이상이며, 대문자, 소문자, 숫자, 특수문자를 포함해야 합니다.';
    isValid = false;
  }

  // 비밀번호 확인 검증
  if (!confirmPassword.value) {
    errors.confirmPassword = '비밀번호 확인을 입력해주세요.';
    isValid = false;
  } else if (password.value !== confirmPassword.value) {
    errors.confirmPassword = '비밀번호가 일치하지 않습니다.';
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
    console.log('회원가입 시도:', { email: email.value, firstName: firstName.value });

    const result = await userService.register({
      email: email.value,
      password: password.value,
      firstName: firstName.value,
      lastName: lastName.value,
      nickname: nickname.value || undefined
    });

    console.log('회원가입 성공:', result);
    
    // Bootstrap 토스트로 성공 메시지 표시
    const toastContainer = document.createElement('div');
    toastContainer.innerHTML = `
      <div class="toast-container position-fixed top-0 end-0 p-3">
        <div class="toast align-items-center text-bg-success border-0" role="alert" aria-live="assertive" aria-atomic="true">
          <div class="d-flex">
            <div class="toast-body">
              회원가입이 완료되었습니다.
            </div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(toastContainer);
    const toast = new Toast(toastContainer.querySelector('.toast'));
    toast.show();

    router.push('/auth/login');
  } catch (error) {
    console.error('회원가입 오류:', error);
    
    // 에러 메시지 표시
    const errorMessage = error instanceof Error ? error.message : '회원가입 중 오류가 발생했습니다.';
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
    const toast = new Toast(toastContainer.querySelector('.toast'));
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

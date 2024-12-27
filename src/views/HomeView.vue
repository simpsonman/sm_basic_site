<template>
  <div class="container py-5">
    <div class="row justify-content-center">
      <div class="col-md-8 text-center">
        <h1 class="display-4 mb-4">웹사이트에 오신 것을 환영합니다</h1>
        <p class="lead mb-5">
          안전하고 편리한 서비스를 이용하시려면 로그인해주세요.
        </p>
        
        <div class="d-grid gap-3 d-sm-flex justify-content-sm-center">
          <router-link to="/auth/login" class="btn btn-primary btn-lg px-4 gap-3">
            로그인
          </router-link>
          <router-link to="/auth/register" class="btn btn-outline-secondary btn-lg px-4">
            회원가입
          </router-link>
        </div>
      </div>
    </div>

    <!-- 주요 기능 소개 -->
    <div class="row mt-5 pt-5">
      <div class="col-md-4 mb-4">
        <div class="card h-100 border-0 shadow-sm">
          <div class="card-body text-center">
            <i class="bi bi-shield-lock fs-1 text-primary mb-3"></i>
            <h3 class="card-title h4">보안</h3>
            <p class="card-text">
              최신 보안 기술을 적용하여 사용자의 정보를 안전하게 보호합니다.
            </p>
          </div>
        </div>
      </div>
      
      <div class="col-md-4 mb-4">
        <div class="card h-100 border-0 shadow-sm">
          <div class="card-body text-center">
            <i class="bi bi-lightning fs-1 text-primary mb-3"></i>
            <h3 class="card-title h4">빠른 속도</h3>
            <p class="card-text">
              최적화된 시스템으로 빠르고 쾌적한 서비스를 제공합니다.
            </p>
          </div>
        </div>
      </div>
      
      <div class="col-md-4 mb-4">
        <div class="card h-100 border-0 shadow-sm">
          <div class="card-body text-center">
            <i class="bi bi-headset fs-1 text-primary mb-3"></i>
            <h3 class="card-title h4">고객 지원</h3>
            <p class="card-text">
              24시간 고객 지원으로 문제 발생 시 신속하게 해결해드립니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Bootstrap Icons 추가
import 'bootstrap-icons/font/bootstrap-icons.css';
</script>

<style scoped>
.card {
  transition: transform 0.2s;
}

.card:hover {
  transform: translateY(-5px);
}

.bi {
  line-height: 1;
}
</style>

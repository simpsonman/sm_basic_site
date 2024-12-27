<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="container">
        <div class="row">
          <div class="col-md-6">
            <h5>{{ $t("footer.about") }}</h5>
            <p>{{ $t("footer.description") }}</p>
          </div>
          <div class="col-md-6 text-end">
            <h5>{{ $t("footer.contact") }}</h5>
            <p>Email: contact@example.com</p>
          </div>
        </div>
        <hr />
        <div class="text-center">
          <p class="mb-0">
            © {{ new Date().getFullYear() }} {{ $t("footer.copyright") }}
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background-color: #f8f9fa;
  border-top: 1px solid #dee2e6;
  padding: 2rem 0;
  margin-top: auto;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
}

h5 {
  color: #333;
  margin-bottom: 1rem;
}

p {
  color: #666;
}

hr {
  margin: 2rem 0;
  border-color: #dee2e6;
}
</style>

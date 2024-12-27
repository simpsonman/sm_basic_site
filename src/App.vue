<template>
  <Layout>
    <router-view></router-view>
  </Layout>
</template>

<script setup lang="ts">
import Layout from "./components/layout/Layout.vue";
</script>

<style>
html,
body {
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

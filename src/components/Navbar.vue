<script setup lang="ts">

defineProps<{ title: string }>()
</script>

<template>
  <nav class="navbar">
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="../assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
    <span class="nav-title">{{ title }}</span>
  </nav>
</template>

<style scoped>
.navbar {
  display: flex;
  max-height: 120px;
  align-items: center;
  padding: 12px 24px;
  background-color: #464e47;
  color: #f1fffa;
}

.nav-title {
  margin-left: 24px;
}
</style>

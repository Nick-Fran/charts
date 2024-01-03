<script setup lang="ts">
import BarChart from './components/chart/BarChart.vue'
import Navbar from './components/Navbar.vue'
import MainContainer from './components/MainContainer.vue'
</script>

<template>
  <Navbar title="Vite + Vue + Chart - Sample" />
  <MainContainer>
    <BarChart />
  </MainContainer>
</template>

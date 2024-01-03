<script setup lang="ts">
import Navbar from './components/Navbar.vue'
import MainContainer from './components/MainContainer.vue'
import BarChart from './components/chart/BarChart.vue'
</script>

<template>
  <Navbar title="Vite + Vue + Chart - Sample" />
  <MainContainer>
    <BarChart />
  </MainContainer>
</template>

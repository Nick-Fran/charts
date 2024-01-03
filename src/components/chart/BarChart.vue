<template>
  <Bar id="my-chart-id" :options="chartOptions" :data="chartData" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import { GenerateSeries, GenerateLinearArray } from '../../utils/math.ts'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

export default defineComponent({
  components: { Bar },
  data() {
    return {
      chartData: {
        labels: GenerateLinearArray(),
        datasets: [{ data: GenerateSeries() }]
      },
      chartOptions: {
        responsive: true
      }
    }
  }
})
</script>
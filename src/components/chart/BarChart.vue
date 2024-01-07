<template>
  <div>
    <button @click="refreshData">Refresh</button>
    <button @click="addColumn">Add Column</button>
    <button @click="removeColumn">Remove Column</button>
  </div>
  <Bar id="my-chart-id" :options="chartOptions" :data="chartData" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import { GenerateRandom, GenerateSeries, GenerateLinearArray } from '../../utils/math.ts'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const INITIAL_SIZE = 10;

export default defineComponent({
  components: { Bar },
  methods: {
    refreshData() {
      this.datasets = [{ data: GenerateSeries(this.size) }];
    },
    addColumn() {
      this.size++;
      this.labels.push(this.labels.length);
      this.datasets = this.datasets.map((dataset, index) => {
        let newData = [...dataset.data];
        newData.push(GenerateRandom())
        return { data: newData, order: index + 1 }
      });
    },
    removeColumn() {
      if (this.size > 1) {
        this.size--;
        this.labels.pop();
        this.datasets = this.datasets.map((dataset) => {
          let newData = [...dataset.data];
          newData.pop()
          return {
            ...dataset,
            data: newData
          }
        });
      }
    }
  },
  data() {
    return {
      size: INITIAL_SIZE,
      labels: GenerateLinearArray(INITIAL_SIZE),
      datasets: [{ data: GenerateSeries(INITIAL_SIZE) }],
      chartOptions: {
        responsive: true
      }
    }
  },
  computed: {
    chartData: function () {
      return ({
        labels: this.labels,
        datasets: this.datasets
      })
    }
  }
})
</script>
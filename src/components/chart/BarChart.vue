<template>
  <div>
    <button @click="refreshData">Refresh</button>
    <button @click="addColumn">Add Column</button>
    <button @click="removeColumn">Remove Column</button>
    <button @click="addDataset">Add Dataset</button>
    <button @click="removeDataset">Remove Dataset</button>
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
      this.datasets = this.datasets.map((dataset) => ({ ...dataset, data: GenerateSeries(this.size) }));
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
    },
    addDataset() {
      let updatedDatasets = [...this.datasets];
      updatedDatasets.push({
        data: GenerateSeries(this.size),
        order: this.datasets.length + 1
      })
      this.datasets = updatedDatasets;
    },
    removeDataset() {
      if (this.datasets.length > 1) {
        let updatedDatasets = [...this.datasets];
        updatedDatasets.pop()
        this.datasets = updatedDatasets;
      }
    }
  },
  data() {
    return {
      size: INITIAL_SIZE,
      labels: GenerateLinearArray(INITIAL_SIZE),
      datasets: [{ data: GenerateSeries(INITIAL_SIZE), order: 1 }],
      chartOptions: {
        responsive: true
      }
    }
  },
  computed: {
    chartData() {
      return ({
        labels: this.labels,
        datasets: this.datasets
      })
    }
  }
})
</script>
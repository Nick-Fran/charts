<template>
  <div>
    <v-btn class="action-button" @click="refreshData">Refresh</v-btn>
    <v-btn class="action-button" @click="addColumn">Add Column</v-btn>
    <v-btn class="action-button" @click="removeColumn">Remove Column</v-btn>
    <v-btn class="action-button" @click="addDataset">Add Dataset</v-btn>
    <v-btn class="action-button" @click="removeDataset">Remove Dataset</v-btn>
    <v-btn class="action-button" @click="openDialog">Edit Datasets</v-btn>
  </div>
  <Bar id="my-chart" ref="my-chart" :options="chartOptions" :data="chartData" />
  <EditDatasetsModal :isOpen="isDialogOpen" :onClose="closeDialog" :datasets="datasets" :onUpdate="updateDatasets" />
</template>

<style scoped>
.action-button {
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>

<script lang="ts">
import { defineComponent } from 'vue';
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import { GenerateRandom, GenerateSeries, GenerateLinearArray, createInitialArray } from '../../utils/math.ts'
import EditDatasetsModal from '../modal/EditDatasetsModal.vue';
import { IDataset } from '../../utils/interfaces';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const INITIAL_SIZE = 10;

export default defineComponent({
  components: { Bar, EditDatasetsModal },
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
        return { ...dataset, data: newData, order: index + 1 }
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
        order: this.datasets.length + 1,
        backgroundColor: "#FFB1C1",
        label: undefined
      })
      this.datasets = updatedDatasets;
    },
    removeDataset() {
      if (this.datasets.length > 1) {
        let updatedDatasets = [...this.datasets];
        updatedDatasets.pop()
        this.datasets = updatedDatasets;
      }
    },
    updateDatasets(datasets: IDataset[]) {
      this.datasets = [...datasets]
      this.isDialogOpen = false;
    },
    openDialog() {
      this.isDialogOpen = true;
    },
    closeDialog() {
      this.isDialogOpen = false;
    }
  },
  data() {
    return {
      size: INITIAL_SIZE,
      labels: GenerateLinearArray(INITIAL_SIZE),
      datasets: createInitialArray(INITIAL_SIZE),
      chartOptions: {
        responsive: true
      },
      isDialogOpen: false
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
<template>
  <v-dialog v-model="props.isOpen" width="700px">
    <v-card>
      <v-card-text>
        <div v-for="dataset in datasetsInfo">
          <div class="list-wrapper">
            <span>Dataset name:</span>
            <v-text-field v-model="dataset.label"></v-text-field>
            <span class="separator">Dataset color:</span>
            <v-text-field v-model="dataset.backgroundColor"></v-text-field>
            <v-btn class="separator" icon="mdi-reload" variant="plain" @click="GetRandomColor(dataset)" />
          </div>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn color="secondary" @click="props.onClose">Close Dialog</v-btn>
        <v-btn color="primary" @click="props.onUpdate(datasetsInfo)">Update</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.list-wrapper {
  display: flex;
  align-items: center;
}

.separator {
  margin-left: 20px;
}
</style>

<script setup lang="ts">
import { ref } from 'vue';
import { IDataset } from '../../utils/interfaces';
import { GenerateRandomColor } from '../../utils/math';

const props = defineProps<{
  datasets: IDataset[]
  isOpen: boolean,
  onClose: () => void,
  onUpdate: (datasets: IDataset[]) => void,
}>();

let datasetsInfo = ref(props.datasets);

function GetRandomColor(datasetToUpdate: IDataset) {
  datasetsInfo.value = datasetsInfo.value.map(dataset => {
    if (dataset.order === datasetToUpdate.order) {
      const newColor = GenerateRandomColor();
      return {
        ...dataset,
        backgroundColor: newColor
      }
    }
    return dataset
  })
}
</script>
<template>
  <v-dialog v-model="props.isOpen" width="700px">
    <v-card>
      <v-card-text>
        <div v-for="dataset in datasets">
          <div class="list-wrapper">
            <span>Dataset name:</span>
            <v-text-field v-model="dataset.label"></v-text-field>
            <span class="separator">Dataset color:</span>
            <v-text-field v-model="dataset.backgroundColor"></v-text-field>
          </div>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn color="secondary" @click="props.onClose">Close Dialog</v-btn>
        <v-btn color="primary" @click="props.onUpdate(props.datasets)">Update</v-btn>
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
import { IDataset } from '../../utils/interfaces';

const props = defineProps<{
  datasets: IDataset[]
  isOpen: boolean,
  onClose: () => void,
  onUpdate: (datasets: IDataset[]) => void,
}>();
</script>
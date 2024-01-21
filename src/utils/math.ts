export function GenerateRandom(min?: number, max?: number) {
  return Math.floor(Math.random() * (max ?? 100)) + (min ?? 0)
}

export function GenerateSeries(length?: number) {
  return [...Array(length ?? 10).keys()].map(() => GenerateRandom());
}

export function GenerateLinearArray(length?: number) {
  return [...Array(length ?? 10).keys()]
}

export function createInitialArray(size: number) {
  let datasets: IDataset[];

  datasets = [{
    data: GenerateSeries(size), order: 1,
    backgroundColor: "#FFB1C1"
  }]

  return datasets;
}

export function GenerateRandomColor() {
  return '#' + (Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0');
}
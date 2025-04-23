<template>
  <h1>PÉRIODIQUE OU PAS ?</h1>
  <ul>
    <div class="grid-container">
      <div class="grid-item" v-for="pe in periodicElements" :key="pe.id">
        <span class="pe-atomic-weight">{{ pe.atomic_weight }}</span>
        <span class="pe-atomic-id">{{ pe.atomic_id }}</span>
        <div class="pe-symbol">{{ pe.symbol }}</div>
        <div class="pe-name">{{ pe.name }}</div>
      </div>
    </div>
  </ul>
</template>

<script setup lang="ts">
import type PeriodicElement from "../model/PeriodicElement";
import { ref, onMounted } from "vue";

const periodicElements = ref<PeriodicElement[]>([]);

const fetchPeriodicElements = async () => {
  try {
    const response = await fetch("/api/periodic_elements" ,{
      headers: { "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoic2F5X215X25hbWUifQ.5UmHHaAhJIX24KxUNV2EwdG2GJcOwI6OY7sanznHnOs"}
    });
    if (!response.ok) {
      throw new Error("Erreur réseau ou serveur.");
    }
    const data = await response.json();
    periodicElements.value = data;
  } catch (error) {
    console.error("Erreur durant la récupération des éléments.", error);
  }
};

onMounted(() => {
  fetchPeriodicElements();
});
</script>

<style scoped>
h1 {
  text-align: center;
}
.grid-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%; /* Ajustez selon vos besoins */
}

.grid-item {
  position: relative;
  margin: 5px; /* Espacement entre les éléments */
  padding-left: 5px;
  box-sizing: border-box;
  background-color: #171c20;
  border: 1px solid #ccc;
  width: 120px;
  height: 120px;
}

.pe-atomic-id {
  position: absolute;
  right: 5px;
}

.pe-atomic-weight {
  position: absolute;
  left: 5px;
}

.pe-symbol {
  position: absolute;
  top: 15%;
  font-size: 3em;
  font-weight: bold;
}

.pe-name {
  vertical-align: bottom;
  position: absolute;
  bottom: 0px;
  /* align-items: flex-end; */
}
</style>
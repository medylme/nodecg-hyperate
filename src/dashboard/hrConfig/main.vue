<!-- eslint-disable no-alert -->
<script setup lang="ts">
import { useHead } from '@vueuse/head';
import { useReplicant } from 'nodecg-vue-composable';
import { ref } from 'vue';
import { HrReplicant } from '../../types';

useHead({ title: 'HypeRate Config' });

const trackedIds = useReplicant<string[]>('trackedIds', 'nodecg-hyperate');
const hrReplicant = useReplicant<HrReplicant>('hrReplicant', 'nodecg-hyperate');

const newId = ref('');
function addId(id: string) {
  if (!trackedIds || !trackedIds.data) return;

  if (trackedIds.data.includes(id)) {
    alert('ID already in list.');
    return;
  }

  if (id.length !== 6) {
    alert('Please enter a valid 6 character ID.');
    return;
  }

  trackedIds.data.push(id);
  trackedIds.save();
}
function removeId(id: string) {
  if (!trackedIds || !trackedIds.data) return;
  trackedIds.data = trackedIds.data.filter((i) => i !== id);
  trackedIds.save();
}

const updatedIds = ref<string[]>([]);
nodecg.listenFor('hr-update', (data: string) => {
  updatedIds.value.push(data);
  setTimeout(() => {
    updatedIds.value = updatedIds.value.filter((i) => i !== data);
  }, 100);
});
</script>

<template>
  <div
    class="flex-col items-center justify-center gap-4"
    v-if="hrReplicant?.data && trackedIds?.data"
  >
    <h1 class="text-lg font-bold text-center">Tracked:</h1>
    <ul
      class="flex flex-col items-center justify-center gap-2"
      v-for="id in trackedIds.data"
      v-bind:key="id"
    >
      <li
        v-if="hrReplicant.data[id]?.hr"
        class="flex flex-row items-center gap-4 w-full"
      >
        <div>
          <p v-if="updatedIds.includes(id)" class="animate-pulse">🟢</p>
          <p v-else>🔴</p>
        </div>
        <h1 class="font-bold">{{ id }}</h1>
        <p class="mr-auto">♥ {{ hrReplicant.data[id]?.hr || 0 }}</p>
        <button @click="removeId(id)">X</button>
      </li>
      <li v-else class="flex flex-row items-center gap-4 w-full">
        <p>🔴</p>
        <h1 class="font-bold">{{ id }}</h1>
        <p class="mr-auto">♥ <span class="text-xs">-</span></p>
        <button @click="removeId(id)">X</button>
      </li>
    </ul>
    <br />
    <div class="flex flex-row gap-2 w-full items-center justify-center">
      <p>HypeRate ID:</p>
      <input
        class="bg-[rgba(0,0,0,0.5)] rounded-xl"
        type="text"
        v-model="newId"
      />
      <button
        class="bg-[rgba(0,0,0,0.5)] px-2 hover:bg-[rgba(0,0,0,0.25)] rounded-xl"
        @click="addId(newId)"
      >
        Add
      </button>
    </div>
  </div>
</template>

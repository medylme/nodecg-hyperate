<!-- eslint-disable max-len -->
<!-- eslint-disable operator-linebreak -->
<!-- eslint-disable import/no-extraneous-dependencies -->
<script setup lang="ts">
import Vue3Odometer from 'vue3-odometer';
import 'odometer/themes/odometer-theme-default.css';
import { useReplicant } from 'nodecg-vue-composable';
import { HrReplicant } from '@nodecg-hyperate/types';

const hrReplicant = useReplicant<HrReplicant>('hrReplicant', 'nodecg-hyperate');
</script>

<template>
  <div
    id="container"
    class="flex items-center justify-center transition-all duration-1000 ease-in-out delay-500"
    v-if="hrReplicant?.data"
  >
    <ul
      class="flex flex-col items-center justify-center gap-4"
      v-for="hrData in hrReplicant.data"
      v-bind:key="hrData?.id"
    >
      <li class="flex flex-col items-center justify-center gap-1">
        <p class="text-black">id: {{ hrData?.id }}</p>
        <div class="flex flex-col gap-4 items-center justify-center">
          <div
            class="flex flex-row gap-2 items-center justify-center bg-[#969eff] py-2 px-4 rounded-full text-white text-xl font-black"
          >
            <p class="text-3xl">♥</p>
            <Vue3Odometer
              format="(,ddd).dd"
              class="o-text transition-colors duration-200"
              :value="hrData?.hr"
            />
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<style>
/* Number Transition Speed */
.odometer-ribbon-inner {
  -webkit-transition: -webkit-transform 200ms !important;
  -moz-transition: -moz-transform 200ms !important;
  -ms-transition: -ms-transform 200ms !important;
  -o-transition: -o-transform 200ms !important;
  transition: transform 200ms !important;
}
</style>

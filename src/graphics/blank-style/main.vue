<!-- eslint-disable max-len -->
<!-- eslint-disable operator-linebreak -->
<!-- eslint-disable import/no-extraneous-dependencies -->
<script setup lang="ts">
import 'odometer/themes/odometer-theme-default.css';
import { useReplicant } from 'nodecg-vue-composable';
import { HrReplicant } from '@nodecg-hyperate/types';

const hrReplicant = useReplicant<HrReplicant>('hrReplicant', 'nodecg-hyperate');
</script>

<template>
  <div
    id="container"
    class="flex items-center justify-center"
    v-if="hrReplicant?.data"
  >
    <ul
      class="flex flex-col items-center justify-center gap-4"
      v-for="hrData in hrReplicant.data"
      v-bind:key="hrData?.id"
    >
      <li class="flex flex-row items-center justify-center gap-1">
        <p class="text-black">id: {{ hrData?.id }} -</p>
        <div class="flex flex-col gap-4 items-center justify-center">
          <div class="flex flex-row gap-2 items-center justify-center">
            <p>♥ {{ hrData?.hr }}</p>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<style>
.odometer-ribbon-inner {
  -webkit-transition: -webkit-transform 200ms !important;
  -moz-transition: -moz-transform 200ms !important;
  -ms-transition: -ms-transform 200ms !important;
  -o-transition: -o-transform 200ms !important;
  transition: transform 200ms !important;
}
</style>

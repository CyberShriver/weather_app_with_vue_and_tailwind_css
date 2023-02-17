<template>
  <div class="flex flex-col bg-weather-primary min-h-screen font-Roboto ">
    <navbar/>
    <RouterView/>
  </div>
</template>

<script setup>
import { RouterView } from "vue-router";
import navbar from './components/navbar.vue';

</script>

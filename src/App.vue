<template>
  <div class="flex flex-col bg-weather-primary min-h-screen font-Roboto ">
    <navbar/>
    <RouterView v-slot="{Component}">
      <Transition name="page" mode="out-in">
        <component :is="Component"/>
      </Transition>
    </RouterView>
  </div>
</template>

<script setup>
import { RouterView } from "vue-router";
import navbar from './components/navbar.vue';

</script>
<style>
  .page-enter-active,
  .page-leave-active{
    transition: 600ms ease all;
  }
  .page-enter-from,
  .page-leave-to{
    opacity: 0;
  }
</style>

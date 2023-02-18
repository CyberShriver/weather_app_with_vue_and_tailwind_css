<template>
  <header class="bg-weather-primary shadow-lg sticky top-0">
    <nav  class=" container flex flex-col text-white items-center gap-4 py-6 sm:flex-row">
      <RouterLink :to="{ name: 'Home' }">
        <div class="flex items-center gap-3">
          <i class="fa-solid fa-sun text-2xl"></i>
          <div class="text-2xl">The Local Weather</div>
        </div>
      </RouterLink>

      <div class="flex items-center flex-1 justify-end gap-3">
        <i
          class="
            fa-solid fa-circle-info
            text-xl
            hover:text-weather-secondary
            duration-150
            cursor-pointer
          "
          @click="toggleModal"
        ></i>
        <i class="fa-solid fa-plus text-xl hover:text-weather-secondaryduration-150cursor-pointer"
         @click="AddCity" v-if="route.query.preview"></i>
      </div>

      <GlobalModal :modalActive="modalActive" @close-modal="toggleModal">
        <div class="text-black">
          <h1 class="text-2xl mb-1">About:</h1>
          <p class="mb-4">
            The Local Weather allows you to track the current and future weather
            of cities of your choosing.
          </p>
          <h2 class="text-2xl">How it works:</h2>
          <ol class="list-decimal list-inside mb-4">
            <li>
              Search for your city by entering the name into the search bar.
            </li>
            <li>
              Select a city within the results, this will take you to the
              current weather for your selection.
            </li>
            <li>
              Track the city by clicking on the "+" icon in the top right. This
              will save the city to view at a later time on the home page.
            </li>
          </ol>

          <h2 class="text-2xl">Removing a city</h2>
          <p>
            If you no longer wish to track a city, simply select the city within
            the home page. At the bottom of the page, there will be am option to
            delete the city.
          </p>
        </div>
      </GlobalModal>
    </nav>
  </header>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import GlobalModal from "./GlobalModal.vue";
import {uid} from "uid"
import { useRoute, useRouter } from "vue-router";

const modalActive = ref(null);
const savedCities=ref([]);
const route=useRoute();
const router=useRouter();

const toggleModal = () => {
  modalActive.value = !modalActive.value;
};

const AddCity=()=>{
  if(localStorage.getItem('savedCities')){
    savedCities.value=JSON.parse(
      localStorage.getItem('savedCities')
    );
  }

  const locations={
    id:uid(),
    city:route.params.city,
    state:route.params.state,
    coords:{
      lat:route.query.lat,
      lng:route.query.lng
     }
  }

  savedCities.value.push(locations);

  localStorage.setItem(
    'savedCities',
    JSON.stringify(savedCities.value)
  )

  let query=Object.assign({},route.query);
  delete query.preview
  query.id = locationObj.id;
   router.replace({query});
}

</script>

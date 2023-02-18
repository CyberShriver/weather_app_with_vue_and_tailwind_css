<template>
  <main class="container text-white ">
    <div class="pt-4 mb-8 relative">
      <input type="text" placeholder="search city or state" v-model="searchQuery"  @input="getSearchResults"
      class="py-2 px-1 w-full bg-transparent border-b focus:border-weather-secondary focus:outline-none focus:shadow-[0px_1px_0_0_#004E71]">      
          <ul class="absolute bg-weather-secondary text-white w-full shadow-md py-2 px-1 top-[66px]" v-if="mapboxSearchResults">
            <p v-if="searchError" class="py-2">Sorry, something went wrong, please try again.</p>
            <p class="py-2" v-if="!searchError && mapboxSearchResults.length===0"> No results match your query, try a different term.</p>
            <template v-else>
              <li v-for="searchResult in mapboxSearchResults" :key="searchResult.id" class="py-2 cursor-pointer" @click="preview(searchResult)">
                {{ searchResult.place_name }}
              </li>
            </template>
          </ul>
    </div>

    <div class="flex flex-col gap-4">
      <Suspense>
        <CityList/>
        <template #fallback>
          <cityCardSkeleton/>
        </template>
      </Suspense>
    </div>
  </main>
</template>
<script setup>
import { ref } from "@vue/reactivity";
import axios from 'axios'
import { useRouter } from "vue-router";
import CityList from "../components/CityList.vue";
import cityCardSkeleton from "../components/CityCardSkeleton.vue";


const mapboxAPIKey ="pk.eyJ1Ijoiam9obmtvbWFybmlja2kiLCJhIjoiY2t5NjFzODZvMHJkaDJ1bWx6OGVieGxreSJ9.IpojdT3U3NENknF6_WhR2Q";
const searchQuery=ref("");
const QueryTimeOut=ref(null);
const mapboxSearchResults=ref("");
const searchError = ref(null);
const router=useRouter();

const preview=(mapboxSearchResults)=>{
  console.log(mapboxSearchResults);
  const [city,state]=mapboxSearchResults.place_name.split(",");
  console.log(city,state);
  router.push({
    name:"cityView",
    params:{city:city,state:state.replaceAll(" ", "")},
    query:{
      lat:mapboxSearchResults.geometry.coordinates[1],
      lng:mapboxSearchResults.geometry.coordinates[0],
      preview:true
    }
  })
}

const getSearchResults=()=>{
  clearTimeout(QueryTimeOut.value);
  QueryTimeOut.value=setTimeout(async()=>{

    if (searchQuery.value !== "") {
      try {
        const result = await axios.get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchQuery.value}.json?access_token=${mapboxAPIKey}&types=place`
        );
        mapboxSearchResults.value = result.data.features;
      } catch {
        searchError.value = true;
      }

      return;
    }
    mapboxSearchResults.value = null;
  },300);
};

</script>
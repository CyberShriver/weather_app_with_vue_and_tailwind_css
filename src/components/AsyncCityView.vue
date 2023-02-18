<template>
     <div>
        
     </div>
</template>

<script setup>
import { useRoute } from "vue-router"
import axios from "axios";

const route=useRoute();
const getWeatherData= async()=>{
    try {
        const weatherData=await axios.get(
        `https://api.openweathermap.org/data/3.0/onecall?lat=${route.query.lat}&lon=${route.query.lng}&exclude={part}&appid=b4f19c21de1dae657199a38e0da99b6a&units=imperial`
        );
        // cal current date & time
    const localOffset = new Date().getTimezoneOffset() * 60000;
    const utc = weatherData.data.current.dt * 1000 + localOffset;
    weatherData.data.currentTime =
      utc + 1000 * weatherData.data.timezone_offset;

    // cal hourly weather offset
    weatherData.data.hourly.forEach((hour) => {
      const utc = hour.dt * 1000 + localOffset;
      hour.currentTime =
        utc + 1000 * weatherData.data.timezone_offset;
    });

    return weatherData.data;
        
    } catch (error) {
        console.log(error);
    }
}

const weatherData=await getWeatherData();

</script>

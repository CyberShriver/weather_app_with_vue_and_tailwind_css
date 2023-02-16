<template>
    <header class=" bg-weather-primary shadow-lg sticky top-0">

        <nav class="container flex flex-col text-white items-center gap-4 py-6 sm:flex-row ">
            <RouterLink :to="{name:'Home'}">
                <div class="flex  items-center gap-3">
                    <i class="fa-solid fa-sun text-2xl"></i>
                    <div class="text-2xl">The Local Weather</div>
                </div>
            </RouterLink>

            <div class="flex items-center flex-1 justify-end gap-3">
                <i class="fa-solid fa-circle-info text-xl hover:text-weather-secondary duration-150 cursor-pointer"></i>
                <i class="fa-solid fa-plus text-xl hover:text-weather-secondary duration-150 cursor-pointer"></i>
            </div>

        </nav>

    </header>
</template>

<script setup>

</script>

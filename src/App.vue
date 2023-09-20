<template>
  <div class="text-center mb-8">
    <h1 class="text-4xl font-bold">Rick and Morty Gallery</h1>
  </div>
  <div class="flex flex-wrap items-center gap-y-8 justify-center" v-if="allData">
      <div v-for="item in allData.results" :key="item.id" class="lg:basis-4/12 sm:basis-6/12 xs:basis-full flex justify-center">
          <RickAndMortyCard :item="item" />
      </div>
  </div>
</template>

<script setup>
import axios from "axios";
import {ref} from "vue";
import RickAndMortyCard from "@/components/RickAndMortyCard.vue";

const allData = ref(null);

(async () => {
   const {data} = await axios.get('https://rickandmortyapi.com/api/character')
    allData.value = data;
    console.log(allData.value.results)
})()

</script>

<style scoped>
</style>

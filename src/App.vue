<template>
  <div class="text-center mb-8">
    <h1 class="text-4xl font-bold">Rick and Morty Gallery</h1>
  </div>
  <div ref="scrollContainer">
    <div class="flex flex-wrap items-center gap-y-8 justify-center" v-if="allData">
      <div v-for="item in allData.results" :key="item.id" class="2xl:basis-3/12 lg:basis-4/12 sm:basis-6/12 xs:basis-full flex justify-center">
        <RickAndMortyCard :item="item" />
      </div>
    </div>
    <div class="flex mt-8 mb-8 justify-center p-8 bg-white/50" v-if="isLoaderShown">
      <Loader />
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import {onMounted, onUnmounted, ref} from "vue";
import RickAndMortyCard from "@/components/RickAndMortyCard.vue";
import throttle from 'lodash.throttle';
import Loader from "@/components/Loader.vue";

const allData = ref(null);
const scrollContainer = ref(null);
const isLoaderShown = ref(false);
const getData = async () => {
    try {
        isLoaderShown.value = true;
        const {data} = await axios.get('https://rickandmortyapi.com/api/character?page=1')
        allData.value = data;
    } catch(err) {
        console.log(err)
        isLoaderShown.value = false
    } finally {
        isLoaderShown.value = false;
    }
}

(() => {
   getData()
})()
const loadMoreItems = (newPosts) => {
    allData.value.results.push(...newPosts.results)
}

const handleScroll = throttle(async () => {
    let element = scrollContainer.value
    try {
        isLoaderShown.value = true
        if (Math.floor(element.getBoundingClientRect().bottom) <= window.innerHeight) {
          if (allData.value.info.next) {
            const {data} = await axios.get(allData.value.info.next)
            allData.value.info = data.info
            loadMoreItems(data)
          }
        }
    } catch(err) {
        console.log(err)
    } finally {
        isLoaderShown.value = false;
    }

}, 1000)
onMounted(() => {
    window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
</style>

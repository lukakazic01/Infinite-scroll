<template>
    <div class="text-center mb-8 mt-8">
        <h1 class="sm:text-4xl font-bold text-2xl">Rick and Morty Gallery</h1>
    </div>
    <div ref="scrollContainer"  v-if="apiData">
        <div class="flex flex-wrap gap-y-8 justify-center">
            <div v-for="character in apiData.characters" :key="character.id" class="min-[1930px]:basis-2/12 xl:basis-3/12 lg:basis-4/12 sm:basis-6/12 basis-full flex justify-center">
                <router-link :to="`/${character.name}/${character.id}`">
                    <RickAndMortyCard :character="character" />
                </router-link>
            </div>
        </div>
        <div class="flex mt-8 mb-8 justify-center p-8 bg-white/50" v-if="showLoader">
            <Loader />
        </div>
    </div>
    <div v-if="error" class="font-bold text-red-500 flex justify-center p-8">
        There was an error with fetching the data
    </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import RickAndMortyCard from "@/components/RickAndMortyCard.vue";
import throttle from 'lodash.throttle';
import Loader from "@/components/Loader.vue";
import axios from "axios";

const apiData = ref(null);
const scrollContainer = ref(null);
const showLoader = ref(false);
const error = ref(false);

(async () => {
    try {
        showLoader.value = true;
        const { data } = await axios.get('https://rickandmortyapi.com/api/character?page=1')
        apiData.value = [data].reduce((acc,item) => {
            return {characters: item.results, info: {...item.info}}
        }, {})
    } catch(err) {
        error.value = true
        setTimeout(() => error.value = false ,3000)
    } finally {
        showLoader.value = false;
    }
})()

const handleInfiniteScroll = throttle(async () => {
    let element = scrollContainer.value
    try {
        showLoader.value = true
        if (Math.floor(element.getBoundingClientRect().bottom) <= window.innerHeight) {
            if (apiData.value.info.next) {
                const { data }  = await axios.get(apiData.value.info.next)
                apiData.value.info = data.info
                apiData.value.characters.push(...data.results)
            }
        }
    } catch(err) {
        error.value = true
        setTimeout(() => error.value = false ,3000)
    } finally {
        showLoader.value = false;
    }
}, 1000)

onMounted(() => {
    /* When we fetch data with scrolling and try to reload page, scroll will hit the bottom in a millisecond and do unnecessary fetching
    * which we don't want */
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }
    window.addEventListener('scroll', handleInfiniteScroll)
})

onUnmounted(() => {
    window.removeEventListener('scroll', handleInfiniteScroll)
})
</script>

<style scoped>
</style>

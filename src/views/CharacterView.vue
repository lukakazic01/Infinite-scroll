<template>
    <div class="flex flex-col items-center" v-if="character">
        <p class="font-bold sm:text-4xl text-2xl">About {{character.name}}</p>
        <img :src="character.image" width="300" height="300" class="mt-4 rounded-sm"/>
        <p><span class="font-bold">Gender:</span> {{character.gender}}</p>
        <p><span class="font-bold">Created:</span> {{useDateFormatter(character.created)}}</p>
        <p><span class="font-bold">Origin:</span> {{character.origin.name}}</p>
        <p><span class="font-bold">Species:</span> {{character.species}}</p>
        <p><span class="font-bold">Status:</span> {{character.status}}</p>
        <p><span class="font-bold">Location:</span> {{character.location.name}}</p>
        <p><span class="font-bold">Location Type:</span> {{location.type}}</p>
        <p><span class="font-bold">Location Creation:</span> {{useDateFormatter(location.created)}}</p>
        <p><span class="font-bold">Dimension:</span> {{location.dimension}}</p>
    </div>
    <div v-if="showLoader" class="absolute top-2/4 right-2/4 -translate-y-2/4 translate-x-2/4 ">
        <Loader />
    </div>
    <div v-if="error" class="flex justify-center text-red-500 font-bold mt-8">
        There was an error with fetching the data
    </div>
</template>

<script setup>
import {useRoute} from "vue-router";
import axios from "axios";
import {ref} from "vue";
import useDateFormatter from "../composables/useDateFormatter";
import Loader from "@/components/Loader.vue";

const route = useRoute()
const { id } = route.params;
const character = ref(null);
const location = ref(null);
const error = ref(false);
const showLoader = ref(false);

(async() => {
    try {
        showLoader.value = true
        const {data: dataAboutCharacter} = await axios.get(`https://rickandmortyapi.com/api/character/${id}`)
        const { data: dataAboutCharacterLocation } = await axios.get(dataAboutCharacter.location.url)
        character.value = dataAboutCharacter
        location.value = dataAboutCharacterLocation
    } catch (err) {
        error.value = true
        setTimeout(() => error.value = false ,3000)
    } finally {
        showLoader.value = false
    }
})()
</script>

<style lang="scss" scoped>

</style>
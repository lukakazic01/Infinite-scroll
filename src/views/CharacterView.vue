<template>
    <div class="flex flex-col items-center" v-if="character">
        <p class="font-bold sm:text-4xl text-2xl">About {{character.name}}</p>
        <img :src="character.image" width="300" height="300" class="mt-4 rounded-sm"/>
        <p><span class="font-bold">Gender:</span> {{character.gender}}</p>
        <p><span class="font-bold">Created:</span> {{useDateFormatter(character.created)}}</p>
        <p><span class="font-bold">Origin:</span> {{character.origin.name}}</p>
        <p><span class="font-bold">Species:</span> {{character.species}}</p>
        <p><span class="font-bold">Status:</span> {{character.status}}</p>
        <p><span class="font-bold">Location Name:</span> {{character.location.name}}</p>
        <p><span class="font-bold">Location Type:</span> {{location.type}}</p>
        <p><span class="font-bold">Location Creation:</span> {{useDateFormatter(location.created)}}</p>
        <p><span class="font-bold">Dimension:</span> {{location.dimension}}</p>
    </div>
    <div v-if="error" class="flex justify-center text-red-500 font-bold">
        There was an error with fetching the data
    </div>
</template>

<script setup>
import {useRoute} from "vue-router";
import axios from "axios";
import {ref} from "vue";
import useDateFormatter from "../composables/useDateFormatter";

const route = useRoute()
const { id } = route.params;
const character = ref(null);
const location = ref(null);
const error = ref(false);
(async() => {
    try {
        const {data: dataAboutCharacter} = await axios.get(`https://rickandmortyapi.com/api/character/${id}`)
        const { data: dataAboutCharacterLocation } = await axios.get(dataAboutCharacter.location.url)
        character.value = dataAboutCharacter
        location.value = dataAboutCharacterLocation
    } catch (err) {
        error.value = true
    }
})()
</script>

<style lang="scss" scoped>

</style>
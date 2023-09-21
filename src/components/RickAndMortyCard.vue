<template>
  <div class="flex flex-col card rounded-2xl">
      <img :src="props.character.image" class="rounded-t-2xl" width="300" height="300"/>
      <div class="p-4">
          <p class="flex gap-x-1">
              <span class="font-bold">Name:</span>
              <span class="text-ellipsis overflow-hidden whitespace-nowrap max-w-[200px]"> {{props.character.name}}</span>
          </p>
          <p><span class="font-bold">Status:</span> {{props.character.status}}</p>
          <p><span class="font-bold">Created:</span> {{useDateFormatter(props.character.created)}}</p>
          <p class="flex gap-x-1">
              <span class="font-bold">Location:</span>
              <span class="text-ellipsis overflow-hidden whitespace-nowrap max-w-[190px]">{{props.character.location.name}}</span>
          </p>
      </div>
  </div>
</template>

<script setup>
import useDateFormatter from "../composables/useDateFormatter";

const props = defineProps({
    character: {
        required: true,
        type: Object
    }
})
</script>

<style scoped>
.card {
  box-shadow: 0px 0px 20px 0px #D3D3D3;
}
</style>
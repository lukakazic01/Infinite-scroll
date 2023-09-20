<template>
  <div class="flex flex-col card">
      <img :src="props.item.image" width="300" height="300"/>
      <div class="p-2">
        <p><span class="font-bold">Name:</span> {{props.item.name}}</p>
        <p><span class="font-bold">Status:</span> {{props.item.status}}</p>
        <p><span class="font-bold">Created:</span> {{dateFormat(props.item.created)}}</p>
        <p><span class="font-bold">Loc:</span> {{props.item.location.name}}</p>
      </div>
  </div>
</template>

<script setup>
const props = defineProps({
    item: Object,
    required: true
})

const dateFormat = (date) => {
    return new Date(date).toLocaleDateString('en-US')
}
</script>

<style scoped>
.card {
  box-shadow: 0px 0px 20px 0px gray;
}
</style>
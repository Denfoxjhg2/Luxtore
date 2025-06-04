<script setup lang="ts">
defineProps({
    imageUrl: String,
    title: String,
    price: String,
})
</script>

<template>
    <div class=" p-8 flex bg-white items-center justify-center flex-col cursor-pointer transition hover:-translate-y-2 hover:shadow-xl">
        <img :src="imageUrl" alt="iPhone" class="w-[160px]">
        <p class="mt-4 text-l text-center">{{ title }}</p>
        <span class="text-xl font-medium mt-2">{{ price }}</span>
    </div>
</template>
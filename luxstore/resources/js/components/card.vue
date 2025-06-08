<script setup lang="ts">
defineProps({
    imageUrl: String,
    title: String,
    price: String,
});
</script>

<template>
    <div
        class="flex cursor-pointer flex-col items-center justify-center bg-white p-8 transition hover:-translate-y-2 hover:shadow-xl"
        @click="$router.push('/item')"
    >
        <img :src="imageUrl" alt="iPhone" class="w-[160px]" />
        <p class="text-l mt-4 text-center">{{ title }}</p>
        <span class="mt-2 text-xl font-medium">{{ price }}</span>
    </div>
</template>

<script setup lang="ts">
defineProps({
    imageUrl: String,
    title: String,
    price: Number,
    slug: String,
});
</script>

<template>
    <router-link
        class="flex cursor-pointer flex-col items-center justify-center bg-white p-8 transition hover:-translate-y-2 hover:shadow-xl"
        :to="{ name: 'Item.show', params: { slug } }"
    >
        <img :src="imageUrl" alt="phone" class="w-[160px]" />
        <p class="text-l mt-4 text-center">{{ title }}</p>
        <span class="mt-2 text-xl font-medium">{{ price }}₽</span>
    </router-link>
</template>

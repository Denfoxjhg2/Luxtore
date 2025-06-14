<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from '../src/stores/store.js';
import Card from './card.vue';

const store = useStore();
const summproducts = computed(() => {
    return store.products;
});
</script>

<template>
    <div class="px-72">
        <h2 class="my-8 text-3xl font-bold">Премиум и качество в одном каталоге</h2>
        <div class="grid grid-cols-4">
            <Card
                v-for="product in summproducts"
                :key="product.id"
                :title="product.name"
                :imageUrl="product.image_url"
                :price="product.price"
                :slug="product.slug"
            />
        </div>
    </div>
</template>

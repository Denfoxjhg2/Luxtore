<script setup lang="ts">
import { computed, ref } from 'vue';
import { useStore } from '../src/stores/store.js';
import Card from './card.vue';

const store = useStore();
const summproducts = computed(() => {
    return store.products;
});

const isOpen = ref(false);
const query = ref([]);

const queryProducts = computed(() => {
    let p = (summproducts as ComputedRef<Product[]>).value;
    if (query.value) {
        p = p.filter((product: any) => product.name.toLowerCase().indexOf(String(query.value).toLowerCase()) !== -1);
    }
    return p;
});

const toggleDrawer = () => {
    isOpen.value = !isOpen.value;
};
</script>

<template>
    <div class="px-72">
        <h2 class="my-14 text-center text-5xl font-bold">Премиум и качество в одном каталоге</h2>
        <div class="flex justify-between">
            <button class="flex gap-2" @click="toggleDrawer()">
                <img src="/assets/icons/filter.svg" alt="filter" />
                <h2 class="text-xl">Фильтры</h2>
            </button>
            <select>
                <option value="1">По убыванию цены</option>
                <option value="2">По возрастанию цены</option>
                <option value="3">Новинки</option>
            </select>
        </div>
        <div class="my-8 flex gap-8" v-if="isOpen">
            <form class="flex gap-8">
                <select>
                    <option v-for="filter in summproducts" :key="filter.id" value="1">{{ filter.memory }}</option>
                    >
                </select>
                <select>
                    <option v-for="filter in summproducts" :key="filter.id" value="1">{{ filter.color }}</option>
                </select>
                <select>
                    <option v-for="filter in summproducts" :key="filter.id" value="1">{{ filter.sim }}</option>
                </select>
            </form>
            <input type="search" v-model="query" />
        </div>
        <div class="mt-4 h-0.5 bg-slate-200"></div>
        <div class="grid grid-cols-4">
            <Card
                v-for="product in queryProducts"
                :key="product.id"
                :title="product.name"
                :imageUrl="product.image_url"
                :price="product.price"
                :slug="product.slug"
            />
        </div>
    </div>
</template>

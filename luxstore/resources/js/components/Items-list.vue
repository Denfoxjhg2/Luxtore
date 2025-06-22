<script setup lang="ts">
import { computed, ref } from 'vue';
import { useStore } from '../src/stores/store.js';
import Card from './card.vue';

const store = useStore();

const isOpen = ref(false);
const query = ref([]);

const queryProducts = computed(() => {
    let p = store.sortedAndFilteredProducts;
    if (query.value) {
        p = p.filter((product: any) => product.name.toLowerCase().indexOf(String(query.value).toLowerCase()) !== -1);
    }
    return p;
});

const toggleDrawer = () => {
    const filt = document.getElementById('filt');
    isOpen.value = !isOpen.value;
    if (isOpen.value == true) {
        filt.setAttribute('src', '/assets/icons/cancel.svg');
    } else if (isOpen.value == false) {
        filt.setAttribute('src', '/assets/icons/filter.svg');
    }
};
</script>

<template>
    <div class="px-72">
        <h2 class="my-14 text-center text-5xl font-bold">Премиум и качество в одном каталоге</h2>
        <div class="flex justify-between">
            <button class="flex gap-2" @click="toggleDrawer()">
                <img src="/assets/icons/filter.svg" alt="filter" id="filt" />
                <h2 class="text-xl">Фильтры</h2>
            </button>
            <select v-model="store.selectedSort" class="active:rounded-xl active:border active:border-slate-300 active:bg-slate-200">
                <option v-for="option in store.sortOptions" :key="option.value" :value="option.value">{{ option.label }}</option>
            </select>
        </div>
        <div class="my-8 flex justify-between" v-if="isOpen">
            <form class="flex gap-8">
                <select class="rounded-xl border border-slate-300 bg-slate-200 p-2" v-model="store.filters.color">
                    <option value="null" selected>Цвет</option>
                    <option v-for="color in store.filterOptions.colors" :key="color" :value="color">{{ color }}</option>
                </select>
                <select class="rounded-xl border border-slate-300 bg-slate-200 p-2" v-model="store.filters.memory">
                    <option value="null" selected>Память</option>
                    <option v-for="memory in store.filterOptions.memories" :key="memory" :value="memory">{{ memory }}</option>
                </select>
                <select class="rounded-xl border border-slate-300 bg-slate-200 p-2" v-model="store.filters.sim">
                    <option value="null" selected>Тип Sim</option>
                    <option v-for="sim in store.filterOptions.sims" :key="sim" :value="sim">{{ sim }}</option>
                </select>
                <select class="rounded-xl border border-slate-300 bg-slate-200 p-2" v-model="store.filters.brand">
                    <option value="null" selected>Бренд</option>
                    <option v-for="brand in store.filterOptions.brands" :key="brand" :value="brand">{{ brand }}</option>
                </select>
                <button
                    class="text-l rounded-xl bg-[#8295DF] p-2 font-bold text-white transition hover:bg-slate-300 hover:text-black active:bg-[#6878b6] active:text-white"
                    @click="store.resetFilters"
                >
                    Отменить фильтры
                </button>
            </form>
            <div class="flex gap-2">
                <input type="search" v-model="query" class="rounded-xl border border-slate-300 bg-slate-200 p-2 pr-28" placeholder="Поиск..." />
                <img src="/assets/icons/search.svg" alt="search" />
            </div>
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

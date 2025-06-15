<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { useStore } from '../src/stores/store.js';

const route = useRoute();
const store = useStore();

const successToast = () => {
    toast.success('Вы успешно добавили телефон в корзину!', {
        autoClose: 2000,
        position: toast.POSITION.TOP_CENTER,
    });
};

const summproducts = computed(() => {
    return store.products;
});
const product = computed(() => {
    return store.products.find((product) => product.slug === route.params.slug);
});
</script>

<template>
    <div class="px-72" v-if="product">
        <div class="flex w-full justify-around py-32">
            <img :src="product.image_url" alt="phone" class="h-full w-1/5" />
            <div class="flex flex-col gap-4">
                <div class="flex items-center gap-1">
                    <h1 class="font-bold">5.0</h1>
                    <img src="/assets/icons/star.svg" alt="star" />
                    <img src="/assets/icons/star.svg" alt="star" />
                    <img src="/assets/icons/star.svg" alt="star" />
                    <img src="/assets/icons/star.svg" alt="star" />
                    <img src="/assets/icons/star.svg" alt="star" />
                </div>
                <h1 class="pb-6 text-2xl font-bold">{{ product.name }}</h1>
                <div class="flex flex-col gap-6">
                    <div class="flex">
                        <p class="text-xl">Цвет</p>
                        <div class="flex-1"></div>
                        <h1 class="text-xl font-bold">{{ product.color }}</h1>
                    </div>
                    <div class="flex">
                        <p class="text-xl">Память</p>
                        <div class="flex-1"></div>
                        <h1 class="text-xl font-bold">{{ product.memory }}</h1>
                    </div>
                    <div class="flex">
                        <p class="text-xl">Связь</p>
                        <div class="flex-1"></div>
                        <h1 class="text-xl font-bold">{{ product.sim }}</h1>
                    </div>
                </div>
                <div class="h-0.5 w-full bg-slate-200"></div>
                <h1 class="text-3xl font-bold">{{ product.price }}₽</h1>
                <button class="rounded-xl bg-[#8295DF] p-4 px-20 text-xl font-bold text-white" @click="(store.addToCart(product), successToast())">
                    Добавить в корзину
                </button>
            </div>
        </div>
        <div class="flex w-full gap-16 rounded-2xl bg-slate-200 p-6 px-10">
            <h1 class="cursor-pointer text-xl font-bold transition hover:text-[#8295DF] focus:text-[#8295DF]">Описание</h1>
            <h1 class="cursor-pointer text-xl font-bold transition hover:text-[#8295DF] focus:text-[#8295DF]">Отзывы</h1>
        </div>
        <div class="flex flex-col gap-10 pt-10">
            <h1 class="text-4xl font-bold">Описание</h1>
            <p>
                {{ product.description }}
            </p>
        </div>
    </div>
</template>

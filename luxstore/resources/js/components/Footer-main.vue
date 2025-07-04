<script setup lang="ts">
import { useStore } from '../src/stores/store.js';

const store = useStore();
</script>

<template>
    <footer class="mt-52 h-96 w-full bg-black">
        <div class="flex flex-col px-72">
            <div class="mt-16 flex w-full justify-between">
                <div onclick="window.scrollTo(0, 0)" class="flex flex-col gap-3">
                    <router-link to="/about-us" class="text-xl text-slate-200 transition hover:text-[#8295DF]">О компании</router-link>
                    <div class="flex flex-col">
                        <router-link to="/catalog" class="text-gray-500 transition hover:text-slate-200">Акции</router-link>
                        <router-link to="/contacts" class="text-gray-500 transition hover:text-slate-200">Контакты</router-link>
                        <router-link to="/contacts" class="text-gray-500 transition hover:text-slate-200">Обратная связь</router-link>
                    </div>
                </div>
                <div onclick="window.scrollTo(0, 0)" class="flex flex-col gap-3">
                    <router-link to="/catalog" class="text-xl text-slate-200 transition hover:text-[#8295DF]">Каталог</router-link>
                    <div class="flex flex-col">
                        <router-link to="/catalog" class="text-gray-500 transition hover:text-slate-200" @click="store.filters.brand = 'Apple'"
                            >Apple</router-link
                        >
                        <router-link to="/catalog" class="text-gray-500 transition hover:text-slate-200" @click="store.filters.brand = 'Samsung'"
                            >Samsung</router-link
                        >
                        <router-link to="/catalog" class="text-gray-500 transition hover:text-slate-200" @click="store.filters.brand = 'Google'"
                            >Google</router-link
                        >
                    </div>
                </div>
                <div class="flex flex-col gap-2">
                    <h1 class="text-3xl text-slate-200">8 912 056-78-90</h1>
                    <div class="flex flex-col">
                        <p class="text-xl text-gray-500">с 9:00 до 22:00</p>
                        <div class="mt-4 flex gap-8">
                            <a class="flex items-center justify-center transition hover:-translate-y-1" href="https://web.telegram.org/"
                                ><img class="cursor-pointer" src="/assets/icons/telegram.svg" alt="telegram"
                            /></a>
                            <a class="flex items-center justify-center transition hover:-translate-y-1" href="https://vk.com"
                                ><img src="/assets/icons/vk.svg" alt="vk"
                            /></a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="mt-12 h-1 bg-white"></div>
            <div class="mt-6">
                <h1 class="text-slate-200">© Luxtore, 2025</h1>
                <p class="text-gray-500">Популярная сеть магазинов мобильной техники Apple и других мировых брендов.</p>
            </div>
        </div>
    </footer>
</template>

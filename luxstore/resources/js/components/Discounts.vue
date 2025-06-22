<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useStore } from '../src/stores/store.js';

const store = useStore();
const observerTarget = ref<HTMLElement | null>(null);
const isVisible = ref(false);

onMounted(() => {
    if (!observerTarget.value) return;

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    isVisible.value = true;
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.1,
        },
    );

    observer.observe(observerTarget.value);
});
</script>
<template>
    <div ref="observerTarget" class="mt-48 flex flex-col items-center justify-center px-72">
        <TransitionGroup appear>
            <h1 v-if="isVisible" class="mb-16 text-5xl font-bold">Текущие акции на смартфоны.</h1>
            <div v-if="isVisible" class="flex w-full items-center justify-center gap-6">
                <div class="flex flex-col gap-3">
                    <img
                        src="/assets/ads/smallapplead.png"
                        alt="ads"
                        class="cursor-pointer rounded-xl border border-slate-100"
                        @click="($router.push('/catalog'), (store.filters.brand = 'Apple'))"
                    />
                    <p>Хит этого лета: IPhone 16</p>
                </div>
                <div class="flex flex-col gap-3">
                    <img
                        src="/assets/ads/smallpixelad.png"
                        alt="ads"
                        class="cursor-pointer rounded-xl border border-slate-100"
                        @click="($router.push('/catalog'), (store.filters.brand = 'Google'))"
                    />
                    <p>Предзаказ Google Pixel 9</p>
                </div>
                <div class="flex flex-col gap-3">
                    <img
                        src="/assets/ads/smallsamsad.png"
                        alt="ads"
                        class="cursor-pointer rounded-xl border border-slate-100"
                        @click="($router.push('/catalog'), (store.filters.brand = 'Samsung'))"
                    />
                    <p>Старт продаж Galaxy S25 Ultra</p>
                </div>
                <div class="flex flex-col gap-3">
                    <img
                        src="/assets/ads/smallnothad.png"
                        alt="ads"
                        class="cursor-pointer rounded-xl border border-slate-100"
                        @click="$router.push('/catalog')((store.filters.brand = 'Nothing'))"
                    />
                    <p>Новинка: Nothing Phone 2</p>
                </div>
            </div>
        </TransitionGroup>
    </div>
</template>

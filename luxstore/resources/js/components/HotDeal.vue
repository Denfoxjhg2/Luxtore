<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useStore } from '../src/stores/store.js';
import Card from './card.vue';
const observerTarget = ref<HTMLElement | null>(null);
const isVisible = ref(false);

const store = useStore();
const summproducts = computed(() => {
    const shuffled = [...store.products];

    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled.slice(0, 5);
});

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
    <div ref="observerTarget" class="h-98 mt-48 flex flex-col items-center justify-center px-72">
        <TransitionGroup appear>
            <h1 v-if="isVisible" class="mb-32 text-5xl font-bold">Популярное только для вас.</h1>
            <div v-if="isVisible" class="w-full">
                <div class="flex items-center justify-center">
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
        </TransitionGroup>
    </div>
</template>

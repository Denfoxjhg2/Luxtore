<script setup lang="ts">
import Marquee from '../components/Marquee.vue';
</script>
<template>
    <div class="bg-gradient-to-b from-white from-20% via-[#8295DF] via-50% to-white">
        <div class="px-72 pt-40">
            <div class="flex items-end justify-center">
                <img src="/assets/images/iPhone16left.png" alt="iphone" class="relative left-12 h-80 w-auto blur-[2.3px]" />
                <img src="/assets/images/iPhone16left.png" alt="iphone" class="w-1/5 blur-[2px]" />
                <img src="/assets/images/iPhone16.png" alt="iphone" class="w-1/5" />
                <img src="/assets/images/iPhone16right.png" alt="iphone" class="w-1/5 blur-[2px]" />
                <img src="/assets/images/iPhone16right.png" alt="iphone" class="relative right-12 h-80 w-auto blur-[2.3px]" />
            </div>
            <div class="relative -top-96 flex flex-col items-center">
                <h1 class="text-8xl font-bold text-[#3A3ACE]">Luxtore</h1>
                <h1 class="text-center text-7xl font-bold text-[#F3B2DD]">
                    Не просто магазин <br />
                    мобильной техники.
                </h1>
            </div>
        </div>
        <div class="px-72 pt-40">
            <h1 class="mb-16 text-center text-6xl font-bold text-white">Наши преимущества:</h1>
            <div class="flex w-full flex-col items-start justify-center rounded-3xl bg-[url('/assets/images/about1.jpg')] p-36">
                <div>
                    <h1 class="pb-2 text-center text-3xl font-bold text-white">
                        Оригинальная продукция <br />
                        мировых брендов
                    </h1>
                    <p class="text-center text-xl font-thin text-white">
                        Только оригинальные устройства. <br />
                        Гарант качества каждого товара.
                    </p>
                </div>
            </div>
        </div>
        <Marquee class="mt-40" />
        <div class="px-72 pt-40">
            <div class="mb-60 flex w-full flex-col items-end justify-center rounded-3xl bg-[url('/assets/images/about2.jpg')] p-36">
                <div>
                    <h1 class="pb-2 text-center text-3xl font-bold">Гарантия на товары</h1>
                    <p class="text-center text-xl font-thin">
                        2 года гарантии на устройства <br />
                        Apple от нашего магазина, 1 год на <br />
                        остальную продукцию
                    </p>
                </div>
            </div>
            <div class="flex w-full flex-col items-center justify-center rounded-3xl bg-[url('/assets/images/about3.jpg')] p-36">
                <div>
                    <h1 class="pb-8 text-center text-6xl font-bold text-white">Мы всегда на связи</h1>
                    <p class="text-center text-3xl font-thin text-white">
                        После покупки мы <br />
                        поддерживаем связь со своими <br />
                        клиентами для улучшения <br />
                        качества работы
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts"></script>
<template>
    <div class="h-[3000px] bg-gradient-to-b from-white from-20% via-[#8295DF] via-50% to-white">
        <Transition appear mode="out-in">
            <div class="px-72 pt-40">
                <div class="flex items-end justify-center">
                    <img src="/assets/images/iPhone16left.png" alt="iphone" class="relative left-12 h-80 w-auto blur-[2.3px]" />
                    <img src="/assets/images/iPhone16left.png" alt="iphone" class="w-1/5 blur-[2px]" />
                    <img src="/assets/images/iPhone16.png" alt="iphone" class="w-1/5" />
                    <img src="/assets/images/iPhone16right.png" alt="iphone" class="w-1/5 blur-[2px]" />
                    <img src="/assets/images/iPhone16right.png" alt="iphone" class="relative right-12 h-80 w-auto blur-[2.3px]" />
                </div>
                <div class="relative -top-80 flex flex-col items-center">
                    <h1 class="text-7xl font-bold text-[#3A3ACE]">Luxtore</h1>
                    <h1 class="text-center text-7xl font-bold text-[#F3B2DD]">
                        Не просто магазин <br />
                        мобильной техники.
                    </h1>
                </div>
            </div>
        </Transition>
    </div>
</template>

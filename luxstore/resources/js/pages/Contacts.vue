<script setup lang="ts">
import { Vue3Marquee } from 'vue3-marquee';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
const teltoast = () => {
    toast.info('Наш номер телефона службы поддержки пользователей: 8-912-055-16-91', {
        position: toast.POSITION.TOP_CENTER,
    });
};

const mailtoast = () => {
    toast.info('Наша электронная почта для связи: komyshev.d@mail.ru', {
        position: toast.POSITION.TOP_CENTER,
    });
};
</script>
<template>
    <div>
        <div class="m-auto flex flex-col items-center px-72">
            <h1 class="pb-16 pt-80 text-5xl font-bold">Контакты</h1>
            <div
                class="flex h-64 w-full cursor-pointer items-center justify-center rounded-[320px] border border-slate-300 bg-[#F8F8F8] transition hover:-translate-y-2 hover:shadow-xl"
                @click="teltoast()"
            >
                <Vue3Marquee :clone="true">
                    <div class="flex items-center justify-center gap-16 overflow-hidden">
                        <h1 class="text-7xl">Позвонить нам</h1>
                        <div class="h-16 w-16 rounded-full bg-[#8295DF]"></div>
                        <h1 class="text-7xl">Позвонить нам</h1>
                        <div class="h-16 w-16 rounded-full bg-[#8295DF]"></div>
                        <h1 class="text-7xl">Позвонить нам</h1>
                        <div class="mr-16 h-16 w-16 rounded-full bg-[#8295DF]"></div>
                    </div>
                </Vue3Marquee>
            </div>
            <div class="flex cursor-pointer items-center gap-6 pt-16 transition hover:-translate-y-1" @click="mailtoast()">
                <img src="/assets/icons/mail.svg" alt="mail" />
                <h1 class="text-2xl font-bold">Написать на почту</h1>
                <img src="/assets/icons/mail.svg" alt="mail" />
            </div>
            <h1 class="pt-96 text-5xl font-bold">Наши соцсети</h1>
        </div>
        <div class="flex w-full justify-between pt-40">
            <div class="flex items-center justify-center">
                <img src="/assets/images/iPhone16ProBL.png" alt="iphone" class="h-3/5 blur-[3px]" />
                <img src="/assets/images/iPhone16ProWH.png" alt="iphone" class="" />
            </div>
            <div class="flex gap-20">
                <a class="flex items-center justify-center transition hover:-translate-y-1" href="https://t.me/bruhmomento77"
                    ><img class="cursor-pointer" src="/assets/icons/tgblack.svg" alt="telegram"
                /></a>
                <a class="flex items-center justify-center transition hover:-translate-y-1" href="https://vk.com/bruhmoment44"
                    ><img src="/assets/icons/vkblack.svg" alt="vk"
                /></a>
            </div>
            <div class="flex items-center justify-center">
                <img src="/assets/images/iPhone16ProWH.png" alt="iphone" />
                <img src="/assets/images/iPhone16ProBL.png" alt="iphone" class="h-3/5 blur-[3px]" />
            </div>
        </div>
    </div>
</template>

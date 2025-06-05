<script setup lang="ts">
import CartItemList from '@/components/CartItemList.vue';
</script>
<template>
    <div>
        <div class="fixed left-0 top-0 z-10 h-full w-full bg-black opacity-60"></div>
        <div class="fixed right-0 top-0 z-20 h-full w-96 bg-white p-8">
            <div class="flex h-full flex-col">
                <div class="mb-8 flex flex-none items-center justify-between gap-5">
                    <h2 class="text-3xl font-bold">Корзина</h2>
                    <img
                        src="/assets/icons/arrow_back.svg"
                        alt="back"
                        @click="$router.back()"
                        class="cursor-pointer opacity-30 transition hover:opacity-100"
                    />
                </div>
                <div class="flex-grow">
                    <CartItemList />
                </div>
                <div class="my-6 flex flex-none flex-col gap-4">
                    <div class="flex gap-2">
                        <span>Итого:</span>
                        <div class="flex-1 border-b border-dashed"></div>
                        <b>80000 руб</b>
                    </div>
                    <div class="flex gap-2">
                        <span>Доставка:</span>
                        <div class="flex-1 border-b border-dashed"></div>
                        <b>1000 руб</b>
                    </div>
                </div>

                <button
                    disabled=""
                    class="mx-auto mb-4 w-full flex-none rounded-xl bg-[#0000000d] p-3 text-xl font-medium transition duration-200 ease-in-out hover:bg-[#8295DF] hover:text-white active:bg-[#6878b6] active:text-white disabled:bg-slate-400 disabled:text-black"
                >
                    Оформить заказ
                </button>
            </div>
        </div>
    </div>
</template>

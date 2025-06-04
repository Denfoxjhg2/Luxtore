<script setup lang="ts">
    import CartItemList from '@/components/CartItemList.vue';
</script>
<template>
    <div class="fixed top-0 left-0 h-full w-full bg-black z-10 opacity-60"></div>
    <div class="bg-white w-96 h-full fixed right-0 top-0 z-20 p-8">
        <div class="flex h-full flex-col">
            <div class="flex flex-none justify-between items-center gap-5 mb-8">
                <h2 class="text-3xl font-bold">Корзина</h2>
                <img src="/assets/icons/arrow_back.svg" alt="back" class="opacity-30 cursor-pointer transition hover:opacity-100">
            </div>
            <div class="flex-grow">
                <CartItemList/>
            </div>
            <div class="flex flex-none flex-col gap-4 my-6">
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

            <button disabled="" class="bg-[#0000000d] flex-none mb-4 p-3 disabled:bg-slate-400 disabled:text-black rounded-xl w-full mx-auto text-xl font-medium transition duration-200 ease-in-out hover:bg-[#8295DF] hover:text-white active:bg-[#6878b6] active:text-white">Оформить заказ</button>
        </div>
    </div>
</template>
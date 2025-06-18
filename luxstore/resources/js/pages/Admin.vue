<script setup lang="ts">
import { ref } from 'vue';
const page = ref(1);
</script>
<template>
    <div class="px-72">
        <div class="m-auto flex w-full flex-col items-center">
            <h1 class="mt-16 text-4xl font-bold">Админ-панель</h1>
            <div class="mt-16 flex items-center gap-40 text-xl font-bold">
                <button class="rounded-xl bg-slate-200 p-2 px-10" @click="page = 1">Добавить товар</button>
                <button class="rounded-xl bg-slate-200 p-2 px-10" @click="page = 2">Показать список заказов</button>
                <button class="rounded-xl bg-slate-200 p-2 px-10" @click="page = 3">Добавить бренд</button>
            </div>
        </div>
        <div v-show="page == 1">
            <h1 class="my-16 text-4xl font-bold">Добавить товар</h1>
            <form>
                <div class="flex flex-col">
                    <input type="text" name="name" placeholder="Название смартфона" />
                    <input type="text" name="description" placeholder="Описание смартфона" />
                    <input type="text" name="color" placeholder="Цвет" />
                    <input type="text" name="memory" placeholder="Память" />
                    <input type="text" name="sim" placeholder="Тип Sim-карты" />
                    <input type="number" name="price" placeholder="Цена" />
                    <input type="file" name="" id="" />
                    <select name="" id="">
                        <option value="">Бренд1</option>
                        <option value="">Бренд2</option>
                    </select>
                    <button>Добавить</button>
                </div>
            </form>
        </div>
        <div v-show="page == 2">bruh2</div>
        <div v-show="page == 3">bruh3</div>
    </div>
</template>

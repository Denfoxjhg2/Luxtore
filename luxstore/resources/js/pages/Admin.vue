<script setup lang="ts">
import axiosInstance from '@/src/axios/axios';
import { computed, onMounted, ref } from 'vue';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { useStore } from '../src/stores/store.js';

const page = ref(1);

const category = ref({
    nameCat: '',
    descriptionCat: '',
});

const product = ref({
    name: '',
    description: '',
    categoryId: '',
    color: '',
    memory: '',
    sim: '',
    price: '',
});
const store = useStore();
const categories = computed(() => {
    return store.categories;
});

const successToast = () => {
    toast.success('Категория успешно добавлена!', {
        autoClose: 2000,
        position: toast.POSITION.TOP_CENTER,
    });
};

const success2Toast = () => {
    toast.success('Смартфон успешно добавлен!', {
        autoClose: 2000,
        position: toast.POSITION.TOP_CENTER,
    });
};

const addcategory = async () => {
    try {
        const token = localStorage.getItem('token');
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const response = await axiosInstance.post('/addCategory', {
            name: category.value.nameCat,
            description: category.value.descriptionCat,
        });
        successToast();
    } catch (error) {
        console.log(error);
    }
};

const addProduct = async () => {
    try {
        const token = localStorage.getItem('token');
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const formData = new FormData();
        formData.append('name', product.value.name);
        formData.append('description', product.value.description);
        formData.append('category_id', product.value.categoryId);
        formData.append('color', product.value.color);
        formData.append('memory', product.value.memory);
        formData.append('sim', product.value.sim);
        formData.append('price', product.value.price);
        formData.append('image', document.getElementById('image')?.files[0]);

        const response = await axiosInstance.post('/addProduct', formData);
        success2Toast();
    } catch (error) {
        console.log(error);
    }
};

const orders = computed(() => {
    return store.orders;
});

onMounted(async () => {
    store.getAllOrders();
});
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
            <form @submit.prevent="addProduct()" enctype="multipart/form-data">
                <div class="flex w-1/2 flex-col items-center">
                    <input
                        class="rounded-xl border border-slate-300 bg-[#EEEEEE] p-2 pr-28"
                        type="text"
                        name="name"
                        placeholder="Название смартфона"
                        v-model="product.name"
                    />
                    <input
                        class="rounded-xl border border-slate-300 bg-[#EEEEEE] p-2 pr-28"
                        type="text"
                        name="description"
                        placeholder="Описание смартфона"
                        v-model="product.description"
                    />
                    <input
                        class="rounded-xl border border-slate-300 bg-[#EEEEEE] p-2 pr-28"
                        type="text"
                        name="color"
                        placeholder="Цвет"
                        v-model="product.color"
                    />
                    <input
                        class="rounded-xl border border-slate-300 bg-[#EEEEEE] p-2 pr-28"
                        type="text"
                        name="memory"
                        placeholder="Память"
                        v-model="product.memory"
                    />
                    <input
                        class="rounded-xl border border-slate-300 bg-[#EEEEEE] p-2 pr-28"
                        type="text"
                        name="sim"
                        placeholder="Тип Sim-карты"
                        v-model="product.sim"
                    />
                    <input
                        class="rounded-xl border border-slate-300 bg-[#EEEEEE] p-2 pr-28"
                        type="number"
                        name="price"
                        placeholder="Цена"
                        v-model="product.price"
                    />
                    <input type="file" accept="image/*" name="image" id="image" />
                    <select class="rounded-xl border border-slate-300 bg-[#EEEEEE] p-2 pr-28" v-model="product.categoryId">
                        <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
                    </select>
                    <button>Добавить</button>
                </div>
            </form>
        </div>
        <div v-show="page == 2">
            <h2 class="pb-4 text-2xl">Пользовательские заказы</h2>
            <div v-for="order in orders" :key="order.id">
                <div class="mb-8 h-1 w-full bg-slate-200"></div>
                <div class="mb-8 flex gap-8">
                    <h1 class="text-xl font-medium">Имя: {{ order.user.first_name }}</h1>
                    <h1 class="text-xl font-medium">Фамилия: {{ order.user.last_name }}</h1>
                    <h1 class="text-xl font-medium">Почта: {{ order.user.email }}</h1>
                    <h1 class="text-xl font-medium">Телефон: {{ order.user.phone }}</h1>
                </div>
                <div class="mb-8 flex justify-between">
                    <div class="flex flex-col gap-2">
                        <div class="flex gap-2">
                            <h1 class="text-xl font-bold">Заказ №{{ order.id }}</h1>
                            <h2 class="text-l">{{ order.created_at }}</h2>
                        </div>
                        <div class="flex flex-col">
                            <h2>{{ order.payment_method }}</h2>
                            <h2>{{ order.shipping_address }}</h2>
                        </div>
                    </div>
                    <div class="flex flex-col gap-2">
                        <h2 class="text-xl font-bold">{{ order.status }}</h2>
                        <h2>{{ order.total_amount }}₽</h2>
                    </div>
                </div>

                <div v-for="item in order.items" :key="item.id" class="mb-8 flex items-center">
                    <img :src="item.product.image_url" alt="phone" class="h-36" />
                    <div class="flex-1"></div>
                    <h1 class="font-bold">{{ item.product.name }}</h1>
                    <div class="flex-1"></div>
                    <h2 class="">{{ item.quantity }} шт.</h2>
                    <div class="flex-1"></div>
                    <h2 class="font-bold">{{ item.quantity * item.product.price }}₽</h2>
                </div>
                <!-- <button
                    @click="cancelOrder(order.id, order.status)"
                    class="text-l mb-8 rounded-xl bg-[#8295DF] p-2 px-10 font-bold text-white"
                    v-show="order.status === 'Обрабатывается'"
                >
                    Отменить заказ
                </button> -->
            </div>
            <div class="h-1 w-full bg-slate-200"></div>
        </div>
        <div v-show="page == 3">
            <h1 class="my-16 text-4xl font-bold">Добавить бренд</h1>
            <form @submit.prevent="addcategory()">
                <div class="flex w-1/2 flex-col items-center">
                    <input
                        class="rounded-xl border border-slate-300 bg-[#EEEEEE] p-2 pr-28"
                        type="text"
                        name="name"
                        placeholder="Название бренда"
                        v-model="category.nameCat"
                    />
                    <input
                        class="rounded-xl border border-slate-300 bg-[#EEEEEE] p-2 pr-28"
                        type="text"
                        name="description"
                        placeholder="Описание бренда"
                        v-model="category.descriptionCat"
                    />
                    <button>Добавить</button>
                </div>
            </form>
        </div>
    </div>
</template>

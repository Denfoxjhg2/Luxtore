<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import axiosInstance from '../src/axios/axios';
import { useStore } from '../src/stores/store.js';

const route = useRoute();
const store = useStore();

const page = ref(1);
const newReview = ref({
    product_id: '',
    rating: '',
    comment: '',
});

const successToast = () => {
    toast.success('Вы успешно добавили телефон в корзину!', {
        autoClose: 2000,
        position: toast.POSITION.TOP_CENTER,
    });
};
const errorToast = () => {
    toast.error('Необходимо сначала зарегистрироваться в личном кабинете!', {
        autoClose: 2000,
        position: toast.POSITION.TOP_CENTER,
    });
};

const summproducts = computed(() => {
    return store.products;
});
const product = computed(() => {
    return store.products.find((product) => product.slug === route.params.slug);
});

const product_id = product.value?.id;

const userCheck = (product: any) => {
    if (localStorage.getItem('token') === null) {
        return errorToast();
    } else {
        store.addToCart(product);
        successToast();
    }
};

const avrRating = computed(() => {
    if (!product.value || !product.value.reviews || product.value.reviews.length === 0) {
        return 0;
    }
    return product.value.reviews.reduce((acc, review) => acc + review.rating, 0) / product.value.reviews.length;
});

const createReview = async () => {
    try {
        if (localStorage.getItem('token') === null) {
            return errorToast();
        }
        const token = localStorage.getItem('token');
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        await axiosInstance.post('/addReview', {
            product_id: product_id,
            rating: newReview.value.rating,
            comment: newReview.value.comment,
        });
        toast.success('Вы успешно добавили отзыв!', {
            autoClose: 2000,
            position: toast.POSITION.TOP_CENTER,
        });
    } catch (error) {
        if (error.response.status === 400) {
            return toast.error('Произошла ошибка, возможно не заполнены все поля', {
                autoClose: 2000,
                position: toast.POSITION.TOP_CENTER,
            });
        } else {
        }
        return toast.error('Нельзя написать отзыв два раза', {
            autoClose: 2000,
            position: toast.POSITION.TOP_CENTER,
        });
    }
};
</script>

<template>
    <div class="px-72" v-if="product">
        <div class="flex w-full justify-around py-32">
            <img :src="product.image_url" alt="phone" class="h-full w-1/5" />
            <div class="flex flex-col gap-4">
                <div class="flex items-center gap-1">
                    <h1 class="font-bold">{{ avrRating }}</h1>
                    <img src="/assets/icons/star.svg" alt="star" v-for="i in Math.round(avrRating)" :key="i" />
                    <div v-if="avrRating === 0" class="ml-2 flex gap-1">
                        <img src="/assets/icons/emptystar.svg" alt="emptystar" />
                        <p>Нет отзывов</p>
                    </div>
                </div>
                <h1 class="pb-6 text-2xl font-bold">{{ product.name }}</h1>
                <div class="flex flex-col gap-6">
                    <div class="flex">
                        <p class="text-xl">Цвет</p>
                        <div class="flex-1"></div>
                        <h1 class="text-xl font-bold">{{ product.color }}</h1>
                    </div>
                    <div class="flex">
                        <p class="text-xl">Память</p>
                        <div class="flex-1"></div>
                        <h1 class="text-xl font-bold">{{ product.memory }}</h1>
                    </div>
                    <div class="flex">
                        <p class="text-xl">Связь</p>
                        <div class="flex-1"></div>
                        <h1 class="text-xl font-bold">{{ product.sim }}</h1>
                    </div>
                </div>
                <div class="h-0.5 w-full bg-slate-200"></div>
                <h1 class="text-3xl font-bold">{{ product.price }}₽</h1>
                <button class="rounded-xl bg-[#8295DF] p-4 px-20 text-xl font-bold text-white" @click="userCheck(product)">Добавить в корзину</button>
            </div>
        </div>
        <div class="flex w-full gap-16 rounded-2xl bg-slate-200 p-6 px-10">
            <button class="cursor-pointer text-xl font-bold transition hover:text-[#8295DF] focus:text-[#8295DF]" @click="page = 1">Описание</button>
            <h1 class="cursor-pointer text-xl font-bold transition hover:text-[#8295DF] focus:text-[#8295DF]" @click="page = 2">Отзывы</h1>
        </div>
        <div v-show="page == 1" class="flex flex-col gap-10 pt-10">
            <h1 class="text-4xl font-bold">Описание</h1>
            <p>
                {{ product.description }}
            </p>
        </div>
        <div v-show="page == 2" class="flex flex-col gap-10 pt-10">
            <h1 class="text-4xl font-bold">Отзывы</h1>
            <form @submit.prevent="createReview" class="flex w-1/2 flex-col gap-2">
                <textarea
                    type="text"
                    class="w-full rounded-xl border-2 border-black p-4 font-bold"
                    placeholder="Отзыв"
                    v-model="newReview.comment"
                ></textarea>
                <select v-model="newReview.rating" class="w-1/3 rounded-xl border border-slate-300 bg-slate-200 p-2">
                    <option disabled selected value="">Рейтинг</option>
                    <option v-for="i in 5" :key="i" :value="i">{{ i }}★</option>
                </select>
                <button
                    class="text-l w-1/3 rounded-xl bg-[#8295DF] p-2 font-bold text-white transition hover:bg-slate-300 hover:text-black active:bg-[#6878b6] active:text-white"
                >
                    Добавить отзыв
                </button>
            </form>
            <div></div>
            <div v-for="review in product.reviews" :key="review.id">
                <div class="mb-8 h-0.5 w-full bg-slate-200"></div>
                <div class="flex gap-4">
                    <div class="flex gap-2">
                        <h1 class="text-xl font-bold">{{ review.user.first_name }}</h1>
                        <h1 class="text-xl font-bold">{{ review.user.last_name }}</h1>
                    </div>
                    <div class="flex items-center gap-1">
                        <h1 class="text-2xl font-bold">{{ review.rating }}</h1>
                        <div class="flex gap-1">
                            <img src="/assets/icons/star.svg" v-for="i in review.rating" :key="i" class="w-5" />
                        </div>
                    </div>
                </div>
                <p class="text-xl">{{ review.comment }}</p>
            </div>
            <div class="mb-8 h-0.5 w-full bg-slate-200"></div>
        </div>
    </div>
</template>

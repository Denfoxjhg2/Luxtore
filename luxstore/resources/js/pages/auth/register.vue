<script setup lang="ts">
import axiosInstance from '@/src/axios/axios';
import axios, { AxiosError } from 'axios';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const errorToast = () => {
    toast.error('Ошибка регистрации!', {
        autoClose: 2000,
        position: toast.POSITION.BOTTOM_CENTER,
    });
};
const successToast = () => {
    toast.success('Вы успешно зарегистрировались', {
        autoClose: 2000,
        position: toast.POSITION.BOTTOM_CENTER,
    });
};
interface RegisterForm {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
}
const form = reactive<RegisterForm>({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
});
const errorMsg = reactive({
    name: [],
    email: [],
    password: [],
});

const router = useRouter();

const register = async (payload: RegisterForm) => {
    await axiosInstance.get('/sanctum/csrf-cookie', {
        baseURL: axios.defaults.baseURL,
    });
    try {
        await axiosInstance.post('/register', payload);
        successToast();
        setTimeout(() => {
            router.push('/login');
        }, 2000);
    } catch (e) {
        if (e instanceof AxiosError && e.response?.status === 422) {
            errorToast();
            errorMsg.email = e.response.data.errors.email;
            errorMsg.name = e.response.data.errors.name;
            errorMsg.password = e.response.data.errors.password;
        }
    }
};
</script>

<template>
    <div class="fixed inset-0 flex items-center justify-center bg-[#0000004d]">
        <div class="flex h-auto w-1/5 flex-col overflow-x-auto bg-white p-8 shadow-2xl">
            <button class="flex w-8 self-end" @click="$router.back()"><img src="/assets/icons/cancel.svg" alt="cancel" /></button>
            <img src="/assets/icons/Luxtore.svg" alt="luxtore" class="mx-auto my-8 w-1/2" />
            <h1 class="mx-auto mb-12 text-3xl font-medium">Регистрация</h1>

            <form @submit.prevent="register(form)">
                <div class="flex flex-col">
                    <input
                        v-model="form.email"
                        type="email"
                        class="mb-4 rounded-xl bg-[#0000000d] p-4 text-xl outline-none"
                        placeholder="E-mail"
                        required
                    />
                    <template v-if="errorMsg.email?.length">
                        <span v-for="(error, index) in errorMsg.email" :key="index" class="mb-2 text-sm text-red-500">{{ error }}</span>
                    </template>
                    <input
                        v-model="form.name"
                        type="text"
                        class="mb-4 rounded-xl bg-[#0000000d] p-4 text-xl outline-none"
                        placeholder="Логин"
                        required
                    />
                    <template v-if="errorMsg.name?.length">
                        <span v-for="(error, index) in errorMsg.name" :key="index" class="mb-2 text-sm text-red-500">{{ error }}</span>
                    </template>
                    <input
                        v-model="form.password"
                        type="password"
                        class="mb-4 rounded-xl bg-[#0000000d] p-4 text-xl outline-none"
                        placeholder="Пароль"
                        required
                    />
                    <template v-if="errorMsg.password?.length">
                        <span v-for="(error, index) in errorMsg.password" :key="index" class="mb-2 text-sm text-red-500">{{ error }}</span>
                    </template>
                    <input
                        v-model="form.password_confirmation"
                        type="password"
                        class="mb-4 rounded-xl bg-[#0000000d] p-4 text-xl outline-none"
                        placeholder="Повторите пароль"
                        required
                    />
                    <button
                        class="mx-auto mb-4 w-1/2 rounded-xl bg-[#0000000d] p-2 text-xl font-medium transition delay-150 duration-300 ease-in-out hover:bg-[#8295DF]"
                    >
                        Регистрация
                    </button>
                    <router-link
                        to="/login"
                        class="mx-auto mb-6 text-xl text-[#8295DF] transition delay-150 duration-300 ease-in-out hover:text-[#000080]"
                        >Вход</router-link
                    >
                </div>
            </form>
            <div class="mx-auto -mb-8 flex items-end justify-center gap-2">
                <img src="/assets/images/iphone-single.png" alt="iphone" class="inline-block h-32 w-24 blur-[2px]" />
                <img src="/assets/images/iphone-single.png" alt="iphone" class="inline-block w-32" />
                <img src="/assets/images/iphone-single.png" alt="iphone" class="inline-block h-32 w-24 blur-[2px]" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import axiosInstance from '@/src/axios/axios';
import { reactive } from 'vue';
import { AxiosError } from 'axios';
import {toast} from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const errorToast = () => {
    toast.error('Ошибка регистрации!', {
        autoClose: 2000,
        position: toast.POSITION.BOTTOM_CENTER,
    })
}
const successToast = () => {
    toast.success('Вы успешно зарегистрировались', {
        autoClose: 2000,
        position: toast.POSITION.BOTTOM_CENTER,
    })
}
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
})

const router = useRouter();

const register = async (payload: RegisterForm) => {
  await axiosInstance.get('/sanctum/csrf-cookie', {
    baseURL: 'http://127.0.0.1:8000',
  });
  try {
    await axiosInstance.post('/register', payload);
    successToast();
    setTimeout(() => {router.push('/login')}, 2000);
  } catch (e) {
    if (e instanceof AxiosError && e.response?.status === 422) {
      errorToast();
      errorMsg.email = e.response.data.errors.email;
      errorMsg.name = e.response.data.errors.name;
      errorMsg.password = e.response.data.errors.password;
    }
  }
}

</script>

<template>
  <div class="fixed inset-0 bg-[#0000004d] flex justify-center items-center">
    <div class="bg-white shadow-2xl overflow-x-auto flex flex-col w-1/5 h-auto p-8">
      <button class="w-8 flex self-end" @click="$router.back()"><img src="../../assets/icons/cancel.svg" alt="cancel"></button>
      <img src="../../assets/icons/Luxtore.svg" alt="luxtore" class="w-1/2 mx-auto my-8">
      <h1 class="mx-auto font-medium text-3xl mb-12">Регистрация</h1>

      <form @submit.prevent="register(form)">
        <div class="flex flex-col">
            <input v-model="form.email" type="email" class="bg-[#0000000d] p-4 text-xl rounded-xl mb-4 outline-none" placeholder="E-mail" required>
            <template v-if="errorMsg.email?.length">
              <span v-for="(error, index) in errorMsg.email" :key="index" class="text-red-500 text-sm mb-2">{{ error }}</span>
            </template>
            <input v-model="form.name" type="text" class="bg-[#0000000d] text-xl p-4 rounded-xl mb-4 outline-none" placeholder="Логин" required>
            <template v-if="errorMsg.name?.length">
              <span v-for="(error, index) in errorMsg.name" :key="index" class="text-red-500 text-sm mb-2">{{ error }}</span>
            </template>
            <input v-model="form.password" type="password" class="bg-[#0000000d] text-xl p-4 rounded-xl mb-4 outline-none" placeholder="Пароль" required>
            <template v-if="errorMsg.password?.length">
              <span v-for="(error, index) in errorMsg.password" :key="index" class="text-red-500 text-sm mb-2">{{ error }}</span>
            </template>
            <input v-model="form.password_confirmation" type="password" class="bg-[#0000000d] text-xl p-4 rounded-xl mb-4 outline-none" placeholder="Повторите пароль" required>
            <button class="bg-[#0000000d] mb-4 p-2 rounded-xl w-1/2 mx-auto text-xl font-medium transition delay-150 duration-300 ease-in-out hover:bg-[#8295DF]">Регистрация</button>
            <router-link to="/login" class="mx-auto mb-6 text-xl text-[#8295DF] transition delay-150 duration-300 ease-in-out hover:text-[#000080]">Вход</router-link>
        </div>
      </form>
      <div class="flex mx-auto items-end justify-around -mb-8">
        <img src="../../assets/pics/iphone-single.png" alt="iphone" class="inline-block w-24 h-32 blur-[2px]">
        <img src="../../assets/pics/iphone-single.png" alt="iphone" class="inline-block w-32">
        <img src="../../assets/pics/iphone-single.png" alt="iphone" class="inline-block w-24 h-32 blur-[2px]">
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import axiosInstance from '@/src/axios/axios';
import {ref, onMounted} from 'vue';


const AuthService = ref({
    name: '',
    email: '',
});


const getUser = async () => {
    try{
        await axiosInstance.get('/sanctum/csrf-cookie',{
            baseURL: 'http://127.0.0.1:8000',
        });
        const responce = await axiosInstance.get('/user');
        AuthService.value = responce.data;
        console.log(responce.data);
    }catch(error){
        console.log(error)
    }
}
const logout = async () => {
    try{
        const responce = await axiosInstance.get('/logout');
        console.log(responce.data)
    }catch(error){
        console.log(error)
    }
}
onMounted(() => {getUser()});
</script>
<template>
    <div class="px-72">
        <h1 class="mt-28 text-4xl font-bold">Личный кабинет</h1>
        <div class="flex w-1/3 justify-between"> 
            <div class="flex flex-col mt-16">
                <button>Профиль</button>
                <button>Мои заказы</button>
            </div>
            <div class="mt-16">
                <h2>Профиль</h2>
                <div>
                    <label for="name">Имя: {{ AuthService.name }}</label>
                    <input type="text" id="name">
                </div>
                <div>
                    <label for="surname">Фамилия:</label>
                    <input type="text" id="surname">
                </div>
                <div>
                    <label for="tel">Мобильный Телефон:</label>
                    <input type="text" id="tel">
                </div>
                <div>
                    <label for="email">E-mail: {{ AuthService.email }}</label>
                    <input type="text" id="email">
                </div>
                <div>
                    <button @click="logout">Выход</button>
                    <button>Сохранить изменения</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { uesAccountStore } from '@/stores/account';
import { useEvantStore } from '@/stores/event';

const evantStore = useEvantStore()
const accountStore = uesAccountStore()
const router = useRouter()

const email = ref('')
const password = ref('')

const login =async()=>{
    try{
        await accountStore.signInAdmin(email.value,password.value)
        router.push({name:'admin-dashboard'})
    }catch(error){
        console.log('error logpage',error.message)
        evantStore.popupMessage('error',error.message)
    }
}
</script>
<template>
    <div class="flex items-center h-screen ">
        <div class="flex-1 max-w-2xl shadow-xl mx-auto p-8">
            <div class="flex flex-col items-center">
                <h1 class="text text-3xl">login</h1>
                <div class="form-control w-full">
                    <label class="label">
                        <span class="label-text">Email</span>
                    </label>
                    <input v-model="email" type="text" placeholder="Your email" class="input input-bordered w-full" />
                </div>
                <div class="form-control w-full">
                    <label class="label">
                        <span class="label-text">Password</span>
                    </label>
                    <input v-model="password" type="password" placeholder="Your email" class="input input-bordered w-full" />
                </div>
                <button @click="login" class="btn btn-neutral w-full mt-5">login</button>
            </div>
        </div>
    </div>
    
</template>
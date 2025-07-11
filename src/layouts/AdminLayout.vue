<script setup>
import { onMounted , ref } from 'vue';
import { RouterLink , useRoute ,useRouter} from 'vue-router';

import { uesAccountStore } from '@/stores/account';

const menus = [
    {
        name:'Dashboard',
        routeName:'admin-dashboard'
    },
    {
        name:'User',
        routeName:'admin-users-list'
    },
    {
        name:'Product',
        routeName:'admin-products-list'
    },
    {
        name:'Order',
        routeName:'admin-orders-list'
    },
]
const route = useRoute()
const router = useRouter()
const activeMenu = ref('')

const accountStore = uesAccountStore()

onMounted (()=>{
    activeMenu.value = route.name
})

const logout = async()=>{
    try{
        await accountStore.logout()
        router.push({name:'login'})
    }catch(error){
        console.log('error',error)
    }
}
</script>
<template>
    <div class="drawer drawer-open ">
        <input id="my-drawer-2" type="checkbox" class="drawer-toggle"/>
        <div class="drawer-content mx-4">
            <slot></slot>
        </div>
        <div class="drawer-side">
            <label for="my-drawer-2" aria-label="close sidebar" class="drawer-overlay"></label> 
            <ul class="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                <li><a class="text-2xl font-bold">Admin cafe coffee</a></li>
                <li v-for="menu in menus" class="my-1">
                    <router-link :to="{name:menu.routeName}" :class="menu.routeName === activeMenu ? 'active':''">{{menu.name}}</router-link>
                </li>
                <li><a @click="logout">Logout</a></li>
            </ul>
        </div>
        </div>
    <div></div>
</template>
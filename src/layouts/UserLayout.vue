<script setup>
import { ref ,onMounted} from 'vue';
import { RouterLink,useRouter } from 'vue-router';
import { useCartStore } from '@/stores/user/cart';

import { uesAccountStore } from '@/stores/account';


const router = useRouter()

const accountStore = uesAccountStore()
const cartStore = useCartStore()

const searchText = ref('')

onMounted (async()=>{
  await accountStore.checkAuth()
})

const login = async () => {
  try{
    await accountStore.signInWithGoodle()
  }catch(error){
    console.log('error',error)
  }
}

const logout = async () => {
  try{
    await accountStore.logout()
    window.location.reload()
  }catch(error){
    console.log('error',error)
  }
  
}

const handleSearch = (event) =>{
  if(event.key === 'Enter'){
  router.push({
    name:'search',
    query:{
      q:searchText.value
    }
  })
  }
}
</script>
<template>
  <div class="container mx-auto">
    <div class="navbar bg-base-100">
      <div class="flex-1">
        <RouterLink to="/" class="btn btn-ghost normal-case text-xl">coffee</RouterLink>
      </div>
      <div class="flex">
        <div class="form-control">
          <input type="text" 
          placeholder="Search" 
          class="input input-bordered w-24 md:w-auto" 
          v-model="searchText"
          @keyup="handleSearch"/>
        </div>
        <div class="dropdown dropdown-end">
          <label tabindex="0" class="btn btn-ghost btn-circle">
            <div class="indicator">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
              <span class="badge badge-sm indicator-item">{{ cartStore.summaryQuantity }}</span>
            </div>
          </label>
          <div tabindex="0" class="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow">
            <div class="card-body">
              <span class="font-bold text-lg">{{cartStore.summaryQuantity}} Items</span>
              <span class="text-info">Subtotal: {{cartStore.summaryPrice}}</span>
              <div class="card-actions">
                <RouterLink to="/cart" class="btn btn-primary btn-block">View cart</RouterLink>
              </div>
            </div>
          </div>
        </div>
        <button @click="login()" v-if="!accountStore.isLoggedIn" class="btn btn-ghost">Login</button>
        <div v-else class="dropdown dropdown-end">
          <label tabindex="0" class="btn btn-ghost btn-circle avatar">
            <div class="w-10 rounded-full">
              <img src="https://www.purina.co.th/sites/default/files/styles/nppe_breed_selector_500/public/2024-02/BREED_Hero_Chinchilla_500%E2%80%8A%C3%97%E2%80%8A473_0.jpg?itok=qQnmy7at" />
            </div>
          </label>
          <ul tabindex="0" class="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
            <li><RouterLink to="/profile">Profile</RouterLink></li>
            <li> <a @click="logout()">Logout</a></li>
          </ul>
        </div>
      </div>
    </div>
    <slot></slot>
    <footer class="footer p-10 bg-neutral text-neutral-content ">
      <nav >
        <header class="footer-title">Services</header> 
        <a class="link link-hover">Branding</a>
        <a class="link link-hover">Design</a>
        <a class="link link-hover">Marketing</a>
        <a class="link link-hover">Advertisement</a>
      </nav> 
      <nav>
        <header class="footer-title">Company</header> 
        <a class="link link-hover">About us</a>
        <a class="link link-hover">Contact</a>
        <a class="link link-hover">Jobs</a>
        <a class="link link-hover">Press kit</a>
      </nav> 
      <nav>
        <header class="footer-title">Legal</header> 
        <a class="link link-hover">Terms of use</a>
        <a class="link link-hover">Privacy policy</a>
        <a class="link link-hover">Cookie policy</a>
      </nav>
    </footer>
  </div>    
</template>
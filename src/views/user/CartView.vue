<script setup>
import UserLayout from '@/layouts/UserLayout.vue';
import { useCartStore } from '@/stores/user/cart';
import iconX from '@/components/icons/iconX.vue';
import { RouterLink } from 'vue-router';


const cartStore = useCartStore()

const changQuantity=(event,index)=>{
  const newQuantity = parseInt(event.target.value)
  cartStore.updateQuantity(index,newQuantity)
}
</script>

<template>
  <UserLayout>
    <h2 class="text-xl font-extrabold ">MY CART</h2>
    <div class="flex">
      <div class="flex-auto w-64 bg-slate-300 p-4">
        <div v-if="cartStore.items.length === 0">
          Cart you Empty
        </div>
        <div v-else v-for="(cart , index) in cartStore.items" class="flex mb-3">
          <div class="flex-1">
            <img class="w-full px-4" :src="cart.imageUrl">
          </div>
          <div class="flex-1">
            <div class="flex flex-col h-full justify-between">
              <div class="relative grid grid-cols-2">
                <div>
                  <div>{{ cart.name }}</div>
                  <div>{{ cart.about }}</div>
                  <div>{{ cart.price }}</div>
                </div>
                <div>
                  <select @change="changQuantity($event,index)" class="select w-20" v-model="cart.quantity">
                    <option v-for="quantity in [1,2,3,4,5]">{{ cart.quantity }}</option>
                  </select>
                </div> 
                <div @click="cartStore.removeItemInCart(index)" class="btn absolute top-0 right-0"><iconX></iconX></div>
              </div>
              <div>in stocke</div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex-auto w-32 bg-slate-400 p-1">
        <div class="text-3xl font-bold ml-2">Order Summary</div>
        <div class="m-3">
        <div v-for="(cart,index) in cartStore.items" class="flex justify-between">
          <div>{{ cart.name }}</div>
          <div>{{ cart.price * cart.quantity }}</div>
        </div>
        <div class="flex justify-between">
          <div>ค่าส่ง</div>
          <div>10</div>
        </div>
        <hr class="border-t-2 border-black my-3"/>
        <div class="flex justify-between">
          <div>ราคารวมทั้งหมด</div>
          <div>{{ cartStore.summaryPrice}}</div>
        </div>
        <RouterLink to="/checkout" class="btn btn-neutral my-3 w-full ">Buy now</RouterLink>
      </div>
      </div>
    </div>
  </UserLayout>
</template>

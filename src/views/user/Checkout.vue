<script setup>
import UserLayout from '@/layouts/UserLayout.vue';

import { reactive } from 'vue';
import { useCartStore } from '@/stores/user/cart';
import { RouterLink ,useRouter } from 'vue-router';

const cartStore = useCartStore()
const router = useRouter()
const FromData = [
  {
    name:'Email addres',
    field:'email',
  },
  {
    name:'Name',
    field:'name'
  },
  {
    name:'Address',
    field:'address',
  },
  {
    name:'Note',
    field:'note',
  },
]

const userFromData = reactive({
  email:'',
  name:'',
  address:'',
  note:''
})

const payment = () =>{
  cartStore.placeorder(userFromData)
  router.push({name:'success'})
}
</script>

<template>
  <UserLayout>
    <h1 class="text-3xl font-bold m4">CheckOut Cart</h1>

    <div class="flex">
      <section class="flex-auto w-64 bg-slate-300 p-8">
        <div v-for="from in FromData" class="form-control w-full">
          <label class="label">
            <span class="label-text">{{ from.name }}</span>
          </label>
          <input v-model="userFromData[from.field]" type="text" placeholder="Type here" :class="from.name === 'Note'?'input input-group min-h-24 h-auto text-clip' : 'input input-bordered' " />
        </div>
        <button @click="payment()" class="btn btn-neutral w-full h-9 mt-5">ยืนยันชำระเงิน</button>
      </section>
      <section class="flex-auto w-32 bg-slate-400">
        <div v-for="item in cartStore.items" class="flex bg-slate-300 w-auto m-2 collapse">
          <div class="flex-1"><img class="p-3 w-full collapse" :src="item.imageUrl"></div>
          <div class="flex-1">
            <div class="flex flex-col justify-between p-3 h-full">
              <div>
                <div class="text-xl font-bold mb-3">{{ item.name }}</div>
                <div>จำนวน: {{ item.quantity }}</div>
                <div>ราคารวม: {{ item.price * item.quantity }}</div>
              </div>
              <RouterLink to="/cart" class="btn btn-primary w-1/2 ">Edit</RouterLink>
            </div>
          </div>
        </div>
        <div><hr class=" border-blue-950"/>
          <div class="py-10 px-7">
            <div><b class="text-lg font-bold">Order Summary</b>
              <div class="flex justify-between w-full mt-2">
                <div>ราคาสินค้าทั้งหมด</div>
                <div>{{ cartStore.summaryPrice }}</div>
              </div>
              <div class="flex justify-between w-full mt-2">
                <div>ค่าส่ง</div>
                <div>0</div>
              </div>
            </div>
          </div><hr class=" border-blue-950">
          <div class="flex justify-between w-full my-10 px-7">
            <div>ราคาทั้งหมด</div>
            <div>{{ cartStore.summaryPrice }}</div>
          </div>
        </div>
      </section>
    </div>
  </UserLayout>
</template>

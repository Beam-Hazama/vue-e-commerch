<script setup>
import UserLayout from '@/layouts/UserLayout.vue';
import { useCartStore } from '@/stores/user/cart';
import { ref, onMounted } from 'vue';

const cartStore = useCartStore()
const orderData = ref({})
onMounted(()=>{
  cartStore.loadCheckout()
  if(cartStore.checkout.orderNumber){
  orderData.value = cartStore.checkout
  }
})
</script>

<template>
  <UserLayout>
    <div class="w-3/4 mx-auto p-5 mb-5 border border-slate-700 bg-slate-300 shadow-xl ">
      <div>
        <div class="text-2xl  font-bold ">You Order is Success</div>
        <div>คุณ {{ orderData.name }} {{ orderData.email }}</div>
        <div>โปรดรอรับสิ้นค้าสักครู่</div>
      </div>
      <div class="divider"></div>
      <div class="px-3 grid grid-cols-2 lg:flex justify-between">
        <div>
          <div class="font-bold ">Order Date</div>
          <div>{{ orderData.createdDate }}</div>
        </div>
        <div>
          <div class="font-bold ">Payment</div>
          <div>{{ orderData.paymentMethod }}</div>
        </div>
        <div>
          <div class="font-bold ">address</div>
          <div>{{ orderData.address }}</div>
        </div>
        <div>
          <div class="font-bold ">Order Number</div>
          <div>{{ orderData.orderNumber }}</div>
        </div>
      </div>
      <div class="divider"></div>
      <div v-for="product in orderData.products" class="px-5 w-auto grid grid-cols-2 items-center lg:grid-cols-4  text-lg">
        <div class="my-3 row-span-3 lg:row-span-1">
          <img class="w-32 lg:w-40 card " :src="product.imageUrl">
        </div>
        <div class="text-center">
          {{ product.name }}
        </div>
        <div class="text-center">
          จำนวน: {{ product.quantity }}
        </div>
        <div class="text-center">
          {{ product.quantity * product.price }} บาท
        </div>
      </div>
      <div class="divider"></div>
      <div class="flex justify-around  ">
        <div>ราคารวมสินค้าทั้งสิ้น</div>
        <div>{{ orderData.totalPrice }}</div>
      </div>
      <div class="divider"></div>
      <div class="text text-center">ขอบคุณที่อุดหนุนสินค้าของเรา</div>
    </div>
  </UserLayout>
</template>

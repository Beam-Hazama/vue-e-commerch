<script setup>
import { ref , onMounted, } from 'vue';
import { useAdminOrderStore } from '@/stores/admin/order.js';
import { useRouter ,useRoute } from 'vue-router';
import AdminLayout from '@/layouts/AdminLayout.vue';

const orderIndex = ref(-1)
const orderData = ref({
    products:[]
})
const route = useRoute()
const adminOrderStore = useAdminOrderStore()

onMounted(()=>{
    if (route.params.id){
        orderIndex.value = parseInt(route.params.id)
        const selectedOrder = adminOrderStore.getOrder(orderIndex.value)
        orderData.value = selectedOrder
    }
})
</script>
<template>
    <AdminLayout>
        <div>
            <div class="shadow-xl p-8">
                <div class="text-2xl font-bold">Order Detail id:  {{ orderIndex }}</div>
                <div class="divider"></div>
                    <div class="grid grid-cols-2 gap-3">
                        <div>
                            <div class="font-bold">Order Date</div>
                            <div>{{ orderData.updatedAt }}</div>
                        </div>
                        <div>
                            <div class="font-bold">Order Number</div>
                            <div>{{ orderData.no }}</div>
                        </div>
                        <div>
                            <div class="font-bold">Patment method</div>
                            <div>{{ orderData.paymentMethod }}</div>
                        </div>
                        <div>
                            <div class="font-bold">Address</div>
                            <div>{{ orderData.address }}</div>
                        </div>
                    </div>
                <div class="divider"></div>
                <div v-for="product in orderData.products" class="grid grid-cols-4 items-center">
                    <div class="mx-auto">
                        <img class="p-3 w-40" :src="product.imageUrl">
                    </div>
                    <div>
                        <div>{{ product.name }}</div>
                        <div>{{ product.description }}</div>
                    </div>
                    <div>
                        <div>จำนวน {{ product.quantity }} ชิ้น</div>
                    </div>
                    <div>
                        <div>{{ product.price }} ฿ </div>
                    </div>
                </div>
                <div class="divider"></div>
                <div class="flex justify-between">
                    <div>ราคาสินค้าทั้งหมด</div>
                    <div>{{ orderData.totalPrice }}</div>
                </div>
                <div class="flex justify-end mt-4">
                    <RouterLink :to="{name:'admin-orders-list'}" class="btn btn-neutral">back</RouterLink>
                </div>
            </div>
        </div>
    </AdminLayout>
</template>
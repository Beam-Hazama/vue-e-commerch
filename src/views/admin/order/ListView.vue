<script setup>
import AdminLayout from "@/layouts/AdminLayout.vue";
import Table from "@/components/Table.vue";

import { RouterLink } from "vue-router";

import { useAdminOrderStore } from "@/stores/admin/order";

const adminOrderStore = useAdminOrderStore()

</script>
<template>
  <AdminLayout>
    <div class="flex justify-between items-center p-5">
      <div class="text-xl font-bold">Product List</div>
    </div>
    <div>
      <Table :headers="['Customer Name', 'Price', 'Status', 'Updated At', '']">
        <tr v-for="(order,index) in adminOrderStore.list">
            <td>{{ order.customerName }}</td>
            <td>{{ order.totalPrice }}</td>
            <td>{{ order.status }}</td>
            <td>{{ order.updatedAt }}</td>
            <td>
                <RouterLink :to="{name:'admin-orders-detail',params:{id:index}}" class="btn">see detail</RouterLink>
            </td>
        </tr>
      </Table>
    </div>
  </AdminLayout>
</template>

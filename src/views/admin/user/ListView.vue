<script setup>
import { useAdminUserStore } from "@/stores/admin/User.js";
import { RouterLink } from "vue-router";

import AdminLayout from "@/layouts/AdminLayout.vue";
import edit from "@/components/icons/edit.vue";
import trach from "@/components/icons/trach.vue";
import Table from "@/components/Table.vue";

const adminUserStore = useAdminUserStore()

const changeStatus = (index)=>{
    let selectedUser = adminUserStore.list[index]
    selectedUser.status = selectedUser.status === 'active' ? 'inactive' : 'active'
    adminUserStore.updateUser(selectedUser)
}
</script>
<template>
  <AdminLayout>
    <div class="flex justify-between items-center p-5">
      <div class="text-xl font-bold">User list</div>
      <div>
        <RouterLink :to="{ name: 'admin-products-create' }" class="btn"
          >Add New Product
        </RouterLink>
      </div>
    </div>
    <Table :headers="['Name', 'Role', 'Status', 'Updated At']"> 
        <tr v-for="(user,index) in adminUserStore.list">
            <td>{{ user.fullname }}</td>
            <td>{{ user.role }}</td>
            <td>{{ user.status }}</td>
            <td>{{ user.updatedAt }}</td>
            <td>
                <div class="flex gap-2">
                <RouterLink :to="{name:'admin-users-update' , params:{id:index}}" class="btn">Edit</RouterLink>
                <button class="btn" @click="changeStatus(index)">
                    {{ user.status === 'active' ? 'Disable' :'Enable' }}
                </button>
                </div>
            </td>
        </tr>
    </Table> 
  </AdminLayout>
</template>

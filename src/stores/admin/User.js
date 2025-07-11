import { defineStore } from 'pinia'

import { collection,doc,getDocs,getDoc,setDoc } from 'firebase/firestore';

import { db } from '@/firebase';


export const useAdminUserStore = defineStore("admin-user", {
  state: () => ({
    list: [],
  }),
  actions: {
    async loadUser (){
      const userCol = collection(db,'users')
      const userSnapshot = await getDocs(userCol)
      console.log(userSnapshot.docs)
    },
    async getUser(index) {
      return this.list[index];
    },
    async updateUser(index, userData) {
      const fields = ["fullname", "role", "status"];
      for (let field of fields) {
        this.list[index][field] = userData[field];
      }
      this.list[index].updatedAt = (new Date).toISOString()
    },
    
  },
});

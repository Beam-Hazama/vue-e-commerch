import { defineStore } from "pinia";

export const useEvantStore = defineStore('event',{
    state:()=>({
        alert:false,
        data:{}
    }),
    actions:{
        popupMessage(status,message){
            this.data={
                status, //status:message
                message
            }
            this.alert=true
            setTimeout(()=>{
                this.clearMessage()
            },3000)
        },
        clearMessage(){
            this.alert=false
            this.data={}
        }
    }
})
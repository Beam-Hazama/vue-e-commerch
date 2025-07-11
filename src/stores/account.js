import { defineStore } from 'pinia';
import { 
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    onAuthStateChanged,
    signInWithEmailAndPassword } from 'firebase/auth';
import { auth,db } from '@/firebase';

import { doc,getDoc,setDoc } from 'firebase/firestore';

const provider = new GoogleAuthProvider()

export const uesAccountStore = defineStore('account',{
    state:()=>({
        isLoggedIn:false,
        isAdmin:false,
        user:{},
        profile:{}
    }),
    actions:{
        async checkAuth () {
            return new Promise((resolve)=>{
                onAuthStateChanged(auth,async(user)=>{
                    if(user){
                        this.user = user
                        const docRef = doc(db,'users',user.uid)
                        const docSnap = await getDoc(docRef)
                        if (docSnap.exists()){
                            this.profile = docSnap.data()
                        }else{
                            const newUser = {
                                name:user.displayName,
                                role:'member',
                                status:'active',
                                updatedAt: new Date()
                            }
                            await setDoc(docRef,newUser)
                            this.profile = newUser
                        }
                        console.log('profile',this.profile)
                        if (this.profile.role === 'admin'){
                            this.isAdmin = true
                        }
                        this.isLoggedIn = true
                        resolve(true)
                    }else{
                        resolve(false)
                    }
                })
            })
            
        },
        async signInWithGoodle(){
            try{
                const result = await signInWithPopup(auth,provider)
                this.isLoggedIn = true
                this.user = result.user
            }catch(error){
                console.log('error',error)
            }
        },
        async signInAdmin(email,password){
            try{
                const result = await signInWithEmailAndPassword(auth,email,password)
                this.user = result.user
                this.isLoggedIn = true
                this.isAdmin = true
            }catch(error){
                console.log('error',error.code)
                switch (error.code){
                    case 'auth/invalid-email':
                        throw new Error('Email ไม่ถูกต้อง')
                    case 'auth/wrong-password':
                        throw new Error ('Password ไม่ถูกต้อง')
                    default:
                        throw new Error('มีปัญหาเกียวกับการ lodin')
                }
            }
        },
        async logout(){
            this.isLoggedIn = false
            this.isAdmin = false
            await signOut(auth)
        }
    }
})
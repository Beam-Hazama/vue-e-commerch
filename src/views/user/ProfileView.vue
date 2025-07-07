<script setup>
import UserLayout from '@/layouts/UserLayout.vue';
import { ref ,onMounted} from 'vue';

const profileImageUrl = ref('https://www.purina.co.th/sites/default/files/styles/nppe_breed_selector_500/public/2024-02/BREED_Hero_Chinchilla_500%E2%80%8A%C3%97%E2%80%8A473_0.jpg?itok=qQnmy7at')
const email = ref('')
const name = ref('')

const handleFileUpload = (event) =>{
  const file = event.target.files[0]

  if (file) {
    const reader = new FileReader()
    reader.onload=(e)=>{
      profileImageUrl.value=e.target.result
    }
    reader.readAsDataURL(file)
  }
}

const updateProfile = () =>{
  const profileData ={
    ImageUrl:profileImageUrl.value,
    name:name.value,
    email:email.value
  }
  localStorage.setItem('profile-Data',JSON.stringify(profileData))
  alert('Success Update Profile')
}

onMounted(()=>{
  let profileData = localStorage.getItem('profile-Data')
  if (profileData){
    profileData = JSON.parse(profileData)
    profileImageUrl.value = profileData.ImageUrl
    name.value = profileData.name
    email.value = profileData.email
  }
})
</script>

<template>
  <UserLayout>
    <div class="max-w-2xl mx-auto border border-base-200  shadow-xl p-8">
      <div class="font-bold text-xl">Your Porfile</div>
      <div class="flex justify-center ">
        <div class="avatar " >
          <div class="w-24 rounded-full">
            <img :src="profileImageUrl">
          </div>
        </div>
      </div>
      <div class="flex justify-center w-full">
        <input type="file" @change="handleFileUpload">
      </div>
      <div class="form-control w-full">
        <label class="label">
          <span class="label-text">Name</span>
        </label>
        <input v-model="name" type="text" placeholder="Type here" class="input input-bordered w-full" />
      </div>
      <div class="form-control w-full">
        <label class="label">
          <span class="label-text">Email</span>
        </label>
        <input v-model="email" type="text" placeholder="Type here" class="input input-bordered w-full " />
      </div>
      <button @click="updateProfile" class="btn btn-neutral w-full mt-5">Update Profile</button>
    </div>
  </UserLayout>
</template>

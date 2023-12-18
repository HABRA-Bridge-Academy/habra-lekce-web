<template>
  <v-app>
    <v-app-bar color="#1A237E" class="header" height="100">
      <v-spacer></v-spacer>
      <h1 class="text-white text-center text-h4 font-weight-bold">
        Havířovská Bridžová Akademie - Přihlášení
      </h1>
      <v-spacer></v-spacer>

    </v-app-bar>
    <v-main>
      <v-container class="fill-height">
        <v-row justify="center" class="fill-height">
          <v-col cols="6">
            <v-card>
              <v-card-title class="headline">Přihlášení</v-card-title>
              <v-form @submit.prevent="login">
              <v-card-text>
                  <v-text-field v-model="state.email" :error-messages="v$.email.$errors.map(e => e.$message)"
                    label="E-mail" required @input="v$.email.$touch" @blur="v$.email.$touch"></v-text-field>

                  <v-text-field type="password" v-model="state.password" label="Heslo"
                    :error-messages="v$.password.$errors.map(e => e.$message)" required></v-text-field>

                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn class="me-4" type="submit" @click="v$.$validate"> submit </v-btn>
                  </v-card-actions>
                </v-form>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
  
<script setup >
// pridej semka lang="ts" (<script setup lang="ts" >) a pak tu budes mit misto javascriptu typescript,
// ktery ti bude kontrolovat chyby, ale zase budes muset psat vsechno presneji a obcas ho obchazet
import { reactive } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { email, required } from '@vuelidate/validators'
import axios from "@/plugins/axios";
import { useRouter } from 'vue-router';
import { computed } from 'vue';


const router = useRouter()

const initialState = {
  email: '',
  password: '',
 
}

const state = reactive({
  ...initialState,
})


const rules = {
  email: [ required, email ],
  password: [required]
}

const v$ = useVuelidate(rules, state)

function clear() {
  v$.value.$reset()

  for (const [key, value] of Object.entries(initialState)) {
    state[key] = value
  }
}

const emailErrors = computed(() => v$.email.$errors.map(e => e.$message))

// Promises

// async await notation

async function login(){
  try {
    const response = await axios.post('auth/login', {
    email: state.email, 
    password: state.password
  })
    console.log(response)
    router.push({name: 'home'})
  } catch (e) 
  {
    
    alert("Nastala chyba:" + e.message)    
  } 
}


</script>
<style>
.side-collums {
  display: flex;
}

.header {
  text-align: center;

  display: flex;
  flex-direction: column;
  justify-content: center;
}

</style>
 
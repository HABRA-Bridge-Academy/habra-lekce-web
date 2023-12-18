<template>
  <v-app>
    <v-app-bar color="#1A237E" class="header" height="100">
      <v-spacer></v-spacer>
      <h1 class="text-white text-center text-h4 font-weight-bold">
        Havířovská Bridžová Akademie - registrace
      </h1>
      <v-spacer></v-spacer>

    </v-app-bar>
    <v-main>
      <v-container class="fill-height">
        <v-row justify="center" class="fill-height">
          <v-col cols="6">
            <v-card>
              <v-card-title class="headline">Registrace</v-card-title>
              <v-form @submit.prevent="register">
              <v-card-text>
                  <v-text-field v-model="state.name" :error-messages="v$.name.$errors.map(e => e.$message)"
                    label="Jméno" required @input="v$.name.$touch" @blur="v$.name.$touch"></v-text-field>

                  <v-text-field v-model="state.surname" :error-messages="v$.name.$errors.map(e => e.$message)"
                    label="Příjmení" required @input="v$.surname.$touch" @blur="v$.surname.$touch"></v-text-field>

                  <v-text-field v-model="state.email" :error-messages="v$.email.$errors.map(e => e.$message)"
                    label="E-mail" required @input="v$.email.$touch" @blur="v$.email.$touch"></v-text-field>

                  <v-select v-model="state.select" :items="items" :error-messages="v$.select.$errors.map(e => e.$message)"
                    label="Účel" required @change="v$.select.$touch" @blur="v$.select.$touch"></v-select>

                  <v-text-field v-model="state.password" type="password" label="Heslo"
                    :error-messages="v$.name.$errors.map(e => e.$message)" required></v-text-field>

                  <v-checkbox v-model="state.checkbox" :error-messages="v$.checkbox.$errors.map(e => e.$message)"
                    label="Do you agree?" required @change="v$.checkbox.$touch" @blur="v$.checkbox.$touch"></v-checkbox>
               
              </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn class="me-4" type="submit" @click="v$.$validate"> submit </v-btn>
                  <v-btn @click="clear"> clear </v-btn>
                </v-card-actions>
              </v-form>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
  
<script setup>
// pridej semka lang="ts" (<script setup lang="ts" >) a pak tu budes mit misto javascriptu typescript,
// ktery ti bude kontrolovat chyby, ale zase budes muset psat vsechno presneji a obcas ho obchazet
import { reactive } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { email, required } from '@vuelidate/validators'
import axios from "@/plugins/axios";
import { useRouter } from 'vue-router';
import { computed } from 'vue';

const initialState = {
  name: '',
  surname:'',
  email: '',
  select: null,
  password: '',
  checkbox: null,
}

const state = reactive({
  ...initialState,
})

const items = ['Trenér', 'Rodič', 'Hráč', 'jiné']

const rules = {
  name: { required },
  surname: {required},
  email: { required, email },
  select: { required },
  items: { required },
  checkbox: { required },
}

const v$ = useVuelidate(rules, state)

function clear() {
  v$.value.$reset()

  for (const [key, value] of Object.entries(initialState)) {
    state[key] = value
  }
}


async function register(){
  try {
    alert('jede to')
    const response = await axios.post('auth/register', {
      "email": state.email, 
      "password": state.password,
      "firstName": state.name,
      "lastName": state.surname


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
 
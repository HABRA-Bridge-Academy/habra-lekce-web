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
              <v-form @submit.prevent="submit">
              <v-card-text>
                  <v-text-field  label="Email" v-model="Email" :rules="emailRules" required density="default"
                    :error-messages="errorMessages.Email" @input="errorMessages.username = ''"></v-text-field>

                  <v-text-field label="Heslo" type="password" v-model="password" :rules="passwordRules" density="default"
                    :error-messages="errorMessages.password" @input="errorMessages.password = ''" required></v-text-field>

                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <div class="flex-gap">
                    Nemáte účet? 
                    <RouterLink :to="{name: 'register'}" >Registrujte se</RouterLink></div>
                    <v-spacer></v-spacer>
                    <v-btn class="me-4" type="submit" :disabled="progress"> Přihlásit </v-btn>
                    <v-spacer></v-spacer>
                  </v-card-actions>
                </v-form>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
  
<script setup lang="ts">
// pridej semka lang="ts" (<script setup lang="ts" >) a pak tu budes mit misto javascriptu typescript,
// ktery ti bude kontrolovat chyby, ale zase budes muset psat vsechno presneji a obcas ho obchazet
import { reactive } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { email, required } from '@vuelidate/validators'
import axios from "@/plugins/axios"
import { useRoute, useRouter } from 'vue-router'
import { computed } from 'vue'
import { useAuthStore } from '@/stores/Auth'
import { Ref, ref } from 'vue'

const form = ref(null as HTMLFormElement | null);
const authStore = useAuthStore()
const router = useRouter()
const route = useRoute()


const Email = ref('');
const password = ref('');
const valid = ref(null);




// Promises

// async await notation

const progress = ref(false)

const emailRules = [
    (v: string) => !!v || 'Vyplňte email',
];

const passwordRules = [
    (v: string) => !!v || 'Vyplňte heslo',
];

const errorMessages = ref({} as any);

const submit = async () => {

  const res = await form.value?.validate()
  try {
    progress.value = true;
    await authStore.login(Email.value, password.value);
    
    if (route.query.redirect)
        router.push(route.query.redirect as string);
    else router.push({ name: 'Home' });
  } catch (error: any) {
  
    
     if (error.response?.status === 401) {
         errorMessages.value = { password: 'Špatné heslo' };
     }
     else if (error.response?.status === 404) {
         errorMessages.value = { Email: 'Uživatel neexistuje' };
     }
     else {
         errorMessages.value = { Email: 'Nastala chyba' };
     }
} finally {
    progress.value = false
}}

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
 
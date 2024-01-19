<template>

    <v-app>
        <v-app-bar color="#1A237E" class="header" height="100">
          <v-spacer></v-spacer>
          <h1 class="text-white text-center text-h4 font-weight-bold">
            Havířovská Bridžová Akademie - Odhlásit se
          </h1>
          <v-spacer></v-spacer>
        </v-app-bar>
        <v-main>
          <v-container class="fill-height">
            <v-row justify="center" class="fill-height">
              <v-col cols="6">
                <v-card>
                  <v-card-title class="headline">Odhlášení</v-card-title>
                  <v-form @submit.prevent="submit">
                  <v-card-text>
                      <v-text-field  label="Zpětná vazba"></v-text-field>                      
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <div class="flex-gap">
                            Jste si jisti, že se chcete odhlásit?
                        <RouterLink :to="{name: 'Home'}" >Zpátky</RouterLink></div>
                        <v-spacer></v-spacer>
                        <v-btn class="me-4" type="submit" :disabled="progress"> Ano </v-btn>
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
    import { Ref, ref } from 'vue'
    import { useAuthStore } from '@/stores/Auth'
import { toast } from '@/plugins/toastify'
    
    const form = ref(null as HTMLFormElement | null);
    const authStore = useAuthStore()
    const router = useRouter()
    const route = useRoute()
    const progress = ref(false)
    
const submit = async () => {
    try {
        progress.value = true;
        await authStore.logout( );
        toast("Odhlášení proběhlo úspěšně.")
        router.push({ name: 'Home' });

    } catch (error: any) {        }
     finally {
        progress.value = false;
    }
}
</script>
<style>

</style>

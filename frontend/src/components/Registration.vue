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
              <v-form @submit.prevent="submit">
              <v-card-text>
                  <v-text-field  label="Jméno" name="name" v-model="name" :rules="nameRules" required density="comfortable"
                    :error-messages="errorMessages.name" @input="errorMessages.name = ''"></v-text-field>

                  <v-text-field  label="Příjmení" name="surname" v-model="surname" :rules="nameRules" required density="comfortable"
                    :error-messages="errorMessages.name" @input="errorMessages.surname = ''"></v-text-field>

                  <v-text-field  label="Email" name='Email' v-model="Email" required
                   density="comfortable" :error-messages="errorMessages.email"
                    @input="errorMessages.email = ''"></v-text-field>

                  <v-text-field label="Heslo" name='password' type="password" v-model="password" :rules="passwordRules"
                    density="comfortable" :error-messages="errorMessages.password" @input="errorMessages.password = ''"
                    required></v-text-field>

                  <v-checkbox v-model="agree" :rules="agreeRules">    <template v-slot:label>
                    <span>
                        Souhlasím s obchodními podmínkami a ochranou osobních údajů</span>
                </template></v-checkbox>
               
              </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                    <div class="flex-gap">
                    Máte účet? 
                    <RouterLink :to="{name: 'login'}" >Přihlaste se</RouterLink></div>
                    <v-spacer></v-spacer>
                  <v-spacer></v-spacer>
                  <v-btn type="submit" > Registrovat </v-btn>
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
import { useAuthStore } from '@/stores/auth';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { toast } from "@/plugins/toastify";



const authStore = useAuthStore();

const Email =  ref('');
const surname = ref('');
const name = ref('');
const password = ref('');
const register = ref(false);
const form = ref(null as HTMLFormElement | null);
const progress = ref(false);

const agree = ref(false);

const agreeRules = [
    (v: boolean) => v || 'Musíte souhlasit s obchodními podmínkami a ochranou osobních údajů',
];

const emailRules = [ 
    (v: string) => /.+@.+\..+/.test(v) || 'Musí být platný email',
];
const nameRules = [
    (v: string) => v.length >= 5 || 'Zadejte celé jméno',
    (v: string) => !/\d/.test(v) || 'Zadejte celé jméno',
];

const passwordRules = [
    (v: string) => !!v || 'Vyplňte heslo',
];
const password2Rules = [
    (v: string) => !!v || 'Vyplňte heslo znovu',
    (v: string) => v === password.value || 'Hesla se neshodují',
];



const errorMessages = ref({} as any);
const router = useRouter();

const submit = async () => {
    const res = await form.value?.validate()
    
    try {
        progress.value = true;
        await authStore.register( Email.value, password.value, name.value, surname.value);
        toast("Registrace proběhla úspěšně. Nyní se můžete přihlásit.")
        router.push({ name: 'login' });

    } catch (error: any) {
        if (error.response?.status === 401) {
            errorMessages.value = { password: 'Špatné heslo' };
        }
        else if (error.response?.status === 409) {
            errorMessages.value = { email: 'Uživatel již existuje' };
        }
        else {
            errorMessages.value = { email: 'Nastala chyba' };
        }
    } finally {
        progress.value = false;
    }
}
</script>
<style>

</style>
 
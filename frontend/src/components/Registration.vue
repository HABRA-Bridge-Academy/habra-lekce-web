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
              <v-card-text>
                <v-form>
                  <v-text-field v-model="state.name" :error-messages="v$.name.$errors.map(e => e.$message)" :counter="10"
                    label="Name" required @input="v$.name.$touch" @blur="v$.name.$touch"></v-text-field>

                  <v-text-field v-model="state.email" :error-messages="v$.email.$errors.map(e => e.$message)"
                    label="E-mail" required @input="v$.email.$touch" @blur="v$.email.$touch"></v-text-field>

                  <v-select v-model="state.select" :items="items" :error-messages="v$.select.$errors.map(e => e.$message)"
                    label="Účel" required @change="v$.select.$touch" @blur="v$.select.$touch"></v-select>

                  <v-text-field v-model="state.password" label="Heslo"
                    :error-messages="v$.name.$errors.map(e => e.$message)" required></v-text-field>

                  <v-checkbox v-model="state.checkbox" :error-messages="v$.checkbox.$errors.map(e => e.$message)"
                    label="Do you agree?" required @change="v$.checkbox.$touch" @blur="v$.checkbox.$touch"></v-checkbox>

                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn class="me-4" @click="v$.$validate"> submit </v-btn>
                <v-btn @click="clear"> clear </v-btn>
              </v-card-actions>
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

const initialState = {
  name: '',
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
 
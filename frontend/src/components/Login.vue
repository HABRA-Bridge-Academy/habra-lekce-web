<template>
  <div class = "nadpis">
     Havířovská Bridžová Akademie - registrace
 </div>
 <form>

  <v-text-field
     v-model="state.email"
     :error-messages="v$.email.$errors.map(e => e.$message)"
     label="E-mail"
     required
     @input="v$.email.$touch"
     @blur="v$.email.$touch"
   ></v-text-field>
 
   <v-text-field
     v-model="pasword"
     label="Heslo"
     :error-messages="v$.name.$errors.map(e => e.$message)"
     required
   ></v-text-field>

 </form>
</template>

<script setup>
 import { reactive } from 'vue'
 import { useVuelidate } from '@vuelidate/core'
 import { email, required } from '@vuelidate/validators'

 const initialState = {
   email: '',
   pasword: ''
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
.nadpis{
 min-height: 100px;
 text-align: center;
 background-color: #1A237E;
}</style>


<script lang="ts" setup>
  import HelloWorld from '@/components/HelloWorld.vue'
</script>

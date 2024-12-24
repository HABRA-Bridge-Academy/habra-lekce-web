<template>
    <router-link :to="{ name: 'home' }" class="logo">
        <v-img  v-if="variant === 'xl'" src="@/assets/logo-xl.png">
        </v-img>
        <v-img v-else-if="variant== 'plain'" src="@/assets/logo-plain.png"></v-img>
    </router-link>
</template>

<script setup lang="ts">
const props = defineProps({
    variant: {
        type: String,
        default: 'xl'
    }
});
</script>

<style scoped>
.logo .v-img {
    width: 100%;
}
</style>
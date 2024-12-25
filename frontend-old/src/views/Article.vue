<template>
    <v-skeleton-loader :loading="loading" type="heading,image,text,paragraph@10">
        <div class="content lekce" v-html="articleContent"></div>
    </v-skeleton-loader>
</template>
<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useArticleStore } from '@/stores/Article';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';

const articleStore = useArticleStore()
const route = useRoute()


const loading = ref(false)
const articleId = computed(() => route.params.id as string | undefined)
watch(articleId, (id) => loadArticle(id))
onMounted(() => loadArticle(articleId.value))

const articleContent = ref(null as string | null)


async function loadArticle(id: string | undefined) {
    if (!id) return;
    try {
        loading.value = true;
        const article = await articleStore.getArticle(id);
        articleContent.value = article.content
    } catch (error: any) {
    } finally {
        loading.value = false
    }
}
</script>
<style lang="scss">
@import "@/styles/web.scss";
</style>
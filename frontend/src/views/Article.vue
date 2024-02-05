<template>
    <article v-html="articleContent"></article>
</template>
<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { articleStoreGet, articleStore } from '@/stores/Article';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';

const progress = ref(false)
const articleContent = ref(null as string | null)
const route = useRoute()
const articleId = computed(() => route.params.id as string | undefined)
watch(articleId, (id) => loadArticle(id))
onMounted(() => loadArticle(articleId.value))

async function loadArticle(id: string | undefined) {
    if (!id) return;
    try {
        progress.value = true;
        const article = await articleStoreGet(id);
        articleContent.value = article.content
    } catch (error: any) {
    } finally {
        progress.value = false
    }
}
</script>
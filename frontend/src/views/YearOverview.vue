<template>
    <h2>{{ year }}. Ročník</h2>
    <v-skeleton-loader :loading="loading" type="list-item-two-line@20">
        <v-list v-if="articles">
            <v-list-item v-for="article in articles" :title="article.meta.number + '. lekce: ' + article.title"
                :to="{ name: 'lesson', params: { id: article.id, year: year } }"></v-list-item>
        </v-list>
    </v-skeleton-loader>
</template>

<script setup lang="ts">
import Article from '@/class/article';
import { useArticleStore } from '@/stores/Article';
import { computed } from 'vue';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()
const loading = ref(false)
const articlesByYear = ref(null as Map<number, Article[]> | null)

const articleStore = useArticleStore();

const year = computed(() => Number.parseInt(route.params.year as string)); // TODO get from route

async function loadArticles() {
    try {
        loading.value = true;
        articlesByYear.value = await articleStore.getArticlesByYear();
    } catch (error: any) {
        console.error
    } finally {
        loading.value = false
    }
}


function getArticlesForYear(year: number) {
    const articles = articlesByYear.value?.get(year)
    if (!articles) return;
    const sorted = articles.toSorted((a, b) => a.meta.number - b.meta.number);

    return sorted;
}

const articles = computed(() => getArticlesForYear(year.value))

onMounted(() => loadArticles())

</script>
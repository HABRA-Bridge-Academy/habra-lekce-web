import { defineStore } from 'pinia'
import Article from '@/class/article';
import axios from '@/plugins/axios'
import { useAuthStore } from './Auth';
import { ref } from 'vue';

const authStore = useAuthStore()
export async function articleStore(){
            try {
                const response = await axios.get('/articles');
                const ArticleList = response.data as Article[];
                console.debug('Articles found:');
                return ArticleList
            } catch (error: any) {
                console.error('Article error:', error.message);
                throw error;
            }
   
    }

 export async function articleStoreGet(id: String): Promise<Article> {
        try {
            const response = await axios.get(`/articles/${id}`);
            const a = response.data as Article;
            console.debug('Articles found:');
            return new Article(a.id, a.title, a.content, a.Public, a.created, a.meta)
        } catch (error: any) {
            console.error('Article error:', error.message);
            throw error;
        }

}

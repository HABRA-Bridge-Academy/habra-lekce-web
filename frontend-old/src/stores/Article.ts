import { defineStore } from "pinia";
import Article from "@/class/article";
import axios from "@/plugins/axios";
import Homepage from "@/class/homepage";

export const useArticleStore = defineStore("article", {
  state: () => {
    return {
      _articles: [] as Article[],
      _articlesByYear: new Map<number, Article[]>(),
    };
  },
  getters: {},
  actions: {
    async fetchArticles() {
      if (this._articles.length > 0) return; // Don't fetch if we already have articles
      try {
        const response = await axios.get("/articles");
        this._articles = response.data.items as Article[];
        this._articlesByYear = this._articles
          .filter((a) => a.meta && a.meta.year) // filter all articles that have meta.year
          .reduce((acc: Map<number, Article[]>, article: Article) => {
            // reduce to an object with the year as key and the articles as value
            const year = article.meta?.year;
            if (!acc.has(year)) acc.set(year, []);
            acc.get(year)?.push(article);
            return acc;
          }, new Map<number, Article[]>());
      } catch (error: any) {
        throw error;
      }
    },
    async getArticle(id: String): Promise<Article> {
      try {
        const response = await axios.get(`/articles/${id}`);
        const a = response.data as Article;
        console.debug("Articles found:");
        return new Article(a.id, a.title, a.content, a.Public, a.created, a.meta);
      } catch (error: any) {
        console.error("Article error:", error.message);
        throw error;
      }},
    async getArticles(): Promise<Article[]> {
      await this.fetchArticles();
      return this._articles;
    },
    async getArticlesByYear(): Promise<Map<number, Article[]>> {
      await this.fetchArticles();
      return this._articlesByYear;
    },
    async getHomepage(): Promise<Homepage> {
      try {
        const response = await axios.get("/globals/homepage");
        return new Homepage(response.data.content);
      } catch (error: any) {
        console.error("Homepage error:", error.message);
        throw error;
      }
    }
  },
});

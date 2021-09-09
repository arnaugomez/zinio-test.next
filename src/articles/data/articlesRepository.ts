import { fetchFromApi } from "../../common/data/apiClient";
import { Article } from "../domain/Article";
import { ArticleWithContext } from "../domain/ArticleWithContext";

export async function getArticles(): Promise<Article[]> {
  return await fetchFromApi<Article[]>("/articles")
}

export async function getArticleById(id: number): Promise<ArticleWithContext> {
  return await fetchFromApi<ArticleWithContext>("/articles/" + id)
}

export async function searchArticles(searchText: string): Promise<Article[]> {
  return await fetchFromApi<Article[]>("/articles?q=" + searchText)
}
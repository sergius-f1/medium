import { get } from "../../../shared/api";
import { ArticlesParams, MultipleArticlesResponse, SingleArticleResponse } from "../model/types";

export const getArticles = (params?: ArticlesParams): Promise<MultipleArticlesResponse> => {
  const query = new URLSearchParams(params as Record<string, string>).toString();
  return get<MultipleArticlesResponse>(`/articles${query ? `?${query}` : ""}`);
};

export const getArticle = (slug: string): Promise<SingleArticleResponse> =>
  get<SingleArticleResponse>(`/articles/${slug}`);

import { post, deleteMethod } from '../../../shared/api';
import { SingleArticleResponse } from '../../../entities/article';

export const favoriteArticle = (slug: string): Promise<SingleArticleResponse> =>
  post<SingleArticleResponse>(`/articles/${slug}/favorite`);

export const unfavoriteArticle = (slug: string): Promise<SingleArticleResponse> =>
  deleteMethod<SingleArticleResponse>(`/articles/${slug}/favorite`);

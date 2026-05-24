import { Article } from "../../../entities/article";
import { ApiError } from "../../../shared/api";
import { favoriteArticle, unfavoriteArticle } from "../api";

export function useFavoriteArticle(refetch: () => void) {
  const handleFavorite = async (article: Article) => {
    try {
      if (article.favorited) {
        await unfavoriteArticle(article.slug);
      } else {
        await favoriteArticle(article.slug);
      }
      refetch();
    } catch (err) {
      if (!(err instanceof ApiError)) throw err;
    }
  };

  return { handleFavorite };
}

import React, { ReactElement } from "react";
import { useHistory } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getArticles, ArticleCard, ArticlesParams } from '../../../entities/article';
import { useFavoriteArticle } from '../../../features/like-article';
import { QueryState } from "../../../shared/ui";

interface ArticleFeedProps {
  params?: ArticlesParams;
  isAuthenticated?: boolean;
}

export function ArticleFeed({ params, isAuthenticated }: ArticleFeedProps): ReactElement {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['articles', params],
    queryFn: () => getArticles(params),
  });

  const history = useHistory();
  const { handleFavorite } = useFavoriteArticle(refetch);
  const onFavorite = isAuthenticated ? handleFavorite : () => history.push('/login');

  return (
    <QueryState
      isLoading={isLoading}
      isEmpty={!data?.articles.length}
      isError={isError}
      errorMessage={'Error loading articles.'}
      emptyDataMessage={'No articles are here... yet.'}
    >
      {data?.articles.map((article) => (
        <ArticleCard
          key={article.slug}
          article={article}
          onFavorite={onFavorite}
        />
      ))}
    </QueryState>
  );
}

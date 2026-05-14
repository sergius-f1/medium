import React from 'react';
import { useHistory } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getArticles, ArticleCard, ArticlesParams } from '../../../entities/article';
import { useFavoriteArticle } from '../../../features/like-article';

interface Props {
  params?: ArticlesParams;
  isAuthenticated?: boolean;
}

export function ArticleFeed({ params, isAuthenticated }: Props) {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['articles', params],
    queryFn: () => getArticles(params),
  });

  const history = useHistory();
  const { handleFavorite } = useFavoriteArticle(refetch);
  const onFavorite = isAuthenticated ? handleFavorite : () => history.push('/login');

  if (isLoading) {
    return <div className="article-preview">Loading articles...</div>;
  }

  if (isError) {
    return <div className="article-preview">Error loading articles.</div>;
  }

  if (!data?.articles.length) {
    return <div className="article-preview">No articles are here... yet.</div>;
  }

  return (
    <>
      {data.articles.map((article) => (
        <ArticleCard
          key={article.slug}
          article={article}
          onFavorite={onFavorite}
        />
      ))}
    </>
  );
}

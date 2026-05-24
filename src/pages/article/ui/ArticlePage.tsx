import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getArticle } from "../../../entities/article";
import { useFollowAuthor } from "../../../features/follow-author";
import { useFavoriteArticle } from "../../../features/like-article";
import { GlobalHeader } from "../../../widgets/global-header";
import { useAuth } from "../../../app/providers/AuthProvider";
import { QueryState } from "../../../shared/ui";
import { ArticleContent } from "./ArticleContent";

export function ArticlePage(): JSX.Element {
  const { slug } = useParams<{ slug: string }>();
  const { user } = useAuth();

  const { data, refetch, isError, isLoading } = useQuery({
    queryKey: ["article", slug],
    queryFn: () => getArticle(slug),
  });
  const { handleFollow, isPending: isFollowButtonDisabled } = useFollowAuthor(refetch);
  const { handleFavorite } = useFavoriteArticle(refetch);

  const article = data?.article;

  return (
    <>
      <GlobalHeader />
      <div className="article-page">
        <QueryState isLoading={isLoading} isEmpty={!article} isError={isError}>
          {article && (
            <ArticleContent
              article={article}
              user={user}
              onFollow={handleFollow}
              onFavorite={handleFavorite}
              isFollowButtonDisabled={isFollowButtonDisabled}
            />
          )}
        </QueryState>
      </div>
      <footer>
        <div className="container">
          <a href="/#" className="logo-font">
            conduit
          </a>
          <span className="attribution">
            An interactive learning project from <a href="https://thinkster.io">Thinkster</a>. Code &amp; design
            licensed under MIT.
          </span>
        </div>
      </footer>
    </>
  );
}

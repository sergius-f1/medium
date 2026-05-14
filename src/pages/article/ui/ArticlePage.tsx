import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getArticle } from '../../../entities/article';
import { useFollowAuthor } from '../../../features/follow-author';
import { useFavoriteArticle } from '../../../features/like-article';
import { GlobalHeader } from '../../../widgets/global-header';
import { useAuth } from '../../../app/providers/AuthProvider';
import { Link } from 'react-router-dom';
import { AVATAR_PLACEHOLDER_URL } from '../../../shared/config';

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function ArticlePage(): JSX.Element {
  const { slug } = useParams<{ slug: string }>();
  const { user } = useAuth();

  const { data, refetch } = useQuery({
    queryKey: ['article', slug],
    queryFn: () => getArticle(slug),
  });

  const { handleFollow } = useFollowAuthor(refetch);
  const { handleFavorite } = useFavoriteArticle(refetch);

  const article = data?.article;

  if (!article) {
    return (
      <>
        <GlobalHeader />
        <div className="article-page">
          <div className="container page">Loading...</div>
        </div>
      </>
    );
  }

  return (
    <>
      <GlobalHeader />
      <div className="article-page">
        <div className="banner">
          <div className="container">
            <h1>{article.title}</h1>
            <div className="article-meta">
              <Link to={`/profile/${article.author.username}`}>
                <img src={article.author.image || AVATAR_PLACEHOLDER_URL} alt={article.author.username} />
              </Link>
              <div className="info">
                <Link to={`/profile/${article.author.username}`} className="author">
                  {article.author.username}
                </Link>
                <span className="date">{formatDate(article.createdAt)}</span>
              </div>
              {user && (
                <>
                  <button
                    className="btn btn-sm btn-outline-secondary"
                    onClick={() => handleFollow(article.author.username, article.author.following)}
                  >
                    <i className="ion-plus-round" />
                    &nbsp;{article.author.following ? 'Unfollow' : 'Follow'} {article.author.username}
                  </button>
                  &nbsp;&nbsp;
                  <button
                    className={`btn btn-sm ${article.favorited ? 'btn-primary' : 'btn-outline-primary'}`}
                    onClick={() => handleFavorite(article)}
                  >
                    <i className="ion-heart" />
                    &nbsp;Favorite Post <span className="counter">({article.favoritesCount})</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="container page">
          <div className="row article-content">
            <div className="col-md-12">
              <p>{article.body}</p>
            </div>
          </div>
        </div>
      </div>
      <footer>
        <div className="container">
          <a href="/#" className="logo-font">conduit</a>
          <span className="attribution">
            An interactive learning project from{' '}
            <a href="https://thinkster.io">Thinkster</a>. Code &amp; design licensed under MIT.
          </span>
        </div>
      </footer>
    </>
  );
}

import React from 'react';
import { Link } from 'react-router-dom';
import { Article } from '../../../entities/article';
import { User } from '../../../entities/user';
import { AVATAR_PLACEHOLDER_URL } from '../../../shared/config';
import { formatDate } from '../../../shared/lib';

interface ArticleContentProps {
  article: Article;
  user: User | null;
  onFollow: ({ username, following }: { username: string; following: boolean}) => void;
  onFavorite: (article: Article) => void;
  isFollowButtonDisabled: boolean;
}

export function ArticleContent({ article, user, onFollow, onFavorite, isFollowButtonDisabled }: ArticleContentProps): JSX.Element {
  return (
    <>
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
                  disabled={isFollowButtonDisabled}
                  onClick={() => onFollow({ username: article.author.username, following: article.author.following })}
                >
                  <i className="ion-plus-round" />
                  &nbsp;{article.author.following ? 'Unfollow' : 'Follow'} {article.author.username}
                </button>
                &nbsp;&nbsp;
                <button
                  className={`btn btn-sm ${article.favorited ? 'btn-primary' : 'btn-outline-primary'}`}
                  onClick={() => onFavorite(article)}
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
    </>
  );
}

import React from 'react';
import { Link } from 'react-router-dom';
import { Article } from '../model/types';
import { AVATAR_PLACEHOLDER_URL } from '../../../shared/config';
import { formatDate } from '../../../shared/lib';

interface Props {
  article: Article;
  onFavorite?: (article: Article) => void;
}

/**
 * Used to render a single article card.
 * This component can be optimized with React.memo in the future, but it's not necessary for now
 * @param article
 * @param onFavorite
 * @constructor
 */
export function ArticleCard({ article, onFavorite }: Props) {
  const { slug, title, description, createdAt, favoritesCount, favorited, author } = article;

  return (
    <div className="article-preview">
      <div className="article-meta">
        <Link to={`/profile/${author.username}`}>
          <img src={author.image || AVATAR_PLACEHOLDER_URL} alt={author.username} />
        </Link>
        <div className="info">
          <Link to={`/profile/${author.username}`} className="author">
            {author.username}
          </Link>
          <span className="date">{formatDate(createdAt)}</span>
        </div>
        <button
          className={`btn btn-sm pull-xs-right ${favorited ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={() => onFavorite?.(article)}
        >
          <i className="ion-heart" /> {favoritesCount}
        </button>
      </div>
      <Link to={`/${slug}`} className="preview-link">
        <h1>{title}</h1>
        <p>{description}</p>
        <span>Read more...</span>
      </Link>
    </div>
  );
}

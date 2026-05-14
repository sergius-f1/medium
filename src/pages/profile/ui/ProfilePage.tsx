import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getProfile } from '../../../entities/user';
import { useFollowAuthor } from '../../../features/follow-author';
import { ArticleFeed } from '../../../widgets/article-feed';
import { GlobalHeader } from '../../../widgets/global-header';
import { useAuth } from '../../../app/providers/AuthProvider';
import { AVATAR_PLACEHOLDER_URL } from '../../../shared/config';

export function ProfilePage(): JSX.Element {
  const { username } = useParams<{ username: string }>();
  const { user } = useAuth();

  const { data, refetch } = useQuery({
    queryKey: ['profile', username],
    queryFn: () => getProfile(username),
  });

  const { handleFollow } = useFollowAuthor(refetch);

  const profile = data?.profile;

  return (
    <>
      <GlobalHeader />
      <div className="profile-page">
        <div className="user-info">
          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-md-10 offset-md-1">
                <img
                  src={profile?.image || AVATAR_PLACEHOLDER_URL}
                  className="user-img"
                  alt={username}
                />
                <h4>{profile?.username ?? username}</h4>
                <p>{profile?.bio}</p>
                {user && user.username !== username && profile && (
                  <button
                    className="btn btn-sm btn-outline-secondary action-btn"
                    onClick={() => handleFollow(username, profile.following)}
                  >
                    <i className="ion-plus-round" />
                    &nbsp;{profile.following ? 'Unfollow' : 'Follow'} {username}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-10 offset-md-1">
              <ArticleFeed params={{ author: username }} isAuthenticated={!!user} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

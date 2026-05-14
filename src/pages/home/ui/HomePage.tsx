import React from 'react';
import { GlobalHeader } from '../../../widgets/global-header';
import { ArticleFeed } from '../../../widgets/article-feed';
import { useAuth } from '../../../app/providers/AuthProvider';

export function HomePage(): JSX.Element {
  const { user } = useAuth();

  return (
    <>
      <GlobalHeader />
      <div className="home-page">
        <div className="banner">
          <div className="container">
            <h1 className="logo-font">conduit</h1>
            <p>A place to share your knowledge.</p>
          </div>
        </div>
        <div className="container page">
          <div className="row">
            <div className="col-md-9">
              <div className="feed-toggle">
                <ul className="nav nav-pills outline-active">
                  <li className="nav-item">
                    <a className="nav-link active">Global Feed</a>
                  </li>
                </ul>
              </div>
              <ArticleFeed isAuthenticated={!!user} />
            </div>
            <div className="col-md-3">
              <div className="sidebar">
                <p>Popular Tags</p>
              </div>
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

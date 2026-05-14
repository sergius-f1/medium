import React, { lazy, Suspense } from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

const HomePage = lazy(() => import('./pages/home').then((m) => ({ default: m.HomePage })));
const AuthPage = lazy(() => import('./pages/auth').then((m) => ({ default: m.AuthPage })));
const LogoutPage = lazy(() => import('./pages/logout').then((m) => ({ default: m.LogoutPage })));
const ProfilePage = lazy(() => import('./pages/profile').then((m) => ({ default: m.ProfilePage })));
const ArticlePage = lazy(() => import('./pages/article').then((m) => ({ default: m.ArticlePage })));
const NotImplementedPage = lazy(() => import('./pages/not-implemented').then((m) => ({ default: m.NotImplementedPage })));

function App(): JSX.Element {
  return (
    <Router>
      <Suspense fallback={null}>
        <Switch>
          <Route path="/login" exact component={AuthPage} />
          <Route path="/register" exact component={AuthPage} />
          <Route path="/logout" exact component={LogoutPage} />
          <Route path="/editor" exact component={NotImplementedPage} />
          <Route path="/settings" exact component={NotImplementedPage} />
          <Route path="/profile/:username" exact component={ProfilePage} />
          <Route path="/:slug" exact component={ArticlePage} />
          <Route path="/" component={HomePage} />
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;

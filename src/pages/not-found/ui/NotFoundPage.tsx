import React from 'react';
import { GlobalHeader } from '../../../widgets/global-header';

export function NotFoundPage(): JSX.Element {
  return (
    <>
      <GlobalHeader />
      <div className="container page">
        <h1>404 - Not found.</h1>
        <p>This page is not found.</p>
      </div>
    </>
  );
}

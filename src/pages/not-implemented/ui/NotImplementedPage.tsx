import React from 'react';
import { GlobalHeader } from '../../../widgets/global-header';

export function NotImplementedPage(): JSX.Element {
  return (
    <>
      <GlobalHeader />
      <div className="container page">
        <h1>Coming soon</h1>
        <p>This page is not implemented yet.</p>
      </div>
    </>
  );
}
